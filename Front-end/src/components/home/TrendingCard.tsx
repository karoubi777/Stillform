type TrendingCardProps = {
  title: string;
  description: string;
  price: number;
  image: string;
  isNewArrival?: boolean;
};

export default function TrendingCard({
  title,
  description,
  price,
  image,
  isNewArrival = false,
}: TrendingCardProps) {
  return (
    <article className="w-full overflow-hidden rounded-xl bg-[#252525]">
      {/* Product image */}
      <div className="relative aspect-[1.04/1] w-full">
        <img src={image} alt={title} className="h-full w-full object-cover" />

        {/* Conditional new-arrival label */}
        {isNewArrival && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-[#00B96B] px-2 py-1.5 text-[11px] font-medium text-white shadow-sm">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 3H5a2 2 0 0 0-2 2v11" />
              <path d="M8 6h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
              <path d="m12 11 1.5 2 2.5.5-1.7 1.7.3 2.3-2.6-1.2-2.3 1.2.3-2.3-1.7-1.7 2.5-.5Z" />
            </svg>
            New Arrivals
          </span>
        )}
      </div>

      {/* Product information */}
      <div className="flex min-h-[100px] items-center justify-between gap-3 px-4 py-3 text-white">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-6">{title}</h3>

          <p className="mt-1 truncate text-sm text-white/60">{description}</p>
        </div>

        <a
          href="#"
          className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-white/70 px-4 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-[#252525]"
        >
          ${price.toFixed(0)}&nbsp; Shop Now
        </a>
      </div>
    </article>
  );
}
