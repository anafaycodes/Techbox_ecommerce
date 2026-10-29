import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
//import { ArrowLeft } from "lucide-react";
import { formatPKR } from "../data/demoProducts";
import { getProducts } from "../services/apiClient";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShieldCheck, Truck, Headset } from "lucide-react";

export default function ProductPage() {
  const { slug } = useParams(); // This is actually the product ID from the database
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => {
        const found = data.find(p => p.id === slug);
        setProduct(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="tb-container" style={{ padding: "var(--space-8) 0" }}><p>Loading...</p></div>;

  if (!product) {
    return (
      <div className="tb-container" style={{ padding: "var(--space-8) 0" }}>
        <h1>Product not found</h1>
        <Link to="/shop" className="tb-btn tb-btn--primary tb-btn--md" style={{ marginTop: "var(--space-4)" }}>Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="tb-container" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-9)" }}>
      
      {/* Back Button */}
      <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-muted)", marginBottom: "var(--space-5)", fontSize: "var(--fs-sm)" }}>
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)", alignItems: "start" }}>
        
                {/* Product Image Container */}
        <div style={{ 
          background: "#f0f0eb", 
          borderRadius: "var(--radius-lg)", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          padding: "var(--space-6)",
          minHeight: "400px",
          maxHeight: "600px" // Stops the container from growing infinitely
        }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ 
              width: "100%", 
              maxWidth: "350px", // Forces the image to be a reasonable size
              maxHeight: "450px", // Keeps the height in check
              objectFit: "contain" 
            }} 
          />
        </div>

        {/* Product Details */}
        <div>
          <span className="tb-eyebrow">{product.brand}</span>
         <h1 style={{ fontSize: "var(--fs-2xl)", fontWeight: 600, margin: "var(--space-2) 0" }}>{product.name}</h1>
          <p style={{ fontSize: "var(--fs-2xl)", color: "var(--color-gold)", fontWeight: 600, marginBottom: "var(--space-4)" }}>{formatPKR(product.price)}</p>
          <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-6)", lineHeight: 1.7 }}>{product.description}</p>
           <div style={{ background: "var(--color-near-white)", padding: "var(--space-5)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-6)" }}>
            <h3 style={{ fontSize: "var(--fs-lg)", marginBottom: "var(--space-3)" }}>Specifications</h3>
            
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", padding: "10px 0" }}>
              <span style={{ color: "var(--color-muted)" }}>Brand</span>
              <span style={{ fontWeight: 500 }}>{product.brand}</span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
              <span style={{ color: "var(--color-muted)" }}>Category</span>
              <span style={{ fontWeight: 500 }}>{product.category}</span>
            </div>
          </div>

                   <button 
            className="tb-btn tb-btn--primary tb-btn--lg" 
            style={{ width: "100%", marginBottom: "var(--space-6)" }}
            onClick={() => addToCart({ ...product, image: product.imageUrl })}
            disabled={product.stockQuantity === 0}
          >
            {product.stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          {/* Trust & Delivery Block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", color: "var(--color-charcoal)", fontSize: "var(--fs-sm)" }}>
              <ShieldCheck size={18} style={{ color: "var(--color-gold)" }} />
              <span><strong>Genuine Product</strong> — PTA status confirmed at store.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", color: "var(--color-charcoal)", fontSize: "var(--fs-sm)" }}>
              <Truck size={18} style={{ color: "var(--color-gold)" }} />
              <span><strong>Karachi Delivery</strong> — Out-of-city shipping available via Leopards.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", color: "var(--color-charcoal)", fontSize: "var(--fs-sm)" }}>
              <Headset size={18} style={{ color: "var(--color-gold)" }} />
              <span><strong>Real Support</strong> — Visit us at Starcity Mall, Saddar.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}