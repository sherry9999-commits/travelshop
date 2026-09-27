import { useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { whatsappLink } from '../lib/links.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'

/**
 * Full-screen mobile menu. Re-composed for small screens rather than
 * stacked: oversized nav, then language access (the four working languages
 * must be reachable on mobile, not only in the footer), then operational
 * contact and the WhatsApp path.
 *
 * When closed the panel is `inert`, so its links are removed from the tab
 * order and the accessibility tree instead of being merely invisible.
 */
export default function MobileMenu({ open, onClose }) {
  const { dictionary: t } = useI18n()

  const links = [
    { href: '#jordan', label: t.nav.jordan },
    { href: '#international', label: t.nav.international },
    { href: '#custom', label: t.nav.custom },
    { href: '#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div
      className={`menu ${open ? 'is-open' : ''}`.trim()}
      id="site-menu"
      aria-hidden={!open}
      inert={open ? undefined : ''}
    >
      <div className="container menu__inner">
        <nav className="menu__list" aria-label={t.nav.menu}>
          {links.map((link) => (
            <div className="menu__item" key={link.href}>
              <a className="menu__link" href={link.href} onClick={onClose}>
                {link.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="menu__foot">
          <div className="menu__lang">
            <span className="menu__lang-label">{t.nav.language}</span>
            <LanguageSwitcher />
          </div>

          <a
            className="btn"
            href={whatsappLink(
              t.contact.generalPhoneRaw,
              'Hello Travelshop, I would like to plan a trip.'
            )}
            target="_blank"
            rel="noreferrer"
          >
            {t.nav.whatsapp}
          </a>

          <div className="menu__contact">
            <span>{t.footer.general}</span>
            <a href={`tel:+${t.contact.generalPhoneRaw}`} dir="ltr">
              {t.contact.generalPhone}
            </a>
          </div>
          <div className="menu__contact">
            <span>{t.footer.russian}</span>
            <a href={`tel:+${t.contact.russianPhoneRaw}`} dir="ltr">
              {t.contact.russianPhone}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
