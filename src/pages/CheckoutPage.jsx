import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../data/demoProducts";
import { createOrder } from "../services/apiClient";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    payment: "Bank Transfer"
  });

  if (cart.length === 0) {
    return (
      <div className="tb-placeholder">
        <h1>Cart is empty</h1>
        <Link to="/shop" className="tb-btn tb-btn--primary">Go to shop</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Prepare the data for C#
    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      paymentMethod: formData.payment,
      items: cart.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.qty,
        unitPrice: item.price
      }))
    };

    try {
      // 2. Send it to the real backend API
      const res = await createOrder(orderData);
      
      // 3. Empty the cart
      clearCart(); 
      
      // 4. Redirect to the REAL order ID from the database
      navigate(`/order-confirmation/${res.orderId}`);
    } catch (error) {
      alert(`Order Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tb-container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}>
      <h1 className="tb-section-heading__title" style={{ marginBottom: "var(--space-6)" }}>Checkout</h1>
      
      <div className="tb-cart-layout" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--space-6)", alignItems: "start" }}>
        
        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <h3 style={{ fontSize: "var(--fs-lg)" }}>Contact Details</h3>
          
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)", fontFamily: "inherit" }} />
          
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number (e.g. 03001234567)" required style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)", fontFamily: "inherit" }} />
          
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)", fontFamily: "inherit" }} />
          
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Delivery Address" required rows="3" style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)", fontFamily: "inherit" }}></textarea>
          
          <h3 style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-lg)" }}>Payment Method</h3>
          
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="radio" name="payment" value="Bank Transfer" checked={formData.payment === "Bank Transfer"} onChange={handleChange} /> 
            Bank Transfer
          </label>
          
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="radio" name="payment" value="Easypaisa" checked={formData.payment === "Easypaisa"} onChange={handleChange} /> 
            Easypaisa
          </label>

          <button type="submit" className="tb-btn tb-btn--primary tb-btn--lg" disabled={loading} style={{ marginTop: "var(--space-4)" }}>
            {loading ? "Processing Order..." : "Place Order"}
          </button>
        </form>
        
        {/* ORDER SUMMARY */}
        <div style={{ background: "var(--color-near-white)", padding: "var(--space-5)", borderRadius: "var(--radius-md)" }}>
          <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--fs-lg)" }}>Your Order</h3>
          
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