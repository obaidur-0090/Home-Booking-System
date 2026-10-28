import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../auth/useAuth'
import { DashboardPage } from './DashboardPage'

export function RequireAuth() {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="page-loading"><span className="loading-spinner" /><p>Making everything ready…</p></div>
  if (!user) return <Navigate to="/login" state={{ returnTo: location.pathname }} replace />
  return <DashboardPage />
}
