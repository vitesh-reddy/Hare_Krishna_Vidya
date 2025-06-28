import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./TSX-src/contexts/CartContext";
import { DataProvider } from './contexts/DataContext';
import toast, { Toaster } from "react-hot-toast";
import { BlogProvider } from './contexts/BlogContext';
import { CampaignProvider } from './contexts/CampaignContext';
import { CareerProvider } from './contexts/CareerContext';

// Common Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Loader from './components/common/Loader';

// JSX Pages  Lazy loading for faster Initial Page Load 
const HomePage = lazy(() => import("./pages/Home"));
const AboutUsPage = lazy(() => import("./pages/about-us"));
const OurInitiativePage = lazy(() => import("./pages/our-initiative"));
const GalleryPage = lazy(() => import("./pages/gallery"));
const ContactPage = lazy(() => import("./pages/contact"));
const DonatePage = lazy(() => import("./pages/donate-amount"));
const AmountDonationFlow = lazy(() => import("./pages/donate-amount/AmountDonationFlow"));
const TnCPage = lazy(() => import("./pages/terms-and-conditions"));
const PrivacyPolicyPage = lazy(() => import("./pages/privacy-policy"));
const RefundPolicyPage = lazy(() => import("./pages/refund-policy"));
const OurAssociatedTrustsPage = lazy(() => import("./pages/our-associated-trusts"));
const GovernancePage = lazy(() => import("./pages/governance"));
const CreateCampaign = lazy(() => import("./pages/campaign"));
const FundraisingCampaigns = lazy(() => import("./pages/advertforcampaign"));
const BlogPage = lazy(() => import("./pages/blogs"));
const BlogView = lazy(() => import("./pages/blogs/components/BlogView"));
const CareersPage = lazy(() => import("./pages/careers"));


// TSX Pages
const DonateItemsPage = lazy(() => import("./TSX-src/pages/donate-items/Index"));
const Cart = lazy(() => import("./TSX-src/pages/Cart"));
const DonationFlow = lazy(() => import("./TSX-src/pages/DonationFlow"));
const DonationSuccess = lazy(() => import("./TSX-src/pages/DonationSuccess"));
const NotFound = lazy(() => import("./TSX-src/pages/NotFound"));

import { Analytics } from '@vercel/analytics/react';


const queryClient = new QueryClient();

// Layout with header and footer
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

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Toaster />
        <Suspense fallback={<Loader />}>
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
            <Route path="/blogs" element={<MainLayout><BlogPage /></MainLayout>} />
            <Route path="/blogs/:id" element={<MainLayout><BlogView /></MainLayout>} />
            <Route path="/CreateCampaign" element={<MainLayout><CreateCampaign /></MainLayout>} />
            <Route path="/advertforcampaign" element={<MainLayout><FundraisingCampaigns /></MainLayout>} />

            {/* Routes with only Header */}
            <Route path="/cart" element={<HeaderOnlyLayout><Cart /></HeaderOnlyLayout>} />
            <Route path="/careers" element={<HeaderOnlyLayout><CareersPage /></HeaderOnlyLayout>} />
            <Route path="/donate" element={<HeaderOnlyLayout><DonationFlow /></HeaderOnlyLayout>} />
            <Route path="/amount-donation-flow" element={<HeaderOnlyLayout><AmountDonationFlow /></HeaderOnlyLayout>} />
            <Route path="/donation-success" element={<HeaderOnlyLayout><DonationSuccess /></HeaderOnlyLayout>} />
            <Route path="*" element={<HeaderOnlyLayout><NotFound /></HeaderOnlyLayout>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <DataProvider>
          <BlogProvider>
            <CareerProvider>
              <CampaignProvider>
                <Analytics />
                <AnimatedRoutes />
              </CampaignProvider>
            </CareerProvider>
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [pathname]);
  return null;
};

export default App;
