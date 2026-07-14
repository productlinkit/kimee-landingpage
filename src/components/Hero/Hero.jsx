import { useEffect, useRef } from 'react';
import { HERO_SCENES } from '../../config/content';
import { USE_FALLBACK } from '../../lib/device';
import { applyFallback } from '../../lib/fallback';
import { useFrameScrubber } from '../../hooks/useFrameScrubber';
import { useHeroIntroVideo } from './useHeroIntroVideo';
import { useHeroTimeline } from './useHeroTimeline';
import ScrollHint from './ScrollHint';
import './Hero.css';

/**
 * SECTION 1 — HERO
 * Video intro → (scroll pertama) → canvas frame-scrub 240 frame,
 * dengan tiga scene teks yang muncul per baris mengikuti progress scrub.
 *
 * @param {HTMLImageElement[]} frames  frame sequence hero (sudah di-preload)
 * @param {boolean} enabled            true setelah preloader selesai
 * @param {React.RefObject} cloudsRef  dipakai sebagai endTrigger pin
 */
export default function Hero({ frames, enabled, cloudsRef }) {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const overlayLeftRef = useRef(null);
  const overlayTopRef = useRef(null);
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);

  const useScrub = enabled && !USE_FALLBACK;

  const setFrameProgress = useFrameScrubber(canvasRef, frames, {
    enabled: useScrub,
    objectPosition: 0.3,
  });

  const scrolled = useHeroIntroVideo(videoRef, useScrub);

  useHeroTimeline(
    {
      heroRef,
      stageRef,
      cloudsRef,
      overlayLeftRef,
      overlayTopRef,
      sceneRefs: { scene1Ref, scene2Ref, scene3Ref },
    },
    setFrameProgress,
    useScrub,
  );

  /* Perangkat fallback: tampilkan gambar statis + headline langsung terlihat. */
  useEffect(() => {
    if (!enabled || !USE_FALLBACK) return;
    applyFallback(heroRef.current);
    scene1Ref.current?.querySelectorAll('.line').forEach((line) => {
      line.style.opacity = 1;
      line.style.transform = 'none';
    });
  }, [enabled]);

  const heroClass = ['hero', scrolled && 'scrolled'].filter(Boolean).join(' ');

  return (
    <section className={heroClass} id="hero" ref={heroRef}>
      <div className="hero-stage" ref={stageRef}>
        <video
          className="hero-video"
          ref={videoRef}
          src="/first-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
        <img
          className="hero-fallback"
          src="/hero/frame-001.jpg"
          alt="Anak kecil memandang kepulauan mengambang bersama Sparky"
        />

        {/* Overlay gelap — opacity-nya di-drive timeline, hanya saat ada teks */}
        <div
          className="hero-overlay hero-overlay-left"
          ref={overlayLeftRef}
          aria-hidden="true"
        />
        <div
          className="hero-overlay hero-overlay-top"
          ref={overlayTopRef}
          aria-hidden="true"
        />

        <div className="hero-scenes">
          {/* Scene 1 — headline utama */}
          <div className="scene scene-1" ref={scene1Ref}>
            <h1 className="display hero-headline">
              {HERO_SCENES.headline.map((line, i) => (
                <span className="line" key={i}>
                  {line}
                </span>
              ))}
            </h1>
          </div>

          {/* Scene 2 — body copy */}
          <div className="scene scene-2" ref={scene2Ref}>
            <p className="scene-body">
              {HERO_SCENES.body.map((line, i) => (
                <span className="line" key={i}>
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Scene 3 — tagline top-center, muncul di frame 132 */}
          <div className="scene scene-3" ref={scene3Ref}>
            <p className="scene-tagline">
              {HERO_SCENES.tagline.map((line, i) => (
                <span className="line" key={i}>
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        <ScrollHint />
      </div>
    </section>
  );
}
