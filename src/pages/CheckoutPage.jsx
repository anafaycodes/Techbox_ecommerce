import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../data/demoProducts";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return <div className="tb-placeholder"><h1>Cart is empty</h1><Link to="/shop">Go to shop</Link></div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate("/order-confirmation/TB-12345");
    }, 1500);
  };

  return (
    <div className="tb-container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}>
      <h1 className="tb-section-heading__title" style={{ marginBottom: "var(--space-6)" }}>Checkout</h1>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-6)" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <h3>Contact Details</h3>
          <input type="text" placeholder="Full Name" required style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)" }} />
          <input type="tel" placeholder="Phone Number" required style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)" }} />
          <input type="text" placeholder="City" required style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)" }} />
          <textarea placeholder="Full Address" required style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)" }}></textarea>
          
          <h3 style={{ marginTop: "var(--space-4)" }}>Payment Method</h3>
          <label><input type="radio" name="payment" required /> Bank Transfer</label>
          <label><input type="radio" name="payment" required /> Easypaisa</label>

          <button type="submit" className="tb-btn tb-btn--primary tb-btn--lg" disabled={loading} style={{ marginTop: "var(--space-4)" }}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
        
        <div style={{ background: "var(--color-near-white)", padding: "var(--space-5)", borderRadius: "var(--radius-md)", height: "fit-content" }}>
          <h3 style={{ marginBottom: "var(--space-4)" }}>Your Order</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)", fontSize: "var(--fs-sm)" }}>
              <span>{item.name} x{item.qty}</span>
              <span>{formatPKR(item.price * item.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border-light)", marginTop: "var(--space-4)", paddingTop: "var(--space-4)", display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
            <span>Total</span>
            <span>{formatPKR(cartTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
