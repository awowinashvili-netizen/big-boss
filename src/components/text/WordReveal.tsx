import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

type WordRevealProps = {
  /** The full string. Rendered intact for screen readers and for no-JS. */
  text: string
  className?: string
  /** Seconds before the reveal starts (lets a parent timeline lead). */
  delay?: number
  stagger?: number
  duration?: number
}

/**
 * Reveals a heading word by word with a small GSAP stagger.
 *
 * - The unsplit `text` is always in the DOM as the accessible name; the split
 *   words are `aria-hidden`, so a screen reader hears one clean phrase.
 * - No `opacity: 0` / transforms live in CSS — with JS disabled the words are
 *   simply visible. GSAP only ever animates *from* an offset back to rest.
 * - Under `prefers-reduced-motion` nothing runs: the final state is the
 *   natural state, shown immediately.
 *
 * Render inside the heading element, e.g. `<h1><WordReveal text={...} /></h1>`.
 */
export function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.06,
  duration = 0.8,
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const words = el.querySelectorAll<HTMLElement>('[data-word]')
    if (words.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 110,
        opacity: 0,
        duration,
        ease: 'power4.out',
        stagger,
        delay,
      })
    }, el)
    return () => ctx.revert()
  }, [text, delay, stagger, duration])

  const tokens = text.split(/(\s+)/)

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map((tok, i) =>
          /^\s+$/.test(tok) ? (
            <span key={i}> </span>
          ) : (
            <span
              key={i}
              className="inline-block overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom"
            >
              <span data-word className="inline-block">
                {tok}
              </span>
            </span>
          ),
        )}
      </span>
    </span>
  )
}
