import { useState, useMemo, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItemOption } from "../types/product";
import {
  fetchProductById,
  fetchProductDetails,
  fetchProductReviews,
  fetchShippingAndPaymentOptions,
} from "../components/product-detail/productService";
import ProductGallery from "../components/product-detail/ProductGallery";
import ProductInfoPanel, {
  PurchaseActionsBox,
} from "../components/product-detail/ProductInfoPanel";
import ProductDetailTabs from "../components/product-detail/ProductDetailTabs";
import type {
  CountryOption,
  DetailTab,
  PaymentMethod,
  Product,
  ProductDetails,
  ProductReview,
  ProductVariant,
  ShippingMethod,
} from "../types/product";

interface ProductDetailPageProps {
  onAddToCart?: (
    product: Product,
    variant: ProductVariant,
    quantity: number,
  ) => void;
}

export default function ProductDetailPage({}: ProductDetailPageProps) {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  function buildSelectedOptions(): CartItemOption[] {
    if (!addInsurance) return [];
    return [
      {
        id: "item-shipping-insurance",
        type: "insurance",
        label: "Shipping Insurance",
        price: 9,
      },
    ];
  }

  const passedProduct = (location.state as { product?: Product } | null)
    ?.product;
  const numericId = Number(id);
  const hasMatchingPassedProduct =
    passedProduct && passedProduct.id === numericId;

  // Core Product State
  const [product, setProduct] = useState<Product | null>(
    hasMatchingPassedProduct ? passedProduct : null,
  );
  const [isLoadingProduct, setIsLoadingProduct] = useState(
    !hasMatchingPassedProduct,
  );

  // Separate ProductDetails State
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  // Lazy Reviews State
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [hasLoadedReviews, setHasLoadedReviews] = useState(false);

  // Shipping & Payment Tab State
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryOption["code"]>("US");
  const [hasLoadedShipping, setHasLoadedShipping] = useState(false);

  // UI Interaction State
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    hasMatchingPassedProduct ? (passedProduct.variants[0] ?? null) : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [addInsurance, setAddInsurance] = useState(false);
  const [activeTab, setActiveTab] = useState<DetailTab>("details");

  // Favorites State
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("favorite_product_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 1. Load Product + ProductDetails when :id changes
  useEffect(() => {
    let cancelled = false;

    async function loadPageData() {
      setActiveTab("details");
      setHasLoadedReviews(false);
      setReviews([]);
      setQuantity(1);

      if (hasMatchingPassedProduct && passedProduct) {
        setProduct(passedProduct);
        setSelectedVariant(passedProduct.variants[0] ?? null);
        setIsLoadingProduct(false);
      } else {
        setIsLoadingProduct(true);
        const fetchedProduct = await fetchProductById(numericId);
        if (cancelled) return;
        setProduct(fetchedProduct);
        setSelectedVariant(fetchedProduct?.variants[0] ?? null);
        setIsLoadingProduct(false);
      }

      setIsLoadingDetails(true);
      const fetchedDetails = await fetchProductDetails(numericId);
      if (cancelled) return;
      setDetails(fetchedDetails);
      setIsLoadingDetails(false);
    }

    if (!Number.isNaN(numericId)) {
      loadPageData();
    } else {
      setProduct(null);
      setIsLoadingProduct(false);
      setIsLoadingDetails(false);
    }

    return () => {
      cancelled = true;
    };
  }, [numericId, hasMatchingPassedProduct, passedProduct]);

  // 2. Lazy-load Reviews when Reviews tab is selected
  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      if (activeTab !== "reviews" || hasLoadedReviews || !product) return;
      setIsLoadingReviews(true);
      const data = await fetchProductReviews(product.id);
      if (cancelled) return;
      setReviews(data);
      setHasLoadedReviews(true);
      setIsLoadingReviews(false);
    }

    loadReviews();
    return () => {
      cancelled = true;
    };
  }, [activeTab, hasLoadedReviews, product]);

  // 3. Lazy-load Shipping & Payment options when Shipping tab is selected
  useEffect(() => {
    let cancelled = false;

    async function loadShipping() {
      if (activeTab !== "shipping" || hasLoadedShipping) return;
      const data = await fetchShippingAndPaymentOptions();
      if (cancelled) return;
      setCountries(data.countries);
      setShippingMethods(data.shippingMethods);
      setPaymentMethods(data.paymentMethods);
      if (data.countries.length > 0) {
        setSelectedCountryCode(data.countries[0].code);
      }
      setHasLoadedShipping(true);
    }

    loadShipping();
    return () => {
      cancelled = true;
    };
  }, [activeTab, hasLoadedShipping]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const imgs = [
      product.image,
      ...(product.images ?? []),
      ...product.variants.map((v) => v.image),
    ].filter(Boolean);
    return Array.from(new Set(imgs));
  }, [product]);

  function handleToggleFavorite() {
    if (!product) return;
    setFavoriteIds((prev) => {
      const next = prev.includes(product.id)
        ? prev.filter((fid) => fid !== product.id)
        : [...prev, product.id];
      localStorage.setItem("favorite_product_ids", JSON.stringify(next));
      return next;
    });
  }

  function handleQuantityChange(delta: number) {
    if (!selectedVariant) return;
    setQuantity((prev) =>
      Math.min(selectedVariant.stock, Math.max(1, prev + delta)),
    );
  }

  function handleVoteReview(reviewId: number, vote: "like" | "dislike") {
    setReviews((prev) =>
      prev.map((rev) => {
        if (rev.id !== reviewId) return rev;
        const isSameVote = rev.userVote === vote;
        let likes = rev.likes;
        let dislikes = rev.dislikes;

        if (rev.userVote === "like") likes -= 1;
        if (rev.userVote === "dislike") dislikes -= 1;

        if (!isSameVote) {
          if (vote === "like") likes += 1;
          if (vote === "dislike") dislikes += 1;
        }

        return {
          ...rev,
          likes,
          dislikes,
          userVote: isSameVote ? null : vote,
        };
      }),
    );
  }

  function handleSubmitReview(
    newRev: Omit<
      ProductReview,
      "id" | "date" | "likes" | "dislikes" | "userVote"
    >,
  ) {
    const created: ProductReview = {
      ...newRev,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      dislikes: 0,
      userVote: null,
    };
    setReviews((prev) => [created, ...prev]);
  }

  function handleAddToBasket() {
    if (!product || !selectedVariant) return;
    addToCart(product, selectedVariant, quantity, buildSelectedOptions());
  }

  function handleShopNow() {
    if (!product || !selectedVariant) return;
    addToCart(product, selectedVariant, quantity, buildSelectedOptions());
    navigate("/cart");
  }

  if (isLoadingProduct) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[8.5%] py-16 text-center text-sm text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[8.5%] py-16 text-center">
        <p className="text-base font-bold text-gray-900 mb-2">
          Product not found
        </p>
        <Link
          to="/catalog"
          className="text-xs font-semibold text-[#3B72D9] hover:underline"
        >
          Back to catalog
        </Link>
      </div>
    );
  }

  const isFavorite = favoriteIds.includes(product.id);

  return (
    <div className="w-full bg-white py-5 sm:py-7 px-4 sm:px-6 lg:px-[8.5%] max-w-[1440px] mx-auto text-left">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 mb-6"
      >
        <Link to="/" className="hover:text-gray-900">
          Homepage
        </Link>
        <span>&rsaquo;</span>
        {product.category && (
          <>
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-gray-900"
            >
              {product.category}
            </Link>
            <span>&rsaquo;</span>
          </>
        )}
        <span className="text-gray-700 font-medium">{product.brand}</span>
      </nav>

      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
        <ProductGallery
          images={galleryImages}
          productName={product.name}
          activeImage={selectedVariant.image}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />

        <ProductInfoPanel
          product={product}
          selectedVariant={selectedVariant}
          onSelectVariant={(variant) => {
            setSelectedVariant(variant);
            setQuantity((q) => Math.min(q, Math.max(1, variant.stock)));
          }}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          addInsurance={addInsurance}
          onToggleInsurance={setAddInsurance}
          onShopNow={handleShopNow}
          onAddToBasket={handleAddToBasket}
        />
      </div>

      {/* Tabs Section */}
      <ProductDetailTabs
        product={product}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        details={details}
        isLoadingDetails={isLoadingDetails}
        reviews={reviews}
        isLoadingReviews={isLoadingReviews}
        onVoteReview={handleVoteReview}
        onSubmitReview={handleSubmitReview}
        countries={countries}
        selectedCountryCode={selectedCountryCode}
        onSelectCountry={setSelectedCountryCode}
        shippingMethods={shippingMethods}
        paymentMethods={paymentMethods}
      />

      {/* Mobile Bottom Purchase Box */}
      <div className="sm:hidden mt-8 pt-4">
        <PurchaseActionsBox
          unitPrice={product.price}
          quantity={quantity}
          addInsurance={addInsurance}
          onToggleInsurance={setAddInsurance}
          onShopNow={handleShopNow}
          onAddToBasket={handleAddToBasket}
          disabled={selectedVariant.stock <= 0}
        />
      </div>
    </div>
  );
}
