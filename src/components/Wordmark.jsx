/**
 * Wordmark
 * ---------------------------------------------------------------------------
 * TRAVELSHOP set in the brand display face, with two deliberate decisions:
 *
 * 1. The O of SHOP is the ember point. The brand's line is "Point anywhere",
 *    so the point lives inside the name rather than floating beside it as a
 *    detached square. A disc is the same silhouette as an O, so nothing is
 *    lost in legibility: it reads as an accent, never as a broken glyph.
 *    No other letter is touched and no second device is introduced.
 *
 * 2. The wordmark is pinned to `direction: ltr`. It is a Latin brand name, so
 *    it must read TRAVELSHOP in every language, including Arabic and Hebrew.
 *    Without this, flex ordering mirrors the letters in RTL and the name
 *    renders backwards.
 *
 * Variants are free rather than duplicated: colour is inherited from
 * `currentColor` and the point uses `var(--accent)`, which resolves to the
 * brighter ember on ink and the deeper ember on paper. No compact/monogram
 * variant exists, because the full wordmark fits the mobile header at 360px.
 *
 * This is the typographic basis for the final logo.
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

export default function Wordmark({ className = '' }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      <span className="wordmark__letters">
        {LETTERS.map(([letter, kern], i) => (
          <span
            className="wordmark__letter"
            key={`${letter}-${i}`}
            style={{ marginInlineEnd: `${kern}em` }}
          >
            {letter === 'O' ? (
              <span className="wordmark__point" aria-hidden="true" />
            ) : (
              letter
            )}
          </span>
        ))}
      </span>
    </span>
  )
}
