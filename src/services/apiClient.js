const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5012";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function createProduct(productData) {
  const res = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  
  if (!res.ok) {
    // Read the error message from C#
    const errorData = await res.text();
    throw new Error(errorData || "Failed to create product");
  }
  return res.json();
}