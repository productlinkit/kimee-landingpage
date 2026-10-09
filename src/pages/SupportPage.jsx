import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORT_EMAIL } from '../lib/config';
import PageShell from '../components/PageShell/PageShell';
import '../components/Legal/Support.css';

export default function SupportPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const s = (key) => t(`pages.support.${key}`);
  const faqs = t('faq.items', { returnObjects: true });

  return (
    <PageShell title={s('metaTitle')}>
      <div className="support">
        <h1 className="legal-title">{s('title')}</h1>
        <p className="support-sub">{s('subtitle')}</p>

        <div className="support-grid">
          <section className="support-card is-primary">
            <h2>{s('emailTitle')}</h2>
            <p>{s('emailBody')}</p>
            <a className="support-btn" href={`mailto:${SUPPORT_EMAIL}`}>
              {s('emailCta')}
            </a>
            <p className="support-addr" dir="ltr">
              {SUPPORT_EMAIL}
            </p>
          </section>

          <section className="support-card">
            <h2>{s('billingTitle')}</h2>
            <p>{s('billingBody')}</p>
          </section>

          <section className="support-card">
            <h2>{s('privacyTitle')}</h2>
            <p>{s('privacyBody')}</p>
            <Link className="support-link" to={`/${locale}/privacy-policy`}>
              {t('footer.privacy')}
            </Link>
          </section>
        </div>

        <h2 className="support-faq-title">{s('faqTitle')}</h2>
        <div className="support-faq">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        <p className="support-hours">{s('hours')}</p>
      </div>
    </PageShell>
  );
}
