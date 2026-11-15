import NewsletterBanner from "./home/NewsletterBanner";

// Asset imports (Use forward slashes or standard bundler imports)
import visaLogo from "../assets/icons/footer/Visa-logo.svg";
import paypalLogo from "../assets/icons/footer/Paypal-logo.svg";
import mastercardLogo from "../assets/icons/footer/paypal2.svg";

export default function Footer() {
  function handleNewsletterSubscribe(email: string) {
    console.log("Subscribed email:", email);
    // Connect your API or backend endpoint here
  }

  return (
    <footer className="w-full bg-(--color-footer-100) relative mt-24 md:mt-32">
      {/* 1. OVERLAPPING NEWSLETTER BANNER (Hidden on mobile, visible tablet & laptop) */}
      <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 z-10">
        <NewsletterBanner onSubscribe={handleNewsletterSubscribe} />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[8.5%]">
        {/* 2. NAVIGATION COLUMNS
            - Mobile: py-12, max-w-[362px], grid-cols-2
            - Tablet: pt-28 pb-16, grid-cols-2
            - Desktop: pt-32 pb-20, grid-cols-4
        */}
        <div className="pt-12 sm:pt-28 lg:pt-32 pb-16 mx-auto grid w-full grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 text-xs sm:text-sm">
          {/* Column 1: Company */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="font-bold text-gray-800 text-sm sm:text-base">
              Company
            </p>
            <div className="flex flex-col gap-2 text-gray-600">
              <a href="#" className="hover:text-black transition">
                About Us
              </a>
              <a href="#" className="hover:text-black transition">
                Our Store
              </a>
              <a href="#" className="hover:text-black transition">
                Contact us
              </a>
            </div>
          </div>

          {/* Column 2: Career Opportunities */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="font-bold text-gray-800 text-sm sm:text-base">
              Career Opportunities
            </p>
            <div className="flex flex-col gap-2 text-gray-600">
              <a href="#" className="hover:text-black transition">
                Selling Programs
              </a>
              <a href="#" className="hover:text-black transition">
                Advertise
              </a>
              <a href="#" className="hover:text-black transition">
                Cooperation
              </a>
            </div>
          </div>

          {/* Column 3: How to Buy */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="font-bold text-gray-800 text-sm sm:text-base">
              How to Buy
            </p>
            <div className="flex flex-col gap-2 text-gray-600">
              <a href="#" className="hover:text-black transition">
                Making Payments
              </a>
              <a href="#" className="hover:text-black transition">
                Delivery Options
              </a>
              <a href="#" className="hover:text-black transition">
                Buyer Protection
              </a>
              <a href="#" className="hover:text-black transition">
                New User Guide
              </a>
            </div>
          </div>

          {/* Column 4: Help */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="font-bold text-gray-800 text-sm sm:text-base">Help</p>
            <div className="flex flex-col gap-2 text-gray-600">
              <a href="#" className="hover:text-black transition">
                Contacts Us
              </a>
              <a href="#" className="hover:text-black transition">
                FAQ
              </a>
              <a href="#" className="hover:text-black transition">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM PAYMENT & LOCALIZATION BAR */}
      <div className="bg-white border-t border-gray-100 py-4">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[8.5%] flex flex-col gap-4">
          {/* Top of Bottom Bar: Payment Logos & Language Dropdown */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={visaLogo}
                alt="Visa card"
                className="h-5 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition"
              />
              <img
                src={mastercardLogo}
                alt="Mastercard logo"
                className="h-5 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition"
              />
              <img
                src={paypalLogo}
                alt="Paypal logo"
                className="h-5 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition"
              />
            </div>

            {/* Language Selector (Tablet & Desktop) */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-black">
              <span>English</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Divider line for tablet/desktop layout */}
          <div className="hidden sm:block h-px w-full bg-gray-100 my-1" />

          {/* Bottom Copyright & Social Icons Row */}
          <div className="hidden sm:flex items-center justify-between text-[11px] text-gray-400">
            <p>165-179 Forster Road City of Monash, Melbourne, Australia</p>
            <p>©2023 Copyright is reserved for Stillform shop</p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-gray-400">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-gray-600 transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-gray-600 transition font-bold text-xs"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="hover:text-gray-600 transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="m22 3-3.4 18-7-5.2-3.8 3.6.6-6.3L19 5.3 6.4 11.5l-5.3-1.8L22 3Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
