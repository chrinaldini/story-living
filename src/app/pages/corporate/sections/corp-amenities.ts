import { Component } from '@angular/core';

@Component({
  selector: 'sl-corp-amenities',
  template: `
    <section class="amenities" id="amenities">
      <div class="inner">
        <div class="eyebrow">Amenities</div>
        <h2>Everything taken care of, quietly</h2>
        <div class="amen-grid">
          <div class="amen-item">
            <h4>Parking Garage</h4>
            <p>Bring the car. There's a secure spot waiting underground, whatever the Stockholm winter throws at it.</p>
          </div>
          <div class="amen-item">
            <h4>Lounge</h4>
            <p>
              Part living room, part meeting room — a shared space downstairs for the calls, the
              catch-ups, and the in-between hours.
            </p>
          </div>
          <div class="amen-item">
            <h4>Cleaning Services</h4>
            <p>The kind of housekeeping that means you never quite remember what a messy apartment looks like.</p>
          </div>
          <div class="amen-item">
            <h4>Flexible Solutions</h4>
            <p>
              Plans change. Assignments extend, get cut short, get rescheduled. Our terms are built to
              move with you, not against you.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CorpAmenitiesComponent {}
