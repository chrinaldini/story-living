import { Component } from '@angular/core';
import { PageShellBase } from '../page-shell-base';
import { HomeHeroComponent } from './sections/home-hero';
import { HomeIntroComponent } from './sections/home-intro';
import { HomeAudienceComponent } from './sections/home-audience';
import { HomeIslandComponent } from './sections/home-island';
import { HomeApartmentsComponent } from './sections/home-apartments';
import { HomeAmenitiesComponent } from './sections/home-amenities';
import { HomeNeighborhoodComponent } from './sections/home-neighborhood';
import { HomeLocationComponent } from './sections/home-location';
import { HomeContactComponent } from './sections/home-contact';

// Family / vacation landing page. Composes its own section components; all copy
// is hardcoded inside those sections for easy editing (no shared text).
@Component({
  selector: 'sl-home',
  imports: [
    HomeHeroComponent,
    HomeIntroComponent,
    HomeAudienceComponent,
    HomeIslandComponent,
    HomeApartmentsComponent,
    HomeAmenitiesComponent,
    HomeNeighborhoodComponent,
    HomeLocationComponent,
    HomeContactComponent,
  ],
  template: `
    <sl-home-hero [offset]="heroOffset()" />
    <sl-home-intro />
    <sl-home-audience />
    <sl-home-island />
    <sl-home-apartments />
    <sl-home-amenities />
    <sl-home-neighborhood />
    <sl-home-location />
    <sl-home-contact />
  `,
})
export class HomeComponent extends PageShellBase {}
