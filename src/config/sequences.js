/* ============================================================
   FRAME SEQUENCE CONFIG
   Satu sequence: hero (video intro scrub).
   ============================================================ */
const pad = (i) => String(i).padStart(3, '0');

export const SEQUENCES = {
  hero: {
    count: 240,
    path: (i) => `/hero/frame-${pad(i)}.jpg`,
  },
};

export const SEQUENCE_KEYS = Object.keys(SEQUENCES);

export const TOTAL_FRAMES = SEQUENCE_KEYS.reduce(
  (sum, key) => sum + SEQUENCES[key].count,
  0,
);

/** Jumlah request gambar paralel saat preload. */
export const PRELOAD_CONCURRENCY = 10;

/** Batas aman: preloader dipaksa selesai setelah durasi ini. */
export const PRELOAD_TIMEOUT_MS = 30000;
