# Travelshop

The Travelshop homepage. Travelshop is a travel company based in Amman, Jordan,
serving two equally important directions: travellers coming **into** Jordan, and
people already in Jordan heading **out** internationally. Alongside ready-made
trips, the business builds custom itineraries, and stays involved while the trip
is actually running.

**Point anywhere. We'll take you there.**

---

## Stack

React 18 · Vite 5 · GSAP 3 (ScrollTrigger) · plain CSS with a design-token
system. No UI framework, no component library, no CSS-in-JS.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build to /dist
npm run preview    # serve the production build
```

No environment variables are required. There are no API keys or secrets.

---

## Structure

```
index.html               document head: fonts, hero preload, SEO and social meta
public/                  favicon, apple-touch-icon, web manifest, robots, og-image
src/
  App.jsx                homepage sequence and section order
  main.jsx               entry; enables motion only when the visitor allows it
  components/
    Header.jsx  MobileMenu.jsx  LanguageSwitcher.jsx  Wordmark.jsx
    Hero.jsx  BridgeSection.jsx
    JordanTrips.jsx  TripFeature.jsx  TripMetadata.jsx
    InternationalTrips.jsx  CustomTripSection.jsx
    TrustSection.jsx  Reviews.jsx  FinalCTA.jsx  Footer.jsx
    Picture.jsx  ImagePlaceholder.jsx  RouteLine.jsx  SectionIntro.jsx
  data/images.js         image provenance + delivery configuration
  i18n/                  en.js ar.js ru.js he.js + I18nContext.jsx
  hooks/                 useCinematicScroll.js  useHeaderState.js
  lib/                   gsap.js  motion.js  links.js
  styles/                tokens.css base.css layout.css components.css sections.css
docs/image-provenance.md attribution for every photograph
```

---

## Languages

English, Arabic, Russian and Hebrew, switchable at runtime from the header and
the mobile menu. Switching language sets `document.documentElement.lang` **and**
`dir` (`ar`/`he` are RTL), updates the page title, and persists to
`localStorage`.

The layout uses logical properties throughout, so RTL mirrors the composition
rather than only the text alignment. Typography is set per script:

| Script | Display | Notes |
| --- | --- | --- |
| Latin + Cyrillic | **Unbounded** | drawn Cyrillic-first, so EN and RU share one voice |
| Arabic | **Alexandria** | contemporary, neutral pan-Arab MSA |
| Hebrew | **Rubik** | geometric, modern |
| UI / metadata | **Archivo** + **Onest** for Cyrillic | calmer than the display face |

Line height, tracking and the reveal-mask padding are tuned per script in
`src/styles/tokens.css`.

---

## Content and inventory

**Trips are dynamic by design.** Jordan features, the trip board, the
international feature and the departures list all read from structured data in
the language dictionaries, so live inventory can be supplied from an API later
without touching the markup.

The trip and price data currently in the dictionaries is **indicative sample
inventory, not confirmed live product**. This is signalled in the experience
rather than labelled: prices read `From 680 USD / per person`, every call to
action is an enquiry (`Ask about this trip`) rather than a booking, and both
inventory sections state that trips change with season, pricing and
availability. No live availability, flight routing or confirmed fare is
asserted anywhere.

**Reviews are deliberately not mounted.** `src/components/Reviews.jsx` renders
verified customer reviews only and is not included in `App.jsx`, because none
exist yet. It is preserved behind a `reviews` prop: mount it with real reviews
and the design needs no further work.

---

## Imagery

Photography is currently delivered from the Unsplash CDN through the responsive
`<picture>` pipeline in `src/components/Picture.jsx`:

- **AVIF primary, WebP fallback, JPEG last resort**
- responsive `srcset` with per-slot `sizes`
- art-directed mobile crops (a real 3:4 hero crop, a 4:5 international feature)
- stable `aspect-ratio` on every frame, so there is no layout shift
- lazy loading below the fold; the hero is eager, `fetchpriority="high"` and preloaded
- `ph--photo` retires the placeholder chrome once an image is supplied

Full attribution, photo pages and the reasoning behind each choice are in
[`docs/image-provenance.md`](docs/image-provenance.md). Replace `base` in
`src/data/images.js` with locally hosted variants and nothing else needs to
change.

---

## Deployment

The build is a static bundle: deploy `/dist` to any static host. Two things to
confirm on the live domain:

1. The canonical, Open Graph and Twitter URLs in `index.html` currently point at
   `https://travelshop-jordan.com/`. Update them if the site is served from a
   different origin.
2. `public/og-image.png` is a typographic brand card owned by this project. Swap
   in owned photography if you prefer.

---

## Accessibility

Semantic landmarks and a labelled heading hierarchy, a skip link, visible focus
rings, `aria-label`s on every image, a keyboard-operable mobile menu that is
`inert` when closed, language and direction attributes kept in sync, and full
`prefers-reduced-motion` support: the page is complete and readable with all
motion disabled, or with no JavaScript at all.
