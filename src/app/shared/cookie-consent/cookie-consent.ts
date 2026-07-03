import { Component, inject, signal } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics';

const CONSENT_KEY = 'sl-analytics-consent';
type Consent = 'granted' | 'denied';

/**
 * Bottom cookie-consent banner. Google Analytics is only loaded once the
 * visitor clicks "Accept". The choice is remembered in localStorage so the
 * banner is shown only until the visitor has decided.
 */
@Component({
  selector: 'sl-cookie-consent',
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss',
})
export class CookieConsentComponent {
  private readonly analytics = inject(AnalyticsService);

  readonly visible = signal(false);

  constructor() {
    const stored = this.read();
    if (stored === 'granted') {
      this.analytics.enable();
    } else if (stored === null) {
      this.visible.set(true); // no choice yet → ask
    }
    // 'denied' → stay hidden and never load GA.
  }

  accept(): void {
    this.store('granted');
    this.analytics.enable();
    this.visible.set(false);
  }

  decline(): void {
    this.store('denied');
    this.visible.set(false);
  }

  private read(): Consent | null {
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      return v === 'granted' || v === 'denied' ? v : null;
    } catch {
      return null;
    }
  }

  private store(v: Consent): void {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {
      /* localStorage unavailable (private mode) — ignore */
    }
  }
}
