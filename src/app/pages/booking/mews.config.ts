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
  // TODO: replace with the real Configuration ID(s) from your Mews DEMO property.
  configurationIds: ['00000000-0000-0000-0000-000000000000'],
  // Demo environment. Remove this (and switch the loader script in index.html
  // back to api.mews.com) when going to production.
  dataBaseUrl: 'https://api.mews-demo.com',
};
