import { ContactActions } from '@/components/contact/ContactActions'
import { WordReveal } from '@/components/text/WordReveal'
import { useI18n } from '@/lib/i18n'

export function About() {
  const { t } = useI18n()
  return (
    <section className="u-container border-t border-line py-section">
      <p className="eyebrow">{t.about.eyebrow}</p>
      <h2 className="mt-3 max-w-[16ch]">
        <WordReveal text={t.about.heading} className="display block text-display-s text-fg" />
      </h2>
      <p className="mt-6 max-w-prose text-body-lg text-muted">{t.about.body}</p>
    </section>
  )
}

export function Conditions() {
  const { t } = useI18n()
  return (
    <section className="u-container border-t border-line py-section">
      <p className="eyebrow">{t.conditions.eyebrow}</p>
      <h2 className="mt-3 max-w-[18ch]">
        <WordReveal text={t.conditions.heading} className="display block text-display-s text-fg" />
      </h2>
      <p className="mt-6 max-w-prose text-body-lg text-muted">{t.conditions.body}</p>
      <p className="mt-4 max-w-prose text-caption text-faint">{t.conditions.note}</p>
    </section>
  )
}

export function FinalCta() {
  const { t } = useI18n()
  return (
    <section className="border-t border-line bg-bg-subtle">
      <div className="u-container flex flex-col items-start gap-6 py-section md:items-center md:text-center">
        <h2 className="max-w-[20ch]">
          <WordReveal text={t.finalCta.heading} className="display block text-display-l text-fg" />
        </h2>
        <p className="max-w-prose text-body-lg text-muted">{t.finalCta.body}</p>
        <div className="mt-2 flex w-full justify-start md:justify-center">
          <ContactActions variant="block" />
        </div>
      </div>
    </section>
  )
}
