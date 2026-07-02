import { Directive, HostListener, signal } from '@angular/core';

interface RoomType {
  key: string;
  title: string;
  folder: string;
  count: number;
}

/**
 * Apartment photo gallery: the three room types, an image modal with prev/next,
 * thumbnails, keyboard arrows and mobile swipe. The apartment section component
 * of each variant extends this; only the surrounding marketing copy differs.
 */
@Directive()
export abstract class GalleryBehavior {
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
