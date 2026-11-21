import type { BlogPost, Review } from "../../types/product";

export const MOCK_HERO_BLOGS: BlogPost[] = [
  {
    id: 1,
    tabTitle: "ELEVATING EVERYDAY STYLE",
    tabSummary:
      "Explore the art of blending high-end and budget-friendly fashion items to create stylish and versatile outfits.",
    title: "STUNNING BAREFOOTED WOMAN OF 2023",
    excerpt:
      "In the heart of a chic urban studio, the atmosphere buzzed with excitement as a trendy fur coat took center stage during a vibrant photoshoot.",
    content:
      "In the heart of a chic urban studio, the atmosphere buzzed with excitement as a trendy fur coat took center stage during a vibrant photoshoot. By pairing textured statement layers with minimalist everyday essentials, you can create looks that feel editorial yet effortless.",
    category: "Fashion",
    image: "/images/blog/blog-1.png",
    publishedAt: "20 July 2023",
    likes: 830,
    isLiked: false,
    commentsCount: 19,
    theme: {
      bgColor: "#A891C7",
      accentColor: "#F5B400",
    },
  },
  {
    id: 2,
    tabTitle: "SUSTAINABLE FASHION",
    tabSummary:
      "Discuss the growing importance of sustainable fashion and its impact on the environment.",
    title: "CONSCIOUS FABRICS FOR A BETTER TOMORROW",
    excerpt:
      "From organic cotton blends to ethical dyeing studios, discover how modern collections reduce waste while keeping timeless tailoring intact.",
    content:
      "Sustainable fashion is shifting from niche capsules to everyday staples. Choosing durable natural fibers like organic cotton and linen dramatically extends garment lifespan while lowering water and energy consumption.",
    category: "Fashion",
    image: "/images/blog/blog-1.png",
    publishedAt: "14 August 2023",
    likes: 642,
    isLiked: false,
    commentsCount: 27,
    theme: {
      bgColor: "#A891C7",
      accentColor: "#F5B400",
    },
  },
  {
    id: 3,
    tabTitle: "THE EVOLUTION OF WORKWEAR",
    tabSummary:
      "Showcase versatile outfit ideas that strike a balance between professionalism and personal expression.",
    title: "REDEFINING TAILORED OFFICE SILHOUETTES",
    excerpt:
      "Soft-structured blazers, relaxed trousers, and breathable layers designed to move effortlessly from morning meetings to evening plans.",
    content:
      "Modern workwear no longer forces a choice between comfort and polish. Relaxed tailoring, neutral palettes, and breathable knits adapt seamlessly across remote days and in-person presentations.",
    category: "Fashion",
    image: "/images/about/blog-2.png",
    publishedAt: "02 September 2023",
    likes: 915,
    isLiked: false,
    commentsCount: 34,
    theme: {
      bgColor: "#2893C7",
      accentColor: "#F5B400",
    },
  },
];

export const MOCK_FEATURED_WIDE: BlogPost = {
  id: 4,
  title:
    "Stylish woman in summer outfit isolated posing in fashion trend isolated",
  excerpt:
    "In this captivating scene, a stylish woman stands confidently against a pristine backdrop, capturing the essence of summer's allure. Bathed in the gentle sunlight, she emanates an air of effortless chic.",
  content:
    "Bathed in the gentle sunlight, she emanates an air of effortless chic. Her outfit is a harmonious blend of contemporary trends and timeless elegance, perfectly attuned to the vibrant season.",
  category: "Fashion",
  image: "/images/blog/blog-1.png",
  publishedAt: "1 hour ago",
  likes: 128,
  isLiked: false,
  commentsCount: 14,
};

