import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[8.5%] pt-6 pb-12 sm:pb-16 text-left">
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link to="/" className="hover:text-black transition">
          Homepage
        </Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">About us</span>
      </nav>

      {/* 2. Main Two-Column Row (Desktop & Tablet) */}
      <div className="flex items-start justify-between gap-8 lg:gap-14">
        {/* ================= LEFT COLUMN ================= */}
        {/* Title, description, and stats stay grouped together */}
        <div className="flex-1 max-w-[720px]">
          {/* Subtitle tag */}
          <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
            Let&apos;s get to know Luminae
          </p>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Providing the best experience to make your{" "}
            <span className="text-[#3B72D9]">Online Shopping</span>
          </h1>

          {/* Description Body Text */}
          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-10">
            At Luminae, we are more than just an online store – we are your
            ultimate destination for an unparalleled shopping experience. Our
            journey began with a simple yet powerful idea: to create a platform
            that not only offers a wide array of products but also fosters a
            sense of community and connection among our customers.
          </p>

          {/* 3. Statistics Counters (Always under the text) */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-14 pt-2">
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#3B72D9]">
                20+
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium mt-1 block">
                Shopping category
              </span>
            </div>

            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#3B72D9]">
                10+
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium mt-1 block">
                Different Territory
              </span>
            </div>

            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#3B72D9]">
                4M+
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium mt-1 block">
                Happy Client
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: QUOTE BUBBLE ================= */}
        {/* 
            - Hidden completely on mobile: hidden
            - Visible and pinned to the right on tablet & desktop: md:flex 
        */}
        <div className="hidden md:flex relative shrink-0 bg-[#EAF2FC] rounded-2xl p-6 sm:p-8 max-w-[280px] lg:max-w-[320px] w-full text-center mt-12 lg:mt-16 shadow-xs">
          {/* Circular Quote Mark Badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#D4E5FA] flex items-center justify-center text-[#3B72D9] text-3xl font-serif ">
            <img src="/images/about-us/quotes.png" alt="" className="paddin" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed pt-2">
            We have made many people satisfied with our Platform
          </p>
        </div>
      </div>
    </section>
  );
}
