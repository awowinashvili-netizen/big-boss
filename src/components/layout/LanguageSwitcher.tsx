import { Link, useLocation } from 'react-router-dom'
import { LOCALES, localeNames, localeShort } from '@/i18n'
import { useI18n } from '@/lib/i18n'

/** Swap the locale segment of the current URL, keeping the rest of the path. */
function useLocalePaths() {
  const { locale } = useI18n()
  const { pathname, search, hash } = useLocation()
  const rest = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '')
  return (target: string) => `/${target}${rest}${search}${hash}`
}

export function LanguageSwitcher({
  variant = 'bar',
  className = '',
}: {
  variant?: 'bar' | 'stack'
  className?: string
}) {
  const { locale, t } = useI18n()
  const pathFor = useLocalePaths()

  if (variant === 'stack') {
    return (
      <div className={className}>
        <p className="eyebrow mb-3">{t.language.label}</p>
        <div className="grid grid-cols-3 gap-2" role="group" aria-label={t.language.label}>
          {LOCALES.map((l) => {
            const active = l === locale
            return (
              <Link
                key={l}
                to={pathFor(l)}
                replace
                lang={l}
                aria-current={active ? 'true' : undefined}
                className={`inline-flex items-center justify-center rounded-sm border px-3 py-2.5 font-mono text-caption uppercase tracking-wide transition-colors ${
                  active
                    ? 'border-accent bg-accent text-accent-fg'
                    : 'border-line text-muted hover:border-line-strong hover:text-fg'
                }`}
              >
                {localeShort[l]}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-1 font-mono text-eyebrow uppercase tracking-wide ${className}`}
      role="group"
      aria-label={t.language.label}
    >
      {LOCALES.map((l, i) => {
        const active = l === locale
        return (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && <span className="text-line-strong" aria-hidden="true">/</span>}
            <Link
              to={pathFor(l)}
              replace
              lang={l}
              title={localeNames[l]}
              aria-current={active ? 'true' : undefined}
              className={`inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center px-2 transition-colors ${
                active ? 'text-fg' : 'text-faint hover:text-fg'
              }`}
            >
              {localeShort[l]}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
