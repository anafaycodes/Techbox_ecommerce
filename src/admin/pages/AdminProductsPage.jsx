import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Trash2, Loader2 } from "lucide-react";
import { getProducts, deleteProduct } from "../../services/apiClient";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then(data => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        // Remove it from the UI instantly
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        alert("Failed to delete product. Is it linked to an order?");
      }
    }
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const formatPKR = (amount) => {
    return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(amount);
  };

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

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-8)" }}>
          <Loader2 className="animate-spin" size={32} style={{ color: "var(--color-gold)" }} />
        </div>
      ) : (
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "var(--space-6)", color: "var(--color-muted)" }}>
                    No products found. Add a new one to get started!
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src={p.imageUrl} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>{p.sku}</td>
                    <td>{formatPKR(p.price)}</td>
                    <td>{p.stockQuantity}</td>
                    <td>
                      <span className={`tb-badge ${p.isActive ? "tb-badge--delivered" : "tb-badge--pending"}`}>
                        {p.isActive ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <Link to={`/admin/products/${p.id}/edit`} style={{ color: "var(--color-gold)", fontSize: "var(--fs-sm)", fontWeight: 500 }}>Edit</Link>
                        <button onClick={() => handleDelete(p.id)} style={{ color: "#D9534F", background: "none", border: "none", cursor: "pointer" }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}