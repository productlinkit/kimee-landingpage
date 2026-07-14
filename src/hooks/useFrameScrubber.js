import { useCallback, useEffect, useRef } from 'react';

/**
 * Frame scrubber generik untuk <canvas>.
 * Menggambar frame dengan perilaku `object-fit: cover` + bias posisi vertikal,
 * lalu meng-update frame di dalam rAF loop (bukan langsung di scroll handler)
 * agar tetap 60fps saat scrub.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {HTMLImageElement[]} frames        array frame (boleh terisi bertahap)
 * @param {object}   options
 * @param {boolean}  options.enabled         aktifkan hanya setelah preload selesai
 * @param {number}   options.objectPosition  0 = top, .5 = center, 1 = bottom
 * @returns {(p: number) => void} setProgress — terima nilai 0..1
 */
export function useFrameScrubber(
  canvasRef,
  frames,
  { enabled = true, objectPosition = 0.5 } = {},
) {
  // target = frame yang diinginkan (float), current = frame yang sedang tampil.
  const targetRef = useRef(0);
  const currentRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return undefined;

    const ctx = canvas.getContext('2d', { alpha: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;

    const drawCover = (img) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) * objectPosition;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const render = (idx, force) => {
      const clamped = Math.max(
        0,
        Math.min(frames.length - 1, Math.round(idx)),
      );
      if (!force && clamped === currentRef.current) return;
      const img = frames[clamped];
      if (!img || !img.complete) return;
      drawCover(img);
      currentRef.current = clamped;
    };

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      // Canvas dikosongkan oleh browser saat width/height berubah → paksa redraw.
      render(currentRef.current < 0 ? 0 : currentRef.current, true);
    };

    const tick = () => {
      if (Math.round(targetRef.current) !== currentRef.current) {
        render(targetRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };

    resize();
    render(0, true);
    rafId = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, frames, enabled, objectPosition]);

  return useCallback(
    (p) => {
      targetRef.current = p * (frames.length - 1);
    },
    [frames],
  );
}
