import { useEffect, useRef } from 'react';
import './ScrollProgress.css';

/**
 * Strip progress vertikal di sisi kanan viewport.
 * Tinggi bar di-set langsung ke DOM di dalam rAF (bukan lewat state)
 * supaya tidak memicu re-render tiap scroll.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    let ticking = false;

    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const max = h.scrollHeight - h.clientHeight || 1;
      bar.style.height = `${(scrolled / max) * 100}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(update);
      ticking = true;
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <i ref={barRef} />
    </div>
  );
}
