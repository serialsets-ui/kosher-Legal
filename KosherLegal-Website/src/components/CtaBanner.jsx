import { Link } from 'react-router-dom'

export default function CtaBanner({ title, desc, primaryTo, primaryLabel, secondaryTo, secondaryLabel }) {
  return (
    <div className="cta-banner reveal">
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <p>{desc}</p>
      <div className="cta-btn-group">
        <Link to={primaryTo} className="btn-gold"><span>{primaryLabel}</span><span>→</span></Link>
        <Link to={secondaryTo} className="btn-ghost">{secondaryLabel}</Link>
      </div>
    </div>
  )
}
