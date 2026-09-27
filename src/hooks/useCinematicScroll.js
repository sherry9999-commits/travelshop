import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { motionAllowed } from '../lib/motion'

/**
 * Cinematic scroll reveals.
 *
 * Elements opt in with data-anim:
 *   fade   — opacity only
 *   up     — opacity + short rise
 *   image  — clip-path mask reveal; an inner frame marked [data-motion-inner]
 *            receives a controlled scale push, giving the crop a sense of
 *            settling into place
 *   lines  — per-line masked headline reveal
 *   rule   — hairline draw
 *
 * Every tween is a `to()` tween resolving to the element's natural, fully
 * visible state — the static composition is the source of truth. Setup runs
 * once (motion does not need to be re-created when copy changes language).
 */
export function useCinematicScroll(scopeRef, key) {
  useLayoutEffect(() => {
    const root = scopeRef.current
    if (!root) return
    if (!motionAllowed()) return

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(root)

      sel('[data-anim="fade"]').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          duration: 0.9,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      sel('[data-anim="up"]').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      sel('[data-anim="rule"]').forEach((el) => {
        gsap.to(el, {
          scaleX: 1,
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start: 'top 94%' },
        })
      })

      sel('[data-anim="lines"]').forEach((el) => {
        const lines = el.querySelectorAll('.line__inner')
        if (!lines.length) return
        // fromTo keeps the transform in GSAP's own units — a CSS-defined
        // translateY(118%) would otherwise be read as px and never cleared.
        gsap.fromTo(
          lines,
          { y: 0, yPercent: 118 },
          {
            yPercent: 0,
            duration: 1.05,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })

      sel('[data-anim="image"]').forEach((el) => {
        gsap.to(el, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.15,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        })

        // The inner settle-push follows the frame's content: the real image
        // once photography is in place, otherwise the placeholder label plate.
        const inner =
          el.querySelector('[data-motion-inner] .ph__img') ||
          el.querySelector('[data-motion-inner] .ph__inner')
        if (inner) {
          gsap.fromTo(
            inner,
            { scale: 1.09 },
            {
              scale: 1,
              duration: 1.5,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 86%' },
            }
          )
        }
      })
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    // Web fonts change layout metrics — re-measure once they are ready.
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {})

    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [scopeRef, key])
}
