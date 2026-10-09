import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContent } from '../../config/content';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Footer.css';

export default function Footer() {
  const { FOOTER } = useContent();
  const { t } = useTranslation();
  const { locale } = useParams();

  const links = [
    { label: t('footer.privacy'), to: `/${locale}/privacy-policy` },
    { label: t('footer.terms'), to: `/${locale}/terms-of-service` },
    { label: t('footer.support'), to: `/${locale}/support` },
  ];

  return (
    <footer className="foot">
      {/* Gelombang hijau di tepi atas footer (dekorasi). */}
      <svg
        className="foot-wave"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true">
        <path
          fill="#fff"
          d="M0,0 L1440,0 L1440,26 C1170,86 900,10 720,44 C540,78 260,86 0,30 Z"
        />
      </svg>

      <div className="foot-inner">
        <div className="foot-top">
          {/* Logo aslinya biru → diputihkan lewat filter, bukan aset baru. */}
          <img className="foot-logo" src="/logo-kimee.png" alt={t('common.logoAlt')} />
          <p className="foot-tagline">{FOOTER.tagline}</p>
        </div>

        <hr className="foot-rule" />

        <div className="foot-bottom">
          <p className="foot-copy">{FOOTER.copyright}</p>

          <nav className="foot-nav">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </footer>
  );
}
