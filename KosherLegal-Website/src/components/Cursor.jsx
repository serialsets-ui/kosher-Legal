import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    if (window.innerWidth <= 768) return
    const c = document.getElementById('cursor')
    const r = document.getElementById('cursor-ring')
    if (!c || !r) return
    let mx = 0, my = 0, rx = 0, ry = 0, rafId

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      c.style.left = mx + 'px'; c.style.top = my + 'px'
    }
    const onEnter = () => document.body.classList.add('cl')
    const onLeave = () => document.body.classList.remove('cl')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,.srv-card,.prog-card,.c-tag,.faq-q').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    function animate() {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15
      r.style.left = rx + 'px'; r.style.top = ry + 'px'
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}
