import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

type CartDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items, orderOptions, totals, removeFromCart, toggleOrderOption } =
    useCart();

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

  const displayedCartItems = items.slice(0, 3);
  const overflowCartCount = items.length - 3;
  const hasAnyContent = items.length > 0 || orderOptions.length > 0;

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="hidden sm:block absolute right-0 top-full mt-2 z-50 w-[310px] max-h-[430px] bg-white rounded-md shadow-2xl border border-gray-100 p-4 text-left transition-all animate-in fade-in slide-in-from-top-1"
    >
      {hasAnyContent ? (
        <>
          <div className="flex flex-col divide-y divide-gray-100 overflow-y-auto max-h-[230px]">
            {displayedCartItems.map((item) => {
              const thumbnail =
                item.variant.image ||
                item.product.image ||
                item.product.images?.[0] ||
                "";

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 min-h-[58px] py-2"
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    state={{ product: item.product }}
                    onClick={onClose}
                    className="shrink-0"
                  >
                    <img
                      src={thumbnail}
                      alt={item.product.name}
                      className="w-10 h-12 object-contain rounded bg-[#F5F6F6] p-0.5"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.id}`}
                      state={{ product: item.product }}
                      onClick={onClose}
                      className="block text-xs font-semibold text-gray-900 truncate hover:underline"
                    >
                      {item.product.name}
                    </Link>

                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-0.5">
                      <span
                        title={item.variant.color.name}
                        style={{ backgroundColor: item.variant.color.hex }}
                        className="w-2 h-2 rounded-full inline-block border border-gray-200"
                      />
                      <span>{item.variant.size}</span>
                    </div>

                    {item.options.length > 0 && (
                      <p className="text-[10px] text-[#3B72D9] truncate mt-0.5">
                        +{" "}
                        {item.options
                          .map((o) => `${o.label} ($${o.price})`)
                          .join(", ")}
                      </p>
                    )}

                    <p className="text-[11px] font-bold text-gray-600 mt-0.5">
                      ${item.product.price.toFixed(2)}
                      {item.quantity > 1 && (
                        <span className="text-gray-400 font-normal ml-1">
                          × {item.quantity}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Delete Item Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.product.name}`}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
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

          {/* Order-Level Services (with remove option) */}
          {orderOptions.length > 0 && (
            <div className="pt-2 mt-1 border-t border-gray-100 flex flex-col gap-1.5 text-[11px] text-gray-500">
              {orderOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="truncate">{opt.label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-gray-700">
                      +${opt.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleOrderOption(opt, false)}
                      aria-label={`Remove ${opt.label}`}
                      className="text-gray-400 hover:text-red-500 font-bold leading-none"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Total Row & Buttons */}
          <div className="pt-3 border-t border-gray-100 mt-2">
            <div className="flex items-center justify-between px-1 mb-3">
              <span className="text-xs text-gray-500 font-medium">Total:</span>
              <span className="text-sm font-bold text-gray-900">
                ${totals.total.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="flex-1 flex items-center justify-center h-[36px] rounded bg-[#3B72D9] text-white text-xs font-medium hover:bg-[#2C62C9] transition"
              >
                View Bag
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex-1 flex items-center justify-center h-[36px] rounded border border-gray-300 bg-white text-gray-800 text-xs font-medium hover:bg-gray-50 transition"
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
