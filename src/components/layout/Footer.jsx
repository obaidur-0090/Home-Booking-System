import { Link } from 'react-router'
import { Camera, Flower2, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="page-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="brand brand-light" to="/">
              <span className="brand-mark"><Flower2 size={22} /></span>
              <span>style<span className="brand-accent">decor</span><small>spaces made meaningful</small></span>
            </Link>
            <p>We make the everyday feel special, and the special feel like you.</p>
            <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={17} /></a>
          </div>
          <div className="footer-column">
            <h4>Explore</h4>
            <Link to="/services">Our services</Link>
            <Link to="/about">Our story</Link>
            <Link to="/coverage">Service coverage</Link>
            <Link to="/dashboard">My bookings</Link>
          </div>
          <div className="footer-column">
            <h4>Get in touch</h4>
            <a href="tel:+8801700000000"><Phone size={15} /> +880 1700-000000</a>
            <a href="mailto:hello@styledecor.com"><Mail size={15} /> hello@styledecor.com</a>
            <p><MapPin size={15} /> Gulshan, Dhaka, Bangladesh</p>
          </div>
          <div className="footer-column">
            <h4>Come by</h4>
            <p>Saturday – Thursday<br />10:00 am – 7:00 pm</p>
            <p className="footer-note">By appointment, always.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} StyleDecor. Made with care in Dhaka.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  )
}
