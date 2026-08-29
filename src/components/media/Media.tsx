import { useState } from 'react'
import { Placeholder } from './Placeholder'

type MediaProps = {
  /** Image path. Empty / null / undefined → the designed placeholder. */
  src?: string | null
  /** Real alt text (from i18n). Pass '' only for a purely decorative slot. */
  alt: string
  /** Aspect ratio as a CSS value, e.g. "4 / 5". Omit when `fill` is used. */
  ratio?: string
  /** Fill the (positioned, sized) parent instead of holding an aspect box. */
  fill?: boolean
  /** Eager-load + high fetch priority — use for the LCP image only. */
  priority?: boolean
  /** Classes for the wrapper. */
  className?: string
  /** Classes for the <img> / placeholder surface. */
  mediaClassName?: string
}

/**
 * Every content image goes through this. A missing path — or an image that
 * fails to load — renders <Placeholder>, so the page is always complete.
 */
export function Media({
  src,
  alt,
  ratio,
  fill = false,
  priority = false,
  className = '',
  mediaClassName = '',
}: MediaProps) {
  // Track the src that failed rather than a bare boolean, so a new src
  // automatically gets another chance — no reset effect needed.
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  const showImg = Boolean(src) && failedSrc !== src
  const wrapper = fill
    ? `relative size-full overflow-hidden ${className}`
    : `relative overflow-hidden ${className}`
  const style = fill ? undefined : { aspectRatio: ratio ?? '1 / 1' }
  const surface = `absolute inset-0 size-full ${mediaClassName}`

  return (
    <div className={wrapper} style={style}>
      {showImg ? (
        <img
          src={src as string}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailedSrc(src ?? null)}
          className={`${surface} object-cover`}
        />
      ) : (
        <Placeholder className={surface} />
      )}
    </div>
  )
}
