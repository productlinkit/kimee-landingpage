import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

/* Timing scene (dalam progress 0..1 dari scrub hero):
     scene-1 : 0.00 → 0.28   fade-up per baris, fade-out ~0.24
     scene-2 : 0.32 → 0.55   fade-up per baris, fade-out ~0.50
     overlay : left → top di sekitar 0.52 – 0.55
     scene-3 : 0.55 → 1.00   frame 132/240 ≈ 0.55, lalu STAY   */

/**
 * Pin hero-stage + timeline scrub (frame sequence & teks per baris).
 *
 * Dua ScrollTrigger terpisah, sengaja:
 *  - PIN  : hero-stage tetap diam sepanjang hero DAN clouds, baru lepas
 *           saat clouds keluar viewport. pinSpacing dimatikan karena
 *           clouds sudah memakai margin-top negatif.
 *  - SCRUB: hanya sepanjang hero. Setelah selesai, progress tetap 1 →
 *           frame 240 tetap tampil di belakang clouds.
 *
 * @param {object} refs
 * @param {(p: number) => void} setFrameProgress
 * @param {boolean} enabled
 */
export function useHeroTimeline(
  { heroRef, stageRef, cloudsRef, overlayLeftRef, overlayTopRef, sceneRefs },
  setFrameProgress,
  enabled,
) {
  const { scene1Ref, scene2Ref, scene3Ref } = sceneRefs;

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    const clouds = cloudsRef.current;
    if (!hero || !stage || !clouds || !enabled) return undefined;

    const linesOf = (ref) =>
      ref.current ? gsap.utils.toArray(ref.current.querySelectorAll('.line')) : [];

    const ctx = gsap.context(() => {
      const lines1 = linesOf(scene1Ref);
      const lines2 = linesOf(scene2Ref);
      const lines3 = linesOf(scene3Ref);
      const ovLeft = overlayLeftRef.current;
      const ovTop = overlayTopRef.current;

      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        endTrigger: clouds,
        end: 'bottom top', // clouds.bottom bertemu viewport.top → un-pin
        pin: stage,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => setFrameProgress(self.progress),
        },
      });

      /* ---- SCENE 1 ---- */
      tl.to(ovLeft, { opacity: 1, duration: 0.04 }, 0.0);
      lines1.forEach((line, i) => {
        tl.to(line, { opacity: 1, y: 0, duration: 0.06 }, 0.02 + i * 0.05);
      });
      lines1.forEach((line, i) => {
        tl.to(line, { opacity: 0, y: -30, duration: 0.04 }, 0.24 + i * 0.015);
      });

      /* ---- SCENE 2 ---- */
      lines2.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.06 },
          0.32 + i * 0.035,
        );
      });
      lines2.forEach((line, i) => {
        tl.to(line, { opacity: 0, y: -30, duration: 0.04 }, 0.5 + i * 0.01);
      });

      /* ---- OVERLAY: left → top ---- */
      tl.to(ovLeft, { opacity: 0, duration: 0.06 }, 0.52).to(
        ovTop,
        { opacity: 1, duration: 0.06 },
        0.55,
      );

      /* ---- SCENE 3 (stay sampai akhir) ---- */
      lines3.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.08 },
          0.56 + i * 0.05,
        );
      });

      // Penanda agar total durasi timeline = 1 (sepanjang range scrub).
      tl.to({}, { duration: 0.001 }, 1.0);
    }, hero);

    return () => ctx.revert();
  }, [
    heroRef,
    stageRef,
    cloudsRef,
    overlayLeftRef,
    overlayTopRef,
    scene1Ref,
    scene2Ref,
    scene3Ref,
    setFrameProgress,
    enabled,
  ]);
}
