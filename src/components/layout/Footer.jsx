import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="tb-footer">
      <div className="tb-container">
        <div className="tb-footer__grid">
          <div>
            <div className="tb-footer__brand">TECHBOX</div>
            <p className="tb-footer__tagline">
              Premium smartphones. Genuine products. Straightforward service from Saddar, Karachi.
            </p>
          </div>
          <div>
            <div className="tb-footer__heading">Shop</div>
            <div className="tb-footer__links">
              <Link to="/shop">All phones</Link>
              <Link to="/shop?category=iPhone">iPhone</Link>
              <Link to="/shop?category=Android">Android</Link>
            </div>
          </div>
          <div>
            <div className="tb-footer__heading">Policies</div>
            <div className="tb-footer__links">
              <Link to="/delivery">Delivery</Link>
              <Link to="/returns">Returns</Link>
              <Link to="/warranty">Warranty</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
          </div>
          <div>
            <div className="tb-footer__heading">Store</div>
            <div className="tb-footer__links">
              <Link to="/contact">Contact</Link>
              <span style={{ fontSize: "var(--fs-sm)" }}>Shops G72/G77, Starcity Mall, Saddar, Karachi</span>
            </div>
          </div>
        </div>
        <div className="tb-footer__bottom">
          © {new Date().getFullYear()} Techbox. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
