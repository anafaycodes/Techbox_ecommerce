import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Smartphone, Package, ShoppingCart, Users, Settings, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Smartphone },
  { to: "/admin/inventory", label: "Inventory", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("techbox_admin");
    navigate("/admin/login");
  };

  return (
    <div className="tb-admin">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="tb-admin__overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`tb-admin__sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="tb-admin__sidebar-header">
          <Link to="/admin" className="tb-admin__brand">TECHBOX <span>Admin</span></Link>
          <button className="tb-admin__mobile-close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="tb-admin__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="tb-admin__nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="tb-admin__sidebar-footer">
          <button onClick={handleLogout} className="tb-admin__logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="tb-admin__main">
        <header className="tb-admin__header">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button className="tb-admin__mobile-toggle" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="tb-admin__page-title">
              {navItems.find((n) => n.to === location.pathname)?.label || "Admin"}
            </h1>
          </div>
          <div className="tb-admin__user">
            <div className="tb-admin__avatar">A</div>
            <span>Admin User</span>
          </div>
        </header>

        <main className="tb-admin__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
