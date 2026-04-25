import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Marquee from '../components/Marquee'
import Testimonials from '../components/Testimonials'
import CtaBanner from '../components/CtaBanner'

const SERVICES = [
  { icon: '🏛️', title: 'Corporate & Commercial Law', desc: 'End-to-end legal support for businesses at every growth stage.', items: ['Business registration & structuring', 'Contract drafting & review', 'Mergers & due diligence'] },
  { icon: '📜', title: 'Regulatory Compliance', desc: 'Proactive compliance that keeps your organization protected.', items: ['Corporate governance advisory', 'NGO & non-profit compliance', 'Tax and labor law alignment'] },
  { icon: '⚖️', title: 'Alternative Dispute Resolution', desc: 'Efficient, cost-effective resolution outside the courtroom.', items: ['Mediation and arbitration', 'Settlement negotiations'] },
  { icon: '🤝', title: 'Business Ethics & Training', desc: 'Building legally informed, ethically grounded organizations.', items: ['Corporate ethics workshops', 'Legal literacy for entrepreneurs'] },
  { icon: '🏡', title: 'Property Law & Real Estate', desc: 'Full-spectrum property services for individuals and developers.', items: ['Title verification & documentation', 'Deeds, leases & tenancy agreements', 'Estate planning & transfers'] },
]

const WHY = [
  { icon: '⚡', title: 'Ethics First, Always', desc: 'Integrity is our operating principle. Every engagement meets the highest ethical standards.' },
  { icon: '🎯', title: 'Tailored Solutions', desc: 'Custom-fitted to your specific goals, sector, and stage — not generic templates.' },
  { icon: '🌍', title: 'Multilingual Reach', desc: 'We serve clients in English, Yoruba, Igbo, and Hausa across all communities.' },
  { icon: '📱', title: 'Tech-Enabled Practice', desc: 'Digital documents, e-signatures, and remote consultations for modern Nigeria.' },
]

export default function Home() {
  useEffect(() => { document.title = 'Home | Kosher Legal' }, [])

  return (
    <>
      {/* HERO */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '130px 5vw 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(200,168,75,.07),transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,37,53,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(37,37,53,.35) 1px,transparent 1px)', backgroundSize: '70px 70px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)', opacity: .45 }} />
        <div style={{ position: 'relative', maxWidth: 980, width: '100%' }}>
          <div className="hero-eyebrow">
            <div style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>Lagos · Nigeria · Legal Excellence</span>
          </div>
          <h1 className="hero-h1">
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Ethics.</em><br />Compliance.<br />Justice.
          </h1>
          <p className="hero-p">A forward-thinking legal services firm delivering technically sound, ethically grounded solutions for businesses, startups, NGOs and individuals navigating Nigeria's legal terrain.</p>
          <div className="hero-btns">
            <Link to="/intake" className="btn-gold"><span>Begin Consultation</span><span>→</span></Link>
            <Link to="/services" className="btn-ghost">Explore Services</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom,var(--gold),transparent)' }} />
          <span style={{ fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--dim)', writingMode: 'vertical-lr' }}>Scroll to explore</span>
        </div>
      </div>

      <Marquee />

      {/* STATS */}
      <section style={{ background: 'var(--deep)', padding: '64px 5vw', borderBottom: '1px solid var(--border)' }}>
        <div className="stats-row">
          <div className="stat-box reveal"><span className="stat-num" data-count="5">0</span><span className="stat-lbl">Core Practice Areas</span></div>
          <div className="stat-box reveal rd1"><span className="stat-num" data-count="4">0</span><span className="stat-lbl">Nigerian Languages Served</span></div>
          <div className="stat-box reveal rd2"><span className="stat-num" style={{ fontSize: 40 }}>100%</span><span className="stat-lbl">Ethics-First Approach</span></div>
          <div className="stat-box reveal rd3"><span className="stat-num" style={{ fontSize: 40 }}>24hr</span><span className="stat-lbl">Response Guarantee</span></div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ background: 'var(--ink)' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 64 }}>
          <div className="reveal">
            <div className="sec-label"><span>Our Services</span></div>
            <h2 className="sec-title">Comprehensive<br /><em>Legal Solutions</em></h2>
          </div>
          <p className="reveal rd1" style={{ fontSize: 15, color: 'var(--dim)', lineHeight: 1.95 }}>Headquartered at Ajah, Lagos, Kosher Legal delivers tailored, technically sound legal services across five core practice areas — from company formation to compliance, property law to dispute resolution.</p>
        </div>
        <div className="srv-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className={`srv-card reveal${i % 3 === 1 ? ' rd1' : i % 3 === 2 ? ' rd2' : ''}`}>
              <div className="srv-accent" />
              <span className="srv-icon">{s.icon}</span>
              <div className="srv-title">{s.title}</div>
              <p className="srv-desc">{s.desc}</p>
              <ul className="srv-list">{s.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
            </div>
          ))}
          <div className="srv-card reveal rd2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 18, background: 'linear-gradient(135deg,rgba(200,168,75,.06),rgba(200,168,75,.02))', cursor: 'pointer' }} onClick={() => window.location.href = '/intake'}>
            <div className="srv-accent" />
            <span style={{ fontSize: 36 }}>💬</span>
            <div className="srv-title" style={{ color: 'var(--gold)' }}>Need guidance?</div>
            <p className="srv-desc">Tell us your situation and we'll recommend the right legal path.</p>
            <Link to="/intake" className="btn-gold" style={{ fontSize: 12, padding: '10px 24px' }}><span>Free Assessment</span></Link>
          </div>
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link to="/services" className="btn-ghost">View All Services →</Link>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ background: 'var(--deep)' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div className="reveal">
            <div className="sec-label"><span>Why Kosher Legal</span></div>
            <h2 className="sec-title">Built on <em>Integrity.</em><br />Powered by Expertise.</h2>
            <p className="sec-sub">Every engagement is held to the highest ethical and professional standards. We deliver clarity, not complexity.</p>
            <div style={{ marginTop: 36, borderLeft: '2px solid var(--gold)', padding: '24px 28px', background: 'var(--panel)' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.5, marginBottom: 12 }}>"The law should serve justice, uphold fairness, and empower progress."</p>
              <span style={{ fontSize: 11, letterSpacing: '1.5px', color: 'var(--gold)', textTransform: 'uppercase' }}>— Kosher Legal Core Philosophy</span>
            </div>
            <div style={{ marginTop: 32 }}><Link to="/about" className="btn-ghost">Learn About Us →</Link></div>
          </div>
          <div className="reveal rd1">
            {WHY.map((w, i) => (
              <div key={i} className="why-point">
                <div className="why-ico">{w.icon}</div>
                <div><div className="why-pt-title">{w.title}</div><div className="why-pt-desc">{w.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--ink)' }}>
        <div className="reveal">
          <div className="sec-label"><span>Client Voices</span></div>
          <h2 className="sec-title">What Our <em>Clients Say</em></h2>
        </div>
        <div style={{ marginTop: 48 }} className="reveal rd1">
          <Testimonials />
        </div>
      </section>

      <CtaBanner
        title="Ready to take the<br/><em>right legal step?</em>"
        desc="Submit an intake form and receive a personalised recommendation, timeline, and fee quote within 24 hours — no obligation."
        primaryTo="/intake" primaryLabel="Start Client Intake"
        secondaryTo="/contact" secondaryLabel="Contact Us"
      />
    </>
  )
}
