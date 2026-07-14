import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { USE_FALLBACK } from '../../lib/device';

/* Urutan dalam progress 0..1 dari scrub:
     0.00 → 0.42  marquee "MEET SPARKY" jalan kanan → kiri sampai keluar layar
     0.30 → 0.44  podium naik & memudar
     0.42 → 0.64  device mengecil dan naik
     0.50 → 0.70  pohon masuk dari kiri & kanan
     0.54 → 0.72  GIF katak naik dari bawah section (loop-nya jalan sendiri)
     0.72 → 0.96  judul per baris + paragraf reveal — SETELAH kataknya naik  */

/**
 * Semua nilai posisi memakai fungsi (`() => ...`) agar dihitung ulang tiap
 * ScrollTrigger.refresh() — jadi tetap benar saat viewport di-resize.
 */
export function useSparkyTimeline(
  {
    sectionRef,
    stageRef,
    marqueeRef,
    deviceRef,
    podiumRef,
    treeLeftRef,
    treeRightRef,
    copyRef,
    frogRef,
  },
  enabled,
  onFrogCue,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || !enabled) return undefined;

    const marquee = marqueeRef.current;
    const device = deviceRef.current;
    const podium = podiumRef.current;
    const treeL = treeLeftRef.current;
    const treeR = treeRightRef.current;
    const copy = copyRef.current;
    const frog = frogRef.current;
    /* Tiap baris judul + paragraf di-reveal berurutan. */
    const lines = copy
      ? gsap.utils.toArray(copy.querySelectorAll('.sparky-line, .sparky-body'))
      : [];

    /* Perangkat lemah / reduced-motion: tampilkan langsung kondisi akhir
       (gambar 2) tanpa pin & tanpa scrub. */
    if (USE_FALLBACK) {
      section.classList.add('is-static');
      gsap.set([marquee, podium], { autoAlpha: 0 });
      gsap.set(frog, { xPercent: -50 });
      onFrogCue?.();
      gsap.set(device, { xPercent: -50, yPercent: -50, scale: 0.53 });
      gsap.set(treeR, { scaleX: -1 });
      return undefined;
    }

    /* Section berikutnya (#how) — dipakai sebagai endTrigger pin supaya stage
       tetap diam sampai section itu selesai menutupinya (efek parallax). */
    const next = document.querySelector('#how');

    const ctx = gsap.context(() => {
      gsap.set([marquee, device, podium, copy], { xPercent: -50 });
      gsap.set([marquee, device], { yPercent: -50 });
      gsap.set(treeR, { scaleX: -1 }); // pohon kanan = cermin dari yang kiri
      gsap.set(copy, { autoAlpha: 0 });
      /* yPercent 100 → katak duduk persis DI BAWAH tepi section, lalu naik. */
      gsap.set(frog, { xPercent: -50, yPercent: 100, autoAlpha: 0 });
      gsap.set(lines, { opacity: 0, y: 40 });

      /* Pohon mulai di luar layar. transformOrigin default center → untuk
         pohon kanan yang di-scaleX(-1), sumbu x tetap normal. */
      const outLeft = () => -(treeL.offsetWidth + window.innerWidth * 0.06);
      const outRight = () => treeR.offsetWidth + window.innerWidth * 0.06;
      gsap.set(treeL, { x: outLeft });
      gsap.set(treeR, { x: outRight });

      /* PIN dipisah dari SCRUB, seperti Hero terhadap Clouds:
         stage tetap diam sampai #how (section berikutnya) mencapai atas
         viewport — jadi #how (z-index 12 > .sparky 11) terlihat scroll NAIK
         menutupi stage ini. pinSpacing dimatikan supaya tidak menambah
         ruang; panjang scroll-nya sudah dari tinggi .sparky sendiri. */
      /* Elemennya langsung, BUKAN selector '#how': gsap.context men-scope
         selector string ke `section`, jadi '#how' (di luar .sparky) tidak
         akan ketemu dan pin-nya diam-diam salah range. */
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        endTrigger: next || section,
        end: next ? 'top top' : 'bottom bottom',
        pin: stage,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      /* SCRUB: hanya sepanjang .sparky. Setelah progress 1, kondisi akhir
         tetap tampil di belakang #how yang sedang menutupinya. */
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      /* 1 — MARQUEE: dari tengah (seperti gambar 1) sampai lewat tepi kiri. */
      tl.fromTo(
        marquee,
        { x: 0 },
        {
          x: () => -(marquee.offsetWidth / 2 + window.innerWidth / 2 + 40),
          ease: 'none',
          duration: 0.42,
        },
        0,
      );

      /* 2 — PODIUM naik lalu hilang. */
      tl.to(
        podium,
        { y: () => -window.innerHeight * 0.35, autoAlpha: 0, duration: 0.14 },
        0.3,
      );

      /* 3 — DEVICE mengecil & naik. */
      tl.to(
        device,
        {
          scale: 0.53,
          y: () => -window.innerHeight * 0.2,
          ease: 'power2.inOut',
          duration: 0.22,
        },
        0.42,
      );

      /* 4 — POHON masuk dari kiri & kanan. */
      tl.to(treeL, { x: 0, ease: 'power2.out', duration: 0.2 }, 0.5).to(
        treeR,
        { x: 0, ease: 'power2.out', duration: 0.2 },
        0.5,
      );

      /* 5 — GIF KATAK naik dari bawah. Sengaja SEBELUM copy: kataknya muncul
         dulu, teksnya menyusul. tl.call memasang src-nya tepat sebelum naik,
         jadi loop-nya mulai dari frame pertama. */
      tl.call(() => onFrogCue?.(), null, 0.5);
      tl.to(
        frog,
        /* yPercent 38 (bukan 12): GIF-nya besar, kalau berhenti terlalu tinggi
           kepalanya menutupi paragraf. */
        { yPercent: 38, autoAlpha: 1, ease: 'power2.out', duration: 0.18 },
        0.54,
      );

      /* 6 — COPY reveal per baris, menyusul setelah katak. */
      tl.to(copy, { autoAlpha: 1, duration: 0.06 }, 0.72);
      lines.forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, duration: 0.12 }, 0.74 + i * 0.06);
      });

      // Penanda agar durasi timeline = 1 (sepanjang range scrub).
      tl.to({}, { duration: 0.001 }, 1);
    }, section);

    return () => ctx.revert();
  }, [
    sectionRef,
    stageRef,
    marqueeRef,
    deviceRef,
    podiumRef,
    treeLeftRef,
    treeRightRef,
    copyRef,
    frogRef,
    enabled,
    onFrogCue,
  ]);
}
