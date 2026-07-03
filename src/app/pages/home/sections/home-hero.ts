import { Component, input } from '@angular/core';

@Component({
  selector: 'sl-home-hero',
  template: `
    <section
      class="hero"
      style="--hero-image: url('/images/misc/booboo-petter-buling-4-juli-img-5837.jpg')"
      [style.--hero-shift.px]="-offset()"
    >
      <div class="hero-content">
        <div class="eyebrow">Family Stays &amp; Island Getaways</div>
        <h1>A home by the water for the whole family</h1>
        <p>
          104 spacious, fully furnished apartments on Lidingö — a calm green island just ten minutes
          from central Stockholm, with forest trails, swimming spots and the city's museums and
          playgrounds all close by. Room to spread out, a real kitchen for family dinners, and a
          neighbourhood made for slow mornings and long summer evenings.
        </p>
      </div>
    </section>
  `,
})
export class HomeHeroComponent {
  // Parallax offset (px) supplied by the page shell.
  readonly offset = input(0);
}
