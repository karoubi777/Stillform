const TEAM_PHOTO = "/images/about-us/team.png";

const SERVICES = [
  {
    id: 1,
    title: "Full category shop",
    description:
      "Explore our comprehensive online store where you'll find a diverse range of products across multiple categories, all curated to cater to your various needs and ..",
    icon: (
      <svg
        className="w-8 h-8 text-[#3B72D9]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009 9.35c.69 0 1.32-.232 1.82-.622.5.39 1.13.622 1.82.622.69 0 1.32-.232 1.82-.622.5.39 1.13.622 1.82.622a3 3 0 003.75.623M3.36 9.35L5.75 3h12.5l2.39 6.35"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Extraordinary discount",
    description:
      "Experience unparalleled savings on a wide selection of premium products that enhance your lifestyle without compromising on quality...",
    icon: (
      <svg
        className="w-8 h-8 text-[#3B72D9]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 21V11.25m18 0l-9-5.25m9 5.25l-9 5.25m0-10.5L3 11.25m9-5.25v10.5m0 0L3 11.25"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Free Cargo",
    description:
      "Enjoy the convenience of free cargo services, ensuring your purchases are delivered right to your doorstep without any additional cost. Experience seamless..",
    icon: (
      <svg
        className="w-8 h-8 text-[#3B72D9]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25H4.125C3.504 7.5 3 8.004 3 8.625V14.25m11.25-6.75v6.75"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "24-hour customer service",
    description:
      "Our commitment to exceptional customer care means our 24-hour customer service team is always available to assist you, ensuring your inquiries and concerns..",
    icon: (
      <svg
        className="w-8 h-8 text-[#3B72D9]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
        />
      </svg>
    ),
  },
];

export default function AboutServices() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[8.5%] py-12 sm:py-16 text-left border-t border-gray-100">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14">
        {/* Left: Text & 4 Service Cards */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
              Know our service
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              We offer the best service that will{" "}
              <span className="text-[#3B72D9]">make it easier</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-4 max-w-[540px]">
              Discover unparalleled convenience with our top-tier service,
              designed to make your shopping experience smoother than ever.
              Experience shopping made effortless through our exceptional
              service that puts your needs at the forefront.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2 max-w-[540px]">
              Elevate your shopping journey with our unmatched service,
              redefining convenience and satisfaction.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  {service.icon}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <button
                  type="button"
                  className="w-full h-[38px] rounded-md bg-[#3B72D9] hover:bg-[#2C62C9] active:scale-95 text-white text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition mt-2"
                >
                  READ MORE →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Team Photo with Arched Top Corner & Location Pin */}
        <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 relative flex justify-center">
          <div className="relative w-full max-w-[420px] lg:max-w-none rounded-tl-[100px] sm:rounded-tl-[160px] overflow-hidden shadow-xl bg-neutral-100">
            <img
              src={TEAM_PHOTO}
              alt="Luminae team in Melbourne"
              className="w-full h-full object-cover object-center max-h-[620px]"
            />

            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-xs rounded-full px-4 py-1.5 shadow-md flex items-center gap-2 text-xs font-semibold text-gray-800">
              <svg
                className="w-4 h-4 text-[#3B72D9]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Melbourne, Australia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
