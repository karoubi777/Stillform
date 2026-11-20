import { Link } from "react-router-dom";
import {
  CATEGORY_MENUS,
  buildCatalogUrl,
  type CategoryName,
} from "../../data/header";

type MegaMenuProps = {
  activeCategory: CategoryName | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onSelectLink: () => void;
};

export default function MegaMenu({
  activeCategory,
  onMouseEnter,
  onMouseLeave,
  onSelectLink,
}: MegaMenuProps) {
  if (!activeCategory) return null;

  const menuConfig = CATEGORY_MENUS[activeCategory];
  if (!menuConfig) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-[5%] lg:left-[8.5%] top-full z-50 mt-0.5 w-[90%] lg:w-[83%] max-w-[1100px] bg-white rounded-b-xl rounded-tr-xl shadow-2xl border border-gray-100 p-8 transition-all animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="flex gap-8 justify-between">
        {/* 4 Text Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 flex-1">
          {menuConfig.columns.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {col.map((section) => (
                <div key={section.title} className="flex flex-col gap-2.5">
                  <Link
                    to={buildCatalogUrl(activeCategory, {
                      sectionCategory: section.categoryParam,
                    })}
                    onClick={onSelectLink}
                    className="text-xs font-bold tracking-wider text-gray-900 uppercase hover:text-[#FF8A00] transition-colors"
                  >
                    {section.title}
                  </Link>
                  <ul className="flex flex-col gap-1.5">
                    {section.items.map((item) => (
                      <li key={item}>
                        <Link
                          to={buildCatalogUrl(activeCategory, {
                            sectionCategory: section.categoryParam,
                            query: item,
                          })}
                          onClick={onSelectLink}
                          className="text-[12px] text-gray-500 hover:text-[#FF8A00] hover:underline transition-colors block"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right Promo Photo (Only shown when that category defines promoImage) */}
        {menuConfig.promoImage && (
          <div className="hidden lg:block w-[280px] shrink-0 self-stretch rounded-xl overflow-hidden shadow-sm">
            <img
              src={menuConfig.promoImage}
              alt={menuConfig.promoAlt || `${activeCategory} collection`}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
