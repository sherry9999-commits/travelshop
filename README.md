# TRAVELSHOP — Homepage Prototype

A cinematic travel-campaign homepage for **Travelshop** (Amman, Jordan).

Built as a real React + Vite application, not a static mockup. Every place a final
photograph will eventually live is a **visible image placeholder rendered at its
intended final size and aspect ratio**, so image scale, crop, placement and rhythm
can be judged honestly before any photography exists.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build to /dist
npm run preview    # serve the production build
```

No image downloads, no external assets beyond the web fonts (Google Fonts).
If the fonts cannot be reached, the documented fallback stacks take over and the
layout still holds.

---

## The visual system

**Direction: Cinematic Travel Campaign.** One continuous tonal world built from a
deep warm ink and a warm paper, joined by hard, motivated cuts — the way a film
cuts between scenes. No section-by-section rainbow, no black-and-gold, no
tourism gradient.

| Token | Value | Role |
| --- | --- | --- |
| `--ink-950 … --ink-600` | `#090908 → #2c2a24` | the dark world (hero, international, custom, CTA, footer) |
| `--paper-0 … --bone-100` | `#f8f5ee → #e9e3d6` | the light world (bridge, Jordan, presence) |
| `--ember` / `--ember-bright` | `#b14e27` / `#e08a5c` | the single accent — indices, arrows, active states, hairlines |
| `--steel` | `#6d7b82` | reserved secondary, used sparingly |

Tonal arc: **dark open → light heart (into Jordan) → dark beyond (out of Jordan)
→ light proof → dark close.**

**Type.** The identity is carried by **Unbounded** — a geometric display grotesk
drawn Cyrillic-first, so English and Russian headlines are the same design rather
than a fallback. Its wide, architectural silhouettes and strong word shapes give
the campaign headlines their character without needing large sizes; display sizes
are deliberately held to ~42–59px. Script companions are chosen, not defaulted:
**Alexandria** for Arabic (contemporary, warm, neutral pan-Arab MSA) and **Rubik**
for Hebrew (geometric, modern, same temperament as the Latin). UI, metadata and
numerals stay quieter in **Archivo**, with **Onest** as its Cyrillic companion so
Russian metadata is a designed pairing. Tracking, line-height and line-mask
padding are tuned per script in `src/styles/tokens.css`.

**Composition.** A disciplined 12-column grid (8 / 4 on tablet) that is broken on
purpose — alternating trip rows, an off-grid custom-trip split, a bleed-to-edge
feature frame — never by accident. Display sizes are capped between ~45px and
~65px: presence comes from crop, measure and hierarchy, not from scale.

**Motion.** GSAP + ScrollTrigger, layered on top of a page that is already
finished without it: image-mask reveals with a controlled inner crop push,
per-line masked headline reveals, hairline draws, one hero entrance timeline.
No scroll-jacking, no cursor gimmicks, no parallax on text. `prefers-reduced-motion`
disables all of it and the page renders fully visible.

---

## Structure

```
src/
  main.jsx                  entry; enables motion only when allowed
  App.jsx                   fixed homepage sequence
  components/
    Header.jsx  MobileMenu.jsx  LanguageSwitcher.jsx
    Hero.jsx                  the campaign frame
    BridgeSection.jsx
    JordanTrips.jsx  TripFeature.jsx  TripMetadata.jsx
    InternationalTrips.jsx    feature + departures list
    CustomTripSection.jsx
    TrustSection.jsx
    Reviews.jsx               NOT MOUNTED — renders verified reviews only
    FinalCTA.jsx
    Footer.jsx
    ImagePlaceholder.jsx      the frame for photography (placeholder or real)
    Picture.jsx               the single responsive <picture> renderer
    RouteLine.jsx  SectionIntro.jsx
  data/
    images.js                 image provenance + delivery config
  i18n/                       en.js ar.js ru.js he.js + I18nContext.jsx
  hooks/                      useCinematicScroll.js  useHeaderState.js
  lib/                        gsap.js  motion.js  links.js
  styles/                     tokens.css base.css layout.css components.css sections.css
```

