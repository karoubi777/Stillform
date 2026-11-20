type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  const safeRating = Math.min(5, Math.max(0, rating));

  return (
    <div
      className="flex items-center gap-[3px]"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((star) => {
        const fillPercentage = Math.min(
          100,
          Math.max(0, (safeRating - star) * 100),
        );

        return (
          <span
            key={star}
            className="relative inline-block text-[21px] leading-none"
          >
            {/* Empty star */}
            <span className="text-[#e5e5e5]">★</span>

            {/* Filled portion */}
            <span
              className="absolute left-0 top-0 overflow-hidden text-[#ffb900]"
              style={{ width: `${fillPercentage}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </div>
  );
}
