import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CATEGORIES,
  CATEGORY_MENUS,
  buildCatalogUrl,
  type CategoryName,
} from "../../data/header";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BOTTOM_LINKS = [
  { label: "Login/Register", to: "/auth" },
  { label: "Help & Support", to: "/help" },
  { label: "About us", to: "/about" },
  { label: "Blog", to: "/blog" },
];

export default function MobileMenu({ isOpen, onClose }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryName | "">(
    "Women",
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleCategoryClick(category: CategoryName) {
    setActiveCategory((current) => (current === category ? "" : category));
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <aside className="relative h-full flex flex-col justify-between overflow-y-auto w-full sm:w-[400px] bg-[#f5f5f5] text-[#222] shadow-2xl animate-in slide-in-from-left duration-200">
        {/* TOP BAR / CLOSE BUTTON */}
        <div>
          <header className="sticky top-0 z-10 flex h-[52px] items-center justify-center bg-white border-b border-gray-100">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute left-3 text-2xl font-light h-full flex items-center justify-center p-2 hover:text-black active:scale-90 transition"
            >
              ×
            </button>
            <h2 className="text-sm font-semibold">Menu</h2>
          </header>

          {/* CATEGORIES LIST */}
          <nav className="px-4 pt-3 pb-4">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const menuConfig = CATEGORY_MENUS[category];
              const sections = menuConfig.columns.flat();

              return (
                <div key={category}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    aria-expanded={isActive}
                    className={`flex items-center justify-between w-full py-2.5 text-left text-xs transition-colors ${
                      isActive
                        ? "font-bold text-[#f47721]"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    <span>{category}</span>
                    <span className="text-[10px] text-gray-400">
                      {isActive ? "▾" : "▸"}
                    </span>
                  </button>

                  {/* EXPANDED SUB-CATEGORIES ACCORDION */}
                  {isActive && (
                    <div className="rounded bg-white px-4 py-4 my-1 shadow-xs">
                      <div className="mb-3 pb-2 border-b border-gray-100">
                        <Link
                          to={buildCatalogUrl(category)}
                          onClick={onClose}
                          className="text-[11px] font-bold text-[#3B72D9] hover:underline"
                        >
                          View all {category} &rsaquo;
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                        {sections.map((group) => (
                          <div key={group.title}>
                            <Link
                              to={buildCatalogUrl(category, {
                                sectionCategory: group.categoryParam,
                              })}
                              onClick={onClose}
                              className="block mb-2 text-[10px] font-bold tracking-wider uppercase text-gray-900 leading-tight hover:text-[#f47721]"
                            >
                              {group.title}
                            </Link>

                            <ul className="flex flex-col gap-1.5">
                              {group.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    to={buildCatalogUrl(category, {
                                      sectionCategory: group.categoryParam,
                                      query: item,
                                    })}
                                    onClick={onClose}
                                    className="text-[10px] text-gray-500 hover:text-black transition-colors block"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM AUTH & INFO LINKS */}
        <div className="bg-white px-4 py-2 border-t border-gray-100 mt-auto">
          {BOTTOM_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={onClose}
              className="flex min-h-[42px] items-center justify-between border-b border-gray-100 last:border-0 text-xs font-semibold text-gray-800 hover:bg-gray-50 px-1 transition"
            >
              {link.label}
              <span className="text-base font-normal text-gray-400">
                &rsaquo;
              </span>
            </Link>
          ))}
        </div>
      </aside>

      <div className="flex-1 hidden sm:block" onClick={onClose} />
    </div>
  );
}
