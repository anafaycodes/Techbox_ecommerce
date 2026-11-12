import { useState, useEffect } from "react";
import { getProducts } from "../../services/apiClient";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: "var(--space-8)", textAlign: "center" }}><Loader2 className="animate-spin" /></div>;

  const lowStockCount = products.filter(p => p.stockQuantity < 5).length;

  return (
    <div className="tb-admin-card">
      {lowStockCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-4)", color: "#D9534F", background: "#FFF3CD", padding: "12px", borderRadius: "var(--radius-md)" }}>
          <AlertTriangle size={20} />
          <span style={{ fontSize: "var(--fs-sm)", fontWeight: 500 }}>{lowStockCount} items are running low on stock.</span>
        </div>
      )}
      
      <div style={{ overflowX: "auto" }}>
        <table className="tb-admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Available Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const stock = p.stockQuantity;
              return (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={p.imageUrl} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                      <span style={{ fontWeight: 500 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>{p.sku}</td>
                  <td style={{ fontWeight: 600 }}>{stock}</td>
                  <td>
                    <span className={`tb-badge ${stock < 5 ? "tb-badge--pending" : "tb-badge--delivered"}`}>
                      {stock < 5 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}