import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';
import AboutUsPage from './pages/about-us';
import HareKrishnaVidyaPage from './pages/hare-krishna-vidya-charity-and-education-foundation';
import OurInitiativePage from './pages/our-initiative';
import GalleryPage from './pages/gallery';
import ContactPage from './pages/contact';
import DonatePage from './pages/donate';
import TnCPage from './pages/terms-and-conditions';
import PrivacyPolicyPage from './pages/privacy-policy';
import RefundPolicyPage from './pages/refund-policy';
import OurAssociatedTrustsPage from './pages/our-associated-trusts';
import GovernancePage from './pages/governance';

const AppRoutes = () => {
  const location = useLocation();
  const animatedRoutes = ["/our-associated-trusts", "/governance", '/donate'];
  const isAnimated = animatedRoutes.includes(location.pathname);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={isAnimated ? location.pathname : undefined}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path='/our-associated-trusts' element= {<OurAssociatedTrustsPage/> } />
        <Route path='/governance' element= {<GovernancePage/> } />
        <Route path="/hare-krishna-vidya-charity-and-education-foundation" element={<HareKrishnaVidyaPage />} />
        <Route path="/our-initiative" element={<OurInitiativePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact " element={<ContactPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path='/terms&conditions' element= {<TnCPage/> } />
        <Route path='/refund-policy' element= {<RefundPolicyPage/> } />
        <Route path='/privacy-policy' element= {<PrivacyPolicyPage/> } />        
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;