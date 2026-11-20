import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

interface TopProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function TopProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: TopProductCardProps) {
  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  return (
    <article className="w-full max-w-[300px] bg-white rounded-md border border-gray-100 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <Link
        to={`/product/${product.id}`}
        state={{ product }}
        className="block w-full aspect-[4/5] bg-[#F5F6F6] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
        />
      </Link>

      <div className="p-3.5 flex flex-col gap-1.5 text-left">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/catalog/${product.id}`}
            state={{ product }}
            className="min-w-0 flex-1"
          >
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

        <div className="flex items-center gap-1 text-xs">
          <span className="text-[#FFB900]">
            {"★".repeat(Math.round(product.rating))}
          </span>
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-bold text-[#FF3B16]">
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-medium text-[#FF3B16]">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
