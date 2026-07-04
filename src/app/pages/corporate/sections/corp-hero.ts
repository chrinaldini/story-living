import { Component, input } from '@angular/core';

@Component({
  selector: 'sl-corp-hero',
  template: `
    <section
      class="hero"
      style="--hero-image: url('/images/misc/booboo-2024-emil-lif-lif1-47.jpg')"
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
        <button type="button" class="book-btn distributor-open hero-book-btn" data-ga="hero">Check availability</button>
      </div>
    </section>
  `,
})
export class CorpHeroComponent {
  readonly offset = input(0);
}