export const MOCK_FEATURED_PORTRAIT: BlogPost = {
  id: 5,
  title: "woman with a blonde hair in a bonnet hood dressed on her head",
  excerpt: "Minimal winter layers and cozy knitwear accessories for cold days.",
  content:
    "Minimal winter layers and cozy knitwear accessories bring warmth without sacrificing silhouette. Pair earth-toned coats with soft ribbed hoods for effortless cold-weather styling.",
  category: "Fashion",
  image: "/images/blog/blog-2.png",
  publishedAt: "2 hours ago",
  likes: 94,
  isLiked: false,
  commentsCount: 8,
};

export const MOCK_LATEST_POSTS: BlogPost[] = [
  {
    id: 6,
    title: "Stylish young man out in town",
    excerpt:
      "In the heart of the bustling city, a stylish young man navigates the urban landscape with an air of contemporary confidence. His ensemble effortlessly captures the essence of city chic...",
    content:
      "In the heart of the bustling city, a stylish young man navigates the urban landscape with an air of contemporary confidence. Neutral overshirts layered over crisp tees remain a timeless urban staple.",
    category: "Fashion",
    image: "/images/blog/blog-3.png",
    publishedAt: "3 hours ago",
    likes: 76,
    isLiked: false,
    commentsCount: 21,
  },
  {
    id: 7,
    title: "Aptkdoe Smartwatch Women Men",
    excerpt:
      "Discover how sleek wearable tech blends everyday fitness tracking with versatile minimalist straps designed for both casual and formal outfits...",
    content:
      "Modern smartwatches bridge performance tracking and minimalist design. With interchangeable straps and crisp displays, they complement both workout gear and tailored looks.",
    category: "tech",
    image: "/images/blog/blog-4.png",
    publishedAt: "4 hours ago",
    likes: 112,
    isLiked: false,
    commentsCount: 56,
  },
  {
    id: 8,
    title: "Anker 325 power bank",
    excerpt:
      "Anker 325 power bank, 20000mAh external battery PowerIQ technology USB-C port, enormous energy density, compatible with iPhone, Samsung Galaxy, iPad and more...",
    content:
      "Reliable portable power is essential for busy travel days. High-density USB-C battery packs keep phones, tablets, and wireless earbuds charged anywhere.",
    category: "tech",
    image: "/images/blog/blog-5.png",
    publishedAt: "4 hours ago",
    likes: 54,
    isLiked: false,
    commentsCount: 10,
  },
];

export const MOCK_LATEST_REVIEWS: Review[] = [
  {
    id: 1001,
    title: "Wireless Earbuds",
    author: "Nina Markez",
    authorRole: "Programmer",
    authorAvatar: "/images/blog/avatar-1.png",
    rating: 5,
    date: "1 hour ago",
    comment:
      "I've been using the XYZ Wireless Earbuds for a few weeks now, and they've completely...",
    likes: 12,
    dislikes: 0,
    productId: 301,
  },
  {
    id: 1002,
    title: "Wireless Earbuds",
    author: "Nina Markez",
    authorRole: "Programmer",
    authorAvatar: "/images/blog/avatar-1.png",
    rating: 5,
    date: "2 hours ago",
    comment:
      "I've been using the XYZ Wireless Earbuds for a few weeks now, and they've completely...",
    likes: 8,
    dislikes: 1,
    productId: 302,
  },
  {
    id: 1003,
    title: "Wireless Earbuds",
    author: "Nina Markez",
    authorRole: "Programmer",
    authorAvatar: "/images/blog/avatar-1.png",
    rating: 4,
    date: "3 hours ago",
    comment:
      "I've been using the XYZ Wireless Earbuds for a few weeks now, and they've completely...",
    likes: 5,
    dislikes: 0,
    productId: 303,
  },
  {
    id: 1004,
    title: "Wireless Earbuds",
    author: "Nina Markez",
    authorRole: "Programmer",
    authorAvatar: "/images/blog/avatar-1.png",
    rating: 5,
    date: "5 hours ago",
    comment:
      "I've been using the XYZ Wireless Earbuds for a few weeks now, and they've completely...",
    likes: 9,
    dislikes: 0,
    productId: 304,
  },
];
