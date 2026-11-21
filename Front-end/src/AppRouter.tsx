import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage";
import Catalogpage from "./pages/catalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogPage from "./pages/BlogPage";
import AuthLayout from "./components/AuthLayout";
export default function AppRouter() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/catalog" element={<Catalogpage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Route>
``
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgotpass" element={<ForgotPasswordPage />} />
      </Route>
    </Routes>
  );
}
