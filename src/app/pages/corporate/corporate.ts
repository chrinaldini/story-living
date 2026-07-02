import { Component } from '@angular/core';
import { PageShellBase } from '../page-shell-base';
import { CorpHeroComponent } from './sections/corp-hero';
import { CorpIntroComponent } from './sections/corp-intro';
import { CorpAudienceComponent } from './sections/corp-audience';
import { CorpIslandComponent } from './sections/corp-island';
import { CorpApartmentsComponent } from './sections/corp-apartments';
import { CorpAmenitiesComponent } from './sections/corp-amenities';
import { CorpNeighborhoodComponent } from './sections/corp-neighborhood';
import { CorpLocationComponent } from './sections/corp-location';
import { CorpContactComponent } from './sections/corp-contact';

// Corporate landing page. Fully separate from the family page — its own section
// components with copy hardcoded inside each for easy editing.
@Component({
  selector: 'sl-corporate',
  imports: [
    CorpHeroComponent,
    CorpIntroComponent,
    CorpAudienceComponent,
    CorpIslandComponent,
    CorpApartmentsComponent,
    CorpAmenitiesComponent,
    CorpNeighborhoodComponent,
    CorpLocationComponent,
    CorpContactComponent,
  ],
  template: `
    <sl-corp-hero [offset]="heroOffset()" />
    <sl-corp-intro />
    <sl-corp-audience />
    <sl-corp-island />
    <sl-corp-apartments />
    <sl-corp-amenities />
    <sl-corp-neighborhood />
    <sl-corp-location />
    <sl-corp-contact />
  `,
})
export class CorporateComponent extends PageShellBase {}
