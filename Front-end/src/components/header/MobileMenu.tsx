import { useState, useEffect } from "react";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const categories = [
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

const womanGroups = [
  {
    title: "SHOE & BAG",
    items: ["Casual Shoes", "Boots", "Sandals", "Slippers"],
  },
  {
    title: "HOME TEXTILE",
    items: ["Bedding", "Pillows", "Handkerchief Towels", "Curtain"],
  },
  {
    title: "LUXURY & DESIGNER",
    items: ["Towels", "Bathroom Scales", "Bath Mats", "Shower Caps"],
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
  {
    title: "PARTY SUPPLIES",
    items: ["Event & Party", "Christmas", "Artificial Decorations", "Wedding"],
  },
  {
    title: "CLOTHES",
    items: [
      "Bottoms",
      "Women's Clothing",
      "T-Shirts and Tops",
      "Dresses",
      "Outerwear",
      "Formal Wear",
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
  {
    title: "OUTDOOR",
    items: [
      "Casual Wear",
      "Seasonal Collections",
      "Sports Bras",
      "Workout Tops",
      "Fall Wardrobe",
    ],
  },
];

const bottomLinks = ["Login/Register", "Help & Support", "About us", "Blog"];

export default function MobileMenu({ isOpen, onClose }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState("Woman");

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling while menu is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleCategoryClick(category: string) {
    setActiveCategory((current) => (current === category ? "" : category));
  }

  return (
    /* OVERLAY BACKDROP: Dims the rest of the site on desktop and tablet */
    <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      {/* DRAWER CONTAINER:
          - Mobile: w-full
          - Tablet / Desktop: w-[400px] sliding from the left
      */}
      <aside
        className="
          relative h-full flex flex-col justify-between overflow-y-auto
          w-full sm:w-[400px] bg-[#f5f5f5] text-[#222] shadow-2xl
          animate-in slide-in-from-left duration-200
        "
      >
        {/* TOP BAR / CLOSE BUTTON */}
        <div>
          <header className="sticky top-0 z-10 flex h-[52px] items-center justify-center bg-white border-b border-gray-100">
            <button
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
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <div key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    aria-expanded={isActive}
                    className={`block w-full py-2.5 text-left text-xs transition-colors ${
                      isActive
                        ? "font-bold text-[#f47721]"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {category}
                  </button>

                  {/* WOMAN ACCORDION (2 columns sub-categories) */}
                  {isActive && category === "Woman" && (
                    <div className="grid grid-cols-2 gap-x-5 gap-y-5 rounded bg-white px-4 py-4 my-1 shadow-xs">
                      {womanGroups.map((group) => (
                        <div key={group.title}>
                          <h3 className="mb-2 text-[10px] font-bold tracking-wider uppercase text-gray-900 leading-tight">
                            {group.title}
                          </h3>

                          <ul className="flex flex-col gap-1.5">
                            {group.items.map((item) => (
                              <li key={item}>
                                <a
                                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-[10px] text-gray-500 hover:text-black transition-colors block"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM AUTH & INFO LINKS */}
        <div className="bg-white px-4 py-2 border-t border-gray-100 mt-auto">
          {bottomLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="flex min-h-[42px] items-center justify-between border-b border-gray-100 last:border-0 text-xs font-semibold text-gray-800 hover:bg-gray-50 px-1 transition"
            >
              {link}
              <span className="text-base font-normal text-gray-400">›</span>
            </a>
          ))}
        </div>
      </aside>

      {/* Clicking the backdrop outside the drawer closes it */}
      <div className="flex-1 hidden sm:block" onClick={onClose} />
    </div>
  );
}
