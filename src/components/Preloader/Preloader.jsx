import { useTranslation } from 'react-i18next';
import './Preloader.css';

/**
 * Overlay preloader dengan progress bar batch-preload frame.
 * Menghilang (fade + visibility) saat `done`, bukan di-unmount, supaya
 * transisi CSS-nya sempat berjalan.
 */
export default function Preloader({ progress, done }) {
  const { t } = useTranslation();
  return (
    <div id="preloader" className={done ? 'done' : undefined} aria-hidden="true">
      <div className="pre-card">
        <div className="pre-avatar">
          <img src="/logo-kimee.png" alt="" />
        </div>
        <h2 className="pre-title">{t('common.loadingTitle')}</h2>
        <p className="pre-sub">{t('common.loadingSub')}</p>
        <div className="pre-bar">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="pre-percent">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
