import ProductShelfSwiper from "../product-detail/ProductShelfSwiper";
import type { Product, ProductVariant } from "../../types/product";

interface RecommendedProductsProps {
  products: Product[];
  onAddToCart?: (product: Product, variant: ProductVariant) => void;
}

export default function RecommendedProducts({
  products,
  onAddToCart,
}: RecommendedProductsProps) {
  return (
    <ProductShelfSwiper
      title="YOU MIGHT ALSO LIKE"
      products={products}
      onAddToCart={onAddToCart}
    />
  );
}
