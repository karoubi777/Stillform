  import type { BlogPost } from "../../types/product";

  interface BlogPostsGridProps {
    posts: BlogPost[];
    onSelectPost: (post: BlogPost) => void;
    onToggleLike: (postId: number) => void;
  }

  export default function BlogPostsGrid({
    posts,
    onSelectPost,
    onToggleLike,
  }: BlogPostsGridProps) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-gray-100 rounded-sm shadow-xs overflow-hidden flex flex-col justify-between text-left hover:shadow-md transition-shadow"
          >
            <div>
              <button
                type="button"
                onClick={() => onSelectPost(post)}
                className="block w-full aspect-[4/3] bg-[#F5F6F6] overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>

              <div className="p-3 sm:p-4">
                <span className="text-[11px] font-medium text-[#FF8A00]">
                  {post.category}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectPost(post)}
                  className="block text-left mt-1"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 hover:underline">
                    {post.title}
                  </h3>
                </button>

                <p className="mt-2 text-[11px] sm:text-xs text-gray-500 leading-relaxed line-clamp-4">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-3 sm:px-4 pb-3 pt-1 flex items-center justify-between text-[11px] text-gray-400">
              <div className="flex items-center gap-3">
                <span>{post.publishedAt}</span>
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{post.commentsCount}</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => onToggleLike(post.id)}
                aria-label="Like blog post"
                className="inline-flex items-center gap-1 hover:text-[#FF3B16] transition"
              >
                <svg
                  className={`w-3.5 h-3.5 ${
                    post.isLiked ? "text-[#FF3B16]" : "text-gray-300"
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
                <span>{post.likes}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    );
  }
