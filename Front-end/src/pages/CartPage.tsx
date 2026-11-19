import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { mockcartitems, recommendedProducts } from "../mockProducts";
import { PAYMENT_METHODS, SHIPPING_METHODS } from "../data/checkoutMethods";

import CheckoutStepper from "../components/cart/CheckoutStepper";
import CartItemsList from "../components/cart/CartItemsList";
import CustomerInfoStep, {
  validateCustomerInfo,
} from "../components/cart/CustomerInfoStep";
import ShippingPaymentStep, {
  isShippingAvailableForCountry,
} from "../components/cart/ShippingPaymentStep";
import ConfirmationStep from "../components/cart/ConfirmationStep";
import OrderSummary from "../components/cart/OrderSummary";
import RecommendedProducts from "../components/cart/RecommendedProducts";
import type {
  CartItem,
  CheckoutStep,
  CustomerInfo,
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

  // Customer Info State
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: "",
    firstName: "",
    lastName: "",
    country: "US",
    state: "",
    address: "",
    phone: "",
  });
  const [showCustomerErrors, setShowCustomerErrors] = useState(false);

  // Shipping & Payment State
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>(
    PAYMENT_METHODS.find((m) => m.available)?.id ?? "",
  );
  const [selectedShippingId, setSelectedShippingId] = useState<string>("");
  const [showShippingPaymentErrors, setShowShippingPaymentErrors] =
    useState(false);

  // Final Confirmation & Mock Order Placement State
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [showConfirmationError, setShowConfirmationError] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const isCustomerInfoValid = useMemo(() => {
    const errs = validateCustomerInfo(customerInfo);
    return Object.values(errs).every((msg) => msg === "");
  }, [customerInfo]);

  const selectedPaymentMethod = useMemo(
    () =>
      PAYMENT_METHODS.find((m) => m.id === selectedPaymentId && m.available),
    [selectedPaymentId],
  );

  const selectedShippingMethod = useMemo(
    () =>
      SHIPPING_METHODS.find(
        (m) =>
          m.id === selectedShippingId &&
          isShippingAvailableForCountry(m, customerInfo.country),
      ),
    [selectedShippingId, customerInfo.country],
  );

  const isShippingPaymentValid = Boolean(
    selectedPaymentMethod && selectedShippingMethod,
  );

  function handleCustomerInfoChange(updated: CustomerInfo) {
    setCustomerInfo(updated);
    if (updated.country !== customerInfo.country && selectedShippingId) {
      const currentMethod = SHIPPING_METHODS.find(
        (m) => m.id === selectedShippingId,
      );
      if (
        !currentMethod ||
        !isShippingAvailableForCountry(currentMethod, updated.country)
      ) {
        setSelectedShippingId("");
      }
    }
  }

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

  function handleStepChange(targetStep: CheckoutStep) {
    const targetIndex = STEP_ORDER.indexOf(targetStep);
    const currentIndex = STEP_ORDER.indexOf(currentStep);

    if (targetIndex <= currentIndex) {
      setCurrentStep(targetStep);
      return;
    }

    if (items.length === 0) return;

    if (targetIndex > 1 && !isCustomerInfoValid) {
      setCurrentStep("customer-info");
      setShowCustomerErrors(true);
      return;
    }

    if (targetIndex > 2 && !isShippingPaymentValid) {
      setCurrentStep("shipping-payment");
      setShowShippingPaymentErrors(true);
      return;
    }

    setCurrentStep(targetStep);
  }

  function handleAdvanceStep() {
    if (items.length === 0) return;

    if (currentStep === "customer-info" && !isCustomerInfoValid) {
      setShowCustomerErrors(true);
      return;
    }

    if (currentStep === "shipping-payment" && !isShippingPaymentValid) {
      setShowShippingPaymentErrors(true);
      return;
    }

    if (currentStep === "confirmation") {
      if (!isOrderConfirmed) {
        setShowConfirmationError(true);
        return;
      }
      setIsConfirmModalOpen(true);
      return;
    }

    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  }

  function handleMockPlaceOrder() {
    setIsSubmittingOrder(true);
    // Replace setTimeout with your real POST /orders API call later
    window.setTimeout(() => {
      const mockOrderNumber = `SF-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmittingOrder(false);
      setIsConfirmModalOpen(false);
      setPlacedOrderId(mockOrderNumber);
      setItems([]);
    }, 600);
  }

  const canProceed =
    items.length > 0 &&
    (currentStep !== "customer-info" || isCustomerInfoValid) &&
    (currentStep !== "shipping-payment" || isShippingPaymentValid) &&
    (currentStep !== "confirmation" || isOrderConfirmed);

  const totals: OrderTotals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const shipping = selectedShippingMethod?.cost ?? 0;
    const tax = 0;
    const giftBoxPrice = packInGiftBox ? 10.9 : 0;
    const discount = isAuthenticated ? discountAmount : 0;
    const total = Math.max(
      0,
      subtotal + shipping + tax + giftBoxPrice - discount,
    );

    return { subtotal, shipping, tax, discount, giftBoxPrice, total };
  }, [
    items,
    selectedShippingMethod,
    packInGiftBox,
    discountAmount,
    isAuthenticated,
  ]);

  // Order Placed Success Screen
  if (placedOrderId) {
    return (
      <div className="w-full bg-white py-14 px-4 sm:px-6 max-w-[640px] mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#10B981] flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Thank you for your order!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Your order{" "}
          <span className="font-bold text-gray-900">#{placedOrderId}</span> has
          been placed. A confirmation receipt has been sent to{" "}
          <span className="font-medium text-gray-800">
            {customerInfo.email}
          </span>
          .
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 h-[42px] rounded bg-[#3D3D3D] hover:bg-[#2C2C2C] text-white text-xs font-bold uppercase tracking-wider transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-6 px-4 sm:px-6 lg:px-[8.5%] max-w-[1440px] mx-auto text-left overflow-x-hidden sm:overflow-x-visible">
      <CheckoutStepper
        currentStep={currentStep}
        cartCount={items.length}
        onStepChange={handleStepChange}
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
            <CustomerInfoStep
              value={customerInfo}
              onChange={handleCustomerInfoChange}
              showAllErrors={showCustomerErrors}
            />
          )}

          {currentStep === "shipping-payment" && (
            <ShippingPaymentStep
              paymentMethods={PAYMENT_METHODS}
              shippingMethods={SHIPPING_METHODS}
              selectedPaymentId={selectedPaymentId}
              selectedShippingId={selectedShippingId}
              onSelectPayment={setSelectedPaymentId}
              onSelectShipping={setSelectedShippingId}
              selectedCountry={customerInfo.country}
              showErrors={showShippingPaymentErrors}
            />
          )}

          {currentStep === "confirmation" && (
            <ConfirmationStep
              items={items}
              customerInfo={customerInfo}
              paymentMethod={selectedPaymentMethod}
              shippingMethod={selectedShippingMethod}
              isConfirmed={isOrderConfirmed}
              onToggleConfirm={setIsOrderConfirmed}
              showError={showConfirmationError}
            />
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
          canProceed={canProceed}
          showCoupon={currentStep === "cart"}
        />
      </div>

      {(currentStep === "cart" || currentStep === "customer-info") && (
        <RecommendedProducts
          products={recommendedProducts}
          onAddToCart={handleAddRecommendedToCart}
        />
      )}

      {/* Mock Final Confirmation Modal */}
      {isConfirmModalOpen && (
        <div
          onClick={() => !isSubmittingOrder && setIsConfirmModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[380px] bg-white rounded-md p-6 shadow-2xl text-left"
          >
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Confirm Your Order
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              You are about to place an order of{" "}
              <span className="font-bold text-gray-900">
                ${totals.total.toFixed(2)}
              </span>{" "}
              via{" "}
              <span className="font-semibold text-gray-900">
                {selectedPaymentMethod?.name}
              </span>
              .
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isSubmittingOrder}
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 h-[38px] rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmittingOrder}
                onClick={handleMockPlaceOrder}
                className="px-5 h-[38px] rounded bg-[#3D3D3D] hover:bg-[#2C2C2C] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-60"
              >
                {isSubmittingOrder ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div >
        </div>
      )}
    </div>
  );
}
