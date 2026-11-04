import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import TopProductCard from "./TopProductCard";
import type { Product } from "../../types/product";

type Top100Props = {
  products: Product[];
};

export default function Top100({ products }: Top100Props) {
  return (
    <section className="w-full max-w-[480px] mx-auto py-4">
      {/* Heading */}
      <div className="mb-5 flex items-center justify-between px-3">
        <h2 className="text-xl font-bold">Top 100</h2>

        <a
          href="/top-100"
          className="flex items-center gap-2 text-sm text-[#444]"
        >
          View all
          <span>›</span>
        </a>
      </div>

      {/* Product carousel */}
      <Swiper
        slidesPerView="auto"
        spaceBetween={18}
        slidesOffsetBefore={10}
        slidesOffsetAfter={18}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!w-[min(72vw,250px)]">
            <TopProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
