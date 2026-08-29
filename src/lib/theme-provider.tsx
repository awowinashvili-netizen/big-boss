import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  THEME_STORAGE_KEY,
  ThemeContext,
  type Theme,
  type ThemeValue,
  applyTheme,
  readStoredTheme,
  systemTheme,
} from '@/lib/theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The pre-paint script in index.html already set the class; start from the DOM
  // so first render matches what's on screen (no flash, no hydration mismatch).
  const [stored, setStored] = useState<Theme | null>(() => readStoredTheme())
  const [system, setSystem] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'light' : systemTheme(),
  )

  const theme: Theme = stored ?? system

  // Follow the OS while the user has made no explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystem(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Keep other tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) setStored(readStoredTheme())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((t: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t)
    } catch {
      /* private mode — in-memory only */
    }
    setStored(t)
  }, [])

  const toggle = useCallback(() => {
    setTheme((stored ?? system) === 'dark' ? 'light' : 'dark')
  }, [stored, system, setTheme])

  const value = useMemo<ThemeValue>(
    () => ({ theme, isExplicit: stored !== null, setTheme, toggle }),
    [theme, stored, setTheme, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
