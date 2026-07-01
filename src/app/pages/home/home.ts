import { afterNextRender, Component, HostListener, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { HOME_SECTIONS } from '../../app.routes';

interface RoomType {
  key: string;
  title: string;
  folder: string;
  count: number;
}

// reCAPTCHA v2 site key ("I'm not a robot" checkbox). The matching SECRET key
// lives in contact.php. Manage the key pair at https://www.google.com/recaptcha/admin
const RECAPTCHA_SITE_KEY = '6LeMeT8tAAAAAGG658WPNaDwIq1tioCSPevjCx89';

declare const grecaptcha: {
  render: (el: HTMLElement, opts: { sitekey: string }) => number;
  getResponse: (id?: number) => string;
  reset: (id?: number) => void;
};

@Component({
  selector: 'sl-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private readonly location = inject(Location);
  private currentPath = '';

  constructor() {
    afterNextRender(() => {
      // On first load / deep link (e.g. /apartments), scroll to that section.
      const path = this.location.path().replace(/^\//, '').split(/[?#]/)[0];
      if (HOME_SECTIONS.includes(path)) {
        this.currentPath = path;
        this.deepLinkScroll(path);
      }
      this.renderRecaptcha();
    });
  }

  // Scroll to a deep-linked section. Images and web fonts load after the first
  // render and shift the layout, so re-run the scroll as the page settles.
  private deepLinkScroll(id: string): void {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const scroll = () => document.getElementById(id)?.scrollIntoView();

    scroll();
    requestAnimationFrame(scroll);
    setTimeout(scroll, 250);
    setTimeout(scroll, 800);
    window.addEventListener('load', () => scroll(), { once: true });
    (document as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready?.then(() => scroll());
  }

  private recaptchaWidgetId: number | null = null;

  // The reCAPTCHA script loads async, so poll briefly until it's ready, then
  // render the widget explicitly into the form's container.
  private renderRecaptcha(attempts = 0): void {
    const el = document.getElementById('recaptcha-container');
    if (el && typeof grecaptcha !== 'undefined' && grecaptcha.render && el.childElementCount === 0) {
      this.recaptchaWidgetId = grecaptcha.render(el, { sitekey: RECAPTCHA_SITE_KEY });
    } else if (this.recaptchaWidgetId === null && attempts < 50) {
      setTimeout(() => this.renderRecaptcha(attempts + 1), 200);
    }
  }
  readonly rooms: Record<string, RoomType> = {
    studio: { key: 'studio', title: 'Studio Apartments', folder: 'studio', count: 6 },
    'one-bedroom': {
      key: 'one-bedroom',
      title: 'One-Bedroom Apartments',
      folder: 'one-bedroom',
      count: 6,
    },
    'two-bedroom': {
      key: 'two-bedroom',
      title: 'Two-Bedroom Apartments',
      folder: 'two-bedroom',
      count: 8,
    },
  };

  readonly activeRoom = signal<RoomType | null>(null);
  readonly currentIndex = signal(0);

  // Parallax offset (px) for the hero background, driven by scroll
  readonly heroOffset = signal(0);
  private scrollTicking = false;
  private readonly reduceMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      if (!this.reduceMotion) this.heroOffset.set(window.scrollY * 0.2);
      this.syncUrlToSection();
      this.scrollTicking = false;
    });
  }

  // Scroll-spy: update the URL to the section currently under the header,
  // without triggering router navigation (so the page never reloads).
  private syncUrlToSection(): void {
    const headerH =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 96;

    let active = '';
    for (const id of HOME_SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= headerH + 8) active = id;
    }

    if (active !== this.currentPath) {
      this.currentPath = active;
      this.location.replaceState(active ? '/' + active : '/');
    }
  }

  readonly images = () => {
    const room = this.activeRoom();
    if (!room) return [];
    return Array.from({ length: room.count }, (_, i) => `/images/rooms/${room.folder}/${i + 1}.jpg`);
  };

  openGallery(key: string): void {
    const room = this.rooms[key];
    if (!room) return;
    this.activeRoom.set(room);
    this.currentIndex.set(0);
  }

  close(): void {
    this.activeRoom.set(null);
  }

  next(): void {
    const total = this.images().length;
    if (!total) return;
    this.currentIndex.update((i) => (i + 1) % total);
  }

  prev(): void {
    const total = this.images().length;
    if (!total) return;
    this.currentIndex.update((i) => (i - 1 + total) % total);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  private touchStartX = 0;
  private touchStartY = 0;

  onTouchStart(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - this.touchStartX;
    const dy = touch.clientY - this.touchStartY;
    // Only treat as a swipe if mostly horizontal and past a threshold
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) this.next();
      else this.prev();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.activeRoom()) return;
    if (event.key === 'Escape') this.close();
    else if (event.key === 'ArrowRight') this.next();
    else if (event.key === 'ArrowLeft') this.prev();
  }

  // ─── Contact form ─────────────────────────────────────────────────────────
  readonly formState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  readonly formError = signal('');
  readonly fieldErrors = signal<Record<string, string>>({});

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    // Client-side validation with per-field messages
    const errors: Record<string, string> = {};
    const name = ((data.get('name') as string) ?? '').trim();
    const email = ((data.get('email') as string) ?? '').trim();
    const message = ((data.get('message') as string) ?? '').trim();

    if (!name) errors['name'] = 'Please enter your name.';
    if (!email) errors['email'] = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors['email'] = 'Please enter a valid email address.';
    if (!message) errors['message'] = 'Please enter a message.';

    const token =
      typeof grecaptcha !== 'undefined' ? grecaptcha.getResponse(this.recaptchaWidgetId ?? undefined) : '';
    if (!token) errors['human'] = "Please confirm you're not a robot.";

    if (Object.keys(errors).length > 0) {
      this.fieldErrors.set(errors);
      this.formError.set('');
      this.formState.set('error');
      return;
    }

    this.fieldErrors.set({});
    this.formState.set('sending');
    this.formError.set('');

    try {
      const res = await fetch('/contact.php', { method: 'POST', body: data });
      const json = await res.json().catch(() => ({ ok: false }));
      if (res.ok && json.ok) {
        this.formState.set('success');
        form.reset();
      } else {
        this.formError.set(json.error || 'Something went wrong. Please try again.');
        this.formState.set('error');
        if (this.recaptchaWidgetId !== null) grecaptcha.reset(this.recaptchaWidgetId);
      }
    } catch {
      this.formError.set('Could not reach the server. Please try again later.');
      this.formState.set('error');
    }
  }
}
