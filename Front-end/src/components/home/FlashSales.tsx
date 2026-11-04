import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import FlashSaleCard from "./FlashSaleCard";

import bagImage from "../../assets/home/flash-sales/bag.jpg";
import bagImage2 from "../../assets/home/flash-sales/bag-2.jpg";
import shoeImage from "../../assets/home/flash-sales/shoe.png";
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
    id: 1,
    brand: "Tonny Black",
    name: "Shoulder bag-White-Plain",
    image: bagImage2,
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
    image: shoeImage2,
    price: 112.02,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
];

export default function FlashSales() {
  return (
    <section className="w-full max-w-[480px] mx-auto py-4">
      {/* Section heading */}
      <div className="mb-5 flex items-center justify-between px-5">
        <h2 className="text-xl font-bold">Flash Sales</h2>

        <a
          href="/flash-sales"
          className="flex items-center gap-2 text-sm text-[#444]"
        >
          View all
          <span>›</span>
        </a>
      </div>

      {/* Carousel */}
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
      >
        {flashSales.map((product) => (
          <SwiperSlide key={product.id} className="!w-[220px]">
            <FlashSaleCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
