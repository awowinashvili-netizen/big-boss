import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import IconArrowDown from '~icons/solar/alt-arrow-down-linear'
import IconArrowRight from '~icons/solar/arrow-right-linear'
import { Media } from '@/components/media/Media'
import { WordReveal } from '@/components/text/WordReveal'
import { getCarBySlug } from '@/data/cars'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useI18n } from '@/lib/i18n'
import { useLenis } from '@/lib/lenis'

/** The hero focal asset is one real fleet car — the G-Class (ART_DIRECTION §2). */
const HERO_IMAGE = getCarBySlug('mercedes-benz-g-class')?.image ?? ''
const FLEET_ID = 'fleet'

export function Hero() {
  const { t } = useI18n()
  const lenisRef = useLenis()
  const root = useRef<HTMLElement>(null)
  const [heroInView, setHeroInView] = useState(true)

  // Pause the scroll-cue animation once the hero leaves the viewport.
  useEffect(() => {
    const el = root.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('[data-hero="eyebrow"]', { y: 12, opacity: 0, duration: 0.5 }, 0)
        // headline words animate inside <WordReveal> with their own delay
        .from(
          '[data-hero="media"]',
          { opacity: 0, scale: 1.04, duration: 1.1, ease: 'power2.out' },
          0.1,
        )
        .from('[data-hero="sub"]', { y: 14, opacity: 0, duration: 0.6 }, 0.4)
        // CTA: transform only — it stays visible and tappable throughout
        .from('[data-hero="cta"]', { y: 14, duration: 0.6 }, 0.5)
        .from('[data-hero="cue"]', { opacity: 0, duration: 0.6 }, 0.95)
    }, el)

    return () => ctx.revert()
  }, [])

  const scrollToFleet = (e: React.MouseEvent) => {
    const target = document.getElementById(FLEET_ID)
    if (!target) return
    e.preventDefault()
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(target, { offset: -16 })
    else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] flex-col overflow-hidden md:flex-row"
    >
      <div className="u-container flex shrink-0 flex-col pt-[calc(var(--spacing-header)+1.75rem)] pb-6 md:w-[46%] md:justify-center md:pt-[var(--spacing-header)]">
        <p data-hero="eyebrow" className="eyebrow">
          {t.home.hero.eyebrow}
        </p>

        <h1 className="mt-4">
          <WordReveal
            text={t.meta.brand}
            className="display block text-display-xl text-fg"
            delay={0.15}
            stagger={0.08}
          />
        </h1>

        <p data-hero="sub" className="mt-5 max-w-[26ch] text-body-lg text-muted">
          {t.meta.tagline}
        </p>

        <div data-hero="cta" className="mt-8">
          <a
            href={`#${FLEET_ID}`}
            onClick={scrollToFleet}
            className="u-label inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-caption text-accent-fg transition-colors hover:bg-accent-hover"
          >
            {t.home.hero.cta}
            <IconArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div data-hero="media" className="relative min-h-0 flex-1">
        <Media fill priority src={HERO_IMAGE} alt={t.home.hero.imageAlt} />
      </div>

      <a
        data-hero="cue"
        href={`#${FLEET_ID}`}
        onClick={scrollToFleet}
        aria-label={t.home.hero.scrollCue}
        className="absolute inset-x-0 bottom-3 z-10 mx-auto grid size-11 place-items-center text-faint transition-colors hover:text-fg"
      >
        <IconArrowDown
          className={`size-5 ${heroInView ? 'motion-safe:animate-bounce' : ''}`}
          aria-hidden="true"
        />
      </a>
    </section>
  )
}
