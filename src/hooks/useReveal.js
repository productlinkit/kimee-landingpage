import { useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { prefersReduced } from '../lib/device';

/**
 * Reveal fade-up saat elemen masuk viewport.
 * Pakai GSAP ScrollTrigger; jatuh ke IntersectionObserver bila GSAP
 * belum aktif, dan langsung tampil bila reduced-motion.
 *
 * @param {React.RefObject<HTMLElement>} ref
 * @param {boolean} enabled — nyalakan setelah preloader selesai.
 */
export function useReveal(ref, enabled) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;

    if (prefersReduced) {
      el.classList.add('is-in');
      return undefined;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
        onStart: () => el.classList.add('is-in'),
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, enabled]);
}
