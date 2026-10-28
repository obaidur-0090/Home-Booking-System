import { useState } from 'react'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import { services } from '../data'
import { ServiceCard } from '../components/shared/ServiceCard'

export function ServicesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(services.map((service) => service.category))]
  const filteredServices = services.filter((service) => (
    (category === 'All' || service.category === category)
    && `${service.name} ${service.category} ${service.description}`.toLowerCase().includes(query.toLowerCase())
  ))

  return (
    <div className="page-container page-section">
      <div className="page-intro"><span className="eyebrow"><span className="eyebrow-line" /> A little inspiration</span><h1>Made for your<br /><em>kind of moment.</em></h1><p>Browse our services and find the one that feels right. Every detail is shaped around you.</p></div>
      <div className="catalog-toolbar">
        <div className="category-pills">{categories.map((item) => <button key={item} className={category === item ? 'category-pill active' : 'category-pill'} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your service" aria-label="Search services" /></label>
      </div>
      {filteredServices.length ? <div className="service-grid catalog-grid">{filteredServices.map((service, index) => <ServiceCard key={service.id} service={service} index={index % 3} />)}</div> : <div className="empty-state"><Search size={26} /><h3>No services found just yet</h3><p>Try a different search or category.</p><button className="button button-outline w-full sm:w-auto" onClick={() => { setQuery(''); setCategory('All') }}>Clear filters</button></div>}
      <div className="catalog-note"><Sparkles size={17} /><span>Every package is a starting point. We’ll make it yours.</span><a href="mailto:hello@styledecor.com">Ask us anything <ArrowRight size={15} /></a></div>
    </div>
  )
}
