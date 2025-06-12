import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./TSX-src/components/ui/tooltip";
// import { Toaster } from "./TSX-src/components/ui/toaster";
import { Toaster as Sonner } from "./TSX-src/components/ui/sonner";
import { CartProvider } from "./TSX-src/contexts/CartContext";

// Common Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
// import Navigation from "./components/Navigation";

// JSX Pages
import HomePage from "./pages/Home";
import AboutUsPage from "./pages/about-us";
import HareKrishnaVidyaPage from "./pages/hare-krishna-vidya-charity-and-education-foundation";
import OurInitiativePage from "./pages/our-initiative";
import GalleryPage from "./pages/gallery";
import ContactPage from "./pages/contact";
import DonatePage from "./pages/donate";
import TnCPage from "./pages/terms-and-conditions";
import PrivacyPolicyPage from "./pages/privacy-policy";
import RefundPolicyPage from "./pages/refund-policy";
import OurAssociatedTrustsPage from "./pages/our-associated-trusts";
import GovernancePage from "./pages/governance";

// TSX Pages
import DonateItemsPage from "./TSX-src/pages/donate-items/Index";
import Blog from "./TSX-src/pages/Blog";
import Cart from "./TSX-src/pages/Cart";
import DonationFlow from "./TSX-src/pages/DonationFlow";
import DonationSuccess from "./TSX-src/pages/DonationSuccess";
import AdminDashboard from "./TSX-src/pages/admin/AdminDashboard";
import NotFound from "./TSX-src/pages/NotFound";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const animatedRoutes = ["/our-associated-trusts", "/governance", "/donate-amount", "/donate-items"];
  const isAnimated = animatedRoutes.includes(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop/>
      <Routes location={location} key={isAnimated ? location.pathname : undefined}>
        {/* JSX Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/hare-krishna-vidya-charity-and-education-foundation" element={<HareKrishnaVidyaPage />} />
        <Route path="/our-initiative" element={<OurInitiativePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/donate-amount" element={<DonatePage />} />
        <Route path="/terms&conditions" element={<TnCPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/our-associated-trusts" element={<OurAssociatedTrustsPage />} />
        <Route path="/governance" element={<GovernancePage />} />

        {/* TSX Routes */}
        <Route path="/donate-items" element={ <DonateItemsPage />}  />
        <Route path="/blog" element={<Blog /> }/>
        <Route path="/cart" element={<Cart /> }/>
        <Route path="/donate" element={ <DonationFlow /> }/>
        <Route path="/donation-success" element={ <DonationSuccess /> }/>
        <Route path="/admin" element={  <AdminDashboard /> }/>
        <Route path="*" element={  <NotFound /> }/>
      </Routes>    
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
          <Header />
          {/* <Navigation /> */}
          <div className="pb-[4.5rem] sm:pb-[5rem] lg:pb-[5.25rem]"></div>
          <AnimatedRoutes />
          <Footer />
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // force scroll to top on route change
  }, [pathname]);

  return null;
}


export default App;


