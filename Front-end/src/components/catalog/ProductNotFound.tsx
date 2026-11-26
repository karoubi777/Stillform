// src/components/catalog/CatalogNotFound.tsx
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";

import type { Product } from "../../types/product";

// Adjust path to your illustration in public/images
const NO_RESULTS_ILLUSTRATION = "/images/not-found.png";

type CatalogNotFoundProps = {
  searchQuery: string;
  recommendedProducts: Product[];
  onResetFilters: () => void;
};

export default function CatalogNotFound({
  searchQuery,
  recommendedProducts = [],
  onResetFilters,
}: CatalogNotFoundProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full flex flex-col gap-10 min-w-0">
      {/* ========================================================
          1. TOP NOT FOUND INFO (Illustration + Advice Box)
         ======================================================== */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-10 py-6 text-left">
        {/* Left: Illustration */}
        <div className="w-full max-w-[220px] sm:max-w-[260px] flex items-center justify-center shrink-0 mx-auto sm:mx-0">
          <img
            src={NO_RESULTS_ILLUSTRATION}
            alt="No products found"
            className="w-full h-auto object-contain block"
          />
        </div>

        {/* Right: Advice Information Card */}
        <div className="w-full max-w-[420px] rounded-xl border border-gray-200 bg-white p-5 shadow-xs mx-auto sm:mx-0 flex flex-col gap-3">
          <h2 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
            No results were found for searching &quot;
            {searchQuery || "selected filters"}&quot;.
          </h2>

          <div className="flex flex-col gap-2.5 text-xs text-gray-600">
            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#FF8A00] text-[#FF8A00] text-[10px] font-bold shrink-0 mt-0.5">
                !
              </span>
              <p className="leading-relaxed">
                We recommend you to search different clear key words to get the
                best result.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#FF8A00] text-[#FF8A00] text-[10px] font-bold shrink-0 mt-0.5">
                !
              </span>
              <p className="leading-relaxed">
                You can see the most related purchased products bellow.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onResetFilters}
              className="px-4 h-[32px] rounded bg-[#3B72D9] text-white text-xs font-semibold hover:bg-[#2C62C9] active:scale-95 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. BOTTOM RELATED PRODUCTS SWIPER
          - Contained so it NEVER causes horizontal scroll overflow
         ======================================================== */}
      {recommendedProducts.length > 0 && (
        <div className="w-full bg-[#F8F9FA] rounded-xl p-4 sm:p-6 relative min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">
              Related Purchased Products
            </h3>

            {/* Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                ref={prevRef}
                type="button"
                className="w-7 h-7 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-black active:scale-95 transition"
              >
                ‹
              </button>
              <button
                ref={nextRef}
                type="button"
                className="w-7 h-7 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-black active:scale-95 transition"
              >
                ›
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={14}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                const navigation = swiper.params
                  .navigation as NavigationOptions;
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }}
              className="w-full"
            >
              {recommendedProducts.map((product) => (
                <SwiperSlide key={product.id} className="!w-[206px]">
                  <article className="w-[206px] h-[380px] bg-white rounded-md border border-gray-100 shadow-xs flex flex-col justify-between p-3.5 text-left">
                    <div className="w-full h-[200px] flex items-center justify-center p-2 overflow-hidden bg-[#F5F6F6] rounded">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[#FFB900] text-xs mt-1">
                        {"★".repeat(Math.round(product.rating || 5))}
                      </div>
                      <div className="flex items-center gap-2 text-xs mt-2">
                        <span className="font-bold text-[#FF3B16] text-sm">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-[11px]">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
