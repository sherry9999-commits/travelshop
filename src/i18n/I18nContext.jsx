import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en.js'
import ar from './ar.js'
import ru from './ru.js'
import he from './he.js'

export const dictionaries = { en, ar, ru, he }

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { code: 'ar', label: 'AR', name: 'العربية', dir: 'rtl' },
  { code: 'ru', label: 'RU', name: 'Русский', dir: 'ltr' },
  { code: 'he', label: 'HE', name: 'עברית', dir: 'rtl' },
]

const STORAGE_KEY = 'travelshop.lang'
const DEFAULT_LANG = 'en'

const I18nContext = createContext(null)

function readInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && dictionaries[stored]) return stored
  } catch {
    /* storage unavailable — fall through */
  }
  return DEFAULT_LANG
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)

  const dictionary = dictionaries[lang] ?? dictionaries[DEFAULT_LANG]
  const dir = dictionary.dir

  const setLang = useCallback((next) => {
    if (!dictionaries[next]) return
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  // Keep the document in sync: language drives script choice AND direction.
  useEffect(() => {
    const root = document.documentElement
    root.lang = dictionary.htmlLang
    root.dir = dir
    if (dictionary.pageTitle) document.title = dictionary.pageTitle
  }, [dictionary.htmlLang, dictionary.pageTitle, dir])

  const value = useMemo(
    () => ({ lang, dir, dictionary, setLang, t: dictionary }),
    [lang, dir, dictionary, setLang]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
