import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CartToast from "./components/cart/CartToast.jsx";
import DeliveryPage from "./pages/DeliveryPage.jsx";
import ReturnsPage from "./pages/ReturnsPage.jsx";
import WarrantyPage from "./pages/WarrantyPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";

// Admin Imports
import AdminLayout from "./admin/layout/AdminLayout.jsx";
import AdminLoginPage from "./admin/pages/AdminLoginPage.jsx";
import DashboardPage from "./admin/pages/DashboardPage.jsx";
import AdminProductsPage from "./admin/pages/AdminProductsPage.jsx";
import AdminProductFormPage from "./admin/pages/AdminProductFormPage.jsx";
import AdminInventoryPage from "./admin/pages/AdminInventoryPage.jsx";
import AdminPlaceholderPage from "./admin/pages/AdminPlaceholderPage.jsx";

function RequireAdminAuth({ children }) {
  const isAuthenticated = localStorage.getItem("techbox_admin") === "true";
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

// This is the layout for the customer storefront
function StoreLayout() {
  const { toast } = useCart();
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This tells React Router where to put the page content */}
      </main>
      <Footer />
      <CartToast toast={toast} onClose={() => {}} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Storefront Routes (All wrapped in StoreLayout) */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<RequireAdminAuth><AdminLayout /></RequireAdminAuth>}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<AdminProductFormPage />} />
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="orders" element={<AdminPlaceholderPage title="Orders Management" />} />
        <Route path="customers" element={<AdminPlaceholderPage title="Customer Database" />} />
        <Route path="settings" element={<AdminPlaceholderPage title="Store Settings" />} />
      </Route>
    </Routes>
  );
}