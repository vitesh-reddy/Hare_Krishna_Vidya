import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/hare-krishna-vidya-charity-and-education-foundation" element={<HareKrishnaVidyaPage />} />
        <Route path="/our-initiative" element={<OurInitiativePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path='/terms&conditions' element= {<TnCPage/> } />
        <Route path='/refund-policy' element= {<RefundPolicyPage/> } />
        <Route path='/privacy-policy' element= {<PrivacyPolicyPage/> } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;