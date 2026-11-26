import FlashSales from "../components/home/FlashSales";
import TrendingMustHave from "../components/home/TrendingMustHave";
import Top100 from "../components/home/Top100";
import PromoBanner from "../components/home/PromoBanner";
import Homehero from "../components/home/Homehero";
import HeroTabletDesktop from "../components/home/HeroTabletDesktop";
import MagSafeBanner from "../components/home/MagSafeBanner";

// Centralized mock data
import {
  mockFlashSales,
  mockTrendingProducts,
  mockTopProducts,
  promoBannersMock,
  mockMagSafeSlides,
} from "../data/mockProducts";

export default function HomePage() {
  return (
    <main className="w-full bg-white flex flex-col gap-8 pb-16">
      <HeroTabletDesktop></HeroTabletDesktop>
      <Homehero></Homehero>
      <FlashSales products={mockFlashSales} />
      {/* 2. Trending must-haves row */}
      <TrendingMustHave products={mockTrendingProducts} />
      {/* 3. Top 100 section */}
      <Top100 products={mockTopProducts} />
      {/* 4. First Promo Banner */}
      <PromoBanner {...promoBannersMock.sectionOne} />
      <MagSafeBanner slides={mockMagSafeSlides}></MagSafeBanner>
      <PromoBanner {...promoBannersMock.sectionTwo} />
    </main>
  );
}
