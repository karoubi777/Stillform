import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Product } from "../../types/product";

type SearchBarProps = {
  products?: Product[];
  categories?: string[];
};

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_DELAY = 300;
const MAX_SUGGESTIONS = 5;

export default function SearchBar({
  products = [],
  categories = ["men", "women"],
}: SearchBarProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // 1. Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. Debounced search filter
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const normalizedQuery = trimmedQuery.toLowerCase();

      const matches = products.filter((product) => {
        const matchesText = product.name
          .toLowerCase()
          .includes(normalizedQuery);
        const matchesCategory =
          category === "all" ||
          product.category?.toLowerCase() === category.toLowerCase();

        return matchesText && matchesCategory;
      });

      setSuggestions(matches.slice(0, MAX_SUGGESTIONS));
      setIsOpen(true);
    }, DEBOUNCE_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [query, category, products]);

  function handleSelect(product: Product) {
    setIsOpen(false);
    setQuery("");
    // Falls back to product.id if slug is not defined
    const targetPath = product.slug || product.id;
    navigate(`/products/${targetPath}`);
  }

  function handleSubmit(event?: React.SubmitEvent<HTMLFormElement>) {
    if (event) event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const params = new URLSearchParams({
      q: trimmedQuery,
      category,
    });

    setIsOpen(false);
    navigate(`/search?${params.toString()}`);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[440px] md:max-w-[345px]"
    >
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex items-center h-[50px] md:h-[45px] w-full border border-gray-300 bg-white rounded"
      >
        <input
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="h-full min-w-0 flex-1 px-3 text-sm text-gray-800 outline-none"
        />

        <div className="h-6 w-px bg-gray-300" />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Product category"
          className="h-full max-w-[120px] bg-white px-2 text-sm capitalize text-gray-700 outline-none"
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          aria-label="Search"
          className="h-full px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Suggestion Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full border border-gray-200 bg-white shadow-lg rounded-b-md overflow-hidden">
          {suggestions.length > 0 ? (
            <ul role="listbox" aria-label="Search suggestions">
              {suggestions.map((product) => (
                <li key={product.id} role="option" aria-selected="false">
                  <button
                    type="button"
                    onClick={() => handleSelect(product)}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 focus:bg-gray-50 outline-none transition-colors border-b border-gray-50 last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 shrink-0 object-contain rounded bg-[#F5F6F6] p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-xs sm:text-sm font-medium text-gray-900">
                        {product.name}
                      </span>
                      <span className="block text-xs text-gray-500 font-semibold mt-0.5">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-4 text-xs sm:text-sm text-gray-500 text-center">
              No matching products found.
            </p>
          )}

          <button
            type="button"
            onClick={() => handleSubmit()}
            className="w-full border-t border-gray-200 px-3 py-2.5 text-center text-xs font-semibold text-[#3B72D9] hover:bg-gray-50 transition-colors"
          >
            View all results
          </button>
        </div>
      )}
    </div>
  );
}
