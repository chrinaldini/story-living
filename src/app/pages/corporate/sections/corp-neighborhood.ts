import { Component } from '@angular/core';

@Component({
  selector: 'sl-corp-neighborhood',
  template: `
    <section class="neighborhood" id="neighborhood">
      <div class="inner">
        <div class="eyebrow">The Neighborhood</div>
        <h2>Quiet enough to think, close enough to work</h2>
        <p class="section-lead">
          Lidingö isn't a suburb you pass through — it's a destination companies are starting to
          choose on purpose. No traffic noise, no tourists, just trail paths, water, and everything a
          working life actually needs within walking distance.
        </p>
        <div class="card-grid">
          <article class="apt-card text-only">
            <div class="apt-body">
              <h3>Trail Paths &amp; Nature Reserves</h3>
              <p>
                The 440-hectare Långängen-Elfvik nature reserve and the Kottlasjön loop are minutes
                away — old-growth forest, lake trails, and views over the archipelago for the walking
                meeting or the morning reset. Lidingö is also home to Lidingöloppet, the world's
                largest cross-country race, run right through these woods every year.
              </p>
            </div>
          </article>
          <article class="apt-card text-only">
            <div class="apt-body">
              <h3>Gym, On Your Doorstep</h3>
              <p>
                SATS Lidingö sits in the same waterfront Dalénum district as Story Living — a proper
                gym, not a hotel treadmill, close enough to visit before the first call of the day.
                Fitness24Seven in Baggeby is open around the clock for the team that keeps odd hours.
              </p>
            </div>
          </article>
          <article class="apt-card text-only">
            <div class="apt-body">
              <h3>Restaurants for Client Dinners</h3>
              <p>
                From the harbor tables at Hamnen Kök &amp; Bar to the everyday ease of Kvarters Lidingö
                and the kitchens of 450 Gradi and Restaurang Toscana, there's a real choice of places
                to take a client, a colleague, or just yourself after a long day — all a short walk or
                drive from home.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class CorpNeighborhoodComponent {}
