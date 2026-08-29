import type { ComponentType } from 'react'
import IconFacebook from '~icons/simple-icons/facebook'
import IconInstagram from '~icons/simple-icons/instagram'
import IconTiktok from '~icons/simple-icons/tiktok'
import { SOCIALS, hasAnySocialLink, type SocialLink } from '@/data/contact'
import { useI18n } from '@/lib/i18n'

const ICONS: Record<SocialLink['key'], ComponentType<{ className?: string }>> = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  tiktok: IconTiktok,
}

export function SocialLinks({ className = '' }: { className?: string }) {
  const { t } = useI18n()

  return (
    <div className={className}>
      <p className="eyebrow mb-3">{t.footer.followUs}</p>
      <ul className="flex flex-wrap gap-2.5">
        {SOCIALS.map((s) => {
          const Icon = ICONS[s.key]
          return (
            <li key={s.key}>
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="inline-grid size-11 place-items-center rounded-sm border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Icon className="size-[1.15rem]" />
                </a>
              ) : (
                <span
                  aria-hidden="true"
                  title={t.footer.socialPending}
                  className="inline-grid size-11 place-items-center rounded-sm border border-dashed border-line text-faint"
                >
                  <Icon className="size-[1.15rem]" />
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {!hasAnySocialLink && (
        <p className="mt-2.5 text-caption text-faint">{t.footer.socialPending}</p>
      )}
    </div>
  )
}
