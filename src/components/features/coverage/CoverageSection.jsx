import { lazy, Suspense } from 'react'
import { Link } from 'react-router'
import { ArrowRight, MapPin } from 'lucide-react'

const CoverageMap = lazy(() => import('../../../CoverageMap'))

export function CoverageSection({ standalone = false }) {
  return (
    <section className={`coverage-section ${standalone ? 'coverage-section-standalone' : ''}`} id="coverage">
      <div className="page-container coverage-grid">
        <div className="coverage-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> {standalone ? 'Service areas' : 'Close to home'}</span>
          <h2>{standalone ? <>Thoughtful design,<br /><em>around Dhaka.</em></> : <>Lovely things,<br /><em>around Dhaka.</em></>}</h2>
          <p>{standalone ? 'Our studio is in Gulshan, and our team offers in-home consultations and on-site styling throughout Dhaka.' : 'Our team brings the good ideas to you. We currently offer in-home consultations and on-site styling across Dhaka.'}</p>
          <div className="coverage-address"><span><MapPin size={18} /></span><div><strong>Our studio</strong><p>Gulshan Avenue, Dhaka 1212</p></div></div>
          <Link className="text-link" to="/coverage">Explore service coverage <ArrowRight size={16} /></Link>
        </div>
        <div className="map-frame">
          <Suspense fallback={<div className="map-loading">Loading coverage map…</div>}><CoverageMap /></Suspense>
          <div className="map-label"><span className="map-pulse" /><span><strong>Dhaka, Bangladesh</strong><small>Currently welcoming bookings</small></span></div>
        </div>
      </div>
    </section>
  )
}
