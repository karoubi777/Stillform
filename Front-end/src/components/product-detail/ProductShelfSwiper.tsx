import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import CompactProductCard from "./CompactProductCard";
import type { Product, ProductVariant } from "../../types/product";

interface ProductShelfSwiperProps {
  title: string;
  products: Product[];
  onAddToCart?: (product: Product, variant: ProductVariant) => void;
}

export default function ProductShelfSwiper({
  title,
  products,
  onAddToCart,
}: ProductShelfSwiperProps) {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!products.length) return null;

  const productPages: Product[][] = [];
  for (let i = 0; i < products.length; i += 4) {
    productPages.push(products.slice(i, i + 4));
  }

  return (
    <section className="w-full max-w-[1260px] mx-auto pt-8 mt-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold tracking-wide uppercase text-gray-900">
          {title}
        </h2>

        <div className="inline-flex items-center border border-gray-200 rounded divide-x divide-gray-200 bg-white">
          <button
            ref={setPrevEl}
            type="button"
            aria-label={`Previous ${title.toLowerCase()}`}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:text-gray-300 active:scale-95 transition"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 10 10">
              <polygon points="7,1 2,5 7,9" />
            </svg>
          </button>
          <button
            ref={setNextEl}
            type="button"
            aria-label={`Next ${title.toLowerCase()}`}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:text-gray-300 active:scale-95 transition"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 10 10">
              <polygon points="3,1 8,5 3,9" />
            </svg>
          </button>
        </div>
      </div>

      {isDesktop ? (
        <Swiper
          key={`${title}-desktop`}
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={20}
          navigation={{ prevEl, nextEl }}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <CompactProductCard product={product} onAddToCart={onAddToCart} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          key={`${title}-mobile-tablet`}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={16}
          navigation={{ prevEl, nextEl }}
          className="w-full"
        >
          {productPages.map((page, pageIdx) => (
            <SwiperSlide key={pageIdx}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {page.map((product) => (
                  <CompactProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
