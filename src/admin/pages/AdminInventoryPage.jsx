import { demoProducts } from "../../data/demoProducts";
import { AlertTriangle } from "lucide-react";

export default function AdminInventoryPage() {
  return (
    <div className="tb-admin-card">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-4)", color: "#D9534F" }}>
        <AlertTriangle size={20} />
        <span style={{ fontSize: "var(--fs-sm)", fontWeight: 500 }}>2 items are running low on stock.</span>
      </div>
      
      <div style={{ overflowX: "auto" }}>
        <table className="tb-admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Available Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demoProducts.map((p, i) => {
              const stock = i === 0 ? 2 : 15; // Mock stock
              return (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={p.image} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                      <span style={{ fontWeight: 500 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>{p.sku}</td>
                  <td>
                    <input type="number" defaultValue={stock} style={{ width: "80px", padding: "6px", borderRadius: "4px", border: "1px solid var(--border-light)", textAlign: "center" }} />
                  </td>
                  <td>
                    <span className={`tb-badge ${stock < 5 ? "tb-badge--pending" : "tb-badge--delivered"}`}>
                      {stock < 5 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  <td>
                    <button className="tb-btn tb-btn--outline tb-btn--sm">Update</button>
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
