import { Component } from '@angular/core';
import { PageShellBase } from '../page-shell-base';
import { BookingCtaComponent } from '../../shared/booking-cta/booking-cta';
import { CorpAmenitiesComponent } from './sections/corp-amenities';
import { CorpApartmentsComponent } from './sections/corp-apartments';
import { CorpAudienceComponent } from './sections/corp-audience';
import { CorpContactComponent } from './sections/corp-contact';
import { CorpHeroComponent } from './sections/corp-hero';
import { CorpIntroComponent } from './sections/corp-intro';
import { CorpIslandComponent } from './sections/corp-island';
import { CorpLocationComponent } from './sections/corp-location';
import { CorpNeighborhoodComponent } from './sections/corp-neighborhood';

// Corporate landing page. Fully separate from the family page — its own section
// components with copy hardcoded inside each for easy editing.
@Component({
  selector: 'sl-corporate',
  imports: [
    CorpHeroComponent,
    CorpIntroComponent,
    BookingCtaComponent,
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
    <sl-booking-cta />
    <sl-corp-audience />
    <sl-corp-apartments />
    <sl-corp-island />
    <sl-corp-amenities />
    <sl-corp-neighborhood />
    <sl-corp-location />
    <sl-corp-contact />
  `,
})
export class CorporateComponent extends PageShellBase {}
