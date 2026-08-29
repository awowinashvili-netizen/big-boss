import { ContactActions } from '@/components/contact/ContactActions'
import type { Car } from '@/data/cars'

/**
 * The Rent action, pinned to the bottom of the viewport on the detail view so
 * it is reachable without scrolling. Sits inside the detail dialog; the dialog
 * content reserves bottom padding so nothing hides behind it.
 */
export function RentBar({ car }: { car: Car }) {
  return (
    <div
      data-rent-bar
      className="fixed inset-x-0 bottom-0 z-[310] border-t border-line bg-bg/92 backdrop-blur px-[var(--spacing-gutter)] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto max-w-[72rem]">
        <ContactActions car={car} variant="bar" />
      </div>
    </div>
  )
}
