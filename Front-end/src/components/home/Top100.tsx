import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TopProductCard from "./TopProductCard";
import type { Product } from "../../types/product";

type Top100Props = {
  products: Product[];
};

export default function Top100({ products = [] }: Top100Props) {
  if (!products.length) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto py-6 px-4 sm:px-6 lg:px-[8.5%]">
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

      {/* Mobile: Swiper */}
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

      {/* Tablet & Desktop: Fluid Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center w-full">
        {products.map((product) => (
          <TopProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
