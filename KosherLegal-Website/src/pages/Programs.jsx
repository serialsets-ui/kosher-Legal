import { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import Marquee from '../components/Marquee'
import CtaBanner from '../components/CtaBanner'

const PROGRAMS = [
  {
    num: '01', chip: 'Community Campaign', title: 'GET JUSTICE WISE™',
    short: 'A multilingual legal awareness campaign delivered in English, Yoruba, Igbo, and Hausa — bringing foundational legal knowledge directly to Nigerian communities where it is needed most.',
    long: 'Because justice begins with understanding your rights. GET JUSTICE WISE™ breaks down complex legal concepts — property rights, business registration, contract basics, and personal rights — into accessible, community-language content delivered through workshops, radio, social media, and community gatherings across Nigeria.',
    tags: ['English','Yoruba','Igbo','Hausa'], bg: 'var(--deep)',
  },
  {
    num: '02', chip: 'SME Support Program', title: 'Artisan Legal Setup™',
    short: 'Purpose-built for tradespeople and small business owners who need to formalize, protect, and scale their operations with the right legal structures — making legal compliance accessible and affordable.',
    long: 'Many Nigerian artisans, traders, and small business owners operate without formal legal protection — leaving them vulnerable to disputes, unable to access credit, and excluded from formal contracts. Artisan Legal Setup™ provides affordable, structured legal onboarding: business name registration, simple contract templates, trademark basics, and dispute guidance.',
    tags: ['CAC Registration','Contract Templates','Dispute Guidance'], bg: 'var(--panel)',
  },
  {
    num: '03', chip: 'Education & Literacy', title: 'Kosher Academy',
    short: 'Legal and compliance literacy courses designed for entrepreneurs, NGO leaders, and community champions — building a generation of legally informed decision-makers across Nigeria.',
    long: 'Kosher Academy delivers structured legal and compliance education through short courses, workshops, and cohort programs. Topics range from company law basics and regulatory compliance to property law fundamentals and alternative dispute resolution — all taught in accessible, practical formats designed for non-lawyers who make business and community decisions every day.',
    tags: ['Short Courses','Workshops','Cohort Programs'], bg: 'var(--deep)',
  },
]

export default function Programs() {
  useEffect(() => { document.title = 'Programs | Kosher Legal' }, [])

  return (
    <>
      <PageHeader tag="Signature Programs" title="Legal Impact<br/><em>Beyond Services</em>" desc="Three community and education-focused programs that extend Kosher Legal's impact beyond traditional legal practice — making legal knowledge accessible to every Nigerian." />
      <Marquee />

      <section style={{ background: 'var(--ink)' }}>
        <div className="sec-label reveal"><span>Our Programs</span></div>
        <h2 className="sec-title reveal">Three Initiatives,<br /><em>One Mission</em></h2>
        <p className="sec-sub reveal rd1">Making legal knowledge, protection, and empowerment accessible across communities and sectors throughout Nigeria.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1, background: 'var(--border)', marginTop: 56 }}>
          {PROGRAMS.map((p, i) => (
            <div key={i} className="prog-card reveal" style={{ background: p.bg, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'start' }}>
              <div>
                <div className="prog-bg-num" style={{ fontSize: 80, color: 'var(--border)' }}>{p.num}</div>
              </div>
              <div>
                <div className="prog-chip">{p.chip}</div>
                <div className="prog-title">{p.title}</div>
                <p className="prog-desc">{p.short}</p>
                <p style={{ marginTop: 20, fontSize: 14, color: 'var(--dim)', lineHeight: 1.9 }}>{p.long}</p>
                <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {p.tags.map((tag, j) => (
                    <span key={j} style={{ padding: '6px 16px', border: '1px solid var(--border)', fontSize: 12, color: 'var(--dim)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Interested in our<br/><em>programs?</em>"
        desc="Reach out to learn how GET JUSTICE WISE™, Artisan Legal Setup™, or Kosher Academy can serve your community or organization."
        primaryTo="/contact" primaryLabel="Get in Touch"
        secondaryTo="/intake" secondaryLabel="Start Intake"
      />
    </>
  )
}
