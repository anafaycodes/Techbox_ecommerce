import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../services/apiClient";
import { formatPKR } from "../../data/demoProducts";
import { ShoppingBag, TrendingUp, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real orders from C#
  useEffect(() => {
    getOrders()
      .then(data => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-8)" }}>
        <Loader2 className="animate-spin" size={32} style={{ color: "var(--color-gold)" }} />
      </div>
    );
  }

  // Calculate Real Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  
  // Get the 5 most recent orders
  const recentOrders = orders.slice(0, 5);

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, trend: "All time" },
    { label: "Total Revenue", value: formatPKR(totalRevenue), icon: TrendingUp, trend: "From confirmed orders" },
    { label: "Pending Orders", value: pendingOrders, icon: AlertTriangle, trend: "Needs attention", color: "#D9534F" },
    { label: "Completed Orders", value: totalOrders - pendingOrders, icon: CheckCircle, trend: "Delivered or Dispatched" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-4)" }}>
        {stats.map((stat) => (
          <div key={stat.label} className="tb-admin-card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--color-muted)" }}>
              <span style={{ fontSize: "var(--fs-sm)", fontWeight: 500 }}>{stat.label}</span>
              <stat.icon size={18} />
            </div>
            <div style={{ fontSize: "var(--fs-2xl)", fontWeight: 600, color: "var(--color-charcoal)" }}>{stat.value}</div>
            <div style={{ fontSize: "var(--fs-xs)", color: stat.color || "var(--color-muted)" }}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="tb-admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
          <h2 style={{ fontSize: "var(--fs-lg)" }}>Recent Orders</h2>
          <Link to="/admin/orders" style={{ fontSize: "var(--fs-sm)", color: "var(--color-gold)", fontWeight: 500 }}>View All</Link>
        </div>
        
        <div style={{ overflowX: "auto" }}>
          <table className="tb-admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "var(--space-6)", color: "var(--color-muted)" }}>
                    No orders yet. Waiting for your first sale!
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 500 }}>{order.id.split('-')[0]}...</td>
                    <td>{order.customerName}</td>
                    <td style={{ color: "var(--color-muted)" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{formatPKR(order.totalAmount)}</td>
                    <td>
                      <span className={`tb-badge tb-badge--${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}