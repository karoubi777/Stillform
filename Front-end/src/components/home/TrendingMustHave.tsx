import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import TrendingCard from "../home/TrendingCard";

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
    title: "Nice casual outfit",
    description: "Dotted dress-Casual",
    price: 75,
    image: secondImage,
    isNewArrival: true,
  },
  {
    id: 3,
    title: "Summer collection",
    description: "Light summer clothing",
    price: 65,
    image: thirdImage,
    isNewArrival: false,
  },
];

export default function TrendingMustHave() {
  return (
    <section className="w-full max-w-[480px] mx-auto py-4">
      <div className="flex items-center justify-between px-5 mb-5">
        <h2 className="text-xl font-bold">trending must have</h2>

        <a
          href="/trending"
          className="flex items-center gap-2 text-sm text-[#444]"
        >
          View all
          <span>›</span>
        </a>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        slidesOffsetBefore={18}
        slidesOffsetAfter={18}
      >
        {trendingProducts.map((product) => (
          <SwiperSlide key={product.id} className="!w-[min(80vw,387px)]">
            <TrendingCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
