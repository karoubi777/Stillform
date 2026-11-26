import {
  mockCatalogProducts,
  mockProductDetails,
  mockProductReviews,
} from "../../data/mock-general-products";
import { mockTopProducts, mockFlashSales } from "../../data/mockProducts";
import { recommendedProducts } from "../../data/recommende-products";
import { COUNTRIES } from "../../data/locations";
import { PAYMENT_METHODS, SHIPPING_METHODS } from "../../data/checkoutMethods";
import type {
  CountryOption,
  PaymentMethod,
  Product,
  ProductDetails,
  ProductReview,
  ShippingMethod,
} from "../../types/product";

export async function fetchProductById(id: number): Promise<Product | null> {
  // Backend replacement: return (await fetch(`/api/products/${id}`)).json();
  const all: Product[] = [
    ...mockCatalogProducts,
    ...mockTopProducts,
    ...mockFlashSales,
    ...recommendedProducts,
  ];
  return all.find((p) => p.id === id) ?? null;
}

export async function fetchProductDetails(
  productId: number,
): Promise<ProductDetails> {
  // Backend replacement: return (await fetch(`/api/products/${productId}/details`)).json();
  return (
    mockProductDetails[productId] ?? {
      productId,
      description:
        "Short dress with a plunging V-neckline and tie detail. Wide sleeves falling below the elbow. Contrast bead details. Invisible back zip fastening.",
      specs: [
        "Length | Regular",
        "Pattern | Floral",
        "Size | 38",
        "Fit | Regular fit",
        "Age group | Adult",
        "Leg opening | Wide leg",
        "Sleeve length | Long sleeve",
        "Package contents | 2 pcs",
      ],
      composition:
        "We work with monitoring programmes to ensure compliance with our social, environmental and health and safety standards for our products.",
      outerShell: "90% cotton 10% linen",
      careInstructions: [
        "Machine wash at max. 30°C/86°F with short spin cycle",
        "Iron at a maximum of 110°C/230°F",
        "Do not dry clean",
        "Do not tumble dry",
        "Wash inside out",
        "Wash separately",
      ],
    }
  );
}

export async function fetchProductReviews(
  productId: number,
): Promise<ProductReview[]> {
  // Backend replacement: return (await fetch(`/api/products/${productId}/reviews`)).json();
  return mockProductReviews[productId] ?? mockProductReviews[301] ?? [];
}

export async function fetchShippingAndPaymentOptions(): Promise<{
  countries: CountryOption[];
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
}> {
  // Backend replacement: fetch from your shipping/payment config endpoints
  return {
    countries: COUNTRIES,
    shippingMethods: SHIPPING_METHODS,
    paymentMethods: PAYMENT_METHODS,
  };
}
import { mockRelatedProducts } from "../../data/mockProducts";
// ...existing imports

export async function fetchRelatedProducts(query?: string): Promise<Product[]> {
  // Backend replacement: return (await fetch(`/api/products/related?q=${encodeURIComponent(query || "")}`)).json();
  void query;
  return mockRelatedProducts;
}
