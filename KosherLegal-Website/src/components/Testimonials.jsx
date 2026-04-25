import { useState, useEffect, useCallback } from 'react'

const TESTIMONIALS = [
  { initials: 'AM', name: 'Amara M.', role: 'Executive Director, Heal Africa Foundation', text: '"Kosher Legal handled our NGO registration flawlessly. From paperwork to trustee guidance, they made a complex process entirely manageable. We were operational in record time."' },
  { initials: 'OB', name: 'Olumide B.', role: 'CEO, Bridgepoint Properties', text: '"The property title verification service saved us from what could have been devastating real estate fraud. Their thoroughness and attention to detail is unmatched in Lagos."' },
  { initials: 'TI', name: 'Tunde I.', role: 'Co-founder, Stackvibe Technologies', text: '"As a tech startup we needed fast, reliable legal support for our shareholder agreements and CAC registration. Kosher Legal delivered in two weeks. Highly professional team."' },
  { initials: 'NK', name: 'Ngozi K.', role: 'Chair, Nnewi Artisans Cooperative', text: '"Their legal training workshop for our cooperative completely transformed how our board approaches compliance. Practical, clear — no jargon, just solutions."' },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  const vis = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 1100 ? 2 : 3
  const v = vis()
  const max = Math.max(0, TESTIMONIALS.length - v)
  const off = Math.min(idx, max)
  const pct = Math.floor(100 / v)
  const transform = `translateX(calc(-${off} * (${pct}% + 20px)))`

  const next = useCallback(() => setIdx(i => (i + 1) % TESTIMONIALS.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next])

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="testi-track-wrap">
        <div className="testi-track" style={{ transform }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`testi-card${i === idx ? ' active' : ''}`}>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-txt">{t.text}</p>
              <div className="testi-author">
                <div className="testi-av">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="testi-controls">
        <button className="testi-btn" onClick={() => setIdx(i => Math.max(0, i - 1))}>←</button>
        <button className="testi-btn" onClick={() => setIdx(i => Math.min(TESTIMONIALS.length - 1, i + 1))}>→</button>
        <div className="testi-dots">
          {TESTIMONIALS.map((_, i) => (
            <div key={i} className={`testi-dot${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
    </div>
  )
}
