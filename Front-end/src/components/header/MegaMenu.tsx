import { WOMAN_DROPDOWN_COLUMNS } from "../../data/header"; // Adjust path if needed
import womanPromoImage from "../../assets/home/image-363.png";

type MegaMenuProps = {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function MegaMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-[5%] lg:left-[8.5%] top-full z-50 mt-0.5 w-[90%] lg:w-[83%] max-w-[1100px] bg-white rounded-b-xl rounded-tr-xl shadow-2xl border border-gray-100 p-8 transition-all animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="flex gap-8 justify-between">
        {/* 4 Text Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 flex-1">
          {WOMAN_DROPDOWN_COLUMNS.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {col.map((section) => (
                <div key={section.title} className="flex flex-col gap-2.5">
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

        {/* Right Promo Model Photo (Desktop Only) */}
        <div className="hidden lg:block w-[280px] shrink-0 self-stretch rounded-xl overflow-hidden shadow-sm">
          <img
            src={womanPromoImage}
            alt="Woman fashion collection"
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
