/* =========================================================================
   VALIDATION IMAGERY — temporary remote photography
   =========================================================================

   THIS IS A VISUAL-VALIDATION PASS ONLY.

   Every image below is hotlinked from the Unsplash CDN via the photo's
   `urls.raw` endpoint, which is Unsplash's intended delivery mechanism and
   carries the photographer's license. These are NOT the production assets:
   a later pass will export owned AVIF/WebP variants locally (see
   `scripts/` and the README) and swap `base` for a local path — nothing
   else in the components has to change.

   Provenance is recorded per image: source, photo page, creator and the
   creator's profile. Download and self-host any image you keep in
   production, and keep the attribution.

   The CDN is imgix-backed, so `fm=avif|webp|jpg`, `w`, `h`, `fit`, and `q`
   all work as query parameters. That is what makes the <picture>/srcset
   implementation below real rather than cosmetic.
   ========================================================================= */

const U = (base, { w, h, fm = 'jpg', q = 66, crop, rect }) => {
  const p = [`fm=${fm}`, `q=${q}`, `w=${w}`]
  if (rect) p.push(`rect=${rect}`, 'fit=crop')
  else if (h) p.push(`h=${h}`, 'fit=crop')
  else p.push('fit=max')
  if (crop) p.push(`crop=${crop}`)
  return `${base}?${p.join('&')}`
}

const qualityFor = (fm, q) => (fm === 'avif' ? q - 8 : fm === 'webp' ? q - 4 : q)

/** Builds a `srcset` string for one format, optionally at a fixed aspect. */
export const imageSrcSet = (image, widths, { fm = 'jpg', q = 66, ar = 0, crop, rect } = {}) =>
  widths
    .map((w) => {
      const h = ar && !rect ? Math.round(w / ar) : 0
      return `${U(image.base, { w, h, fm, q: qualityFor(fm, q), crop, rect })} ${w}w`
    })
    .join(', ')

export const imageSrc = (image, { w, h, fm = 'jpg', q = 66, crop, rect } = {}) =>
  U(image.base, { w, h, fm, q, crop, rect })

/* -------------------------------------------------------------------------
   Provenance + delivery configuration
   ------------------------------------------------------------------------- */

