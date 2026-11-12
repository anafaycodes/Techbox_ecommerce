import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "../../services/apiClient";
import { formatPKR } from "../../data/demoProducts";
import { Loader2 } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(data => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 1. THIS IS WHERE THE HANDLER FUNCTION GOES
    const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      alert(`Failed to update status:\n${error.message}`); // <-- SHOWS THE REAL ERROR
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-8)" }}>
        <Loader2 className="animate-spin" size={32} style={{ color: "var(--color-gold)" }} />
      </div>
    );
  }

  return (
    <div className="tb-admin-card">
      <h2 style={{ fontSize: "var(--fs-lg)", marginBottom: "var(--space-4)" }}>Customer Orders</h2>
      
      <div style={{ overflowX: "auto" }}>
        <table className="tb-admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "var(--space-6)", color: "var(--color-muted)" }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 500, fontSize: "12px" }}>{order.id.split('-')[0]}...</td>
                  <td>{order.customerName}</td>
                  <td>{order.phone}</td>
                  <td style={{ color: "var(--color-muted)" }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td style={{ fontWeight: 600 }}>{formatPKR(order.totalAmount)}</td>
                  
                  {/* 2. THIS IS WHERE THE DROPDOWN GOES */}
                  <td>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="tb-badge"
                      style={{ 
                        background: order.status === "Delivered" ? "#D4EDDA" : "#FFF3CD",
                        color: order.status === "Delivered" ? "#155724" : "#856404",
                        border: "none", cursor: "pointer", outline: "none", padding: "6px"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}