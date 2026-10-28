import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { AuthShell, GoogleMark } from '../components/features/auth/AuthShell'
import { authErrorMessage } from '../features/auth/authErrors'

export function LoginPage() {
  const { user, login, loginWithGoogle, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const returnTo = location.state?.returnTo || '/dashboard'

  if (user) return <Navigate to={returnTo} replace />

  const submitLogin = async (event) => {
    event.preventDefault()
    setBusy(true)
    const formData = new FormData(event.currentTarget)
    try {
      await login(formData.get('email'), formData.get('password'))
      toast.success('Welcome back.')
      navigate(returnTo, { replace: true })
    } catch (error) {
      toast.error(authErrorMessage(error))
    } finally {
      setBusy(false)
    }
  }

  const submitGoogle = async () => {
    setBusy(true)
    try {
      await loginWithGoogle()
      toast.success('Welcome to StyleDecor.')
      navigate(returnTo, { replace: true })
    } catch (error) {
      toast.error(authErrorMessage(error))
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell>
      <div className="auth-heading"><span className="eyebrow"><span className="eyebrow-line" /> Lovely to see you again</span><h1>Welcome <em>back.</em></h1><p>Sign in to pick up where your good idea left off.</p></div>
      <form className="auth-form" onSubmit={submitLogin}>
        <label>Email address<span className="input-wrap"><Mail size={17} /><input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></span></label>
        <label>Password<span className="input-wrap"><LockKeyhole size={17} /><input name="password" type={showPassword ? 'text' : 'password'} placeholder="Your password" autoComplete="current-password" minLength="6" required /><button className="show-password" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></span></label>
        <button className="button button-green auth-submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <ArrowRight size={16} /></button>
      </form>
      <div className="auth-divider"><span />or<span /></div>
      <button className="google-button" onClick={submitGoogle} disabled={busy}><GoogleMark /> Continue with Google</button>
      {!isFirebaseConfigured && <p className="alert alert-warning setup-notice">Add your Firebase settings to <code>.env</code> to enable sign in.</p>}
      <p className="auth-switch">New to StyleDecor? <Link to="/register" state={location.state}>Create an account</Link></p>
    </AuthShell>
  )
}
