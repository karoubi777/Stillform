import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";

// Put your 404 illustration in public/images/not-found.png
const NO_RESULTS_ILLUSTRATION = "/images/not-found.png";

import { mockRelatedProducts } from "../data/mockProducts";
import type { Product } from "../types/product";

type NotFoundPageProps = {
  relatedProducts?: Product[];
};

export default function NotFoundPage({
  relatedProducts = mockRelatedProducts,
}: NotFoundPageProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full bg-white flex flex-col justify-between">
      {/* ========================================================
          1. TOP 404 NOT FOUND SECTION (Height ~427px, max-w: 991px)
         ======================================================== */}
      <section className="w-full min-h-[427px] max-w-[991px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 my-auto py-8 text-left">
        {/* Left: Illustration */}
        <div className="w-full max-w-[260px] sm:max-w-[320px] flex items-center justify-center shrink-0 mx-auto sm:mx-0">
          <img
            src={NO_RESULTS_ILLUSTRATION}
            alt="Page not found"
            className="w-full h-auto object-contain block mx-auto"
          />
        </div>

        {/* Right: 404 Information Card */}
        <div className="w-full max-w-[430px] rounded-xl border border-gray-200 bg-white p-6 shadow-xs mx-auto sm:mx-0 flex flex-col gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A00] block mb-1">
              Error 404
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-snug">
              Oops! Page not found.
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Back to main page action button */}
          <div className="pt-2">
            <Link
              to="/"
              className="
                inline-flex items-center justify-center gap-2
                w-full sm:w-auto px-6 h-[44px] rounded bg-[#3B72D9] 
                hover:bg-[#2C62C9] active:scale-[0.99] transition-all
                text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <span>Back to the main page</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. BOTTOM RELATED PRODUCTS SWIPER (Height: 411px)
         ======================================================== */}
      <section className="w-full bg-[#F8F9FA] h-[411px] flex items-center py-4">
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
                {/* Product Card: 206px x 400px */}
                <article className="w-[206px] h-[400px] bg-white rounded-md border border-gray-100 shadow-xs flex flex-col justify-between p-4 text-left">
                  {/* Image Container */}
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
