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
  private sectionTimer: ReturnType<typeof setTimeout> | null = null;

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
      .subscribe((e) => {
        this.cancelSectionTimer(); // a real navigation supersedes any pending section view
        this.sendPageView(e.urlAfterRedirects);
      });

    this.trackBookingClicks();
  }

  /**
   * Virtual page view from the landing pages' scroll-spy. The landing pages
   * update the URL with Location.replaceState() while scrolling, which never
   * reaches the router — so sections are reported here instead. Debounced so
   * sections merely scrolled past on the way somewhere else are not counted;
   * only a section the visitor settles on becomes a page_view.
   */
  trackSectionView(url: string): void {
    if (!this.enabled) return;
    this.cancelSectionTimer();
    this.sectionTimer = setTimeout(() => this.sendPageView(url), 800);
  }

  /** Send a custom GA4 event. No-op until consent has enabled analytics. */
  trackEvent(name: string, params?: Record<string, unknown>): void {
    if (!this.enabled) return;
    window.gtag('event', name, params ?? {});
  }

  private cancelSectionTimer(): void {
    if (this.sectionTimer !== null) {
      clearTimeout(this.sectionTimer);
      this.sectionTimer = null;
    }
  }

  // Booking-system CTAs: ".distributor-open" buttons open the Mews overlay
  // without any navigation, so those clicks are invisible to page tracking and
  // are reported explicitly. Each button's data-ga attribute names where on
  // the page it sits. The header's "Bookings and Enquiries" CTA is tracked as
  // its own event since it leads to the contact section, not straight to Mews.
  private trackBookingClicks(): void {
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const bookBtn = target?.closest('.distributor-open');
      if (bookBtn) {
        this.trackEvent('booking_open', {
          placement: bookBtn.getAttribute('data-ga') ?? 'unknown',
          variant: this.variant(),
        });
        return;
      }
      if (target?.closest('.enquire-btn')) {
        this.trackEvent('enquire_click', { variant: this.variant() });
      }
    });
  }

  // Which site variant the visitor is on, for event segmentation.
  private variant(): string {
    const url = this.router.url;
    if (url === '/booking') return 'booking';
    return url === '/corporate' || url.startsWith('/corporate/') ? 'corporate' : 'family';
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
