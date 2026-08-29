import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'

export default function NotFound() {
  const { t, localePath } = useI18n()
  return (
    <section className="u-container py-section">
      <p className="eyebrow">{t.notFound.code}</p>
      <h1 className="display mt-3 text-display-l text-fg">{t.notFound.title}</h1>
      <p className="mt-5 max-w-prose text-body-lg text-muted">{t.notFound.body}</p>
      <Link
        to={localePath('/')}
        className="u-label mt-8 inline-flex items-center rounded-sm border border-line px-4 py-2.5 text-eyebrow text-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        {t.nav.home}
      </Link>
    </section>
  )
}
