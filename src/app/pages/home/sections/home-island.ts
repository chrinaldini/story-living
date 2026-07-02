import { Component } from '@angular/core';

@Component({
  selector: 'sl-home-island',
  template: `
    <section class="island">
      <img src="/images/misc/emil-lif-0225.jpg" alt="Waterfront on Lidingö, near Story Living" />
      <div class="island-text">
        <div class="eyebrow">The Island</div>
        <h2>An island holiday, ten minutes from the city</h2>
        <p>
          Lidingö has a way of slowing the clock. Cross the bridge from Stockholm and the traffic
          gives way to pine, rock and water — one of the greenest, most sought-after corners of the
          archipelago, with sandy swimming spots, forest trails and open lawns for the kids to run
          wild. Story Living sits where the parkland meets the shoreline, close enough to watch the
          ferries pass.
        </p>
        <p>
          Then the old wooden tram, the Lidingöbanan, carries you back into the middle of the city in
          ten minutes flat. Wild island mornings and big-city afternoons, in the same short ride.
        </p>
      </div>
    </section>
  `,
})
export class HomeIslandComponent {}
