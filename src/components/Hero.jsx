import { useLayoutEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { gsap } from '../lib/gsap'
import { motionAllowed } from '../lib/motion.js'
import { IMAGES } from '../data/images.js'
import Picture from './Picture.jsx'

/**
 * HERO — one coherent cinematic campaign frame.
 *
 * Composition (desktop):
 *   full-bleed image field  →  scrim  →  bottom band on a 12-col grid
 *   left  (1–8)  headline + supporting copy, as one unit
 *   right (9–12) the two primary paths: 01 INTO JORDAN / 02 ABROAD
 *
 * The dual path rail is the brand idea made structural: both directions
 * are equal, and both sit inside the same frame as the headline.
 */
export default function Hero() {
  const { dictionary: t } = useI18n()
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!motionAllowed()) return
    const el = root.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.to('.hero-media__ph', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4 }, 0)
        .to('.hero-media__inner', { scale: 1, duration: 1.9, ease: 'power2.out' }, 0)
        .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.25)
        .to(
          '.hero__title .line__inner',
          {
            y: 0,
            yPercent: 0,
            duration: 1.25,
            stagger: 0.1,
          },
          0.3
        )
        .to('.hero__support', { opacity: 1, y: 0, duration: 0.95 }, 0.72)
        .to(
          '.hero__paths .path',
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
          0.8
        )
        .to('.hero__foot', { opacity: 1, y: 0, duration: 0.8 }, 1.05)
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={root}>
      <div className="hero__media">
        <div
          className="ph hero-media__ph ph--fill ph--photo"
          style={{ '--ph-focus': '50% 48%', '--ph-focus-sm': '50% 50%' }}
        >
          <div className="hero-media__inner">
            <Picture image={IMAGES.hero} priority />
          </div>
        </div>
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="grid hero__grid">
          <div className="hero__lead">
            <p className="eyebrow hero__eyebrow hero-el">{t.hero.eyebrow}</p>

            <h1 className="t-display hero__title" id="hero-title">
              {t.hero.titleLines.map((line, i) => (
                <span className="line" key={i}>
                  <span className="line__inner">{line}</span>
                </span>
              ))}
            </h1>

            <p className="t-lead hero__support hero-el">{t.hero.support}</p>
          </div>

          <div className="hero__paths">
            {t.hero.paths.map((path) => (
              <a className="path hero-el" href={path.href} key={path.href}>
                <span className="path__index num">{path.index}</span>
                <span className="path__body">
                  <span className="path__title">{path.title}</span>
                  <span className="path__note">{path.note}</span>
                </span>
                <span className="path__arrow dir-glyph" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero__foot hero-el">
          <span className="scroll-cue">
            <span className="scroll-cue__line" aria-hidden="true" />
            {t.hero.scroll}
          </span>
          <span className="hero__foot-meta">{t.hero.location}</span>
        </div>
      </div>
    </section>
  )
}
