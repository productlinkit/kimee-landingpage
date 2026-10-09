import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPlans } from '../../lib/api';
import { checkoutUrl, freeSignupUrl } from '../../lib/appLinks';
import Reveal from '../common/Reveal';
import './Pricing.css';

/** Price of nothing, in the currency the backend picked for this language. */
function zeroPrice(locale, currencyCode) {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(0);
  } catch {
    return '0';
  }
}

/** The plan with the biggest saving gets the "Best Value" badge, unless it is already the popular one. */
function bestValueCode(plans) {
  const best = plans.reduce((a, p) => (p.savings_percent > (a?.savings_percent ?? 0) ? p : a), null);
  return best && !best.is_popular ? best.code : null;
}

export default function Pricing({ enabled }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const [state, setState] = useState({ status: 'loading', data: null });
  const [reloadKey, setReloadKey] = useState(0);

  const retry = useCallback(() => {
    setState({ status: 'loading', data: null });
    setReloadKey((k) => k + 1);
  }, []);

  // Prices follow the language: the backend quotes each locale in its currency.
  useEffect(() => {
    const controller = new AbortController();
    setState((s) => (s.data ? s : { status: 'loading', data: null }));
    fetchPlans(locale, controller.signal).then((res) => {
      if (controller.signal.aborted) return;
      setState(res.ok ? { status: 'ready', data: res.data } : { status: 'error', data: null });
    });
    return () => controller.abort();
  }, [locale, reloadKey]);

  const plans = state.data?.plans ?? [];
  const currency = state.data?.currency?.code;
  const bestCode = bestValueCode(plans);

  return (
    <section className="pricing" id="daftar">
      <div className="pricing-head">
        <Reveal as="p" className="pricing-eyebrow" enabled={enabled}>
          {t('pricing.eyebrow')}
        </Reveal>
        <Reveal as="h2" className="pricing-title" enabled={enabled}>
          {t('pricing.title')}
        </Reveal>
      </div>

      {state.status === 'loading' && (
        <p className="pricing-status" role="status">
          {t('pricing.loading')}
        </p>
      )}

      {state.status === 'error' && (
        <div className="pricing-status" role="alert">
          <p>{t('pricing.error')}</p>
          <button type="button" className="plan-cta is-yellow pricing-retry" onClick={retry}>
            {t('pricing.retry')}
          </button>
        </div>
      )}

      {state.status === 'ready' && (
        <>
          <ul className="pricing-plans">
            <Reveal as="li" className="plan" enabled={enabled}>
              <p className="plan-name">{t('pricing.free.name')}</p>
              <p className="plan-price">{zeroPrice(locale, currency)}</p>
              <ul className="plan-features">
                {t('pricing.free.features', { returnObjects: true }).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className="plan-cta is-muted" href={freeSignupUrl(locale)}>
                {t('pricing.free.cta')}
              </a>
            </Reveal>

            {plans.map((plan, i) => {
              const accent = plan.is_popular ? 'popular' : plan.code === bestCode ? 'best' : '';
              const tone = accent === 'popular' ? 'green' : accent === 'best' ? 'yellow' : 'muted';
              const badge =
                accent === 'popular' ? t('pricing.popular') : accent === 'best' ? t('pricing.best') : '';
              const cta =
                plan.trial_days > 0
                  ? t('pricing.ctaTrial', { days: plan.trial_days })
                  : t('pricing.ctaChoose', { name: plan.name });

              return (
                <Reveal
                  as="li"
                  key={plan.code}
                  className={`plan${accent ? ` is-${accent}` : ''}`}
                  enabled={enabled}
                  style={{ transitionDelay: `${(i + 1) * 0.06}s` }}>
                  {badge && <span className="plan-badge">{badge}</span>}

                  <p className="plan-name">{plan.name}</p>

                  <p className="plan-price">
                    {plan.price_display}
                    {plan.period_label && <span className="plan-period"> {plan.period_label}</span>}
                  </p>
                  {plan.compare_at_display && (
                    <p className="plan-compare">{plan.compare_at_display}</p>
                  )}

                  <ul className="plan-features">
                    {plan.savings_percent > 0 && (
                      <li>{t('pricing.save', { percent: plan.savings_percent })}</li>
                    )}
                    {(plan.features ?? []).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <a
                    className={`plan-cta is-${tone}`}
                    href={checkoutUrl(locale, plan.code, currency)}>
                    {cta}
                  </a>
                </Reveal>
              );
            })}
          </ul>
          <p className="pricing-legal">{t('pricing.legal')}</p>
        </>
      )}
    </section>
  );
}
