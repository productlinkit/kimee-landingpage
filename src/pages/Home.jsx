import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../lib/gsap';
import { useFramePreloader } from '../hooks/useFramePreloader';
import { useLenis } from '../hooks/useLenis';

import Preloader from '../components/Preloader/Preloader';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import ScrollTop from '../components/ScrollTop/ScrollTop';
import WavyClipDefs from '../components/WavyClipDefs/WavyClipDefs';
import KimeeLogo from '../components/KimeeLogo/KimeeLogo';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Honest from '../components/Honest/Honest';
import About from '../components/About/About';
import Clouds from '../components/Clouds/Clouds';
import Sparky from '../components/Sparky/Sparky';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Pricing from '../components/Pricing/Pricing';
import Testimonials from '../components/Testimonials/Testimonials';
import Faq from '../components/Faq/Faq';
import Cta from '../components/Cta/Cta';
import Footer from '../components/Footer/Footer';

/**
 * Semua animasi scroll baru dinyalakan setelah frame selesai di-preload
 * (`ready`) — sama seperti `initAfterLoad()` di versi vanilla.
 *
 * Ref .clouds dimiliki App karena dipakai dua komponen: Clouds untuk
 * dirinya sendiri, dan Hero sebagai endTrigger pin-nya.
 */
export default function Home() {
  const { progress, ready, frames } = useFramePreloader();
  const cloudsRef = useRef(null);
  const { i18n } = useTranslation();

  useLenis(ready);

  // Efek parent berjalan setelah semua efek anak → semua ScrollTrigger
  // sudah terdaftar, jadi ini tempat yang tepat untuk recalculate posisi.
  useEffect(() => {
    if (!ready) return undefined;
    document.body.classList.add('ready');

    ScrollTrigger.refresh();

    const onLoad = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      // Leaving for a legal page and coming back must replay the preloader gate.
      document.body.classList.remove('ready');
    };
  }, [ready]);

  // A new language changes line breaks and section heights; re-measure triggers.
  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [i18n.language, ready]);

  return (
    <>
      <Preloader progress={progress} done={ready} />
      <ScrollProgress />
      <ScrollTop />
      <WavyClipDefs />
      <KimeeLogo enabled={ready} />

      <main id="top">
        <Hero frames={frames.hero} enabled={ready} cloudsRef={cloudsRef} />
        <Stats enabled={ready} />
        <Honest enabled={ready} />
        <About enabled={ready} />
        <Clouds sectionRef={cloudsRef} enabled={ready} />
        <Sparky enabled={ready} />
        <HowItWorks enabled={ready} />
        <Pricing enabled={ready} />
        <Testimonials enabled={ready} />
        <Faq enabled={ready} />
        <Cta enabled={ready} />
        <Footer />
      </main>
    </>
  );
}
