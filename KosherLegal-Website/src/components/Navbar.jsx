import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <NavLink to="/" className="nav-brand" onClick={close}>
          <div className="brand-seal">KL</div>
          <div>
            <span className="brand-name">Kosher Legal</span>
            <span className="brand-sub">Ethics · Compliance · Justice</span>
          </div>
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/programs">Programs</NavLink></li>
          <li><NavLink to="/faq">FAQ</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/intake" className="nav-cta">Get Started</NavLink></li>
        </ul>
        <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-overlay${open ? ' open' : ''}`}>
        <NavLink to="/" onClick={close}>Home</NavLink>
        <NavLink to="/services" onClick={close}>Services</NavLink>
        <NavLink to="/about" onClick={close}>About</NavLink>
        <NavLink to="/programs" onClick={close}>Programs</NavLink>
        <NavLink to="/faq" onClick={close}>FAQ</NavLink>
        <NavLink to="/contact" onClick={close}>Contact</NavLink>
        <NavLink to="/intake" className="mob-cta-link" onClick={close}>Start Intake →</NavLink>
      </div>
    </>
  )
}
