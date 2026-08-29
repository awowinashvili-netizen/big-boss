import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import IconClose from '~icons/solar/close-square-linear'
import { useI18n } from '@/lib/i18n'
import { useLenis } from '@/lib/lenis'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import { SocialLinks } from './SocialLinks'
import { ThemeToggle } from './ThemeToggle'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  const lenisRef = useLenis()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  // Scroll lock + focus handoff while open.
  useEffect(() => {
    if (!open) return
    const lenis = lenisRef.current
    restoreRef.current = document.activeElement as HTMLElement | null
    const { body } = document
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    lenis?.stop()
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0)

    return () => {
      window.clearTimeout(id)
      body.style.overflow = prevOverflow
      lenis?.start()
      restoreRef.current?.focus?.()
    }
  }, [open, lenisRef])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab' || !panelRef.current) return
    const nodes = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((n) => n.offsetParent !== null)
    if (nodes.length === 0) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // Portalled to <body>: the header sets `backdrop-filter`, which would make it
  // the containing block for a position:fixed child and trap this overlay.
  return createPortal(
    <div
      id="mobile-nav"
      className="fixed inset-0 z-[200] md:hidden"
      inert={!open}
      aria-hidden={!open}
      onKeyDown={onKeyDown}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label={t.nav.close}
        onClick={onClose}
        tabIndex={-1}
        className={`absolute inset-0 bg-overlay transition-opacity duration-[var(--dur-base)] ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        className={`absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col overflow-y-auto border-l border-line bg-surface transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-[var(--spacing-gutter)] py-3">
          <Logo onNavigate={onClose} />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t.nav.close}
            className="inline-grid size-11 place-items-center rounded-sm border border-transparent text-muted transition-colors hover:border-line hover:text-fg"
          >
            <IconClose className="size-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-8 px-[var(--spacing-gutter)] py-8">
          <NavLinks variant="stack" onNavigate={onClose} />

          <LanguageSwitcher variant="stack" />

          <div className="flex items-center justify-between border-t border-line pt-6">
            <span className="eyebrow">{t.theme.label}</span>
            <ThemeToggle />
          </div>

          <div className="mt-auto border-t border-line pt-6">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
