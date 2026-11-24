import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { mockcartitems } from "../mockProducts";
import type {
  AppliedCoupon,
  CartItem,
  CartItemOption,
  CartState,
  CartTotals,
  Product,
  ProductVariant,
} from "../types/product";

const CART_STORAGE_KEY = "stillform_cart_v1";

type PersistedCart = {
  items: CartItem[];
  orderOptions: CartItemOption[];
  coupon: AppliedCoupon | null;
  shippingCost: number;
};

function loadInitialCart(): PersistedCart {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedCart;
      if (Array.isArray(parsed.items)) {
        return {
          items: parsed.items,
          orderOptions: parsed.orderOptions ?? [],
          coupon: parsed.coupon ?? null,
          shippingCost: parsed.shippingCost ?? 0,
        };
      }
    }
  } catch {
    // Fallback to mock data if storage is unavailable/corrupted
  }
  return {
    items: mockcartitems,
    orderOptions: [],
    coupon: null,
    shippingCost: 0,
  };
}

interface CartContextValue extends CartState {
  totalItemsCount: number;
  addToCart: (
    product: Product,
    variant: ProductVariant,
    quantity?: number,
    options?: CartItemOption[],
  ) => void;
  removeFromCart: (cartItemId: number) => void;
  updateQuantity: (cartItemId: number, delta: number) => void;
  toggleItemOption: (cartItemId: number, option: CartItemOption) => void;
  toggleOrderOption: (option: CartItemOption, forceState?: boolean) => void;
  hasOrderOption: (optionId: string) => boolean;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  setShippingCost: (cost: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => loadInitialCart(), []);

  const [items, setItems] = useState<CartItem[]>(initial.items);
  const [orderOptions, setOrderOptions] = useState<CartItemOption[]>(
    initial.orderOptions,
  );
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(initial.coupon);
  const [shippingCost, setShippingCost] = useState<number>(
    initial.shippingCost,
  );
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ items, orderOptions, coupon, shippingCost }),
    );
  }, [items, orderOptions, coupon, shippingCost]);

  function addToCart(
    product: Product,
    variant: ProductVariant,
    quantity = 1,
    options: CartItemOption[] = [],
  ) {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id && item.variant.id === variant.id,
      );

      if (existing) {
        // Merge unique options by option.id
        const mergedOptions = [...existing.options];
        for (const opt of options) {
          if (!mergedOptions.some((o) => o.id === opt.id)) {
            mergedOptions.push(opt);
          }
        }

        return prev.map((item) =>
          item.id === existing.id
            ? {
                ...item,
                quantity: Math.min(variant.stock, item.quantity + quantity),
                options: mergedOptions,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: Date.now(),
          product,
          variant,
          quantity: Math.min(variant.stock, Math.max(1, quantity)),
          options,
        },
      ];
    });
  }

  function removeFromCart(cartItemId: number) {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  }

  function updateQuantity(cartItemId: number, delta: number) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== cartItemId) return item;
        const nextQty = Math.min(
          item.variant.stock,
          Math.max(1, item.quantity + delta),
        );
        return { ...item, quantity: nextQty };
      }),
    );
  }

  function toggleItemOption(cartItemId: number, option: CartItemOption) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== cartItemId) return item;
        const exists = item.options.some((o) => o.id === option.id);
        return {
          ...item,
          options: exists
            ? item.options.filter((o) => o.id !== option.id)
            : [...item.options, option],
        };
      }),
    );
  }

  function toggleOrderOption(option: CartItemOption, forceState?: boolean) {
    setOrderOptions((prev) => {
      const exists = prev.some((o) => o.id === option.id);
      const shouldAdd = forceState !== undefined ? forceState : !exists;
      if (shouldAdd && !exists) return [...prev, option];
      if (!shouldAdd && exists) return prev.filter((o) => o.id !== option.id);
      return prev;
    });
  }

  function hasOrderOption(optionId: string) {
    return orderOptions.some((o) => o.id === optionId);
  }

  function applyCoupon(code: string) {
    const trimmed = code.trim();
    if (!trimmed) {
      setCoupon(null);
      return;
    }
    // Replace with backend POST /api/cart/coupon validation later
    setCoupon({ code: trimmed, discountAmount: 10 });
  }

  function removeCoupon() {
    setCoupon(null);
  }

  function clearCart() {
    setItems([]);
    setOrderOptions([]);
    setCoupon(null);
    setShippingCost(0);
  }

  const totalItemsCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const totals: CartTotals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    const itemOptionsSum = items.reduce(
      (acc, item) =>
        acc + item.options.reduce((optAcc, opt) => optAcc + opt.price, 0),
      0,
    );
    const orderOptionsSum = orderOptions.reduce(
      (acc, opt) => acc + opt.price,
      0,
    );
    const optionsTotal = itemOptionsSum + orderOptionsSum;

    const discount = coupon?.discountAmount ?? 0;
    const shipping = items.length > 0 ? shippingCost : 0;
    const tax = 0;
    const total = Math.max(
      0,
      subtotal + optionsTotal + shipping + tax - discount,
    );

    return { subtotal, optionsTotal, discount, shipping, tax, total };
  }, [items, orderOptions, coupon, shippingCost]);

  return (
    <CartContext.Provider
      value={{
        items,
        orderOptions,
        coupon,
        shippingCost,
        totals,
        loading,
        error,
        totalItemsCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleItemOption,
        toggleOrderOption,
        hasOrderOption,
        applyCoupon,
        removeCoupon,
        setShippingCost,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
