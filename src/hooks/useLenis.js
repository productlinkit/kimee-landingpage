import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { prefersReduced } from '../lib/device';
import { setLenis } from '../lib/scroll';

/**
 * Smooth scroll (Lenis) yang di-drive oleh gsap.ticker dan disinkronkan
 * dengan ScrollTrigger. Dimatikan bila user meminta reduced motion.
 *
 * @param {boolean} enabled — nyalakan hanya setelah preloader selesai.
 */
export function useLenis(enabled) {
  useEffect(() => {
    if (!enabled || prefersReduced) return undefined;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    const onScroll = () => ScrollTrigger.update();
    const raf = (time) => lenis.raf(time * 1000); // gsap.ticker pakai detik

    lenis.on('scroll', onScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis); // dipakai tombol scroll-to-top

    return () => {
      setLenis(null);
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33); // kembalikan default GSAP
      lenis.destroy();
    };
  }, [enabled]);
}
