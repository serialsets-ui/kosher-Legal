import { useEffect, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import PageHeader from '../components/PageHeader'
import Marquee from '../components/Marquee'
import CtaBanner from '../components/CtaBanner'

const SVC = 'service_xl8bw8g'
const TPL = 'template_e0wngdp'

/* ── helpers ── */
function collectFormData(formEl) {
  const data = {}
  formEl.querySelectorAll('.form-group').forEach(fg => {
    const label = fg.querySelector('label')?.textContent?.replace('*', '').trim() || ''
    const inputs = fg.querySelectorAll('input,select,textarea')
    if (!inputs.length || !label) return
    const first = inputs[0]
    if (first.type === 'radio') {
      const checked = fg.querySelector('input[type=radio]:checked')
      if (checked) data[label] = checked.value
    } else if (first.type === 'checkbox') {
      const vals = [...fg.querySelectorAll('input[type=checkbox]:checked')].map(c => c.value)
      if (vals.length) data[label] = vals.join(', ')
    } else if (first.tagName === 'SELECT') {
      if (first.value) data[label] = first.value
    } else {
      if (first.value) data[label] = first.value
    }
  })
  return data
}

function buildMessage(type, data) {
  return `INTAKE TYPE: ${type}\n\n` + Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n')
}

/* ── StepBar ── */
function StepBar({ steps, current }) {
  return (
    <div className="step-bar">
      {steps.map((s, i) => (
        <div key={i} className={`step${i < current ? ' done' : i === current ? ' active' : ''}`}>
          <div className="step-circle">{i < current ? '✓' : i + 1}</div>
          <div className="step-label">{s}</div>
          {i < steps.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  )
}

/* ── Success screen ── */
function Success({ title, body }) {
  return (
    <div style={{ textAlign: 'center', padding: '56px 32px' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(61,186,110,.12)', border: '1px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 24px' }}>✓</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--cream)', marginBottom: 12 }}>{title}</div>
      <p style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.9, maxWidth: 420, margin: '0 auto' }}>{body}</p>
    </div>
  )
}

/* ══════════════════════════════════════════════
   CHARITY FORM — 5-step wizard
══════════════════════════════════════════════ */
const CHARITY_STEPS = ['Your Details', 'Organisation', 'Trustees', 'Finances', 'Timeline']

function CharityForm() {
  const [step, setStep] = useState(0)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef()]

  function next() {
    const req = refs[step].current.querySelectorAll('[required]')
    for (const el of req) { if (!el.value) { el.focus(); alert('Please fill all required fields.'); return } }
    setStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function prev() { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  function submit() {
    const req = refs[4].current.querySelectorAll('[required]')
    for (const el of req) { if (!el.value) { el.focus(); alert('Please fill all required fields.'); return } }
    const allData = {}
    refs.forEach((r, i) => Object.assign(allData, collectFormData(r.current)))
    setSending(true)
    emailjs.send(SVC, TPL, { form_type: 'Charity / NGO Intake', from_name: allData['Full Name'] || '', from_email: allData['Email Address'] || '', reply_to: allData['Email Address'] || '', message: buildMessage('Charity / NGO Registration', allData) })
      .then(() => { setSending(false); setDone(true) })
      .catch(() => { setSending(false); alert('Failed to send. Please try again.') })
  }

  if (done) return <Success title="Application Received!" body="Thank you for submitting your NGO intake. Our team will review your application and respond within 24 business hours with a personalised recommendation and fee quote." />

  return (
    <div>
      <StepBar steps={CHARITY_STEPS} current={step} />

      {/* Step 0 */}
      <div ref={refs[0]} style={{ display: step === 0 ? 'block' : 'none' }}>
        <div className="intake-section-title">Your Personal Details</div>
        <div className="fg">
          <div className="form-group span2"><label>Full Name <span className="req">*</span></label><input required type="text" placeholder="Your full legal name" /></div>
          <div className="form-group"><label>Phone Number <span className="req">*</span></label><input required type="tel" placeholder="+234 800 000 0000" /></div>
          <div className="form-group"><label>Email Address <span className="req">*</span></label><input required type="email" placeholder="you@example.com" /></div>
          <div className="form-group span2">
            <label>Registering As <span className="req">*</span></label>
            <div className="radio-group">
              {['Personally (individual trustee)','As part of a group','On behalf of a company or institution'].map((o,i) => (
                <label key={i} className="radio-opt"><input type="radio" name="c_reg_as" value={o} defaultChecked={i===0} /><span>{o}</span></label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step 1 */}
      <div ref={refs[1]} style={{ display: step === 1 ? 'block' : 'none' }}>
        <div className="intake-section-title">About Your Organisation</div>
        <div className="fg">
          <div className="form-group"><label>Proposed Charity Name <span className="req">*</span></label><input required type="text" placeholder="Primary name choice" /></div>
          <div className="form-group"><label>Alternative Name</label><input type="text" placeholder="Backup name (optional)" /></div>
          <div className="form-group span2">
            <label>Organisation Type <span className="req">*</span></label>
            <div className="radio-group">
              {['Charitable Trust','Religious Body','Educational Foundation','Health / Medical NGO','Community Development','Human Rights / Advocacy','Other Non-Profit'].map((o,i) => (
                <label key={i} className="radio-opt"><input required type="radio" name="c_org_type" value={o} /><span>{o}</span></label>
              ))}
            </div>
          </div>
          <div className="form-group span2"><label>Mission Statement <span className="req">*</span></label><textarea required placeholder="Describe your charity's mission and objectives…" style={{ minHeight: 90 }} /></div>
          <div className="form-group span2">
            <label>Primary Beneficiaries</label>
            <div className="check-group">
              {['Children & Youth','Women & Girls','Elderly Persons','Persons with Disabilities','Rural Communities','Urban Poor','General Public'].map((o,i) => (
                <label key={i} className="check-opt"><input type="checkbox" value={o} /><span>{o}</span></label>
              ))}
            </div>
          </div>
          <div className="form-group"><label>City / State of Operation <span className="req">*</span></label><input required type="text" placeholder="e.g. Lagos, Nigeria" /></div>
          <div className="form-group">
            <label>Operational Scope</label>
            <div className="radio-group">
              {['Local (single state)','Regional (multi-state)','National','International'].map((o,i) => (
                <label key={i} className="radio-opt"><input type="radio" name="c_scope" value={o} defaultChecked={i===0} /><span>{o}</span></label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div ref={refs[2]} style={{ display: step === 2 ? 'block' : 'none' }}>
        <div className="intake-section-title">Trustees & Governance</div>
        <div className="fg">
          <div className="form-group"><label>Number of Trustees <span className="req">*</span></label>
            <select required>
              <option value="">Select…</option>
              {['2','3','4','5','6','7+'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Do all trustees have valid government-issued ID? <span className="req">*</span></label>
            <div className="radio-group">
              {['Yes, all do','Some do','No, not yet'].map((o,i) => (
                <label key={i} className="radio-opt"><input required type="radio" name="c_has_id" value={o} /><span>{o}</span></label>
              ))}
            </div>
          </div>
          <div className="form-group span2"><label>Trustee Names</label><textarea placeholder="List trustee full names (one per line)" style={{ minHeight: 90 }} /></div>
          <div className="form-group span2">
            <label>Does the founder wish to retain operational control?</label>
            <div className="radio-group">
              {['Yes','No','Unsure — need guidance'].map((o,i) => (
                <label key={i} className="radio-opt"><input type="radio" name="c_control" value={o} defaultChecked={i===0} /><span>{o}</span></label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div ref={refs[3]} style={{ display: step === 3 ? 'block' : 'none' }}>
        <div className="intake-section-title">Funding & Finances</div>
        <div className="fg">
          <div className="form-group span2">
            <label>Expected Funding Sources</label>
            <div className="check-group">
              {['Membership dues','Private donations','Government grants','Corporate sponsorships','International NGO funding','Earned income / services','Fundraising events'].map((o,i) => (
                <label key={i} className="check-opt"><input type="checkbox" value={o} /><span>{o}</span></label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Will you receive international donations?</label>
            <div className="radio-group">
              {['Yes','No','Possibly later'].map((o,i) => (
                <label key={i} className="radio-opt"><input type="radio" name="c_intl" value={o} defaultChecked={i===0} /><span>{o}</span></label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Do you have a dedicated bank account?</label>
            <div className="radio-group">
              {['Yes','No','Will open one'].map((o,i) => (
                <label key={i} className="radio-opt"><input type="radio" name="c_bank" value={o} defaultChecked={i===0} /><span>{o}</span></label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Have you previously attempted registration?</label>
            <div className="radio-group">
              {['No, first attempt','Yes — incomplete','Yes — rejected'].map((o,i) => (
                <label key={i} className="radio-opt"><input type="radio" name="c_prev_reg" value={o} defaultChecked={i===0} /><span>{o}</span></label>
              ))}
            </div>
          </div>
          <div className="form-group span2"><label>Additional Legal Needs</label><textarea placeholder="e.g. SCUML registration, TETFund, NAFDAC exemption…" style={{ minHeight: 80 }} /></div>
        </div>
      </div>

      {/* Step 4 */}
      <div ref={refs[4]} style={{ display: step === 4 ? 'block' : 'none' }}>
        <div className="intake-section-title">Timeline & Budget</div>
        <div className="fg">
          <div className="form-group">
            <label>Desired Completion Date</label>
            <select>
              <option value="">Select…</option>
              {['Within 1 month','1–3 months','3–6 months','6–12 months','No specific deadline'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Budget Range (₦)</label>
            <select>
              <option value="">Select…</option>
              {['Under ₦100,000','₦100,000 – ₦250,000','₦250,000 – ₦500,000','₦500,000 – ₦1,000,000','Above ₦1,000,000','Unsure — need quote'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group span2">
            <label>Preferred Service Level <span className="req">*</span></label>
            <div className="radio-group">
              {[
                { val: 'Starter', desc: 'CAC filing & basic documentation' },
                { val: 'Professional', desc: 'Full registration + governance setup' },
                { val: 'Premium', desc: 'End-to-end including SCUML & regulatory advisory' },
              ].map((o,i) => (
                <label key={i} className="radio-opt"><input required type="radio" name="c_level" value={o.val} /><span><strong>{o.val}</strong> — {o.desc}</span></label>
              ))}
            </div>
          </div>
          <div className="form-group span2"><label>Specific Tasks or Requests</label><textarea placeholder="Anything specific you'd like us to handle or know…" style={{ minHeight: 80 }} /></div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 16, marginTop: 32, justifyContent: step > 0 ? 'space-between' : 'flex-end' }}>
        {step > 0 && <button className="btn-ghost" onClick={prev} style={{ fontSize: 13, padding: '12px 28px' }}>← Back</button>}
        {step < 4
          ? <button className="btn-gold" onClick={next} style={{ fontSize: 13, padding: '12px 28px' }}><span>Next Step</span><span>→</span></button>
          : <button className="btn-gold" onClick={submit} disabled={sending} style={{ fontSize: 13, padding: '12px 28px', opacity: sending ? .7 : 1 }}><span>{sending ? 'Submitting…' : 'Submit Application'}</span><span>→</span></button>
        }
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   BUSINESS FORM
══════════════════════════════════════════════ */
function BusinessForm() {
  const formRef = useRef()
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  function submit() {
    const req = formRef.current.querySelectorAll('[required]')
    for (const el of req) { if (!el.value) { el.focus(); alert('Please fill all required fields.'); return } }
    const data = collectFormData(formRef.current)
    setSending(true)
    emailjs.send(SVC, TPL, { form_type: 'Business Registration Intake', from_name: data['Full Name'] || '', from_email: data['Email Address'] || '', reply_to: data['Email Address'] || '', message: buildMessage('Business Registration', data) })
      .then(() => { setSending(false); setDone(true) })
      .catch(() => { setSending(false); alert('Failed to send. Please try again.') })
  }

  if (done) return <Success title="Business Intake Received!" body="We've received your business registration intake. Expect a personalised response within 24 business hours with your recommended path, timeline, and fee quote." />

  return (
    <div ref={formRef}>
      <div className="intake-section-title">Business Registration Details</div>
      <div className="fg">
        <div className="form-group"><label>Full Name <span className="req">*</span></label><input required type="text" placeholder="Your full legal name" /></div>
        <div className="form-group"><label>Phone Number <span className="req">*</span></label><input required type="tel" placeholder="+234 800 000 0000" /></div>
        <div className="form-group span2"><label>Email Address <span className="req">*</span></label><input required type="email" placeholder="you@example.com" /></div>
        <div className="form-group"><label>Proposed Business Name <span className="req">*</span></label><input required type="text" placeholder="Your preferred business name" /></div>
        <div className="form-group"><label>Industry / Sector <span className="req">*</span></label>
          <select required>
            <option value="">Select…</option>
            {['Technology / Software','E-commerce & Retail','Food & Beverage','Construction & Real Estate','Healthcare & Pharma','Education & Training','Finance & Fintech','Logistics & Transport','Media & Entertainment','Agriculture','Import / Export','Professional Services','Other'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-group span2">
          <label>Business Structure</label>
          <div className="radio-group">
            {['Business Name (Sole Trader)','Private Limited Company (Ltd)','Public Limited Company (Plc)','Limited Liability Partnership','Incorporated Trustees','Not sure — need guidance'].map((o,i) => (
              <label key={i} className="radio-opt"><input type="radio" name="b_structure" value={o} defaultChecked={i===0} /><span>{o}</span></label>
            ))}
          </div>
        </div>
        <div className="form-group"><label>Number of Directors / Partners</label>
          <select>
            <option value="">Select…</option>
            {['1','2','3','4','5+'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-group"><label>Brief Business Description</label><textarea placeholder="What does your business do?" style={{ minHeight: 80 }} /></div>
        <div className="form-group span2">
          <label>Services / Products Needed</label>
          <div className="check-group">
            {['CAC Registration','Tax Identification Number (TIN)','Trademark Registration','Shareholders Agreement','Employment Contracts','Regulatory Licensing','NAFDAC / SON Registration','Company Secretarial Services'].map((o,i) => (
              <label key={i} className="check-opt"><input type="checkbox" value={o} /><span>{o}</span></label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>How Urgent Is This?</label>
          <select>
            <option value="">Select…</option>
            {['Within 2 weeks','Within 1 month','1–3 months','No rush'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Budget Range (₦)</label>
          <select>
            <option value="">Select…</option>
            {['Under ₦50,000','₦50,000 – ₦150,000','₦150,000 – ₦300,000','₦300,000 – ₦500,000','Above ₦500,000','Unsure — need quote'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-group span2"><label>Additional Comments</label><textarea placeholder="Any other information that may be relevant…" style={{ minHeight: 80 }} /></div>
        <div style={{ gridColumn: '1/-1' }}>
          <button className="btn-gold" onClick={submit} disabled={sending} style={{ width: '100%', justifyContent: 'center', opacity: sending ? .7 : 1 }}>
            <span>{sending ? 'Submitting…' : 'Submit Business Intake'}</span><span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   PROPERTY FORM
══════════════════════════════════════════════ */
function PropertyForm() {
  const formRef = useRef()
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  function submit() {
    const req = formRef.current.querySelectorAll('[required]')
    for (const el of req) { if (!el.value) { el.focus(); alert('Please fill all required fields.'); return } }
    const data = collectFormData(formRef.current)
    setSending(true)
    emailjs.send(SVC, TPL, { form_type: 'Property Law Intake', from_name: data['Full Name'] || '', from_email: data['Email Address'] || '', reply_to: data['Email Address'] || '', message: buildMessage('Property Law', data) })
      .then(() => { setSending(false); setDone(true) })
      .catch(() => { setSending(false); alert('Failed to send. Please try again.') })
  }

  if (done) return <Success title="Property Intake Received!" body="Our property law team will review your submission and contact you within 24 business hours with a tailored recommendation." />

  return (
    <div ref={formRef}>
      <div className="intake-section-title">Property Law Details</div>
      <div className="fg">
        <div className="form-group"><label>Full Name <span className="req">*</span></label><input required type="text" placeholder="Your full legal name" /></div>
        <div className="form-group"><label>Phone Number <span className="req">*</span></label><input required type="tel" placeholder="+234 800 000 0000" /></div>
        <div className="form-group span2"><label>Email Address <span className="req">*</span></label><input required type="email" placeholder="you@example.com" /></div>
        <div className="form-group">
          <label>Property Type</label>
          <select>
            <option value="">Select…</option>
            {['Residential (land)','Residential (house / flat)','Commercial property','Industrial property','Agricultural land','Mixed-use development','Off-plan / Under construction'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Property Location</label>
          <input type="text" placeholder="e.g. Lekki Phase 1, Lagos" />
        </div>
        <div className="form-group span2">
          <label>Services Required</label>
          <div className="check-group">
            {['Title Verification','Deed of Assignment','Governor\'s Consent','Tenancy / Lease Agreement','Real Estate Contract Drafting','Property Transfer / Gifting','Estate Planning','Dispute Resolution','Regulatory Filing','Land Documentation'].map((o,i) => (
              <label key={i} className="check-opt"><input type="checkbox" value={o} /><span>{o}</span></label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Estimated Transaction Value (₦)</label>
          <select>
            <option value="">Select…</option>
            {['Under ₦5M','₦5M – ₦20M','₦20M – ₦50M','₦50M – ₦100M','Above ₦100M','Not applicable'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Current Documentation Status</label>
          <div className="check-group">
            {['Survey plan','Deed of assignment','Certificate of Occupancy (C of O)','Right of Occupancy','Letter of allocation','None yet'].map((o,i) => (
              <label key={i} className="check-opt"><input type="checkbox" value={o} /><span>{o}</span></label>
            ))}
          </div>
        </div>
        <div className="form-group span2"><label>Describe Your Situation <span className="req">*</span></label><textarea required placeholder="Describe your property transaction or legal issue in detail…" style={{ minHeight: 100 }} /></div>
        <div className="form-group">
          <label>Desired Timeline</label>
          <select>
            <option value="">Select…</option>
            {['Urgent (within 2 weeks)','Within 1 month','1–3 months','Flexible'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Budget Range (₦)</label>
          <select>
            <option value="">Select…</option>
            {['Under ₦100,000','₦100,000 – ₦300,000','₦300,000 – ₦500,000','₦500,000 – ₦1M','Above ₦1M','Unsure — need quote'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <button className="btn-gold" onClick={submit} disabled={sending} style={{ width: '100%', justifyContent: 'center', opacity: sending ? .7 : 1 }}>
            <span>{sending ? 'Submitting…' : 'Submit Property Intake'}</span><span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   CONSULTATION FORM
══════════════════════════════════════════════ */
function ConsultationForm() {
  const formRef = useRef()
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  function submit() {
    const req = formRef.current.querySelectorAll('[required]')
    for (const el of req) { if (!el.value) { el.focus(); alert('Please fill all required fields.'); return } }
    const data = collectFormData(formRef.current)
    setSending(true)
    emailjs.send(SVC, TPL, { form_type: 'General Consultation Intake', from_name: data['Full Name'] || '', from_email: data['Email Address'] || '', reply_to: data['Email Address'] || '', message: buildMessage('General Consultation', data) })
      .then(() => { setSending(false); setDone(true) })
      .catch(() => { setSending(false); alert('Failed to send. Please try again.') })
  }

  if (done) return <Success title="Consultation Request Received!" body="Thank you for reaching out. Our team will contact you within 24 business hours to schedule your consultation." />

  return (
    <div ref={formRef}>
      <div className="intake-section-title">Consultation Request</div>
      <div className="fg">
        <div className="form-group"><label>Full Name <span className="req">*</span></label><input required type="text" placeholder="Your full name" /></div>
        <div className="form-group"><label>Phone Number <span className="req">*</span></label><input required type="tel" placeholder="+234 800 000 0000" /></div>
        <div className="form-group span2"><label>Email Address <span className="req">*</span></label><input required type="email" placeholder="you@example.com" /></div>
        <div className="form-group span2">
          <label>Preferred Contact Method <span className="req">*</span></label>
          <div className="radio-group">
            {['Phone Call','WhatsApp','Email','Video Call (Zoom/Meet)','In-Person (Ajah office)'].map((o,i) => (
              <label key={i} className="radio-opt"><input required type="radio" name="q_contact" value={o} /><span>{o}</span></label>
            ))}
          </div>
        </div>
        <div className="form-group span2">
          <label>Legal Area <span className="req">*</span></label>
          <div className="radio-group">
            {['Corporate / Business Law','NGO / Charity Registration','Property Law & Real Estate','Regulatory Compliance','Alternative Dispute Resolution','Legal Training / Workshop','Not sure — need guidance'].map((o,i) => (
              <label key={i} className="radio-opt"><input required type="radio" name="q_area" value={o} /><span>{o}</span></label>
            ))}
          </div>
        </div>
        <div className="form-group span2"><label>Describe Your Situation <span className="req">*</span></label><textarea required placeholder="Briefly describe what you need legal help with…" style={{ minHeight: 100 }} /></div>
        <div className="form-group">
          <label>How Urgent Is This?</label>
          <select>
            <option value="">Select…</option>
            {['Very urgent (within days)','Urgent (within 2 weeks)','Standard (within a month)','Planning ahead'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>How Did You Hear About Us?</label>
          <select>
            <option value="">Select…</option>
            {['Google Search','Instagram','Facebook','LinkedIn','Twitter / X','Referral from friend','Referral from another firm','Other'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <button className="btn-gold" onClick={submit} disabled={sending} style={{ width: '100%', justifyContent: 'center', opacity: sending ? .7 : 1 }}>
            <span>{sending ? 'Submitting…' : 'Request Consultation'}</span><span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN INTAKE PAGE
══════════════════════════════════════════════ */
const TABS = [
  { id: 'charity',      label: '🏛️ Charity / NGO',         sub: 'CAC Incorporated Trustees' },
  { id: 'business',     label: '🏢 Business Registration',  sub: 'CAC Business / Company' },
  { id: 'property',     label: '🏡 Property Law',           sub: 'Title, Deeds & Real Estate' },
  { id: 'consultation', label: '💬 General Consultation',   sub: 'Any other legal matter' },
]

export default function Intake() {
  useEffect(() => { document.title = 'Client Intake | Kosher Legal' }, [])
  const [active, setActive] = useState('charity')

  function switchTab(id) { setActive(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <>
      <PageHeader
        tag="Free Client Intake"
        title="Start Your Legal<br/><em>Journey Here</em>"
        desc="Complete the form below and receive a personalised legal recommendation, realistic timeline, and full fee quote within 24 business hours — completely free and with no obligation."
      />
      <Marquee />

      <section style={{ background: 'var(--ink)' }}>
        {/* Tab selector */}
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div className="sec-label"><span>Select Your Category</span></div>
          <div className="intake-tabs">
            {TABS.map(t => (
              <button key={t.id} className={`intake-tab${active === t.id ? ' active' : ''}`} onClick={() => switchTab(t.id)}>
                <span className="it-label">{t.label}</span>
                <span className="it-sub">{t.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="reveal rd1" style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ background: 'var(--deep)', border: '1px solid var(--border)', padding: 'clamp(28px,5vw,56px)' }}>
            {active === 'charity'      && <CharityForm key="charity" />}
            {active === 'business'     && <BusinessForm key="business" />}
            {active === 'property'     && <PropertyForm key="property" />}
            {active === 'consultation' && <ConsultationForm key="consultation" />}
          </div>
        </div>

        {/* Info strip */}
        <div className="reveal rd2" style={{ maxWidth: 860, margin: '32px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)' }}>
          {[
            { icon: '🔒', title: 'Confidential', desc: 'All submissions are fully confidential and protected.' },
            { icon: '⚡', title: '24-Hour Response', desc: 'Our team responds to every intake within one business day.' },
            { icon: '₦0', title: 'No Obligation', desc: 'The intake assessment is completely free — no commitment required.' },
          ].map((c, i) => (
            <div key={i} style={{ background: 'var(--deep)', padding: '28px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--cream)', marginBottom: 6 }}>{c.title}</div>
              <p style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Prefer to speak<br/><em>with someone directly?</em>"
        desc="Call or WhatsApp us directly on +234 913 718 9724, or send an email to kosherlegal1@gmail.com."
        primaryTo="/contact" primaryLabel="Contact Us"
        secondaryTo="/faq" secondaryLabel="Read FAQs"
      />
    </>
  )
}
