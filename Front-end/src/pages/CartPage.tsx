import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { mockcartitems, recommendedProducts } from "../mockProducts";

import CheckoutStepper from "../components/cart/CheckoutStepper";
import CartItemsList from "../components/cart/CartItemsList";
import OrderSummary from "../components/cart/OrderSummary";
import RecommendedProducts from "../components/cart/RecommendedProducts";
import type {
  CartItem,
  CheckoutStep,
  OrderTotals,
  Product,
  ProductVariant,
} from "../types/product";

const STEP_ORDER: CheckoutStep[] = [
  "cart",
  "customer-info",
  "shipping-payment",
  "confirmation",
];

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");

  const [items, setItems] = useState<CartItem[]>(mockcartitems);
  const [packInGiftBox, setPackInGiftBox] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  function handleQuantityChange(id: number, delta: number) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextQty = Math.min(
          item.variant.stock,
          Math.max(1, item.quantity + delta),
        );
        return { ...item, quantity: nextQty };
      }),
    );
  }

  function handleRemoveItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleAddRecommendedToCart(
    product: Product,
    variant: ProductVariant,
  ) {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id && item.variant.id === variant.id,
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? {
                ...item,
                quantity: Math.min(variant.stock, item.quantity + 1),
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: Date.now(),
          product,
          variant,
          quantity: 1,
        },
      ];
    });
  }

  function handleCouponSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    setDiscountAmount(couponCode.trim() ? 10 : 0);
  }

  function handleAdvanceStep() {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    } else {
      alert("Order confirmed!");
    }
  }

  const totals: OrderTotals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const shipping = 0;
    const tax = 0;
    const giftBoxPrice = packInGiftBox ? 10.9 : 0;
    const discount = isAuthenticated ? discountAmount : 0;
    const total = Math.max(
      0,
      subtotal + shipping + tax + giftBoxPrice - discount,
    );

    return { subtotal, shipping, tax, discount, giftBoxPrice, total };
  }, [items, packInGiftBox, discountAmount, isAuthenticated]);

  return (
    <div className="w-full bg-white py-6 px-4 sm:px-6 lg:px-[8.5%] max-w-[1440px] mx-auto text-left overflow-x-hidden sm:overflow-x-visible">
      <CheckoutStepper
        currentStep={currentStep}
        cartCount={items.length}
        onStepChange={setCurrentStep}
      />

      <div className="flex flex-col sm:flex-row items-start justify-between gap-6 md:gap-8 lg:gap-12 mb-12 sm:mb-16">
        <div className="w-full sm:flex-1 min-w-0">
          {currentStep === "cart" && (
            <CartItemsList
              items={items}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          )}

          {currentStep === "customer-info" && (
            <div className="py-8 border border-dashed border-gray-200 rounded-md text-center text-sm text-gray-500">
              Customer Info step (ready to implement next)
            </div>
          )}

          {currentStep === "shipping-payment" && (
            <div className="py-8 border border-dashed border-gray-200 rounded-md text-center text-sm text-gray-500">
              Shipping &amp; Payment step (ready to implement next)
            </div>
          )}

          {currentStep === "confirmation" && (
            <div className="py-8 border border-dashed border-gray-200 rounded-md text-center text-sm text-gray-500">
              Product Confirmation step (ready to implement next)
            </div>
          )}
        </div>

        <OrderSummary
          totals={totals}
          isAuthenticated={isAuthenticated}
          packInGiftBox={packInGiftBox}
          onToggleGiftBox={setPackInGiftBox}
          couponCode={couponCode}
          onCouponChange={setCouponCode}
          onCouponSubmit={handleCouponSubmit}
          currentStep={currentStep}
          onPrimaryAction={handleAdvanceStep}
          disabled={items.length === 0}
        />
      </div>

      {currentStep === "cart" && (
        <RecommendedProducts
          products={recommendedProducts}
          onAddToCart={handleAddRecommendedToCart}
        />
      )}
    </div>
  );
}
