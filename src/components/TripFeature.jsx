import { useI18n } from '../i18n/I18nContext.jsx'
import { whatsappLink } from '../lib/links.js'
import { TRIP_IMAGES } from '../data/images.js'
import ImagePlaceholder from './ImagePlaceholder.jsx'
import RouteLine from './RouteLine.jsx'
import TripMetadata from './TripMetadata.jsx'

/**
 * TripFeature — a cinematic route/product presentation.
 * Not a booking-marketplace card: one large image frame, one strong
 * typographic block, and a metadata grid that carries real trip logic
 * (route, departure/arrival, accommodation, meals, transport, guide,
 * format, window) before price and CTA.
 */
export default function TripFeature({ trip, flip = false, label }) {
  const { dictionary: t } = useI18n()
  const f = t.jordan.fields

  const items = [
    trip.departure && { label: f.departure, value: trip.departure },
    trip.arrival && { label: f.arrival, value: trip.arrival },
    trip.duration && { label: f.duration, value: trip.duration },
    trip.accommodation && { label: f.accommodation, value: trip.accommodation },
    trip.meals && { label: f.meals, value: trip.meals },
    trip.transport && { label: f.transport, value: trip.transport },
    trip.guide && { label: f.guide, value: trip.guide },
    trip.format && { label: f.format, value: trip.format },
    trip.window && { label: f.window, value: trip.window },
  ].filter(Boolean)

  return (
    <article className={`trip ${flip ? 'trip--flip' : ''}`.trim()}>
      <div className="trip__media" data-anim="image">
        <ImagePlaceholder
          label={trip.image}
          ratio="4 / 3"
          focus="50% 45%"
          focusSm="50% 45%"
          note={label}
          image={TRIP_IMAGES[trip.id]}
          motionInner
        />
      </div>

      <div className="trip__body">
        <div className="trip__head">
          <p className="t-meta">{label}</p>
          <h3 className="t-display trip__name">{trip.name}</h3>
          <RouteLine stopKeys={trip.route} />
        </div>

        <TripMetadata items={items} />

        {trip.inclusions?.length ? (
          <div className="tags" aria-label={f.inclusions}>
            {trip.inclusions.map((inc) => (
              <span className="tag" key={inc}>
                <span className="tag__dot" aria-hidden="true" />
                {inc}
              </span>
            ))}
          </div>
        ) : null}

        <div className="trip__foot">
          <p className="price">
            <span className="price__from">{f.from}</span>
            <span className="price__value num">{trip.price}</span>
            <span className="price__per">{f.per}</span>
          </p>
          <a
            className="link-arrow"
            href={whatsappLink(t.contact.generalPhoneRaw, `${trip.name}: I would like to know more.`)}
            target="_blank"
            rel="noreferrer"
          >
            {trip.cta}
          </a>
        </div>
      </div>
    </article>
  )
}
