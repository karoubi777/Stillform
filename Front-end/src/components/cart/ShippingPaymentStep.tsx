import { useState } from "react";
import type {
  CountryOption,
  PaymentMethod,
  ShippingMethod,
} from "../../types/product";

interface ShippingPaymentStepProps {
  paymentMethods: PaymentMethod[];
  shippingMethods: ShippingMethod[];
  selectedPaymentId: string;
  selectedShippingId: string;
  onSelectPayment: (id: string) => void;
  onSelectShipping: (id: string) => void;
  selectedCountry: CountryOption["code"] | "";
  showErrors: boolean;
}

function MethodLogo({
  src,
  alt,
  isAvailable,
}: {
  src: string;
  alt: string;
  isAvailable: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="bg-white rounded px-2 py-1 w-[64px] h-[26px] lg:w-[78px] lg:h-[30px] flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
      {!imgFailed && src ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgFailed(true)}
          className={`max-w-full max-h-full object-contain transition-all ${
            !isAvailable ? "grayscale opacity-50" : ""
          }`}
        />
      ) : (
        <span
          className={`text-[9px] font-bold uppercase tracking-tight truncate ${
            !isAvailable ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {alt}
        </span>
      )}
    </div>
  );
}

export function isShippingAvailableForCountry(
  method: ShippingMethod,
  country: CountryOption["code"] | "",
): boolean {
  if (!method.available) return false;
  if (!method.supportedCountries || !country) return method.available;
  return method.supportedCountries.includes(country);
}

export default function ShippingPaymentStep({
  paymentMethods,
  shippingMethods,
  selectedPaymentId,
  selectedShippingId,
  onSelectPayment,
  onSelectShipping,
  selectedCountry,
  showErrors,
}: ShippingPaymentStepProps) {
  const paymentMissing = showErrors && !selectedPaymentId;
  const shippingMissing = showErrors && !selectedShippingId;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
      {/* ================= COLUMN 1: PAYMENT ================= */}
      <div className="min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          Payment
        </h2>
        <p className="text-xs text-gray-500 mt-1 mb-4">
          Please choose a payment method
        </p>

        {paymentMissing && (
          <p className="text-[11px] text-[#FF3B16] mb-2">
            Please select a payment method to continue.
          </p>
        )}

        <div className="flex flex-col gap-3.5">
          {paymentMethods.map((method) => {
            const isSelected = selectedPaymentId === method.id;
            const isAvailable = method.available;

            return (
              <button
                key={method.id}
                type="button"
                disabled={!isAvailable}
                onClick={() => isAvailable && onSelectPayment(method.id)}
                className={`w-full text-left rounded-md p-3.5 lg:p-4 transition-all border ${
                  !isAvailable
                    ? "bg-[#F5F6F6] border-transparent opacity-60 cursor-not-allowed"
                    : isSelected
                      ? "bg-[#EAEAEA] border-gray-300 cursor-pointer"
                      : paymentMissing
                        ? "bg-[#F5F6F6] border-[#FF3B16] cursor-pointer"
                        : "bg-[#F5F6F6] border-transparent hover:border-gray-300 cursor-pointer"
                }`}
              >
                {/* Header Row: Radio + Name + Logo */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        !isAvailable
                          ? "border-gray-300 bg-gray-100"
                          : isSelected
                            ? "border-[#3B72D9] bg-[#3B72D9]"
                            : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && isAvailable && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold truncate ${
                        !isAvailable ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      {method.name}
                    </span>
                  </div>

                  <MethodLogo
                    src={method.logo}
                    alt={method.name}
                    isAvailable={isAvailable}
                  />
                </div>

                {/* Description */}
                <p
                  className={`text-[11px] leading-relaxed mt-3 md:line-clamp-3 lg:line-clamp-none ${
                    !isAvailable ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {method.description}
                </p>

                {!isAvailable && (
                  <p className="text-[10px] font-semibold text-[#FF3B16] mt-2">
                    Unavailable
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= COLUMN 2: SHIPPING ================= */}
      <div className="min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          Shipping
        </h2>
        <p className="text-xs text-gray-500 mt-1 mb-4">
          Please choose a shipping company based on your region
        </p>

        {shippingMissing && (
          <p className="text-[11px] text-[#FF3B16] mb-2">
            Please select a shipping method to continue.
          </p>
        )}

        <div className="flex flex-col gap-3.5">
          {shippingMethods.map((method) => {
            const isAvailable = isShippingAvailableForCountry(
              method,
              selectedCountry,
            );
            const isSelected = selectedShippingId === method.id && isAvailable;

            return (
              <button
                key={method.id}
                type="button"
                disabled={!isAvailable}
                onClick={() => isAvailable && onSelectShipping(method.id)}
                className={`w-full text-left rounded-md p-3.5 lg:p-4 transition-all border ${
                  !isAvailable
                    ? "bg-[#F5F6F6] border-transparent opacity-60 cursor-not-allowed"
                    : isSelected
                      ? "bg-[#EAEAEA] border-gray-300 cursor-pointer"
                      : shippingMissing
                        ? "bg-[#F5F6F6] border-[#FF3B16] cursor-pointer"
                        : "bg-[#F5F6F6] border-transparent hover:border-gray-300 cursor-pointer"
                }`}
              >
                {/* Header Row: Radio + Name + Logo */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        !isAvailable
                          ? "border-gray-300 bg-gray-100"
                          : isSelected
                            ? "border-[#3B72D9] bg-[#3B72D9]"
                            : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && isAvailable && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold truncate ${
                        !isAvailable ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      {method.name}
                    </span>
                  </div>

                  <MethodLogo
                    src={method.logo}
                    alt={method.name}
                    isAvailable={isAvailable}
                  />
                </div>

                {/* Details */}
                <div
                  className={`flex flex-col gap-1 text-[11px] mt-3 ${
                    !isAvailable ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <p>
                    Delivery time:{" "}
                    <span className="font-medium">{method.deliveryTime}</span>
                  </p>
                  <p>
                    Shipping cost:{" "}
                    <span className="font-medium">
                      {method.cost === 0 ? "Free" : `$${method.cost}`}
                    </span>
                  </p>
                  <p>
                    Insurance:{" "}
                    <span
                      className={`font-semibold ${
                        !isAvailable
                          ? "text-gray-400"
                          : method.insuranceAvailable
                            ? "text-[#10B981]"
                            : "text-[#FF3B16]"
                      }`}
                    >
                      {method.insuranceAvailable ? "Available" : "Unavailable"}
                    </span>
                  </p>
                  {!isAvailable && (
                    <p className="text-[10px] font-semibold text-[#FF3B16] mt-0.5">
                      Unavailable for your region
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
