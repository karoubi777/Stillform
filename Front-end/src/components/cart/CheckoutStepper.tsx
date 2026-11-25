import { Link } from "react-router-dom";
import type { CheckoutStep } from "../../types/product";

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
  cartCount: number;
  onStepChange: (step: CheckoutStep) => void;
}

export default function CheckoutStepper({
  currentStep,
  cartCount,
  onStepChange,
}: CheckoutStepperProps) {
  const steps: { id: CheckoutStep; label: string }[] = [
    { id: "cart", label: `CART(${cartCount})` },
    { id: "customer-info", label: "CUSTOMER INFO" },
    { id: "shipping-payment", label: "SHIPPING & PAYMENT" },
    { id: "confirmation", label: "PRODUCT CONFIRMATION" },
  ];

  const activeLabelMap: Record<CheckoutStep, string> = {
    cart: "Card",
    "customer-info": "Customer Info",
    "shipping-payment": "Shipping & Payment",
    confirmation: "Product Confirmation",
  };

  return (
    <div className="w-full mb-6 sm:mb-8">
      <nav
        aria-label="Breadcrumb"
        className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 mb-6"
      >
        <Link to="/" className="hover:text-gray-900 transition-colors">
          Homepage
        </Link>
        <span>&rsaquo;</span>
        <span className="text-gray-700 font-medium">
          {activeLabelMap[currentStep]}
        </span>
      </nav>

      <div className="w-full border-b border-gray-200">
        <div className="grid grid-cols-4 sm:flex sm:items-center sm:justify-center sm:gap-10 md:gap-14 pb-3.5 text-center">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepChange(step.id)}
                className={`text-[10px] sm:text-xs tracking-wide uppercase leading-tight px-1 transition-colors ${
                  isActive
                    ? "font-bold text-gray-900"
                    : "font-semibold text-gray-400 hover:text-gray-700"
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
