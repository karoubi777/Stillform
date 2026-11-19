import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

interface CatalogProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
}

export default function CatalogProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: CatalogProductCardProps) {
  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  const filledStars = Math.round(product.rating);

  return (
    <div className="bg-white rounded-md border border-gray-100 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="block w-full aspect-[4/5] bg-[#F5F6F6] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
        />
      </Link>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col gap-1.5 text-left">
        {/* Brand + Name + Favorite Heart */}
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.id}`} className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-gray-900 truncate">
              {product.brand}
            </h3>
            <p className="text-[11px] text-gray-500 truncate mt-0.5">
              {product.name}
            </p>
          </Link>

          <button
            type="button"
            onClick={() => onToggleFavorite(product.id)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className="p-0.5 shrink-0 transition-transform active:scale-90"
          >
            <svg
              className={`w-4 h-4 ${
                isFavorite
                  ? "fill-[#FF3B16] text-[#FF3B16]"
                  : "fill-none text-gray-700 hover:text-[#FF3B16]"
              }`}
              stroke="currentColor"
              strokeWidth={1.7}
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
        <div className="flex items-center gap-1 mt-0.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < filledStars ? "text-[#FBBF24]" : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-gray-500">
            ({product.reviewCount || product.reviews})
          </span>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-bold text-[#FF3B16]">
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
          {discountPercent && (
            <span className="text-[10px] font-medium text-[#FF3B16]">
              -{discountPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
