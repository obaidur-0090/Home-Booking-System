import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { ArrowRight, CheckCircle2, Heart, LockKeyhole, Star, ShieldCheck, UsersRound, X } from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { formatPrice, services } from '../data'
import { imageFallback } from '../components/shared/constants'
import { createBooking } from '../features/bookings/bookingService'
import { NotFoundPage } from './NotFoundPage'

export function ServiceDetailPage() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!service) return <NotFoundPage />

  const submitBooking = async (event) => {
    event.preventDefault()
    if (!user) {
      navigate('/login', { state: { returnTo: `/services/${service.id}` } })
      return
    }
    setSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const booking = {
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      date: formData.get('date'),
      location: formData.get('location'),
      mode: formData.get('mode'),
      status: 'Request received',
    }
    try {
      await createBooking(user.uid, booking)
      toast.success('Your booking request is in. We’ll be in touch soon.')
      setBookingOpen(false)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.code === 'permission-denied'
        ? 'We couldn’t save your booking. Check that Firestore rules are deployed.'
        : 'We couldn’t save your booking. Please try again.')
      console.error('Unable to save booking to Firebase:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="page-container detail-page">
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><span>{service.name}</span></div>
        <div className="detail-grid grid grid-cols-1 md:grid-cols-2">
          <div className="detail-image"><img src={service.image} alt={service.name} onError={(event) => { event.currentTarget.src = imageFallback }} /><span className="service-tag">{service.category}</span></div>
          <div className="detail-copy">
            <span className="eyebrow"><span className="eyebrow-line" /> Thoughtfully made for you</span>
            <h1>{service.name}</h1>
            <div className="detail-rating"><span><Star size={15} fill="currentColor" /> {service.rating}</span><span>·</span><span>{service.duration}</span></div>
            <p>{service.description}</p>
            <div className="detail-price"><span>Packages from</span><strong>{formatPrice(service.price)}</strong><small>{service.unit}</small></div>
            <div className="detail-includes"><h3>A little of what’s included</h3>{service.includes.map((item) => <p key={item}><CheckCircle2 size={16} /> {item}</p>)}</div>
            <button className="button button-green detail-book-button w-full sm:w-auto" onClick={() => user ? setBookingOpen(true) : navigate('/login', { state: { returnTo: `/services/${service.id}` } })}>Book this service <ArrowRight size={17} /></button>
            {!user && <span className="detail-login-note"><LockKeyhole size={13} /> Sign in to request a booking</span>}
          </div>
        </div>
        <div className="detail-reassurance"><span><ShieldCheck size={18} /> Secure booking requests</span><span><UsersRound size={18} /> A real team, here to help</span><span><Heart size={18} /> Personal, not cookie-cutter</span></div>
      </div>
      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false) }}>
          <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button className="modal-close icon-button" onClick={() => setBookingOpen(false)} aria-label="Close booking form"><X size={20} /></button>
            <span className="eyebrow"><span className="eyebrow-line" /> Start with a little hello</span>
            <h2 id="booking-title">Request your<br /><em>{service.name}.</em></h2>
            <p className="modal-user"><span className="avatar">{(user.displayName || user.email).charAt(0).toUpperCase()}</span>{user.displayName || user.email}<span>{user.email}</span></p>
            <form className="booking-form" onSubmit={submitBooking}>
              <label>Preferred date<input className="input input-bordered w-full" type="date" name="date" min={new Date().toISOString().slice(0, 10)} required /></label>
              <label>Location<input className="input input-bordered w-full" type="text" name="location" placeholder="Area, city or venue" required maxLength={120} /></label>
              <label>Service mode<select className="select select-bordered w-full" name="mode" defaultValue="On-site service"><option>On-site service</option><option>In-studio consultation</option></select></label>
              <button className="button button-green btn btn-success w-full" type="submit" disabled={submitting}>{submitting ? 'Sending request…' : 'Send booking request'} <ArrowRight size={16} /></button>
              <span className="form-disclaimer">This is a request, not a confirmed appointment. Our team will contact you to finalize the details.</span>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
