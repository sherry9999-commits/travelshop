/**
 * Wordmark
 * ---------------------------------------------------------------------------
 * The Travelshop wordmark: TRAVELSHOP set in the brand display face with
 * deliberately tuned letter relationships rather than uniform tracking, plus
 * the ember square as a brand mark.
 *
 * The kerning values below are the design: the classic A/V and L/S pairs close
 * up, the round O opens slightly, and the outer letters keep a little air so
 * the unit reads as a locked mark rather than tracked-out type.
 *
 * Variants are free rather than duplicated: colour is inherited from
 * `currentColor`, so the same component renders light on ink and dark on paper.
 * The ember mark is the only constant. No compact/monogram variant exists
 * because the full wordmark fits the mobile header at 360px, so a second mark
 * would be clutter rather than a need.
 *
 * This is the typographic basis for the future logo, not the final logo.
 */
const LETTERS = [
  ['T', 0.014],
  ['R', -0.004],
  ['A', -0.026],
  ['V', -0.046],
  ['E', -0.018],
  ['L', -0.026],
  ['S', 0.004],
  ['H', 0.006],
  ['O', -0.01],
  ['P', 0.008],
]

export default function Wordmark({ className = '', mark = true }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      {mark ? <span className="wordmark__mark" aria-hidden="true" /> : null}
      <span className="wordmark__letters">
        {LETTERS.map(([letter, kern], i) => (
          <span
            className="wordmark__letter"
            key={`${letter}-${i}`}
            style={{ marginInlineEnd: `${kern}em` }}
          >
            {letter}
          </span>
        ))}
      </span>
    </span>
  )
}
