import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { demoProducts, formatPKR } from "../../data/demoProducts";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = demoProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="tb-admin-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-5)", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div style={{ position: "relative", flex: "1 1 250px", maxWidth: "400px" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-muted)" }} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 10px 10px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", fontSize: "var(--fs-sm)" }}
          />
        </div>
        <Link to="/admin/products/new" className="tb-btn tb-btn--primary tb-btn--md" style={{ borderRadius: "var(--radius-md)" }}>
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="tb-admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src={p.image} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                    <span style={{ fontWeight: 500 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>{p.sku}</td>
                <td>{formatPKR(p.price)}</td>
                <td>{p.inStock ? "12" : "0"}</td>
                <td>
                  <span className={`tb-badge ${p.inStock ? "tb-badge--delivered" : "tb-badge--pending"}`}>
                    {p.inStock ? "Active" : "Draft"}
                  </span>
                </td>
                <td>
                  <Link to="/admin/products/new" style={{ color: "var(--color-gold)", fontSize: "var(--fs-sm)", fontWeight: 500 }}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
