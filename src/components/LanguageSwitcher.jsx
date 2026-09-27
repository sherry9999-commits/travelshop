import { useI18n, LANGUAGES } from '../i18n/I18nContext.jsx'

/**
 * LanguageSwitcher — EN / AR / RU / HE.
 * Compact by design; the visual identity stays with the wordmark and type,
 * and the switch communicates a real operational fact about the company.
 */
export default function LanguageSwitcher({ className = '', onSelect }) {
  const { lang, setLang } = useI18n()

  return (
    <div className={`lang ${className}`.trim()} role="group" aria-label="Language">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang__btn ${l.code === lang ? 'is-active' : ''}`.trim()}
          aria-pressed={l.code === lang}
          lang={l.code}
          title={l.name}
          onClick={() => {
            setLang(l.code)
            onSelect?.(l.code)
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
