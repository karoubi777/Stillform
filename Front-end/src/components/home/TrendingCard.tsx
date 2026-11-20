import { Link } from "react-router-dom";

type TrendingCardProps = {
  id?: number | string;
  title: string;
  description: string;
  price: number;
  image: string;
  isNewArrival?: boolean;
};

export default function TrendingCard({
  id,
  title,
  description,
  price,
  image,
  isNewArrival = false,
}: TrendingCardProps) {
  const targetUrl = id
    ? `/catalog/${id}`
    : `/catalog?q=${encodeURIComponent(title)}`;

  return (
    <article
      className="
        flex flex-col justify-between overflow-hidden rounded-xl bg-[#262626]
        w-full h-[437px] 
        sm:max-w-[811px] 
        lg:max-w-[406px]
        mx-auto shadow-md
      "
    >
      {/* Product Image Area */}
      <Link
        to={targetUrl}
        className="relative flex-1 w-full min-h-0 overflow-hidden block"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-300"
        />

        {isNewArrival && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-[#00B96B] px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
      </Link>

      {/* Product Information Footer */}
      <div className="flex h-[80px] shrink-0 items-center justify-between gap-3 px-5 py-3 text-white bg-[#262626]">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm sm:text-base font-semibold leading-tight text-white">
            {title}
          </h3>
          <p className="mt-1 truncate text-xs text-neutral-400">
            {description}
          </p>
        </div>

        <Link
          to={targetUrl}
          className="flex shrink-0 items-center justify-center whitespace-nowrap rounded border border-neutral-500/80 px-3.5 py-2 text-xs font-medium text-neutral-200 transition-colors hover:border-white hover:bg-white hover:text-[#262626]"
        >
          ${price.toFixed(0)}&nbsp; Shop Now
        </Link>
      </div>
    </article>
  );
}
