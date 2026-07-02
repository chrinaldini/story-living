import { Component } from '@angular/core';

@Component({
  selector: 'sl-corp-audience',
  template: `
    <section class="audience">
      <div class="inner">
        <div class="audience-grid">
          <div class="audience-card">
            <h3>Corporate Housing</h3>
            <p>
              For the executive who'd rather not live out of a suitcase. Walk in, hang up your coat,
              and start the assignment already feeling at home.
            </p>
          </div>
          <div class="audience-card">
            <h3>Teams &amp; Assignments</h3>
            <p>
              Opening an office, running a project, posting a crew for a season — house the whole team
              five minutes apart, on one simple invoice.
            </p>
          </div>
          <div class="audience-card">
            <h3>Relocation</h3>
            <p>
              The in-between place that doesn't feel in-between. Settle the family, learn the
              neighborhood, and let the rest of the move sort itself out.
            </p>
          </div>
          <div class="audience-card">
            <h3>Long Stay</h3>
            <p>
              Weeks that turn into months without ever losing their shine. Flexible terms, real
              furniture, a life you can actually live.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CorpAudienceComponent {}
