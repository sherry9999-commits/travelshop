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

/**
 * Official accounts, supplied and confirmed by the owner.
 *
 * Snapchat is deliberately NOT here. There is no confirmed Snapchat profile
 * URL, so the footer shows Snapchat with the main Jordanian phone number as
 * plain supporting text instead. Inventing a handle or a deep link would be
 * worse than showing none.
 */
export const SOCIAL = {
  facebook: 'https://www.facebook.com/TravelShopJordan',
  instagram: 'https://www.instagram.com/travelshop_jordan/',
}
