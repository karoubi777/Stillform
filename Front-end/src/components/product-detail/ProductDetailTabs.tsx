import { useState } from "react";
import ProductReviewsTab from "./ProductReviewsTab";
import ProductShippingTab from "./ProductShippingTab";
import type {
  CountryOption,
  DetailTab,
  PaymentMethod,
  Product,
  ProductDetails,
  ProductReview,
  ShippingMethod,
} from "../../types/product";

interface ProductDetailTabsProps {
  product: Product;
  activeTab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  details: ProductDetails | null;
  isLoadingDetails: boolean;
  reviews: ProductReview[];
  isLoadingReviews: boolean;
  onVoteReview: (reviewId: number, vote: "like" | "dislike") => void;
  onSubmitReview: (
    review: Omit<
      ProductReview,
      "id" | "date" | "likes" | "dislikes" | "userVote"
    >,
  ) => void;
  countries: CountryOption[];
  selectedCountryCode: CountryOption["code"];
  onSelectCountry: (code: CountryOption["code"]) => void;
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
}

export default function ProductDetailTabs({
  product,
  activeTab,
  onTabChange,
  details,
  isLoadingDetails,
  reviews,
  isLoadingReviews,
  onVoteReview,
  onSubmitReview,
  countries,
  selectedCountryCode,
  onSelectCountry,
  shippingMethods,
  paymentMethods,
}: ProductDetailTabsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const reviewCount =
    reviews.length > 0
      ? reviews.length
      : product.reviewCount || product.reviews;

  return (
    <section className="w-full mt-10 sm:mt-14">
      {/* Tab Headers */}
      <div className="w-full border-b border-gray-200">
        <div className="flex items-center justify-center gap-6 sm:gap-12 pb-3.5 text-center">
          <button
            type="button"
            onClick={() => onTabChange("details")}
            className={`text-xs tracking-wide uppercase transition-colors ${
              activeTab === "details"
                ? "font-bold text-gray-900"
                : "font-semibold text-gray-400 hover:text-gray-700"
            }`}
          >
            PRODUCT DETAILS
          </button>

          <button
            type="button"
            onClick={() => onTabChange("reviews")}
            className={`text-xs tracking-wide uppercase transition-colors ${
              activeTab === "reviews"
                ? "font-bold text-gray-900"
                : "font-semibold text-gray-400 hover:text-gray-700"
            }`}
          >
            REVIEWS ({reviewCount})
          </button>

          <button
            type="button"
            onClick={() => onTabChange("shipping")}
            className={`text-xs tracking-wide uppercase transition-colors ${
              activeTab === "shipping"
                ? "font-bold text-gray-900"
                : "font-semibold text-gray-400 hover:text-gray-700"
            }`}
          >
            SHIPPING &amp; PAYMENT
          </button>
        </div>
      </div>

      {/* ================= TAB 1: PRODUCT DETAILS ================= */}
      {activeTab === "details" && (
        <div className="pt-6 text-left">
          {isLoadingDetails ? (
            <div className="py-8 text-xs text-gray-400">
              Loading product details...
            </div>
          ) : (
            <>
              <div
                className={`relative transition-all duration-300 ${
                  isExpanded ? "" : "max-h-[260px] overflow-hidden"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 text-xs text-gray-600 leading-relaxed">
                  {/* Left Column */}
                  <div className="flex flex-col gap-5">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">
                        Product Description
                      </h3>
                      <p>
                        {details?.description ||
                          product.description ||
                          "No description available."}
                      </p>
                    </div>

                    {details?.specs && details.specs.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2.5">
                          Product Description
                        </h3>
                        <ul className="flex flex-col gap-2">
                          {details.specs.map((spec) => (
                            <li key={spec} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-5">
                    {details && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">
                          Composition
                        </h3>
                        <p>{details.composition}</p>
                        {details.outerShell && (
                          <>
                            <p className="mt-2 font-medium text-gray-700">
                              OUTER SHELL
                            </p>
                            <p>{details.outerShell}</p>
                          </>
                        )}
                      </div>
                    )}

                    {details?.careInstructions &&
                      details.careInstructions.length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-2.5">
                            Care instructions
                          </h3>
                          <ul className="flex flex-col gap-2.5">
                            {details.careInstructions.map((rule) => (
                              <li
                                key={rule}
                                className="flex items-center gap-2.5"
                              >
                                <svg
                                  className="w-4 h-4 text-gray-500 shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={1.6}
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>

                {!isExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />
                )}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex-1 h-px bg-gray-200" />
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-700 hover:text-black transition shrink-0"
                >
                  <span>{isExpanded ? "↑" : "↓"}</span>
                  <span>{isExpanded ? "SHOW LESS" : "SHOW MORE"}</span>
                </button>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </>
          )}
        </div>
      )}

      {/* ================= TAB 2: REVIEWS ================= */}
      {activeTab === "reviews" && (
        <ProductReviewsTab
          product={product}
          reviews={reviews}
          isLoading={isLoadingReviews}
          onVoteReview={onVoteReview}
          onSubmitReview={onSubmitReview}
        />
      )}

      {/* ================= TAB 3: SHIPPING & PAYMENT ================= */}
      {activeTab === "shipping" && (
        <ProductShippingTab
          countries={countries}
          selectedCountryCode={selectedCountryCode}
          onSelectCountry={onSelectCountry}
          shippingMethods={shippingMethods}
          paymentMethods={paymentMethods}
        />
      )}
    </section>
  );
}
