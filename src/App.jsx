import { useLayoutEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import i18n, { RTL_LOCALES, detectLocale, isLocale, saveLocale } from './i18n';
import Home from './pages/Home';
import SupportPage from './pages/SupportPage';
import LegalPage from './components/Legal/LegalPage';

/** Keeps i18n, <html lang>, <html dir> and the tab title in step with `/:locale`. */
function LocaleLayout({ children }) {
  const { locale } = useParams();
  const valid = isLocale(locale);

  useLayoutEffect(() => {
    if (!valid) return;
    if (i18n.language !== locale) i18n.changeLanguage(locale);
    saveLocale(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
  }, [locale, valid]);

  // Home owns its title; the plain pages set theirs in PageShell.
  useLayoutEffect(() => {
    if (valid && window.location.pathname.split('/').filter(Boolean).length === 1) {
      document.title = i18n.t('meta.title');
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', i18n.t('meta.description'));
    }
  }, [locale, valid]);

  if (!valid) return <Navigate to={`/${detectLocale()}`} replace />;
  return children;
}

/** `/privacy` style paths without a locale get one. */
function AddLocale() {
  const { pathname, search } = useLocation();
  const first = pathname.split('/').filter(Boolean)[0];
  // An unknown page under a real locale goes to that locale's home, not into a redirect loop.
  if (isLocale(first)) return <Navigate to={`/${first}`} replace />;
  return <Navigate to={`/${detectLocale()}${pathname === '/' ? '' : pathname}${search}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddLocale />} />
        <Route
          path="/:locale"
          element={
            <LocaleLayout>
              <Home />
            </LocaleLayout>
          }
        />
        <Route
          path="/:locale/privacy-policy"
          element={
            <LocaleLayout>
              <LegalPage ns="privacyPolicy" metaKey="pages.privacy.metaTitle" />
            </LocaleLayout>
          }
        />
        <Route
          path="/:locale/terms-of-service"
          element={
            <LocaleLayout>
              <LegalPage ns="termsConditions" metaKey="pages.terms.metaTitle" />
            </LocaleLayout>
          }
        />
        <Route
          path="/:locale/support"
          element={
            <LocaleLayout>
              <SupportPage />
            </LocaleLayout>
          }
        />
        <Route path="*" element={<AddLocale />} />
      </Routes>
    </BrowserRouter>
  );
}
