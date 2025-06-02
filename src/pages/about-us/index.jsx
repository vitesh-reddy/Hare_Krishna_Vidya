// src/pages/about-us/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import AboutUsHeroSection from './components/AboutUsHeroSection';
import OurStorySection from './components/OurStorySection';
import OurImpactSection from './components/OurImpactSection';
import MeetOurTeamSection from './components/MeetOurTeamSection';
import ValuesSection from './components/ValuesSection';
import TestimonialsSection from './components/TestimonialsSection';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Header />
      
      <main>
        <AboutUsHeroSection />
        <OurStorySection />
        <OurImpactSection />
        <MeetOurTeamSection />
        <ValuesSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;