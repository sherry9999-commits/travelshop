/**
 * TripMetadata — a definition grid with a clear information hierarchy.
 * Not every trip shows every field; callers pass only what exists.
 */
export default function TripMetadata({ items = [], wide = false, className = '' }) {
  if (!items.length) return null
  return (
    <dl className={`meta ${wide ? 'meta--wide' : ''} ${className}`.trim()}>
      {items.map((item) => (
        <div className="meta__item" key={item.label}>
          <dt className="meta__label">{item.label}</dt>
          <dd className="meta__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
