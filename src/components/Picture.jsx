import { imageSrc, imageSrcSet } from '../data/images.js'

/**
 * Picture
 * ------------------------------------------------------------------
 * The single responsive-image renderer for the whole site.
 *
 * - AVIF first (primary), WebP second (fallback), JPEG as the last resort.
 * - Responsive srcset + sizes so the browser downloads an appropriately
 *   sized file; mobile never receives a desktop-weight asset.
 * - Optional art direction: `smWidths` + `smAr` emit a `(max-width: 700px)`
 *   source set cropped to a different aspect (a genuinely different mobile
 *   crop, not just a smaller desktop crop).
 * - `priority` is for the above-the-fold hero only: eager + high fetch
 *   priority + sync decode. Everything else lazy-loads and decodes async.
 * - `width`/`height` carry the source's intrinsic ratio; every frame also
 *   has a CSS `aspect-ratio`, so there is no layout shift either way.
 */
export default function Picture({
  image,
  quality = 66,
  priority = false,
  className = 'ph__img',
  alt,
}) {
  if (!image) return null

  const {
    base,
    widths = [],
    sizes = '100vw',
    smWidths,
    smAr,
    smRect,
    smQuality,
    crop,
    width,
    height,
  } = image

  const fallbackWidth = widths[Math.min(1, widths.length - 1)] || widths[0]
  const src = imageSrc(image, { w: fallbackWidth, q: quality })

  const eager = priority
    ? { loading: 'eager', decoding: 'sync', fetchpriority: 'high' }
    : { loading: 'lazy', decoding: 'async' }

  const artDirected = Boolean(smWidths?.length && (smAr || smRect))
  const smQ = smQuality ?? quality
  const smOpts = { q: smQ, ar: smAr, rect: smRect, crop }

  return (
    <picture>
      {artDirected ? (
        <>
          <source
            media="(max-width: 700px)"
            type="image/avif"
            srcSet={imageSrcSet(image, smWidths, { ...smOpts, fm: 'avif' })}
            sizes={sizes}
          />
          <source
            media="(max-width: 700px)"
            type="image/webp"
            srcSet={imageSrcSet(image, smWidths, { ...smOpts, fm: 'webp' })}
            sizes={sizes}
          />
        </>
      ) : null}

      <source
        type="image/avif"
        srcSet={imageSrcSet(image, widths, { fm: 'avif', q: quality, crop })}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={imageSrcSet(image, widths, { fm: 'webp', q: quality, crop })}
        sizes={sizes}
      />

      <img
        className={className}
        src={src}
        srcSet={imageSrcSet(image, widths, { fm: 'jpg', q: quality, crop })}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt ?? image.alt ?? ''}
        {...eager}
      />
    </picture>
  )
}
