import { useState, useMemo } from "react";
import type { Product, ProductReview } from "../../types/product";

interface ProductReviewsTabProps {
  product: Product;
  reviews: ProductReview[];
  isLoading: boolean;
  onVoteReview: (reviewId: number, vote: "like" | "dislike") => void;
  onSubmitReview: (
    review: Omit<
      ProductReview,
      "id" | "date" | "likes" | "dislikes" | "userVote"
    >,
  ) => void;
}

function StarRow({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5 shrink-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${
            i < filled ? "text-[#FBBF24]" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductReviewsTab({
  product,
  reviews,
  isLoading,
  onVoteReview,
  onSubmitReview,
}: ProductReviewsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Review Form State
  const [formTitle, setFormTitle] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formAdvantages, setFormAdvantages] = useState("");
  const [formDisadvantages, setFormDisadvantages] = useState("");
  const [formComment, setFormComment] = useState("");

  // Compute star distribution from reviews (falls back cleanly if reviews list is small)
  const ratingBars = useMemo(() => {
    const total = reviews.length;
    return ([5, 4, 3, 2, 1] as const).map((star) => {
      if (total === 0) return { star, percent: 0 };
      const count = reviews.filter((r) => Math.round(r.rating) === star).length;
      return { star, percent: Math.round((count / total) * 100) };
    });
  }, [reviews]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return product.rating || 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  }, [reviews, product.rating]);

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formTitle.trim() || !formAuthor.trim() || !formComment.trim()) return;

    onSubmitReview({
      title: formTitle.trim(),
      author: formAuthor.trim(),
      rating: formRating,
      advantages: formAdvantages.trim() || "-",
      disadvantages: formDisadvantages.trim() || "-",
      comment: formComment.trim(),
      images: [],
    });

    setFormTitle("");
    setFormAuthor("");
    setFormRating(5);
    setFormAdvantages("");
    setFormDisadvantages("");
    setFormComment("");
    setIsModalOpen(false);
  }

  if (isLoading) {
    return (
      <div className="py-10 text-center text-xs text-gray-400">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="w-full pt-6 text-left">
      {/* ================= TOP SUMMARY & RATING BARS ================= */}
      <div className="max-w-[760px] mx-auto pb-8 grid grid-cols-2 gap-4 sm:gap-12 items-center">
        {/* Left: Average Rating + Write Review Button */}
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900">
            Total review rate
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
            Average rating ({reviews.length} Reviews &amp; {product.reviews}{" "}
            Ratings)
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRow rating={averageRating} />
            <span className="text-xs font-bold text-gray-800">
              {averageRating}/5
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-2 px-3 sm:px-4 h-[34px] rounded border border-gray-800 bg-white hover:bg-gray-50 text-[11px] sm:text-xs font-medium text-gray-800 transition active:scale-[0.99]"
          >
            Write a customer review
          </button>
        </div>

        {/* Right: 5-Star Breakdown Bars */}
        <div className="flex flex-col gap-2">
          {ratingBars.map(({ star, percent }) => (
            <div
              key={star}
              className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-gray-600"
            >
              <span className="w-10 sm:w-12 shrink-0 whitespace-nowrap">
                {star} {star === 1 ? "Star" : "Stars"}
              </span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${percent}%` }}
                  className="h-full bg-[#3B72D9] rounded-full transition-all duration-300"
                />
              </div>
              <span className="w-8 text-right shrink-0">{percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= REVIEWS LIST ================= */}
      {reviews.length === 0 ? (
        <div className="border-t border-gray-200 py-10 text-center text-xs text-gray-400">
          No customer reviews yet. Be the first to write one!
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-200 border-t border-gray-200">
          {reviews.map((rev) => (
            <article key={rev.id} className="py-6 sm:py-8">
              {/* Row 1: Stars + Title/Author + Like/Dislike */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 sm:gap-8 min-w-0">
                  <div className="pt-0.5">
                    <StarRow rating={rev.rating} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                      {rev.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      By {rev.author}
                    </p>
                  </div>
                </div>

                {/* Helpful Vote Pill */}
                <div className="inline-flex items-center border border-gray-200 rounded divide-x divide-gray-200 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => onVoteReview(rev.id, "like")}
                    aria-label="Helpful"
                    className={`px-2.5 h-7 flex items-center gap-1.5 text-[11px] transition ${
                      rev.userVote === "like"
                        ? "bg-blue-50 text-[#3B72D9] font-semibold"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{rev.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onVoteReview(rev.id, "dislike")}
                    aria-label="Not helpful"
                    className={`px-2.5 h-7 flex items-center gap-1.5 text-[11px] transition ${
                      rev.userVote === "dislike"
                        ? "bg-red-50 text-[#FF3B16] font-semibold"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 rotate-180"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{rev.dislikes}</span>
                  </button>
                </div>
              </div>

              {/* Row 2: Advantages, Disadvantages & Review Body */}
              <div className="mt-4 sm:pl-[104px] flex flex-col gap-2.5 text-xs">
                <div className="flex items-start gap-4">
                  <span className="text-gray-400 w-24 shrink-0">
                    Advantages
                  </span>
                  <span className="text-gray-800">{rev.advantages}</span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-gray-400 w-24 shrink-0">
                    Disadvantages
                  </span>
                  <span className="text-gray-800">{rev.disadvantages}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
                  <span className="text-gray-400 w-24 shrink-0">Review</span>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    {rev.comment}
                  </p>
                </div>
              </div>

              {/* Row 3: Review Photos */}
              {rev.images && rev.images.length > 0 && (
                <div className="mt-4 sm:pl-[104px] flex items-center gap-2.5 flex-wrap">
                  {rev.images.map((img, idx) => (
                    <img
                      key={`${rev.id}-img-${idx}`}
                      src={img}
                      alt={`Review attachment ${idx + 1}`}
                      className="w-14 h-16 sm:w-16 sm:h-20 object-cover rounded bg-[#F5F6F6] border border-gray-100"
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* ================= WRITE A REVIEW MODAL ================= */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleFormSubmit}
            className="w-full max-w-[440px] bg-white rounded-md p-6 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">
                Write a Customer Review
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    className="p-0.5"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        star <= formRating ? "text-[#FBBF24]" : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  className="w-full h-[38px] px-3 rounded border border-gray-300 text-xs outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Review Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full h-[38px] px-3 rounded border border-gray-300 text-xs outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Advantages
                </label>
                <input
                  type="text"
                  value={formAdvantages}
                  onChange={(e) => setFormAdvantages(e.target.value)}
                  placeholder="Color, Size..."
                  className="w-full h-[38px] px-3 rounded border border-gray-300 text-xs outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Disadvantages
                </label>
                <input
                  type="text"
                  value={formDisadvantages}
                  onChange={(e) => setFormDisadvantages(e.target.value)}
                  placeholder="Optional"
                  className="w-full h-[38px] px-3 rounded border border-gray-300 text-xs outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Review</label>
              <textarea
                rows={3}
                required
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full p-3 rounded border border-gray-300 text-xs outline-none focus:border-gray-900 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 h-[36px] rounded border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 h-[36px] rounded bg-[#3B72D9] hover:bg-[#2C62C9] text-white text-xs font-semibold"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
