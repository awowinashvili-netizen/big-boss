import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CarDetail } from '@/components/category/CarDetail'
import { FleetStrip } from '@/components/category/FleetStrip'
import { flipHeroId } from '@/components/category/flip'
import type { Car } from '@/data/cars'
import { useScrollLock } from '@/lib/dialog'
import { Flip, gsap, prefersReducedMotion } from '@/lib/gsap'

type Detail = { car: Car; mode: 'flip' | 'instant' }

const sel = (car: Car) => `[data-flip-id="${flipHeroId(car)}"]`

/**
 * Owns the fleet strip ⇄ detail choreography:
 * - open/close is a URL search param (`?car=slug`) → back button + deep links work
 * - GSAP Flip travels the shared side-profile image between strip and detail
 * - siblings recede; the scrim fades over them; detail content staggers in
 * - `prefers-reduced-motion` → no Flip, just an instant state change
 */
export function FleetSection({
  cars,
  categoryLabel,
}: {
  cars: Car[]
  categoryLabel: string
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [detail, setDetail] = useState<Detail | null>(null)
  const [closing, setClosing] = useState(false)

  const flipStateRef = useRef<Flip.FlipState | null>(null)
  const prevDetailRef = useRef<Detail | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const urlCarSlug = searchParams.get('car')

  useScrollLock(detail !== null || closing)

  const open = useCallback(
    (car: Car) => {
      if (!prefersReducedMotion()) {
        flipStateRef.current = Flip.getState(sel(car))
      }
      setSearchParams(
        (prev) => {
          prev.set('car', car.slug)
          return prev
        },
        { preventScrollReset: true },
      )
    },
    [setSearchParams],
  )

  const requestClose = useCallback(() => {
    // Prefer popping the history entry the open pushed; fall back to replace
    // when the detail was the very first thing loaded (deep link).
    if (location.key === 'default') {
      setSearchParams(
        (prev) => {
          prev.delete('car')
          return prev
        },
        { replace: true, preventScrollReset: true },
      )
    } else {
      navigate(-1)
    }
  }, [location.key, navigate, setSearchParams])

  // URL → local state. The URL (`?car=`) is the source of truth; local state
  // mirrors it so the overlay can stay mounted for its exit animation after the
  // URL clears (back button or the close control). This is the standard
  // "animate on unmount" bridge — the same setState-in-effect that
  // AnimatePresence / react-transition-group use internally. `detail` is in the
  // deps and every branch is guarded, so it settles in one extra render.
  /* oxlint-disable react/set-state-in-effect -- intentional URL↔state bridge */
  useLayoutEffect(() => {
    const carForSlug = urlCarSlug ? cars.find((c) => c.slug === urlCarSlug) : undefined

    if (urlCarSlug && !detail) {
      if (!carForSlug) {
        setSearchParams(
          (prev) => {
            prev.delete('car')
            return prev
          },
          { replace: true, preventScrollReset: true },
        )
        return
      }
      setClosing(false)
      setDetail({ car: carForSlug, mode: flipStateRef.current ? 'flip' : 'instant' })
    } else if (!urlCarSlug && detail) {
      if (!prefersReducedMotion()) {
        flipStateRef.current = Flip.getState(sel(detail.car))
      }
      setDetail(null)
      setClosing(true)
    } else if (urlCarSlug && detail && carForSlug && carForSlug.id !== detail.car.id) {
      setDetail({ car: carForSlug, mode: 'instant' })
    }
  }, [urlCarSlug, cars, detail, setSearchParams])
  /* oxlint-enable react/set-state-in-effect */

  // Local state → animation.
  useLayoutEffect(() => {
    const prev = prevDetailRef.current
    prevDetailRef.current = detail
    const reduce = prefersReducedMotion()
    const flipState = flipStateRef.current
    flipStateRef.current = null

    const slides = () =>
      Array.from(trackRef.current?.querySelectorAll<HTMLElement>('[data-slide]') ?? [])

    // OPEN
    if (!prev && detail) {
      const others = slides().filter((el) => el.dataset.carId !== detail.car.id)
      if (reduce) {
        gsap.set('[data-detail-scrim]', { opacity: 1 })
        return
      }
      if (flipState && detail.mode === 'flip') {
        Flip.from(flipState, {
          duration: 0.62,
          ease: 'power3.inOut',
          absolute: true,
          zIndex: 9999,
        })
      }
      gsap.fromTo(
        '[data-detail-scrim]',
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' },
      )
      gsap.to(others, { opacity: 0, scale: 0.92, duration: 0.4, ease: 'power2.out' })
      gsap.from('[data-detail-reveal]', {
        y: 22,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.06,
        delay: detail.mode === 'flip' ? 0.3 : 0.05,
      })
      gsap.from('[data-rent-bar]', {
        yPercent: 100,
        duration: 0.45,
        ease: 'power3.out',
        delay: detail.mode === 'flip' ? 0.35 : 0.1,
      })
      return
    }

    // CLOSE
    if (prev && !detail) {
      const finish = () => setClosing(false)
      if (reduce) {
        gsap.set(slides(), { clearProps: 'transform,opacity' })
        finish()
        return
      }
      if (flipState) {
        Flip.from(flipState, {
          duration: 0.55,
          ease: 'power3.inOut',
          absolute: true,
          zIndex: 9999,
          onComplete: finish,
        })
      } else {
        finish()
      }
      gsap.to('[data-detail-scrim]', { opacity: 0, duration: 0.4, ease: 'power2.in' })
      gsap.to(slides(), {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      })
    }
  }, [detail])

  useLayoutEffect(() => {
    return () => {
      gsap.killTweensOf([
        '[data-slide]',
        '[data-detail-scrim]',
        '[data-detail-reveal]',
        '[data-rent-bar]',
      ])
    }
  }, [])

  return (
    <>
      <FleetStrip
        cars={cars}
        label={categoryLabel}
        activeCarId={detail?.car.id ?? null}
        trackRef={trackRef}
        onSelect={open}
      />

      {(detail || closing) && (
        <div
          data-detail-scrim
          aria-hidden="true"
          className="fixed inset-0 z-[290] bg-bg"
        />
      )}

      {detail && <CarDetail car={detail.car} onClose={requestClose} />}
    </>
  )
}
