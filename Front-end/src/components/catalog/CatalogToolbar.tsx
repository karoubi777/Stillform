import type { SortOption } from "../../types/product";

interface CatalogToolbarProps {
  title: string;
  totalCount: number;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  onOpenMobileFilter: () => void;
  activeFilterCount: number;
}

export default function CatalogToolbar({
  title,
  totalCount,
  sortBy,
  onSortChange,
  pageSize,
  onPageSizeChange,
  onOpenMobileFilter,
  activeFilterCount,
}: CatalogToolbarProps) {
  return (
    <>
      {/* Desktop & Tablet Top Gray Bar */}
      <div className="hidden sm:block w-full bg-[#F3F3F3] border-b border-gray-200/70">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[8.5%] py-4 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            <span className="text-xs text-gray-500">{totalCount} items</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Show X items */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>Show:</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="h-[34px] px-2.5 rounded border border-gray-300 bg-white text-xs text-gray-700 outline-none focus:border-gray-900"
              >
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort products"
              className="h-[34px] px-3 rounded border border-gray-300 bg-white text-xs text-gray-700 outline-none focus:border-gray-900"
            >
              <option value="popular">Sort by order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Top Controls (< 640px) */}
      <div className="sm:hidden px-4 pt-3 pb-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold text-gray-900">
            {title}{" "}
            <span className="text-xs font-normal text-gray-500">
              ({totalCount})
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              aria-label="Items per page"
              className="h-[30px] px-2 rounded border border-gray-300 bg-white text-[11px] text-gray-700 outline-none"
            >
              <option value={6}>Show 6</option>
              <option value={9}>Show 9</option>
              <option value={12}>Show 12</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort products"
              className="h-[30px] px-2 rounded border border-gray-300 bg-white text-[11px] text-gray-700 outline-none"
            >
              <option value="popular">Sort</option>
              <option value="price-asc">Low–High</option>
              <option value="price-desc">High–Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Full-width Mobile Filter Trigger Button */}
        <button
          type="button"
          onClick={onOpenMobileFilter}
          className="w-full h-[40px] rounded border border-gray-200 bg-white flex items-center justify-center gap-2 text-xs font-semibold text-gray-800 shadow-xs active:scale-[0.99] transition"
        >
          <svg
            className="w-4 h-4 text-[#FF8A00]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          <span>
            Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </span>
        </button>
      </div>
    </>
  );
}
