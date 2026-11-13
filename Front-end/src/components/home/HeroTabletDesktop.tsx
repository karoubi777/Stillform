const HERO_IMAGE = "/images/homepage/hero-big.png";

export default function HeroTabletDesktop() {
  return (
    <section
      className="
        hidden sm:flex relative w-full items-stretch
      
        bg-[#5A95E5]
       
        h-[460px] lg:h-[480px]
        max-w-[1800x] mx-auto
      "
    >
      {/* ========================================================
          LEFT: IMAGE
          - Tablet (<1024px): Strictly 50% width fluid
          - Desktop (>=1024px): Exactly 547px width (or up to 45% if space is tight)
         ======================================================== */}
      <div className="relative w-1/2 lg:w-[547px] shrink-0 h-full">
        <img
          src={HERO_IMAGE}
          alt="Summer models collection"
          className="w-full h-full object-cover object-top block"
        />
      </div>

      {/* ========================================================
          MIDDLE STICKER (DESKTOP ONLY: >= 1024px)
          - Positioned relative to the section root so it NEVER gets clipped
          - Sits precisely on the 547px seam
          - z-30 ensures it always stays above images and text
         ======================================================== */}
      <div
        className="
          hidden lg:flex flex-col justify-between
          absolute left-[547px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30
          w-[228px] h-[129px] bg-white shadow-2xl rounded-xs pointer-events-none
        "
      >
        {/* Top White Section */}
        <div className="flex flex-col items-center justify-center p-3 text-center my-auto">
          <h4 className="text-sm font-bold text-gray-900 tracking-tight leading-snug">
            Summer Essentials
          </h4>
          <p className="text-lg font-extrabold text-[#FF3B16] mt-0.5">
            20% off
          </p>
        </div>

        {/* Bottom Dark Tag */}
        <div className="w-full bg-[#262626] py-1.5 text-center">
          <span className="text-[11px] font-medium text-white tracking-wider uppercase">
            19 Jul - 30 Jul
          </span>
        </div>
      </div>

      {/* ========================================================
          RIGHT: BLUE TEXT & CTA AREA
          - Tablet (<1024px): 50% width fluid
          - Desktop (>=1024px): Fills remainder
         ======================================================== */}
      <div
        className="
          w-1/2 lg:flex-1 h-full flex flex-col items-center justify-center text-center
          px-4 sm:px-8 lg:px-12 text-white
        "
      >
        <div className="flex flex-col items-center max-w-[480px] w-full">
          {/* Main Title: dynamic text sizing so it never line-breaks awkwardly on narrow tablets */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide uppercase leading-tight">
            Kimonos, Caftans <br /> &amp; Pareos
          </h2>

          {/* Subtitle */}
          <p className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm md:text-base lg:text-lg font-normal text-white/90">
            Poolside glam included From $4.99
          </p>

          {/* SHOP NOW Button: fluid max-width with your exact 243x56 cap */}
          <a
            href="/shop"
            className="
              mt-5 sm:mt-6 lg:mt-8 flex items-center justify-center gap-2.5
              w-full max-w-[243px] h-[48px] sm:h-[56px] rounded bg-[#3B72D9] 
              hover:bg-[#2C62C9] active:scale-95 transition-all
              shadow-md hover:shadow-xl text-xs sm:text-sm font-semibold tracking-wide uppercase text-white
            "
          >
            {/* Gift Box Icon */}
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white/90"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 21V11.25m18 0l-9-5.25m9 5.25l-9 5.25m0-10.5L3 11.25m9-5.25v10.5m0 0L3 11.25"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v3.75m0 0a2.25 2.25 0 102.25-2.25H12zm0 0a2.25 2.25 0 11-2.25-2.25H12z"
              />
            </svg>
            <span>Shop Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
