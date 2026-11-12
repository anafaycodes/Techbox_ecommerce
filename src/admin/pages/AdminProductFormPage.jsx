import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { createProduct, uploadImage } from "../../services/apiClient";

export default function AdminProductFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    brand: "Apple",
    description: "",
    price: "",
    stock: ""
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Creates a local preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = "https://images.unsplash.com/photo-1592750475338-74b7b21085ab"; // Fallback

      // 1. If user selected an image, upload it first
      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        finalImageUrl = uploadRes.url;
      }

      // 2. Create the product with the real image URL
      const productData = {
        name: formData.name,
        brand: formData.brand,
        category: formData.brand === "Apple" ? "iPhone" : "Android",
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        stockQuantity: parseInt(formData.stock) || 0,
        sku: `SKU-${Date.now()}`,
        imageUrl: finalImageUrl,
        isActive: true
      };

      await createProduct(productData);
      alert("Product and Image saved successfully!");
      navigate("/admin/products");
    } catch (error) {
      alert(`Error saving product:\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      <button onClick={() => navigate("/admin/products")} style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-muted)", fontSize: "var(--fs-sm)", width: "fit-content" }}>
        <ArrowLeft size={16} /> Back to Products
      </button>

      <form onSubmit={handleSubmit} className="tb-admin-card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <h2 style={{ fontSize: "var(--fs-lg)", borderBottom: "1px solid var(--border-light)", paddingBottom: "var(--space-3)" }}>Add New Product</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          <div className="tb-admin-field">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. iPhone 15 Pro" required />
          </div>
          <div className="tb-admin-field">
            <label>Brand</label>
            <select name="brand" value={formData.brand} onChange={handleChange} required>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Google">Google</option>
            </select>
          </div>
          <div className="tb-admin-field">
            <label>Price (PKR)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 250000" required />
          </div>
          <div className="tb-admin-field">
            <label>Stock Quantity</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="e.g. 10" required />
          </div>
        </div>

        <div className="tb-admin-field">
          <label>Description</label>
          <textarea rows="3" name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description..." required></textarea>
        </div>

        {/* Image Upload Field */}
        <div className="tb-admin-field">
          <label>Product Image</label>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginTop: "8px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "var(--radius-md)", background: "#F4F6F8", border: "1px dashed var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {imagePreview ? <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Upload size={24} style={{ color: "var(--color-muted)" }} />}
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ padding: "8px", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
          <button type="button" className="tb-btn tb-btn--outline tb-btn--md" onClick={() => navigate("/admin/products")}>Cancel</button>
          <button type="submit" className="tb-btn tb-btn--primary tb-btn--md" disabled={loading}>
            {loading ? "Uploading & Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}