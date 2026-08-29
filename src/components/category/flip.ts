import type { Car } from '@/data/cars'

/** Shared `data-flip-id` for a car's side-profile image — the element GSAP Flip
 *  travels between the fleet strip and the detail view. */
export function flipHeroId(car: Pick<Car, 'id'>): string {
  return `flip-hero-${car.id}`
}
