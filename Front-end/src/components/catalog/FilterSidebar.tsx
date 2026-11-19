import { useState, useMemo } from "react";
import type { Product, ProductFilterState } from "../../types/product";

interface FilterSidebarProps {
  allProducts: Product[];
  filteredCount: number;
  filters: ProductFilterState;
  onChange: (next: ProductFilterState) => void;
  onReset: () => void;
  minLimit: number;
  maxLimit: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const STYLE_OPTIONS = ["Casual", "Business casual", "Bohemian", "Minimalist"];
const SIZE_OPTIONS = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];
const COLOR_OPTIONS = [
  { name: "Red", hex: "#EF4444" },
  { name: "Beige", hex: "#F5E6D3" },
  { name: "Blue", hex: "#60A5FA" },
  { name: "Orange", hex: "#FB923C" },
  { name: "Yellow", hex: "#FCD34D" },
  { name: "Green", hex: "#34D399" },
  { name: "Purple", hex: "#8B5CF6" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Brown", hex: "#A16207" },
  { name: "Black", hex: "#374151" },
  { name: "Gray", hex: "#D1D5DB" },
  { name: "White", hex: "#FFFFFF" },
];

function SectionHeader({
  title,
  isOpen,
  onToggle,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wide text-gray-800 py-1"
    >
      <span>{title}</span>
      <svg
        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
          isOpen ? "" : "rotate-180"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
}

export default function FilterSidebar({
  allProducts,
  filteredCount,
  filters,
  onChange,
  onReset,
  minLimit,
  maxLimit,
  isMobileOpen,
  onCloseMobile,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    brand: true,
    model: true,
    style: true,
    color: true,
    size: true,
    price: true,
  });

  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  function toggleArrayValue(list: string[], val: string): string[] {
    return list.includes(val) ? list.filter((v) => v !== val) : [...list, val];
  }

  // Extract unique brands from rawProducts and filter by brandSearch
  const availableBrands = useMemo(() => {
    const unique = Array.from(new Set(allProducts.map((p) => p.brand)));
    const q = filters.brandSearch.trim().toLowerCase();
    return q ? unique.filter((b) => b.toLowerCase().includes(q)) : unique;
  }, [allProducts, filters.brandSearch]);

  // Compute model counts from rawProducts (non-destructive)
  const modelCounts = useMemo(() => {
    const map = new Map<string, number>();
    allProducts.forEach((p) => {
      if (p.model) {
        map.set(p.model, (map.get(p.model) ?? 0) + 1);
      }
    });
    return Array.from(map.entries());
  }, [allProducts]);

  const minPercent =
    maxLimit > minLimit
      ? ((filters.minPrice - minLimit) / (maxLimit - minLimit)) * 100
      : 0;
  const maxPercent =
    maxLimit > minLimit
      ? ((filters.maxPrice - minLimit) / (maxLimit - minLimit)) * 100
      : 100;

  const panelContent = (
    <div className="w-full flex flex-col divide-y divide-gray-200 text-left">
      {/* Header */}
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
          <span className="text-xs font-bold text-gray-900">
            All Categories
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-[#3B72D9] hover:underline"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            className="sm:hidden text-gray-500 hover:text-black text-sm font-bold px-1"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 1. BRAND (Search + Checkboxes) */}
      <div className="py-4">
        <SectionHeader
          title="BRAND"
          isOpen={openSections.brand}
          onToggle={() => toggleSection("brand")}
        />
        {openSections.brand && (
          <div className="mt-3 flex flex-col gap-2.5">
            <div className="relative">
              <input
                type="text"
                value={filters.brandSearch}
                onChange={(e) =>
                  onChange({ ...filters, brandSearch: e.target.value })
                }
                placeholder="Search"
                className="w-full h-[34px] pl-3 pr-8 rounded border border-gray-200 text-xs text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-900"
              />
              <svg
                className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
              {availableBrands.length === 0 ? (
                <p className="text-[11px] text-gray-400">No brands found</p>
              ) : (
                availableBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() =>
                        onChange({
                          ...filters,
                          brands: toggleArrayValue(filters.brands, brand),
                        })
                      }
                      className="w-3.5 h-3.5 rounded text-[#3B72D9] focus:ring-0"
                    />
                    <span>{brand}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. MODEL */}
      <div className="py-4">
        <SectionHeader
          title="MODEL"
          isOpen={openSections.model}
          onToggle={() => toggleSection("model")}
        />
        {openSections.model && (
          <div className="mt-3 flex flex-col gap-2">
            {modelCounts.map(([modelName, count]) => {
              const active = filters.models.includes(modelName);
              return (
                <button
                  key={modelName}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      models: toggleArrayValue(filters.models, modelName),
                    })
                  }
                  className={`flex items-center justify-between text-xs text-left transition-colors ${
                    active
                      ? "font-bold text-[#3B72D9]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span>{modelName}</span>
                  <span className="text-[11px] text-gray-400">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. STYLE */}
      <div className="py-4">
        <SectionHeader
          title="STYLE"
          isOpen={openSections.style}
          onToggle={() => toggleSection("style")}
        />
        {openSections.style && (
          <div className="mt-3 flex flex-col gap-2">
            {STYLE_OPTIONS.map((style) => (
              <label
                key={style}
                className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={filters.styles.includes(style)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      styles: toggleArrayValue(filters.styles, style),
                    })
                  }
                  className="w-3.5 h-3.5 rounded text-[#3B72D9] focus:ring-0"
                />
                <span>{style}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. COLOR */}
      <div className="py-4">
        <SectionHeader
          title="COLOR"
          isOpen={openSections.color}
          onToggle={() => toggleSection("color")}
        />
        {openSections.color && (
          <div className="mt-3 grid grid-cols-6 gap-2">
            {COLOR_OPTIONS.map((color) => {
              const isSelected = filters.colors.includes(color.name);
              const isLight = color.name === "White" || color.name === "Beige";

              return (
                <div
                  key={color.name}
                  className="relative flex items-center justify-center"
                >
                  {hoveredColor === color.name && (
                    <span className="absolute -top-7 z-20 px-2 py-0.5 rounded bg-[#242424] text-white text-[10px] whitespace-nowrap pointer-events-none">
                      {color.name}
                    </span>
                  )}
                  <button
                    type="button"
                    aria-label={color.name}
                    onMouseEnter={() => setHoveredColor(color.name)}
                    onMouseLeave={() => setHoveredColor(null)}
                    onClick={() =>
                      onChange({
                        ...filters,
                        colors: toggleArrayValue(filters.colors, color.name),
                      })
                    }
                    style={{ backgroundColor: color.hex }}
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-transform hover:scale-110 ${
                      isLight ? "border-gray-300" : "border-transparent"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className={`w-3 h-3 ${
                          isLight ? "text-gray-800" : "text-white"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. SIZE */}
      <div className="py-4">
        <SectionHeader
          title="SIZE"
          isOpen={openSections.size}
          onToggle={() => toggleSection("size")}
        />
        {openSections.size && (
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {SIZE_OPTIONS.map((size) => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      sizes: toggleArrayValue(filters.sizes, size),
                    })
                  }
                  className={`h-[28px] rounded border text-[11px] font-medium transition-colors ${
                    active
                      ? "bg-[#D7E3F4] border-[#B4C8E4] text-gray-900"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. PRICE */}
      <div className="py-4">
        <SectionHeader
          title="PRICE"
          isOpen={openSections.price}
          onToggle={() => toggleSection("price")}
        />
        {openSections.price && (
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min={minLimit}
                  max={filters.maxPrice}
                  value={filters.minPrice}
                  onChange={(e) => {
                    const val = Math.max(
                      minLimit,
                      Math.min(
                        Number(e.target.value) || minLimit,
                        filters.maxPrice,
                      ),
                    );
                    onChange({ ...filters, minPrice: val });
                  }}
                  className="w-full h-[34px] pl-5 pr-2 rounded border border-gray-200 text-xs text-gray-700 outline-none focus:border-gray-900"
                />
              </div>
              <span className="text-gray-400 text-xs">–</span>
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min={filters.minPrice}
                  max={maxLimit}
                  value={filters.maxPrice}
                  onChange={(e) => {
                    const val = Math.min(
                      maxLimit,
                      Math.max(
                        Number(e.target.value) || maxLimit,
                        filters.minPrice,
                      ),
                    );
                    onChange({ ...filters, maxPrice: val });
                  }}
                  className="w-full h-[34px] pl-5 pr-2 rounded border border-gray-200 text-xs text-gray-700 outline-none focus:border-gray-900"
                />
              </div>
            </div>

            {/* Dual-Handle Slider */}
            <div className="relative h-5 flex items-center">
              <div className="w-full h-1 bg-gray-200 rounded-full relative">
                <div
                  style={{
                    left: `${minPercent}%`,
                    width: `${Math.max(0, maxPercent - minPercent)}%`,
                  }}
                  className="absolute h-full bg-[#3B72D9] rounded-full"
                />
              </div>
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={filters.minPrice}
                onChange={(e) => {
                  const val = Math.min(
                    Number(e.target.value),
                    filters.maxPrice,
                  );
                  onChange({ ...filters, minPrice: val });
                }}
                className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#3B72D9] [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={filters.maxPrice}
                onChange={(e) => {
                  const val = Math.max(
                    Number(e.target.value),
                    filters.minPrice,
                  );
                  onChange({ ...filters, maxPrice: val });
                }}
                className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#3B72D9] [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>Minimum ${minLimit}</span>
              <span>Maximum ${maxLimit}</span>
            </div>

            <p className="text-[11px] text-gray-500 mt-1">
              {filteredCount} products found
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden sm:block w-[220px] lg:w-[250px] shrink-0">
        {panelContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-50 flex sm:hidden bg-black/40"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[82%] max-w-[300px] h-full bg-white p-5 overflow-y-auto shadow-2xl"
          >
            {panelContent}
          </div>
        </div>
      )}
    </>
  );
}
