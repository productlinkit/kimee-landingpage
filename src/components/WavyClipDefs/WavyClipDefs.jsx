/**
 * Definisi SVG clipPath `#wavyTop` — dipakai .clouds-stage untuk
 * membuat tepi atas bergelombang. Harus ada di DOM (sekali) agar
 * `clip-path: url(#wavyTop)` bisa me-resolve.
 */
export default function WavyClipDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true">
      <defs>
        <clipPath id="wavyTop" clipPathUnits="objectBoundingBox">
          <path d="M0,0.06 C0.18,0.015 0.38,0.09 0.58,0.035 C0.78,-0.01 0.9,0.06 1,0.03 L1,1 L0,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
