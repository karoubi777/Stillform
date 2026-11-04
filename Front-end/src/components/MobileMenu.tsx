import { useState } from "react";

type MenuProps = {
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

export default function MobileMenu({ onClose }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState("Woman");

  function handleCategoryClick(category: string) {
    setActiveCategory((current) => (current === category ? "" : category));
  }

  return (
    <section className="w-full max-w-[480px] mx-auto bg-[#f5f5f5] text-[#222]">
      
      <header className="relative flex h-[52px] items-center justify-center bg-white">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="absolute left-3 text-xl font-light h-full flex items-center justify-center p-0.5 active:scale-90 transition"
        >
          ×
        </button>

        <h2 className="text-sm font-semibold">Menu</h2>
      </header>

      
      <nav className="px-[9px] pt-3 pb-4">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <div key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                aria-expanded={isActive}
                className={`block w-full py-[9px] text-left text-[11px] ${
                  isActive ? "font-semibold text-[#f47721]" : "text-[#666]"
                }`}
              >
                {category}
              </button>

             
              {isActive && category === "Woman" && (
                <div className="grid grid-cols-2 gap-x-5 gap-y-5 rounded-sm bg-white px-3 py-4 mb-1">
                  {womanGroups.map((group) => (
                    <div key={group.title}>
                      <h3 className="mb-2 text-[9px] font-semibold leading-tight">
                        {group.title}
                      </h3>

                      <ul className="flex flex-col gap-[6px]">
                        {group.items.map((item) => (
                          <li key={item} className="text-[9px] text-[#777]">
                            {item}
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

    
      <div className="bg-white px-[11px] py-2">
        {bottomLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="flex min-h-[38px] items-center justify-between border-b border-[#eeeeee] last:border-0 text-[11px] font-semibold"
          >
            {link}
            <span className="text-sm font-normal text-[#777]">›</span>
          </a>
        ))}
      </div>
    </section>
  );
}
