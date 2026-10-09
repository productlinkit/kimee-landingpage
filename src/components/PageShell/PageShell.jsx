import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Footer from '../Footer/Footer';
import './PageShell.css';

/**
 * Frame for the plain pages (privacy, terms, support): a slim header with the
 * logo and language switcher, the page body, and the shared footer.
 */
export default function PageShell({ title, children }) {
  const { t } = useTranslation();
  const { locale } = useParams();

  useEffect(() => {
    document.title = title;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="shell">
      <a className="shell-skip" href="#page-main">
        {t('common.skipToContent')}
      </a>
      <header className="shell-head">
        <Link to={`/${locale}`} className="shell-logo" aria-label={t('common.backHome')}>
          <img src="/logo-kimee.png" alt={t('common.logoAlt')} />
        </Link>
        <div className="shell-tools">
          <Link to={`/${locale}`} className="shell-back">
            <span className="shell-back-arrow" aria-hidden="true">←</span>
            {t('common.backHome')}
          </Link>
          <LanguageSwitcher className="shell-lang" />
        </div>
      </header>
      <main id="page-main" className="shell-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
