import { Injectable } from '@angular/core';

// ─────────────────────────────────────────────────────────────────────────────
// Runnr.ai webchat widget — REPLACE THESE with the real values.
// Get them from the Runnr dashboard once the property is live:
//   Messaging channels → Webchat → enable → copy the embed snippet.
// Runnr normally hands you a loader <script> with a per-property id. Put the
// loader URL and the id here. If they instead give a full inline snippet that
// does more than load one script, drop it into loadWidget() below verbatim.
// This is the only place these values need to change.
// ─────────────────────────────────────────────────────────────────────────────
export const RUNNR_WIDGET_SRC = 'https://REPLACE_ME.runnr.ai/widget/loader.js'; // ← placeholder
export const RUNNR_PROPERTY_ID = 'REPLACE_ME'; // ← placeholder property/account id

/**
 * Loads the Runnr.ai webchat widget (the AI-concierge chat bubble) on demand.
 * Mirrors AnalyticsService: the widget is a third-party embed that may set
 * cookies, so it is only injected after the visitor grants consent — see
 * CookieConsentComponent, the single caller of enable().
 *
 * To load the widget for every visitor instead (treat it as a strictly
 * functional service), call enable() from app startup rather than from the
 * consent banner — no change is needed here.
 */
@Injectable({ providedIn: 'root' })
export class RunnrChatService {
  private enabled = false;

  /** Inject the Runnr webchat loader. Idempotent. */
  enable(): void {
    if (this.enabled) return;
    // Do nothing until the real embed values are filled in above — this keeps
    // the widget wired and consent-gated without firing a failed request while
    // the placeholders are still in place. It activates automatically once the
    // constants hold real values.
    if (RUNNR_WIDGET_SRC.includes('REPLACE_ME') || RUNNR_PROPERTY_ID.includes('REPLACE_ME')) {
      return;
    }
    this.enabled = true;
    this.loadWidget();
  }

  private loadWidget(): void {
    // The standard Runnr embed is a single async loader script carrying the
    // property id. Swap the two constants above for the real values; if Runnr
    // gives a richer inline snippet, replace this method's body with it.
    const loader = document.createElement('script');
    loader.async = true;
    loader.src = RUNNR_WIDGET_SRC;
    loader.setAttribute('data-property-id', RUNNR_PROPERTY_ID);
    document.body.appendChild(loader);
  }
}
