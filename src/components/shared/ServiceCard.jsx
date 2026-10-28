import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import { formatPrice } from '../../data'
import { imageFallback } from './constants'

export function ServiceCard({ service, index = 0 }) {
  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Link to={`/services/${service.id}`} className="service-image-wrap">
        <img src={service.image} alt={service.name} onError={(event) => { event.currentTarget.src = imageFallback }} />
        <span className="service-tag">{service.category}</span>
        <span className="service-image-arrow"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="service-card-body">
        <div className="service-meta"><span><Star size={14} fill="currentColor" /> {service.rating}</span><span>{service.duration}</span></div>
        <Link className="service-title" to={`/services/${service.id}`}>{service.name}</Link>
        <p>{service.description}</p>
        <div className="service-card-bottom">
          <span>From <strong>{formatPrice(service.price)}</strong></span>
          <Link to={`/services/${service.id}`} aria-label={`View ${service.name}`}><ArrowRight size={17} /></Link>
        </div>
      </div>
    </motion.article>
  )
}
