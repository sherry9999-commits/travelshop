import { useI18n } from '../i18n/I18nContext.jsx'
import { whatsappLink } from '../lib/links.js'
import SectionIntro from './SectionIntro.jsx'
import TripFeature from './TripFeature.jsx'
import RouteLine from './RouteLine.jsx'

/**
 * JORDAN TRIPS — "Into Jordan".
 * Two or three cinematic feature rows (alternating sides, so the eye
 * travels) plus a compact trip board that shows the inventory is live and
 * rotates with season, price and availability.
 */
export default function JordanTrips() {
  const { dictionary: t } = useI18n()
  const j = t.jordan

  return (
    <section className="section tone-bone" id="jordan" aria-labelledby="jordan-title">
      <div className="container section__inner">
        <SectionIntro
          index={j.index}
          eyebrow={j.eyebrow}
          titleLines={j.titleLines}
          support={j.support}
          titleId="jordan-title"
        />

        <div className="jordan__features">
          {j.trips.map((trip, i) => (
            <TripFeature
              key={trip.id}
              trip={trip}
              flip={i % 2 === 1}
              label={j.featureLabel}
            />
          ))}
        </div>

        <div className="board">
          <div className="board__head">
            <h3 className="board__title">{j.boardTitle}</h3>
            <p className="board__note">{j.boardNote}</p>
          </div>
          <ul className="board__list">
            {j.board.map((item) => (
              <li key={item.name}>
                <a
                  className="board__row"
                  href={whatsappLink(
                    t.contact.generalPhoneRaw,
                    `${item.name}: is this available?`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="board__name">{item.name}</span>
                  <span className="board__route">
                    <RouteLine stopKeys={item.route} size="sm" />
                  </span>
                  <span className="board__dur">{item.duration}</span>
                  <span className="board__price num">{item.price}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
