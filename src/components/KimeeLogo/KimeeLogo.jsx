import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { prefersReduced } from '../../lib/device';
import './KimeeLogo.css';

/**
 * Logo Kimee — fixed top-center, persistent sepanjang halaman.
 * Intro: fade-in + slide-down sekali saat preloader selesai.
 *
 * Pemusatan dilakukan .kimee-bar (fixed selebar layar + flex center), BUKAN
 * transform. Sebelumnya CSS memakai translate(-50%) SEKALIGUS GSAP
 * xPercent:-50 — keduanya bertumpuk jadi -100% dan logo melenceng ke kiri
 * (di mobile meleset ~44px). Sekarang GSAP hanya menyentuh y & opacity.
 */
export default function KimeeLogo({ enabled }) {
  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo || !enabled) return undefined;

    if (prefersReduced) {
      gsap.set(logo, { y: 0, opacity: 1 });
      return undefined;
    }

    gsap.set(logo, { y: -140, opacity: 0 });
    const tween = gsap.to(logo, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      delay: 0.3,
    });

    return () => tween.kill();
  }, [enabled]);

  return (
    <div className="kimee-bar">
      <div className="kimee-logo" ref={logoRef} aria-label="Kimee">
        <img src="/logo-kimee.png" alt="Kimee" />
      </div>
    </div>
  );
}
