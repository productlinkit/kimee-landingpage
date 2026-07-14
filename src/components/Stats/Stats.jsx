import { useRef } from 'react';
import { HERO_STATS } from '../../config/content';
import { useStatsTimeline } from './useStatsTimeline';
import './Stats.css';

/**
 * SECTION 1.5 — STATS BAND
 * Band melengkung (#5D9FBF) yang naik menutupi bagian bawah hero yang
 * sedang di-pin.
 *
 * Namespace class-nya `metrics-*`, BUKAN `stats-*`: Feature.css sudah
 * memakai `.stats` (+ `.stats span`, `.stats li`) untuk daftar statistiknya,
 * dan aturan itu ikut mengenai section ini kalau namanya sama.
 *
 * Bentuknya digambar SVG (bukan border-radius): satu path biru dengan tepi
 * atas menggunung, lalu satu path terang menimpanya dari bawah sehingga tepi
 * bawah band ikut melengkung. preserveAspectRatio="none" → path melar
 * mengikuti lebar viewport, jadi tidak ada elemen yang melebihi layar.
 *
 * Item: <li> memegang transform statis (turun + miring) agar barisnya
 * mengikuti busur; <div.metrics-inner> di dalamnya yang dianimasikan GSAP,
 * supaya dua transform itu tidak saling menimpa.
 */
export default function Stats({ enabled }) {
  const sectionRef = useRef(null);

  useStatsTimeline(sectionRef, HERO_STATS, enabled);

  return (
    <section
      className="metrics"
      id="metrics"
      ref={sectionRef}
      aria-label="Kimee dalam angka">
      <div className="metrics-band">
        <svg
          className="metrics-shape"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true">
          {/* Badan biru — tepi atas melengkung naik ke tengah */}
          <path
            fill="#5d9fbf"
            d="M0,64 C380,2 1060,2 1440,64 L1440,320 L0,320 Z"
          />
          {/* Latar terang menimpa bagian bawah → tepi bawah jadi busur,
              biru lebih tebal di sisi kiri/kanan (seperti mockup) */}
          <path
            fill="#f2f6fd"
            d="M0,312 C380,232 1060,232 1440,312 L1440,320 L0,320 Z"
          />
        </svg>

        <ul className="metrics-list">
          {HERO_STATS.map((stat) => (
            <li className="metrics-item" key={stat.label}>
              <div className="metrics-inner">
                {/* Isi awal "0" ditimpa timeline; angka tetap ada
                    meski GSAP gagal jalan. */}
                <span className="metrics-value">0{stat.suffix}</span>
                <span className="metrics-label">{stat.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Lanjutan latar terang, melandai ke warna atas .clouds-stage. */}
      <div className="metrics-tail" aria-hidden="true" />
    </section>
  );
}
