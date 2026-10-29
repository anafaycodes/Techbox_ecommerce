import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { formatPKR } from "../../data/demoProducts";

export default function ProductCard({ product, onAdd }) {
  // C# sends imageUrl, demo data sent image. We handle both here.
  const imageUrl = product.imageUrl || product.image;
  const price = product.price || 0;

  return (
    <motion.article
      className="tb-product-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Changed product.slug to product.id */}
      <Link to={`/product/${product.id || product.slug}`} className="tb-product-card__media">
        <img src={imageUrl} alt={product.name} loading="lazy" />
        {product.badge && <span className="tb-product-card__badge">{product.badge}</span>}
      </Link>
      <div className="tb-product-card__body">
        <div className="tb-product-card__meta">
          <span>{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{product.storage || product.category}</span>
        </div>
        <Link to={`/product/${product.id || product.slug}`} className="tb-product-card__title">{product.name}</Link>
        <div className="tb-product-card__footer">
          <span className="tb-product-card__price">{formatPKR(price)}</span>
          <button
            type="button"
            className="tb-product-card__add"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => onAdd?.(product)}
            disabled={!product.inStock && product.stockQuantity === 0}
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}