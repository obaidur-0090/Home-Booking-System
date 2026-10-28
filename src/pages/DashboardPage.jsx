import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { ArrowRight, CalendarDays, Clock3, Heart, MapPin, Sparkles } from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { formatPrice, services } from '../data'
import { imageFallback } from '../components/shared/constants'
import { cancelBooking as cancelFirebaseBooking, getBookings } from '../features/bookings/bookingService'

export function DashboardPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(true)

  useEffect(() => {
    let active = true
    getBookings(user.uid)
      .then((savedBookings) => {
        if (active) setBookings(savedBookings)
      })
      .catch((error) => {
        console.error('Unable to load Firebase bookings:', error)
        toast.error(error.code === 'permission-denied'
          ? 'Your bookings are unavailable. Check that Firestore rules are deployed.'
          : 'Unable to load your bookings. Please refresh and try again.')
      })
      .finally(() => {
        if (active) setBookingsLoading(false)
      })

    return () => {
      active = false
    }
  }, [user.uid])

  const handleCancelBooking = async (id) => {
    const updatedBookings = bookings.map((booking) => booking.id === id ? { ...booking, status: 'Cancelled' } : booking)
    try {
      await cancelFirebaseBooking(id)
      setBookings(updatedBookings)
      toast.success('Your booking request has been cancelled.')
    } catch (error) {
      toast.error(error.code === 'permission-denied'
        ? 'You don’t have permission to update this booking.'
        : 'We couldn’t update this booking. Please try again.')
      console.error('Unable to cancel Firebase booking:', error)
    }
  }

  const sortedBookings = [...bookings].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="page-container dashboard-page">
      <div className="dashboard-welcome"><div><span className="eyebrow"><span className="eyebrow-line" /> Your little corner</span><h1>Good to see you, <em>{user.displayName?.split(' ')[0] || 'friend'}.</em></h1><p>Here’s where all your lovely plans live.</p></div><Link className="button button-green" to="/services">Plan something new <ArrowRight size={16} /></Link></div>
      <div className="dashboard-stats"><div><span><CalendarDays size={18} /></span><strong>{bookings.length}</strong><small>Booking requests</small></div><div><span><Clock3 size={18} /></span><strong>{bookings.filter((booking) => booking.status !== 'Cancelled').length}</strong><small>Active plans</small></div><div><span><Heart size={18} /></span><strong>{user.displayName?.split(' ')[0] || 'You'}</strong><small>StyleDecor member</small></div></div>
      <div className="dashboard-section-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> Your plans</span><h2>Booking <em>requests.</em></h2></div><span className="dashboard-count">{bookings.length} total</span></div>
      {bookingsLoading ? <div className="page-loading"><span className="loading-spinner" /><p>Loading your bookings…</p></div> : sortedBookings.length ? <div className="booking-list">{sortedBookings.map((booking) => {
        const service = services.find((item) => item.id === booking.serviceId)
        const isCancelled = booking.status === 'Cancelled'
        return <article className="booking-row" key={booking.id}>
          <img src={service?.image || imageFallback} alt="" />
          <div className="booking-info"><span className="booking-status"><span className={isCancelled ? 'status-dot status-dot-muted' : 'status-dot'} />{booking.status}</span><h3>{booking.serviceName}</h3><p><CalendarDays size={14} /> {new Date(`${booking.date}T12:00:00`).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' })}<span>·</span><MapPin size={14} /> {booking.location}</p><small>{booking.mode}</small></div>
          <div className="booking-price"><strong>{formatPrice(booking.price)}</strong>{!isCancelled && <button onClick={() => handleCancelBooking(booking.id)}>Cancel request</button>}</div>
        </article>
      })}</div> : <div className="empty-state dashboard-empty"><CalendarDays size={28} /><h3>No plans on the calendar yet</h3><p>Pick something you love and we’ll help make it happen.</p><Link className="button button-green" to="/services">Browse services <ArrowRight size={16} /></Link></div>}
      <div className="dashboard-help"><span><Sparkles size={18} /></span><p><strong>A question about your plans?</strong><br />Our team is just a note away.</p><a href="mailto:hello@styledecor.com">Say hello <ArrowRight size={15} /></a></div>
    </div>
  )
}
