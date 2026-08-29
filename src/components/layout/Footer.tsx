import { useI18n } from '@/lib/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-bg-subtle">
      <div className="u-container flex flex-col gap-10 py-12 md:flex-row md:justify-between md:gap-16 md:py-16">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-[32ch] text-caption text-muted">{t.meta.tagline}</p>
          <LanguageSwitcher variant="bar" className="mt-1" />
        </div>

        <NavLinks variant="footer" />

        <SocialLinks />
      </div>

      <div className="border-t border-line">
        <div className="u-container u-label flex flex-col gap-1 py-5 text-eyebrow text-faint md:flex-row md:items-center md:justify-between">
          <span>© {year} {t.meta.brand}. {t.footer.rights}</span>
          <span>{t.meta.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
