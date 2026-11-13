import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FlashSaleCard from "./FlashSaleCard";
import type { FlashSaleProduct } from "../../types/product";

type FlashSalesProps = {
  products: FlashSaleProduct[];
};

export default function FlashSales({ products = [] }: FlashSalesProps) {
  if (!products.length) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto py-6 px-4 sm:px-6 lg:px-[8.5%]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Flash Sales
        </h2>
        <a
          href="/flash-sales"
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
            <SwiperSlide key={product.id} className="!w-[200px]">
              <FlashSaleCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet & Desktop: Fluid Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center w-full">
        {products.map((product) => (
          <FlashSaleCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
