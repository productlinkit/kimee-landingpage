import { APP_URL } from './config';

/** Free path: the app's normal onboarding (parent setup → child setup → profile). */
export function freeSignupUrl(locale) {
  return `${APP_URL}/${locale}/onboarding/parent-setup`;
}

/**
 * Paid path: the app registers the buyer, opens Stripe, and — once paid —
 * continues into parent and child setup.
 */
export function checkoutUrl(locale, planCode, currencyCode) {
  const qs = new URLSearchParams({ plan: planCode });
  if (currencyCode) qs.set('currency', currencyCode);
  return `${APP_URL}/${locale}/checkout?${qs}`;
}
