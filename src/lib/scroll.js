/* ============================================================
   Jembatan ke instance Lenis.

   Lenis dibuat di dalam useLenis (scope hook), sementara tombol
   scroll-to-top butuh instance yang SAMA — kalau tidak, window.scrollTo
   akan berkelahi dengan smooth-scroll Lenis dan hasilnya tersendat.
   Modul ini menyimpan referensinya; kalau Lenis mati (reduced-motion),
   otomatis jatuh ke native smooth scroll.
   ============================================================ */
let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

/** Naik ke atas halaman. 1.1s: mulus tapi tidak bertele-tele. */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.1 });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
