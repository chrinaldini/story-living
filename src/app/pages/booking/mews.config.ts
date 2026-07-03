/**
 * Mews Booking Engine (Distributor) configuration.
 *
 * `configurationIds` come from Mews Operations:
 *   Settings → Services → Stay → Booking engines → (open engine) → Configuration ID
 *
 * For testing against the Mews demo environment, set `dataBaseUrl` to
 * 'https://api.mews-demo.com'. Leave it undefined for production (api.mews.com),
 * which the loader script in index.html already points at.
 */
export interface MewsConfig {
  configurationIds: string[];
  dataBaseUrl?: string;
}

export const MEWS_CONFIG: MewsConfig = {
  // Production Mews account (Story Hotels). This is the identifier from Mews
  // Operations → General settings. If the widget loads the wrong/empty property,
  // use the booking engine's Configuration ID instead
  // (Settings → Services → Stay → Booking engines → Configuration ID).
  configurationIds: ['ee98480b-77ff-4e50-afa1-b46a00c508b0'],
  // Production uses api.mews.com (the loader script in index.html points there),
  // so no demo dataBaseUrl override.
};
