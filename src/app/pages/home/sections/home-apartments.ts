import { Component } from '@angular/core';
import { GalleryBehavior } from '../../gallery-behavior';

@Component({
  selector: 'sl-home-apartments',
  template: `
    <section class="apartments" id="apartments">
      <div class="inner">
        <div class="eyebrow">Apartments</div>
        <h2>Space for the whole family to relax.</h2>
        <p class="section-lead">
          Whether you're staying for a long weekend or the whole summer, Story Living gives you a
          home that's ready from the moment you arrive. Fully furnished apartments, family-friendly
          interiors, and a real kitchen for breakfasts, packed lunches and late dinners together.
        </p>
        <div class="card-grid">
          <article class="apt-card">
            <button type="button" class="apt-media" (click)="openGallery('studio')">
              <img src="/images/rooms/studio/1.jpg" alt="Studio apartment interior" />
              <span class="apt-media-badge">View gallery · 6 photos</span>
            </button>
            <div class="apt-body">
              <h3>Studio Apartments</h3>
              <p>
                A bright, clever space with everything in one place. Perfect for couples or a solo
                getaway who want a comfortable base by the water without the fuss.
              </p>
            </div>
          </article>
          <article class="apt-card">
            <button type="button" class="apt-media" (click)="openGallery('one-bedroom')">
              <img src="/images/rooms/one-bedroom/1.jpg" alt="One-bedroom apartment interior" />
              <span class="apt-media-badge">View gallery · 6 photos</span>
            </button>
            <div class="apt-body">
              <h3>One-Bedroom Apartments</h3>
              <p>
                Room to spread out. A separate bedroom, a proper kitchen and a cosy living area make
                this a great fit for couples or a small family staying a few nights or a few weeks.
              </p>
            </div>
          </article>
          <article class="apt-card">
            <button type="button" class="apt-media" (click)="openGallery('two-bedroom')">
              <img src="/images/rooms/two-bedroom/1.jpg" alt="Two-bedroom apartment interior" />
              <span class="apt-media-badge">View gallery · 8 photos</span>
            </button>
            <div class="apt-body">
              <h3>Two-Bedroom Apartments</h3>
              <p>
                Made for families. Two private bedrooms and a generous living space mean the kids
                have their own room, the grown-ups keep theirs, and everyone gathers for dinner.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    @if (activeRoom(); as room) {
      <div class="gallery-overlay" (click)="close()">
        <div
          class="gallery"
          (click)="$event.stopPropagation()"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="room.title + ' photo gallery'"
        >
          <div class="gallery-head">
            <h3>{{ room.title }}</h3>
            <button type="button" class="gallery-close" (click)="close()" aria-label="Close gallery">
              &times;
            </button>
          </div>

          <div class="gallery-stage" (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
            <button type="button" class="gallery-nav prev" (click)="prev()" aria-label="Previous photo">
              &#8249;
            </button>
            <img [src]="images()[currentIndex()]" [alt]="room.title + ' photo ' + (currentIndex() + 1)" />
            <button type="button" class="gallery-nav next" (click)="next()" aria-label="Next photo">
              &#8250;
            </button>
            <span class="gallery-counter">{{ currentIndex() + 1 }} / {{ images().length }}</span>
          </div>

          <div class="gallery-thumbs">
            @for (img of images(); track img; let i = $index) {
              <button
                type="button"
                class="gallery-thumb"
                [class.active]="i === currentIndex()"
                (click)="goTo(i)"
                [attr.aria-label]="'Go to photo ' + (i + 1)"
              >
                <img [src]="img" [alt]="room.title + ' thumbnail ' + (i + 1)" />
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class HomeApartmentsComponent extends GalleryBehavior {}
