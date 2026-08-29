import IconPhone from '~icons/solar/phone-bold'
import IconWhatsapp from '~icons/simple-icons/whatsapp'
import type { Car } from '@/data/cars'
import { PHONE, WHATSAPP, hasContact, hasPhone, hasWhatsapp } from '@/data/contact'
import { useI18n } from '@/lib/i18n'
import { fillCar, telHref, whatsappHref } from '@/lib/links'

/**
 * Call + WhatsApp. The WhatsApp message is pre-filled with the car name in the
 * active language (or a generic line when no car is given) and percent-encoded.
 * When `contact.ts` has no numbers yet, this renders a disabled "coming soon"
 * state — never a broken link.
 */
export function ContactActions({
  car,
  variant = 'block',
}: {
  car?: Car
  variant?: 'bar' | 'block'
}) {
  const { t } = useI18n()

  const message = car
    ? fillCar(t.actions.whatsappMessage, `${car.brand} ${car.model}`)
    : t.actions.whatsappMessageGeneric

  const row = variant === 'bar' ? 'flex gap-3' : 'flex flex-col gap-3 sm:flex-row'
  const btn =
    'inline-flex flex-1 items-center justify-center gap-2 rounded-md px-5 py-3.5 text-caption font-medium transition-colors'

  if (!hasContact) {
    return (
      <div className={variant === 'bar' ? '' : 'w-full max-w-md'}>
        <div className={row} aria-hidden="true">
          <span className={`${btn} border border-line text-faint`}>
            <IconPhone className="size-[1.1rem]" />
            {t.actions.call}
          </span>
          <span className={`${btn} border border-line text-faint`}>
            <IconWhatsapp className="size-[1.1rem]" />
            {t.actions.whatsapp}
          </span>
        </div>
        <p className="mt-2 text-center text-caption text-faint">{t.actions.contactPending}</p>
      </div>
    )
  }

  return (
    <div className={`${row} ${variant === 'block' ? 'w-full max-w-md' : ''}`}>
      {hasPhone && (
        <a
          href={telHref(PHONE)}
          aria-label={t.actions.callAria}
          className={`${btn} border border-line-strong text-fg hover:border-fg`}
        >
          <IconPhone className="size-[1.1rem]" aria-hidden="true" />
          {t.actions.call}
        </a>
      )}
      {hasWhatsapp && (
        <a
          href={whatsappHref(WHATSAPP, message)}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={t.actions.whatsappAria}
          className={`${btn} bg-accent text-accent-fg hover:bg-accent-hover`}
        >
          <IconWhatsapp className="size-[1.1rem]" aria-hidden="true" />
          {t.actions.whatsapp}
        </a>
      )}
    </div>
  )
}
