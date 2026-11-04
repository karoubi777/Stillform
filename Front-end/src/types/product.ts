export type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;

  image: string;

  price: number;
  originalPrice: number;
  reviews?: string;
  rating: number;
  reviewCount: number;

  isNewArrival: boolean;
};
