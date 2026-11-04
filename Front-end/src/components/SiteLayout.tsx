import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Headercmp";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen ? (
        <MobileMenu onClose={() => setMenuOpen(false)} />
      ) : (
        <>
          <Header onMenuClick={() => setMenuOpen(true)} />
          <main>
            <Outlet />
          </main>
        </>
      )}

      <Footer />
    </>
  );
}
