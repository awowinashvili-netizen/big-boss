/**
 * Every outward contact point in one place.
 *
 * Client input (ART_DIRECTION §10): the client fills these in — this is the only
 * file to edit. Empty values render as a disabled "coming soon" state, never a
 * broken link.
 *
 *   PHONE     — dialled as `tel:`; keep the leading `+` and country code, e.g. '+995555123456'
 *   WHATSAPP  — used with wa.me; digits only, no `+` or spaces,      e.g. '995555123456'
 *   SOCIALS   — full profile URLs
 */
export const PHONE = ''
export const WHATSAPP = ''

export type SocialLink = { key: 'instagram' | 'facebook' | 'tiktok'; label: string; href: string }

export const SOCIALS: SocialLink[] = [
  { key: 'instagram', label: 'Instagram', href: '' },
  { key: 'facebook', label: 'Facebook', href: '' },
  { key: 'tiktok', label: 'TikTok', href: '' },
]

export const hasPhone = PHONE.trim() !== ''
export const hasWhatsapp = WHATSAPP.trim() !== ''
export const hasContact = hasPhone || hasWhatsapp
export const hasAnySocialLink = SOCIALS.some((s) => s.href.trim() !== '')
