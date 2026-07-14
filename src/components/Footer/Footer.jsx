import { FOOTER } from "../../config/content";
import "./Footer.css";

export default function Footer() {
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
          <img className="foot-logo" src="/logo-kimee.png" alt="Kimee" />
          <p className="foot-tagline">{FOOTER.tagline}</p>
        </div>

        <hr className="foot-rule" />

        <div className="foot-bottom">
          <p className="foot-copy">{FOOTER.copyright}</p>

          <nav className="foot-nav">
            {FOOTER.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
            <button type="button" className="foot-lang">
              {FOOTER.lang}
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
