import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function InfoLayout({ title, children }) {
  return (
    <div className="tb-container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-9)", maxWidth: "800px" }}>
      <div style={{ background: "#FFF3CD", border: "1px solid #FFE69C", padding: "12px 16px", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-6)", color: "#856404" }}>
        <AlertCircle size={20} />
        <span style={{ fontSize: "var(--fs-sm)", fontWeight: 500 }}>DRAFT — This content requires client approval before launch.</span>
      </div>
      <h1 className="tb-section-heading__title" style={{ marginBottom: "var(--space-5)" }}>{title}</h1>
      <div className="tb-prose">
        {children}
      </div>
      <div style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-5)", borderTop: "1px solid var(--border-light)" }}>
        <Link to="/shop" className="tb-btn tb-btn--outline">Back to Shop</Link>
      </div>
    </div>
  );
}
