export default function Homehero() {
  return (
    <>
      <section className="flex flex-col gap-3 w-full max-w-[480px] mx-auto px-3 py-2 md:hidden">
        <div className="grid grid-cols-2 w-full overflow-hidden bg-[#B82B3B]">
          <div className="flex flex-col justify-between p-5 text-white">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold leading-tight tracking-tight">
                Never-Ending
                <br />
                Summer
              </h2>
              <p className="text-xs text-white/90 leading-snug">
                Throwback Shirts &amp;
                <br />
                all-day dressed
              </p>
            </div>

            <a
              href="/category/summer"
              className="text-xs font-medium underline underline-offset-4 text-white hover:opacity-80 transition-opacity mt-4 inline-block"
            >
              Explore all category
            </a>
          </div>

          <div className="relative h-full min-h-[200px] w-full">
            <img
              src="src\assets\home\red-hero.jpg"
              alt="Never-ending summer collection"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 w-full overflow-hidden bg-[#0082CA]">
          <div className="flex flex-col justify-between p-5 text-white">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold leading-tight tracking-tight">
                Best Lovin
                <br />
                Sellers
              </h2>
              <p className="text-xs text-white/90 leading-snug">
                Bikini &amp; Poolside glam
                <br />
                include
              </p>
            </div>

            <a
              href="/category/sellers"
              className="text-xs font-medium underline underline-offset-4 text-white hover:opacity-80 transition-opacity mt-4 inline-block"
            >
              Explore all category
            </a>
          </div>

          <div className="relative h-full min-h-[200px] w-full">
            <img
              src="src\assets\home\blue-hero.jpg"
              alt="Best lovin sellers collection"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>
      <section className="flash-sales">
        
      </section>
    </>
  );
}
