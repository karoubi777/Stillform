import { Link } from "react-router-dom";
import { useCountdown } from "../../hooks/useCountdown";
import type { FlashSaleProduct } from "../../types/product";

type FlashSaleCardProps = FlashSaleProduct;

export default function FlashSaleCard(product: FlashSaleCardProps) {
  const {
    id,
    brand,
    name,
    image,
    price,
    originalPrice,
    rating,
    reviews = 0,
    endTime,
  } = product;

  const time = useCountdown(endTime);
  const discount =
    originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <article className="flex flex-col justify-between rounded-2xl bg-white p-4 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg transition-shadow w-full max-w-[396px] lg:max-w-[300px] h-[380px] mx-auto">
      {/* Countdown Timer Header */}
      <div className="flex flex-col items-center pt-1 shrink-0">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-400 tracking-wide">
          Deal of the Day
        </h3>

        <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
          <span className="text-base sm:text-lg font-extrabold text-gray-800">
            {String(time.hours).padStart(2, "0")}
          </span>
          <span className="text-gray-300 text-xs sm:text-sm font-bold">:</span>
          <span className="text-base sm:text-lg font-extrabold text-gray-800">
            {String(time.minutes).padStart(2, "0")}
          </span>
          <span className="text-gray-300 text-xs sm:text-sm font-bold">:</span>
          <span className="text-base sm:text-lg font-extrabold text-gray-800">
            {String(time.seconds).padStart(2, "0")}
          </span>
        </div>

        <div className="flex w-[120px] sm:w-[130px] justify-between text-[10px] text-gray-400">
          <span>hour</span>
          <span>min</span>
          <span>sec</span>
        </div>
      </div>

      {/* Image Link */}
      <Link
        to={`/product/${id}`}
        state={{ product }}
        className="my-auto flex flex-1 w-full min-h-0 items-center justify-center p-2"
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain hover:scale-105 transition-transform duration-200"
        />
      </Link>

      {/* Info */}
      <div className="pt-2 shrink-0">
        <Link to={`/product/${id}`} state={{ product }} className="block">
          <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight truncate hover:underline">
            {brand}
          </h4>
          <p className="mt-1 truncate text-xs sm:text-sm text-gray-500">
            {name}
          </p>
        </Link>

        <div className="mt-1.5 flex items-center gap-1.5 text-xs">
          <span className="text-[#FFB900]">
            {"★".repeat(Math.round(rating))}
          </span>
          <span className="text-gray-400 text-[11px]">({reviews})</span>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-sm sm:text-base font-bold text-[#FF3B16]">
            ${price.toFixed(2)}
          </span>
          {originalPrice > price && (
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded bg-[#FF3B16] px-1.5 py-0.5 text-[10px] font-bold text-white leading-tight">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
