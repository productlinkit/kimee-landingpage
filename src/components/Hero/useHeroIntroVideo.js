import { useEffect, useState } from 'react';

/**
 * Video intro autoplay selama halaman belum di-scroll.
 * Begitu user scroll pertama kali → crossfade ke canvas frame-scrub,
 * lalu video di-pause supaya tidak memakan resource.
 *
 * @param {React.RefObject<HTMLVideoElement>} videoRef
 * @param {boolean} enabled
 * @returns {boolean} scrolled — true setelah swap terjadi (dipakai untuk
 *          class `.hero.scrolled` yang menjalankan crossfade CSS).
 */
export function useHeroIntroVideo(videoRef, enabled) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return undefined;

    // Autoplay hanya diizinkan browser bila muted + playsinline.
    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();

    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let swapped = false;
    let pauseTimer = 0;

    const swap = () => {
      if (swapped || window.scrollY <= 2) return;
      swapped = true;
      setScrolled(true);
      // Beri waktu crossfade selesai sebelum video dihentikan.
      pauseTimer = setTimeout(() => {
        try {
          video.pause();
        } catch {
          /* video mungkin sudah dilepas */
        }
      }, 600);
      window.removeEventListener('scroll', swap);
    };
    window.addEventListener('scroll', swap, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', swap);
      clearTimeout(pauseTimer);
    };
  }, [videoRef, enabled]);

  return scrolled;
}
