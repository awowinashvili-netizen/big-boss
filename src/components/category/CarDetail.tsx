import { useId, useRef } from 'react'
import IconClose from '~icons/solar/close-square-linear'
import { Media } from '@/components/media/Media'
import { RentBar } from '@/components/category/RentBar'
import { SpecBlock } from '@/components/category/SpecBlock'
import { flipHeroId } from '@/components/category/flip'
import type { Car } from '@/data/cars'
import { useFocusTrap } from '@/lib/dialog'
import { useI18n } from '@/lib/i18n'

/**
 * The expanded car view. Rendered as a modal overlay on top of the still-mounted
 * fleet strip so GSAP Flip can morph the shared side-profile image between them.
 * The scrim, scroll lock and all animation live in `FleetSection`; this
 * component owns the focus trap and the semantics.
 */
export function CarDetail({ car, onClose }: { car: Car; onClose: () => void }) {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const name = `${car.brand} ${car.model}`

  useFocusTrap(ref, { active: true, onEscape: onClose })

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
      className="fixed inset-0 z-[300] overflow-y-auto overscroll-contain"
    >
      <div className="relative mx-auto flex min-h-full w-full max-w-[72rem] flex-col px-[var(--spacing-gutter)] pt-4 pb-[7.5rem]">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{t.nav.fleet}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.detail.close}
            className="inline-grid size-11 place-items-center rounded-sm border border-transparent text-muted transition-colors hover:border-line hover:text-fg"
          >
            <IconClose className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-x-12">
          <div>
            <div
              data-flip-id={flipHeroId(car)}
              className="w-full overflow-hidden rounded-lg border border-line bg-surface shadow-pop"
            >
              <Media src={car.image} alt={name} ratio="16 / 10" priority />
            </div>

            <div data-detail-reveal className="mt-6">
              <h2 id={titleId} className="display text-display-l text-fg">
                {name}
              </h2>
              <p className="mt-2 font-mono text-caption text-muted">
                {car.year} · {car.trim}
              </p>
            </div>
          </div>

          <div data-detail-reveal className="mt-9 lg:mt-0">
            <SpecBlock car={car} />
          </div>

          <section
            data-detail-reveal
            className="mt-11 lg:col-span-2 lg:mt-14"
            aria-label={t.detail.gallery}
          >
            <p className="eyebrow">{t.detail.gallery}</p>
            {car.gallery.length > 0 ? (
              <div
                data-lenis-prevent
                className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain"
              >
                {car.gallery.map((src, i) => (
                  <div key={src || i} className="w-[82%] shrink-0 snap-center md:w-[26rem]">
                    <Media
                      src={src}
                      alt={`${name} — ${i + 1}`}
                      ratio="3 / 2"
                      mediaClassName="rounded-lg border border-line"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <Media
                  src=""
                  alt=""
                  ratio="16 / 9"
                  mediaClassName="rounded-lg border border-line"
                />
                <p className="mt-3 text-caption text-faint">{t.detail.galleryPending}</p>
              </div>
            )}
          </section>
        </div>
      </div>

      <RentBar car={car} />
    </div>
  )
}
