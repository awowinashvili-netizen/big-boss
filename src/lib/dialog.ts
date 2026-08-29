import { useEffect, useRef, type RefObject } from 'react'
import { useLenis } from '@/lib/lenis'

/** Lock page scroll while `active` — stops Lenis and pins <body>. */
export function useScrollLock(active: boolean) {
  const lenisRef = useLenis()
  useEffect(() => {
    if (!active) return
    const lenis = lenisRef.current
    const { body } = document
    const prev = body.style.overflow
    body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      body.style.overflow = prev
      lenis?.start()
    }
  }, [active, lenisRef])
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Trap focus inside `ref` while `active`. On activate, focus moves to the first
 * focusable (or the container); on deactivate, focus returns to whatever held
 * it before. Escape calls `onEscape`.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  { active, onEscape }: { active: boolean; onEscape: () => void },
) {
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return
    const container = ref.current
    if (!container) return

    restoreRef.current = document.activeElement as HTMLElement | null

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )

    const first = focusables()[0]
    ;(first ?? container).focus({ preventScroll: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onEscape()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      const activeEl = document.activeElement
      if (e.shiftKey && (activeEl === firstEl || activeEl === container)) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && activeEl === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      restoreRef.current?.focus?.({ preventScroll: true })
    }
  }, [active, ref, onEscape])
}
