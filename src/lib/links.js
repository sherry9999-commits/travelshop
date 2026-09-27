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
 * Verified official accounts only.
 *
 * Facebook is verified: the page carries the same brand name, the same tagline
 * ("Your Simple Gate to Beautiful Jordan") and the same contact address
 * (info@travelshop-jordan.com) as the official Travelshop site, and the same
 * phone number is published on travelshop-jordan.com.
 *
 * Instagram is deliberately absent. No account could be confirmed as belonging
 * to Travelshop, and inventing or guessing a handle would be worse than
 * omitting it. Add it here once the owner supplies the exact URL.
 */
export const SOCIAL = {
  facebook: 'https://www.facebook.com/TravelShopJordan',
}
