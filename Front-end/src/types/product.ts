export type Product = {
  id: number | string;
  slug?: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  reviewCount?: number;
  category?: string;
  description?: string;
};
export type CartItem = Product & {
  quantity: number;
  color:string
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
