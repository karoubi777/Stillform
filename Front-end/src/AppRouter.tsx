import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";

import HomePage from "./pages/HomePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
