import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Slightly conservative defaults — motion should feel expensive and quiet.
gsap.defaults({ ease: 'power2.out', duration: 0.9 })

ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
})

export { gsap, ScrollTrigger }
