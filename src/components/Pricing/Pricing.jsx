import { PRICING } from '../../config/content';
import Reveal from '../common/Reveal';
import './Pricing.css';

export default function Pricing({ enabled }) {
  return (
    <section className="pricing" id="daftar">
      <div className="pricing-head">
        <Reveal as="p" className="pricing-eyebrow" enabled={enabled}>
          {PRICING.eyebrow}
        </Reveal>
        <Reveal as="h2" className="pricing-title" enabled={enabled}>
          {PRICING.title}
        </Reveal>
      </div>

      <ul className="pricing-plans">
        {PRICING.plans.map((plan, i) => (
          <Reveal
            as="li"
            key={plan.id}
            className={`plan${plan.accent ? ` is-${plan.accent}` : ''}`}
            enabled={enabled}
            style={{ transitionDelay: `${i * 0.06}s` }}>
            {plan.badge && <span className="plan-badge">{plan.badge}</span>}

            <p className="plan-name">{plan.name}</p>

            <p className="plan-price">
              {plan.price}
              {plan.period && (
                <span className="plan-period">{plan.period}</span>
              )}
            </p>

            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <a className={`plan-cta is-${plan.tone}`} href="#daftar">
              {plan.cta}
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
