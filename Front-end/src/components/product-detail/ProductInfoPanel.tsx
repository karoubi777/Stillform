import { useState, useMemo } from "react";
import type { Product, ProductVariant } from "../../types/product";
interface PurchaseActionsBoxProps {
  unitPrice: number;
  quantity: number;
  addInsurance: boolean;
  onToggleInsurance: (checked: boolean) => void;
  onShopNow: () => void;
  onAddToBasket: () => void;
  disabled?: boolean;
}

export function PurchaseActionsBox({
  unitPrice,
  quantity,
  addInsurance,
  onToggleInsurance,
  onShopNow,
  onAddToBasket,
  disabled = false,
}: PurchaseActionsBoxProps) {
  const insuranceCost = addInsurance ? 9 : 0;
  const total = unitPrice * quantity + insuranceCost;

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full bg-[#EDEDED] rounded-md p-4">
        <p className="text-base font-bold text-gray-900 pb-3 border-b border-gray-300/80">
          ${total.toFixed(2)}
        </p>

        <label className="flex items-start gap-2 pt-3 cursor-pointer text-[11px] text-gray-600">
          <input
            type="checkbox"
            checked={addInsurance}
            onChange={(e) => onToggleInsurance(e.target.checked)}
            className="mt-0.5 w-3.5 h-3.5 rounded-full text-[#3B72D9] focus:ring-0 shrink-0"
          />
          <span>
            Add shipping insurance for $9{" "}
            <span className="text-gray-400">
              (declared value only if the package gets lost, stolen or damaged.)
            </span>
          </span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={onShopNow}
          className="h-[44px] rounded bg-[#3B72D9] hover:bg-[#2C62C9] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wide transition active:scale-[0.99]"
        >
          SHOP NOW
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={onAddToBasket}
          className="h-[44px] rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 text-gray-800 text-xs font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition active:scale-[0.99]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z"
            />
          </svg>
          <span>ADD TO BASKET</span>
        </button>
      </div>
    </div>
  );
}

interface ProductInfoPanelProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  quantity: number;
  onQuantityChange: (delta: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  addInsurance: boolean;
  onToggleInsurance: (checked: boolean) => void;
  onShopNow: () => void;
  onAddToBasket: () => void;
}

