import IconMoon from '~icons/solar/moon-linear'
import IconSun from '~icons/solar/sun-2-linear'
import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.theme.toLight : t.theme.toDark}
      title={isDark ? t.theme.toLight : t.theme.toDark}
      className={`inline-grid size-11 place-items-center rounded-sm border border-transparent text-muted transition-colors hover:border-line hover:text-fg ${className}`}
    >
      {isDark ? <IconSun className="size-[1.15rem]" /> : <IconMoon className="size-[1.15rem]" />}
    </button>
  )
}
