const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5012";

// Helper to get the token from LocalStorage
function getAuthHeaders() {
  const token = localStorage.getItem("techbox_token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

// --- PUBLIC ENDPOINTS (No token needed) ---
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function createOrder(orderData) {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to place order");
  }
  return res.json();
}

// --- PROTECTED ENDPOINTS (Token required) ---

// 1. Create Product
export async function createProduct(productData) {
  const res = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders() // <-- Adds the Bearer Token
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to create product");
  }
  return res.json();
}

// 2. Upload Image
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/api/images/upload`, {
    method: "POST",
    headers: {
      ...getAuthHeaders() // <-- Adds the Bearer Token
      // DO NOT set Content-Type here. The browser sets it automatically for FormData
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`C# Backend says: ${errorData}`);
  }
  return res.json();
}

// 3. Get Orders
export async function getOrders() {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    headers: {
      ...getAuthHeaders() // <-- Adds the Bearer Token
    }
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

// 4. Update Order Status
export async function updateOrderStatus(orderId, newStatus) {
  const res = await fetch(`${BASE_URL}/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders() // <-- Adds the Bearer Token
    },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err); 
  }
  return true;
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() }
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return true;
}

export async function updateProduct(id, productData) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}