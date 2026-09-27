import Picture from './Picture.jsx'

/**
 * ImagePlaceholder
 * ---------------------------------------------------------------
 * The frame for final photography. Always rendered at the intended final
 * aspect ratio so image scale, crop and composition stay honest.
 *
 * Pass `image` (a record from src/data/images.js) to drop real photography
 * into the frame; `ph--photo` then retires the placeholder chrome — frame,
 * weave, ticks and label — leaving the image and the composition around it
 * completely untouched.
 *
 * Variants
 *   fill     — stretch to the parent box (full-bleed / full-height frames)
 *   overlay  — content or a scrim sits over the frame: the bottom caption
 *              row is dropped and the label clears the fixed header
 *   compact  — small frames in dense lists: keep the frame, drop the label
 */
export default function ImagePlaceholder({
  label,
  ratio = '16 / 9',
  ratioSm,
  focus,
  focusSm,
  index,
  fill = false,
  overlay = false,
  compact = false,
  note,
  className = '',
  innerRef,
  motionInner = false,
  image,
  priority = false,
  quality = 66,
}) {
  const classes = [
    'ph',
    fill && 'ph--fill',
    overlay && 'ph--overlay',
    compact && 'ph--compact',
    image && 'ph--photo',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Frame proportion and crop focus are exposed as CSS custom properties so
  // final photography can use a separate mobile crop / object-position
  // without any per-container CSS. See the CROP CONTRACT in components.css.
  const style = {}
  if (!fill) {
    style['--ph-ratio'] = ratio
    style['--ph-ratio-sm'] = ratioSm || ratio
  }
  if (focus) style['--ph-focus'] = focus
  if (focusSm) style['--ph-focus-sm'] = focusSm

  return (
    <div
      className={classes}
      style={Object.keys(style).length ? style : undefined}
      {...(image ? {} : { role: 'img', 'aria-label': label })}
      ref={innerRef}
      {...(motionInner ? { 'data-motion-inner': '' } : {})}
    >
      {image ? (
        <Picture image={image} priority={priority} quality={quality} />
      ) : (
        /* Fallback chrome for a frame with no photography yet. Never rendered
           once an image is supplied, so no placeholder or technical label can
           ever appear over real imagery. */
        <>
          <span className="ph__tick ph__tick--tl" aria-hidden="true" />
          <span className="ph__tick ph__tick--br" aria-hidden="true" />

          <div className="ph__inner">
            <div className="ph__top">
              <span className="ph__tag">{label}</span>
              {index ? <span className="ph__index num">{index}</span> : null}
            </div>
            <div className="ph__bottom">
              {note ? <span className="ph__note">{note}</span> : <span />}
              <span className="ph__ratio">
                {fill ? 'FILL' : ratio.replace(/\s/g, '')}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
