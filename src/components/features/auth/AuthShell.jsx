import { Link } from 'react-router'
import { Flower2 } from 'lucide-react'

export function GoogleMark() {
  return <svg className="google-mark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.05 11.05 0 0 1-4.8 7.24l7.72 5.99c4.51-4.17 7.12-10.31 7.12-17.7Z" /><path fill="#FBBC05" d="M10.53 28.59a14.39 14.39 0 0 1 0-9.18l-7.98-6.19a23.99 23.99 0 0 0 0 21.56l7.98-6.19Z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.72-5.99c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" /></svg>
}

export function AuthShell({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-photo"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85" alt="A calm, softly styled living room" /><div className="auth-photo-caption"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" /> A space to feel at home</span><p>“The little details made it feel like it had always been ours.”</p><span>— A happy StyleDecor client</span></div></div>
      <div className="auth-panel"><Link className="brand auth-brand" to="/"><span className="brand-mark"><Flower2 size={22} /></span><span>style<span className="brand-accent">decor</span><small>spaces made meaningful</small></span></Link>{children}</div>
    </div>
  )
}
