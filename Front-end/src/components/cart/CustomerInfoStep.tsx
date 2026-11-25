import { useState, useRef, useEffect, useMemo } from "react";
import { COUNTRIES, searchStatesByRelevance } from "../../data/locations";
import type { CountryOption, CustomerInfo } from "../../types/product";
import { validateCustomerInfo } from "../../hooks/validateCustomerInfo";

interface CustomerInfoStepProps {
  value: CustomerInfo;
  onChange: (updated: CustomerInfo) => void;
  showAllErrors: boolean;
}

function CountryFlag({ code }: { code: CountryOption["code"] }) {
  if (code === "DE") {
    return (
      <svg
        className="w-5 h-3.5 rounded-[2px] shrink-0 border border-gray-200"
        viewBox="0 0 5 3"
      >
        <rect width="5" height="1" y="0" fill="#000000" />
        <rect width="5" height="1" y="1" fill="#DD0000" />
        <rect width="5" height="1" y="2" fill="#FFCE00" />
      </svg>
    );
  }

  return (
    <svg
      className="w-5 h-3.5 rounded-[2px] shrink-0 border border-gray-200"
      viewBox="0 0 19 10"
    >
      <rect width="19" height="10" fill="#B22234" />
      <path
        d="M0 1.5h19M0 3.5h19M0 5.5h19M0 7.5h19M0 9.5h19"
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />
      <rect width="8" height="5.4" fill="#3C3B6E" />
    </svg>
  );
}

