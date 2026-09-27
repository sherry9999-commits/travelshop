/**
 * SectionIntro — the shared editorial entry for a section.
 * Keeps a consistent rhythm while allowing the columns to be re-arranged
 * per section through `className` overrides.
 */
export default function SectionIntro({
  index,
  eyebrow,
  titleLines,
  support,
  leadClass = 'intro__lead',
  asideClass = 'intro__aside',
  titleClass = '',
  titleId,
  rule = true,
}) {
  return (
    <header className="intro">
      <div className="grid intro__grid">
        <div className={leadClass}>
          <div className="intro__eyebrow">
            {index ? <span className="intro__index num">{index}</span> : null}
            <span className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              {eyebrow}
            </span>
          </div>
          <h2
            className={`t-display intro__title ${titleClass}`.trim()}
            id={titleId}
            data-anim="lines"
          >
            {titleLines.map((line, i) => (
              <span className="line" key={i}>
                <span className="line__inner">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {support ? (
          <div className={asideClass}>
            <p className="t-lead intro__support" data-anim="up">
              {support}
            </p>
          </div>
        ) : null}
      </div>

      {rule ? <div className="rule rule--ticks" data-anim="rule" /> : null}
    </header>
  )
}
