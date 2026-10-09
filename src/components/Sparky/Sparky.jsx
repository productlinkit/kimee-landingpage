import { useTranslation } from 'react-i18next';
import { useCallback, useRef, useState } from 'react';
import { useContent } from '../../config/content';
import { useSparkyTimeline } from './useSparkyTimeline';
import './Sparky.css';

/**
 * SECTION 4 — MEET SPARKY
 * Stage di-pin; scroll men-scrub satu timeline:
 *   1. teks raksasa "MEET SPARKY" jalan kanan → kiri sampai habis
 *   2. podium naik lalu hilang
 *   3. device mengecil & naik, pohon masuk dari kiri/kanan, copy reveal
 *   4. GIF katak naik dari bawah section (looping)
 *
 * GIF-nya ~2MB, jadi src-nya baru dipasang saat fase copy tercapai
 * (`frogIn`) — bukan ikut diunduh saat halaman dibuka.
 *
 * Semua elemen dipusatkan lewat left/top + xPercent/yPercent (di-set GSAP),
 * BUKAN translate(-50%,-50%) di CSS — supaya transform-nya tidak ditimpa
 * saat timeline menganimasikan x/y/scale.
 */
export default function Sparky({ enabled }) {
  const { t } = useTranslation();
  const { SPARKY } = useContent();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const marqueeRef = useRef(null);
  const deviceRef = useRef(null);
  const podiumRef = useRef(null);
  const treeLeftRef = useRef(null);
  const treeRightRef = useRef(null);
  const copyRef = useRef(null);
  const frogRef = useRef(null);

  const [frogIn, setFrogIn] = useState(false);

  /* useCallback wajib: fungsi ini masuk dependency useEffect di dalam
     useSparkyTimeline. Kalau identitasnya berganti tiap render, timeline-nya
     dibangun ulang terus-menerus. */
  const handleFrogCue = useCallback(() => setFrogIn(true), []);

  useSparkyTimeline(
    {
      sectionRef,
      stageRef,
      marqueeRef,
      deviceRef,
      podiumRef,
      treeLeftRef,
      treeRightRef,
      copyRef,
      frogRef,
    },
    enabled,
    handleFrogCue,
  );

  return (
    <section className="sparky" id="sparky" ref={sectionRef}>
      <div className="sparky-stage" ref={stageRef}>
        <h2 className="sparky-marquee" ref={marqueeRef} aria-hidden="true">
          {SPARKY.marquee}
        </h2>

        <img
          className="sparky-tree sparky-tree-left"
          ref={treeLeftRef}
          src="/sparky/tree.webp"
          alt=""
          aria-hidden="true"
        />
        <img
          className="sparky-tree sparky-tree-right"
          ref={treeRightRef}
          src="/sparky/tree.webp"
          alt=""
          aria-hidden="true"
        />

        <img
          className="sparky-podium"
          ref={podiumRef}
          src="/sparky/podium.webp"
          alt=""
          aria-hidden="true"
        />

        <img
          className="sparky-device"
          ref={deviceRef}
          src="/sparky/device.webp"
          alt={t('sparky.alt')}
        />

        <div className="sparky-copy" ref={copyRef}>
          <h3 className="sparky-title">
            {SPARKY.title.map((line, i) => (
              <span className="sparky-line" key={i}>
                {line}
              </span>
            ))}
          </h3>
          <p className="sparky-body">{SPARKY.body}</p>
        </div>

        {/* src baru dipasang setelah fase copy → GIF tidak diunduh di awal
            dan animasinya mulai dari frame pertama saat naik. */}
        <img
          className="sparky-frog"
          ref={frogRef}
          src={frogIn ? '/frog-ai.gif' : undefined}
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
