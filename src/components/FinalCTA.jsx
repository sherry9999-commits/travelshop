import { useI18n } from '../i18n/I18nContext.jsx'
import { whatsappLink } from '../lib/links.js'
import { IMAGES } from '../data/images.js'
import ImagePlaceholder from './ImagePlaceholder.jsx'

/**
 * FINAL CTA — a decisive ending.
 * One question, one obvious action, framed by a campaign image field.
 * No extra sales copy.
 */
export default function FinalCTA() {
  const { dictionary: t } = useI18n()
  const c = t.finalCta

  return (
    <section className="final" id="contact" aria-labelledby="final-title">
      <div className="final__media" aria-hidden="true">
        <ImagePlaceholder
          label={c.image}
          fill
          overlay
          focus="50% 55%"
          focusSm="50% 50%"
          image={IMAGES.final}
        />
        <div className="final__scrim" />
      </div>

      <div className="container final__inner">
        <div className="final__content">
          <span className="eyebrow" data-anim="fade">
            <span className="eyebrow__dot" aria-hidden="true" />
            {c.eyebrow}
          </span>

          <h2 className="t-display final__title" id="final-title" data-anim="lines">
            {c.titleLines.map((line, i) => (
              <span className="line" key={i}>
                <span className="line__inner">{line}</span>
              </span>
            ))}
          </h2>

          <div className="final__actions" data-anim="up">
            <a
              className="btn btn--lg"
              href={whatsappLink(
                t.contact.generalPhoneRaw,
                'Hello Travelshop, I would like to plan a trip.'
              )}
              target="_blank"
              rel="noreferrer"
            >
              {c.cta}
              <span className="btn__arrow dir-glyph" aria-hidden="true">
                →
              </span>
            </a>
            <span className="final__note">{c.note}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
