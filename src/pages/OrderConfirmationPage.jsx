import { useParams, Link } from "react-router-dom";

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams();

  return (
    <div className="tb-placeholder">
      <h1>Thank you for your order!</h1>
      <p>Your order <strong>{orderNumber}</strong> has been received.</p>
      <p style={{ color: "var(--color-muted)" }}>We will send you payment instructions shortly.</p>
      <Link to="/" className="tb-btn tb-btn--primary tb-btn--md">Continue shopping</Link>
    </div>
  );
}
