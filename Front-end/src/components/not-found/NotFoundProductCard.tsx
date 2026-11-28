// src/components/not-found/NotFoundProductCard.tsx
import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites"; // Adjust path to your hook
import type { Product } from "../../types/product";

interface NotFoundProductCardProps {
  product: Product;
  className?: string;
}

export default function NotFoundProductCard({
  product,
  className = "",
}: NotFoundProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  const filledStars = Math.round(product.rating || 5);
  const reviewTotal = product.reviewCount ?? product.reviews ?? 0;

  return (
    <article
      className={`w-[206px] h-[400px] bg-white rounded-md border border-gray-100 shadow-xs flex flex-col justify-between p-3.5 text-left hover:shadow-md transition-shadow ${className}`}
    >
      {/* Product Image Link */}
      <Link
        to={`/product/${product.id}`}
        state={{ product }}
        className="w-full h-[210px] flex items-center justify-center p-2 overflow-hidden bg-[#F5F6F6] rounded"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Card Body */}
      <div className="pt-2 flex flex-col justify-between flex-1">
        <div>
          {/* Brand/Title + Favorite Button */}
          <div className="flex items-start justify-between gap-1.5">
            <Link
              to={`/product/${product.id}`}
              state={{ product }}
              className="min-w-0 flex-1"
            >
              {product.brand && (
                <h4 className="text-[11px] font-bold text-gray-900 truncate">
                  {product.brand}
                </h4>
              )}
              <h3 className="text-xs font-medium text-gray-700 leading-snug line-clamp-2 mt-0.5">
                {product.name}
              </h3>
            </Link>

            {/* Favorite Heart Button */}
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label={
                favorited ? "Remove from favorites" : "Add to favorites"
              }
              className="p-1 shrink-0 transition-transform active:scale-90"
            >
              <svg
                className={`w-4 h-4 ${
                  favorited
                    ? "fill-[#FF3B16] text-[#FF3B16]"
                    : "fill-none text-gray-400 hover:text-[#FF3B16]"
                }`}
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
            </button>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < filledStars ? "text-[#FBBF24]" : "text-gray-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {reviewTotal > 0 && (
              <span className="text-[10px] text-gray-400">({reviewTotal})</span>
            )}
          </div>
        </div>

        {/* Pricing & Discount */}
        <div className="flex items-center gap-2 mt-2 pt-1 border-t border-gray-50">
          <span className="text-xs sm:text-sm font-bold text-[#FF3B16]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {discountPercent && (
            <span className="text-[10px] font-semibold text-[#FF3B16] ml-auto">
              -{discountPercent}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
 