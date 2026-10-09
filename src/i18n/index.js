import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import id from './locales/id.json';
import ar from './locales/ar.json';

export const SUPPORTED_LOCALES = ['en', 'id', 'ar'];
export const DEFAULT_LOCALE = 'en';
export const RTL_LOCALES = ['ar'];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ar', label: 'العربية' },
];

const STORAGE_KEY = 'kimee_lp_locale';

export function isLocale(value) {
  return SUPPORTED_LOCALES.includes(value);
}

/** Saved choice first, then the browser's language, then English. */
export function detectLocale() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* storage blocked — fall through */
  }
  const fromBrowser = (navigator.languages || [navigator.language || ''])
    .map((l) => l.slice(0, 2).toLowerCase())
    .find(isLocale);
  return fromBrowser || DEFAULT_LOCALE;
}

export function saveLocale(locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

function firstPathSegment() {
  const first = window.location.pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : detectLocale();
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id },
    ar: { translation: ar },
  },
  lng: firstPathSegment(),
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: SUPPORTED_LOCALES,
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
