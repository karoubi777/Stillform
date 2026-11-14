import { useEffect, useRef } from "react";
import type { CartItem } from "../../types/product";

type CartDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalCost: number;
};

export default function CartDropdown({
  isOpen,
  onClose,
  cartItems,
  totalCost,
}: CartDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click (for desktop)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayedCartItems = cartItems.slice(0, 3);
  const overflowCartCount = cartItems.length - 3;

  return (
    <>
      {/* ========================================================
          1. DESKTOP & TABLET POPUP (>= 640px)
         ======================================================== */}
      <div
        ref={dropdownRef}
        className="hidden sm:block absolute right-0 top-full mt-2 z-50 w-[296px] max-h-[400px] bg-white rounded-md shadow-2xl border border-gray-100 p-4 text-left transition-all animate-in fade-in slide-in-from-top-1"
      >
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col divide-y divide-gray-100 overflow-y-auto max-h-[220px]">
              {displayedCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 w-[237px] h-[54px] mx-auto py-1"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-12 object-contain rounded shrink-0 bg-[#F5F6F6]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-bold text-gray-600 mt-0.5">
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

              {overflowCartCount > 0 && (
                <div className="py-2 text-center">
                  <a
                    href="/cart"
                    className="text-[11px] text-[#3B72D9] font-medium hover:underline"
                  >
                    + {overflowCartCount} more items in bag
                  </a>
                </div>
              )}
            </div>

            {/* Total Row & Buttons */}
            <div className="pt-3 border-t border-gray-100 mt-2">
              <div className="flex items-center justify-between px-2 mb-3">
                <span className="text-xs text-gray-500 font-medium">
                  Total:
                </span>
                <span className="text-sm font-bold text-gray-900">
                  ${totalCost.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <a
                  href="/cart"
                  className="flex items-center justify-center w-[123px] h-[36px] rounded bg-[#3B72D9] text-white text-xs font-medium hover:bg-[#2C62C9] transition"
                >
                  View Bag
                </a>
                <a
                  href="/checkout"
                  className="flex items-center justify-center w-[123px] h-[36px] rounded border border-gray-300 bg-white text-gray-800 text-xs font-medium hover:bg-gray-50 transition"
                >
                  Checkout
                </a>
              </div>
            </div>
          </>
        ) : (
          /* Empty State Desktop */
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
              <svg
                className="w-6 h-6"
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
            <p className="text-sm font-bold text-gray-800 mb-1">
              Your cart is empty
            </p>
            <p className="text-xs text-gray-400 mb-4 max-w-[190px]">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-[180px] h-[34px] rounded bg-[#3B72D9] text-white text-xs font-medium hover:bg-[#2C62C9] transition"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>

      {/* ========================================================
          2. MOBILE MODAL SHEET (< 640px)
         ======================================================== */}
      <div className="fixed inset-0 z-50 flex sm:hidden items-end bg-black/50">
        <div className="w-full bg-white rounded-t-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-gray-900 text-base">
              Shopping Bag ({cartItems.length})
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black p-1 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {cartItems.length > 0 ? (
            <>
              <div className="flex flex-col divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-contain rounded bg-neutral-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
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

              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-sm text-gray-500">Total:</span>
                <span className="text-base font-bold text-gray-900">
                  ${totalCost.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="/cart"
                  className="flex items-center justify-center h-[42px] rounded-md bg-[#3B72D9] text-white text-xs font-semibold hover:bg-[#2C62C9]"
                >
                  View Bag
                </a>
                <a
                  href="/checkout"
                  className="flex items-center justify-center h-[42px] rounded-md border border-gray-300 text-gray-800 text-xs font-semibold hover:bg-gray-50"
                >
                  Checkout
                </a>
              </div>
            </>
          ) : (
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
    </>
  );
}
