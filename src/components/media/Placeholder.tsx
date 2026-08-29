/**
 * The designed empty state for a missing image. A deliberate surface — matte
 * metal in dark, warm paper in light (see `.bbr-placeholder` in index.css and
 * ART_DIRECTION.md §4). Never a drawn car, never an icon, never "image here"
 * text. Decorative, so it is hidden from assistive tech.
 */
export function Placeholder({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`bbr-placeholder ${className}`} />
}
