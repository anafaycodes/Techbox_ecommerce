import { formatPKR } from "../../data/demoProducts";
import { ShoppingBag, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const mockStats = [
  { label: "Total Orders", value: "12", icon: ShoppingBag, trend: "+2 today" },
  { label: "Revenue (PKR)", value: formatPKR(1540000), icon: TrendingUp, trend: "+12% this week" },
  { label: "Low Stock", value: "2", icon: AlertTriangle, trend: "Needs attention" },
  { label: "In Stock", value: "45", icon: CheckCircle, trend: "Healthy" },
];

const mockOrders = [
  { id: "TB-1024", customer: "Ali Khan", date: "Today, 2:30 PM", total: 299999, status: "Pending" },
  { id: "TB-1023", customer: "Sara Ahmed", date: "Today, 11:15 AM", total: 189999, status: "Dispatched" },
  { id: "TB-1022", customer: "Zainab Malik", date: "Yesterday", total: 149999, status: "Delivered" },
];

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-4)" }}>
        {mockStats.map((stat) => (
          <div key={stat.label} className="tb-admin-card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--color-muted)" }}>
              <span style={{ fontSize: "var(--fs-sm)", fontWeight: 500 }}>{stat.label}</span>
              <stat.icon size={18} />
            </div>
            <div style={{ fontSize: "var(--fs-2xl)", fontWeight: 600, color: "var(--color-charcoal)" }}>{stat.value}</div>
            <div style={{ fontSize: "var(--fs-xs)", color: stat.label === "Low Stock" ? "#D9534F" : "var(--color-muted)" }}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="tb-admin-card">
        <h2 style={{ fontSize: "var(--fs-lg)", marginBottom: "var(--space-4)" }}>Recent Orders</h2>
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
              {mockOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 500 }}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td style={{ color: "var(--color-muted)" }}>{order.date}</td>
                  <td>{formatPKR(order.total)}</td>
                  <td>
                    <span className={`tb-badge tb-badge--${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
