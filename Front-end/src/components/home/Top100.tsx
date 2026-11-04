import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import TopProductCard from "./TopProductCard";
import type { Product } from "../../types/product";

type Top100Props = {
  products: Product[];
};

export default function Top100({ products }: Top100Props) {
  return (
    <section
      className="
        w-full mx-auto py-6
        max-w-[438px] px-4
        sm:max-w-[991px] sm:px-6
        lg:max-w-[1440px] lg:px-[8.5%]
      "
    >
      {/* Heading Row */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Top 100
        </h2>

        <a
          href="/top-100"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          View all
          <span className="text-base leading-none">›</span>
        </a>
      </div>

      {/* 1. MOBILE ONLY (< 640px): Swiper Carousel (Width 260px per slide) */}
      <div className="block sm:hidden -mx-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!w-[260px]">
              <TopProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. TABLET / LAPTOP (640px to 1023px): 2x2 Grid */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6 justify-items-center w-full">
        {products.map((product) => (
          <TopProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* 3. DESKTOP (>= 1024px): 4 Columns Row */}
      <div className="hidden lg:grid grid-cols-4 gap-6 justify-items-center w-full">
        {products.map((product) => (
          <TopProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
