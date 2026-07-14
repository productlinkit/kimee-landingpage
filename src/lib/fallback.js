/**
 * Matikan mode scrub untuk sebuah section: tinggi jadi auto, stage tidak
 * lagi sticky, dan gambar statis (.hero-fallback / .scrub-fallback) yang
 * tampil — diatur oleh class `.use-fallback` di CSS.
 *
 * @param {HTMLElement} section
 */
export function applyFallback(section) {
  if (!section) return;
  section.classList.add('use-fallback');
  section.style.height = 'auto';

  const stage = section.querySelector('.hero-stage, .scrub-stage');
  if (stage) {
    stage.style.position = 'relative';
    stage.style.height = 'auto';
    stage.style.minHeight = '100vh';
  }
}
