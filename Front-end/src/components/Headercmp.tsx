import { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";


import womanPromoImage from "../assets/home/image-363.png";

type Product = {
  id: number | string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category?: string;
};

type HeaderProps = {
  products: Product[];
  cartCount?: number;
  onMenuClick?: () => void;
};

const CATEGORIES = [
  "Woman",
  "Male",
  "Mother-Child",
  "Home & Furniture",
  "Super market",
  "Cosmetics",
  "Shoe & Bag",
  "Electronic",
  "Sport & Outdoor",
  "Best seller",
];

// Data organized into 4 distinct vertical columns matching your design
const WOMAN_DROPDOWN_COLUMNS = [
  // Column 1
  [
    {
      title: "SHOE & BAG",
      items: ["Casual Shoes", "Boots", "Sandals", "Slippers"],
    },
    {
      title: "LUXURY & DESIGNER",
      items: ["Towels", "Bathroom Scales", "Bath Mats", "Shower Caps"],
    },
  ],
  // Column 2
  [
    {
      title: "HOME TEXTILE",
      items: ["Bedding", "Pillows", "Handkerchief Towels", "Curtain"],
    },
    {
      title: "COSMETICS",
      items: [
        "Shampoo and Conditioner",
        "Styling Products",
        "Hair Accessories",
        "Men's Grooming",
      ],
    },
  ],
  // Column 3
  [
    {
      title: "PARTY SUPPLIES",
      items: [
        "Event & Party",
        "Christmas",
        "Artificial Decorations",
        "Wedding",
      ],
    },
    {
      title: "SPORT & OUTDOORS",
      items: [
        "Team Sports",
        "Water Sports",
        "Outdoor Recreation",
        "Fitness Equipment",
      ],
    },
  ],
  // Column 4
  [
    {
      title: "CLOTHES",
      items: [
        "Bottoms",
        "Women's Clothing",
        "T-Shirts and Tops",
        "Dresses",
        "Outerwear",
        "Formal Wear",
        "Casual Wear",
        "Seasonal Collections",
        "Sports Bras",
        "Workout Tops",
        "Fall Wardrobe",
      ],
    },
  ],
];

export default function Header({
  products,
  cartCount = 3,
  onMenuClick,
}: HeaderProps) {
  // Active hovered category
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Timers to handle hover delay smoothly
  const hoverTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter(category: string) {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    // Wait ~250ms before opening to avoid accidental flashes when skimming
    hoverTimerRef.current = window.setTimeout(() => {
      setActiveCategory(category);
    }, 250);
  }

  function handleMouseLeave() {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    // Give user 200ms grace period to move mouse down into the dropdown
    closeTimerRef.current = window.setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  }

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <header className="w-full bg-white relative">
      {/* =========================================
          1. MOBILE HEADER (< 640px)
         ========================================= */}
      <div className="flex flex-col gap-4 w-full max-w-[438px] mx-auto px-4 py-2 min-[640px]:hidden">
        <div className="flex items-center justify-between w-full h-[27px]">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="h-full flex items-center justify-center p-0.5 active:scale-95 transition"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-full w-auto"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5 h-full">
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
              Luminae
            </span>
          </div>

          <button
            type="button"
            aria-label="View cart"
            className="relative h-full flex items-center justify-center p-0.5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-full w-auto"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="w-full">
          <SearchBar products={products} />
        </div>
      </div>

      {/* =========================================
          2. TABLET & DESKTOP HEADER (>= 640px)
         ========================================= */}
      <div className="hidden min-[640px]:block w-full border-b border-gray-100">
        {/* ROW 1: Logo, Search, Nav links, Socials */}
        <div className="flex items-center justify-between gap-4 px-[5%] lg:px-[8.5%] py-3 min-h-[56px] max-w-[1440px] mx-auto">
          {/* Logo */}
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
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Luminae
            </span>
          </div>

          {/* Search */}
          <div className="w-full max-w-[345px] min-w-[200px]">
            <SearchBar products={products} />
          </div>

          {/* Desktop Nav Links */}
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

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-gray-400 shrink-0">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-gray-600 transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-gray-600 transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.8C10.5 0 9 1.626 9 4.615V8Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Telegram"
              className="hover:text-gray-600 transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="m22 3-3.4 18-7-5.2-3.8 3.6.6-6.3L19 5.3 6.4 11.5l-5.3-1.8L22 3Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ROW 2: Dark Navigation Bar */}
        <div className="w-full bg-[#242424] text-white">
          <div className="flex items-center justify-between px-[5%] lg:px-[8.5%] h-[48px] max-w-[1440px] mx-auto text-xs">
            {/* Left */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <button
                type="button"
                onClick={onMenuClick}
                className="flex items-center gap-2 font-semibold tracking-wide hover:text-gray-300 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                Categories
              </button>
              <div className="flex items-center gap-3 text-neutral-300 text-[11px]">
                <button className="flex items-center gap-1 hover:text-white transition">
                  USD ▾
                </button>
                <button className="flex items-center gap-1 hover:text-white transition">
                  English ▾
                </button>
              </div>
            </div>

            {/* Middle Promo */}
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

            {/* Right: Sign in, Favorites, Cart */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-neutral-200">
              <button className="flex items-center gap-1.5 hover:text-white transition">
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span>Sign in</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-white transition">
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span>Favorites</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-white transition">
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
                {cartCount > 0 && (
                  <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#10B981] text-white text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ROW 3: HORIZONTAL NAVBAR WITH MEGA MENU DROPDOWN */}
        <div
          ref={navContainerRef}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[8.5%]"
        >
          {/* Categories Links */}
          <nav className="flex items-center justify-between gap-4 h-[42px] overflow-x-auto whitespace-nowrap text-xs text-gray-600 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase()}`}
                  onMouseEnter={() => handleMouseEnter(cat)}
                  className={`shrink-0 py-2 transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#FF8A00] font-semibold"
                      : "hover:text-black"
                  }`}
                >
                  {cat}
                </a>
              );
            })}
          </nav>

          {/* =========================================
              MEGA MENU DROPDOWN PANEL
             ========================================= */}
          {activeCategory === "Woman" && (
            <div
              onMouseEnter={() => {
                if (closeTimerRef.current) {
                  window.clearTimeout(closeTimerRef.current);
                  closeTimerRef.current = null;
                }
              }}
              onMouseLeave={handleMouseLeave}
              className="absolute left-[5%] lg:left-[8.5%] top-full z-50 mt-0.5 w-[90%] lg:w-[83%] max-w-[1100px] bg-white rounded-b-xl rounded-tr-xl shadow-2xl border border-gray-100 p-8 transition-all animate-in fade-in slide-in-from-top-1 duration-200"
            >
              <div className="flex gap-8 justify-between">
                {/* 4 Text Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 flex-1">
                  {WOMAN_DROPDOWN_COLUMNS.map((col, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-6">
                      {col.map((section) => (
                        <div
                          key={section.title}
                          className="flex flex-col gap-2.5"
                        >
                          <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                            {section.title}
                          </h3>
                          <ul className="flex flex-col gap-1.5">
                            {section.items.map((item) => (
                              <li key={item}>
                                <a
                                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-[12px] text-gray-500 hover:text-[#FF8A00] hover:underline transition-colors block"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Right Promo Card (DESKTOP ONLY: >= 1024px) */}
                <div className="hidden lg:block w-[280px] shrink-0 self-stretch rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={womanPromoImage}
                    alt="Woman fashion collection"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
