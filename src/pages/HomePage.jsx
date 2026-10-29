import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Truck, Headset, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { brands, formatPKR } from "../data/demoProducts";
import { getProducts } from "../services/apiClient";
import ProductCard from "../components/product/ProductCard";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";
import Button from "../components/common/Button";
import { useCart } from "../context/CartContext";

const whyFeatures = [
  { icon: ShieldCheck, title: "Genuine products", desc: "Sourced from trusted channels. Condition and specs stated clearly on every listing." },
  { icon: Truck, title: "Delivery options", desc: "Local delivery in Karachi, with out-of-city shipping available. Confirm details before ordering." },
  { icon: Headset, title: "Real support", desc: "Talk to an actual person at the store before, during, and after your purchase." },
  { icon: MapPin, title: "Visit us in Saddar", desc: "See the phone in person at Star City Mall before you decide." },
];

export default function HomePage() {
  const reduced = useReducedMotion();
  const { addToCart } = useCart();
  const [tab, setTab] = useState("All");
  
  // Fetch real products from C# Backend
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(data => setProducts(data)).catch(console.error);
  }, []);

  // Safely find a featured product or fallback to the first one
  const featured = products.find((p) => p.featured) || products[0] || { image: "", name: "", price: 0 };
  
  // Create the lineup based on the selected tab (All, iPhone, Android)
  const lineup = tab === "All" ? products : products.filter((p) => p.category === tab);

  return (
    <>
      <section className="tb-hero">
        <div className="tb-container tb-hero__inner">
          <div className="tb-hero__copy">
            <span className="tb-eyebrow tb-eyebrow--gold">TECHBOX · SMARTPHONE STORE</span>
            <motion.h1
              className="tb-hero__title"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Find your next <span className="tb-gold">phone.</span>
            </motion.h1>
            <motion.p
              className="tb-hero__subtitle"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Premium smartphones. Genuine products. Straightforward service from Saddar, Karachi.
            </motion.p>
            <motion.div
              className="tb-hero__ctas"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button to="/shop" variant="primary" size="lg">
                Shop smartphones <ArrowRight size={16} />
              </Button>
              <Button to="/contact" variant="ghost" size="lg">Visit our store</Button>
            </motion.div>
            <div className="tb-hero__trust">
              <span><ShieldCheck size={16} aria-hidden="true" /> Genuine products</span>
              <span><Truck size={16} aria-hidden="true" /> Karachi delivery</span>
            </div>
          </div>

          <motion.div
            className="tb-hero__visual"
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {featured.image && (
              <>
                <img src={featured.image} alt={featured.name} />
                <div className="tb-hero__visual-meta">
                  <div>
                    <small>Designed for you</small>
                    <strong>{featured.name}</strong>
                  </div>
                  <span className="price">{formatPKR(featured.price)}</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <section className="tb-brand-strip" aria-label="Shop by brand">
        <div className="tb-container tb-brand-strip__inner">
          {brands.map((b) => (
            <Link key={b} to={`/shop?brand=${encodeURIComponent(b)}`} className="tb-brand-strip__link">{b}</Link>
          ))}
        </div>
      </section>

      <section className="tb-lineup" id="lineup">
        <div className="tb-container">
          <div className="tb-lineup__head">
            <SectionHeading eyebrow="The lineup" title="Find your fit." description="A focused selection of iPhones and Androids." />
            <div className="tb-lineup__controls">
              {["All", "iPhone", "Android"].map((t) => (
                <button key={t} type="button" className={`tb-lineup__tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <span className="tb-demo-banner">Live Catalogue — these are real products from the database.</span>
          <div className="tb-lineup__count">{lineup.length} product{lineup.length === 1 ? "" : "s"}</div>
          <div className="tb-lineup__grid">
            {lineup.map((p) => (
              <ProductCard key={p.id} product={{...p, image: p.imageUrl}} onAdd={() => addToCart({...p, image: p.imageUrl})} />
            ))}
          </div>
        </div>
      </section>

      <section className="tb-why" id="why-techbox">
        <div className="tb-container">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Why Techbox"
              title="Good tech. No guesswork."
              description="An honest local store, focused on clarity instead of upselling."
            />
          </ScrollReveal>
          <div className="tb-why__grid">
            {whyFeatures.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <div className="tb-why__card">
                  <div className="tb-why__icon"><f.icon size={18} aria-hidden="true" /></div>
                  <div className="tb-why__title">{f.title}</div>
                  <p className="tb-why__desc">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-store">
        <div className="tb-container tb-store__inner">
          <ScrollReveal>
            <span className="tb-eyebrow tb-eyebrow--gold">Visit the store</span>
            <h2 className="tb-store__title">Your next phone could be right here.</h2>
            <p className="tb-store__address">
              Shops G72/G77, Starcity Mall,<br />
              Saddar, Abdullah Haroon Road,<br />
              Karachi, Pakistan
            </p>
            <p className="tb-store__note">Please confirm stock and opening hours before travelling.</p>
            <div className="tb-store__ctas">
              <Button to="/contact" variant="primary">Store details</Button>
              <Button to="/contact" variant="ghost">Directions</Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="tb-store__visual" role="img" aria-label="Store location illustration">
              Star City Mall · Saddar
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}