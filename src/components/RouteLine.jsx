import { useI18n } from '../i18n/I18nContext.jsx'

/**
 * A typographic route: Amman —— Petra —— Wadi Rum.
 * This is Travelshop's directional motif. It is expressed with type and
 * hairlines, never with maps, pins or flight-path graphics.
 */
export default function RouteLine({ stopKeys = [], size = 'md', className = '' }) {
  const { dictionary } = useI18n()
  const places = dictionary.places || {}

  return (
    <span
      className={`route ${size === 'sm' ? 'route--sm' : ''} ${className}`.trim()}
      dir="auto"
    >
      {stopKeys.map((key, i) => (
        <span key={`${key}-${i}`} style={{ display: 'contents' }}>
          {i > 0 && (
            <span className="route__arrow dir-glyph" aria-hidden="true">
              →
            </span>
          )}
          <span className="route__stop">{places[key] || key}</span>
        </span>
      ))}
    </span>
  )
}
