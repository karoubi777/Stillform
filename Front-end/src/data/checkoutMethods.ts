import type { PaymentMethod, ShippingMethod } from "../types/product";

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "paypal",
    name: "PayPal",
    description:
      "PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically.",
    logo: "/images/payment/Paypal.png",
    available: true,
  },
  {
    id: "mastercard",
    name: "Mastercard",
    description:
      "Pay securely using your Mastercard debit or credit card with instant payment verification.",
    logo: "/images/payment/mastercard.png",
    available: true,
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    description:
      "Fast peer-to-peer cryptocurrency checkout. Currently unavailable for this order.",
    logo: "/images/payment/bitcoin.png",
    available: false, // Example unavailable state (applies grayscale filter)
  },
];

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "ausff",
    name: "AUSFF",
    deliveryTime: "14-21 days",
    cost: 0,
    insuranceAvailable: false,
    logo: "/images/shipping/AUSFF.png",
    available: true,
    supportedCountries: ["US", "DE"],
  },
  {
    id: "race-couriers",
    name: "RaceCouriers",
    deliveryTime: "14-21 days",
    cost: 10,
    insuranceAvailable: true,
    logo: "/images/shipping/RaceCouriers.png",
    available: true,
    supportedCountries: ["US", "DE"],
  },
  {
    id: "transco-cargo",
    name: "TranscoCargo",
    deliveryTime: "14-21 days",
    cost: 12,
    insuranceAvailable: true,
    logo: "/images/shipping/TranscoCargo.png",
    available: false, // Example unavailable state (applies grayscale filter)
    supportedCountries: ["DE"],
  },
];
