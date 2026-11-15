import type {
  FlashSaleProduct,
  Product,
  TrendingProduct,
  PromoBannerData,
  MagSafeSlide,
  CartItem,
} from "./types/product";

export const promoBannersMock: Record<
  "sectionOne" | "sectionTwo",
  PromoBannerData
> = {
  sectionOne: {
    firstImage: "/images/homepage/promo/red.png",
    firstBgColor: "#BF2E3B", // Red
    secondImage: "/images/homepage/promo/blue-dark.png",
    secondBgColor: "#1D5159", // Dark teal
  },
  sectionTwo: {
    firstImage: "/images/homepage/promo/pink.png",
    firstBgColor: "#D11FB5", // Blue
    secondImage: "/images/homepage/promo/blue.png",
    secondBgColor: "#0186C4", // Dark charcoal
  },
};
export const mockcartitems: CartItem[] = [
  {
    id: 101,
    brand: "Mango",
    name: "Kimono & Collar - Black - Regular fit",
    image: "/images/homepage/top100/photo-1.png",
    price: 218,
    originalPrice: 290,
    rating: 5,
    reviews: 289,
    reviewCount: 4,
    quantity: 1, // <-- Added quantity
    color: "red",
  },
  {
    id: 102,
    brand: "Zara",
    name: "Midi slip- Daily fit",
    image: "/images/homepage/top100/photo-2.png",
    price: 95,
    originalPrice: 145,
    rating: 5,
    reviews: 523,
    reviewCount: 3,
    quantity: 2,
    color: "red",
  },
  {
    id: 103,
    brand: "Uniqlo",
    name: "Midi skirt Slim fit - Bohemian",
    image: "/images/homepage/top100/photo-3.png",
    price: 125,
    originalPrice: 156,
    rating: 5,
    reviews: 106,
    reviewCount: 0,
    quantity: 1,
    color: "red",
  },
  {
    id: 104,
    brand: "Mango dress",
    name: "Kimono & Collar - Colorful - Night skirt fit",
    image: "/images/homepage/top100/photo-4.png",
    price: 365,
    originalPrice: 487,
    rating: 5,
    reviews: 121,
    reviewCount: 0,
    quantity: 1,
    color: "red",
  },
  {
    id: 101,
    brand: "Mango",
    name: "Kimono & Collar - Black - Regular fit",
    image: "/images/homepage/top100/photo-1.png",
    price: 218,
    originalPrice: 290,
    rating: 5,
    reviews: 289,
    reviewCount: 4,
    quantity: 1, // <-- Added quantity
    color: "red",
  },
];

export const mockFlashSales: FlashSaleProduct[] = [
  {
    id: 1,
    brand: "Tonny Black",
    name: "Shoulder bag-White-Plain",
    image: "/images/homepage/flash-sales/bag.jpg",
    price: 69.99,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    reviewCount: 0,
  },
  {
    id: 2,
    brand: "Reebok",
    name: "Women's Powder sneakers",
    image: "/images/homepage/flash-sales/shoe.png",
    price: 112.02,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    reviewCount: 0,
  },
  {
    id: 3,
    brand: "Patso",
    name: "Shoulder bag-Pink-Plain",
    image: "/images/homepage/flash-sales/bag-2.jpg",
    price: 69.99,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(
      Date.now() + 2 * 60 * 60 * 1000 + 14 * 60 * 1000,
    ).toISOString(),
    reviewCount: 0,
  },
  {
    id: 4,
    brand: "Sketchers",
    name: "Sport-shoe D'LIT",
    image: "/images/homepage/flash-sales/shoe2.jpg",
    price: 80.2,
    originalPrice: 129.99,
    rating: 4,
    reviews: 54,
    endTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    reviewCount: 0,
  },
];

