import { createContext, useContext } from 'react'
import type { Dict, Locale } from '@/i18n'

export type I18nValue = {
  locale: Locale
  t: Dict
  /** Prefix an app path with the active locale: `localePath('/category/suv')`. */
  localePath: (path: string) => string
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <LocaleProvider>')
  return ctx
}
