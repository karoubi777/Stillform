import { useCountdown } from "../../hooks/useCountdown";

type FlashSaleCardProps = {
  brand: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  endTime: string;
};

export default function FlashSaleCard({
  brand,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  endTime,
}: FlashSaleCardProps) {
  const time = useCountdown(endTime);

  const discount = Math.round((1 - price / originalPrice) * 100);

  return (
    <article className="w-[220px] shrink-0 rounded-xl bg-white p-3 shadow-[0_2px_15px_rgba(0,0,0,0.10)]">
      {/* Countdown */}
      <div className="flex flex-col items-center pt-2">
        <h3 className="text-lg font-bold text-[#999]">Deal of the Day</h3>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-xl font-bold">
            {String(time.hours).padStart(2, "0")}
          </span>
          <span className="text-[#ccc]">:</span>
          <span className="text-xl font-bold">
            {String(time.minutes).padStart(2, "0")}
          </span>
          <span className="text-[#ccc]">:</span>
          <span className="text-xl font-bold">
            {String(time.seconds).padStart(2, "0")}
          </span>
        </div>

        <div className="flex w-[145px] justify-between text-xs text-[#999]">
          <span>hour</span>
          <span>min</span>
          <span>sec</span>
        </div>
      </div>

      {/* Product image */}
      <div className="mt-5 flex h-[165px] items-center justify-center">
        <img src={image} alt={name} className="h-full w-full object-contain" />
      </div>

      {/* Product information */}
      <div className="mt-3 px-2">
        <h4 className="text-base font-bold">{brand}</h4>

        <p className="mt-2 truncate text-sm text-[#666]">{name}</p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="text-[#ffb900]">
            {"★".repeat(Math.round(rating))}
          </span>
          <span className="text-[#777]">({reviews})</span>
        </div>

        {/* Product price */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#ff3b16]">
            ${price.toFixed(2)}
          </span>

          <span className="text-xs text-[#777] line-through">
            ${originalPrice.toFixed(2)}
          </span>

          <span className="rounded-sm bg-[#ff3b16] px-1.5 py-1 text-[9px] font-bold text-white">
            -{discount}%
          </span>
        </div>
      </div>

      {time.expired && (
        <p className="mt-2 text-center text-xs text-red-500">Sale ended</p>
      )}
    </article>
  );
}
