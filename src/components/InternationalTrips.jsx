import { useI18n } from '../i18n/I18nContext.jsx'
import { whatsappLink } from '../lib/links.js'
import { IMAGES, DESTINATION_IMAGES } from '../data/images.js'
import SectionIntro from './SectionIntro.jsx'
import ImagePlaceholder from './ImagePlaceholder.jsx'
import RouteLine from './RouteLine.jsx'
import TripMetadata from './TripMetadata.jsx'

/**
 * INTERNATIONAL TRIPS — "Out of Jordan".
 *
 * Deliberately given the same weight as Jordan: one large cinematic
 * destination feature, then a substantial commercial list of departures
 * from Amman with thumbnails, routes, duration, flight type and price.
 */
export default function InternationalTrips() {
  const { dictionary: t } = useI18n()
  const i18 = t.international
  const f = t.jordan.fields
  const feature = i18.feature

  const featureMeta = [
    { label: f.route, value: <RouteLine stopKeys={feature.route} /> },
    { label: f.duration, value: feature.duration },
    { label: f.departure, value: feature.flight },
    { label: f.accommodation, value: feature.hotel },
    { label: f.meals, value: feature.meals },
    { label: f.transport, value: feature.transfers },
    { label: f.format, value: feature.format },
    { label: f.window, value: feature.window },
  ]

  return (
    <section
      className="section tone-ink"
      id="international"
      aria-labelledby="international-title"
    >
      <div className="container section__inner">
        <SectionIntro
          index={i18.index}
          eyebrow={i18.eyebrow}
          titleLines={i18.titleLines}
          support={i18.support}
          titleId="international-title"
        />

        <div className="dest-feature">
          <div className="dest-feature__media" data-anim="image">
            <ImagePlaceholder
              label={feature.image}
              ratio="21 / 9"
              ratioSm="4 / 5"
              focus="50% 56%"
              focusSm="50% 50%"
              index={i18.index}
              overlay
              image={IMAGES.cappadocia}
              motionInner
            />
            <div className="dest-feature__scrim" aria-hidden="true" />
            <div className="dest-feature__overlay">
              <span className="dest-feature__country">
                {feature.country} · {i18.featureLabel}
              </span>
              <h3 className="dest-feature__place">{feature.name}</h3>
              <RouteLine stopKeys={feature.route} />
            </div>
          </div>

          <div className="dest-feature__details">
            <div className="dest-feature__meta">
              <TripMetadata items={featureMeta} wide />
            </div>

            <div className="dest-feature__aside">
              <p className="t-body">{feature.blurb}</p>
              <div className="tags">
                {feature.tags.map((tag) => (
                  <span className="tag tag--accent" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="price">
                <span className="price__from">{f.from}</span>
                <span className="price__value num">{feature.price}</span>
                <span className="price__per">{f.per}</span>
              </p>
              <a
                className="btn"
                href={whatsappLink(
                  t.contact.generalPhoneRaw,
                  `${feature.name} — I would like to know more about this departure.`
                )}
                target="_blank"
                rel="noreferrer"
              >
                {feature.cta}
                <span className="btn__arrow dir-glyph" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="departures">
          <div className="departures__head">
            <h3 className="board__title">{i18.listTitle}</h3>
            <p className="board__note">{i18.listNote}</p>
          </div>

          <ul className="departures__list">
            {i18.list.map((item, i) => (
              <li key={i}>
                <a
                  className="dest-row"
                  href={whatsappLink(
                    t.contact.generalPhoneRaw,
                    `${item.name} — what trips do you have from Amman?`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="dest-row__thumb">
                    <ImagePlaceholder
                      label={item.image}
                      ratio="3 / 2"
                      focus="50% 50%"
                      compact
                      image={DESTINATION_IMAGES[item.route[item.route.length - 1]]}
                    />
                  </div>

                  <div className="dest-row__body">
                    <span className="dest-row__name">{item.name}</span>
                    <span className="dest-row__country">{item.country}</span>
                  </div>

                  <span className="dest-row__route">
                    <RouteLine stopKeys={item.route} size="sm" />
                  </span>

                  <span className="dest-row__tags">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>

                  <span className="dest-row__price num">{item.price}</span>

                  <span className="dest-row__arrow dir-glyph" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
