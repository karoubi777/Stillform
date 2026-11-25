import type { CustomerInfo } from "../types/product";
import { COUNTRIES } from "../data/locations";

export function validateCustomerInfo(info: CustomerInfo) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const selectedCountry = COUNTRIES.find((c) => c.code === info.country);
  const validStates = selectedCountry?.states ?? [];
  const phoneDigits = info.phone.replace(/\D/g, "");

  return {
    email: !info.email.trim()
      ? "Email is required"
      : !emailRegex.test(info.email.trim())
        ? "Enter a valid email address"
        : "",
    firstName: !info.firstName.trim() ? "First name is required" : "",
    lastName: !info.lastName.trim() ? "Last name is required" : "",
    country: !selectedCountry ? "Please select a country" : "",
    state: !info.state.trim()
      ? "State/Region is required"
      : !validStates.includes(info.state)
        ? "Please select a valid state/region from the list"
        : "",
    address:
      info.address.trim().length < 3 ? "Please enter your street address" : "",
    phone: phoneDigits.length < 6 ? "Enter a valid phone number" : "",
  };
}
