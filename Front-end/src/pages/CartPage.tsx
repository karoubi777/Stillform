import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import { useAuth } from "../context/AuthContext";
import { mockcartitems, recommendedProducts } from "../mockProducts";

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [items, setItems] = useState(mockcartitems);
  const [packInGiftBox, setPackInGiftBox] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  function handleQuantityChange(id: number | string, delta: number) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  }

  function handleRemoveItem(id: number | string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const giftBoxPrice = packInGiftBox ? 10.9 : 0;
  const totalPrice = subtotal + giftBoxPrice;

  function handleCouponSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      alert(`Applied coupon: ${couponCode}`);
    }
  }

  return (
    <div className="w-full bg-white py-6 px-4 sm:px-6 lg:px-[8.5%] max-w-[1440px] mx-auto text-left overflow-x-hidden sm:overflow-x-visible">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Card{" "}
        <span className="text-gray-400 font-normal text-base">
          {items.length}
        </span>
      </h1>

      {/* ========================================================
          1. MAIN CART AREA (Items List & Order Summary)
          - Mobile (< 640px): Stacked
          - Tablet & Desktop (>= 640px): Side by side
         ======================================================== */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-6 md:gap-8 lg:gap-12 mb-12 sm:mb-16">
        {/* LEFT: ITEMS LIST */}
        <div className="w-full sm:flex-1 min-w-0 flex flex-col divide-y divide-gray-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-4 lg:gap-y-0"
            >
              {/* Image & Title (Mobile/Tablet: row 1 minus price | Desktop: 44%) */}
              <div className="w-[calc(100%-72px)] lg:w-[44%] lg:pr-4 flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-16 rounded object-contain bg-[#F5F6F6] p-1 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-500">
                    <span>Color:</span>
                    <span
                      style={{ backgroundColor: item.color || "#000" }}
                      className="w-2.5 h-2.5 rounded-full inline-block border border-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Unit Price (Mobile/Tablet: right of row 1 | Desktop: 14%) */}
              <div className="w-[72px] text-right lg:w-[14%] lg:text-center text-xs sm:text-sm font-medium text-gray-600 shrink-0">
                ${item.price.toFixed(2)}
              </div>

              {/* Quantity Counter (Mobile/Tablet: 40% of row 2 | Desktop: 18%) */}
              <div className="w-[40%] lg:w-[18%] flex justify-start lg:justify-center">
                <div className="flex items-center justify-between w-[101px] h-[38px] rounded border border-gray-200 px-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="text-gray-400 hover:text-black px-1.5 text-base leading-none"
                  >
                    −
                  </button>
                  <span className="text-xs font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="text-gray-400 hover:text-black px-1.5 text-base leading-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Line Total (Mobile/Tablet: 40% of row 2 | Desktop: 14%) */}
              <div className="w-[40%] lg:w-[14%] text-center text-xs sm:text-sm font-medium text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Delete Icon (Mobile/Tablet: 20% of row 2 | Desktop: 10%) */}
              <div className="w-[20%] lg:w-[10%] flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                  className="text-gray-400 hover:text-red-500 p-1 shrink-0 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: ORDER SUMMARY & COUPON */}
        <div className="w-full sm:w-[255px] md:w-[295px] lg:w-[309px] shrink-0 flex flex-col gap-4">
          {/* Summary Box: Full-bleed background on mobile, card on tablet/desktop */}
          <div className="w-[calc(100%+2rem)] -mx-4 px-4 py-7 bg-[#EBEBEB] rounded-t-xl sm:w-full sm:mx-0 sm:p-5 sm:rounded-md text-xs">
            <div className="w-full max-w-[300px] mx-auto sm:max-w-none flex flex-col justify-between min-h-[340px] sm:min-h-[370px]">
              <h2 className="text-sm font-bold text-gray-900 mb-3">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-semibold text-gray-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-800">$0</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold text-gray-800">$0</span>
                </div>

                <div className="pt-1">
                  <span className="font-medium text-gray-700">
                    Discount Price
                  </span>
                  {!isAuthenticated && (
                    <p className="flex items-center gap-1.5 text-[10px] text-[#FF3B16] mt-1">
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-[#FF3B16] text-[9px] font-bold shrink-0">
                        !
                      </span>
                      <span>You must log in to use the discount code</span>
                    </p>
                  )}
                </div>

                <label className="flex items-center justify-between text-gray-700 cursor-pointer pt-1">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={packInGiftBox}
                      onChange={(e) => setPackInGiftBox(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#3B72D9] focus:ring-0"
                    />
                    <span>Pack in a Gift Box</span>
                  </span>
                  <span className="font-semibold text-gray-800">$10.90</span>
                </label>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-center border-t border-gray-300 pt-3 my-3">
                <span className="text-xs font-bold text-gray-900">
                  Total Price
                </span>
                <span className="text-base font-extrabold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                className="w-full h-[46px] rounded bg-[#3D3D3D] hover:bg-[#2C2C2C] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z"
                  />
                </svg>
                <span>CHECKOUT</span>
              </button>
            </div>
          </div>

          {/* Coupon Code Input Area */}
          <form
            onSubmit={handleCouponSubmit}
            className="flex items-center w-full rounded border border-gray-300 overflow-hidden h-[48px] bg-white"
          >
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full flex-1 px-3 text-xs text-gray-800 placeholder:text-gray-400 outline-none h-full min-w-0"
            />
            <button
              type="submit"
              className="h-full px-3 md:px-4 bg-[#262626] hover:bg-black text-white text-[10px] md:text-[11px] font-semibold leading-tight text-center transition shrink-0 max-w-[46%]"
            >
              {isAuthenticated ? "Apply" : "Login and Apply code"}
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================
          2. YOU MIGHT ALSO LIKE (Swiper with Grid Breakpoints)
          - Mobile (< 640px): 1 col x 4 rows
          - Tablet (640px - 1023px): 2 cols x 2 rows
          - Desktop (>= 1024px): 4 cols x 1 row
         ======================================================== */}
      <section className="w-full max-w-[1260px] mx-auto pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold tracking-wide uppercase text-gray-900">
            YOU MIGHT ALSO LIKE
          </h2>

          {/* Joined Segmented Carousel Arrows */}
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

        <Swiper
          modules={[Navigation, Grid]}
          observer={true}
          observeParents={true}
          onBreakpoint={(swiper) => swiper.update()}
          navigation={{
            prevEl,
            nextEl,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              grid: { rows: 4, fill: "row" },
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              grid: { rows: 2, fill: "row" },
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              grid: { rows: 1, fill: "row" },
              spaceBetween: 20,
            },
          }}
          className="w-full"
        >
          {recommendedProducts.map((product) => {
            const discountPercent =
              product.originalPrice && product.originalPrice > product.price
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )
                : null;

            return (
              <SwiperSlide key={product.id}>
                <div className="w-full h-[119px] border border-gray-100 rounded-md p-2.5 flex items-center gap-3 bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-contain rounded bg-[#F5F6F6] p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-1">
                    <div>
                      <h3 className="text-[11px] font-medium uppercase text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className="text-xs font-bold text-[#FF3B16]">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
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
                      onClick={() => alert(`Added ${product.name} to cart!`)}
                      className="w-full h-[30px] rounded border border-gray-300 text-[11px] hover:bg-gray-50 active:scale-95 transition flex items-center justify-center gap-2"
                    >
                      <span className="text-gray-500 font-normal">
                        ${Math.round(product.price)}
                      </span>
                      <span className="font-semibold text-gray-800">
                        Add to cart
                      </span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </div>
  );
}
