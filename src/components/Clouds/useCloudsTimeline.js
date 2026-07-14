import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { prefersReduced } from '../../lib/device';

/**
 * CLOUDS — efek "cover" hero-nya murni CSS (hero pinned + margin-top
 * negatif + z-index), jadi timeline di sini hanya untuk dekorasi:
 *   - parallax halus dua layer wave (depan lebih cepat → ilusi kedalaman)
 *   - reveal judul per baris
 *
 * Dan horizontal scroll pulau:
 *   scroll vertikal → translateX pada .islands-track.
 *   Tinggi section = viewport + (jarak track × ratio), sehingga fase sticky
 *   berakhir TEPAT saat horizontal scroll selesai — tidak ada dead zone
 *   yang bisa membuat hero di belakangnya terekspos.
 */
export function useCloudsTimeline(
  { sectionRef, stageRef, titleRef, trackRef, viewportRef },
  enabled,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track || !enabled) return undefined;

    /* ---- Fallback: horizontal scroll native (masih bisa di-swipe) ---- */
    if (prefersReduced) {
      const viewport = viewportRef.current;
      if (viewport) {
        viewport.style.overflowX = 'auto';
        viewport.style.scrollSnapType = 'x mandatory';
      }
      return undefined;
    }

    const getDistance = () =>
      Math.max(0, track.scrollWidth - window.innerWidth);
    const SCROLL_RATIO = 1.2;

    const sizeSection = () => {
      section.style.height = `${
        window.innerHeight + getDistance() * SCROLL_RATIO
      }px`;
    };

    const ctx = gsap.context(() => {
      /* ---- Parallax wave + reveal judul ---- */
      const waveBack = stage.querySelector('.wave-back');
      const waveFront = stage.querySelector('.wave-front');
      const titleLines = titleRef.current
        ? gsap.utils.toArray(titleRef.current.querySelectorAll('.line'))
        : [];

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top bottom', // clouds menyentuh bawah viewport (≈ frame 224)
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      if (waveBack) {
        tl.fromTo(waveBack, { yPercent: 8 }, { yPercent: -8, duration: 1 }, 0);
      }
      if (waveFront) {
        tl.fromTo(
          waveFront,
          { yPercent: 16 },
          { yPercent: -16, duration: 1 },
          0,
        );
      }

      titleLines.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' },
          0.1 + i * 0.08,
        );
      });

      /* ---- Horizontal scroll pulau ---- */
      sizeSection();

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance() * SCROLL_RATIO}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    // Tinggi clouds berubah → pin hero (yang endTrigger-nya clouds) harus
    // menghitung ulang posisinya.
    ScrollTrigger.refresh();

    const onResize = () => {
      sizeSection();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
      section.style.height = '';
    };
  }, [sectionRef, stageRef, titleRef, trackRef, viewportRef, enabled]);
}
