import { useI18n, LANGUAGES } from '../i18n/I18nContext.jsx'
import { whatsappLink, SOCIAL } from '../lib/links.js'
import Wordmark from './Wordmark.jsx'

/**
 * FOOTER / operational contact.
 * Both directions are equally operational: general contact, the dedicated
 * Russian-market line, and the four working languages.
 */
export default function Footer() {
  const { dictionary: t, lang, setLang } = useI18n()
  const f = t.footer

  // The tagline's final full stop is set as the same ember point used inside
  // the wordmark, so the identity reads as a system: the point appears as the
  // O of SHOP and again at the end of "Point anywhere."
  const tagline = f.tagline ?? ''
  const taglineText = tagline.endsWith('.') ? tagline.slice(0, -1) : tagline
  const taglineHasStop = tagline.endsWith('.')

  const links = [
    { href: '#jordan', label: t.nav.jordan },
    { href: '#international', label: t.nav.international },
    { href: '#custom', label: t.nav.custom },
  ]

  return (
    <footer className="footer tone-ink-deep">
      <div className="container">
        <div className="grid footer__top">
          <div className="footer__brand">
            <a className="footer__wordmark" href="#top">
              <Wordmark />
            </a>
            <p className="footer__tagline">
              {taglineText}
              {taglineHasStop ? (
                <span className="footer__point" aria-hidden="true" />
              ) : null}
            </p>
            <p className="footer__brandnote">{f.brandNote}</p>
          </div>

          <nav className="footer__col" aria-label={f.exploreTitle}>
            <h2 className="footer__colhead">{f.exploreTitle}</h2>
            <div className="footer__links">
              {links.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="footer__col footer__col--contact">
            <h2 className="footer__colhead">{f.contactTitle}</h2>
            <div className="footer__contact-row">
              <span className="footer__contact-label">{f.general}</span>
              <a href={`tel:+${t.contact.generalPhoneRaw}`} dir="ltr">
                {t.contact.generalPhone}
              </a>
            </div>
            <div className="footer__contact-row">
              <span className="footer__contact-label">{f.russian}</span>
              <a href={`tel:+${t.contact.russianPhoneRaw}`} dir="ltr">
                {t.contact.russianPhone}
              </a>
            </div>
            <div className="footer__contact-row">
              <span className="footer__contact-label">{f.email}</span>
              <a href={`mailto:${t.contact.email}`} dir="ltr">
                {t.contact.email}
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h2 className="footer__colhead">{f.languagesTitle}</h2>
            <div className="footer__langs">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className="footer__lang"
                  lang={l.code}
                  aria-pressed={l.code === lang}
                  onClick={() => setLang(l.code)}
                  style={l.code === lang ? { color: 'var(--accent)' } : undefined}
                >
                  {l.name}
                </button>
              ))}
            </div>
            <a
              className="link-arrow"
              href={whatsappLink(t.contact.generalPhoneRaw, t.messages.general)}
              target="_blank"
              rel="noreferrer"
            >
              {f.whatsapp}
            </a>
            <div className="footer__contact-row">
              <span className="footer__contact-label">{f.follow}</span>
              <div className="footer__social">
                <a
                  className="footer__social-link"
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {f.social.facebook}
                </a>
                <a
                  className="footer__social-link"
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {f.social.instagram}
                </a>
                <span className="footer__social-static">
                  <span>{f.social.snapchat}</span>
                  <span className="footer__social-value" dir="ltr">
                    {t.contact.generalPhone}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{f.rights}</span>
        </div>
      </div>
    </footer>
  )
}
