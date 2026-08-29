import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { ScrollTrigger } from '@/lib/gsap'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { DEFAULT_LOCALE, isLocale } from '@/i18n'
import { useI18n } from '@/lib/i18n'
import { useLenis } from '@/lib/lenis'
import { LocaleProvider } from '@/lib/locale-provider'

function SkipLink() {
  const { t } = useI18n()
  return (
    <a href="#main" className="skip-link">
      {t.nav.skip}
    </a>
  )
}

function Shell() {
  const location = useLocation()
  const lenisRef = useLenis()

  // New route → jump to top, then let ScrollTrigger re-measure the new layout.
  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname, lenisRef])

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="min-h-[60vh] pt-header md:pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function RootLayout() {
  const { lang } = useParams()

  if (!isLocale(lang)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />
  }

  return (
    <LocaleProvider locale={lang}>
      <Shell />
    </LocaleProvider>
  )
}
