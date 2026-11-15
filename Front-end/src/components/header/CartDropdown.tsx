import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayedCartItems = cartItems.slice(0, 3);
  const overflowCartCount = cartItems.length - 3;

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="hidden sm:block absolute right-0 top-full mt-2 z-50 w-[296px] max-h-[400px] bg-white rounded-md shadow-2xl border border-gray-100 p-4 text-left transition-all animate-in fade-in slide-in-from-top-1"
    >
      {cartItems.length > 0 ? (
        <>
          <div className="flex flex-col divide-y divide-gray-100 overflow-y-auto max-h-[220px]">
            {displayedCartItems.map((item) => {
              const thumbnail =
                item.variant.image ||
                item.product.image ||
                item.product.images?.[0] ||
                "";

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 w-[237px] min-h-[54px] mx-auto py-1.5"
                >
                  <img
                    src={thumbnail}
                    alt={item.product.name}
                    className="w-10 h-12 object-contain rounded shrink-0 bg-[#F5F6F6] p-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-0.5">
                      <span
                        title={item.variant.color.name}
                        style={{ backgroundColor: item.variant.color.hex }}
                        className="w-2 h-2 rounded-full inline-block border border-gray-200"
                      />
                      <span>{item.variant.size}</span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-600 mt-0.5">
                      ${item.product.price.toFixed(2)}
                      {item.quantity > 1 && (
                        <span className="text-gray-400 font-normal ml-1">
                          × {item.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}

            {overflowCartCount > 0 && (
              <div className="py-2 text-center">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="text-[11px] text-[#3B72D9] font-medium hover:underline"
                >
                  + {overflowCartCount} more items in bag
                </Link>
              </div>
            )}
          </div>

          {/* Total Row & Buttons */}
          <div className="pt-3 border-t border-gray-100 mt-2">
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-xs text-gray-500 font-medium">Total:</span>
              <span className="text-sm font-bold text-gray-900">
                ${totalCost.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center justify-center w-[123px] h-[36px] rounded bg-[#3B72D9] text-white text-xs font-medium hover:bg-[#2C62C9] transition"
              >
                View Bag
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center justify-center w-[123px] h-[36px] rounded border border-gray-300 bg-white text-gray-800 text-xs font-medium hover:bg-gray-50 transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      ) : (
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
            Looks like you haven&apos;t added anything to your cart yet.
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
  );
}
