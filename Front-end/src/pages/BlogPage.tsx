import { useState, useEffect } from "react";
import {
  fetchBlogPageData,
  toggleBlogLikeApi,
  type BlogPagePayload,
} from "../services/blogService";
import BlogEditorialSection from "../components/blog/BlogEditorialSection";
import BlogHero from "../components/blog/blog-hero";
import BlogFeaturedRow from "../components/blog/BlogFeaturedRow";
import BlogPostsGrid from "../components/blog/BlogPostsGrid";
import LatestReviewsSidebar from "../components/blog/LatestReviewsSidebar";
import type { BlogPost, Review } from "../types/product";

export default function BlogPage() {
  const [data, setData] = useState<BlogPagePayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Selected post for Reader + Reviews Modal
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postComments, setPostComments] = useState<Record<number, Review[]>>(
    {},
  );
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchBlogPageData().then((payload) => {
      if (cancelled) return;
      setData(payload);
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleToggleLike(postId: number) {
    if (!data) return;

    const findPost = [
      ...data.heroPosts,
      data.featuredWide,
      data.featuredPortrait,
      ...data.latestPosts,
    ].find((p) => p.id === postId);

    const res = await toggleBlogLikeApi(postId, Boolean(findPost?.isLiked));

    const updatePost = (p: BlogPost): BlogPost =>
      p.id === postId
        ? { ...p, likes: p.likes + res.likesDelta, isLiked: res.isLiked }
        : p;

    setData((prev) =>
      prev
        ? {
            ...prev,
            heroPosts: prev.heroPosts.map(updatePost),
            featuredWide: updatePost(prev.featuredWide),
            featuredPortrait: updatePost(prev.featuredPortrait),
            latestPosts: prev.latestPosts.map(updatePost),
          }
        : null,
    );

    setSelectedPost((prev) => (prev ? updatePost(prev) : null));
  }

  function handleAddComment(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedPost || !commentAuthor.trim() || !commentText.trim()) return;

    const newComment: Review = {
      id: Date.now(),
      title: selectedPost.title,
      author: commentAuthor.trim(),
      rating: 5,
      date: "Just now",
      comment: commentText.trim(),
      likes: 0,
      dislikes: 0,
      blogPostId: selectedPost.id,
    };

    setPostComments((prev) => ({
      ...prev,
      [selectedPost.id]: [newComment, ...(prev[selectedPost.id] ?? [])],
    }));

    const incrementComment = (p: BlogPost): BlogPost =>
      p.id === selectedPost.id
        ? { ...p, commentsCount: p.commentsCount + 1 }
        : p;

    setData((prev) =>
      prev
        ? {
            ...prev,
            heroPosts: prev.heroPosts.map(incrementComment),
            featuredWide: incrementComment(prev.featuredWide),
            featuredPortrait: incrementComment(prev.featuredPortrait),
            latestPosts: prev.latestPosts.map(incrementComment),
          }
        : null,
    );
    setSelectedPost((prev) => (prev ? incrementComment(prev) : null));

    setCommentAuthor("");
    setCommentText("");
  }

  if (isLoading || !data) {
    return (
      <div className="w-full py-16 text-center text-sm text-gray-500">
        Loading blog...
      </div>
    );
  }

  const activeComments = selectedPost
    ? (postComments[selectedPost.id] ?? [])
    : [];

  return (
    <div className="w-full bg-white pb-14">
      {/* 1. HERO BANNER */}
      <BlogHero
        posts={data.heroPosts}
        onReadMore={setSelectedPost}
        onToggleLike={handleToggleLike}
      />

      {/* 2. MAIN BLOG GRID (LEFT) + LATEST REVIEWS SIDEBAR (RIGHT) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[8.5%] pt-8 sm:pt-10">
        <div className="flex flex-col sm:flex-row items-start gap-5 lg:gap-6">
          <div className="w-full sm:flex-1 min-w-0">
            <BlogFeaturedRow
              widePost={data.featuredWide}
              portraitPost={data.featuredPortrait}
              onSelectPost={setSelectedPost}
            />

            <BlogPostsGrid
              posts={data.latestPosts}
              onSelectPost={setSelectedPost}
              onToggleLike={handleToggleLike}
            />
          </div>

          <LatestReviewsSidebar reviews={data.latestReviews} />
        </div>
      </section>
      <BlogEditorialSection />
      {/* 3. ARTICLE READER + COMMENTS MODAL */}
      {selectedPost && (
        <div
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[600px] max-h-[85vh] overflow-y-auto bg-white rounded-md p-6 shadow-2xl text-left"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-[11px] font-semibold text-[#FF8A00] uppercase">
                  {selectedPost.category}
                </span>
                <h2 className="text-lg font-bold text-gray-900 mt-0.5">
                  {selectedPost.title}
                </h2>
                <p className="text-[11px] text-gray-400 mt-1">
                  {selectedPost.publishedAt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-black text-base font-bold"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-56 object-cover rounded bg-[#F5F6F6] mb-4"
            />

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
              {selectedPost.content}
            </p>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 text-xs">
              <button
                type="button"
                onClick={() => handleToggleLike(selectedPost.id)}
                className={`inline-flex items-center gap-1.5 px-3 h-8 rounded border transition ${
                  selectedPost.isLiked
                    ? "border-[#FF3B16] text-[#FF3B16] bg-red-50"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>♥</span>
                <span>{selectedPost.likes} Likes</span>
              </button>
              <span className="text-gray-500">
                {selectedPost.commentsCount} Comments
              </span>
            </div>

            {/* Post Comments / Reviews */}
            <div className="pt-4">
              <h3 className="text-xs font-bold uppercase text-gray-900 mb-3">
                Reader Reviews ({activeComments.length})
              </h3>

              <form
                onSubmit={handleAddComment}
                className="flex flex-col gap-2.5 mb-4"
              >
                <input
                  type="text"
                  required
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Your name"
                  className="w-full h-9 px-3 rounded border border-gray-300 text-xs outline-none focus:border-gray-900"
                />
                <textarea
                  rows={2}
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment on this article..."
                  className="w-full p-2.5 rounded border border-gray-300 text-xs outline-none focus:border-gray-900 resize-none"
                />
                <button
                  type="submit"
                  className="self-end px-4 h-8 rounded bg-[#3B72D9] hover:bg-[#2C62C9] text-white text-xs font-semibold"
                >
                  Post Comment
                </button>
              </form>

              <div className="flex flex-col divide-y divide-gray-100">
                {activeComments.map((c) => (
                  <div key={c.id} className="py-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">
                        {c.author}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {c.date}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{c.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
