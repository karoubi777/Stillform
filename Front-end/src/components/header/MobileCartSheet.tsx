import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { CartItem } from "../../types/product";

type MobileCartSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalCost: number;
};

export default function MobileCartSheet({
  isOpen,
  onClose,
  cartItems,
  totalCost,
}: MobileCartSheetProps) {
  // Prevent background scrolling when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex sm:hidden items-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Stop click inside from closing
        className="w-full bg-white rounded-t-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
      >
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-base">
            Shopping Bag ({cartItems.length})
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-black p-1 text-base font-bold leading-none"
          >
            ✕
          </button>
        </div>

        {cartItems.length > 0 ? (
          <>
            {/* Items List */}
            <div className="flex flex-col divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-contain rounded bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-600 font-bold mt-0.5">
                      ${item.price.toFixed(2)}
                      {item.quantity && item.quantity > 1 && (
                        <span className="text-gray-400 font-normal ml-1">
                          × {item.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-sm text-gray-500">Total:</span>
              <span className="text-base font-bold text-gray-900">
                ${totalCost.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center justify-center h-[42px] rounded-md bg-[#3B72D9] text-white text-xs font-semibold hover:bg-[#2C62C9] active:scale-95 transition"
              >
                View Bag
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center justify-center h-[42px] rounded-md border border-gray-300 text-gray-800 text-xs font-semibold hover:bg-gray-50 active:scale-95 transition"
              >
                Checkout
              </Link>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
              <svg
                className="w-7 h-7"
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
            </div>
            <p className="text-base font-bold text-gray-800 mb-1">
              Your cart is empty
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full h-[44px] rounded-md bg-[#3B72D9] text-white text-sm font-semibold hover:bg-[#2C62C9] transition"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
