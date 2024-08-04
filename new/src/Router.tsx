import { Routes, Route } from "react-router-dom";
import Home from "./pages/home-page/index.tsx";
import Product from "./pages/product-page/index.tsx";
import Category from "./pages/category-page/index.tsx";
import Cart from "./pages/cart-page/index.tsx";
import ProductDetail from "./pages/product-page/product-detail.tsx";
import CheckoutPage from "./pages/checkout-page/index.tsx";
import ContactPage from "./pages/contact-page/index.tsx";
import SiginPage from "./pages/authencation-page/login-page.tsx";
import RegisterPage from "./pages/authencation-page/register-page.tsx";
import DetailBilling from "./pages/cart-page/billing.tsx/detail.tsx";

function Router() {
  return (

    <Routes>
      {/* Home router */}
      <Route path="/" element={<Home />} />

      {/* Product Router */}
      <Route path="product" element={<Product />} />

      {/* Detail Router */}
      <Route path="product/:id" element={<ProductDetail />} />

      {/* Cart Router */}
      <Route path="cart" element={<Cart />} />

      {/* Contact Page */}
      <Route path="contact" element={<ContactPage />} />

      {/* Checkout Router */}
      <Route path="checkout" element={<CheckoutPage />} />

      {/* Category Router */}
      <Route path="category" element={<Category />} />
      {/* billing Router */}
      <Route path="billing" element={<DetailBilling />} />
      {/* Authentication Routers */}
      <Route path="login" element={<SiginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>

  );
}

export default Router;
