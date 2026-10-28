import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ArrowRight, ArrowUpRight, ChevronDown, Flower2, Menu, Sparkles, X } from 'lucide-react'
import { useAuth } from '../../auth/useAuth'

export function Navigation() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('You have been signed out.')
      setProfileOpen(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Unable to sign out. Please try again.')
    }
  }

  return (
    <header className="site-header">
      <div className="announcement">
        <span><Sparkles size={14} /> Thoughtful spaces, beautifully celebrated</span>
        <a href="tel:+8801700000000">Plan something lovely <ArrowUpRight size={14} /></a>
      </div>
      <nav className="navbar page-container">
        <Link className="brand" to="/" aria-label="StyleDecor home">
          <span className="brand-mark"><Flower2 size={22} strokeWidth={1.8} /></span>
          <span>style<span className="brand-accent">decor</span><small>spaces made meaningful</small></span>
        </Link>
        <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div className={`nav-content ${menuOpen ? 'nav-content-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
          <div className="nav-actions">
            {user ? (
              <>
                <Link className="dashboard-link" to="/dashboard">My bookings</Link>
                <div className="profile-wrap">
                  <button className="profile-button" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen}>
                    <span className="avatar">{(user.displayName || user.email || 'S').charAt(0).toUpperCase()}</span>
                    <span className="profile-name">{user.displayName?.split(' ')[0] || 'My account'}</span>
                    <ChevronDown size={15} />
                  </button>
                  {profileOpen && (
                    <div className="profile-menu">
                      <p className="profile-email">{user.email}</p>
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)}>Booking dashboard</Link>
                      <button onClick={handleLogout}>Sign out</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link className="login-link" to="/login">Log in</Link>
                <Link className="button button-dark nav-cta" to="/services">Explore services <ArrowRight size={15} /></Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
