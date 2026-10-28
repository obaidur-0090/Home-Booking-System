import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Check, CheckCircle2, Heart, Leaf, ShieldCheck, Star, UsersRound } from 'lucide-react'
import { decorators, services } from '../data'
import { ServiceCard } from '../components/shared/ServiceCard'
import { CoverageSection } from '../components/features/coverage/CoverageSection'

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-background" />
        <div className="hero-content page-container">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow"><span className="eyebrow-line" /> A little more lovely, every day</span>
            <h1>Spaces that feel<br />like <em>your story.</em></h1>
            <p>From the home you come back to, to the day you’ll remember forever — thoughtful decoration, made personal.</p>
            <div className="hero-actions">
              <Link className="button button-green" to="/services">Book decoration service <ArrowRight size={17} /></Link>
              <Link className="text-link" to="/about">Get to know us <ArrowDown size={15} /></Link>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars">
                {decorators.map((decorator) => <img key={decorator.name} src={decorator.image} alt="" />)}
              </div>
              <span><strong>4.9/5</strong><span>from 320+ happy clients</span></span>
            </div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }}>
            <div className="hero-image-main">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1300&q=90" alt="Warm, thoughtfully styled living room" />
            </div>
            <div className="hero-note"><span className="note-icon"><Leaf size={18} /></span><span>Made for living.<br /><strong>Styled for you.</strong></span></div>
            <div className="hero-image-detail"><img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=85" alt="Natural home decor details" /></div>
            <span className="hero-sparkle sparkle-one">✳</span><span className="hero-sparkle sparkle-two">✳</span>
          </motion.div>
        </div>
        <div className="hero-bottom-line page-container"><span>01 — 03</span><span className="hero-line" /><span>Dhaka, Bangladesh</span></div>
      </section>

      <section className="trust-strip">
        <div className="page-container trust-items">
          <span><ShieldCheck size={18} /> Thoughtfully planned</span>
          <span><Heart size={18} /> Made personal</span>
          <span><UsersRound size={18} /> Local creative team</span>
          <span><CheckCircle2 size={18} /> From first idea to final detail</span>
        </div>
      </section>

      <section className="section page-container services-section">
        <div className="section-heading">
          <div><span className="eyebrow"><span className="eyebrow-line" /> Made for your moments</span><h2>Find your kind<br />of <em>beautiful.</em></h2></div>
          <div className="heading-side"><p>Whether it’s a room that needs a reset or a day worth celebrating, there’s a little StyleDecor magic for it.</p><Link className="text-link" to="/services">Explore all services <ArrowRight size={16} /></Link></div>
        </div>
        <div className="service-grid home-service-grid">{services.slice(0, 3).map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div>
      </section>

      <section className="story-section">
        <div className="page-container story-grid grid grid-cols-1 md:grid-cols-2">
          <div className="story-image-wrap">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85" alt="Beautifully decorated home dining area" />
            <div className="story-image-caption"><span>01</span> The details make the feeling.</div>
          </div>
          <div className="story-copy">
            <span className="eyebrow"><span className="eyebrow-line" /> The StyleDecor difference</span>
            <h2>Good design is<br />a feeling you <em>keep.</em></h2>
            <p>We believe the best spaces don’t just look lovely — they make you feel at home. Our local team brings your ideas to life with care, creativity, and a thoughtful eye for the little things.</p>
            <ul className="story-list">
              <li><span><Check size={15} /></span> A real person to guide every step</li>
              <li><span><Check size={15} /></span> Designs shaped around your story</li>
              <li><span><Check size={15} /></span> Clear plans, thoughtful finishing</li>
            </ul>
            <Link className="button button-outline" to="/about">A little about us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section page-container decorators-section">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow"><span className="eyebrow-line" /> People with a good eye</span><h2>Meet your <em>makers.</em></h2></div>
          <Link className="text-link" to="/services">Discover our services <ArrowRight size={16} /></Link>
        </div>
        <div className="decorator-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {decorators.map((decorator) => (
            <article className="decorator-card" key={decorator.name}>
              <div className="decorator-photo"><img src={decorator.image} alt={decorator.name} /><span><Star size={13} fill="currentColor" /> {decorator.rating}</span></div>
              <div><h3>{decorator.name}</h3><p>{decorator.role}</p><span className="specialty">{decorator.specialty}</span></div>
            </article>
          ))}
        </div>
      </section>

      <CoverageSection />

      <section className="cta-section">
        <div className="page-container cta-inner">
          <div><span className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Your next lovely thing</span><h2>Shall we make<br />something <em>special?</em></h2></div>
          <div><p>Tell us what you’re dreaming up. We’ll take it from there.</p><Link className="button button-light" to="/services">Let’s get started <ArrowRight size={16} /></Link></div>
          <span className="cta-flower">✳</span>
        </div>
      </section>
    </>
  )
}
