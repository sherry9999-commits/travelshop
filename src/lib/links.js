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

/**
 * Partner destinations, isolated from the components so they can be activated
 * without touching markup.
 *
 * AqabaVIP is an official partner of Travelshop, focused on Aqaba and the Red
 * Sea. No AqabaVIP website URL has been supplied yet, so `url` is deliberately
 * `null` and no link is rendered anywhere. Set the real URL here and the CTA
 * appears on the Aqaba trip card and in the footer with no other change.
 *
 * No AqabaVIP logo asset exists yet either, so the partnership is expressed
 * with the name set in the site's own type rather than a stand-in mark.
 */
export const PARTNERS = {
  aqabaVip: {
    url: null,
  },
}
