import { useState } from "react";

type NewsletterBannerProps = {
  onSubscribe?: (email: string) => void;
};

export default function NewsletterBanner({
  onSubscribe,
}: NewsletterBannerProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    if (onSubscribe) {
      onSubscribe(trimmed);
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <div className="w-full max-w-[580px]  mx-auto bg-[#6C8D9E] text-white rounded-lg shadow-lg px-6 py-8 text-center">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
        Stillform <span className="font-light">Store</span>
      </h2>
      <p className="text-xs md:text-sm text-white/90 mb-6">
        Register your email not to miss the last minutes off+ Free delivery
      </p>

      {status === "success" ? (
        <p className="text-xs md:text-sm font-medium text-emerald-100 bg-white/20 py-2.5 px-4 rounded">
          ✓ Thank you for subscribing!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative max-w-[360px] mx-auto flex items-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Enter your email"
            required
            className="w-full h-[40px] pl-4 pr-10 text-xs text-gray-800 bg-white rounded shadow-inner outline-none placeholder:text-gray-400"
          />

          {/* Paper Airplane / Send Icon Button */}
          <button
            type="submit"
            aria-label="Submit email"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-700 transition"
          >
            <svg
              className="w-4 h-4 -rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
