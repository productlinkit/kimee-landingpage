/* ============================================================
   CONTENT — copy lives in src/i18n/locales/*.json; this file only
   holds the non-text data (images, ids, numbers, colors) and joins
   the two through useContent().
   Setiap `lines` array = satu baris yang di-reveal per baris oleh GSAP.
   ============================================================ */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { rich, plain } from '../lib/rich';

/* Band statistik tepat setelah hero. `value` = angka tujuan count-up. */
const STAT_VALUES = [
  { value: 500, decimals: 0, suffix: 'k+' },
  { value: 4.9, decimals: 1, suffix: '' },
  { value: 12, decimals: 0, suffix: 'M+' },
  { value: 100, decimals: 0, suffix: '%' },
];

const ABOUT_ASSETS = [
  { id: 'play', image: '/what-kimee/card-1.jpeg', gif: '/what-kimee/card-1-animated.gif' },
  { id: 'ai', image: '/what-kimee/card-2.jpeg', gif: '/what-kimee/card-2-animated.gif' },
  { id: 'parents', image: '/what-kimee/card-3.jpeg', gif: '/what-kimee/card-3-animated.gif' },
];

const ISLAND_ASSETS = [
  { id: 'jungle', image: '/island/island01.webp' },
  { id: 'storybook', image: '/island/island02.webp' },
  { id: 'iceberg', image: '/island/island03.webp' },
  { id: 'empathy', image: '/island/island04.webp' },
  { id: 'desert', image: '/island/island05.webp' },
];

const HOW_NUMBERS = [1, 2, 3];
const TESTIMONIAL_ASSETS = [
  { id: 'rina', color: '#17c3ce' },
  { id: 'dimas', color: '#f58220' },
  { id: 'sarah', color: '#9b6be0' },
];
const FAQ_IDS = ['usia', 'iklan', 'berhenti'];

const lines = (arr) => arr.map(rich);

/** Every section's copy for the active language. */
export function useContent() {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    const list = (key) => t(key, { returnObjects: true });

    return {
      HERO_SCENES: {
        headline: lines(list('hero.headline')),
        body: lines(list('hero.body')),
        tagline: lines(list('hero.tagline')),
      },

      HERO_STATS: STAT_VALUES.map((v, i) => ({ ...v, label: list('stats.items')[i] })),

      HONEST: {
        eyebrow: t('honest.eyebrow'),
        title: lines(list('honest.title')),
        body: rich(t('honest.body')),
        card: {
          title: t('honest.cardTitle'),
          cta: t('honest.cardCta'),
          body: rich(t('honest.cardBody')),
        },
      },

      ABOUT: {
        eyebrow: t('about.eyebrow'),
        title: lines(list('about.title')),
        cards: ABOUT_ASSETS.map((asset, i) => ({
          ...asset,
          title: t(`about.cards.${i}.title`),
          body: t(`about.cards.${i}.body`),
        })),
      },

      ISLANDS_TITLE: lines(list('islands.title')),
      ISLANDS: ISLAND_ASSETS.map((asset, i) => ({
        ...asset,
        title: t(`islands.items.${i}.title`),
        category: t(`islands.items.${i}.category`),
      })),

      SPARKY: {
        marquee: t('sparky.marquee'),
        title: lines(list('sparky.title')),
        body: rich(t('sparky.body')),
      },

      HOW_IT_WORKS: {
        eyebrow: t('how.eyebrow'),
        title: t('how.title'),
        steps: HOW_NUMBERS.map((n, i) => ({
          n,
          title: t(`how.steps.${i}.title`),
          body: t(`how.steps.${i}.body`),
        })),
      },

      TESTIMONIALS: {
        eyebrow: t('testimonials.eyebrow'),
        title: lines(list('testimonials.title')),
        items: TESTIMONIAL_ASSETS.map((asset, i) => ({
          ...asset,
          quote: t(`testimonials.items.${i}.quote`),
          name: t(`testimonials.items.${i}.name`),
          city: t(`testimonials.items.${i}.city`),
        })),
      },

      FAQ: {
        eyebrow: t('faq.eyebrow'),
        title: t('faq.title'),
        items: FAQ_IDS.map((id, i) => ({
          id,
          q: t(`faq.items.${i}.q`),
          a: t(`faq.items.${i}.a`),
        })),
      },

      CTA: {
        title: lines(list('cta.title')),
        body: t('cta.body'),
        button: t('cta.button'),
      },

      FOOTER: {
        tagline: rich(t('footer.tagline')),
        copyright: t('footer.copyright'),
      },
    };
    // `t` changes identity with the language, which is what invalidates this.
  }, [t, i18n.language]);
}

export { plain };
