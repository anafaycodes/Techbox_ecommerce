export default function AdminPlaceholderPage({ title }) {
  return (
    <div className="tb-admin-card" style={{ textAlign: "center", padding: "var(--space-9) var(--space-5)", color: "var(--color-muted)" }}>
      <h2 style={{ fontSize: "var(--fs-xl)", color: "var(--color-charcoal)", marginBottom: "var(--space-2)" }}>{title}</h2>
      <p>This module is under construction and will be available in the next phase.</p>
    </div>
  );
}
