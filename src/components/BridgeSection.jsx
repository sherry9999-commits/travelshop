import { useI18n } from '../i18n/I18nContext.jsx'
import { IMAGES } from '../data/images.js'
import ImagePlaceholder from './ImagePlaceholder.jsx'

/**
 * BRIDGE — a quieter, more intimate beat than the hero.
 *
 * A single text column (eyebrow → headline → supporting copy) sits beside
 * one landscape detail frame. The relationship between headline and
 * supporting text is direct — nothing floats away from anything else.
 */
export default function BridgeSection() {
  const { dictionary: t } = useI18n()

  return (
    <section className="section tone-bone" aria-labelledby="bridge-title">
      <div className="container section__inner">
        <div className="grid bridge__grid">
          <div className="bridge__lead">
            <div className="intro__eyebrow">
              <span className="eyebrow">
                <span className="eyebrow__dot" aria-hidden="true" />
                {t.bridge.eyebrow}
              </span>
            </div>

            <h2 className="t-display bridge__title" id="bridge-title" data-anim="lines">
              {t.bridge.titleLines.map((line, i) => (
                <span className="line" key={i}>
                  <span className="line__inner">{line}</span>
                </span>
              ))}
            </h2>

            <p className="t-lead" data-anim="up">
              {t.bridge.support}
            </p>

            <span className="rule rule--ticks bridge__rule" data-anim="rule" />
          </div>

          <figure className="bridge__media" data-anim="image">
            <ImagePlaceholder
              label={t.bridge.image}
              ratio="16 / 9"
              ratioSm="3 / 2"
              focus="50% 50%"
              image={IMAGES.bridge}
              alt={t.images.bridge}
              motionInner
            />
            <figcaption className="bridge__caption">
              <span>{t.bridge.caption}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
