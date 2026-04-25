export default function PageHeader({ tag, title, desc }) {
  return (
    <div className="page-header">
      <div className="ph-bg" />
      <div className="ph-grid" />
      <div className="ph-inner">
        <div className="ph-eyebrow">
          <div className="ph-line" />
          <span className="ph-tag">{tag}</span>
        </div>
        <h1 className="ph-title" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="ph-desc">{desc}</p>
      </div>
    </div>
  )
}
