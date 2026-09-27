import { useI18n } from '../i18n/I18nContext.jsx'
import { IMAGES } from '../data/images.js'
import ImagePlaceholder from './ImagePlaceholder.jsx'

const FRAME_IMAGES = [IMAGES.trust1, IMAGES.trust2, IMAGES.trust3]
const FRAME_FOCUS = ['50% 38%', '50% 45%', '50% 45%']

/**
 * TRUST / PRESENCE — headline only, by design.
 *
 * The idea is continuity through the real trip, so it is expressed as a
 * timeline of three frames: the first hello → everything in between →
 * the last goodbye. No support iconography, no phone illustrations.
 */
export default function TrustSection() {
  const { dictionary: t } = useI18n()
  const tr = t.trust

  return (
    <section className="section tone-bone" aria-labelledby="trust-title">
      <div className="container section__inner">
        <div className="trust__head">
          <div className="intro__eyebrow">
            <span className="intro__index num">{tr.index}</span>
            <span className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              {tr.eyebrow}
            </span>
          </div>

          <h2 className="t-display trust__line" id="trust-title" data-anim="lines">
            {tr.lineLines.map((line, i) => (
              <span className="line" key={i}>
                <span className="line__inner">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        <ul className="trust__frames">
          {tr.frames.map((frame, i) => (
            <li className="trust__frame" key={i}>
              <div data-anim="image">
                <ImagePlaceholder
                  label={frame.image}
                  ratio="3 / 4"
                  focus={FRAME_FOCUS[i]}
                  index={frame.index}
                  image={FRAME_IMAGES[i]}
                  motionInner
                />
              </div>
              <div className="trust__cap">
                <span className="trust__cap-idx num">{frame.index}</span>
                <span className="trust__cap-label">{frame.label}</span>
                <span className="trust__cap-note">{frame.note}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="trust__foot">
          {tr.foot.map((item) => (
            <span className="trust__foot-item" key={item}>
              <span className="tag__dot" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
