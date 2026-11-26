import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useStorage";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { recommendedProducts } from "../data/recommende-products";
import { PAYMENT_METHODS, SHIPPING_METHODS } from "../data/checkoutMethods";

import CheckoutStepper from "../components/cart/CheckoutStepper";
import CartItemsList from "../components/cart/CartItemsList";
import CustomerInfoStep from "../components/cart/CustomerInfoStep";
import { validateCustomerInfo } from "../hooks/validateCustomerInfo";
import ShippingPaymentStep, {
  isShippingAvailableForCountry,
} from "../components/cart/ShippingPaymentStep";
import ConfirmationStep from "../components/cart/ConfirmationStep";
import OrderSummary from "../components/cart/OrderSummary";
import RecommendedProducts from "../components/shared/RecommendedProducts";
import type {
  CartItemOption,
  CartTotals,
  CheckoutStep,
  CustomerInfo,
} from "../types/product";

const STEP_ORDER: CheckoutStep[] = [
  "cart",
  "customer-info",
  "shipping-payment",
  "confirmation",
];

const GIFT_BOX_OPTION: CartItemOption = {
  id: "order-gift-box",
  type: "gift-wrap",
  label: "Pack in a Gift Box",
  price: 10.9,
};

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    items,
    orderOptions,
    coupon,
    totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleItemOption,
    toggleOrderOption,
    hasOrderOption,
    applyCoupon,
    setShippingCost,
    clearCart,
  } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [couponCode, setCouponCode] = useState(coupon?.code ?? "");
  const packInGiftBox = hasOrderOption(GIFT_BOX_OPTION.id);

  // Customer Info State
  const [customerInfo, setCustomerInfo] = useSessionStorage<CustomerInfo>(
    "checkout_customer_info",
    {
      email: "",
      firstName: "",
      lastName: "",
      country: "US",
      state: "",
      address: "",
      phone: "",
    },
  );

  // Shipping & Payment State
  const [selectedPaymentId, setSelectedPaymentId] = useSessionStorage<string>(
    "checkout_payment_id",
    PAYMENT_METHODS.find((m) => m.available)?.id ?? "",
  );
  const [selectedShippingId, setSelectedShippingId] = useSessionStorage<string>(
    "checkout_shipping_id",
    "",
  );

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

  // Keep CartContext shipping cost synced with selected shipping method
  useEffect(() => {
    setShippingCost(selectedShippingMethod?.cost ?? 0);
  }, [selectedShippingMethod, setShippingCost]);

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

  function handleCouponSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    applyCoupon(couponCode);
  }

  const hasCartContent = items.length > 0 || orderOptions.length > 0;

  function handleStepChange(targetStep: CheckoutStep) {
    const targetIndex = STEP_ORDER.indexOf(targetStep);
    const currentIndex = STEP_ORDER.indexOf(currentStep);

    if (targetIndex <= currentIndex) {
      setCurrentStep(targetStep);
      return;
    }

    if (!hasCartContent) return;

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
  const [showCustomerErrors, setShowCustomerErrors] = useState(false);
  function handleAdvanceStep() {
    if (!hasCartContent) return;

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
    window.setTimeout(() => {
      const mockOrderNumber = `SF-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmittingOrder(false);
      setIsConfirmModalOpen(false);
      setPlacedOrderId(mockOrderNumber);
      clearCart();
      setSelectedShippingId("");
      setIsOrderConfirmed(false);
    }, 600);
  }

  const canProceed =
    hasCartContent &&
    (currentStep !== "customer-info" || isCustomerInfoValid) &&
    (currentStep !== "shipping-payment" || isShippingPaymentValid) &&
    (currentStep !== "confirmation" || isOrderConfirmed);

  // Only apply coupon discount when authenticated
  const effectiveTotals: CartTotals = useMemo(() => {
    if (isAuthenticated) return totals;
    return {
      ...totals,
      discount: 0,
      total: Math.max(0, totals.total + totals.discount),
    };
  }, [totals, isAuthenticated]);

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
              onQuantityChange={updateQuantity}
              onRemoveItem={removeFromCart}
              onToggleItemOption={toggleItemOption}
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
          totals={effectiveTotals}
          isAuthenticated={isAuthenticated}
          packInGiftBox={packInGiftBox}
          onToggleGiftBox={(checked) =>
            toggleOrderOption(GIFT_BOX_OPTION, checked)
          }
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
          onAddToCart={(product, variant) => addToCart(product, variant, 1)}
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
                ${effectiveTotals.total.toFixed(2)}
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
          </div>
        </div>
      )}
    </div>
  );
}
