import { useState } from "react";
import type { BlogPost } from "../../types/product";

interface BlogHeroProps {
  posts: BlogPost[];
  onReadMore: (post: BlogPost) => void;
  onToggleLike: (postId: number) => void;
}

export default function BlogHero({
  posts,
  onReadMore,
  onToggleLike,
}: BlogHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  if (!posts.length) return null;

  const activePost = posts[activeIndex] ?? posts[0];
  const isBookmarked = bookmarkedIds.includes(activePost.id);

  const bgColor = activePost.theme?.bgColor ?? "#A891C7";
  const accentColor = activePost.theme?.accentColor ?? "#F5B400";

  function handleToggleBookmark() {
    setBookmarkedIds((prev) =>
      prev.includes(activePost.id)
        ? prev.filter((id) => id !== activePost.id)
        : [...prev, activePost.id],
    );
  }

  return (
    <section
      style={{ backgroundColor: bgColor }}
      className="w-full text-white transition-colors duration-500 overflow-hidden"
    >
      {/* Constrained strictly within 1440px */}
      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ================= MOBILE BACKGROUND IMAGE (< 640px) ================= */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[56%] sm:hidden overflow-hidden">
          <img
            src={activePost.image}
            alt={activePost.title}
            className="h-full w-full object-cover object-top select-none"
          />
          <div
            style={{
              background: `linear-gradient(to right, ${bgColor} 5%, transparent 65%)`,
            }}
            className="absolute inset-0"
          />
        </div>

        {/* ================= MAIN LAYOUT (Rigid 2-col Grid on sm+) ================= */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[1.45fr_1fr] lg:grid-cols-[1.35fr_1fr] items-stretch gap-4 lg:gap-8 min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
          {/* LEFT COLUMN: Bookmark + Content + 3-Story Selector */}
          <div className="py-10 sm:py-10 lg:py-14 flex items-center">
            <div className="w-full flex items-start gap-4 lg:gap-8">
              {/* Bookmark Icon (Tablet & Desktop) */}
              <button
                type="button"
                onClick={handleToggleBookmark}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark story"}
                className="hidden sm:flex pt-1.5 text-white/75 hover:text-white transition shrink-0"
              >
                <svg
                  className="w-4 h-5 lg:w-5 lg:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillOpacity={isBookmarked ? 1 : 0.45}
                    d="M6 2a2 2 0 00-2 2v18l8-4 8 4V4a2 2 0 00-2-2H6z"
                  />
                </svg>
              </button>

              <div className="w-full max-w-[78%] sm:max-w-none text-left min-w-0">
                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase leading-[1.15] tracking-wide">
                  {activePost.title}
                </h1>

                <p className="mt-3.5 sm:mt-4 text-xs sm:text-xs lg:text-sm text-white/90 sm:uppercase leading-relaxed max-w-[460px]">
                  {activePost.excerpt}
                </p>

                {/* Meta Row */}
                <div className="mt-4 sm:mt-5 flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-white/85">
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-white/70"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{activePost.publishedAt}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onToggleLike(activePost.id)}
                    className="flex items-center gap-1.5 hover:text-white transition"
                  >
                    <svg
                      className={`w-3.5 h-3.5 ${
                        activePost.isLiked ? "text-[#FF3B16]" : "text-white/70"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{activePost.likes}</span>
                  </button>

                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-white/70"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{activePost.commentsCount}</span>
                  </span>
                </div>

                {/* READ MORE Button */}
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={() => onReadMore(activePost)}
                    className="inline-flex items-center gap-2.5 px-5 h-[38px] lg:h-[40px] rounded border border-white/60 hover:bg-white/15 active:scale-[0.99] text-xs font-semibold uppercase tracking-wider text-white transition"
                  >
                    <span>READ MORE</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>

                {/* Bottom 3-Story Selector (Tablet & Desktop) */}
                <div className="hidden sm:block mt-8 lg:mt-12 max-w-[580px]">
                  <div className="relative w-full h-[2px] bg-white/30 mb-3.5 overflow-hidden">
                    <div
                      style={{
                        backgroundColor: accentColor,
                        width: `${100 / posts.length}%`,
                        transform: `translateX(${activeIndex * 100}%)`,
                      }}
                      className="h-full transition-transform duration-300 ease-out"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 md:gap-5 lg:gap-7">
                    {posts.map((post, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={post.id}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className="text-left group focus:outline-none min-w-0"
                        >
                          <h3
                            style={
                              isActive ? { color: accentColor } : undefined
                            }
                            className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wide leading-snug transition-colors ${
                              isActive
                                ? ""
                                : "text-white group-hover:text-white/80"
                            }`}
                          >
                            {post.tabTitle || post.title}
                          </h3>
                          <p className="mt-1.5 text-[9px] md:text-[10px] leading-relaxed text-white/80 uppercase line-clamp-4">
                            {post.tabSummary || post.excerpt}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Full-height Hero Image (Tablet & Desktop) */}
          <div className="hidden sm:block relative min-h-0 overflow-hidden">
            <img
              src={activePost.image}
              alt={activePost.title}
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 22%, black 92%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 22%, black 92%, transparent 100%)",
              }}
              className="absolute inset-0 w-full h-full object-cover object-top select-none transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
