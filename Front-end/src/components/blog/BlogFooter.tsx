import { useState } from "react";
import { Link } from "react-router-dom";

const TOP_LINKS = [
  { label: "CONTACT US", to: "#" },
  { label: "ADVERTISE", to: "#" },
  { label: "WORK WITH US", to: "#" },
  { label: "PARTNERS", to: "#" },
  { label: "TERMS OF SERVICE", to: "#" },
  { label: "SUBSCRIPTIONS", to: "#" },
];

const BOTTOM_LINKS_ROW_1 = [
  "Contact Us",
  "Advertise",
  "Work with Us",
  "Career",
  "Partners",
  "Subscriptions",
];

const BOTTOM_LINKS_ROW_2 = [
  "Site Map",
  "Home Delivery",
  "Customer Service",
  "Terms of Service",
];

export default function BlogFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    // Replace with your newsletter API endpoint later
    setSubscribed(true);
    setEmail("");
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="w-full text-left">
      {/* ================= TOP LIGHT-BLUE BAND ================= */}
      <div className="w-full bg-[#D1E2EE] py-8 sm:py-10 px-4 sm:px-6 lg:px-[4%]">
        <div className="max-w-[1680px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Left: Brand + Email Form */}
          <div className="w-full sm:max-w-[340px]">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight inline-block"
            >
              <span className="text-blue-900">Still</span>
              <span className="text-gray-900">form</span>
            </Link>

            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              Register your email not to miss the last minutes off+ Free
              delivery
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex items-center w-full h-[40px] bg-white rounded px-3 shadow-xs"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
                placeholder="Enter your email"
                className="flex-1 text-xs text-gray-800 placeholder:text-gray-400 outline-none min-w-0 bg-transparent"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-gray-500 hover:text-gray-900 transition pl-2 shrink-0"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-700 font-medium mt-1.5">
                Thanks for subscribing!
              </p>
            )}
          </div>

          {/* Right: 3x2 Uppercase Navigation Links */}
          <nav className="w-full sm:w-auto grid grid-cols-3 gap-x-5 sm:gap-x-8 lg:gap-x-12 gap-y-4">
            {TOP_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-[11px] font-semibold uppercase tracking-wide text-gray-800 hover:text-black transition-colors leading-snug"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ================= BOTTOM CHARCOAL BAND ================= */}
      <div className="w-full bg-[#2C2C2C] text-gray-300 py-6 sm:py-7 px-4 sm:px-6 lg:px-[4%]">
        <div className="max-w-[1680px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Left Footer Links */}
            <div className="flex flex-col gap-2.5 text-[11px] text-gray-300">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {BOTTOM_LINKS_ROW_1.map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {BOTTOM_LINKS_ROW_2.map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Social Networks */}
            <div className="pt-4 sm:pt-0 border-t border-gray-600/60 sm:border-t-0 flex flex-col sm:items-end gap-2.5 shrink-0">
              <span className="text-[11px] text-gray-400">
                Follow Us On Social Networks
              </span>
              <div className="flex items-center gap-4 text-white">
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="hover:opacity-75">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                  </svg>
                </a>
                {/* Twitter */}
                <a href="#" aria-label="Twitter" className="hover:opacity-75">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="hover:opacity-75">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" aria-label="YouTube" className="hover:opacity-75">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright + Top ↑ (Tablet & Desktop) */}
          <div className="hidden sm:flex items-center justify-between border-t border-gray-600/60 pt-4 mt-5 text-[11px] text-gray-400">
            <span>Copy write are reserved for Stillform</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <span>Top</span>
              <span aria-hidden="true">&uarr;</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
