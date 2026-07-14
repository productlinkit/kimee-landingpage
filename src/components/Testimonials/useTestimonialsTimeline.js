import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { USE_FALLBACK } from '../../lib/device';

/**
 * Kartu berjalan naik selama section di-pin.
 *
 * Titik akhirnya dihitung, bukan ditebak: y_akhir dibuat sedemikian rupa
 * sehingga TENGAH kartu terakhir jatuh tepat di TENGAH viewport —
 *   y = (tinggi viewport / 2) − (offsetTop kartu terakhir + tingginya / 2)
 * Dihitung lewat fungsi supaya ikut dihitung ulang saat ScrollTrigger.refresh()
 * (resize / font selesai load).
 */
export function useTestimonialsTimeline({ sectionRef, stageRef, trackRef }, enabled) {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track || !enabled) return undefined;

    /* Fallback & layar sempit: tanpa pin — kartu jadi daftar biasa.
       Batas 900px sama dengan media query di Testimonials.css yang mengubah
       layout jadi satu kolom; kalau pin tetap jalan, stage-nya jadi kacau. */
    if (USE_FALLBACK || window.innerWidth <= 900) {
      section.classList.add('is-static');
      return undefined;
    }

    const ctx = gsap.context(() => {
      const startY = () => window.innerHeight * 0.3;
      const endY = () => {
        const last = track.lastElementChild;
        if (!last) return 0;
        return window.innerHeight / 2 - (last.offsetTop + last.offsetHeight / 2);
      };

      gsap.fromTo(
        track,
        { y: startY },
        {
          y: endY,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: stage,
            pinSpacing: false,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [sectionRef, stageRef, trackRef, enabled]);
}
