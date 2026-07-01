import { Component, afterNextRender } from '@angular/core';
import { MEWS_CONFIG } from './mews.config';

/** Minimal typing for the global injected by distributor.min.js (see index.html). */
interface MewsDistributorApi {
  open(): void;
}
type MewsDistributorOptions = { configurationIds: string[]; openElements?: string };
type MewsDistributorSettings = { dataBaseUrl?: string };
declare global {
  interface Window {
    Mews?: {
      Distributor(
        options: MewsDistributorOptions,
        callback?: (api: MewsDistributorApi) => void,
        settings?: MewsDistributorSettings
      ): void;
    };
  }
}

@Component({
  selector: 'sl-booking',
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class BookingComponent {
  constructor() {
    // The loader script runs in <head>; initialize the widget once the DOM is ready.
    afterNextRender(() => {
      if (!window.Mews) {
        console.error('Mews Distributor script failed to load.');
        return;
      }
      window.Mews.Distributor(
        {
          configurationIds: MEWS_CONFIG.configurationIds,
          openElements: '.distributor-open',
        },
        undefined,
        MEWS_CONFIG.dataBaseUrl ? { dataBaseUrl: MEWS_CONFIG.dataBaseUrl } : undefined
      );
    });
  }
}
