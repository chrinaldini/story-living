import { Component } from '@angular/core';

@Component({
  selector: 'sl-corp-location',
  template: `
    <section class="location" id="location">
      <div class="inner location-inner">
        <div class="eyebrow">Location</div>
        <h2>Lidingö, Stockholm</h2>
        <p class="section-lead">
          An island address with the calm of the waterfront and the pace of the city close by.
        </p>
        <div class="loc-stats">
          <div class="stat">
            <div class="stat-num">104</div>
            <div class="stat-label">Apartments</div>
          </div>
          <div class="stat">
            <div class="stat-num">10 min</div>
            <div class="stat-label">To Stockholm Center</div>
          </div>
          <div class="stat">
            <div class="stat-num">3</div>
            <div class="stat-label">Apartment Types</div>
          </div>
        </div>
        <address class="loc-address">Agavägen 11, 181 55 Lidingö<br />Stockholm, Sweden</address>
        <div class="map-wrap">
          <iframe
            src="https://www.google.com/maps?q=Agav%C3%A4gen%2011%2C%20181%2055%20Liding%C3%B6%2C%20Sweden&z=14&output=embed"
            loading="lazy"
            title="Story Living at Agavägen 11, Lidingö"
          ></iframe>
        </div>
        <p class="map-note">
          Story Living sits on Lidingö, directly east of central Stockholm — a 10-minute drive or
          tram ride across the Lidingöbron bridge.
        </p>
      </div>
    </section>
  `,
})
export class CorpLocationComponent {}
