import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Marquee from '../components/Marquee'
import CtaBanner from '../components/CtaBanner'

const FAQS = [
  { q: 'How long does NGO / charity registration take in Nigeria?', a: 'Registration as incorporated trustees via CAC typically takes 4–8 weeks. Registrations involving additional regulatory bodies such as SCUML may take longer. Kosher Legal works to expedite the process and provides a realistic timeline at intake.' },
  { q: 'What is the minimum number of trustees for a Nigerian charity?', a: 'CAC requires a minimum of two trustees. We recommend at least three for sound governance and to reduce the risk of decision deadlocks. All trustees must hold valid government-issued identification.' },
  { q: 'Can I register a business or charity without visiting your office?', a: 'Yes. Kosher Legal is fully tech-enabled — remote consultations, digital document exchange, and e-signatures mean the entire process from intake to completion can happen anywhere in Nigeria.' },
  { q: 'How does property title verification work and why is it essential?', a: 'Title verification checks ownership history at the Land Registry and Lands Bureau, confirms the seller legally owns the property, identifies encumbrances, and detects forged or disputed documents. It is critical in Lagos where property fraud is a serious risk.' },
  { q: 'What documents do I need for CAC business registration?', a: 'Typically: proposed business name(s), valid government ID for all directors, Tax Identification Numbers (TINs), passport photos, and a registered Nigerian office address. Some sectors require additional regulatory licenses. We handle full preparation and submission.' },
  { q: 'Do you offer services in Yoruba, Igbo, or Hausa?', a: 'Yes. We serve clients in English, Yoruba, Igbo, and Hausa — making legal services accessible across Nigeria\'s diverse communities. Simply state your preferred language at intake.' },
  { q: 'How quickly will I receive a response after submitting an intake form?', a: 'Every intake is reviewed and responded to within 24 business hours. You will receive a personalized recommendation covering the best legal path, realistic timeline, and a full fee quote with no obligation to proceed.' },
  { q: 'What is the difference between ADR and going to court?', a: 'Alternative Dispute Resolution (ADR) — mediation and arbitration — is typically faster, cheaper, more confidential, and less adversarial than litigation. It preserves business relationships and gives parties more control over outcomes. Kosher Legal helps clients choose the most efficient resolution method for their situation.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <div className="faq-q" onClick={() => setOpen(o => !o)}>
        <span className="faq-q-txt">{q}</span>
        <div className="faq-ico">+</div>
      </div>
      <div className="faq-a"><div className="faq-a-inner">{a}</div></div>
    </div>
  )
}

export default function FAQ() {
  useEffect(() => { document.title = 'FAQ | Kosher Legal' }, [])

  return (
    <>
      <PageHeader tag="Help & FAQ" title="Frequently<br/><em>Asked Questions</em>" desc="Find answers to the most common questions about our services, process, and practice areas. Can't find what you need? Our team is available within 24 hours." />
      <Marquee />

      <section style={{ background: 'var(--ink)' }}>
        <div className="faq-two-col" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 80, alignItems: 'start' }}>
          <div className="reveal">
            <div className="sec-label"><span>Your Questions</span></div>
            <h2 className="sec-title" style={{ marginBottom: 40 }}>Everything You<br /><em>Need to Know</em></h2>
            <div>{FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
          </div>
          <div className="reveal rd1" style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: 'var(--deep)', border: '1px solid var(--border)', padding: 44, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--cream)', lineHeight: 1.3 }}>Still have questions?</h3>
              <p style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.8 }}>Our team is available by phone, WhatsApp, and email. Reach out directly or submit a free intake form for a personalised assessment of your situation.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { href: 'tel:+2349137189724', icon: '📞', label: '+234 913 718 9724' },
                  { href: 'mailto:kosherlegal1@gmail.com', icon: '✉️', label: 'kosherlegal1@gmail.com' },
                  { href: 'https://wa.me/2349137189724', icon: '💬', label: 'WhatsApp Chat', blank: true },
                ].map((c, i) => (
                  <a key={i} href={c.href} target={c.blank ? '_blank' : undefined} rel={c.blank ? 'noopener' : undefined}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'var(--text)', fontSize: 14, transition: 'color .3s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}>
                    <div style={{ width: 36, height: 36, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                    {c.label}
                  </a>
                ))}
              </div>
              <Link to="/intake" className="btn-gold" style={{ justifyContent: 'center' }}><span>Start Free Intake</span><span>→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to move<br/><em>forward?</em>"
        desc="Submit a free intake form and receive your personalised legal recommendation within 24 hours."
        primaryTo="/intake" primaryLabel="Start Client Intake"
        secondaryTo="/contact" secondaryLabel="Contact Us"
      />
    </>
  )
}
