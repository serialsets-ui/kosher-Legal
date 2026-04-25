import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Marquee from '../components/Marquee'
import Testimonials from '../components/Testimonials'
import CtaBanner from '../components/CtaBanner'

const WHY = [
  { icon: '⚡', title: 'Ethics First, Always', desc: 'Integrity is not a tagline — it\'s our operating principle. Every engagement is held to the highest ethical and professional standards, without compromise.' },
  { icon: '🎯', title: 'Tailored Legal Solutions', desc: 'We don\'t deliver generic templates. Every solution is custom-fitted to your specific goals, sector, and stage of growth — because no two clients are the same.' },
  { icon: '🔍', title: 'Transparent & Accessible', desc: 'Clear legal support with zero jargon and zero surprises. You\'ll always know exactly where you stand, what comes next, and what it costs.' },
  { icon: '🌍', title: 'Multilingual Legal Reach', desc: 'We serve clients in English, Yoruba, Igbo, and Hausa — making justice and legal protection truly accessible across Nigeria\'s diverse communities and regions.' },
  { icon: '📱', title: 'Tech-Enabled Practice', desc: 'Digital-friendly legal documents, e-signatures, and remote consultations — a modern legal practice built for the pace and reach of modern Nigeria.' },
  { icon: '🏆', title: '24-Hour Response Guarantee', desc: 'Every intake submission receives a personalised response within 24 business hours — with a recommended legal path, realistic timeline, and clear fee quote.' },
]

const CLIENTS = ['Startups & SMEs','Corporations','Non-Governmental Organizations','Cooperatives & Associations','Real Estate Developers','Import/Export & Trade','Tech Companies','Freelancers & Sole Traders']

export default function About() {
  useEffect(() => { document.title = 'About | Kosher Legal' }, [])

  return (
    <>
      <PageHeader tag="Our Story" title="Built on <em>Integrity.</em><br>Driven by Justice." desc="Kosher Legal is a forward-thinking law firm grounded in ethical practice, transparency, and compliance — serving individuals, businesses, and organizations seeking clarity in Nigeria's legal landscape." />
      <Marquee />

      {/* VISION / MISSION */}
      <section style={{ background: 'var(--ink)' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div className="reveal">
            <div className="sec-label"><span>Vision</span></div>
            <h2 className="sec-title" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>To be Africa's most <em>trusted legal partner</em> for business integrity and compliance.</h2>
            <div style={{ marginTop: 32, borderLeft: '2px solid var(--gold)', padding: '24px 28px', background: 'var(--panel)' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 19, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.55, marginBottom: 10 }}>"The law should serve justice, uphold fairness, and empower progress — for every Nigerian, regardless of background."</p>
              <span style={{ fontSize: 11, letterSpacing: '1.5px', color: 'var(--gold)', textTransform: 'uppercase' }}>— Kosher Legal Core Philosophy</span>
            </div>
          </div>
          <div className="reveal rd1">
            <div className="sec-label"><span>Mission</span></div>
            <h2 className="sec-title" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>To deliver <em>technically sound,</em> ethically grounded legal solutions.</h2>
            <p style={{ marginTop: 24, fontSize: 15, color: 'var(--dim)', lineHeight: 1.9 }}>We empower clients to thrive with peace of mind — through solutions that are custom-fitted to their goals, communicated without jargon, and executed with the highest professional integrity.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section style={{ background: 'var(--deep)' }}>
        <div className="sec-label reveal"><span>Why Choose Us</span></div>
        <h2 className="sec-title reveal">Five Reasons Clients<br /><em>Trust Kosher Legal</em></h2>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 56, alignItems: 'start' }}>
          <div className="reveal">
            {WHY.slice(0, 3).map((w, i) => (
              <div key={i} className="why-point">
                <div className="why-ico">{w.icon}</div>
                <div><div className="why-pt-title">{w.title}</div><div className="why-pt-desc">{w.desc}</div></div>
              </div>
            ))}
          </div>
          <div className="reveal rd1">
            {WHY.slice(3).map((w, i) => (
              <div key={i} className="why-point">
                <div className="why-ico">{w.icon}</div>
                <div><div className="why-pt-title">{w.title}</div><div className="why-pt-desc">{w.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ background: 'var(--ink)' }}>
        <div className="sec-label reveal"><span>Our Clients</span></div>
        <h2 className="sec-title reveal">Proudly Serving<br /><em>All of Nigeria</em></h2>
        <p className="sec-sub reveal rd1">From Lagos startups to nationwide NGOs, we serve clients across every sector with tailored, accessible, and precise legal support.</p>
        <div className="client-tags reveal rd2" style={{ marginTop: 36 }}>
          {CLIENTS.map((c, i) => <span key={i} className="c-tag">{c}</span>)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--deep)' }}>
        <div className="reveal">
          <div className="sec-label"><span>Client Voices</span></div>
          <h2 className="sec-title">What Our <em>Clients Say</em></h2>
        </div>
        <div style={{ marginTop: 48 }} className="reveal rd1"><Testimonials /></div>
      </section>

      <CtaBanner
        title="Let's work together<br/><em>on your legal goals</em>"
        desc="Complete a free intake form and our team will reach out within 24 hours with a personalised recommendation."
        primaryTo="/intake" primaryLabel="Start Free Intake"
        secondaryTo="/contact" secondaryLabel="Get in Touch"
      />
    </>
  )
}
