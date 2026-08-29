import { useCallback, useEffect, useState, type RefObject } from 'react'
import type { Car } from '@/data/cars'
import { useI18n } from '@/lib/i18n'
import { CarSlide } from './CarSlide'

/**
 * The fleet strip. One component, two shapes:
 *
 * - **1 car** — a single large card, centered. No scroll, no fades, no swipe
 *   affordance; it reads as a deliberate single showcase.
 * - **2+ cars** — a horizontally scroll-snapping row tuned for thumb scrolling:
 *   native momentum, snap-per-card, the next card peeking in, edge fades and a
 *   live `NN / 0N` position readout to signal there is more off-screen.
 *
 * Growing the fleet in `cars.ts` moves it from the first shape to the second
 * with no layout rework.
 */
export function FleetStrip({
  cars,
  label,
  activeCarId,
  trackRef,
  onSelect,
}: {
  cars: Car[]
  label: string
  activeCarId: string | null
  trackRef: RefObject<HTMLDivElement | null>
  onSelect: (car: Car) => void
}) {
  const { locale } = useI18n()
  const single = cars.length <= 1
  const [active, setActive] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track || single) return
    const { scrollLeft, clientWidth, scrollWidth } = track
    setEdges({
      start: scrollLeft <= 8,
      end: scrollLeft >= scrollWidth - clientWidth - 8,
    })
    const center = scrollLeft + clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setActive(best)
  }, [single, trackRef])

  useEffect(() => {
    const track = trackRef.current
    if (!track || single) return
    measure()
    track.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      track.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure, single, cars.length, trackRef])

  const fmt = (n: number) => new Intl.NumberFormat(locale).format(n).padStart(2, '0')

  return (
    <div className="relative">
      {!single && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 transition-opacity duration-300 md:w-16"
            style={{
              background: 'linear-gradient(to right, var(--bg), transparent)',
              opacity: edges.start ? 0 : 1,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 transition-opacity duration-300 md:w-16"
            style={{
              background: 'linear-gradient(to left, var(--bg), transparent)',
              opacity: edges.end ? 0 : 1,
            }}
          />
        </>
      )}

      <div
        ref={trackRef}
        data-lenis-prevent
        role={single ? undefined : 'region'}
        aria-label={single ? undefined : label}
        tabIndex={single ? undefined : 0}
        className={`no-scrollbar flex gap-5 overflow-x-auto overscroll-x-contain px-[var(--spacing-gutter)] ${
          single ? 'justify-center' : 'snap-x snap-mandatory'
        }`}
      >
        {cars.map((car) => (
          <CarSlide
            key={car.id}
            car={car}
            single={single}
            detailOpen={activeCarId === car.id}
            onSelect={() => onSelect(car)}
          />
        ))}
      </div>

      <p className="u-label mt-6 px-[var(--spacing-gutter)] text-caption text-faint">
        {fmt(active + 1)} / {fmt(cars.length)}
      </p>
    </div>
  )
}
