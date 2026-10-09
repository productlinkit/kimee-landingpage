import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PageShell from '../PageShell/PageShell';
import './Legal.css';

const SECTION_KEY = /^s\d+$/;

/**
 * Renders a policy straight from the locale JSON (`privacyPolicy` /
 * `termsConditions`). Sections are `s1…sN`; inside one, `*Label` keys render as
 * bold lead-ins, `warning` is highlighted and the rest are paragraphs.
 *
 * @param {string} ns        top-level locale key holding the document
 * @param {string} metaKey   locale key of the document title for the tab
 */
export default function LegalPage({ ns, metaKey }) {
  const { t } = useTranslation();
  const doc = t(ns, { returnObjects: true });
  const sections = Object.keys(doc).filter((k) => SECTION_KEY.test(k));
  const badges = ['coppa', 'gdpr'].filter((k) => typeof doc[k] === 'string');

  return (
    <PageShell title={t(metaKey)}>
      <article className="legal">
        <h1 className="legal-title">{doc.title}</h1>
        <p className="legal-updated">{t('legalPage.lastUpdated')}</p>
        {badges.length > 0 && (
          <ul className="legal-badges">
            {badges.map((k) => (
              <li key={k}>{doc[k]}</li>
            ))}
          </ul>
        )}

        {sections.map((key, i) => (
          <section className="legal-section" key={key}>
            <h2>
              <span className="legal-num">{i + 1}</span>
              {doc[key].title}
            </h2>
            {Object.entries(doc[key])
              .filter(([k]) => k !== 'title')
              .map(([k, value]) => (
                <Fragment key={k}>
                  {k.endsWith('Label') ? (
                    <p className="legal-label">{value}</p>
                  ) : k === 'warning' ? (
                    <p className="legal-warning">{value}</p>
                  ) : (
                    <p className="legal-text">{value}</p>
                  )}
                </Fragment>
              ))}
          </section>
        ))}

        {typeof doc.footer === 'string' && <p className="legal-updated">{doc.footer}</p>}
      </article>
    </PageShell>
  );
}