export default function CustomerInfoStep({
  value,
  onChange,
  showAllErrors,
}: CustomerInfoStepProps) {
  const [touched, setTouched] = useState<
    Partial<Record<keyof CustomerInfo, boolean>>
  >({});

  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateQuery, setStateQuery] = useState(value.state);
  const stateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStateQuery(value.state);
  }, [value.state]);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        countryRef.current &&
        !countryRef.current.contains(e.target as Node)
      ) {
        setCountryOpen(false);
      }
      if (stateRef.current && !stateRef.current.contains(e.target as Node)) {
        setStateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedCountry = useMemo(
    () => COUNTRIES.find((c) => c.code === value.country),
    [value.country],
  );

  const filteredStates = useMemo(() => {
    const states = selectedCountry?.states ?? [];
    if (stateQuery === value.state && value.state !== "") {
      return states;
    }
    return searchStatesByRelevance(states, stateQuery);
  }, [selectedCountry, stateQuery, value.state]);

  const errors = useMemo(() => validateCustomerInfo(value), [value]);

  const hasError = (field: keyof CustomerInfo) =>
    Boolean((showAllErrors || touched[field]) && errors[field]);

  const markTouched = (field: keyof CustomerInfo) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const inputClass = (field: keyof CustomerInfo) =>
    `w-full h-[42px] px-3 rounded border text-xs sm:text-sm text-gray-800 bg-white outline-none transition-colors ${
      hasError(field)
        ? "border-[#FF3B16] focus:border-[#FF3B16]"
        : "border-gray-300 focus:border-gray-900"
    }`;

  return (
    <div className="w-full">
      {/* SECTION 1: CUSTOMER INFORMATION */}
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
        Customer Information
      </h2>

      <div className="flex flex-col gap-4">
        {/* E-mail */}
        <div>
          <label
            htmlFor="checkout-email"
            className="block text-xs font-medium text-gray-600 mb-1.5"
          >
            E-mail
          </label>
          <input
            id="checkout-email"
            name="email"
            type="email"
            autoComplete="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            onBlur={() => markTouched("email")}
            placeholder="example@email.com"
            className={inputClass("email")}
          />
          {hasError("email") && (
            <p className="text-[11px] text-[#FF3B16] mt-1">{errors.email}</p>
          )}
        </div>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label
              htmlFor="checkout-first-name"
              className="block text-xs font-medium text-gray-600 mb-1.5"
            >
              First Name
            </label>
            <input
              id="checkout-first-name"
              name="given-name"
              type="text"
              autoComplete="given-name"
              value={value.firstName}
              onChange={(e) =>
                onChange({ ...value, firstName: e.target.value })
              }
              onBlur={() => markTouched("firstName")}
              className={inputClass("firstName")}
            />
            {hasError("firstName") && (
              <p className="text-[11px] text-[#FF3B16] mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="checkout-last-name"
              className="block text-xs font-medium text-gray-600 mb-1.5"
            >
              Last Name
            </label>
            <input
              id="checkout-last-name"
              name="family-name"
              type="text"
              autoComplete="family-name"
              value={value.lastName}
              onChange={(e) => onChange({ ...value, lastName: e.target.value })}
              onBlur={() => markTouched("lastName")}
              className={inputClass("lastName")}
            />
            {hasError("lastName") && (
              <p className="text-[11px] text-[#FF3B16] mt-1">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: SHIPPING ADDRESS */}
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mt-7 mb-4">
        Shipping Address
      </h2>

      <div className="flex flex-col gap-4">
        {/* Country Dropdown with Flag */}
        <div ref={countryRef} className="relative">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Country
          </label>
          <button
            type="button"
            onClick={() => {
              setCountryOpen((prev) => !prev);
              setStateOpen(false);
            }}
            onBlur={() => markTouched("country")}
            className={`${inputClass("country")} flex items-center justify-between text-left`}
          >
            <span className="flex items-center gap-2.5 min-w-0">
              {selectedCountry ? (
                <>
                  <CountryFlag code={selectedCountry.code} />
                  <span className="truncate text-gray-800">
                    {selectedCountry.name}
                  </span>
                </>
              ) : (
                <span className="text-gray-400">Select a country</span>
              )}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${
                countryOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {countryOpen && (
            <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange({
                      ...value,
                      country: country.code,
                      state: "",
                    });
                    setStateQuery("");
                    setCountryOpen(false);
                    markTouched("country");
                  }}
                  className={`w-full px-3 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors ${
                    value.country === country.code
                      ? "bg-gray-50 font-semibold text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  <CountryFlag code={country.code} />
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}

          {hasError("country") && (
            <p className="text-[11px] text-[#FF3B16] mt-1">{errors.country}</p>
          )}
        </div>

        {/* State/Region Searchable Combobox */}
        <div ref={stateRef} className="relative">
          <label
            htmlFor="checkout-state"
            className="block text-xs font-medium text-gray-600 mb-1.5"
          >
            State/Region
          </label>
          <div className="relative">
            <input
              id="checkout-state"
              name="address-level1"
              type="text"
              autoComplete="address-level1"
              disabled={!selectedCountry}
              value={stateQuery}
              onFocus={() => {
                if (selectedCountry) setStateOpen(true);
              }}
              onChange={(e) => {
                const next = e.target.value;
                setStateQuery(next);

                const exactMatch = (selectedCountry?.states ?? []).find(
                  (s) => s.toLowerCase() === next.trim().toLowerCase(),
                );

                if (exactMatch) {
                  onChange({ ...value, state: exactMatch });
                  setStateQuery(exactMatch);
                  setStateOpen(false);
                } else {
                  setStateOpen(true);
                  if (value.state && next !== value.state) {
                    onChange({ ...value, state: "" });
                  }
                }
              }}
              onBlur={() => markTouched("state")}
              placeholder={
                selectedCountry
                  ? "Search state or region..."
                  : "Select a country first"
              }
              className={`${inputClass("state")} pr-9 disabled:bg-gray-50 disabled:cursor-not-allowed`}
            />
            <button
              type="button"
              disabled={!selectedCountry}
              aria-label="Toggle state list"
              onClick={() => {
                if (selectedCountry) setStateOpen((prev) => !prev);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-40"
            >
              <svg
                className={`w-4 h-4 transition-transform ${
                  stateOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>

          {stateOpen && selectedCountry && (
            <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 sm:max-h-48 overflow-y-auto">
              {filteredStates.length === 0 ? (
                <div className="px-3 py-3 text-xs text-gray-400 text-center">
                  No matching state/region found
                </div>
              ) : (
                filteredStates.map((stateName) => (
                  <button
                    key={stateName}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onChange({ ...value, state: stateName });
                      setStateQuery(stateName);
                      setStateOpen(false);
                      markTouched("state");
                    }}
                    className={`w-full px-3 py-2.5 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors ${
                      value.state === stateName
                        ? "bg-gray-100 font-semibold text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {stateName}
                  </button>
                ))
              )}
            </div>
          )}

          {hasError("state") && (
            <p className="text-[11px] text-[#FF3B16] mt-1">{errors.state}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="checkout-address"
            className="block text-xs font-medium text-gray-600 mb-1.5"
          >
            Address
          </label>
          <input
            id="checkout-address"
            name="street-address"
            type="text"
            autoComplete="street-address"
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            onBlur={() => markTouched("address")}
            className={inputClass("address")}
          />
          {hasError("address") && (
            <p className="text-[11px] text-[#FF3B16] mt-1">{errors.address}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="checkout-phone"
            className="block text-xs font-medium text-gray-600 mb-1.5"
          >
            Phone Number
          </label>
          <input
            id="checkout-phone"
            name="tel"
            type="tel"
            autoComplete="tel"
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            onBlur={() => markTouched("phone")}
            placeholder={
              selectedCountry ? `${selectedCountry.phoneCode} ...` : ""
            }
            className={inputClass("phone")}
          />
          {hasError("phone") && (
            <p className="text-[11px] text-[#FF3B16] mt-1">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
