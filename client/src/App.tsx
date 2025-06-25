import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./TSX-src/contexts/CartContext";
import { DataProvider } from './contexts/DataContext';
import toast, { Toaster } from "react-hot-toast";
import { BlogProvider } from './contexts/BlogContext';

// Common Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// JSX Pages
import HomePage from "./pages/Home";
import AboutUsPage from "./pages/about-us";
import OurInitiativePage from "./pages/our-initiative";
import GalleryPage from "./pages/gallery";
import ContactPage from "./pages/contact";
import DonatePage from "./pages/donate-amount";
import AmountDonationFlow from './pages/donate-amount/AmountDonationFlow';
import TnCPage from "./pages/terms-and-conditions";
import PrivacyPolicyPage from "./pages/privacy-policy";
import RefundPolicyPage from "./pages/refund-policy";
import OurAssociatedTrustsPage from "./pages/our-associated-trusts";
import GovernancePage from "./pages/governance";
import CreateCampaign from "./pages/campaign";
import FundraisingCampaigns from "./pages/advertforcampaign";


// TSX Pages
import DonateItemsPage from "./TSX-src/pages/donate-items/Index";
import Blog from "./TSX-src/pages/Blog";
import Cart from "./TSX-src/pages/Cart";
import DonationFlow from "./TSX-src/pages/DonationFlow";
import DonationSuccess from "./TSX-src/pages/DonationSuccess";
import NotFound from "./TSX-src/pages/NotFound";

import { CampaignProvider } from './contexts/CampaignContext';
import BlogPage from './pages/blogs';
import CareersPage from './pages/careers';
import { CareerProvider } from './contexts/CareerContext';
import BlogView from './pages/blogs/components/BlogView';

const queryClient = new QueryClient();

// Layout component for routes with Header and Footer
const MainLayout = ({ children }) => (
  <>
    <Header />
    <div className="pb-[4.5rem] sm:pb-[4.55rem] bg-neutral-background lg:pb-[4.95rem]"></div>
    {children}
    <Footer />
  </>
);

// Layout component for routes with only Header
const HeaderOnlyLayout = ({ children }) => (
  <>
    <Header />
    <div className="pb-[4.5rem] sm:pb-[4.55rem] bg-neutral-background lg:pb-[4.95rem]"></div>
    {children}
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const animatedRoutes = ["/our-associated-trusts", "/governance", "/donate-amount", "/donate-items"];
  const isAnimated = animatedRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Toaster/>
        <Routes location={location} key={location.key}>
          {/* Routes with Header and Footer */}
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/about-us" element={<MainLayout><AboutUsPage /></MainLayout>} />
          <Route path="/our-initiative" element={<MainLayout><OurInitiativePage /></MainLayout>} />
          <Route path="/gallery" element={<MainLayout><GalleryPage /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
          <Route path="/donate-amount" element={<MainLayout><DonatePage /></MainLayout>} />
          <Route path="/terms&conditions" element={<MainLayout><TnCPage /></MainLayout>} />
          <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicyPage /></MainLayout>} />
          <Route path="/refund-policy" element={<MainLayout><RefundPolicyPage /></MainLayout>} />
          <Route path="/our-associated-trusts" element={<MainLayout><OurAssociatedTrustsPage /></MainLayout>} />
          <Route path="/governance" element={<MainLayout><GovernancePage /></MainLayout>} />
          <Route path="/donate-items" element={<MainLayout><DonateItemsPage /></MainLayout>} />
          <Route path="/blog" element={< Navigate to="/blogs" replace />} />
          <Route path="/blogs" element={<MainLayout><BlogPage /></MainLayout>} />
          <Route path="/blogs/:id" element={<MainLayout><BlogView /></MainLayout>} />
          <Route path="/CreateCampaign" element={<MainLayout><CreateCampaign /> </MainLayout>} />
          <Route path="/advertforcampaign" element={<MainLayout><FundraisingCampaigns /></MainLayout>} />


          {/* Routes with only Header */}

          <Route path="/cart" element={<HeaderOnlyLayout><Cart /></HeaderOnlyLayout>} />
          <Route path="/careers" element={<HeaderOnlyLayout><CareersPage /></HeaderOnlyLayout>} />

          <Route path="/donate" element={<HeaderOnlyLayout><DonationFlow /></HeaderOnlyLayout>} />
          <Route path="/amount-donation-flow" element={<HeaderOnlyLayout><AmountDonationFlow /></HeaderOnlyLayout>} />
          <Route path="/donation-success" element={<HeaderOnlyLayout><DonationSuccess /></HeaderOnlyLayout>} />
          <Route path="*" element={<HeaderOnlyLayout><NotFound /></HeaderOnlyLayout>} />

        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => {


  // Render all other routes with context providers
  return (
    <QueryClientProvider client={queryClient}>
    <CartProvider>
    <DataProvider>
    <BlogProvider>
    <CampaignProvider>
    <CareerProvider> 
      <AnimatedRoutes />
    </CareerProvider>
    </CampaignProvider>    
    </BlogProvider>
    </DataProvider>
    </CartProvider>
    </QueryClientProvider>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });// force scroll to top on route change    
    }, 100);
  }, [pathname]);

  return null;
};

export default App;