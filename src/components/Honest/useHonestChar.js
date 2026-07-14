import { useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { prefersReduced } from '../../lib/device';

/**
 * Koala naik dari balik kartu kuning — SETELAH kartunya muncul.
 *
 * Trigger-nya kartu (bukan koala): jadi urutannya pasti kartu dulu, koala
 * menyusul lewat `delay`. Titik awalnya digeser ke bawah sejauh sebagian
 * tinggi koala, jadi ia benar-benar keluar dari belakang kartu (z-index
 * koala 1 < kartu 2), bukan sekadar fade-in di tempat.
 */
export function useHonestChar({ charRef, cardRef }, enabled) {
  useEffect(() => {
    const char = charRef.current;
    const card = cardRef.current;
    if (!char || !card || !enabled) return undefined;

    if (prefersReduced) {
      gsap.set(char, { y: 0, autoAlpha: 1 });
      return undefined;
    }

    const tween = gsap.fromTo(
      char,
      { y: () => char.offsetHeight * 0.7, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        delay: 0.45, // beri jeda: kartu selesai reveal dulu
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          invalidateOnRefresh: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [charRef, cardRef, enabled]);
}