export const mockTrendingProducts: TrendingProduct[] = [
  {
    id: 1,
    title: "Cool & Sexy Calvin Klein",
    description: "Dotted dress-Casual",
    price: 89,
    image: "/images/homepage/trending/first-pic.jpg",
    isNewArrival: true,
  },
  {
    id: 2,
    title: "Cool & Sexy Calvin Klein",
    description: "Dotted dress-Casual",
    price: 89,
    image: "/images/homepage/trending/second-pic.jpg",
    isNewArrival: false,
  },
  {
    id: 3,
    title: "beige coat Zara",
    description: "Cream-Brown-Formal",
    price: 102,
    image: "/images/homepage/trending/third-pic.jpg",
    isNewArrival: true,
  },
];

export const mockTopProducts: Product[] = [
  {
    id: 101,
    brand: "Mango",
    name: "Kimono & Collar - Black - Regular fit",
    image: "/images/homepage/top100/photo-1.png",
    price: 218,
    originalPrice: 290,
    rating: 5,
    reviews: 289,
    reviewCount: 4,
  },
  {
    id: 102,
    brand: "Zara",
    name: "Midi slip- Daily fit",
    image: "/images/homepage/top100/photo-2.png",
    price: 95,
    originalPrice: 145,
    rating: 5,
    reviews: 523,
    reviewCount: 3,
  },
  {
    id: 103,
    brand: "Uniqlo",
    name: "Midi skirt Slim fit - Bohemian",
    image: "/images/homepage/top100/photo-3.png",
    price: 125,
    originalPrice: 156,
    rating: 5,
    reviews: 106,
    reviewCount: 0,
  },
  {
    id: 104,
    brand: "Mango dress",
    name: "Kimono & Collar - Colorful - Night skirt fit",
    image: "/images/homepage/top100/photo-4.png",

    price: 365,
    originalPrice: 487,
    rating: 5,
    reviews: 121,
    reviewCount: 0,
  },
];
export const mockMagSafeSlides: MagSafeSlide[] = [
  {
    id: 1,
    title: "MAGSAFE",
    description:
      "Snap on a magnetic case, wallet, or both. And get faster wireless charging.",
    image: "/images/homepage/Iphone.png",
  },
  {
    id: 2,
    title: "AIRTAG",
    description:
      "Lose your knack for losing things. Attach one to your keys, slip another in your backpack.",
    image: "/images/homepage/Iphone.png",
  },
];
export const mockRelatedProducts: Product[] = [
  {
    id: 101,
    brand: "Mango",
    name: "Kimono & Collar - Black - Regular fit",
    image: "/images/homepage/top100/photo-1.png",
    price: 218,
    originalPrice: 290,
    rating: 5,
    reviews: 289,
    reviewCount: 4,
  },
  {
    id: 102,
    brand: "Zara",
    name: "Midi slip- Daily fit",
    image: "/images/homepage/top100/photo-2.png",
    price: 95,
    originalPrice: 145,
    rating: 5,
    reviews: 523,
    reviewCount: 3,
  },
  {
    id: 103,
    brand: "Uniqlo",
    name: "Midi skirt Slim fit - Bohemian",
    image: "/images/homepage/top100/photo-3.png",
    price: 125,
    originalPrice: 156,
    rating: 5,
    reviews: 106,
    reviewCount: 0,
  },
  {
    id: 104,
    brand: "Mango dress",
    name: "Kimono & Collar - Colorful - Night skirt fit",
    image: "/images/homepage/top100/photo-4.png",

    price: 365,
    originalPrice: 487,
    rating: 5,
    reviews: 121,
    reviewCount: 0,
  },
];

export const recommendedProducts: Product[] = [
  {
    id: 101,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    image: "/images/cart/recommended-1.png",
  },
  {
    id: 101,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    image: "/images/cart/recommended-1.png",
  },
  {
    id: 102,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    image: "/images/cart/recommended-2.png",
  },
  {
    id: 103,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    image: "/images/cart/recommended-3.png",
  },
  {
    id: 104,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    image: "/images/cart/recommended-4.png",
  },
];
