import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Marquee from '../components/Marquee'
import CtaBanner from '../components/CtaBanner'

const SERVICES = [
  { icon: '🏛️', title: 'Corporate & Commercial Law', desc: 'End-to-end legal support for businesses at every stage of growth — from incorporation to complex M&A transactions.', items: ['Business registration & structuring','Contract drafting & review','Mergers, acquisitions & due diligence','Shareholders agreements','Legal audits for corporate compliance','Joint venture documentation'] },
  { icon: '📜', title: 'Regulatory Compliance', desc: 'Proactive compliance advisory to keep your organization protected, aligned, and ahead of regulatory change.', items: ['Corporate governance advisory','Licensing & permit guidance','NGO & non-profit compliance','Tax and labor law alignment','SCUML registration & compliance','Sector-specific regulatory filings'] },
  { icon: '⚖️', title: 'Alternative Dispute Resolution', desc: 'Efficient, cost-effective resolution outside the courtroom — preserving relationships and reducing costs.', items: ['Mediation and arbitration','Conflict resolution for businesses','Settlement negotiations','Commercial dispute advisory','Multi-party dispute facilitation'] },
  { icon: '🤝', title: 'Business Ethics & Legal Training', desc: 'Building legally informed, ethically grounded organizations through structured workshops and advisory sessions.', items: ['Corporate ethics workshops','Legal literacy for entrepreneurs','NGO and SME advisory sessions','Compliance training programs','Policy drafting for organizations'] },
  { icon: '🏡', title: 'Property Law & Real Estate', desc: 'Full-spectrum property legal services — from title verification to estate planning — for individuals and developers alike.', items: ['Title verification & land documentation','Deeds of assignment & lease agreements','Real estate contract drafting','Estate planning & property transfers','Tenancy agreements & dispute resolution','Regulatory filing & Governor\'s Consent'] },
]

const CLIENTS = ['Startups & SMEs','Corporations','Non-Governmental Organizations','Cooperatives & Associations','Real Estate Developers','Import/Export & Trade Businesses','Tech Companies','Freelancers & Sole Traders']

export default function Services() {
  useEffect(() => { document.title = 'Services | Kosher Legal' }, [])

  return (
    <>
      <PageHeader tag="What We Do" title="Comprehensive<br/><em>Legal Services</em>" desc="Five core practice areas covering every stage of your legal journey — from business formation and compliance, to property law, dispute resolution, and legal education." />
      <Marquee />

      <section style={{ background: 'var(--ink)' }}>
        <div className="sec-label reveal"><span>Practice Areas</span></div>
        <div className="srv-grid" style={{ marginTop: 40 }}>
          {SERVICES.map((s, i) => (
            <div key={i} className={`srv-card reveal${i % 3 === 1 ? ' rd1' : i % 3 === 2 ? ' rd2' : ''}`}>
              <div className="srv-accent" />
              <span className="srv-icon">{s.icon}</span>
              <div className="srv-title">{s.title}</div>
              <p className="srv-desc">{s.desc}</p>
              <ul className="srv-list">{s.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
            </div>
          ))}
          <div className="srv-card reveal rd2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20, background: 'linear-gradient(135deg,rgba(200,168,75,.06),rgba(200,168,75,.02))' }}>
            <div className="srv-accent" />
            <span style={{ fontSize: 40 }}>📋</span>
            <div className="srv-title" style={{ color: 'var(--gold)' }}>Not sure which service you need?</div>
            <p className="srv-desc">Complete our free intake form and we'll match you with the right practice area and legal path.</p>
            <Link to="/intake" className="btn-gold" style={{ fontSize: 12, padding: '12px 26px' }}><span>Free Intake Assessment</span></Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--deep)' }}>
        <div className="sec-label reveal"><span>Who We Serve</span></div>
        <h2 className="sec-title reveal">Built for<br /><em>Every Client</em></h2>
        <p className="sec-sub reveal rd1">We serve a diverse clientele across Lagos and Nigeria with professionalism, clarity, and precision tailored to each sector and context.</p>
        <div className="client-tags reveal rd2" style={{ marginTop: 36 }}>
          {CLIENTS.map((c, i) => <span key={i} className="c-tag">{c}</span>)}
        </div>
      </section>

      <CtaBanner
        title="Ready to get the<br/><em>right legal support?</em>"
        desc="Submit an intake form and receive a personalised path, timeline, and fee quote within 24 hours."
        primaryTo="/intake" primaryLabel="Start Client Intake"
        secondaryTo="/contact" secondaryLabel="Contact Us"
      />
    </>
  )
}
