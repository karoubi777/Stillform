import type { CartItem } from "../../types/product";
import { Link } from "react-router-dom";
interface CartItemsListProps {
  items: CartItem[];
  onQuantityChange: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartItemsList({
  items,
  onQuantityChange,
  onRemoveItem,
}: CartItemsListProps) {
  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        Card{" "}
        <span className="text-gray-400 font-normal text-base">
          {items.length}
        </span>
      </h1>

      {items.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-md">
          Your cart is empty.
        </div>
      ) : (
        <div className="w-full flex flex-col divide-y divide-gray-100">
          {items.map((item) => {
            const thumbnail =
              item.variant.image ||
              item.product.image ||
              item.product.images?.[0] ||
              "";
            const atMaxStock = item.quantity >= item.variant.stock;

            return (
              <div
                key={item.id}
                className="py-5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-4 lg:gap-y-0"
              >
                <div className="w-[calc(100%-72px)] lg:w-[44%] lg:pr-4 flex items-center gap-3 min-w-0">
                  <Link
                    to={`/product/${item.product.id}`}
                    state={{ product: item.product }}
                    className="shrink-0"
                  >
                    <img
                      src={thumbnail}
                      alt={item.product.name}
                      className="w-14 h-16 rounded object-contain bg-[#F5F6F6] p-1 hover:opacity-85 transition"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      state={{ product: item.product }}
                      className="block text-xs sm:text-sm font-semibold text-gray-900 truncate hover:underline"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <span>Color:</span>
                        <span
                          title={item.variant.color.name}
                          style={{ backgroundColor: item.variant.color.hex }}
                          className="w-2.5 h-2.5 rounded-full inline-block border border-gray-200"
                        />
                      </span>
                      {item.variant.size && (
                        <>
                          <span className="text-gray-300">|</span>
                          <span>Size: {item.variant.size}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="w-[72px] text-right lg:w-[14%] lg:text-center text-xs sm:text-sm font-medium text-gray-600 shrink-0 whitespace-nowrap">
                  ${item.product.price.toFixed(2)}
                </div>

                {/* Quantity Counter */}
                <div className="w-[40%] lg:w-[18%] flex justify-start lg:justify-center">
                  <div className="flex items-center justify-between w-[101px] h-[38px] rounded border border-gray-200 px-2 shrink-0">
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() => onQuantityChange(item.id, -1)}
                      className="text-gray-400 hover:text-black disabled:opacity-30 px-1.5 text-base leading-none"
                    >
                      −
                    </button>
                    <span className="text-xs font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      disabled={atMaxStock}
                      onClick={() => onQuantityChange(item.id, 1)}
                      className="text-gray-400 hover:text-black disabled:opacity-30 px-1.5 text-base leading-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="w-[40%] lg:w-[14%] text-center text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>

                {/* Delete Icon */}
                <div className="w-[20%] lg:w-[10%] flex justify-end">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label="Remove item"
                    className="text-gray-400 hover:text-red-500 p-1 shrink-0 transition-colors"
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
