import type { BlogPost } from "../../types/product";

interface BlogFeaturedRowProps {
  widePost: BlogPost;
  portraitPost: BlogPost;
  onSelectPost: (post: BlogPost) => void;
}

export default function BlogFeaturedRow({
  widePost,
  portraitPost,
  onSelectPost,
}: BlogFeaturedRowProps) {
  return (
    <div className="grid grid-cols-[1.6fr_1fr] sm:grid-cols-3 gap-3 sm:gap-4">
      {/* Left Wide Featured Card */}
      <article className="sm:col-span-2 relative bg-[#EDEDED] rounded-sm overflow-hidden min-h-[210px] sm:min-h-[270px] flex items-center justify-between p-4 sm:p-6">
        <div className="relative z-10 w-[62%] sm:w-[56%] flex flex-col justify-between h-full text-left gap-2.5 sm:gap-3">
          <div>
            <h2 className="text-xs sm:text-base font-bold text-gray-900 leading-snug line-clamp-3">
              {widePost.title}
            </h2>
            <p className="mt-2 text-[10px] sm:text-xs text-gray-600 leading-relaxed line-clamp-4 sm:line-clamp-5">
              {widePost.excerpt}
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => onSelectPost(widePost)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 h-[30px] sm:h-[36px] rounded bg-[#3B72D9] hover:bg-[#2C62C9] text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wide transition active:scale-[0.99]"
            >
              <span>READ MORE</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-[48%] sm:w-[46%] flex items-end justify-end">
          <img
            src={widePost.image}
            alt={widePost.title}
            className="h-full w-full object-contain object-right-bottom"
          />
        </div>
      </article>

      {/* Right Portrait Image Overlay Card */}
      <article
        onClick={() => onSelectPost(portraitPost)}
        className="sm:col-span-1 relative rounded-sm overflow-hidden min-h-[210px] sm:min-h-[270px] cursor-pointer group bg-gray-200"
      >
        <img
          src={portraitPost.image}
          alt={portraitPost.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="relative z-10 h-full flex items-end justify-center p-3 sm:p-5 text-center">
          <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
            {portraitPost.title}
          </h3>
        </div>
      </article>
    </div>
  );
}
