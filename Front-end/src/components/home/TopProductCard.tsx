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
    <article
      className="
        flex flex-col justify-between overflow-hidden rounded-xl bg-white 
        shadow-[0_2px_15px_rgba(0,0,0,0.06)] hover:shadow-lg transition-shadow duration-200
        w-[260px] h-[480px]
        sm:w-[395px] sm:h-[480px]
        lg:w-[300px] lg:h-[480px]
        mx-auto
      "
    >
      {/* Product Image Area */}
      <div
        className="
          relative w-full shrink-0 overflow-hidden bg-[#F5F6F6]
          h-[327px]
          sm:h-[327px]
          lg:h-[327px]
        "
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-300 "
        />
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          {/* Brand & Favorite button */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-gray-900 truncate">
              {brand}
            </h3>

            <button
              type="button"
              onClick={() => setIsFavorite((prev) => !prev)}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              aria-pressed={isFavorite}
              className="shrink-0 text-xl leading-none transition-transform active:scale-90"
            >
              <span
                className={
                  isFavorite
                    ? "text-red-500"
                    : "text-gray-400 hover:text-gray-600"
                }
              >
                {isFavorite ? "♥" : "♡"}
              </span>
            </button>
          </div>

          {/* Product name / category */}
          <p className="mt-0.5 truncate text-xs text-gray-500">{name}</p>
        </div>

        <div>
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={rating} />
            <span className="text-[11px] text-gray-400">({reviews})</span>
          </div>

          {/* Pricing Row */}
          <div className="mt-2 flex items-center gap-2.5 whitespace-nowrap text-xs">
            <span className="text-sm font-bold text-[#FF3B16]">${price}</span>

            <span className="text-gray-400 line-through">${originalPrice}</span>

            <span className="text-[#FF3B16] font-semibold">-{discount}%</span>
          </div>
        </div>
      </div>
    </article>
  );
}
