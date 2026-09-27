import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { whatsappLink } from '../lib/links.js'
import { IMAGES } from '../data/images.js'
import ImagePlaceholder from './ImagePlaceholder.jsx'

/**
 * CUSTOM TRIPS — the campaign pause.
 *
 * The visible trips are explicitly not the limit: the traveler can begin
 * with the trip already in their head. Composed as an off-grid split —
 * content on one side, a full-height frame bleeding off the other edge —
 * so it reads as a distinct moment rather than another text block.
 */
export default function CustomTripSection() {
  const { dictionary: t } = useI18n()
  const c = t.custom
  const [value, setValue] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    // Prototype: no submission. Hand the idea straight to WhatsApp instead.
    const message = value
      ? `I'm thinking about: ${value}`
      : 'I have a trip in mind — can we talk it through?'
    window.open(
      whatsappLink(t.contact.generalPhoneRaw, message),
      '_blank',
      'noopener'
    )
  }

  return (
    <section className="custom" id="custom" aria-labelledby="custom-title">
      <div className="container">
        <div className="custom__grid">
          <div className="custom__body">
            <div className="intro__eyebrow">
              <span className="intro__index num">{c.index}</span>
              <span className="eyebrow">
                <span className="eyebrow__dot" aria-hidden="true" />
                {c.eyebrow}
              </span>
            </div>

            <h2 className="t-display custom__title" id="custom-title" data-anim="lines">
              {c.titleLines.map((line, i) => (
                <span className="line" key={i}>
                  <span className="line__inner">{line}</span>
                </span>
              ))}
            </h2>

            <p className="t-lead custom__support" data-anim="up">
              {c.support}
            </p>

            <form className="custom__form" onSubmit={onSubmit} data-anim="up">
              <label className="custom__field">
                <span className="visually-hidden">{c.inputPlaceholder}</span>
                <input
                  className="custom__input"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={c.inputPlaceholder}
                />
                <button
                  className="custom__submit dir-glyph"
                  type="submit"
                  aria-label={c.cta}
                  title={c.cta}
                >
                  →
                </button>
              </label>
              <p className="custom__note">{c.note}</p>
            </form>
          </div>

          <div className="custom__media" data-anim="image">
            <ImagePlaceholder
              label={c.image}
              fill
              overlay
              focus="50% 50%"
              focusSm="50% 50%"
              image={IMAGES.custom}
              motionInner
            />
            <span className="custom__media-caption t-meta">{c.caption}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
