import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { useHeaderState } from '../hooks/useHeaderState.js'
import { whatsappLink } from '../lib/links.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import MobileMenu from './MobileMenu.jsx'

export default function Header() {
  const { dictionary: t } = useI18n()
  const scrolled = useHeaderState()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#jordan', label: t.nav.jordan },
    { href: '#international', label: t.nav.international },
    { href: '#custom', label: t.nav.custom },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`.trim()}>
        <div className="container header__bar">
          <a className="brand" href="#top" aria-label="Travelshop — home">
            <span className="brand__mark" aria-hidden="true" />
            Travelshop
          </a>

          <nav className="header__nav" aria-label="Primary">
            {links.map((link) => (
              <a className="nav__link" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <LanguageSwitcher />
            <a
              className="btn btn--sm header__cta"
              href={whatsappLink(t.contact.generalPhoneRaw, 'Hello Travelshop — I would like to plan a trip.')}
              target="_blank"
              rel="noreferrer"
            >
              {t.nav.whatsapp}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <button
              type="button"
              className="header__burger"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>

        <div className="header__progress" aria-hidden="true">
          <span data-progress-bar />
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
