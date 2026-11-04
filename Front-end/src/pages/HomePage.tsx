import Homehero from "../components/home/Homehero";
import FlashSales from "../components/home/FlashSales";
import TrendingMustHave from "../components/home/TrendingMustHave";
import Top100 from "../components/home/Top100";

import { topproducts } from "../components/home/mock-topproducts";
export default function HomePage() {
  return (
    <>
      <Homehero />
      <FlashSales />
      <TrendingMustHave />
      <Top100 products={topproducts} />
    </>
  );
}
