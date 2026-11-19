import { useState } from "react";
import type {
  CountryOption,
  PaymentMethod,
  ShippingMethod,
} from "../../types/product";

interface ProductShippingTabProps {
  countries: CountryOption[];
  selectedCountryCode: CountryOption["code"];
  onSelectCountry: (code: CountryOption["code"]) => void;
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
}

function BrandLogo({
  src,
  alt,
  isAvailable,
}: {
  src: string;
  alt: string;
  isAvailable: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="w-[72px] sm:w-[92px] h-[28px] sm:h-[32px] flex items-center justify-start overflow-hidden shrink-0">
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className={`max-w-full max-h-full object-contain transition-all ${
            !isAvailable ? "grayscale opacity-50" : ""
          }`}
        />
      ) : (
        <span
          className={`text-xs font-bold tracking-tight truncate ${
            !isAvailable ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {alt}
        </span>
      )}
    </div>
  );
}

export default function ProductShippingTab({
  countries,
  selectedCountryCode,
  onSelectCountry,
  shippingMethods,
  paymentMethods,
}: ProductShippingTabProps) {
  return (
    <div className="w-full pt-6 text-left">
      {/* ================= SECTION 1: SHIPPING ================= */}
      <div>
        <h3 className="text-sm font-bold text-gray-900">Shipping</h3>
        <p className="text-xs text-gray-500 mt-1">
          Calculate the shipping cost by region
        </p>

        {/* Region Selector */}
        <div className="flex items-center gap-4 mt-4">
          <label
            htmlFor="shipping-region-select"
            className="text-xs text-gray-600 shrink-0"
          >
            Shipping to
          </label>
          <select
            id="shipping-region-select"
            value={selectedCountryCode}
            onChange={(e) =>
              onSelectCountry(e.target.value as CountryOption["code"])
            }
            className="w-full max-w-[230px] h-[38px] px-3 rounded border border-gray-300 bg-white text-xs text-gray-800 outline-none focus:border-gray-900"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4-Column Shipping Table */}
        <div className="mt-7 w-full">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 pb-3 border-b border-gray-200 text-[11px] sm:text-xs text-gray-500 font-medium">
            <span>Shipping Company</span>
            <span>Shipping Cost</span>
            <span>Estimated Delivery Time</span>
            <span>Packet Insurance</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col divide-y divide-gray-100">
            {shippingMethods.map((method) => {
              const isAvailable =
                method.available &&
                (!method.supportedCountries ||
                  method.supportedCountries.includes(selectedCountryCode));

              return (
                <div
                  key={method.id}
                  className={`grid grid-cols-4 gap-2 sm:gap-4 py-4 items-center text-[11px] sm:text-xs ${
                    !isAvailable ? "opacity-55" : "text-gray-800"
                  }`}
                >
                  <BrandLogo
                    src={method.logo}
                    alt={method.name}
                    isAvailable={isAvailable}
                  />

                  <span className="font-medium">
                    {method.cost === 0 ? "Free" : `$${method.cost}`}
                  </span>

                  <span>{method.deliveryTime}</span>

                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 ${
                        method.insuranceAvailable && isAvailable
                          ? "bg-[#3B72D9] border-[#3B72D9] text-white"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {method.insuranceAvailable && isAvailable && (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="truncate">
                      {method.insuranceAvailable && isAvailable
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: PAYMENT ================= */}
      <div className="mt-8 sm:mt-10 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">Payment</h3>
        <p className="text-xs text-gray-500 mt-1 mb-5">
          Payment methods supported with our platform
        </p>

        <div className="flex items-center gap-6 sm:gap-10 flex-wrap">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              title={
                method.available ? method.name : `${method.name} (Unavailable)`
              }
            >
              <BrandLogo
                src={method.logo}
                alt={method.name}
                isAvailable={method.available}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
