import { Component } from '@angular/core';

// Booking call-to-action band. The button carries the `distributor-open` class,
// which the Mews Distributor (initialised by the page shell) binds to.
@Component({
  selector: 'sl-booking-cta',
  template: `
    <section class="booking-cta">
      <div class="inner">
        <div class="eyebrow">Book your stay</div>
        <h2>Reserve your apartment</h2>
        <p class="section-lead">
          Check availability and book directly — fully furnished apartments on Lidingö, ten minutes
          from Stockholm.
        </p>
        <button type="button" class="book-btn distributor-open">Check availability</button>
      </div>
    </section>
  `,
})
export class BookingCtaComponent {}
