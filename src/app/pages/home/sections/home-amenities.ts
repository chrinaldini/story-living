import { Component } from '@angular/core';

@Component({
  selector: 'sl-home-amenities',
  template: `
    <section class="amenities" id="amenities">
      <div class="inner">
        <div class="eyebrow">Amenities</div>
        <h2>Everything sorted, so you can relax</h2>
        <div class="amen-grid">
          <div class="amen-item">
            <h4>Parking Garage</h4>
            <p>
              Bring the car. There's a secure spot waiting underground — handy for day trips out to
              the archipelago and back.
            </p>
          </div>
          <div class="amen-item">
            <h4>Lounge</h4>
            <p>
              A relaxed shared space downstairs to gather, play a game or plan tomorrow's adventures
              when the apartment feels a little too quiet.
            </p>
          </div>
          <div class="amen-item">
            <h4>Cleaning Services</h4>
            <p>
              Housekeeping on request, so a family holiday doesn't turn into a week of tidying up
              after everyone.
            </p>
          </div>
          <div class="amen-item">
            <h4>Flexible Solutions</h4>
            <p>
              Plans change, especially with kids. Flexible terms and easy check-in mean the trip
              bends around you, not the other way round.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeAmenitiesComponent {}
