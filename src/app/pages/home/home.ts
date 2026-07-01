import { Component, HostListener, signal } from '@angular/core';

interface RoomType {
  key: string;
  title: string;
  folder: string;
  count: number;
}

@Component({
  selector: 'sl-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
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
  private parallaxTicking = false;
  private readonly reduceMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.reduceMotion || this.parallaxTicking) return;
    this.parallaxTicking = true;
    requestAnimationFrame(() => {
      this.heroOffset.set(window.scrollY * 0.2);
      this.parallaxTicking = false;
    });
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
}
