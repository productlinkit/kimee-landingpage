import { HOW_IT_WORKS } from '../../config/content';
import Reveal from '../common/Reveal';
import './HowItWorks.css';

/**
 * SECTION 5 — HOW IT WORKS
 * Section pertama yang menutupi .sparky (yang stage-nya masih di-pin), jadi
 * id="how" dipakai .sparky sebagai endTrigger pin-nya — jangan diubah tanpa
 * ikut memperbarui useSparkyTimeline.
 */
export default function HowItWorks({ enabled }) {
  return (
    <section className="how" id="how">
      <div className="how-head">
        <Reveal as="p" className="how-eyebrow" enabled={enabled}>
          {HOW_IT_WORKS.eyebrow}
        </Reveal>
        <Reveal as="h2" className="how-title" enabled={enabled}>
          {HOW_IT_WORKS.title}
        </Reveal>
      </div>

      <ol className="how-steps">
        {HOW_IT_WORKS.steps.map((step, i) => (
          <Reveal
            as="li"
            className="how-step"
            key={step.n}
            enabled={enabled}
            style={{ transitionDelay: `${i * 0.08}s` }}>
            <span className="how-step-num">{step.n}</span>
            <h3 className="how-step-title">{step.title}</h3>
            <p className="how-step-body">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
