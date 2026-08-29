import en from './en'
import ka from './ka'
import ru from './ru'

export const LOCALES = ['ka', 'en', 'ru'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ka'

/** Canonical dictionary shape — English is the reference. */
export type Dict = typeof en

export const dictionaries: Record<Locale, Dict> = { ka, en, ru }

/** Endonym shown in the language switcher. */
export const localeNames: Record<Locale, string> = {
  ka: 'ქართული',
  en: 'English',
  ru: 'Русский',
}

/** Short label for the compact switcher. */
export const localeShort: Record<Locale, string> = {
  ka: 'KA',
  en: 'EN',
  ru: 'RU',
}

export function isLocale(value: string | undefined): value is Locale {
  return value != null && (LOCALES as readonly string[]).includes(value)
}
