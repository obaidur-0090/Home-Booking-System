import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

export function NotFoundPage() {
  return <div className="not-found"><span className="eyebrow"><span className="eyebrow-line" /> A little detour</span><h1>This page wandered<br /><em>off somewhere.</em></h1><p>Let’s get you back to something lovely.</p><Link className="button button-green" to="/">Back to home <ArrowRight size={16} /></Link></div>
}
