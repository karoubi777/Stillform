import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { useCart } from "../../context/CartContext";
import type { Product, ProductVariant } from "../../types/product";

interface CompactProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, variant: ProductVariant) => void;
}

export default function CompactProductCard({
  product,
  onAddToCart,
}: CompactProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const favorited = isFavorite(product.id);
  const defaultVariant = product.variants[0];
  const thumbnail = product.image || defaultVariant?.images[0] || "";
  const isOutOfStock = !defaultVariant || defaultVariant.stock <= 0;

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  function handleAdd() {
    if (!defaultVariant) return;
    if (onAddToCart) {
      onAddToCart(product, defaultVariant);
    } else {
      addToCart(product, defaultVariant, 1);
    }
  }

  return (
    <article className="relative w-full h-[119px] border border-gray-100 rounded-md p-2.5 flex items-center gap-3 bg-white hover:shadow-xs transition-shadow">
      {/* Thumbnail */}
      <Link
        to={`/product/${product.id}`}
        state={{ product }}
        className="shrink-0"
      >
        <img
          src={thumbnail}
          alt={product.name}
          className="w-20 h-24 object-contain rounded bg-[#F5F6F6] p-1 hover:opacity-85 transition"
        />
      </Link>

      {/* Info & Action */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-1">
        <div>
          <div className="flex items-start justify-between gap-1.5">
            <Link
              to={`/product/${product.id}`}
              state={{ product }}
              className="block text-[11px] font-medium uppercase text-gray-900 truncate hover:underline flex-1 min-w-0"
            >
              {product.name}
            </Link>

            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label={
                favorited ? "Remove from favorites" : "Add to favorites"
              }
              className="shrink-0 p-0.5 transition-transform active:scale-90"
            >
              <svg
                className={`w-3.5 h-3.5 ${
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

          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="text-xs font-bold text-[#FF3B16]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discountPercent && (
              <span className="bg-[#FF3B16] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] leading-none">
                -{discountPercent}%
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAdd}
          className="w-full h-[30px] rounded border border-gray-300 text-[11px] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition flex items-center justify-center gap-2"
        >
          <span className="text-gray-500 font-normal">
            ${Math.round(product.price)}
          </span>
          <span className="font-semibold text-gray-800">
            {isOutOfStock ? "Out of stock" : "Add to cart"}
          </span>
        </button>
      </div>
    </article>
  );
}
