/**
 * Fills `{token}` placeholders in a localized string.
 * Keeps locale copy in the dictionaries while letting components interpolate
 * names, destinations and user input into it.
 */
export function fill(template, vars = {}) {
  return String(template ?? '').replace(/\{(\w+)\}/g, (match, key) =>
    vars[key] === undefined ? match : String(vars[key])
  )
}
