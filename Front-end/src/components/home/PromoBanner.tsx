type PromoBannerProps = {
  // First card props
  firstImage: string;
  firstBgColor?: string; // default fallback provided
  // Second card props
  secondImage: string;
  secondBgColor?: string; // default fallback provided
};

export default function PromoBanner({
  firstImage,
  firstBgColor = "#B82B3B", // Red from mockup
  secondImage,
  secondBgColor = "#1F4E5B", // Teal/Dark green from mockup
}: PromoBannerProps) {
  return (
    <div>
      {/* Hidden on mobile, visible on tablet (sm) and desktop (lg) */}
      <section className="hidden sm:grid grid-cols-2 gap-4 lg:gap-8 w-full max-w-[1440px] mx-auto py-6 px-4 lg:px-[8.5%]">
        {/* ================= CARD 1 ================= */}
        <article
          className="
          flex w-full overflow-hidden rounded-xs
          /* Aspect ratio preserves proportions dynamically */
          aspect-[396/167] lg:aspect-[620/437]
          /* Maximum limits so they never exceed design specs */
          max-w-[396px] lg:max-w-[620px]
          justify-self-center
        "
        >
          {/* Left: Text Content (50% fluid width) */}
          <div
            style={{ backgroundColor: firstBgColor }}
            className="
            w-1/2 h-full flex flex-col justify-between text-white
            p-3 md:p-6 lg:p-10
          "
          >
            <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
              <h3 className="font-bold text-xs sm:text-base md:text-xl lg:text-3xl leading-tight tracking-tight">
                Never-Ending <br /> Summer
              </h3>
              <p className="text-[9px] sm:text-xs md:text-sm lg:text-base text-white/90 leading-tight">
                Throwback Shirts &amp; <br /> all-day dressed
              </p>
            </div>

            <a
              href="/category/summer"
              className="
              inline-block text-[9px] sm:text-xs md:text-sm font-medium 
              underline underline-offset-2 lg:underline-offset-4 
              text-white hover:opacity-80 transition-opacity mt-1
            "
            >
              Explore all category
            </a>
          </div>

          {/* Right: Image (50% fluid width) */}
          <div className="w-1/2 h-full bg-[#f5f5f5] overflow-hidden">
            <img
              src={firstImage}
              alt="Never-ending summer collection"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
            />
          </div>
        </article>

        {/* ================= CARD 2 ================= */}
        <article
          className="
          flex w-full overflow-hidden rounded-xs
          aspect-[396/167] lg:aspect-[620/437]
          max-w-[396px] lg:max-w-[620px]
          justify-self-center
        "
        >
          {/* Left: Text Content (50% fluid width) */}
          <div
            style={{ backgroundColor: secondBgColor }}
            className="
            w-1/2 h-full flex flex-col justify-between text-white
            p-3 md:p-6 lg:p-10
          "
          >
            <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
              <h3 className="font-bold text-xs sm:text-base md:text-xl lg:text-3xl leading-tight tracking-tight">
                The most <br /> famous sport <br className="hidden lg:block" />{" "}
                brands
              </h3>
              <p className="text-[9px] sm:text-xs md:text-sm lg:text-base text-white/90 leading-tight">
                Get in gym essentials
              </p>
            </div>

            <a
              href="/category/sports"
              className="
              inline-block text-[9px] sm:text-xs md:text-sm font-medium 
              underline underline-offset-2 lg:underline-offset-4 
              text-white hover:opacity-80 transition-opacity mt-1
            "
            >
              Explore all category
            </a>
          </div>

          {/* Right: Image (50% fluid width) */}
          <div className="w-1/2 h-full bg-[#f5f5f5] overflow-hidden">
            <img
              src={secondImage}
              alt="Sport brands collection"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
            />
          </div>
        </article>
      </section>
      ;
    </div>
  );
}
