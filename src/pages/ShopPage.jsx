import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { brands } from "../data/demoProducts";
import { getProducts } from "../services/apiClient";
import ProductCard from "../components/product/ProductCard";
import { useCart } from "../context/CartContext";

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const urlSearch = searchParams.get("q") || "";
  const urlBrand = searchParams.get("brand") || "All";
  const urlCategory = searchParams.get("category") || "All";

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [sort, setSort] = useState("relevance");

  // Fetch real products from C# Backend
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(data => setProducts(data)).catch(console.error);
  }, []);

  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  const updateFilters = (key, val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val && val !== "All" && val !== "") {
      newParams.set(key, val);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  // Apply filters based on URL state and real products
  let filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(urlSearch.toLowerCase());
    const matchBrand = urlBrand === "All" || p.brand === urlBrand;
    const matchCategory = urlCategory === "All" || p.category === urlCategory;
    return matchSearch && matchBrand && matchCategory;
  });

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="tb-container" style={{ paddingTop: "var(--space-7)", paddingBottom: "var(--space-9)" }}>
      
      <h1 className="tb-section-heading__title" style={{ marginBottom: "var(--space-4)" }}>
        {urlCategory === "All" ? "All Phones" : `${urlCategory}s`}
      </h1>
      
      <div style={{ 
        display: "flex", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-7)",
        alignItems: "center", background: "var(--color-white)", padding: "var(--space-4)",
        borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-soft)"
      }}>
        <div style={{ flex: "1 1 250px", position: "relative" }}>
          <input 
            type="text" placeholder="Search models..." value={searchInput}
            onChange={(e) => { setSearchInput(e.target.value); updateFilters("q", e.target.value); }}
            style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", fontSize: "var(--fs-sm)", outline: "none", transition: "border-color var(--dur-fast)" }}
            onFocus={(e) => e.target.style.borderColor = "var(--color-gold)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-light)"}
          />
        </div>

        <select value={urlBrand} onChange={(e) => updateFilters("brand", e.target.value)} className="tb-filter-select">
          <option value="All">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <select value={urlCategory} onChange={(e) => updateFilters("category", e.target.value)} className="tb-filter-select">
          <option value="All">All Categories</option>
          <option value="iPhone">iPhone</option>
          <option value="Android">Android</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="tb-filter-select">
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="tb-placeholder" style={{ minHeight: "40vh" }}>
          <h2>No phones found</h2>
          <p>Try clearing your filters or searching for something else.</p>
          <button className="tb-btn tb-btn--outline" onClick={() => { setSearchParams({}); setSearchInput(""); }}>Clear all filters</button>
        </div>
      ) : (
        <div className="tb-lineup__grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={{...p, image: p.imageUrl}} onAdd={() => addToCart({...p, image: p.imageUrl})} />
          ))}
        </div>
      )}
    </div>
  );
}