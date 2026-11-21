import { Link } from "react-router-dom";
import type { Review } from "../../types/product";

interface LatestReviewsSidebarProps {
  reviews: Review[];
}

export default function LatestReviewsSidebar({
  reviews,
}: LatestReviewsSidebarProps) {
  if (!reviews.length) return null;

  return (
    <aside className="w-full sm:w-[225px] md:w-[250px] lg:w-[270px] shrink-0 bg-[#92ADC2] text-white rounded-sm divide-y divide-white/25 text-left">
      {reviews.map((rev) => (
        <div key={rev.id} className="p-4 sm:p-5 flex flex-col gap-3">
          {/* Quote Mark + Title */}
          <div className="relative pl-5">
            <span
              aria-hidden="true"
              className="absolute left-0 -top-2 text-4xl font-serif leading-none text-white/30 select-none"
            >
              &ldquo;
            </span>
            {rev.productId ? (
              <Link
                to={`/product/${rev.productId}`}
                className="text-sm font-bold text-white hover:underline block truncate"
              >
                {rev.title}
              </Link>
            ) : (
              <h3 className="text-sm font-bold text-white truncate">
                {rev.title}
              </h3>
            )}
          </div>

          {/* Review Quote */}
          <p className="text-[11px] sm:text-xs leading-relaxed text-white/95 line-clamp-3">
            &quot;{rev.comment}&quot;
          </p>

          {/* Author */}
          <div className="flex items-center gap-2.5 pt-1">
            {rev.authorAvatar ? (
              <img
                src={rev.authorAvatar}
                alt={rev.author}
                className="w-8 h-8 rounded-full object-cover border border-white/40 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-xs font-bold shrink-0">
                {rev.author.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-white truncate">
                {rev.author}
              </p>
              {rev.authorRole && (
                <p className="text-[10px] text-white/75 truncate">
                  {rev.authorRole}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}
