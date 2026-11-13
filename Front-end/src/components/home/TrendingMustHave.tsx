import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import TrendingCard from "./TrendingCard";
import type { TrendingProduct } from "../../types/product";

// 1. Declare the props type
type TrendingMustHaveProps = {
  products: TrendingProduct[];
};

// 2. Accept `products` here
export default function TrendingMustHave({
  products = [],
}: TrendingMustHaveProps) {
  if (!products.length) return null;

  return (
    <section
      className="
        w-full mx-auto py-6
        max-w-[438px] px-4
        sm:max-w-[991px] sm:px-6
        lg:max-w-[1440px] lg:px-[8.5%]
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 capitalize">
          Trending must-haves
        </h2>

        <a
          href="/trending"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          View all
          <span className="text-base leading-none">›</span>
        </a>
      </div>

      {/* Mobile: Swiper */}
      <div className="block sm:hidden -mx-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!w-[357px]">
              <TrendingCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet: Vertical Stack */}
      <div className="hidden sm:flex lg:hidden flex-col gap-6 items-center w-full">
        {products.map((product) => (
          <TrendingCard key={product.id} {...product} />
        ))}
      </div>

      {/* Desktop: 3 Columns Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6 justify-items-center w-full">
        {products.map((product) => (
          <TrendingCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
