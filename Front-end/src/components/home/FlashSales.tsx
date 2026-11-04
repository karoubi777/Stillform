import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import FlashSaleCard from "./FlashSaleCard";

import bagImage from "../../assets/home/flash-sales/bag.jpg";
import shoeImage from "../../assets/home/flash-sales/shoe.png";
import bagImage2 from "../../assets/home/flash-sales/bag-2.jpg";
import shoeImage2 from "../../assets/home/flash-sales/shoe2.jpg";

const flashSales = [
  {
    id: 1,
    brand: "Tonny Black",
    name: "Shoulder bag-White-Plain",
    image: bagImage,
    price: 69.99,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    brand: "Reebok",
    name: "Women's Powder sneakers",
    image: shoeImage,
    price: 112.02,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    brand: "Patso",
    name: "Shoulder bag-Pink-Plain",
    image: bagImage2,
    price: 69.99,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(
      Date.now() + 2 * 60 * 60 * 1000 + 14 * 60 * 1000,
    ).toISOString(),
  },
  {
    id: 4,
    brand: "Sketchers",
    name: "Sport-shoe D'LIT",
    image: shoeImage2,
    price: 80.2,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
  },
];

export default function FlashSales() {
  return (
    <section className="w-full max-w-[1440px] mx-auto py-6 px-4 sm:px-6 lg:px-[8.5%]">
      {/* Section heading */}
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

      {/* 1. MOBILE ONLY (< 640px): Swiper Carousel */}
      <div className="block sm:hidden -mx-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
        >
          {flashSales.map((product) => (
            <SwiperSlide key={product.id} className="!w-[200px]">
              <FlashSaleCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. LAPTOP (sm to lg: 2x2 grid) & DESKTOP (lg+: 4-column row) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {flashSales.map((product) => (
          <FlashSaleCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
