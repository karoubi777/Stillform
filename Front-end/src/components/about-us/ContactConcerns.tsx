import { useState } from "react";

const MODELS_PHOTO = "/images/about-us/models.png";

export default function ContactConcerns() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !email || !description) return;
    setIsSent(true);
    setName("");
    setEmail("");
    setDescription("");
    setTimeout(() => setIsSent(false), 3000);
  }

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[8.5%] py-12 sm:py-16">
      {/* Container: 
          - Mobile: Single column dark form
          - Tablet & Desktop: 2 equal columns (form on left, photo on right)
      */}
      <div className="w-full overflow-hidden rounded-xl bg-[#262626] flex flex-col sm:flex-row shadow-2xl">
        {/* ================= LEFT: DARK CONTACT FORM ================= */}
        <div className="w-full sm:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-between text-left">
          {/* Header Title with Orange Accent */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Tell us about your{" "}
              <span className="text-[#FFB800]">Concerns</span>
            </h2>
          </div>

          {isSent && (
            <div className="mb-4 rounded bg-emerald-500/20 border border-emerald-500/40 p-3 text-xs text-emerald-300">
              ✓ Thank you! Your concern has been sent to our team.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* 1. Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-300">
                Your Name
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name here"
                  required
                  className="w-full h-[46px] sm:h-[48px] pl-10 pr-4 rounded bg-[#333333] border border-neutral-700 text-xs text-white placeholder:text-gray-400 outline-none focus:border-neutral-500 transition"
                />
              </div>
            </div>

            {/* 2. Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-300">Email</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email here"
                  required
                  className="w-full h-[46px] sm:h-[48px] pl-10 pr-4 rounded bg-[#333333] border border-neutral-700 text-xs text-white placeholder:text-gray-400 outline-none focus:border-neutral-500 transition"
                />
              </div>
            </div>

            {/* 3. Description Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your concerns"
                rows={4}
                required
                className="w-full p-3.5 rounded bg-[#333333] border border-neutral-700 text-xs text-white placeholder:text-gray-400 outline-none focus:border-neutral-500 transition resize-none"
              />
            </div>

            {/* 4. SEND Button */}
            <button
              type="submit"
              className="w-full h-[48px] rounded bg-[#3B72D9] hover:bg-[#2C62C9] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider transition shadow-md mt-2"
            >
              SEND
            </button>
          </form>
        </div>

        {/* ================= RIGHT: MODELS PHOTOGRAPH ================= */}

        <div className="hidden sm:block w-1/2 relative bg-neutral-800">
          <img
            src={MODELS_PHOTO}
            alt="Summer collection models"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
