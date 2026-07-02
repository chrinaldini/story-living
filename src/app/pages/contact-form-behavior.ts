import { afterNextRender, Directive, signal } from '@angular/core';

// reCAPTCHA v2 site key ("I'm not a robot"). SECRET key lives in contact.php.
// Manage the key pair at https://www.google.com/recaptcha/admin
const RECAPTCHA_SITE_KEY = '6LeMeT8tAAAAAGG658WPNaDwIq1tioCSPevjCx89';

declare const grecaptcha: {
  render: (el: HTMLElement, opts: { sitekey: string }) => number;
  getResponse: (id?: number) => string;
  reset: (id?: number) => void;
};

/**
 * Contact form behaviour: validation with per-field messages, reCAPTCHA v2 and
 * submit to contact.php. The contact section of each variant extends this; the
 * marketing copy and the hidden "segment" value are hardcoded per variant.
 */
@Directive()
export abstract class ContactFormBehavior {
  readonly formState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  readonly formError = signal('');
  readonly fieldErrors = signal<Record<string, string>>({});

  private recaptchaWidgetId: number | null = null;

  constructor() {
    afterNextRender(() => this.renderRecaptcha());
  }

  // reCAPTCHA loads async; poll until ready, then render into the container.
  private renderRecaptcha(attempts = 0): void {
    const el = document.getElementById('recaptcha-container');
    if (el && typeof grecaptcha !== 'undefined' && grecaptcha.render && el.childElementCount === 0) {
      this.recaptchaWidgetId = grecaptcha.render(el, { sitekey: RECAPTCHA_SITE_KEY });
    } else if (this.recaptchaWidgetId === null && attempts < 50) {
      setTimeout(() => this.renderRecaptcha(attempts + 1), 200);
    }
  }

  resetForm(): void {
    this.formState.set('idle');
    this.formError.set('');
    this.fieldErrors.set({});
    this.recaptchaWidgetId = null;
    setTimeout(() => this.renderRecaptcha());
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

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
