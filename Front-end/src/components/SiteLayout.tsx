// src/components/SiteLayout.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import MobileMenu from "./header/MobileMenu";
import BlogFooter from "./blog/BlogFooter";

import { mockcartitems, mockTopProducts } from "../mockProducts";
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
      <Header
        products={mockTopProducts}
        cartItems={mockcartitems}
        onMenuClick={() => setMenuOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      {activeFooter === "blog" ? <BlogFooter /> : <Footer />}

      {/* Check this line! Both props MUST be here: */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
