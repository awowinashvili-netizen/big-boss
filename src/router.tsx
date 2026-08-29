import { Navigate, createBrowserRouter } from 'react-router-dom'
import { DEFAULT_LOCALE } from '@/i18n'
import Category from '@/routes/Category'
import Home from '@/routes/Home'
import NotFound from '@/routes/NotFound'
import RootLayout from '@/routes/RootLayout'

const home = `/${DEFAULT_LOCALE}`

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={home} replace /> },
  {
    path: '/:lang',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category/:slug', element: <Category /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '*', element: <Navigate to={home} replace /> },
])
