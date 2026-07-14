import { useEffect, useRef, useState } from 'react';
import {
  PRELOAD_CONCURRENCY,
  PRELOAD_TIMEOUT_MS,
  SEQUENCES,
  SEQUENCE_KEYS,
  TOTAL_FRAMES,
} from '../config/sequences';
import { USE_FALLBACK } from '../lib/device';

/**
 * Preload semua frame dari setiap sequence dengan antrian ber-concurrency.
 *
 * Pada perangkat fallback hanya frame pertama tiap sequence yang di-load,
 * sisanya tidak pernah diminta (hemat data & memori).
 *
 * @returns {{progress: number, ready: boolean, frames: Record<string, HTMLImageElement[]>}}
 *   `frames` adalah objek stabil (ref) — array-nya diisi in-place selama
 *   preload, jadi tidak memicu re-render per gambar.
 */
export function useFramePreloader() {
  // Array frame dibuat sekali dan diisi in-place — konsumen (canvas scrubber)
  // membaca lewat referensi yang sama, tanpa re-render tiap frame selesai.
  const framesRef = useRef(
    SEQUENCE_KEYS.reduce((acc, key) => {
      acc[key] = new Array(SEQUENCES[key].count);
      return acc;
    }, {}),
  );

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const frames = framesRef.current;

    const finish = () => {
      if (cancelled) return;
      setProgress(100);
      // Jeda singkat agar bar sempat terlihat penuh sebelum preloader hilang.
      setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 300);
    };

    /* ---- Mode fallback: cukup frame pertama tiap sequence ---- */
    if (USE_FALLBACK) {
      let done = 0;
      SEQUENCE_KEYS.forEach((key) => {
        const seq = SEQUENCES[key];
        const img = new Image();
        img.onload = img.onerror = () => {
          frames[key][0] = img;
          if (++done >= SEQUENCE_KEYS.length) finish();
        };
        img.src = seq.path(1);
      });
      return () => {
        cancelled = true;
      };
    }

    /* ---- Mode penuh: antrian semua frame, N request paralel ---- */
    const queue = [];
    SEQUENCE_KEYS.forEach((key) => {
      const seq = SEQUENCES[key];
      for (let i = 1; i <= seq.count; i++) queue.push({ key, i });
    });

    let inFlight = 0;
    let loaded = 0;

    const settle = (key, i, img) => {
      frames[key][i - 1] = img;
      inFlight--;
      loaded++;
      if (cancelled) return;
      setProgress((loaded / TOTAL_FRAMES) * 100);
      if (loaded >= TOTAL_FRAMES) finish();
      else pump();
    };

    function pump() {
      while (inFlight < PRELOAD_CONCURRENCY && queue.length) {
        const { key, i } = queue.shift();
        inFlight++;
        const img = new Image();
        img.onload = () => settle(key, i, img);
        img.onerror = () => settle(key, i, null);
        img.src = SEQUENCES[key].path(i);
      }
    }
    pump();

    // Jaring pengaman: jangan biarkan user terkunci di preloader.
    const timeout = setTimeout(finish, PRELOAD_TIMEOUT_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return { progress, ready, frames: framesRef.current };
}
