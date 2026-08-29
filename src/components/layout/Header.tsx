import { useState } from 'react'
import IconMenu from '~icons/solar/hamburger-menu-linear'
import { useI18n } from '@/lib/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { NavLinks } from './NavLinks'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { t } = useI18n()
  const [navOpen, setNavOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-line bg-surface/85 backdrop-blur">
      <div className="u-container flex h-header items-center justify-between gap-4 md:h-16">
        <Logo />

        <div className="flex items-center gap-2 md:gap-5">
          <NavLinks variant="bar" className="hidden md:flex" />
          <span className="hidden h-4 w-px bg-line md:block" aria-hidden="true" />
          <LanguageSwitcher variant="bar" className="hidden md:flex" />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label={t.nav.open}
            aria-haspopup="dialog"
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            className="inline-grid size-11 place-items-center rounded-sm border border-transparent text-muted transition-colors hover:border-line hover:text-fg md:hidden"
          >
            <IconMenu className="size-5" />
          </button>
        </div>
      </div>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  )
}
