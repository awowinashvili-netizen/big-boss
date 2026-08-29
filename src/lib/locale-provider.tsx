import { useEffect, useMemo, type ReactNode } from 'react'
import { type Locale, dictionaries } from '@/i18n'
import { I18nContext, type I18nValue } from '@/lib/i18n'

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = dictionaries[locale].meta.title
  }, [locale])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      localePath: (path) => {
        const clean = path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
        return `/${locale}${clean}`
      },
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
