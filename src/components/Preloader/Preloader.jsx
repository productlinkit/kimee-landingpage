import './Preloader.css';

/**
 * Overlay preloader dengan progress bar batch-preload frame.
 * Menghilang (fade + visibility) saat `done`, bukan di-unmount, supaya
 * transisi CSS-nya sempat berjalan.
 */
export default function Preloader({ progress, done }) {
  return (
    <div id="preloader" className={done ? 'done' : undefined} aria-hidden="true">
      <div className="pre-card">
        <div className="pre-avatar">
          <img src="/logo-kimee.png" alt="" />
        </div>
        <h2 className="pre-title">Loading your adventure…</h2>
        <p className="pre-sub">Kimee is preparing your world of learning</p>
        <div className="pre-bar">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="pre-percent">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
