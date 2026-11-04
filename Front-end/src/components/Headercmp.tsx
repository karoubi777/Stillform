import { useState } from "react";
import SearchBar from "./SearchBar";

type Product = {
  id: number | string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category?: string;
};

type MobileHeaderProps = {
  products: Product[];
  cartCount?: number;
  onMenuClick: () => void;
};

export default function Header({
  products,
  cartCount = 3,
  onMenuClick,
}: MobileHeaderProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[438px] mx-auto px-4 py-2">
      <div className="flex items-center justify-between w-full h-[27px]">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="h-full flex items-center justify-center p-0.5 active:scale-95 transition"
        >
          <img
            src="src\assets\icons\Menueicon.svg"
            alt="menu icon"
            className="h-full w-auto object-contain"
          />
        </button>

        <div className="h-full flex items-center">
          <h1>stillform</h1>
        </div>

        <button
          type="button"
          aria-label="View cart"
          className="relative h-full flex items-center justify-center p-0.5"
        >
          <img
            src="src\assets\icons\Logo.svg"
            alt="shopping bag"
            className="h-full w-auto object-contain"
          />

          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="w-full">
        <SearchBar products={products} />
      </div>
    </div>
  );
}
