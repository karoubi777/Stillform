export type Product = {
  id: number;
  name: string;
  description?: string;
  originalPrice: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  reviewCount: number;
  images?: string[];
  brand: string;
  variants: ProductVariant[];
};

export type ProductVariant = {
  id: number;
  color: {
    id: number;
    name: string;
    hex: string;
  };
  size: string;
  stock: number;
  image: string;
};

export type CartItem = {
  id: number;
  product: Product;
  variant: ProductVariant;
  quantity: number;
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