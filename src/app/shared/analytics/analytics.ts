import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

// ─────────────────────────────────────────────────────────────────────────────
// GA4 Measurement ID — REPLACE THIS with the real value.
// Find it in Google Analytics → Admin → Data streams → your web stream →
// "Measurement ID" (format: G-XXXXXXXXXX). This is the only place to change it.
// ─────────────────────────────────────────────────────────────────────────────
export const GA_MEASUREMENT_ID = 'G-1PZ8VRTC5P';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Loads Google Analytics (GA4) on demand and tracks SPA route changes as
 * page_view events. GA is only loaded after the visitor grants consent — see
 * CookieConsentComponent, which is the single caller of enable().
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly router = inject(Router);
  private enabled = false;
  private lastPath: string | null = null;

  /** Inject gtag.js, initialise GA4 and start tracking navigation. Idempotent. */
  enable(): void {
    if (this.enabled) return;
    this.enabled = true;

    // Load the official gtag.js loader.
    const loader = document.createElement('script');
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(loader);

    // Standard gtag shim (pushes the arguments object onto the data layer).
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    // We send page_view manually on each route change, so disable the automatic one.
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

    // Track the current page, then every subsequent navigation.
    this.sendPageView(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.sendPageView(e.urlAfterRedirects));
  }

  private sendPageView(url: string): void {
    if (!this.enabled || url === this.lastPath) return;
    this.lastPath = url;
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.origin + url,
      page_title: document.title,
    });
  }
}
