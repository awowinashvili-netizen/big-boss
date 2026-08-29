/** Build outward-action URLs. The WhatsApp message is percent-encoded here. */

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function whatsappHref(number: string, message: string): string {
  const digits = number.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/** Fill the `{car}` slot in a localised message template. */
export function fillCar(template: string, carName: string): string {
  return template.split('{car}').join(carName)
}
