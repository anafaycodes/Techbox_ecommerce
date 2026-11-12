import { useParams, Link } from "react-router-dom";

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams();
  
  // Take the first 8 characters of the UUID and make it uppercase
  const shortId = orderNumber.split('-')[0].toUpperCase();

  return (
    <div className="tb-placeholder">
      <h1>Thank you for your order!</h1>
      <p style={{ fontSize: "var(--fs-lg)", marginTop: "var(--space-3)" }}>
        Your order <strong style={{ color: "var(--color-gold)" }}>#TB-{shortId}</strong> has been received.
      </p>
      <p style={{ color: "var(--color-muted)" }}>We will send you payment instructions on WhatsApp shortly.</p>
      <Link to="/" className="tb-btn tb-btn--primary tb-btn--md" style={{ marginTop: "var(--space-5)" }}>Continue Shopping</Link>
    </div>
  );
}