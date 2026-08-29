import { useLayoutEffect, useRef } from 'react'
import { CATEGORIES } from '@/data/categories'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useI18n } from '@/lib/i18n'
import { WordReveal } from '@/components/text/WordReveal'
import { CategoryCard } from './CategoryCard'

export function CategoryGrid() {
  const { t, localePath } = useI18n()
  const listRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = listRef.current
    if (!el || prefersReducedMotion()) return
    const cards = el.querySelectorAll<HTMLElement>('[data-card]')
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        // Don't hide the cards until the trigger actually fires — if it never
        // does (JS partially loads, trigger mis-measures) they stay visible.
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="fleet" className="u-container scroll-mt-[var(--spacing-header)] py-section">
      <p className="eyebrow">{t.nav.fleet}</p>
      <h2 className="mt-3">
        <WordReveal text={t.home.fleet.heading} className="display block text-display-s text-fg" />
      </h2>

      <div ref={listRef} className="mt-10 flex flex-col gap-4 md:grid md:grid-cols-3">
        {CATEGORIES.map((c) => (
          <CategoryCard
            key={c.slug}
            to={localePath(`/category/${c.slug}`)}
            label={t.categories[c.tKey]}
            image={c.image}
          />
        ))}
      </div>
    </section>
  )
}
