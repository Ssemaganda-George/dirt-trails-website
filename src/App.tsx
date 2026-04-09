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
import SolutionsPage from "./pages/SolutionsPage";
import SolutionDetailPage from "./pages/SolutionDetailPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import OurApproachPage from "./pages/OurApproachPage";
import VisionMissionPage from "./pages/VisionMissionPage";
import CertificationsPage from "./pages/CertificationsPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import PartnersPage from "./pages/PartnersPage";
import BecomePartnerPage from "./pages/BecomePartnerPage";
import TechnologyPartnersPage from "./pages/TechnologyPartnersPage";
import ResourcesPage from "./pages/ResourcesPage";
import BlogPage from "./pages/BlogPage";
import FAQPage from "./pages/FAQPage";
import EventsPage from "./pages/EventsPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import FeaturesPage from "./pages/FeaturesPage";
import CarbonOffsetTrackingPage from "./pages/CarbonOffsetTrackingPage";
import TreeTrackingPage from "./pages/TreeTrackingPage";
import SupplierVettingPage from "./pages/SupplierVettingPage";
import ImpactReportsPage from "./pages/ImpactReportsPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import DataMetricsPage from "./pages/DataMetricsPage";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import NotFound from "./pages/NotFound";
import CarbonOffsetPage from "./pages/environment/CarbonOffsetPage";
import TreePlantingPage from "./pages/environment/TreePlantingPage";
import GeotaggingPage from "./pages/environment/GeotaggingPage";
import DonatePage from "./pages/environment/DonatePage";
import TeamPage from "./pages/About/TeamPage";
import CareersPage from "./pages/About/CareersPage";
import CommunityPage from "./pages/CommunityPage";
import GuidesPage from "./pages/About/GuidesPage";

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
              <Route path="solutions" element={<SolutionsPage />} />
              <Route path="solutions/:solutionSlug" element={<SolutionDetailPage />} />
              <Route path="sustainability" element={<SustainabilityPage />} />
              <Route path="sustainability/our-approach" element={<OurApproachPage />} />
              <Route path="sustainability/vision-mission" element={<VisionMissionPage />} />
              <Route path="sustainability/certifications" element={<CertificationsPage />} />
              <Route path="sustainability/partnerships" element={<PartnershipsPage />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="partners/become" element={<BecomePartnerPage />} />
              <Route path="partners/technology" element={<TechnologyPartnersPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="resources/blog" element={<BlogPage />} />
              <Route path="resources/case-studies" element={<CaseStudiesPage />} />
              <Route path="resources/success-stories" element={<SuccessStoriesPage />} />
              <Route path="resources/faqs" element={<FAQPage />} />
              <Route path="resources/events" element={<EventsPage />} />
              <Route path="sustainability/features" element={<FeaturesPage />} />
              <Route path="sustainability/carbon-offset-tracking" element={<CarbonOffsetTrackingPage />} />
              <Route path="sustainability/tree-tracking-geotagging" element={<TreeTrackingPage />} />
              <Route path="sustainability/supplier-vetting" element={<SupplierVettingPage />} />
              <Route path="sustainability/impact-reports" element={<ImpactReportsPage />} />
              <Route path="resources/data-metrics" element={<DataMetricsPage />} />
              <Route path="tours/:tourSlug" element={<TourDetailPage />} />
              <Route path="destinations" element={<DestinationsPage />} />
              <Route path="destinations/:destinationSlug" element={<DestinationDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="about/team" element={<TeamPage />} />
              <Route path="about/careers" element={<CareersPage />} />
              <Route path="about/guides" element={<GuidesPage />} />
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