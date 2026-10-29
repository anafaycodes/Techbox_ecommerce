export default function SectionHeading({ eyebrow, title, description, align = "left", dark = false }) {
  return (
    <div className={`tb-section-heading tb-section-heading--${align} ${dark ? "is-dark" : ""}`}>
      {eyebrow && <span className={`tb-eyebrow ${dark ? "tb-eyebrow--gold" : ""}`}>{eyebrow}</span>}
      <h2 className="tb-section-heading__title">{title}</h2>
      {description && <p className="tb-section-heading__desc">{description}</p>}
    </div>
  );
}
