import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, saveLocale } from '../../i18n';
import './LanguageSwitcher.css';

/** Swaps the `/:locale` URL segment; the layout then syncs i18n, lang and dir. */
export default function LanguageSwitcher({ className = '' }) {
  const { t } = useTranslation();
  const { locale } = useParams();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  const onChange = (event) => {
    const next = event.target.value;
    saveLocale(next);
    const rest = pathname.split('/').filter(Boolean).slice(1).join('/');
    navigate(`/${next}${rest ? `/${rest}` : ''}${search}${hash}`);
  };

  return (
    <label className={`lang-switch ${className}`.trim()}>
      <span className="lang-switch-label">{t('common.language')}</span>
      <select value={locale} onChange={onChange} aria-label={t('common.language')}>
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
