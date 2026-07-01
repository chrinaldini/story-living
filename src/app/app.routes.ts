import { Routes } from '@angular/router';

const home = () => import('./pages/home/home').then((m) => m.HomeComponent);

// Home-page sections that are deep-linkable as real paths (no hash).
// Each renders the home page; HomeComponent scrolls to the matching section.
export const HOME_SECTIONS = ['apartments', 'amenities', 'neighborhood', 'location', 'contact'];

export const routes: Routes = [
  { path: '', loadComponent: home },
  ...HOME_SECTIONS.map((path) => ({ path, loadComponent: home })),
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking').then((m) => m.BookingComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
