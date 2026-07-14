/* ============================================================
   DEVICE / CAPABILITY DETECTION
   Dievaluasi sekali saat modul di-load (sama seperti versi vanilla).
   ============================================================ */

const mq = (query) =>
  typeof window !== 'undefined' && window.matchMedia(query).matches;

export const prefersReduced = mq('(prefers-reduced-motion: reduce)');
export const isCoarse = mq('(pointer: coarse)');

const isSmall = typeof window !== 'undefined' && window.innerWidth < 860;
const conn =
  typeof navigator !== 'undefined'
    ? navigator.connection || navigator.webkitConnection
    : null;
const slowNet =
  !!conn && (conn.saveData || /2g|slow-2g/.test(conn.effectiveType || ''));
const lowPower =
  typeof navigator !== 'undefined' &&
  ((navigator.deviceMemory && navigator.deviceMemory <= 2) ||
    (navigator.hardwareConcurrency &&
      navigator.hardwareConcurrency <= 4 &&
      isCoarse));

/** Perangkat lemah / hemat data / reduced-motion → pakai gambar statis. */
export const USE_FALLBACK = prefersReduced || slowNet || (isSmall && lowPower);
