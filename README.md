# Kimee Landing Page — React

Versi React (Vite) dari landing page scroll-driven Kimee. Semua animasi versi
vanilla dipertahankan: preloader batch-preload, frame-scrub canvas, pin/un-pin,
horizontal scroll pulau, parallax wave, reveal, dan smooth scroll Lenis.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output ke dist/
npm run preview
```

## Struktur

```
public/                     aset statis (hero/, animation/, island/, video, logo)
src/
  main.jsx                  entry — global CSS di-import SEBELUM App (lihat catatan)
  App.jsx                   orkestrasi: preload → aktifkan animasi → refresh ScrollTrigger
  config/
    sequences.js            konfigurasi frame sequence (path, jumlah, concurrency)
    content.jsx             semua copy & data pulau (dipisah dari komponen)
  lib/
    gsap.js                 registrasi plugin ScrollTrigger (sekali, di level modul)
    device.js               deteksi reduced-motion / koneksi lambat / low-power
    fallback.js             matikan mode scrub untuk perangkat lemah
  hooks/
    useFramePreloader.js    preload 480 frame, N request paralel → progress & ready
    useFrameScrubber.js     canvas cover-draw + rAF loop → setProgress(0..1)
    useLenis.js             smooth scroll, di-drive gsap.ticker
    useReveal.js            fade-up saat elemen masuk viewport
  components/
    Preloader/  ScrollProgress/  KimeeLogo/  WavyClipDefs/  Footer/
    Hero/       Hero.jsx + useHeroTimeline.js + useHeroIntroVideo.js + ScrollHint.jsx
    Clouds/     Clouds.jsx + useCloudsTimeline.js + IslandCard.jsx
    Feature/    Feature.jsx
    common/     Reveal.jsx
  styles/
    tokens.css  base.css    variabel + reset + tipografi + reduce-motion
```

## Catatan implementasi

**Semua animasi menunggu `ready`.** Tiap komponen menerima prop `enabled`, yang
baru `true` setelah preloader selesai — setara `initAfterLoad()` di versi vanilla.
Ini penting: ScrollTrigger butuh tinggi halaman yang sudah final.

**Ref `.clouds` dimiliki App.** Hero memakai clouds sebagai `endTrigger` pin-nya
(hero-stage tetap diam sampai clouds keluar viewport), jadi ref-nya dibuat di App
dan diteruskan ke dua komponen.

**Urutan import CSS di `main.jsx` disengaja.** Import ESM dieksekusi sesuai urutan
penulisan; global style harus lebih dulu agar CSS per-komponen bisa menang pada
specificity yang sama (mis. `.hero-headline em` vs `.display em`).

**Tanpa `<StrictMode>`.** Double-invoke effect di dev membuat ScrollTrigger
membuat lalu membuang pin spacer dua kali dan menggeser posisi trigger.

**Tinggi `.clouds` dihitung JS** = viewport + jarak horizontal scroll, lalu
`ScrollTrigger.refresh()` supaya pin hero ikut menyesuaikan.
