import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { LanguageProvider } from "@/context/LanguageContext";
import GoogleTranslateWidget from "@/components/GoogleTranslateWidget";
import Layout from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import WelcomePage from "./pages/WelcomePage";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import NotFound from "./pages/NotFound";
import CarbonOffsetPage from "./pages/environment/CarbonOffsetPage";
import TreePlantingPage from "./pages/environment/TreePlantingPage";
import GeotaggingPage from "./pages/environment/GeotaggingPage";
import DonatePage from "./pages/environment/DonatePage";
import TeamPage from "./pages/about/TeamPage";
import CommunityPage from "./pages/CommunityPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="index" element={<Index />} />
              <Route path="welcome" element={<WelcomePage />} />
              <Route path="tours" element={<ToursPage />} />
              <Route path="tours/:tourSlug" element={<TourDetailPage />} />
              <Route path="destinations" element={<DestinationsPage />} />
              <Route path="destinations/:destinationSlug" element={<DestinationDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="about/team" element={<TeamPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="checkout/:tourSlug" element={<CheckoutPage />} />
              <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
              <Route path="environment/carbon-offset" element={<CarbonOffsetPage />} />
              <Route path="environment/tree-planting" element={<TreePlantingPage />} />
              <Route path="environment/geotagging" element={<GeotaggingPage />} />
              <Route path="environment/donate" element={<DonatePage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <GoogleTranslateWidget />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;