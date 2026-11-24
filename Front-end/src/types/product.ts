// Cart related
export type CartItemOption = {
  id: string;
  type: "insurance" | "gift-wrap" | "personalization";
  label: string;
  price: number;
};

export type CartItem = {
  id: number;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  options: CartItemOption[];
};

export type AppliedCoupon = {
  code: string;
  discountAmount: number;
};

export type CartTotals = {
  subtotal: number;
  optionsTotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export type CartState = {
  items: CartItem[];
  orderOptions: CartItemOption[]; // Services like gift-wrap / order insurance without a specific product
  coupon: AppliedCoupon | null;
  shippingCost: number;
  totals: CartTotals;
  loading: boolean;
  error: string | null;
};

//-------------------------------------------
export type SizingType =
  | "alpha" // XS, S, M, L, XL
  | "numeric" // 28, 30, 32, 34
  | "shoe" // EU 39, 40, 41...
  | "one-size" // One size
  | "none"; // No size selection

export interface SizeGuide {
  title: string;
  unit: string;
  columns: string[];
  rows: {
    size: string;
    measurements: number[];
  }[];
  note?: string;
}

export interface ProductSizing {
  type: SizingType;
  label?: string;
  system?: string;
  guide?: SizeGuide;
}

export type Product = {
  id: number;
  name: string;
  gender: string;
  description?: string;
  originalPrice: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  reviewCount: number;
  images?: string[];
  brand: string;
  category?: string;
  model?: string;
  style?: string;
  variants: ProductVariant[];
  sizing: ProductSizing;
};

export type ProductVariant = {
  id: number;
  color: {
    id: number;
    name: string;
    hex: string;
  };
  size: string | null;
  stock: number;
  image: string;
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

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  giftBoxPrice: number;
  total: number;
}

export type CheckoutStep =
  | "cart"
  | "customer-info"
  | "shipping-payment"
  | "confirmation";

export type CountryOption = {
  code: "US" | "DE";
  name: string;
  phoneCode: string;
  states: string[];
};

export type CustomerInfo = {
  email: string;
  firstName: string;
  lastName: string;
  country: CountryOption["code"] | "";
  state: string;
  address: string;
  phone: string;
};

export type PaymentMethod = {
  id: string;
  name: string;
  description: string;
  logo: string;
  available: boolean;
};

export type ShippingMethod = {
  id: string;
  name: string;
  deliveryTime: string;
  cost: number;
  insuranceAvailable: boolean;
  logo: string;
  available: boolean;
  supportedCountries?: CountryOption["code"][];
};

export type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount";

export type ProductFilterState = {
  searchQuery: string;
  gender: string;
  category: string;
  brandSearch: string;
  brands: string[];
  models: string[];
  styles: string[];
  colors: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
};

export type ProductDetails = {
  productId: number;
  description: string;
  specs: string[];
  composition: string;
  outerShell: string;
  careInstructions: string[];
};

export type DetailTab = "details" | "reviews" | "shipping";

export type Review = {
  id: number;
  title: string;
  author: string;
  authorAvatar?: string;
  authorRole?: string;
  rating: number;
  date: string;
  comment: string;
  advantages?: string;
  disadvantages?: string;
  images?: string[];
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | null;
  productId?: number;
  blogPostId?: number;
};

export type ProductReview = Review;

export type BlogTheme = {
  bgColor: string;
  accentColor?: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  tabTitle?: string;
  tabSummary?: string;
  theme?: BlogTheme;
};
