import {
  MOCK_HERO_BLOGS,
  MOCK_FEATURED_WIDE,
  MOCK_FEATURED_PORTRAIT,
  MOCK_LATEST_POSTS,
  MOCK_LATEST_REVIEWS,
} from "../data/BlogPage/MockBlog";
import type { BlogPost, Review } from "../types/product";

export type BlogPagePayload = {
  heroPosts: BlogPost[];
  featuredWide: BlogPost;
  featuredPortrait: BlogPost;
  latestPosts: BlogPost[];
  latestReviews: Review[];
};

export async function fetchBlogPageData(): Promise<BlogPagePayload> {
  // Backend replacement: fetch from GET /api/blogs/overview & GET /api/reviews/latest
  return {
    heroPosts: MOCK_HERO_BLOGS,
    featuredWide: MOCK_FEATURED_WIDE,
    featuredPortrait: MOCK_FEATURED_PORTRAIT,
    latestPosts: MOCK_LATEST_POSTS,
    latestReviews: MOCK_LATEST_REVIEWS,
  };
}

export async function toggleBlogLikeApi(
  postId: number,
  currentlyLiked: boolean,
): Promise<{ likesDelta: number; isLiked: boolean }> {
  // Backend replacement: POST /api/blogs/${postId}/like
  void postId;
  return {
    likesDelta: currentlyLiked ? -1 : 1,
    isLiked: !currentlyLiked,
  };
}
