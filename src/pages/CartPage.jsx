import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../data/demoProducts";
import { Trash2, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="tb-placeholder">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added any phones yet.</p>
        <Link to="/shop" className="tb-btn tb-btn--primary tb-btn--md">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="tb-container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}>
      <h1 className="tb-section-heading__title" style={{ marginBottom: "var(--space-6)" }}>Your Cart</h1>
          <div className="tb-cart-layout" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--space-6)", alignItems: "start" }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "var(--space-4)", padding: "var(--space-4) 0", borderBottom: "1px solid var(--border-light)" }}>
              <img src={item.image} alt={item.name} style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "var(--fs-lg)" }}>{item.name}</h3>
                <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>{item.storage} · {item.brand}</p>
                <p style={{ fontWeight: 600, marginTop: "var(--space-2)" }}>{formatPKR(item.price)}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="tb-btn tb-btn--outline tb-btn--sm" style={{ padding: "4px" }}><Minus size={14} /></button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="tb-btn tb-btn--outline tb-btn--sm" style={{ padding: "4px" }}><Plus size={14} /></button>
                <button onClick={() => removeFromCart(item.id)} style={{ color: "var(--color-muted)", marginLeft: "var(--space-2)" }}><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "var(--color-near-white)", padding: "var(--space-5)", borderRadius: "var(--radius-md)", height: "fit-content" }}>
          <h3 style={{ marginBottom: "var(--space-4)" }}>Order Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
            <span>Subtotal</span>
            <span>{formatPKR(cartTotal)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-4)", color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>
          <Link to="/checkout" className="tb-btn tb-btn--primary tb-btn--full">Checkout</Link>
        </div>
      </div>
  );
}
