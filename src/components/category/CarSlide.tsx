import { Media } from '@/components/media/Media'
import type { Car } from '@/data/cars'
import { flipHeroId } from '@/components/category/flip'
import { formatPricePerDay } from '@/lib/format'
import { useI18n } from '@/lib/i18n'

/**
 * One car in the fleet strip — a side-profile shot with its name and price.
 * The media wrapper carries `data-flip-id` so GSAP Flip can travel it into the
 * detail view; that id is dropped while this car's detail is open, so only the
 * detail hero holds it during the morph.
 */
export function CarSlide({
  car,
  single,
  detailOpen,
  onSelect,
}: {
  car: Car
  single: boolean
  detailOpen: boolean
  onSelect: () => void
}) {
  const { t, locale } = useI18n()
  const name = `${car.brand} ${car.model}`

  return (
    <button
      type="button"
      onClick={onSelect}
      data-slide
      data-car-id={car.id}
      className={`group flex shrink-0 snap-center snap-always flex-col text-left ${
        single
          ? 'w-[min(88vw,34rem)] md:w-[min(62vw,46rem)]'
          : 'w-[82vw] max-w-[26rem] md:w-[24rem]'
      }`}
    >
      <div
        data-flip-id={detailOpen ? undefined : flipHeroId(car)}
        className="w-full overflow-hidden rounded-lg border border-line bg-surface shadow-card"
      >
        <Media
          src={car.image}
          alt={name}
          ratio="16 / 7"
          mediaClassName="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="display text-title text-fg transition-colors group-hover:text-accent">
          {name}
        </span>
        <span className="whitespace-nowrap font-mono text-caption text-muted">
          {formatPricePerDay(t, locale, car)}
        </span>
      </div>
    </button>
  )
}
