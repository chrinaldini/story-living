import { Component } from '@angular/core';

@Component({
  selector: 'sl-home-neighborhood',
  template: `
    <section class="neighborhood" id="neighborhood">
      <div class="inner">
        <div class="eyebrow">The Neighbourhood</div>
        <h2>Quiet enough to relax, close enough to explore</h2>
        <p class="section-lead">
          Lidingö isn't somewhere you pass through — it's somewhere to slow down. No traffic noise,
          no crowds, just trails, water and everything a family needs within easy reach, with the
          whole of Stockholm a short tram ride away.
        </p>
        <div class="card-grid">
          <article class="apt-card text-only">
            <div class="apt-body">
              <h3>Trails, Beaches &amp; Nature Reserves</h3>
              <p>
                The 440-hectare Långängen-Elfvik nature reserve and the Kottlasjön lake are minutes
                away — forest trails, swimming spots and open meadows for picnics and long walks,
                perfect for burning off energy before or after a day in the city.
              </p>
            </div>
          </article>
          <article class="apt-card text-only">
            <div class="apt-body">
              <h3>Swimming &amp; The Outdoors</h3>
              <p>
                Sandy shorelines and calm bays make for easy family swimming in summer, while the
                island's parks, playgrounds and cycle paths keep everyone busy whenever the sun is
                out.
              </p>
            </div>
          </article>
          <article class="apt-card text-only">
            <div class="apt-body">
              <h3>Easy Days in the City</h3>
              <p>
                Hop on the tram and you're minutes from Stockholm's old town, the Vasa and Junibacken
                museums, the Skansen open-air zoo and the Gröna Lund funfair — big days out, then home
                to the quiet of the island.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class HomeNeighborhoodComponent {}
