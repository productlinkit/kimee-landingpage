import { useState } from 'react';
import { FAQ } from '../../config/content';
import Reveal from '../common/Reveal';
import './Faq.css';

/**
 * SECTION 8 — FAQ
 * Accordion sederhana: satu pertanyaan terbuka pada satu waktu, default
 * semuanya tertutup (seperti mockup).
 */
export default function Faq({ enabled }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="faq-head">
        <Reveal as="p" className="faq-eyebrow" enabled={enabled}>
          {FAQ.eyebrow}
        </Reveal>
        <Reveal as="h2" className="faq-title" enabled={enabled}>
          {FAQ.title}
        </Reveal>
      </div>

      <ul className="faq-list">
        {FAQ.items.map((item, i) => {
          const isOpen = open === item.id;

          return (
            <Reveal
              as="li"
              key={item.id}
              className={`faq-item${isOpen ? ' is-open' : ''}`}
              enabled={enabled}
              style={{ transitionDelay: `${i * 0.06}s` }}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.id)}>
                <span>{item.q}</span>

                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  aria-hidden="true">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Wrapper max-height → animasi buka/tutup halus tanpa JS. */}
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
