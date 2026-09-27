import { useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { motionAllowed } from '../lib/motion'

/**
 * Header state: `scrolled` once past the hero, plus a 0..1 scroll progress
 * value used for the thin campaign progress line.
 */
export function useHeaderState(threshold = 0.55) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const bar = document.querySelector('[data-progress-bar]')
    let trigger

    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * (threshold - 0.2)
      setScrolled(past)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    if (bar && motionAllowed()) {
      gsap.set(bar, { scaleX: 0 })
      trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      trigger?.kill()
    }
  }, [threshold])

  return scrolled
}
