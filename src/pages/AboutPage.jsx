import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { decorators } from '../data'

export function AboutPage() {
  return (
    <div className="about-page">
      <div className="page-container about-hero">
        <div><span className="eyebrow"><span className="eyebrow-line" /> The people behind the feeling</span><h1>We make room<br />for <em>meaning.</em></h1><p>StyleDecor started with a simple thought: the spaces and celebrations we share should feel like us. Now we help people across Dhaka turn that thought into something real.</p><Link className="button button-green" to="/services">Find your service <ArrowRight size={16} /></Link></div>
        <img src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1000&q=85" alt="Sunlit, warm neutral home interior" />
      </div>
      <div className="about-values">
        <div className="page-container values-grid">
          <div><span className="eyebrow"><span className="eyebrow-line" /> What we believe</span><h2>Good spaces<br />feel like <em>you.</em></h2></div>
          <p>We listen before we sketch. We care about where a piece came from and how a room will feel on an ordinary Tuesday. And we believe that the best celebrations leave room for the people who make them matter.</p>
        </div>
      </div>
      <section className="page-container team-section"><span className="eyebrow"><span className="eyebrow-line" /> A thoughtful little team</span><h2>Good people.<br /><em>Good instincts.</em></h2><div className="decorator-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{decorators.map((decorator) => <article className="decorator-card" key={decorator.name}><div className="decorator-photo"><img src={decorator.image} alt={decorator.name} /></div><h3>{decorator.name}</h3><p>{decorator.role}</p><span className="specialty">{decorator.specialty}</span></article>)}</div></section>
    </div>
  )
}
