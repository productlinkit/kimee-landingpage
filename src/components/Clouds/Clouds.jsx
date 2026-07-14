import { useRef } from 'react';
import { ISLANDS, ISLANDS_TITLE } from '../../config/content';
import IslandCard from './IslandCard';
import { useCloudsTimeline } from './useCloudsTimeline';
import './Clouds.css';

/**
 * SECTION 2 — CLOUDS
 * Naik menutupi hero yang sedang di-pin (pure CSS: z-index + margin-top
 * negatif), lalu men-scroll pulau-pulau secara horizontal.
 *
 * @param {React.RefObject} sectionRef — dimiliki App, dipakai Hero sebagai
 *        endTrigger pin. Karena itu ref-nya diteruskan dari luar.
 */
export default function Clouds({ sectionRef, enabled }) {
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  useCloudsTimeline(
    { sectionRef, stageRef, titleRef, trackRef, viewportRef },
    enabled,
  );

  return (
    <section
      className="clouds"
      id="clouds"
      ref={sectionRef}
      aria-label="Awan transisi">
      <div className="clouds-stage" ref={stageRef}>
        {/* Wave layer belakang (terang) */}
        <svg
          className="wave wave-back"
          viewBox="0 0 1440 1000"
          preserveAspectRatio="none"
          aria-hidden="true">
          <path
            fill="#c9e6ff"
            d="M0,190 C360,60 720,250 1080,130 C1260,80 1380,170 1440,140 L1440,1000 L0,1000 Z"
          />
        </svg>

        <div className="clouds-content">
          <h2 className="islands-title" ref={titleRef}>
            {ISLANDS_TITLE.map((line, i) => (
              <span className="line" key={i}>
                {line}
              </span>
            ))}
          </h2>

          <div
            className="islands-viewport"
            ref={viewportRef}
            aria-label="Pulau pembelajaran">
            <div className="islands-track" ref={trackRef}>
              {ISLANDS.map((island) => (
                <IslandCard key={island.id} {...island} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
