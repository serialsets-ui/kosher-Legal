const items = ['Corporate Law','NGO Registration','Property Advisory','Dispute Resolution','Regulatory Compliance','Business Ethics','Contract Drafting','Legal Training']

export default function Marquee() {
  const all = [...items, ...items]
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {all.map((item, i) => (
          <div key={i} className="m-item">{item}<div className="m-dot" /></div>
        ))}
      </div>
    </div>
  )
}
