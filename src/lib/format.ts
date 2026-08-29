import { PRICE_CURRENCY, type Car, type CarSpecs } from '@/data/cars'
import type { Dict, Locale } from '@/i18n'

/**
 * Localised formatting for car data. Keeps spec strings out of components —
 * every user-facing value is composed here, through the dictionary.
 */

const CURRENCY_SYMBOL: Record<string, string> = {
  GEL: '₾',
  USD: '$',
  EUR: '€',
}

export function formatNumber(locale: Locale, n: number): string {
  return new Intl.NumberFormat(locale).format(n)
}

export function formatPower(t: Dict, locale: Locale, specs: CarSpecs): string {
  return `${formatNumber(locale, specs.horsepower)} ${t.units.hp}`
}

export function formatTopSpeed(t: Dict, locale: Locale, specs: CarSpecs): string {
  return `${formatNumber(locale, specs.topSpeedKph)} ${t.units.kmh}`
}

export function formatDisplacement(t: Dict, locale: Locale, specs: CarSpecs): string {
  return `${formatNumber(locale, specs.displacementCc)} ${t.units.cc}`
}

export function formatDrivetrain(t: Dict, specs: CarSpecs): string {
  return t.drivetrain[specs.drivetrain]
}

export function formatTransmission(t: Dict, locale: Locale, specs: CarSpecs): string {
  const gears = formatNumber(locale, specs.gears)
  return `${gears}${t.transmission.speed} ${t.transmission[specs.transmission]}`
}

export function formatSeats(t: Dict, locale: Locale, specs: CarSpecs): string {
  return `${formatNumber(locale, specs.seats)} ${t.units.seats}`
}

export function formatPricePerDay(t: Dict, locale: Locale, car: Car): string {
  if (car.pricePerDay == null) return t.pricing.onRequest
  const symbol = CURRENCY_SYMBOL[PRICE_CURRENCY] ?? PRICE_CURRENCY
  return `${symbol}${formatNumber(locale, car.pricePerDay)} / ${t.pricing.perDay}`
}

/** The spec rows for a car, in display order — label + formatted value. */
export function specRows(t: Dict, locale: Locale, car: Car): Array<{ label: string; value: string }> {
  return [
    { label: t.specs.horsepower, value: formatPower(t, locale, car.specs) },
    { label: t.specs.topSpeed, value: formatTopSpeed(t, locale, car.specs) },
    { label: t.specs.displacement, value: formatDisplacement(t, locale, car.specs) },
    { label: t.specs.drivetrain, value: formatDrivetrain(t, car.specs) },
    { label: t.specs.transmission, value: formatTransmission(t, locale, car.specs) },
    { label: t.specs.seats, value: formatSeats(t, locale, car.specs) },
    { label: t.specs.pricePerDay, value: formatPricePerDay(t, locale, car) },
  ]
}
