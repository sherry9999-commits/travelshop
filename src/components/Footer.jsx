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
            <p className="footer__tagline">{f.tagline}</p>
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
              href={whatsappLink(
                t.contact.generalPhoneRaw,
                'Hello Travelshop, I would like to plan a trip.'
              )}
              target="_blank"
              rel="noreferrer"
            >
              {f.whatsapp}
            </a>
            <div className="footer__contact-row">
              <span className="footer__contact-label">{f.follow}</span>
              <a href={SOCIAL.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
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