export const IMAGES = {
  hero: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/an-empty-road-leads-through-desert-mountains-at-sunset-ZkywIYKN3sI',
    photographer: 'Dennis Zhang',
    photographerUrl: 'https://unsplash.com/@windagh',
    base: 'https://images.unsplash.com/photo-1785462850546-5a104faae016',
    width: 9504,
    height: 6336,
    alt: 'An empty road leading through desert mountains at sunset',
    widths: [960, 1280, 1600, 1920, 2560],
    sizes: '100vw',
    // Art direction for mobile: a portrait slice that keeps the lit ridge and
    // the road instead of a scaled-down desktop frame. The rect is expressed in
    // source pixels — x, y, w, h — chosen from the 9504x6336 original so the
    // road's vanishing point (x≈62%) stays centred in a tall 0.40 frame.
    smWidths: [390, 480, 600, 780, 960],
    smRect: '4929,1520,1926,4816',
    smQuality: 52,
  },
  bridge: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/view-of-a-misty-valley-with-distant-lights-at-dawn-1LdvwE5hkhk',
    photographer: 'miguel garcia jimenez',
    photographerUrl: 'https://unsplash.com/@jabato4',
    base: 'https://images.unsplash.com/photo-1769365501797-2fc19df8207b',
    width: 5644,
    height: 3763,
    alt: 'A misty valley with distant lights seen through an old stone opening at dawn',
    widths: [520, 760, 1040, 1400],
    sizes: '(max-width: 700px) 92vw, (max-width: 1024px) 72vw, 41vw',
  },
  jordanPetra: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/sunlight-illuminates-a-narrow-canyon-with-towering-rock-formations-JnnOcB75lLs',
    photographer: 'Haci',
    photographerUrl: 'https://unsplash.com/@e_haci',
    base: 'https://images.unsplash.com/photo-1774793167506-f045df4e661f',
    width: 7728,
    height: 5152,
    alt: 'Sunlight between the towering rock walls of a narrow canyon',
    widths: [560, 820, 1100, 1500],
    sizes: '(max-width: 1024px) 92vw, 57vw',
  },
  jordanJerash: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-group-of-columns-with-a-sky-in-the-background-TfcLQOnwqgE',
    photographer: 'Hisham Zayadneh',
    photographerUrl: 'https://unsplash.com/@hisham_zayadneh',
    base: 'https://images.unsplash.com/photo-1671653249960-a57d2bd3eae6',
    width: 6000,
    height: 4000,
    alt: 'Roman columns against the sky',
    widths: [560, 820, 1100, 1500],
    sizes: '(max-width: 1024px) 92vw, 57vw',
  },
  jordanAqaba: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-large-body-of-water-with-mountains-in-the-background-7acyTW3WqQ4',
    photographer: 'shraga kopstein',
    photographerUrl: 'https://unsplash.com/@sfkopstein',
    base: 'https://images.unsplash.com/photo-1649195309743-b0b19c102c66',
    width: 8184,
    height: 5456,
    alt: 'A wide stretch of sea with hazy mountains behind it',
    widths: [560, 820, 1100, 1500],
    sizes: '(max-width: 1024px) 92vw, 57vw',
  },
  cappadocia: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/rock-formations-in-cappadocia-morning-fog--sKHHNMr61U',
    photographer: 'Albert Canite',
    photographerUrl: 'https://unsplash.com/@albert_canite',
    base: 'https://images.unsplash.com/photo-1789313946224-9a9c6e5bd2c7',
    width: 6389,
    height: 4259,
    alt: 'Eroded rock formations rising above a layer of morning fog',
    widths: [720, 1080, 1440, 1920],
    sizes: '92vw',
    smWidths: [480, 720, 960],
    smAr: 4 / 5,
  },
  cairo: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/mosque-of-rifai-and-sultan-hassan-cairo-pwMbtwA9LRc',
    photographer: 'Omar Elsharawy',
    photographerUrl: 'https://unsplash.com/@esh3rwy',
    base: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a',
    width: 5464,
    height: 3643,
    alt: 'Cairo rooftops around the Rifai and Sultan Hassan mosques',
    widths: [160, 320, 480],
    sizes: '(max-width: 560px) 100px, 160px',
  },
  sharm: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-group-of-boats-floating-on-top-of-a-body-of-water-lvoaF4MJ2kM',
    photographer: 'Oksana',
    photographerUrl: 'https://unsplash.com/@oksanaglry',
    base: 'https://images.unsplash.com/photo-1681158077449-77f23f629f0d',
    width: 7418,
    height: 4945,
    alt: 'Boats on clear water along a desert coast',
    widths: [160, 320, 480],
    sizes: '(max-width: 560px) 100px, 160px',
  },
  dubai: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-view-of-a-city-at-night-from-across-the-water-Q77Vxz-8FR8',
    photographer: 'Ijaz Rafi',
    photographerUrl: 'https://unsplash.com/@ijazrafi',
    base: 'https://images.unsplash.com/photo-1550779864-6ccb28702fdb',
    width: 6206,
    height: 4137,
    alt: 'A city skyline at night seen across the water',
    widths: [160, 320, 480],
    sizes: '(max-width: 560px) 100px, 160px',
  },
  antalya: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-harbor-filled-with-lots-of-boats-next-to-a-city-K6pcgoxD0yw',
    photographer: 'Ant Rozetsky',
    photographerUrl: 'https://unsplash.com/@rozetsky',
    base: 'https://images.unsplash.com/photo-1648325129746-abcc1b872380',
    width: 6000,
    height: 4000,
    alt: 'A harbour of small boats below an old town',
    widths: [160, 320, 480],
    sizes: '(max-width: 560px) 100px, 160px',
  },
  tbilisi: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-view-of-a-city-with-a-hill-in-the-background-2TUC4oWGQlI',
    photographer: 'Maria Baranova',
    photographerUrl: 'https://unsplash.com/@mariabaranova',
    base: 'https://images.unsplash.com/photo-1733087710900-7d65e44d6550',
    width: 6150,
    height: 4100,
    alt: 'A river city with a hill rising behind it',
    widths: [160, 320, 480],
    sizes: '(max-width: 560px) 100px, 160px',
  },
  baku: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/baku-azerbaijans-modern-skyline-by-the-coast-WCefbTd6FUE',
    photographer: 'Zulfugar Karimov',
    photographerUrl: 'https://unsplash.com/@zulfugarkarimov',
    base: 'https://images.unsplash.com/photo-1753706842889-ba63b4f3ccc1',
    width: 6000,
    height: 3376,
    alt: 'A modern coastal skyline of towers',
    widths: [160, 320, 480],
    sizes: '(max-width: 560px) 100px, 160px',
  },
  custom: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/misty-mountains-and-a-rocky-riverbed-at-dawn-36ZD4U97Xqk',
    photographer: 'SOHAM BANERJEE',
    photographerUrl: 'https://unsplash.com/@soham1991',
    base: 'https://images.unsplash.com/photo-1767352140744-fe76cef44795',
    width: 8256,
    height: 5504,
    alt: 'A misty valley opening towards distant peaks at dawn, with a single small figure on the riverbed',
    widths: [640, 900, 1200],
    sizes: '(max-width: 1024px) 100vw, 50vw',
  },
  trust1: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-person-stands-in-a-doorway-looking-at-sunlight-NiS2G3vRpFE',
    photographer: 'sander traa',
    photographerUrl: 'https://unsplash.com/@sandertraa',
    base: 'https://images.unsplash.com/photo-1744887075966-f2a98cecb324',
    width: 4000,
    height: 6000,
    alt: 'A person standing in a doorway, looking into the light',
    widths: [400, 620, 880],
    sizes: '(max-width: 860px) 72vw, 33vw',
  },
  trust2: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-group-of-people-walking-on-a-path-in-a-desert-IiFd8H6x7sM',
    photographer: 'Lisha Riabinina',
    photographerUrl: 'https://unsplash.com/@weekendtripcreator',
    base: 'https://images.unsplash.com/photo-1665582054996-9a0ad895d014',
    width: 4480,
    height: 6720,
    alt: 'A small group walking a ridge line in the desert',
    widths: [400, 620, 880],
    sizes: '(max-width: 860px) 72vw, 33vw',
  },
  trust3: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/a-person-with-a-backpack-walking-on-a-train-platform-zXm3UVfSH_w',
    photographer: 'Aliaksei Antropau',
    photographerUrl: 'https://unsplash.com/@aleximagine',
    base: 'https://images.unsplash.com/photo-1704477660504-39bc7e2fd086',
    width: 3457,
    height: 5185,
    alt: 'A traveller crossing a station platform in low light',
    widths: [400, 620, 880],
    sizes: '(max-width: 860px) 72vw, 33vw',
  },
  final: {
    source: 'Unsplash',
    page: 'https://unsplash.com/photos/sunset-over-a-calm-ocean-with-rocks-DaIfqJWVAUw',
    photographer: 'Antje Winkler',
    photographerUrl: 'https://unsplash.com/@antjewinkler',
    base: 'https://images.unsplash.com/photo-1770063321849-9c9d3169973f',
    width: 7008,
    height: 4672,
    alt: 'A low sun over calm water and dark rocks',
    widths: [960, 1440, 1920, 2560],
    sizes: '100vw',
  },
}

/** Lookup helpers used by the trip / destination lists. */
export const TRIP_IMAGES = {
  'jr-1': IMAGES.jordanPetra,
  'jr-2': IMAGES.jordanJerash,
  'jr-3': IMAGES.jordanAqaba,
}

/** Keyed by the last route stop, which is language-independent. */
export const DESTINATION_IMAGES = {
  cairo: IMAGES.cairo,
  sharm: IMAGES.sharm,
  dubai: IMAGES.dubai,
  antalya: IMAGES.antalya,
  tbilisi: IMAGES.tbilisi,
  baku: IMAGES.baku,
}
