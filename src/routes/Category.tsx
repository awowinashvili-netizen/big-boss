import { useLayoutEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import IconBack from '~icons/solar/alt-arrow-left-linear'
import { FleetSection } from '@/components/category/FleetSection'
import {
  type CategorySlug,
  getCategory,
  isCategorySlug,
} from '@/data/categories'
import { getCarsByCategory } from '@/data/cars'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useI18n } from '@/lib/i18n'
import NotFound from './NotFound'

export default function Category() {
  const { slug } = useParams()
  if (!isCategorySlug(slug)) return <NotFound />
  return <CategoryView slug={slug} />
}

function CategoryView({ slug }: { slug: CategorySlug }) {
  const { t, localePath } = useI18n()
  const category = getCategory(slug)!
  const cars = getCarsByCategory(slug)
  const rootRef = useRef<HTMLDivElement>(null)

  // Authored entrance: the page composes itself in rather than hard-cutting.
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-cat-head] > *', {
        y: 14,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.06,
      })
      gsap.from('[data-slide]', {
        y: 26,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.12,
      })
    }, el)
    return () => ctx.revert()
  }, [slug])

  return (
    <div ref={rootRef} className="pb-section">
      <div data-cat-head className="u-container pt-8">
        <Link
          to={localePath('/')}
          className="u-label -my-2 inline-flex min-h-[2.75rem] items-center gap-1.5 py-2 text-eyebrow text-muted transition-colors hover:text-fg"
        >
          <IconBack className="size-4" aria-hidden="true" />
          {t.nav.home}
        </Link>

        <p className="eyebrow mt-8">{t.nav.fleet}</p>
        <h1 className="display mt-3 text-display-l text-fg">
          {t.categories[category.tKey]}
        </h1>
      </div>

      <div className="mt-10">
        <FleetSection cars={cars} categoryLabel={t.categories[category.tKey]} />
      </div>
    </div>
  )
}
