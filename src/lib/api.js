import { API_BASE_URL } from './config';

/**
 * GET /subscription/plans — public. The backend returns localized names and
 * currency-formatted prices for `locale`, so the page renders them verbatim.
 * Resolves to `{ ok, data }`; never throws.
 */
export async function fetchPlans(locale, signal) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/subscription/plans?locale=${encodeURIComponent(locale)}`,
      { signal, headers: { Accept: 'application/json' } },
    );
    const json = await res.json();
    if (json?.status && Array.isArray(json.data?.plans) && json.data.plans.length) {
      return { ok: true, data: json.data };
    }
  } catch {
    /* network error or abort — the caller shows its retry state */
  }
  return { ok: false, data: null };
}
