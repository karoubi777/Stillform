import type { CartTotals, CheckoutStep } from "../../types/product";

interface OrderSummaryProps {
  totals: CartTotals;
  isAuthenticated: boolean;
  packInGiftBox: boolean;
  onToggleGiftBox: (checked: boolean) => void;
  couponCode: string;
  onCouponChange: (value: string) => void;
  onCouponSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  currentStep: CheckoutStep;
  onPrimaryAction: () => void;
  canProceed?: boolean;
  showCoupon?: boolean;
}

export default function OrderSummary({
  totals,
  isAuthenticated,
  packInGiftBox,
  onToggleGiftBox,
  couponCode,
  onCouponChange,
  onCouponSubmit,
  currentStep,
  onPrimaryAction,
  canProceed = true,
  showCoupon = true,
}: OrderSummaryProps) {
  const actionLabels: Record<CheckoutStep, string> = {
    cart: isAuthenticated ? "SHOP NOW" : "CHECKOUT",
    "customer-info": "SHOP NOW",
    "shipping-payment": "SHOP NOW",
    confirmation: "CONFIRM & PAY",
  };

  const giftBoxPrice = packInGiftBox ? 10.9 : 0;
  const itemAndExtraOptions = Math.max(0, totals.optionsTotal - giftBoxPrice);

  return (
    <div className="w-full sm:w-[255px] md:w-[295px] lg:w-[309px] shrink-0 flex flex-col gap-4">
      <div className="w-[calc(100%+2rem)] -mx-4 px-4 py-7 bg-[#EBEBEB] rounded-t-xl sm:w-full sm:mx-0 sm:p-5 sm:rounded-md text-xs">
        <div className="w-full max-w-[300px] mx-auto sm:max-w-none flex flex-col justify-between min-h-[340px] sm:min-h-[370px]">
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            Order Summary
          </h2>

          <div className="flex flex-col gap-3 text-gray-600">
            <div className="flex justify-between gap-2">
              <span>Price</span>
              <span className="font-semibold text-gray-800 whitespace-nowrap">
                ${totals.subtotal.toFixed(2)}
              </span>
            </div>

            {itemAndExtraOptions > 0 && (
              <div className="flex justify-between gap-2">
                <span>Insurance / Services</span>
                <span className="font-semibold text-gray-800 whitespace-nowrap">
                  ${itemAndExtraOptions.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between gap-2">
              <span>Shipping</span>
              <span className="font-semibold text-gray-800 whitespace-nowrap">
                ${totals.shipping === 0 ? "0" : totals.shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Tax</span>
              <span className="font-semibold text-gray-800 whitespace-nowrap">
                ${totals.tax === 0 ? "0" : totals.tax.toFixed(2)}
              </span>
            </div>

            <div className="pt-1">
              <div className="flex justify-between gap-2">
                <span className="font-medium text-gray-700">
                  Discount price
                </span>
                {isAuthenticated && (
                  <span className="font-semibold text-gray-800 whitespace-nowrap">
                    ${totals.discount.toFixed(2)}
                  </span>
                )}
              </div>
              {!isAuthenticated && (
                <p className="flex items-center gap-1.5 text-[10px] text-[#FF3B16] mt-1">
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-[#FF3B16] text-[9px] font-bold shrink-0">
                    !
                  </span>
                  <span>You must log in to use the discount code</span>
                </p>
              )}
            </div>

            <label className="flex items-center justify-between gap-2 text-gray-700 cursor-pointer pt-1">
              <span className="flex items-center gap-2 min-w-0">
                <input
                  type="checkbox"
                  checked={packInGiftBox}
                  onChange={(e) => onToggleGiftBox(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#3B72D9] focus:ring-0 shrink-0"
                />
                <span className="truncate">Pack in a Gift Box</span>
              </span>
              <span className="font-semibold text-gray-800 whitespace-nowrap shrink-0">
                $10.90
              </span>
            </label>
          </div>

          <div className="flex justify-between items-center border-t border-gray-300 pt-3 my-3">
            <span className="text-xs font-bold text-gray-900">Total Price</span>
            <span className="text-base font-extrabold text-gray-900 whitespace-nowrap">
              ${totals.total.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            aria-disabled={!canProceed}
            onClick={onPrimaryAction}
            className={`w-full h-[46px] rounded text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition ${
              canProceed
                ? "bg-[#3D3D3D] hover:bg-[#2C2C2C] active:scale-[0.99] cursor-pointer"
                : "bg-[#CFCFCF] cursor-not-allowed"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z"
              />
            </svg>
            <span>{actionLabels[currentStep]}</span>
          </button>
        </div>
      </div>

      {showCoupon && (
        <form
          onSubmit={onCouponSubmit}
          className="flex items-center w-full rounded border border-gray-300 overflow-hidden h-[48px] bg-white"
        >
          <input
            type="text"
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value)}
            placeholder="Enter coupon code"
            className="w-full flex-1 px-3 text-xs text-gray-800 placeholder:text-gray-400 outline-none h-full min-w-0"
          />
          <button
            type="submit"
            className={`h-full px-3 md:px-4 text-white text-[10px] md:text-[11px] font-semibold leading-tight text-center transition shrink-0 max-w-[46%] ${
              isAuthenticated
                ? "bg-[#3B72D9] hover:bg-blue-700"
                : "bg-[#262626] hover:bg-black"
            }`}
          >
            {isAuthenticated ? "Apply code" : "Login and Apply code"}
          </button>
        </form>
      )}
    </div>
  );
}