### Image placeholders

`<ImagePlaceholder>` renders the frame at its final aspect ratio with a restrained
double hairline, a faint diagonal weave, corner ticks and a structural label
(`HERO IMAGE`, `JORDAN TRIP IMAGE — PETRA & WADI RUM`, …). Variants:

- `fill` — stretch to the parent (full-bleed / full-height frames)
- `overlay` — content or a scrim sits over it: drops the bottom caption row and
  clears the fixed header
- `compact` — dense list thumbnails: keeps the frame, drops the label
- `ratioSm` — a taller, more cinematic crop on small screens

### Crop contract (mobile-ready)

Every frame carries its own crop intent as two pairs of CSS custom properties, so
final photography can use a **different mobile crop** and a **different mobile
object-position** without touching container CSS:

| prop | custom property | role |
| --- | --- | --- |
| `ratio` / `ratioSm` | `--ph-ratio` / `--ph-ratio-sm` | frame proportion, desktop / ≤700px |
| `focus` / `focusSm` | `--ph-focus` / `--ph-focus-sm` | `object-position`, desktop / ≤700px |

```jsx
<ImagePlaceholder
  label="International feature image — Cappadocia"
  ratio="21 / 9"   ratioSm="4 / 5"    /* cinematic strip → tall portrait */
  focus="50% 45%"  focusSm="50% 30%"  /* keep the subject high in the crop */
/>
```

Passing **`src`** is the entire photography swap: the image is rendered as a
`<img class="ph__img">` and `ph--photo` retires the placeholder chrome (frame,
weave, ticks, label). The hero frame takes the same two custom properties inline;
it needs `ph--photo` added when its image arrives.

Current focus: hero `50% 48%` (desktop) with an explicit mobile crop rect,
trip `4/3` → `50% 45%`, international feature `50% 56%` → mobile `4/5` `50% 50%`,
custom `50% 50%`, presence frames `3/4` → `50% 38% / 45% / 45%`,
final CTA `50% 55%`, bridge `50% 50%`.

Art direction can go further than `object-position`: passing **`smRect`**
(x, y, w, h in source pixels) hands the CDN an exact crop window for the mobile
source set, so a small screen gets a deliberately composed frame rather than a
scaled-down desktop one. The hero uses this to keep the lit ridge and the road —
instead of empty sky — in its tall mobile frame.

---

## Imagery

The site currently carries a **temporary validation set**: real photography
hotlinked from the Unsplash CDN so the whole page can be judged as one visual
system. Full attribution, photo pages and the reasoning behind every choice are
in [`docs/image-provenance.md`](docs/image-provenance.md); the machine-readable
record lives in `src/data/images.js`.

### How images are delivered

`<Picture>` (`src/components/Picture.jsx`) is the only image renderer.

- **AVIF primary, WebP fallback, JPEG last resort**, emitted as `<source>`
  elements in that order — no JS, no polyfill.
- **Responsive `srcset` + `sizes`** per slot, so a phone downloads a phone-sized
  file. The international thumbnails, for example, cap at 480w because they
  render at 100–160 CSS px.
- **Art direction where it matters.** Passing `smAr` (or an explicit `smRect`
  crop window) emits a `(max-width: 700px)` source set composed for small
  screens — the hero gets a genuine portrait crop of the road and ridge, and the
  international feature re-crops from a 21:9 strip to a 4:5 portrait.
- **`width` / `height` plus a CSS `aspect-ratio` on every frame**, so there is no
  layout shift whether the image loads, fails, or arrives late.
- **Priority is opt-in.** Only the hero sets it: `loading="eager"`,
  `fetchpriority="high"`, `decoding="sync"`. Every other image is
  `loading="lazy"` + `decoding="async"`.
