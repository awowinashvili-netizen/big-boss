import type { Car } from '@/data/cars'
import {
  formatDisplacement,
  formatDrivetrain,
  formatPower,
  formatPricePerDay,
  formatSeats,
  formatTopSpeed,
  formatTransmission,
} from '@/lib/format'
import { useI18n } from '@/lib/i18n'

/**
 * The specs as a designed block — an instrument cluster, not a table.
 * Numeric readouts are big and monospaced (tabular); the two descriptive
 * values sit smaller; price/day spans the full width as the standout row.
 */
export function SpecBlock({ car }: { car: Car }) {
  const { t, locale } = useI18n()

  const tiles: Array<{ label: string; value: string; numeric?: boolean }> = [
    { label: t.specs.horsepower, value: formatPower(t, locale, car.specs), numeric: true },
    { label: t.specs.topSpeed, value: formatTopSpeed(t, locale, car.specs), numeric: true },
    { label: t.specs.displacement, value: formatDisplacement(t, locale, car.specs), numeric: true },
    { label: t.specs.seats, value: formatSeats(t, locale, car.specs), numeric: true },
    { label: t.specs.drivetrain, value: formatDrivetrain(t, car.specs) },
    { label: t.specs.transmission, value: formatTransmission(t, locale, car.specs) },
  ]

  return (
    <section aria-label={t.specs.title}>
      <p className="eyebrow">{t.specs.title}</p>

      <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
        <dl className="grid grid-cols-2">
          {tiles.map((tile, i) => (
            <div
              key={tile.label}
              className={`flex flex-col gap-1.5 px-4 py-4 sm:px-5 sm:py-5 ${
                i >= 2 ? 'border-t border-line' : ''
              } ${i % 2 === 1 ? 'border-l border-line' : ''}`}
            >
              <dt className="eyebrow text-muted">{tile.label}</dt>
              <dd
                className={
                  tile.numeric
                    ? 'font-mono text-[clamp(1.35rem,5vw,1.7rem)] leading-none tabular-nums text-fg'
                    : 'text-body text-fg'
                }
              >
                {tile.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line bg-accent/8 px-4 py-4 sm:px-5 sm:py-5">
          <span className="eyebrow">{t.specs.pricePerDay}</span>
          <span className="font-mono text-[clamp(1.35rem,5vw,1.7rem)] leading-none tabular-nums text-accent">
            {formatPricePerDay(t, locale, car)}
          </span>
        </div>
      </div>
    </section>
  )
}
