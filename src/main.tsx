import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { LenisProvider } from '@/lib/lenis-provider'
import { ThemeProvider } from '@/lib/theme-provider'
import { router } from '@/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </ThemeProvider>
  </StrictMode>,
)
