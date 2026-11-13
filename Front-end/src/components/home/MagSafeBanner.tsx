import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import type { MagSafeSlide } from "../../types/product";

import "swiper/css";
import "swiper/css/navigation";

type MagSafeBannerProps = {
  slides?: MagSafeSlide[];
};

export default function MagSafeBanner({ slides = [] }: MagSafeBannerProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!slides.length) return null;

  return (
    <section className="hidden sm:block w-full py-6 px-4 sm:px-6 lg:px-[8.5%]">
      {/* 
        Container caps at max 991px for tablet, up to 1440px for desktop.
        Height is capped at 221px.
      */}
      <div
        className="
          relative w-full max-w-[991px] lg:max-w-[1440px] mx-auto
          h-[221px] rounded-lg bg-[#FBE5D8] px-8 sm:px-12
          flex items-center shadow-xs overflow-hidden
        "
      >
        {/* Left Arrow Button */}
        <button
          ref={prevRef}
          type="button"
          aria-label="Previous slide"
          className="
            absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20
            p-2 text-gray-600 hover:text-black active:scale-95 transition-all
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

        {/* Carousel Slider */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          loop={slides.length > 1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation as NavigationOptions;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="h-full">
              <div className="flex items-center justify-between gap-4 md:gap-8 w-full h-full py-3">
                {/* 1. TEXT CONTENT
                    - Tablet: max-w-[268px]
                    - Desktop: max-w-[493px]
                */}
                <div className="flex flex-col justify-center w-full max-w-[268px] lg:max-w-[493px] text-left shrink-0">
                  <h3 className="text-sm sm:text-base lg:text-xl font-bold tracking-widest text-[#2E4A53] uppercase mb-1.5">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-snug lg:leading-normal">
                    {slide.description}
                  </p>
                </div>

                {/* 2. PRODUCT IMAGE
                    - Tablet: max-w-[289px]
                    - Desktop: max-w-[493px]
                    - Height is bounded to container (max 221px) with object-contain
                */}
                <div className="flex-1 flex items-center justify-center lg:justify-end h-full max-w-[289px] lg:max-w-[493px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[190px] w-full object-contain object-right"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Arrow Button */}
        <button
          ref={nextRef}
          type="button"
          aria-label="Next slide"
          className="
            absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20
            p-2 text-gray-600 hover:text-black active:scale-95 transition-all
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
  );
}
