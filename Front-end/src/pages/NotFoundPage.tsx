import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";

// Replace with your illustration path
const NO_RESULTS_ILLUSTRATION = "/images/not-found.png";

import { mockRelatedProducts } from "../mockProducts";
import type { Product } from "../types/product";

type NotFoundPageProps = {
  relatedProducts?: Product[];
};

export default function NotFoundPage({
  relatedProducts = mockRelatedProducts,
}: NotFoundPageProps) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "Blue Sony Camera";

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full bg-white flex flex-col justify-between">
      {/* ========================================================
          1. TOP NOT FOUND SECTION (Height: 427px, max-w: 991px)
          - Centered horizontally and vertically
         ======================================================== */}
      <section className="w-full min-h-[427px] max-w-[991px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 my-auto py-8">
        {/* Left: Illustration (Centered on mobile) */}
        <div className="w-full max-w-[260px] sm:max-w-[320px] flex items-center justify-center shrink-0 mx-auto sm:mx-0">
          <img
            src={NO_RESULTS_ILLUSTRATION}
            alt="No results found"
            className="w-full h-auto object-contain block mx-auto"
          />
        </div>

        {/* Right: Information Card (Centered on mobile) */}
        <div className="w-full max-w-[430px] rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs text-left mx-auto sm:mx-0">
          <h2 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug mb-3">
            No results were found for searching &quot;{searchQuery}&quot;.
          </h2>

          <div className="flex flex-col gap-3 text-xs text-gray-600">
            {/* Advice 1 */}
            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#FF8A00] text-[#FF8A00] text-[10px] font-bold shrink-0 mt-0.5">
                !
              </span>
              <p className="leading-relaxed">
                We recommend you to search different clear key words to get the
                best result.
              </p>
            </div>

            {/* Advice 2 */}
            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#FF8A00] text-[#FF8A00] text-[10px] font-bold shrink-0 mt-0.5">
                !
              </span>
              <p className="leading-relaxed">
                You can see the most related purchased products bellow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. BOTTOM RELATED PRODUCTS SWIPER (Height: 411px)
          - Exactly aligned with footer using max-w-[991px]
         ======================================================== */}
      <section className="w-full bg-[#F8F9FA] h-[411px] flex items-center py-4">
        {/* Container matches footer width (max-w-[991px]) */}
        <div className="w-full max-w-[991px] mx-auto px-4 sm:px-6 relative h-full flex items-center">
          {/* Left Arrow Button */}
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous product"
            className="
              absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20
              p-2 text-gray-500 hover:text-black active:scale-95 transition-all
            "
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

          {/* Swiper Slider */}
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
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id} className="!w-[206px]">
                {/* Product Card: Exactly 206px width, 400px height */}
                <article className="w-[206px] h-[400px] bg-white rounded-md border border-gray-100 shadow-xs flex flex-col justify-between p-4 text-left">
                  {/* Image Container with object-contain */}
                  <div className="w-full h-[220px] flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="pt-2 flex flex-col justify-end">
                    <h3 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2 mb-2">
                      {product.name}
                    </h3>

                    {/* Stars */}
                    <div className="flex items-center gap-1 text-[#FFB900] text-xs mb-2">
                      {"★".repeat(Math.round(product.rating || 5))}
                    </div>

                    {/* Price Row */}
                    <div className="flex items-center gap-2 text-xs">
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

          {/* Right Arrow Button */}
          <button
            ref={nextRef}
            type="button"
            aria-label="Next product"
            className="
              absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20
              p-2 text-gray-500 hover:text-black active:scale-95 transition-all
            "
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
    </div>
  );
}
