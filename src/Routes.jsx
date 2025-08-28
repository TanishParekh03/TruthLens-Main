import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AboutMethodology from './pages/about-methodology';
import SearchQuery from './pages/search-query';
import StoryComparisonDetail from './pages/story-comparison-detail';
import NewsDashboard from './pages/news-dashboard';
import MediaAccessPage from "pages/media-access"; 

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AboutMethodology />} />
        <Route path="/about-methodology" element={<AboutMethodology />} />
        <Route path="/search-query" element={<SearchQuery />} />
        <Route path="/media-access" element={<MediaAccessPage />} />
        <Route path="/story-comparison-detail" element={<StoryComparisonDetail />} />
        <Route path="/news-dashboard" element={<NewsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
