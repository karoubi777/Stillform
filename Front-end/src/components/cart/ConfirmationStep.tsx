import { useState } from "react";
import { COUNTRIES } from "../../data/locations";
import type {
  CartItem,
  CustomerInfo,
  PaymentMethod,
  ShippingMethod,
} from "../../types/product";

interface ConfirmationStepProps {
  items: CartItem[];
  customerInfo: CustomerInfo;
  paymentMethod?: PaymentMethod;
  shippingMethod?: ShippingMethod;
  isConfirmed: boolean;
  onToggleConfirm: (checked: boolean) => void;
  showError: boolean;
}

function ConfirmationLogo({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-white rounded px-2 py-1 w-[74px] h-[28px] flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <span className="text-[9px] font-bold uppercase text-gray-700 truncate">
          {alt}
        </span>
      )}
    </div>
  );
}

export default function ConfirmationStep({
  items,
  customerInfo,
  paymentMethod,
  shippingMethod,
  isConfirmed,
  onToggleConfirm,
  showError,
}: ConfirmationStepProps) {
  const countryName =
    COUNTRIES.find((c) => c.code === customerInfo.country)?.name ||
    customerInfo.country;

  const fullName =
    `${customerInfo.firstName} ${customerInfo.lastName}`.trim() || "—";

  return (
    <div className="w-full">
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
        Confirmation
      </h2>

      <div className="w-full bg-[#F7F7F7] rounded-md p-4 sm:p-6">
        {/* 1. SHOPPING ITEMS */}
        <div>
          <p className="text-xs text-gray-500 mb-3">Shopping items</p>

          <div className="flex flex-col divide-y divide-gray-200/70">
            {items.map((item) => {
              const thumbnail =
                item.variant.image ||
                item.product.image ||
                item.product.images?.[0] ||
                "";
              const lineTotal = item.product.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="py-3.5 first:pt-1 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-2 gap-x-4"
                >
                  {/* Thumbnail + Title + Color/Size */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={thumbnail}
                      alt={item.product.name}
                      className="w-14 h-16 rounded object-contain bg-white p-1 shrink-0 border border-gray-100"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
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

                  {/* Unit Price & Quantity */}
                  <div className="text-right text-xs text-gray-600 shrink-0 w-16 lg:w-20">
                    <p className="whitespace-nowrap">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      x{item.quantity}
                    </p>
                  </div>

                  {/* Line Total (Row 2 left on mobile/tablet, far right on desktop) */}
                  <div className="w-full lg:w-24 text-left lg:text-right text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap pl-[68px] lg:pl-0">
                    ${lineTotal.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. PAYMENT METHOD */}
        <div className="border-t border-gray-200 pt-4 mt-2">
          <p className="text-xs text-gray-500 mb-1.5">Payment method</p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs sm:text-sm font-bold text-gray-900">
              {paymentMethod?.name || "—"}
            </span>
            {paymentMethod && (
              <ConfirmationLogo
                src={paymentMethod.logo}
                alt={paymentMethod.name}
              />
            )}
          </div>
        </div>

        {/* 3. SHIPPING COMPANY */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs text-gray-500 mb-1.5">Shipping company</p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs sm:text-sm font-bold text-gray-900">
              {shippingMethod?.name || "—"}
            </span>
            {shippingMethod && (
              <ConfirmationLogo
                src={shippingMethod.logo}
                alt={shippingMethod.name}
              />
            )}
          </div>
        </div>

        {/* 4. CUSTOMER & SHIPPING DETAILS */}
        <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col gap-2.5 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Name</span>
            <span className="text-gray-800 font-medium text-right">
              {fullName}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Country</span>
            <span className="text-gray-800 font-medium text-right">
              {countryName}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Address</span>
            <span className="text-gray-800 font-medium text-right">
              {customerInfo.address || "—"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">State/Region</span>
            <span className="text-gray-800 font-medium text-right">
              {customerInfo.state || "—"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Phone</span>
            <span className="text-gray-800 font-medium text-right">
              {customerInfo.phone || "—"}
            </span>
          </div>
        </div>

        {/* 5. FINAL CONFIRMATION CHECKBOX */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <label
            className={`flex items-start gap-2.5 cursor-pointer text-xs p-2.5 rounded border transition-colors ${
              showError && !isConfirmed
                ? "border-[#FF3B16] bg-red-50/40"
                : "border-transparent"
            }`}
          >
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => onToggleConfirm(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded text-[#3B72D9] focus:ring-0 shrink-0"
            />
            <span className="text-gray-700 leading-relaxed">
              I confirm that my order items, shipping address, and selected
              payment method are correct.
            </span>
          </label>
          {showError && !isConfirmed && (
            <p className="text-[11px] text-[#FF3B16] mt-1 pl-2.5">
              Please check the confirmation box before placing your order.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
