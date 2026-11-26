import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { mockCatalogProducts } from "../data/mock-general-products";
import { mockRelatedProducts } from "../data/mockProducts"; // Recommended products
import CatalogToolbar from "../components/catalog/CatalogToolbar";
import FilterSidebar from "../components/catalog/FilterSidebar";
import CatalogProductCard from "../components/catalog/CatalogProductCard";
import CatalogNotFound from "../components/catalog/ProductNotFound"; // <-- 1. Import new component
import type { Product, ProductFilterState, SortOption } from "../types/product";

const PRICE_MIN = 0;
const PRICE_MAX = 500;

export default function Catalogpage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("q") || "";
  const initialGender = searchParams.get("gender") || "All";

  const [rawProducts] = useState<Product[]>(mockCatalogProducts);

  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("favorite_product_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorite_product_ids", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function handleToggleFavorite(productId: number) {
    setFavoriteIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }

  const [filters, setFilters] = useState<ProductFilterState>({
    searchQuery: initialSearch,
    category: initialCategory,
    gender: initialGender,
    brandSearch: "",
    brands: [],
    models: [],
    styles: [],
    colors: [],
    sizes: [],
    minPrice: PRICE_MIN,
    maxPrice: PRICE_MAX,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      gender: searchParams.get("gender") || "All",
      category: searchParams.get("category") || "All",
      searchQuery: searchParams.get("q") || "",
    }));
    const urlSort = searchParams.get("sort") as SortOption | null;
    if (urlSort) setSortBy(urlSort);
    setCurrentPage(1);
  }, [searchParams]);

  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "popular",
  );
  const [pageSize, setPageSize] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  function handleFilterChange(next: ProductFilterState) {
    setFilters(next);
    setCurrentPage(1);
  }

  function handleResetFilters() {
    setFilters({
      searchQuery: "",
      category: "All",
      gender: "All",
      brandSearch: "",
      brands: [],
      models: [],
      styles: [],
      colors: [],
      sizes: [],
      minPrice: PRICE_MIN,
      maxPrice: PRICE_MAX,
    });
    setCurrentPage(1);
  }

  const filteredProducts = useMemo(() => {
    const q = filters.searchQuery.trim().toLowerCase();

    const filtered = rawProducts.filter((product) => {
      if (
        filters.gender !== "All" &&
        product.gender?.toLowerCase() !== filters.gender.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.category !== "All" &&
        product.category?.toLowerCase() !== filters.category.toLowerCase()
      ) {
        return false;
      }

      if (q) {
        const matchesQuery =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          (product.description?.toLowerCase().includes(q) ?? false) ||
          (product.model?.toLowerCase().includes(q) ?? false) ||
          (product.style?.toLowerCase().includes(q) ?? false) ||
          (product.category?.toLowerCase().includes(q) ?? false);
        if (!matchesQuery) return false;
      }

      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }

      if (
        filters.models.length > 0 &&
        (!product.model || !filters.models.includes(product.model))
      ) {
        return false;
      }

      if (
        filters.styles.length > 0 &&
        (!product.style || !filters.styles.includes(product.style))
      ) {
        return false;
      }

      if (filters.colors.length > 0) {
        const hasColor = product.variants?.some((v) =>
          filters.colors.includes(v.color.name),
        );
        if (!hasColor) return false;
      }

      if (filters.sizes.length > 0) {
        const hasSize = product.variants?.some((v) =>
          filters.sizes.includes(v.size ?? "One Size"),
        );
        if (!hasSize) return false;
      }

      if (
        product.price < filters.minPrice ||
        product.price > filters.maxPrice
      ) {
        return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return (b.reviews || 0) - (a.reviews || 0);
      }
    });
  }, [rawProducts, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const activeFilterCount =
    filters.brands.length +
    filters.models.length +
    filters.styles.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.minPrice > PRICE_MIN || filters.maxPrice < PRICE_MAX ? 1 : 0);

  const pageTitle = filters.searchQuery
    ? `Results for "${filters.searchQuery}"`
    : filters.category !== "All"
      ? filters.category
      : "All Products";

  return (
    <div className="w-full bg-white min-h-screen pb-14">
      <CatalogToolbar
        title={pageTitle}
        totalCount={filteredProducts.length}
        sortBy={sortBy}
        onSortChange={(val) => {
          setSortBy(val);
          setCurrentPage(1);
        }}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {/* Main Content: Sidebar (Left) + Content (Right) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[8.5%] pt-6 flex items-start gap-8">
        <FilterSidebar
          allProducts={rawProducts}
          filteredCount={filteredProducts.length}
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          minLimit={PRICE_MIN}
          maxLimit={PRICE_MAX}
          isMobileOpen={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* 2. Right Column (min-w-0 prevents Swiper from expanding infinitely) */}
        <div className="flex-1 min-w-0">
          {paginatedProducts.length === 0 ? (
            /* Render the Not Found Illustration + Swiper here */
            <CatalogNotFound
              searchQuery={filters.searchQuery}
              recommendedProducts={mockRelatedProducts}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {paginatedProducts.map((product) => (
                  <CatalogProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favoriteIds.includes(Number(product.id))}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded text-xs font-semibold transition ${
                          page === currentPage
                            ? "bg-[#242424] text-white"
                            : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
