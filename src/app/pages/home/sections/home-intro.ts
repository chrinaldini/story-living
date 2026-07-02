import { Component } from '@angular/core';

@Component({
  selector: 'sl-home-intro',
  template: `
    <section class="intro">
      <div class="inner intro-inner">
        <div class="eyebrow">Welcome to Story Living</div>
        <h2>A holiday home that feels like home</h2>
        <p>
          Story Hotels have always had a knack for making a place feel like somewhere you belong.
          Story Living is the next chapter — written for families and friends who want more than a
          hotel room on their trip to Stockholm. On Lidingö, an island of birch woods and quiet
          shoreline just across the water from the city, 104 fully furnished apartments give you
          space the whole family can breathe in: a real kitchen for pancakes and packed lunches,
          separate bedrooms so everyone sleeps, and a green, safe neighbourhood right outside the
          door. The city, the ferries and the archipelago are all ten minutes away.
        </p>
      </div>
    </section>
  `,
})
export class HomeIntroComponent {}
