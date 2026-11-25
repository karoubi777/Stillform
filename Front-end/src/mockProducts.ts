import type {
  FlashSaleProduct,
  Product,
  ProductSizing,
  TrendingProduct,
  PromoBannerData,
  MagSafeSlide,
  CartItem,
} from "./types/product";

// Shared sizing configurations

const clothingSizing: ProductSizing = {
  type: "alpha",
  label: "Size",
  guide: {
    title: "Clothing size guide",
    unit: "cm",
    columns: ["Chest", "Waist", "Hip", "Length"],
    rows: [
      { size: "XS", measurements: [82, 64, 90, 60] },
      { size: "S", measurements: [86, 68, 94, 61] },
      { size: "M", measurements: [90, 72, 98, 62] },
      { size: "L", measurements: [96, 78, 104, 63] },
      { size: "XL", measurements: [102, 84, 110, 64] },
    ],
    note: "Measurements are illustrative mock data. Check the actual brand size guide before using these values.",
  },
};

const bagSizing: ProductSizing = {
  type: "one-size",
  label: "Size",
};

const shoeSizing: ProductSizing = {
  type: "shoe",
  label: "EU Size",
  system: "EU",
  guide: {
    title: "Shoe size guide",
    unit: "cm",
    columns: ["Foot length"],
    rows: [
      { size: "38", measurements: [24] },
      { size: "39", measurements: [24.5] },
      { size: "40", measurements: [25] },
      { size: "41", measurements: [25.5] },
      { size: "42", measurements: [26.5] },
      { size: "43", measurements: [27] },
    ],
    note: "Measurements are illustrative mock data.",
  },
};

export const promoBannersMock: Record<
  "sectionOne" | "sectionTwo",
  PromoBannerData
> = {
  sectionOne: {
    firstImage: "/images/homepage/promo/red.png",
    firstBgColor: "#BF2E3B",
    secondImage: "/images/homepage/promo/blue-dark.png",
    secondBgColor: "#1D5159",
  },
  sectionTwo: {
    firstImage: "/images/homepage/promo/pink.png",
    firstBgColor: "#D11FB5",
    secondImage: "/images/homepage/promo/blue.png",
    secondBgColor: "#0186C4",
  },
};

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
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 1011,
        color: { id: 1, name: "Red", hex: "#E11D48" },
        size: "M",
        stock: 6,
        images: ["/images/homepage/top100/photo-1.png"],
      },
      {
        id: 1012,
        color: { id: 2, name: "Black", hex: "#1F2937" },
        size: "L",
        stock: 4,
        images: ["/images/homepage/top100/photo-1.png"],
      },
    ],
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
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 1021,
        color: { id: 1, name: "Red", hex: "#E11D48" },
        size: "S",
        stock: 8,
        images: ["/images/homepage/top100/photo-2.png"],
      },
    ],
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
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 1031,
        color: { id: 3, name: "Sky Blue", hex: "#60A5FA" },
        size: "M",
        stock: 5,
        images: ["/images/homepage/top100/photo-3.png"],
      },
    ],
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
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 1041,
        color: { id: 4, name: "Mustard", hex: "#D4C257" },
        size: "L",
        stock: 3,
        images: ["/images/homepage/top100/photo-4.png"],
      },
    ],
  },
];

export const mockcartitems: CartItem[] = [
  {
    id: 1,
    product: mockTopProducts[0],
    variant: mockTopProducts[0].variants[0],
    options: [],
    quantity: 1,
  },
  {
    id: 2,
    product: mockTopProducts[1],
    variant: mockTopProducts[1].variants[0],
    options: [],
    quantity: 2,
  },
  {
    id: 3,
    product: mockTopProducts[2],
    variant: mockTopProducts[2].variants[0],
    options: [],
    quantity: 1,
  },
  {
    id: 4,
    product: mockTopProducts[3],
    variant: mockTopProducts[3].variants[0],
    options: [],
    quantity: 1,
  },
  {
    id: 5,
    product: mockTopProducts[0],
    variant: mockTopProducts[0].variants[1],
    options: [],
    quantity: 1,
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
    gender: "Women",
    sizing: bagSizing,
    variants: [
      {
        id: 11,
        color: { id: 5, name: "White", hex: "#F9FAFB" },
        size: "One Size",
        stock: 10,
        images: ["/images/homepage/flash-sales/bag.jpg"],
      },
    ],
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
    gender: "Women",
    sizing: shoeSizing,
    variants: [
      {
        id: 21,
        color: { id: 6, name: "Beige", hex: "#E5D3B3" },
        size: "38",
        stock: 7,
        images: ["/images/homepage/flash-sales/shoe.png"],
      },
    ],
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
    gender: "Women",
    sizing: bagSizing,
    variants: [
      {
        id: 31,
        color: { id: 7, name: "Pink", hex: "#F472B6" },
        size: "One Size",
        stock: 5,
        images: ["/images/homepage/flash-sales/bag-2.jpg"],
      },
    ],
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
    gender: "Women",
    sizing: shoeSizing,
    variants: [
      {
        id: 41,
        color: { id: 2, name: "Black", hex: "#1F2937" },
        size: "39",
        stock: 12,
        images: ["/images/homepage/flash-sales/shoe2.jpg"],
      },
    ],
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

export const mockRelatedProducts: Product[] = mockTopProducts;

export const recommendedProducts: Product[] = [
  {
    id: 201,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 32,
    reviewCount: 12,
    image: "/images/cart/recommended-1.png",
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 2011,
        color: { id: 8, name: "Blue", hex: "#2563EB" },
        size: "S",
        stock: 6,
        images: ["/images/cart/recommended-1.png"],
      },
    ],
  },
  {
    id: 202,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 28,
    reviewCount: 9,
    image: "/images/cart/recommended-2.png",
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 2021,
        color: { id: 9, name: "Navy", hex: "#1E3A8A" },
        size: "M",
        stock: 5,
        images: ["/images/cart/recommended-2.png"],
      },
    ],
  },
  {
    id: 203,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 41,
    reviewCount: 15,
    image: "/images/cart/recommended-3.png",
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 2031,
        color: { id: 7, name: "Pink", hex: "#EC4899" },
        size: "S",
        stock: 9,
        images: ["/images/cart/recommended-3.png"],
      },
    ],
  },
  {
    id: 204,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    rating: 4.3,
    reviews: 19,
    reviewCount: 6,
    image: "/images/cart/recommended-4.png",
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 2041,
        color: { id: 10, name: "Mint", hex: "#34D399" },
        size: "M",
        stock: 4,
        images: ["/images/cart/recommended-4.png"],
      },
    ],
  },
  {
    id: 205,
    brand: "Zara",
    name: "SHORT PRINTED DRESS",
    price: 69.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 22,
    reviewCount: 7,
    image: "/images/cart/recommended-1.png",
    gender: "Women",
    sizing: clothingSizing,
    variants: [
      {
        id: 2051,
        color: { id: 8, name: "Blue", hex: "#2563EB" },
        size: "L",
        stock: 3,
        images: ["/images/cart/recommended-1.png"],
      },
    ],
  },
];
