import { useEffect, useRef, useState } from 'react'
import { useI18n, LANGUAGES } from '../i18n/I18nContext.jsx'

/**
 * LanguageCompact
 * ---------------------------------------------------------------------------
 * The mobile language control. Below 560px the four-way segmented switcher is
 * too wide to sit in the header, so the header shows a single compact control
 * with the current language; tapping it opens the four choices.
 *
 * This keeps language selection visible in the top area without opening MENU,
 * without squeezing four labels into the row, and without crowding the header:
 * the control is one bordered 44px target.
 *
 * Placement mirrors intentionally in RTL because it uses logical properties,
 * and the panel anchors to the control's inline-end edge so it always opens
 * inward, never off-screen.
 */
export default function LanguageCompact() {
  const { lang, setLang, dictionary: t } = useI18n()
  const [open, setOpen] = useState(false)
  const root = useRef(null)
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointer = (e) => {
      if (root.current && !root.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div className="langc" ref={root}>
      <button
        type="button"
        className="langc__button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.language}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="langc__code">{current.label}</span>
        <span className="langc__caret" aria-hidden="true" />
      </button>

      {open ? (
        <ul className="langc__menu" role="listbox" aria-label={t.nav.language}>
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                className={`langc__option ${l.code === lang ? 'is-active' : ''}`.trim()}
                lang={l.code}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
              >
                <span className="langc__code">{l.label}</span>
                <span className="langc__name">{l.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
