import { useContent } from '../../config/content';
import Reveal from '../common/Reveal';
import './Cta.css';

/**
 * SECTION 9 — CTA PENUTUP
 * Kartu hijau; karakternya sengaja menyembul KE ATAS tepi kartu (kartu
 * overflow-nya visible, karakter dipatok ke dasar kartu tapi lebih tinggi
 * dari kartunya).
 */
export default function Cta({ enabled }) {
  const { CTA } = useContent();
  return (
    <section className="cta" id="cta">
      <Reveal className="cta-card" enabled={enabled}>
        <div className="cta-copy">
          <h2 className="cta-title">
            {CTA.title.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h2>

          <p className="cta-body">{CTA.body}</p>

          <a className="cta-button" href="#daftar">
            {CTA.button}
          </a>
        </div>

        <img
          className="cta-char"
          src="/rabbit-char.webp"
          alt=""
          aria-hidden="true"
        />
      </Reveal>
    </section>
  );
}
