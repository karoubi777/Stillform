import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import type { Product, ProductVariant } from "../../types/product";

interface RecommendedProductsProps {
  products: Product[];
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

function RecommendedCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}) {
  const defaultVariant = product.variants[0];
  const thumbnail =
    product.image || product.images?.[0] || defaultVariant?.image || "";
  const isOutOfStock = !defaultVariant || defaultVariant.stock <= 0;

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  return (
    <div className="w-full h-[119px] border border-gray-100 rounded-md p-2.5 flex items-center gap-3 bg-white">
      <Link
        to={`/product/${product.id}`}
        state={{ product }}
        className="shrink-0"
      >
        <img
          src={thumbnail}
          alt={product.name}
          className="w-20 h-24 object-contain rounded bg-[#F5F6F6] p-1 hover:opacity-85 transition"
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-1">
        <div>
          <Link
            to={`/product/${product.id}`}
            state={{ product }}
            className="block text-[11px] font-medium uppercase text-gray-900 truncate hover:underline"
          >
            {product.name}
          </Link>

          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="text-xs font-bold text-[#FF3B16]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discountPercent && (
              <span className="bg-[#FF3B16] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] leading-none">
                -{discountPercent}%
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => defaultVariant && onAddToCart(product, defaultVariant)}
          className="w-full h-[30px] rounded border border-gray-300 text-[11px] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition flex items-center justify-center gap-2"
        >
          <span className="text-gray-500 font-normal">
            ${Math.round(product.price)}
          </span>
          <span className="font-semibold text-gray-800">
            {isOutOfStock ? "Out of stock" : "Add to cart"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function RecommendedProducts({
  products,
  onAddToCart,
}: RecommendedProductsProps) {
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

  // Group into pages of 4 for mobile (1x4) and tablet (2x2)
  const productPages: Product[][] = [];
  for (let i = 0; i < products.length; i += 4) {
    productPages.push(products.slice(i, i + 4));
  }

  return (
    <section className="w-full max-w-[1260px] mx-auto pt-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold tracking-wide uppercase text-gray-900">
          YOU MIGHT ALSO LIKE
        </h2>

        <div className="inline-flex items-center border border-gray-200 rounded divide-x divide-gray-200 bg-white">
          <button
            ref={setPrevEl}
            type="button"
            aria-label="Previous recommendations"
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:text-gray-300 active:scale-95 transition"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 10 10">
              <polygon points="7,1 2,5 7,9" />
            </svg>
          </button>
          <button
            ref={setNextEl}
            type="button"
            aria-label="Next recommendations"
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
          key="recommended-desktop"
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={20}
          navigation={{ prevEl, nextEl }}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <RecommendedCard product={product} onAddToCart={onAddToCart} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          key="recommended-mobile-tablet"
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
                  <RecommendedCard
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
