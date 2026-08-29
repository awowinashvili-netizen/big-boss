import { NavLink } from 'react-router-dom'
import { CATEGORIES } from '@/data/categories'
import { useI18n } from '@/lib/i18n'

type Variant = 'bar' | 'stack' | 'footer'

export function NavLinks({
  variant,
  onNavigate,
  className = '',
}: {
  variant: Variant
  onNavigate?: () => void
  className?: string
}) {
  const { t, localePath } = useI18n()

  const items = [
    { to: localePath('/'), label: t.nav.home, end: true },
    ...CATEGORIES.map((c) => ({
      to: localePath(`/category/${c.slug}`),
      label: t.categories[c.tKey],
      end: false,
    })),
  ]

  if (variant === 'stack') {
    return (
      <nav className={`flex flex-col ${className}`} aria-label={t.nav.menu}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `display border-b border-line py-4 text-display-s transition-colors ${
                isActive ? 'text-accent' : 'text-fg hover:text-accent'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    )
  }

  if (variant === 'footer') {
    return (
      <nav className={`-my-1.5 flex flex-col ${className}`} aria-label={t.nav.menu}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `inline-flex min-h-[2.5rem] items-center text-caption transition-colors ${
                isActive ? 'text-fg' : 'text-muted hover:text-fg'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    )
  }

  return (
    <nav className={`flex items-center gap-6 ${className}`} aria-label={t.nav.menu}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `u-label text-eyebrow transition-colors ${
              isActive ? 'text-fg' : 'text-muted hover:text-fg'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
