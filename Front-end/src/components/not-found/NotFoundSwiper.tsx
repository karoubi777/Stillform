// src/components/not-found/NotFoundSwiper.tsx
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";

import NotFoundProductCard from "./NotFoundProductCard";
import type { Product } from "../../types/product";

type NotFoundSwiperProps = {
  products: Product[];
};

export default function NotFoundSwiper({ products }: NotFoundSwiperProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!products.length) return null;

  return (
    <section className="w-full bg-[#F8F9FA] h-[411px] flex items-center py-4">
      <div className="w-full max-w-[991px] mx-auto px-4 sm:px-6 relative h-full flex items-center">
        {/* Left Arrow Button */}
        <button
          ref={prevRef}
          type="button"
          aria-label="Previous product"
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 p-2 text-gray-500 hover:text-black active:scale-95 transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={14}
          slidesOffsetBefore={24}
          slidesOffsetAfter={24}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation as NavigationOptions;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }}
          className="w-full h-[400px]"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!w-[206px]">
              <NotFoundProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Arrow Button */}
        <button
          ref={nextRef}
          type="button"
          aria-label="Next product"
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 p-2 text-gray-500 hover:text-black active:scale-95 transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
