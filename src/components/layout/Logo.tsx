import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'

/**
 * Logo slot. Currently a typeset wordmark — swap the inner markup for the real
 * brand mark when the client provides it (ART_DIRECTION.md §10). The wordmark is
 * a proper noun, so it stays in the Latin display face regardless of locale.
 */
export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  const { localePath, t } = useI18n()
  return (
    <Link
      to={localePath('/')}
      onClick={onNavigate}
      aria-label={t.meta.brand}
      className="-my-2 inline-flex items-baseline gap-[0.45em] whitespace-nowrap py-2"
    >
      <span
        lang="en"
        className="font-display text-[1.02rem] font-semibold uppercase leading-none tracking-[0.14em] text-fg md:text-[1.1rem]"
      >
        Big Boss
      </span>
      <span
        lang="en"
        className="font-mono text-eyebrow uppercase tracking-[0.34em] text-accent"
      >
        Rent
      </span>
    </Link>
  )
}
