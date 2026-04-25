import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import PageHeader from '../components/PageHeader'
import Marquee from '../components/Marquee'
import CtaBanner from '../components/CtaBanner'

export default function Contact() {
  useEffect(() => { document.title = 'Contact | Kosher Legal' }, [])

  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function handleChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) { alert('Please fill all required fields.'); return }
    setSending(true)
    const msg = `Name: ${form.name}\nEmail: ${form.email}${form.phone ? '\nPhone: ' + form.phone : ''}${form.subject ? '\nSubject: ' + form.subject : ''}\n\nMessage:\n${form.message}`
    emailjs.send('service_xl8bw8g', 'template_e0wngdp', {
      form_type: 'Contact Form',
      from_name: form.name, from_email: form.email, reply_to: form.email, message: msg,
    }).then(() => {
      setSent(true); setSending(false)
      setForm({ name: '', phone: '', email: '', subject: '', message: '' })
    }).catch(() => { alert('Failed to send. Please try again or contact us directly.'); setSending(false) })
  }

  return (
    <>
      <PageHeader tag="Get In Touch" title="Connect with<br/><em>Kosher Legal</em>" desc="Headquartered in Ajah, Lagos — serving clients across Nigeria. Reach out by phone, WhatsApp, email, or visit us in person." />
      <Marquee />

      <section style={{ background: 'var(--ink)' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>

          {/* Info */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {[
              { label: 'Address', val: 'Km 23 Richard Mall,\nBeside Lagos Business School,\nAjah, Lagos, Nigeria.' },
              { label: 'Phone', val: '+234 913 718 9724', href: 'tel:+2349137189724' },
              { label: 'Email', vals: [{ text: 'kosherlegal1@gmail.com', href: 'mailto:kosherlegal1@gmail.com' }, { text: 'contact@kosherlegal.com.ng', href: 'mailto:contact@kosherlegal.com.ng' }] },
              { label: 'Website', val: 'kosherlegal.com.ng', href: 'https://kosherlegal.com.ng', blank: true },
            ].map((item, i) => (
              <div key={i}>
                <div className="ci-label">{item.label}</div>
                <div className="ci-val">
                  {item.vals ? item.vals.map((v, j) => <span key={j}><a href={v.href}>{v.text}</a>{j < item.vals.length - 1 && <br />}</span>) :
                    item.href ? <a href={item.href} target={item.blank ? '_blank' : undefined} rel={item.blank ? 'noopener' : undefined}>{item.val}</a> :
                      item.val.split('\n').map((l, j) => <span key={j}>{l}{j < item.val.split('\n').length - 1 && <br />}</span>)
                  }
                </div>
              </div>
            ))}
            <div>
              <div className="ci-label">Office Hours</div>
              <div className="ci-val" style={{ fontSize: 14, lineHeight: 2 }}>
                Monday – Friday: 8:00am – 6:00pm<br />
                Saturday: 10:00am – 2:00pm<br />
                <span style={{ color: 'var(--dim)' }}>Sunday: Closed</span>
              </div>
            </div>
            <div>
              <div className="ci-label">Follow Us</div>
              <div className="socials" style={{ marginTop: 8 }}>
                <a href="#" className="social-btn">📷 Instagram</a>
                <a href="#" className="social-btn">💼 LinkedIn</a>
                <a href="#" className="social-btn">📘 Facebook</a>
                <a href="#" className="social-btn">𝕏 Twitter / X</a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              {[
                { href: 'tel:+2349137189724', icon: '📞', clr: 'var(--gold)', lbl: 'Call Us', val: '+234 913 718 9724', hov: 'rgba(200,168,75,.04)', hBrd: 'var(--gold)' },
                { href: 'https://wa.me/2349137189724', icon: '💬', clr: '#25d366', lbl: 'WhatsApp', val: 'Chat Directly', hov: 'rgba(37,211,102,.04)', hBrd: '#25d366', blank: true },
              ].map((c, i) => (
                <a key={i} href={c.href} target={c.blank ? '_blank' : undefined} rel={c.blank ? 'noopener' : undefined}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', padding: '16px 20px', border: '1px solid var(--border)', transition: 'all .3s' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = c.hBrd; e.currentTarget.style.background = c.hov }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div><div style={{ fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase', color: c.clr }}>{c.lbl}</div><div style={{ fontSize: 14, color: 'var(--cream)' }}>{c.val}</div></div>
                  <span style={{ marginLeft: 'auto', color: c.clr }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal rd1">
            <div style={{ background: 'var(--deep)', padding: 48, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--cream)', marginBottom: 6 }}>Send a Message</div>
              <p style={{ fontSize: 13, color: 'var(--dim)', marginBottom: 32 }}>For quick enquiries. For case intake, use our <Link to="/intake" style={{ color: 'var(--gold)', textDecoration: 'none' }}>intake forms</Link>.</p>
              {sent && <div style={{ padding: '18px 20px', border: '1px solid var(--green)', background: 'rgba(61,186,110,.06)', color: 'var(--green)', fontSize: 14, marginBottom: 24 }}>✓ Message received. We'll be in touch within 24 hours.</div>}
              <div className="fg">
                <div className="form-group"><label>Name <span className="req">*</span></label><input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" /></div>
                <div className="form-group"><label>Phone</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" /></div>
                <div className="form-group span2"><label>Email <span className="req">*</span></label><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" /></div>
                <div className="form-group span2"><label>Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange}>
                    <option value="">Select subject</option>
                    {['Corporate / Business Registration','Property Law & Real Estate','NGO / Charity Setup','Regulatory Compliance','Dispute Resolution','Legal Training / Workshop','General Enquiry'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group span2"><label>Message <span className="req">*</span></label><textarea name="message" value={form.message} onChange={handleChange} style={{ minHeight: 110 }} placeholder="How can we help you?" /></div>
                <div style={{ gridColumn: '1/-1' }}>
                  <button className="btn-gold" onClick={handleSubmit} disabled={sending} style={{ width: '100%', justifyContent: 'center', opacity: sending ? .7 : 1 }}>
                    <span>{sending ? 'Sending…' : 'Send Message'}</span><span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section style={{ background: 'var(--deep)', padding: 0 }}>
        <div style={{ height: 360, background: 'var(--panel)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,37,53,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(37,37,53,.5) 1px,transparent 1px)', backgroundSize: '40px 40px', opacity: .4 }} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📍</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--cream)', marginBottom: 8 }}>Km 23 Richard Mall, Ajah, Lagos</div>
            <p style={{ fontSize: 13, color: 'var(--dim)', marginBottom: 20 }}>Beside Lagos Business School, Lekki-Epe Expressway</p>
            <a href="https://maps.google.com/?q=Ajah+Lagos+Nigeria" target="_blank" rel="noopener" className="btn-ghost" style={{ fontSize: 12, padding: '10px 22px' }}>Get Directions →</a>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need more than a<br/><em>quick message?</em>"
        desc="Complete a full intake form and get a personalised legal recommendation within 24 hours — completely free."
        primaryTo="/intake" primaryLabel="Start Client Intake"
        secondaryTo="/faq" secondaryLabel="Read FAQs"
      />
    </>
  )
}
