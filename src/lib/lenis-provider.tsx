import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger, gsap, prefersReducedMotion } from '@/lib/gsap'
import { LenisContext } from '@/lib/lenis'

export function LenisProvider({ children }: { children: ReactNode }) {
  const ref = useRef<Lenis | null>(null)

  useEffect(() => {
    // Reduced motion → no smooth-scroll engine at all; native scrolling only.
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh()
      return
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    ref.current = instance

    // Drive Lenis from GSAP's ticker and keep ScrollTrigger in lockstep.
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Re-measure once fonts settle (layout shifts as webfonts swap in).
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      gsap.ticker.remove(tick)
      instance.destroy()
      ref.current = null
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return <LenisContext.Provider value={ref}>{children}</LenisContext.Provider>
}
