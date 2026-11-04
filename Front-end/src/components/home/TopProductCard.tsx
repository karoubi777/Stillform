import { useState } from "react";
import type { Product } from "../../types/product";
import StarRating from "../StarRating";

type TopProductCardProps = Product;

export default function TopProductCard({
  brand,
  name,
  image,
  rating,
  reviews,
  price,
  originalPrice,
}: TopProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <article className="w-full overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      {/* Product image */}
      <div className="relative aspect-[4/5] w-full bg-[#f5f6f6]">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>

      {/* Product details */}
      <div className="p-4">
        {/* Brand and favourite button */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{brand}</h3>

          <button
            type="button"
            onClick={() => setIsFavorite((previous) => !previous)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            aria-pressed={isFavorite}
            className="shrink-0 text-2xl leading-none transition-transform active:scale-90"
          >
            <span className={isFavorite ? "text-red-500" : "text-[#374151]"}>
              {isFavorite ? "♥" : "♡"}
            </span>
          </button>
        </div>

        {/* Product name */}
        <p className="mt-1 truncate text-xs text-[#777]">{name}</p>

        {/* Rating and reviews */}
        <div className="mt-3 flex items-center gap-3">
          <StarRating rating={rating} />

          <span className="text-xs text-[#666]">({reviews})</span>
        </div>

        {/* Prices */}
        <div className="mt-3 flex items-center gap-3 whitespace-nowrap">
          <span className="text-sm font-bold text-[#ff3b16]">${price}</span>

          <span className="text-sm text-[#999] line-through">
            ${originalPrice}
          </span>

          <span className="text-xs text-[#ff3b16]">-{discount}%</span>
        </div>
      </div>
    </article>
  );
}
