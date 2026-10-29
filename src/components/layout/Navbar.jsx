import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=iPhone", label: "iPhone" },
  { to: "/shop?category=Android", label: "Android" },
  { to: "/#why-techbox", label: "Why Techbox" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className={`tb-navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="tb-container tb-navbar__inner">
        <Link to="/" className="tb-navbar__brand" aria-label="Techbox home">TECHBOX</Link>

        <nav className="tb-navbar__links" aria-label="Primary">
          {navLinks.map((l) => (
            <Link 
              key={l.to} 
              to={l.to} 
              className={`tb-navbar__link ${location.pathname + location.search === l.to ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="tb-navbar__actions">
          <div className="tb-navbar__search" role="search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search phones"
              aria-label="Search phones"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  navigate(`/shop?q=${encodeURIComponent(e.currentTarget.value.trim())}`);
                }
              }}
            />
          </div>
          <Link to="/cart" className="tb-navbar__cart" aria-label={`Cart, ${cartCount} items`}>
            <ShoppingBag size={20} aria-hidden="true" />
            {cartCount > 0 && <span className="tb-navbar__cart-badge">{cartCount}</span>}
          </Link>
          <button
            type="button"
            className="tb-navbar__mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="tb-navbar__mobile" aria-label="Mobile primary">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="tb-navbar__mobile-link">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}