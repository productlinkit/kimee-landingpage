import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../lib/scroll';
import './ScrollTop.css';

/**
 * Tombol bulat mengambang di kanan bawah — kembali ke atas halaman.
 * Baru muncul setelah user scroll melewati satu layar.
 *
 * Scroll-nya lewat instance Lenis (lib/scroll), bukan window.scrollTo,
 * supaya tidak berkelahi dengan smooth-scroll yang sedang berjalan.
 */
export default function ScrollTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top${visible ? ' is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label={t('common.scrollTop')}
      tabIndex={visible ? 0 : -1}>
      <span className="material-symbols-rounded" aria-hidden="true">
        arrow_upward
      </span>
    </button>
  );
}
