import { ArrowRight, MapPin } from 'lucide-react'
import { CoverageSection } from '../components/features/coverage/CoverageSection'

export function CoveragePage() {
  return <><div className="page-container page-section"><div className="page-intro"><span className="eyebrow"><span className="eyebrow-line" /> We bring the lovely to you</span><h1>Our service<br /><em>neighborhood.</em></h1><p>We’re based in Gulshan and currently offer in-home consultations and on-site decoration across Dhaka.</p></div></div><CoverageSection standalone /><div className="page-container coverage-callout"><MapPin size={19} /><span>Outside these areas? <strong>Tell us where you are.</strong> We may still be able to help.</span><a className="text-link" href="mailto:hello@styledecor.com">Get in touch <ArrowRight size={15} /></a></div></>
}
