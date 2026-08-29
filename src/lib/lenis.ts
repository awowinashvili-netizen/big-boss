import { createContext, useContext, type RefObject } from 'react'
import type Lenis from 'lenis'

/** Stable ref to the Lenis instance. `.current` is `null` until it initialises,
 *  and stays `null` under `prefers-reduced-motion`. Read `.current` inside
 *  effects or event handlers, never during render. */
export const LenisContext = createContext<RefObject<Lenis | null>>({ current: null })

export function useLenis(): RefObject<Lenis | null> {
  return useContext(LenisContext)
}
