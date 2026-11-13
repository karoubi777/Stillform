export type Product = {
  id: number | string;
  brand: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews?: number; // Optional
  reviewCount?: number; // Optional (or remove if using reviews)
  description?: string;
};

export type FlashSaleProduct = Product & {
  endTime: string;
};

export type TrendingProduct = {
  id: number | string;
  title: string;
  description: string;
  price: number;
  image: string;
  isNewArrival?: boolean;
};

export type PromoBannerData = {
  firstImage: string;
  firstBgColor: string;
  secondImage: string;
  secondBgColor: string;
};
export type MagSafeSlide = {
  id: number | string;
  title: string;
  description: string;
  image: string;
};