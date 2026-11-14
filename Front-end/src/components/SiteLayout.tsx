// src/components/SiteLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import MobileMenu from "./header/MobileMenu";

import { mockcartitems, mockTopProducts } from "../mockProducts";

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header
        products={mockTopProducts}
        cartItems={mockcartitems}
        onMenuClick={() => setMenuOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Check this line! Both props MUST be here: */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
