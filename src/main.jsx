import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './auth/AuthProvider'
import {
  AboutPage,
  CoveragePage,
  HomePage,
  Layout,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  RequireAuth,
  ServiceDetailPage,
  ServicesPage,
} from './App'
import './App.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:serviceId', element: <ServiceDetailPage /> },
      { path: 'coverage', element: <CoveragePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'dashboard', element: <RequireAuth /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={3600} newestOnTop closeOnClick pauseOnFocusLoss />
    </AuthProvider>
  </StrictMode>,
)
