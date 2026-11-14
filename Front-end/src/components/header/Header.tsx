import { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";
import MegaMenu from "./MegaMenu";
import CartDropdown from "./CartDropdown";
import { Link } from "react-router-dom";
import type { Product, CartItem } from "../../types/product";
import { CATEGORIES } from "../../data/header"; // Adjust path if needed

type HeaderProps = {
  products?: Product[];
  cartItems?: CartItem[];
  onMenuClick?: () => void;
};

export default function Header({
  products = [],
  cartItems = [],
  onMenuClick,
}: HeaderProps) {
  // 1. Smart Sticky Scroll Logic
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
        setIsCartOpen(false);
        setActiveCategory(null);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Mega Menu Hover Timers
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  function handleMouseEnter(category: string) {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => {
      setActiveCategory(category);
    }, 250);
  }

  function handleMouseLeave() {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  }

  function clearCloseTimer() {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }

  // 3. Cart State & Calculations
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0,
  );
  const totalCartCost = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white shadow-xs transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* ================= MOBILE HEADER (< 640px) ================= */}
      <div className="flex flex-col gap-4 w-full max-w-[438px] mx-auto px-4 py-2 min-[640px]:hidden">
        <div className="flex items-center justify-between w-full h-[27px]">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="p-0.5 active:scale-95 transition"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            <svg
              className="h-6 w-6 text-[#4F46E5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.7 2.39-6.314H5.106m2.394 6.314L5.106 5.272" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Stillform
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen((prev) => !prev)}
            className="relative p-0.5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-white">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

        <SearchBar products={products} />
      </div>

      {/* ================= TABLET & DESKTOP HEADER (>= 640px) ================= */}
      <div className="hidden min-[640px]:block w-full border-b border-gray-100">
        {/* ROW 1: Logo, Search, Nav links, Socials */}
        <div className="flex items-center justify-between gap-4 px-[5%] lg:px-[8.5%] py-3 min-h-[56px] max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 shrink-0 cursor-pointer">
            <svg
              className="w-8 h-8 text-[#4F46E5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.7 2.39-6.314H5.106m2.394 6.314L5.106 5.272"
              />
            </svg>
            <Link
              to="/"
              className="hover:bg-red text-2xl font-bold tracking-tight text-slate-900"
            >
              Stillform
            </Link>
          </div>

          <div className="w-full max-w-[345px] min-w-[200px]">
            <SearchBar products={products} />
          </div>

          <nav className="hidden min-[1024px]:flex items-center gap-6 text-xs text-gray-500 font-medium whitespace-nowrap">
            <a href="#" className="hover:text-black transition">
              About us
            </a>
            <a href="#" className="hover:text-black transition">
              Blog
            </a>
            <a href="#" className="hover:text-black transition">
              Contact us
            </a>
            <a href="#" className="hover:text-black transition">
              Help &amp; support
            </a>
          </nav>

          <div className="flex items-center gap-3 text-gray-400 shrink-0">
            <a href="#" aria-label="Instagram" className="hover:text-gray-600">
              📷
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-gray-600 font-bold"
            >
              f
            </a>
            <a href="#" aria-label="Telegram" className="hover:text-gray-600">
              ✈
            </a>
          </div>
        </div>

        {/* ROW 2: Dark Nav Bar */}
        <div className="w-full bg-[#242424] text-white">
          <div className="flex items-center justify-between px-[5%] lg:px-[8.5%] h-[48px] lg:h-[80px] max-w-[1440px] mx-auto text-xs">
            <div className="flex items-center gap-6 shrink-0">
              <button
                type="button"
                onClick={onMenuClick}
                className="flex items-center gap-2 font-semibold hover:text-gray-300"
              >
                <span>☰</span> Categories
              </button>
              <div className="flex items-center gap-3 text-neutral-300 text-[11px]">
                <button>USD ▾</button>
                <button>English ▾</button>
              </div>
            </div>

            <div className="hidden min-[1100px]:flex items-center gap-3 px-6 border-x border-neutral-700/60 h-full">
              <div className="w-6 h-6 rounded bg-neutral-700 flex items-center justify-center text-xs">
                ⚡
              </div>
              <div className="leading-tight text-left">
                <p className="font-bold text-[11px] text-white">
                  Weekly Men&apos;s Toiletries Coupons.
                </p>
                <p className="text-[9px] text-neutral-400">
                  We extend exclusive discounts to our male clientele
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0 text-neutral-200">
              <button className="hover:text-white">
                <Link to="/auth" className="hover:text-white">
                  Sign in
                </Link>
              </button>
              <button className="hover:text-white">Favorites</button>

              {/* Cart Button Anchor */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCartOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 hover:text-white transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z"
                    />
                  </svg>
                  <span>Card</span>
                  {totalCartCount > 0 && (
                    <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#10B981] text-white text-[10px] font-bold">
                      {totalCartCount}
                    </span>
                  )}
                </button>

                {/* Extracted Desktop Cart Dropdown */}
                <CartDropdown
                  isOpen={isCartOpen}
                  onClose={() => setIsCartOpen(false)}
                  cartItems={cartItems}
                  totalCost={totalCartCost}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Categories & MegaMenu */}
        <div
          onMouseLeave={handleMouseLeave}
          className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[8.5%]"
        >
          <nav className="flex items-center justify-between gap-4 h-[42px] overflow-x-auto whitespace-nowrap text-xs text-gray-600 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                onMouseEnter={() => handleMouseEnter(cat)}
                className={`shrink-0 py-2 transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "text-[#FF8A00] font-semibold"
                    : "hover:text-black"
                }`}
              >
                {cat}
              </a>
            ))}
          </nav>

          {/* Extracted MegaMenu Component */}
          <MegaMenu
            isOpen={activeCategory === "Woman"}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>

      {/* Extracted Mobile Cart Sheet */}
      <div className="sm:hidden">
        <CartDropdown
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          totalCost={totalCartCost}
        />
      </div>
    </header>
  );
}
