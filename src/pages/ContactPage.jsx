import { MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  // ⚠️ REPLACE THIS WITH THE REAL TECHBOX WHATSAPP NUMBER
  const phoneNumber = "923001234567"; 
  const message = "Hi Techbox, I would like to inquire about a phone.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="tb-container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-9)", maxWidth: "800px" }}>
      <h1 className="tb-section-heading__title" style={{ marginBottom: "var(--space-4)" }}>Contact Techbox</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-6)", fontSize: "var(--fs-lg)" }}>We are here to help you find the right phone and answer any questions.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)" }}>
        
        {/* Store Location */}
        <div className="tb-admin-card" style={{ padding: "var(--space-5)" }}>
          <MapPin size={24} style={{ color: "var(--color-gold)", marginBottom: "var(--space-3)" }} />
          <h3 style={{ marginBottom: "var(--space-2)" }}>Visit Our Store</h3>
          <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>
            Shops G72/G77, Starcity Mall,<br />
            Saddar, Abdullah Haroon Road,<br />
            Karachi, Pakistan
          </p>
        </div>

        {/* WhatsApp */}
        <div className="tb-admin-card" style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column" }}>
          <MessageCircle size={24} style={{ color: "#25D366", marginBottom: "var(--space-3)" }} />
          <h3 style={{ marginBottom: "var(--space-2)" }}>WhatsApp Support</h3>
          <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6, marginBottom: "var(--space-4)", flex: 1 }}>
            For immediate assistance, pricing inquiries, or stock checks, reach out to us on WhatsApp.
          </p>
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="tb-btn tb-btn--primary" 
            style={{ width: "100%", background: "#25D366", color: "white", border: "none" }}
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Opening Hours */}
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