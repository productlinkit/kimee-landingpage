import { useRef } from 'react';
import { HONEST } from '../../config/content';
import Reveal from '../common/Reveal';
import { useHonestChar } from './useHonestChar';
import './Honest.css';

/**
 * SECTION 1.6 — THE HONEST TRUTH
 * Copy masalah di atas, lalu "solusi" di kartu kuning yang duduk di
 * pemandangan hijau. Karakter sengaja dirender SEBELUM kartu supaya badan
 * bawahnya tertutup kartu (z-index), persis seperti mockup.
 *
 * Semua aset dari /public/honest.
 */
export default function Honest({ enabled }) {
  const charRef = useRef(null);
  const cardRef = useRef(null);

  /* Koala naik dari balik kartu — dipicu kartu, jadi urutannya kartu dulu. */
  useHonestChar({ charRef, cardRef }, enabled);

  return (
    <section className="honest" id="honest">
      <div className="honest-copy">
        <Reveal as="p" className="honest-eyebrow" enabled={enabled}>
          {HONEST.eyebrow}
        </Reveal>

        <Reveal as="h2" className="honest-title" enabled={enabled}>
          {HONEST.title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </Reveal>

        <Reveal as="p" className="honest-body" enabled={enabled}>
          {HONEST.body}
        </Reveal>
      </div>

      <div className="honest-scene">
        <img
          className="honest-bg"
          src="/honest/bg-bottom.webp"
          alt=""
          aria-hidden="true"
        />

        <div className="honest-char" ref={charRef}>
          <img src="/koala-char.webp" alt="Karakter Kimee menyambut" />
        </div>

        {/* ref di anak, bukan di <Reveal> — Reveal tidak meneruskan ref. */}
        <Reveal className="honest-card" enabled={enabled}>
          <div className="honest-card-inner" ref={cardRef}>
            <h3 className="honest-card-title">{HONEST.card.title}</h3>
            <p className="honest-card-body">{HONEST.card.body}</p>
            <a className="honest-card-cta" href="#daftar">
              {HONEST.card.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
