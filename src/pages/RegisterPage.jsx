import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ArrowRight, LockKeyhole, Mail, UsersRound } from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { AuthShell, GoogleMark } from '../components/features/auth/AuthShell'
import { authErrorMessage } from '../features/auth/authErrors'

export function RegisterPage() {
  const { user, register, loginWithGoogle, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [busy, setBusy] = useState(false)
  const returnTo = location.state?.returnTo || '/dashboard'
  if (user) return <Navigate to={returnTo} replace />

  const submitRegister = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (formData.get('password') !== formData.get('confirmPassword')) {
      toast.error('Those passwords don’t match yet.')
      return
    }
    setBusy(true)
    try {
      await register(formData.get('name'), formData.get('email'), formData.get('password'))
      toast.success('Your account is ready. Welcome in!')
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
      toast.success('Your account is ready. Welcome in!')
      navigate(returnTo, { replace: true })
    } catch (error) {
      toast.error(authErrorMessage(error))
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell>
      <div className="auth-heading"><span className="eyebrow"><span className="eyebrow-line" /> A lovely place to start</span><h1>Make it <em>yours.</em></h1><p>Create an account to plan your next good thing.</p></div>
      <form className="auth-form" onSubmit={submitRegister}>
        <label>Your name<span className="input-wrap"><UsersRound size={17} /><input name="name" type="text" placeholder="How should we call you?" autoComplete="name" maxLength="80" required /></span></label>
        <label>Email address<span className="input-wrap"><Mail size={17} /><input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></span></label>
        <label>Password<span className="input-wrap"><LockKeyhole size={17} /><input name="password" type="password" placeholder="At least 6 characters" autoComplete="new-password" minLength="6" required /></span></label>
        <label>Confirm password<span className="input-wrap"><LockKeyhole size={17} /><input name="confirmPassword" type="password" placeholder="Type it one more time" autoComplete="new-password" minLength="6" required /></span></label>
        <button className="button button-green auth-submit" disabled={busy}>{busy ? 'Creating account…' : 'Create my account'} <ArrowRight size={16} /></button>
      </form>
      <div className="auth-divider"><span />or<span /></div>
      <button className="google-button" onClick={submitGoogle} disabled={busy}><GoogleMark /> Continue with Google</button>
      {!isFirebaseConfigured && <p className="alert alert-warning setup-notice">Add your Firebase settings to <code>.env</code> to enable sign up.</p>}
      <p className="auth-switch">Already have an account? <Link to="/login" state={location.state}>Sign in</Link></p>
    </AuthShell>
  )
}
