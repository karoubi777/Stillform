// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";
import NotFoundSwiper from "../components/not-found/NotFoundSwiper";
import { mockRelatedProducts } from "../data/mockProducts";
import type { Product } from "../types/product";

const NO_RESULTS_ILLUSTRATION = "/images/not-found.png";

type NotFoundPageProps = {
  relatedProducts?: Product[];
};

export default function NotFoundPage({
  relatedProducts = mockRelatedProducts,
}: NotFoundPageProps) {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      {/* ========================================================
          1. TOP 404 NOT FOUND HERO SECTION (Height ~427px)
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

          {/* Action button linking home */}
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 h-[44px] rounded bg-[#3B72D9] hover:bg-[#2C62C9] active:scale-[0.99] transition-all text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md"
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
          2. BOTTOM RELATED PRODUCTS CAROUSEL
         ======================================================== */}
      <NotFoundSwiper products={relatedProducts} />
    </div>
  );
}