export default function ProductInfoPanel({
  product,
  selectedVariant,
  onSelectVariant,
  quantity,
  onQuantityChange,
  isFavorite,
  onToggleFavorite,
  addInsurance,
  onToggleInsurance,
  onShopNow,
  onAddToBasket,
}: ProductInfoPanelProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const uniqueColors = useMemo(
    () =>
      Array.from(
        new Map(
          product.variants.map((variant) => [variant.color.id, variant]),
        ).values(),
      ),
    [product.variants],
  );

  const sortedSizes = useMemo(() => {
    const availableSizes = Array.from(
      new Set(
        product.variants
          .map((variant) => variant.size)
          .filter((size): size is string => size !== null),
      ),
    );

    const alphaSizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

    return [...availableSizes].sort((a, b) => {
      if (product.sizing.type === "alpha") {
        const aIndex = alphaSizeOrder.indexOf(a.toUpperCase());
        const bIndex = alphaSizeOrder.indexOf(b.toUpperCase());
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        return a.localeCompare(b);
      }

      const aNumber = Number(a);
      const bNumber = Number(b);
      if (Number.isFinite(aNumber) && Number.isFinite(bNumber)) {
        return aNumber - bNumber;
      }

      return a.localeCompare(b);
    });
  }, [product.variants, product.sizing.type]);

  const sizeOptions =
    product.sizing.type === "one-size" ? ["One Size"] : sortedSizes;

  const sizeGuide = product.sizing.guide;
  const hasSizeSelector = product.sizing.type !== "none";

  function handleSizeClick(size: string) {
    const chosen = product.variants.find(
      (variant) =>
        variant.size === size &&
        variant.color.id === selectedVariant.color.id &&
        variant.stock > 0,
    );

    if (chosen) {
      onSelectVariant(chosen);
    }
  }

  function handleColorClick(colorId: number) {
    const matchSameSize = product.variants.find(
      (variant) =>
        variant.color.id === colorId &&
        variant.size === selectedVariant.size &&
        variant.stock > 0,
    );

    const matchAnySize = product.variants.find(
      (variant) => variant.color.id === colorId && variant.stock > 0,
    );

    const chosen = matchSameSize || matchAnySize;

    if (chosen) {
      onSelectVariant(chosen);
    }
  }

  const soldCount = product.reviews ?? 0;

  return (
    <div className="w-full flex flex-col gap-5 text-left">
      {/* Title + Desktop/Tablet Heart */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold uppercase text-gray-900">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>

            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="hidden sm:flex w-9 h-9 rounded-full border border-gray-200 items-center justify-center hover:border-gray-400 transition active:scale-90 shrink-0"
        >
          <svg
            className={`w-4 h-4 ${
              isFavorite
                ? "fill-[#FF3B16] text-[#FF3B16]"
                : "fill-gray-400 text-gray-400"
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      {/* Size Selector */}
      {hasSizeSelector && (
        <div className="flex items-start gap-6">
          <span className="text-xs text-gray-500 w-16 pt-1.5 shrink-0">
            {product.sizing.label ?? "Size"}
          </span>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => {
                const isAvailable = product.variants.some(
                  (variant) =>
                    variant.size === size &&
                    variant.color.id === selectedVariant.color.id &&
                    variant.stock > 0,
                );

                const isSelected = selectedVariant.size === size;

                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => handleSizeClick(size)}
                    className={`min-w-[44px] h-[32px] px-2.5 rounded border text-xs font-medium transition ${
                      !isAvailable
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : isSelected
                          ? "border-gray-900 bg-gray-50 text-gray-900 font-bold"
                          : "border-gray-300 text-gray-700 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {sizeGuide && (
              <>
                <button
                  type="button"
                  aria-expanded={showSizeGuide}
                  onClick={() => setShowSizeGuide((prev) => !prev)}
                  className="text-[11px] font-medium text-[#FF8A00] hover:underline mt-2 inline-block"
                >
                  {showSizeGuide ? "Hide size guide" : "Size guideline"}
                </button>

                {showSizeGuide && (
                  <div className="mt-2 p-3 rounded bg-gray-50 border border-gray-200 text-[11px] text-gray-600">
                    <p className="font-semibold text-gray-800 mb-2">
                      {sizeGuide.title}
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr>
                            <th className="py-1.5 pr-3 font-semibold">Size</th>

                            {sizeGuide.columns.map((column) => (
                              <th
                                key={column}
                                className="py-1.5 px-2 font-semibold whitespace-nowrap"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {sizeGuide.rows.map((row) => (
                            <tr
                              key={row.size}
                              className="border-t border-gray-200"
                            >
                              <td className="py-1.5 pr-3 font-semibold">
                                {row.size}
                              </td>

                              {sizeGuide.columns.map((column, index) => (
                                <td
                                  key={`${row.size}-${column}`}
                                  className="py-1.5 px-2 whitespace-nowrap"
                                >
                                  {row.measurements[index] ?? "—"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-2 text-gray-500">
                      Measurements: {sizeGuide.unit}
                    </p>

                    {sizeGuide.note && <p className="mt-2">{sizeGuide.note}</p>}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Color Selector */}
      <div className="flex items-center gap-6">
        <span className="text-xs text-gray-500 w-16 shrink-0">Color</span>

        <div className="flex items-center gap-2.5 flex-wrap">
          {uniqueColors.map((variant) => {
            const isSelected = selectedVariant.color.id === variant.color.id;

            return (
              <button
                key={variant.color.id}
                type="button"
                title={variant.color.name}
                aria-label={variant.color.name}
                onClick={() => handleColorClick(variant.color.id)}
                style={{ backgroundColor: variant.color.hex }}
                className={`w-4 h-4 rounded-full border transition-transform ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-gray-900 scale-110 border-gray-300"
                    : "border-gray-200 hover:scale-110"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Shipping Info */}
      <div className="flex items-start gap-6">
        <span className="text-xs text-gray-500 w-16 shrink-0">Shipping</span>

        <div className="text-xs">
          <p className="font-semibold text-gray-800">
            Free Shipping to Victoria territory
          </p>

          <p className="text-[11px] text-gray-400 mt-0.5">
            Delivery Time: 14–17 days
          </p>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-6">
        <span className="text-xs text-gray-500 w-16 shrink-0">Quantity</span>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center justify-between w-[96px] h-[36px] rounded border border-gray-300 px-2">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => onQuantityChange(-1)}
              className="text-gray-400 hover:text-black disabled:opacity-30 px-1 text-base leading-none"
            >
              −
            </button>

            <span className="text-xs font-semibold text-gray-800">
              {quantity}
            </span>

            <button
              type="button"
              disabled={quantity >= selectedVariant.stock}
              onClick={() => onQuantityChange(1)}
              className="text-gray-400 hover:text-black disabled:opacity-30 px-1 text-base leading-none"
            >
              +
            </button>
          </div>

          <span className="text-[11px] text-gray-500">
            {selectedVariant.stock} available / {soldCount} sold
          </span>
        </div>
      </div>

      {/* Tablet & Desktop Purchase Box */}
      <div className="hidden sm:block pt-2">
        <PurchaseActionsBox
          unitPrice={product.price}
          quantity={quantity}
          addInsurance={addInsurance}
          onToggleInsurance={onToggleInsurance}
          onShopNow={onShopNow}
          onAddToBasket={onAddToBasket}
          disabled={selectedVariant.stock <= 0}
        />
      </div>
    </div>
  );
}
