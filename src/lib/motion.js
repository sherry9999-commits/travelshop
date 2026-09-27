/**
 * Shared motion state.
 *
 * Motion is only enabled when the user has not asked for reduced motion.
 * The `has-motion` class on <html> opts the page into GSAP's initial
 * "hidden" states (see base.css). Without it, everything renders fully
 * visible — so the page is complete with motion off, or with no JS at all.
 */
export function motionAllowed() {
  if (typeof window === 'undefined') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function enableMotionClass() {
  if (typeof document === 'undefined') return
  if (motionAllowed()) document.documentElement.classList.add('has-motion')
}
