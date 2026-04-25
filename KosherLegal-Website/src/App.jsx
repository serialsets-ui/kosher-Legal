import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Programs from './pages/Programs'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Intake from './pages/Intake'

const WA_SVG = `M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z`

function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const ro = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('up') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
    }, 60)
    return () => { clearTimeout(t); ro.disconnect() }
  }, [pathname])

  useEffect(() => {
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target, n = parseInt(el.dataset.count)
        if (!isNaN(n) && !el.dataset.done) {
          el.dataset.done = '1'
          let st = null
          const dur = 1800;
          (function s(ts) {
            if (!st) st = ts
            const p = Math.min((ts - st) / dur, 1), ev = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.round(ev * n)
            if (p < 1) requestAnimationFrame(s)
          })(performance.now())
        }
        co.unobserve(el)
      }
    }), { threshold: 0.5 })
    const t = setTimeout(() => {
      document.querySelectorAll('[data-count]').forEach(el => co.observe(el))
    }, 60)
    return () => { clearTimeout(t); co.disconnect() }
  }, [pathname])

  return null
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <a id="btt" href="#top" className={show ? 'show' : ''}
      onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      aria-label="Back to top">↑</a>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Loader />
      <Cursor />
      <a id="wa" href="https://wa.me/2349137189724" target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24"><path d={WA_SVG} /></svg>
      </a>
      <BackToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/intake" element={<Intake />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