- **The hero is preloaded** in `index.html` with two `rel="preload"` links —
  one per breakpoint, `media`-scoped, `imagesrcset`/`imagesizes` aware — so the
  campaign frame is never discovered late.
- `ph--photo` retires the placeholder chrome (frame, weave, ticks, label) the
  moment an `image` is supplied, and the frame's `role="img"`/`aria-label` is
  dropped so the real `<img alt>` is what assistive tech announces.

### Swapping in production assets

`base` is the only thing that changes. Export local variants, point `base` at
them, and every component keeps working: the frame proportions, crop focus,
lazy-loading, srcsets and the hero preload are all already in place.

---

## Multilingual + RTL

English is authoritative. Arabic, Russian and Hebrew exist to prove the layout:
longer strings, real RTL, script-appropriate typography.

- Switching language sets `document.documentElement.lang` **and** `dir`, updates
  the page title, and persists to `localStorage`.
- The layout is written with **logical properties** (`margin-inline`, `padding-inline`,
  `inset-inline`, `text-align: start`), so mirroring is structural, not cosmetic.
  Directional glyphs and hairline origins flip through `.dir-glyph` and
  `html[dir='rtl']` rules.
- Arabic + Hebrew adjust line-height, letter-spacing and line-mask padding, since
  Arabic in particular must not receive positive tracking.

### Mobile

Treated as a first-class composition, not a stacked desktop layout.

- **Re-composed, not collapsed.** The hero becomes a tall cinematic frame with the
  headline still inside the first viewport; the international feature re-crops from
  a 21:9 strip to a 4/5 portrait with the destination overlay intact; the presence
  frames become a snap-scrolling rail; trip cards keep their metadata grid and tag
  row rather than flattening into generic cards.
- **Tap targets.** Every interactive control is ≥44×44 CSS px on touch viewports
  (`≤860px`), verified at 360 / 375 / 390 / 393 / 430 / 375×667 across all four
  languages, with the mobile menu open and closed.
- **Language access.** The header switcher hides below 560px, so the mobile menu
  carries a labelled EN / AR / RU / HE switcher.
- **Focus safety.** The closed menu is `inert`, so its links leave the tab order and
  the accessibility tree instead of being merely invisible.
- **Scroll performance.** No blanket `will-change` on headline lines (that promotes
  every line to its own compositor layer), and the scrolled header drops
  `backdrop-filter` for a solid surface on small screens.
- **No horizontal overflow** at any target width, in any language.

---

## Trip inventory

Trips are dynamic by design — no permanent catalogue. Jordan features, the trip
board, the international feature and the departures list all read from structured
data in the language dictionaries, so live inventory can later be supplied from an
API without touching the markup.

The trip and price data currently in the dictionaries is **indicative sample
inventory**, not confirmed live product. It is presented that way rather than
labelled as "sample": prices read `From 680 USD / per person`, every call to action
is an enquiry (`Ask about this trip`) rather than a booking, and both inventory
sections state in the UI that trips change with season, pricing and availability.

### Reviews are not mounted

`src/components/Reviews.jsx` renders **verified customer reviews only**, and it is
deliberately not mounted in `App.jsx` because no verified reviews exist yet. The
prototype's invented testimonials were deleted from the dictionaries: keeping
fabricated quotes on the page behind a "sample content" label would still have
presented invented testimonials as genuine.

The editorial proof composition is preserved in the component, unchanged, behind a
`reviews` prop — mount it once real reviews are collected and the design needs no
further work. The `#reviews` navigation entries were removed at the same time so
there is no dead anchor.

---

## Accessibility

Semantic landmarks (`header` / `nav` / `main` / `section` / `footer`), labelled
sections, a skip link, visible focus rings, `aria-label`s on every image
placeholder, keyboard-operable menu with Escape + scroll lock, and full
`prefers-reduced-motion` support with no animation required for comprehension.
