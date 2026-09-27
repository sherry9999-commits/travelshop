/**
 * WhatsApp / tel / mail helpers.
 * Travelshop's live conversion path is WhatsApp.
 */
export function whatsappLink(rawNumber, message) {
  const base = `https://wa.me/${rawNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function telLink(rawNumber) {
  return `tel:+${rawNumber}`
}

export function mailLink(email) {
  return `mailto:${email}`
}
