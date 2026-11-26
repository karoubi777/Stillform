// src/components/SiteLayout.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import MobileMenu from "./header/SideMenu";
import BlogFooter from "./blog/BlogFooter";
import ScrollToTop from "./shared/ScrollToTop";
import { mockcartitems, mockTopProducts } from "../data/mockProducts";
type LayoutProps = {
  footerVariant?: "default" | "blog";
};
export default function SiteLayout({
  footerVariant,
  ...headerProps
}: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const activeFooter =
    footerVariant ?? (pathname.startsWith("/blog") ? "blog" : "default");
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      <Header
        products={mockTopProducts}
        cartItems={mockcartitems}
        onMenuClick={() => setMenuOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      {activeFooter === "blog" ? <BlogFooter /> : <Footer />}

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
