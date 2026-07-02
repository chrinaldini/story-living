import { Routes } from '@angular/router';

const home = () => import('./pages/home/home').then((m) => m.HomeComponent);
const corporate = () => import('./pages/corporate/corporate').then((m) => m.CorporateComponent);

// Home-page sections that are deep-linkable as real paths (no hash).
// Each renders its page; the page scrolls to the matching section.
export const HOME_SECTIONS = ['apartments', 'amenities', 'neighborhood', 'location', 'contact'];

export const routes: Routes = [
  // Family / vacation variant (default) at the root.
  { path: '', loadComponent: home },
  ...HOME_SECTIONS.map((path) => ({ path, loadComponent: home })),

  // Corporate variant under /corporate with the same section sub-paths.
  { path: 'corporate', loadComponent: corporate },
  ...HOME_SECTIONS.map((path) => ({ path: `corporate/${path}`, loadComponent: corporate })),

  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking').then((m) => m.BookingComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
