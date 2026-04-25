import { useState, useEffect } from 'react'

export default function Loader() {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <div id="loader" className={gone ? 'gone' : ''}>
      <div className="ld-seal">KL</div>
      <div className="ld-bar" />
      <div className="ld-txt">Kosher Legal</div>
    </div>
  )
}
