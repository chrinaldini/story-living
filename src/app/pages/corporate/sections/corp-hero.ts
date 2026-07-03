import { Component, input } from '@angular/core';

@Component({
  selector: 'sl-corp-hero',
  template: `
    <section
      class="hero"
      style="--hero-image: url('/images/misc/booboo-petter-buling-4-juli-img-5837.jpg')"
      [style.--hero-shift.px]="-offset()"
    >
      <div class="hero-content">
        <div class="eyebrow">Corporate Housing &amp; Relocation</div>
        <h1>A place to live well while you work away</h1>
        <p>
          104 beautifully furnished apartments on Lidingö — ten quiet minutes from Stockholm's
          business district, with the forest, the water and a gym all closer than the office. Built
          for assignments, relocations and long-term postings that need to feel like more than a
          hotel room.
        </p>
        <button type="button" class="book-btn distributor-open hero-book-btn">Check availability</button>
      </div>
    </section>
  `,
})
export class CorpHeroComponent {
  readonly offset = input(0);
}
