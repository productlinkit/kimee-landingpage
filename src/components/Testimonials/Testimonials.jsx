import { useRef } from 'react';
import { TESTIMONIALS } from '../../config/content';
import Reveal from '../common/Reveal';
import { useTestimonialsTimeline } from './useTestimonialsTimeline';
import './Testimonials.css';

/**
 * SECTION 7 — TESTIMONI
 * Stage di-pin; kolom kartu di kanan berjalan dari bawah ke atas mengikuti
 * scroll, berhenti tepat saat kartu TERAKHIR berada di tengah viewport.
 */
export default function Testimonials({ enabled }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);

  useTestimonialsTimeline({ sectionRef, stageRef, trackRef }, enabled);

  return (
    <section className="tm" id="testimoni" ref={sectionRef}>
      <div className="tm-stage" ref={stageRef}>
        <div className="tm-inner">
          <div className="tm-copy">
            <Reveal as="p" className="tm-eyebrow" enabled={enabled}>
              {TESTIMONIALS.eyebrow}
            </Reveal>
            <Reveal as="h2" className="tm-title" enabled={enabled}>
              {TESTIMONIALS.title.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </Reveal>
          </div>

          <div className="tm-viewport">
            <ul className="tm-track" ref={trackRef}>
              {TESTIMONIALS.items.map((item) => (
                <li className="tm-card" key={item.id}>
                  <p className="tm-stars" aria-label="5 dari 5 bintang">
                    ★★★★★
                  </p>

                  <blockquote className="tm-quote">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="tm-person">
                    <span
                      className="tm-avatar"
                      style={{ background: item.color }}
                      aria-hidden="true">
                      {item.name.charAt(0)}
                    </span>
                    <span>
                      <span className="tm-name">{item.name}</span>
                      <span className="tm-city">{item.city}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
