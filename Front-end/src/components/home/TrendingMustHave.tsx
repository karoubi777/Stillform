import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import TrendingCard from "./TrendingCard";

import firstImage from "../../assets/home/trending/first-pic.jpg";
import secondImage from "../../assets/home/trending/second-pic.jpg";
import thirdImage from "../../assets/home/trending/third-pic.jpg";

const trendingProducts = [
  {
    id: 1,
    title: "Cool & Sexy Calvin Klein",
    description: "Dotted dress-Casual",
    price: 89,
    image: firstImage,
    isNewArrival: true,
  },
  {
    id: 2,
    title: "Cool & Sexy Calvin Klein",
    description: "Dotted dress-Casual",
    price: 89,
    image: secondImage,
    isNewArrival: false,
  },
  {
    id: 3,
    title: "beige coat Zara",
    description: "Cream-Brown-Formal",
    price: 102,
    image: thirdImage,
    isNewArrival: true,
  },
];

export default function TrendingMustHave() {
  return (
    <section
      className="
        w-full mx-auto py-6
        max-w-[438px] px-4
        sm:max-w-[991px] sm:px-6
        lg:max-w-[1440px] lg:px-[8.5%]
      "
    >
      {/* Header Row */}
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

      {/* 1. MOBILE ONLY (< 640px): Swiper Carousel (Width 357px per slide) */}
      <div className="block sm:hidden -mx-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
        >
          {trendingProducts.map((product) => (
            <SwiperSlide key={product.id} className="!w-[357px]">
              <TrendingCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. TABLET / LAPTOP (640px to 1023px): Vertical Stacked Column */}
      <div className="hidden sm:flex lg:hidden flex-col gap-6 items-center w-full">
        {trendingProducts.map((product) => (
          <TrendingCard key={product.id} {...product} />
        ))}
      </div>

      {/* 3. DESKTOP (>= 1024px): 3 Horizontal Columns */}
      <div className="hidden lg:grid grid-cols-3 gap-6 justify-items-center w-full">
        {trendingProducts.map((product) => (
          <TrendingCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
