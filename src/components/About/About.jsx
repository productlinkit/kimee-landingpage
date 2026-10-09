import { useState } from 'react';
import { useContent } from '../../config/content';
import Reveal from '../common/Reveal';
import './About.css';

/**
 * SECTION 1.7 — WHAT IS KIMEE (accordion)
 * Satu kartu aktif pada satu waktu; default kartu pertama. Kartu terbuka saat
 * di-hover (klik & focus juga, untuk touch dan keyboard).
 *
 * GIF-nya ~13MB per kartu, jadi TIDAK boleh dimuat semua di awal. `loaded`
 * mencatat kartu mana yang pernah aktif; hanya itu yang <img gif>-nya
 * dirender — dan tetap dibiarkan ter-mount agar kembali ke kartu itu instan.
 * Selama GIF-nya belum selesai diunduh, JPEG-nya yang tampil di bawahnya.
 *
 * Kartu bukan <button> karena di dalamnya ada CTA <a> (button dalam button
 * itu HTML tidak valid). Keyboard tetap kebagian lewat tabIndex + onFocus.
 */
export default function About({ enabled }) {
  const { ABOUT } = useContent();
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(() => new Set([0]));

  const open = (i) => {
    if (i === active) return;
    setActive(i);
    setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  };

  return (
    <section className="about" id="about">
      <div className="about-head">
        <Reveal as="p" className="about-eyebrow" enabled={enabled}>
          {ABOUT.eyebrow}
        </Reveal>

        <Reveal as="h2" className="about-title" enabled={enabled}>
          {ABOUT.title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </Reveal>
      </div>

      <Reveal className="about-deck" enabled={enabled}>
        {ABOUT.cards.map((card, i) => {
          const isActive = i === active;

          return (
            <div
              key={card.id}
              className={`about-card${isActive ? ' is-active' : ''}`}
              aria-expanded={isActive}
              tabIndex={0}
              onMouseEnter={() => open(i)}
              onFocus={() => open(i)}
              onClick={() => open(i)}>
              <div className="about-card-media">
                <img className="about-card-still" src={card.image} alt="" />

                {loaded.has(i) && (
                  <img
                    className="about-card-motion"
                    src={card.gif}
                    alt=""
                    aria-hidden="true"
                  />
                )}

                {/* Judul vertikal — hanya terbaca saat kartu tertutup. */}
                <span className="about-card-spine">{card.title}</span>
              </div>

              <div className="about-card-panel">
                <div className="about-card-copy">
                  <h3 className="about-card-title">{card.title}</h3>
                  <p className="about-card-body">{card.body}</p>
                  <a className="about-cta" href="#daftar">
                    Learn Now
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
