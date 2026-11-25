import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

type MobileCartSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileCartSheet({
  isOpen,
  onClose,
}: MobileCartSheetProps) {
  const {
    items,
    orderOptions,
    totals,
    totalItemsCount,
    removeFromCart,
    toggleOrderOption,
  } = useCart();

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

  const hasAnyContent = items.length > 0 || orderOptions.length > 0;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex sm:hidden items-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white rounded-t-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-base">
            Shopping Bag ({totalItemsCount})
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-black p-1 text-base font-bold leading-none"
          >
            ✕
          </button>
        </div>

        {hasAnyContent ? (
          <>
            <div className="flex flex-col divide-y divide-gray-100">
              {items.map((item) => {
                const thumbnail =
                  item.variant.images?.[0] || item.product.image || "";

                return (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <Link
                      to={`/product/${item.product.id}`}
                      state={{ product: item.product }}
                      onClick={onClose}
                      className="shrink-0"
                    >
                      <img
                        src={thumbnail}
                        alt={item.product.name}
                        className="w-12 h-14 object-contain rounded bg-neutral-100 p-0.5"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 text-left">
                      <Link
                        to={`/product/${item.product.id}`}
                        state={{ product: item.product }}
                        onClick={onClose}
                        className="block text-sm font-medium text-gray-900 truncate hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <span
                            title={item.variant.color.name}
                            style={{ backgroundColor: item.variant.color.hex }}
                            className="w-2.5 h-2.5 rounded-full inline-block border border-gray-200"
                          />
                          <span>{item.variant.color.name}</span>
                        </span>
                        <span className="text-gray-300">|</span>
                        <span>Size: {item.variant.size}</span>
                      </div>
                      {item.options.length > 0 && (
                        <p className="text-[11px] text-[#3B72D9] mt-0.5 truncate">
                          +{" "}
                          {item.options
                            .map((o) => `${o.label} ($${o.price})`)
                            .join(", ")}
                        </p>
                      )}
                      <p className="text-xs text-gray-700 font-bold mt-1">
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
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors shrink-0"
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
            </div>

            {orderOptions.length > 0 && (
              <div className="border-t border-gray-100 pt-3 flex flex-col gap-1.5 text-xs text-gray-600">
                {orderOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">
                        +${opt.price.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleOrderOption(opt, false)}
                        aria-label={`Remove ${opt.label}`}
                        className="text-gray-400 hover:text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-sm text-gray-500">Total:</span>
              <span className="text-base font-bold text-gray-900">
                ${totals.total.toFixed(2)}
              </span>
            </div>

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
              Looks like you haven&apos;t added anything to your cart yet.
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
