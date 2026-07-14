import { useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { prefersReduced } from '../../lib/device';

const format = (n, decimals) =>
  n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const finalText = (stat) => `${format(stat.value, stat.decimals)}${stat.suffix}`;

/**
 * Satu timeline untuk seluruh band: tiap item fade-up berurutan, dan
 * angkanya menghitung 0 → nilai akhir bersamaan dengan fade-up-nya.
 *
 * Sengaja tidak memakai <Reveal>/<CountUp> per elemen: dengan satu
 * ScrollTrigger di section, stagger-nya sinkron dan tidak ada elemen yang
 * sudah "lewat" trigger-nya sendiri saat band naik menutupi hero.
 *
 * @param {React.RefObject<HTMLElement>} sectionRef
 * @param {Array<{value:number,decimals:number,suffix:string}>} stats
 * @param {boolean} enabled — nyalakan setelah preloader selesai
 */
export function useStatsTimeline(sectionRef, stats, enabled) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !enabled) return undefined;

    /* Yang dianimasikan .metrics-inner, bukan <li> — <li> memegang transform
       statis (rotate mengikuti busur) yang tidak boleh ditimpa GSAP. */
    const items = gsap.utils.toArray(section.querySelectorAll('.metrics-inner'));
    const values = gsap.utils.toArray(
      section.querySelectorAll('.metrics-value'),
    );

    /* Reduced motion: langsung tampilkan hasil akhirnya. */
    if (prefersReduced) {
      items.forEach((item) => item.classList.add('is-in'));
      values.forEach((el, i) => {
        el.textContent = finalText(stats[i]);
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((item, i) => {
        const at = i * 0.12;
        const stat = stats[i];
        const counter = { n: 0 };

        tl.fromTo(
          item,
          { opacity: 0, y: 42 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          at,
        );

        tl.to(
          counter,
          {
            n: stat.value,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              values[i].textContent = `${format(counter.n, stat.decimals)}${stat.suffix}`;
            },
            onComplete: () => {
              values[i].textContent = finalText(stat);
            },
          },
          at,
        );
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, stats, enabled]);
}
