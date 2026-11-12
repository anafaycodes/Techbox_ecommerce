import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { getProducts, updateProduct, uploadImage } from "../../services/apiClient";

export default function AdminProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    id: "", name: "", brand: "Apple", category: "iPhone", description: "", price: "", stock: "", sku: ""
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Fetch all products and find the one we want to edit
    getProducts().then(data => {
      const product = data.find(p => p.id === id);
      if (product) {
        setFormData({
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          description: product.description,
          price: product.price,
          stock: product.stockQuantity,
          sku: product.sku
        });
        setImagePreview(product.imageUrl);
      }
      setFetching(false);
    });
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = imagePreview; // Default to existing image

      // If user selected a NEW image, upload it
      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        finalImageUrl = uploadRes.url;
      }

      const productData = {
        id: formData.id,
        name: formData.name,
        brand: formData.brand,
        category: formData.brand === "Apple" ? "iPhone" : "Android",
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        stockQuantity: parseInt(formData.stock) || 0,
        sku: formData.sku,
        imageUrl: finalImageUrl,
        isActive: true
      };

      await updateProduct(id, productData);
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ padding: "var(--space-8)", textAlign: "center" }}>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      <button onClick={() => navigate("/admin/products")} style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-muted)", fontSize: "var(--fs-sm)", width: "fit-content" }}>
        <ArrowLeft size={16} /> Back to Products
      </button>

      <form onSubmit={handleSubmit} className="tb-admin-card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <h2 style={{ fontSize: "var(--fs-lg)", borderBottom: "1px solid var(--border-light)", paddingBottom: "var(--space-3)" }}>Edit Product</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          <div className="tb-admin-field">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="tb-admin-field">
            <label>Stock Quantity</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
          </div>
        </div>

        <div className="tb-admin-field">
          <label>Description</label>
          <textarea rows="3" name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <div className="tb-admin-field">
          <label>Product Image (Leave empty to keep current)</label>
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
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}