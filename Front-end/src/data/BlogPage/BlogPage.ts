export type HeroStorySlide = {
  id: number;
  tabTitle: string;
  tabSummary: string;
  headline: string;
  description: string;
  date: string;
  likes: number;
  comments: number;
  image: string;
  readMoreUrl?: string;
};

export const BLOG_HERO_SLIDES: HeroStorySlide[] = [
  {
    id: 1,
    tabTitle: "ELEVATING EVERYDAY STYLE",
    tabSummary:
      "Explore the art of blending high-end and budget-friendly fashion items to create stylish and versatile outfits.",
    headline: "STUNNING BAREFOOTED WOMAN OF 2023",
    description:
      "In the heart of a chic urban studio, the atmosphere buzzed with excitement as a trendy fur coat took center stage during a vibrant photoshoot.",
    date: "20 July 2023",
    likes: 830,
    comments: 19,
    image: "/images/blog/woman.png",
    readMoreUrl: "#elevating-everyday-style",
  },
  {
    id: 2,
    tabTitle: "SUSTAINABLE FASHION",
    tabSummary:
      "Discuss the growing importance of sustainable fashion and its impact on the environment.",
    headline: "CONSCIOUS FABRICS FOR A BETTER TOMORROW",
    description:
      "From organic cotton blends to ethical dyeing studios, discover how modern collections reduce waste while keeping timeless tailoring intact.",
    date: "14 August 2023",
    likes: 642,
    comments: 27,
    image: "/images/blog/hero-woman.png",
    readMoreUrl: "#sustainable-fashion",
  },
  {
    id: 3,
    tabTitle: "THE EVOLUTION OF WORKWEAR",
    tabSummary:
      "Showcase versatile outfit ideas that strike a balance between professionalism and personal expression.",
    headline: "REDEFINING TAILORED OFFICE SILHOUETTES",
    description:
      "Soft-structured blazers, relaxed trousers, and breathable layers designed to move effortlessly from morning meetings to evening plans.",
    date: "02 September 2023",
    likes: 915,
    comments: 34,

    image: "/images/blog/hero-woman.png",
    readMoreUrl: "#evolution-of-workwear",
  },
];
