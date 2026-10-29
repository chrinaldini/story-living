import { Component } from '@angular/core';

@Component({
  selector: 'sl-home-audience',
  template: `
    <section class="audience">
      <div class="inner">
        <div class="audience-grid">
          <div class="audience-card">
            <h3>Family Holidays</h3>
            <p>
              Room for everyone to unwind. Separate bedrooms, a proper kitchen and space for the kids
              to play, so a city break actually feels like a break.
            </p>
          </div>
          <div class="audience-card">
            <h3>Weekend Getaways</h3>
            <p>
              Slip across the bridge for a couple of nights by the water — museums and old town one
              way, forest trails and swimming spots the other.
            </p>
          </div>
          <div class="audience-card">
            <h3>Longer Stays</h3>
            <p>
              Settle in for weeks or months, whatever the season. Flexible options for your needs and a real home base
              for living, working and exploring Stockholm at your own pace.
            </p>
          </div>
          <div class="audience-card">
            <h3>Visiting Family &amp; Friends</h3>
            <p>
              In town for the grandchildren, a wedding or a graduation? A comfortable place of your
              own, just minutes from the people you came to see.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeAudienceComponent {}
