import { useState, useEffect } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  activeImage?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductGallery({
  images,
  productName,
  activeImage,
  isFavorite,
  onToggleFavorite,
}: ProductGalleryProps) {
  const safeImages = images.length > 0 ? images : [""];
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!activeImage) return;
    const idx = safeImages.indexOf(activeImage);
    if (idx !== -1) setSelectedIndex(idx);
  }, [activeImage, safeImages]);

  const currentImage = safeImages[selectedIndex] || safeImages[0];

  return (
    <div className="w-full flex flex-col sm:flex-row gap-3 lg:gap-4">
      {/* DESKTOP & TABLET: Vertical Thumbnails on Left */}
      <div className="hidden sm:flex flex-col gap-2.5 w-16 lg:w-20 shrink-0 max-h-[540px] overflow-y-auto">
        {safeImages.map((img, idx) => (
          <button
            key={`${img}-${idx}`}
            type="button"
            onMouseEnter={() => setSelectedIndex(idx)}
            onClick={() => setSelectedIndex(idx)}
            aria-label={`View image ${idx + 1}`}
            aria-pressed={selectedIndex === idx}
            className={`w-full aspect-[3/4] rounded overflow-hidden border transition-all duration-200 ${
              selectedIndex === idx
                ? "border-gray-900 ring-1 ring-gray-900"
                : "border-gray-200 opacity-75 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`${productName} view ${idx + 1}`}
              className="w-full h-full object-cover bg-[#F5F6F6]"
            />
          </button>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="relative w-full flex-1 aspect-[3/4] sm:aspect-[4/5] bg-[#F5F6F6] rounded overflow-hidden">
        <img
          src={currentImage}
          alt={productName}
          className="w-full h-full object-cover"
        />

        {/* Mobile Floating Heart Button */}
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`sm:hidden absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition active:scale-90 ${
            isFavorite ? "bg-[#FF3B16] text-white" : "bg-white text-gray-700"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Mobile Pagination Dots */}
        {safeImages.length > 1 && (
          <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-600/60 backdrop-blur-xs">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View image ${idx + 1}`}
                onClick={() => setSelectedIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === idx ? "bg-white scale-110" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* MOBILE: Horizontal Thumbnails Strip */}
      <div className="flex sm:hidden gap-2 overflow-x-auto pb-1">
        {safeImages.map((img, idx) => (
          <button
            key={`mob-${img}-${idx}`}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`w-16 aspect-[3/4] shrink-0 rounded overflow-hidden border transition ${
              selectedIndex === idx
                ? "border-gray-900"
                : "border-gray-200 opacity-75"
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover bg-[#F5F6F6]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
