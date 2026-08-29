import type { Dict } from '@/i18n'

/**
 * Launch categories — one car each for now, the list grows later.
 * - `slug`  — URL segment: /:lang/category/:slug
 * - `tKey`  — key into dictionary `categories`
 * - `image` — representative image for the category card; empty until real
 *             photos land (ART_DIRECTION.md §9). When adding photos, this is
 *             the only field to touch here.
 */
export type Category = {
  slug: string
  tKey: keyof Dict['categories']
  image: string
}

export const CATEGORIES = [
  { slug: 'sedan', tKey: 'sedan', image: '' },
  { slug: 'suv', tKey: 'suv', image: '' },
  { slug: 'coupe', tKey: 'coupe', image: '' },
] as const satisfies ReadonlyArray<Category>

export type CategorySlug = (typeof CATEGORIES)[number]['slug']

export function isCategorySlug(value: string | undefined): value is CategorySlug {
  return value != null && CATEGORIES.some((c) => c.slug === value)
}

export function getCategory(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
