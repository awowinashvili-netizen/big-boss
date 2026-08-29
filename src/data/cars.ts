import type { CategorySlug } from './categories'

/**
 * Single source of truth for the fleet.
 *
 * Image fields (`image`, `gallery`) are paths and may be empty for now — a
 * missing image renders the designed <Placeholder> (ART_DIRECTION.md §9). When
 * real photos arrive, this is the only file to edit.
 *
 * Spec figures are real manufacturer numbers for one specific trim per car
 * (recorded in `trim` + `specsNote`), so nothing here is invented. Power is
 * stored as metric horsepower (PS / CV / л.с.); `specsNote` also records the
 * SAE hp figure where the manufacturer publishes one.
 */

export type Drivetrain = 'rwd' | 'awd' | 'fwd'
export type TransmissionType = 'automatic' | 'manual' | 'dual-clutch'

export type CarSpecs = {
  /** Metric horsepower (PS). See `Car.specsNote` for SAE hp where relevant. */
  horsepower: number
  /** Manufacturer top speed, km/h. */
  topSpeedKph: number
  /** Engine displacement, cm³. */
  displacementCc: number
  drivetrain: Drivetrain
  transmission: TransmissionType
  /** Number of forward gears. */
  gears: number
  seats: number
}

export type Car = {
  id: string
  slug: string
  category: CategorySlug
  brand: string
  model: string
  /** The exact trim the spec figures describe — keeps the numbers honest. */
  trim: string
  year: number
  /** Side-profile shot. Empty until real photos land. */
  image: string
  /** Detail-view gallery. Empty until real photos land. */
  gallery: string[]
  /** Price per day, in `PRICE_CURRENCY`. `null` until the client provides it (§10). */
  pricePerDay: number | null
  specs: CarSpecs
  /** Provenance of the spec figures. Not user-facing. */
  specsNote: string
}

/** Rental currency. Assumed GEL — to be confirmed with the client (ART_DIRECTION §10). */
export const PRICE_CURRENCY = 'GEL'

export const CARS: Car[] = [
  {
    id: 'ghibli',
    slug: 'maserati-ghibli',
    category: 'sedan',
    brand: 'Maserati',
    model: 'Ghibli',
    trim: 'Modena (3.0 V6, MY2023)',
    year: 2023,
    image: '',
    gallery: [],
    pricePerDay: null,
    specs: {
      horsepower: 350,
      topSpeedKph: 267,
      displacementCc: 2979,
      drivetrain: 'rwd',
      transmission: 'automatic',
      gears: 8,
      seats: 5,
    },
    specsNote:
      'Maserati Ghibli Modena, 3.0 L twin-turbo V6 (F160), MY2023 factory figures: ' +
      '350 CV/PS (257 kW, ~345 hp SAE) @ 5750 rpm, 500 N·m, 0–100 km/h in 5.7 s, ' +
      'top speed 267 km/h, ZF 8-speed automatic, rear-wheel drive, 5 seats.',
  },
  {
    id: 'g-class',
    slug: 'mercedes-benz-g-class',
    category: 'suv',
    brand: 'Mercedes-Benz',
    model: 'G-Class',
    trim: 'Mercedes-AMG G 63 (W463A, MY2023)',
    year: 2023,
    image: '',
    gallery: [],
    pricePerDay: null,
    specs: {
      horsepower: 585,
      topSpeedKph: 220,
      displacementCc: 3982,
      drivetrain: 'awd',
      transmission: 'automatic',
      gears: 9,
      seats: 5,
    },
    specsNote:
      'Mercedes-AMG G 63 (W463A), 4.0 L biturbo V8 (M177), factory figures: ' +
      '585 PS (430 kW, ~577 hp SAE) @ 6000 rpm, 850 N·m, 0–100 km/h in 4.5 s, ' +
      'top speed 220 km/h (electronically limited; 240 km/h with the AMG Driver’s ' +
      'Package), AMG SPEEDSHIFT TCT 9-speed automatic, permanent all-wheel drive, 5 seats.',
  },
  {
    id: 'corvette',
    slug: 'chevrolet-corvette',
    category: 'coupe',
    brand: 'Chevrolet',
    model: 'Corvette',
    trim: 'Stingray Coupe (C8) with Z51 Performance Package, MY2024',
    year: 2024,
    image: '',
    gallery: [],
    pricePerDay: null,
    specs: {
      horsepower: 502,
      topSpeedKph: 312,
      displacementCc: 6162,
      drivetrain: 'rwd',
      transmission: 'dual-clutch',
      gears: 8,
      seats: 2,
    },
    specsNote:
      'Chevrolet Corvette Stingray (C8), 6.2 L naturally aspirated LT2 V8, with the ' +
      'Z51 Performance Package, MY2024 factory figures: 495 hp SAE (369 kW, ' +
      '~502 PS metric) @ 6450 rpm, 470 lb-ft / 637 N·m @ 5150 rpm, 0–96 km/h in ' +
      '~2.9 s, top speed ~312 km/h (194 mph), 8-speed dual-clutch (Tremec ' +
      'TR-9080), rear-wheel drive, 2 seats.',
  },
]

export const CAR_SLUGS = [
  'maserati-ghibli',
  'mercedes-benz-g-class',
  'chevrolet-corvette',
] as const

export type CarSlug = (typeof CAR_SLUGS)[number]

export function isCarSlug(value: string | undefined): value is CarSlug {
  return value != null && (CAR_SLUGS as readonly string[]).includes(value)
}

export function getCarBySlug(slug: string | undefined): Car | undefined {
  return CARS.find((c) => c.slug === slug)
}

export function getCarsByCategory(category: CategorySlug): Car[] {
  return CARS.filter((c) => c.category === category)
}
