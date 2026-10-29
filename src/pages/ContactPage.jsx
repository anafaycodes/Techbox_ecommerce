import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="tb-container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-9)", maxWidth: "800px" }}>
      <h1 className="tb-section-heading__title" style={{ marginBottom: "var(--space-4)" }}>Contact Techbox</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-6)", fontSize: "var(--fs-lg)" }}>We are here to help you find the right phone and answer any questions.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)" }}>
        <div className="tb-admin-card" style={{ padding: "var(--space-5)" }}>
          <MapPin size={24} style={{ color: "var(--color-gold)", marginBottom: "var(--space-3)" }} />
          <h3 style={{ marginBottom: "var(--space-2)" }}>Visit Our Store</h3>
          <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>
            Shops G72/G77, Starcity Mall,<br />
            Saddar, Abdullah Haroon Road,<br />
            Karachi, Pakistan
          </p>
        </div>

        <div className="tb-admin-card" style={{ padding: "var(--space-5)" }}>
          <MessageCircle size={24} style={{ color: "var(--color-gold)", marginBottom: "var(--space-3)" }} />
          <h3 style={{ marginBottom: "var(--space-2)" }}>WhatsApp & Support</h3>
          <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6, marginBottom: "var(--space-3)" }}>
            For immediate assistance, reach out to us on WhatsApp.
          </p>
          <div style={{ display: "inline-block", background: "#FFF3CD", border: "1px solid #FFE69C", padding: "4px 8px", borderRadius: "4px", fontSize: "var(--fs-xs)", color: "#856404" }}>
            WhatsApp number pending client approval
          </div>
        </div>
      </div>

      <div className="tb-admin-card" style={{ padding: "var(--space-5)", marginTop: "var(--space-5)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <Clock size={24} style={{ color: "var(--color-gold)" }} />
        <div>
          <h3 style={{ marginBottom: "var(--space-1)" }}>Opening Hours</h3>
          <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>Please confirm current opening hours before travelling to the store.</p>
        </div>
      </div>
    </div>
  );
}
