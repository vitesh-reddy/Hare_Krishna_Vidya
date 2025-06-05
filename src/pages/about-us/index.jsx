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
import FounderSection from './components/FounderSection';
import Mission_VisionSection from './components/Mission_VisionSection';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Header />
      
      <main>
        <div className='rotate-[-90deg] flex flex-row fixed -right-[10.8rem] bottom-[13rem] z-50 space-x-4 text-white font-medium text-[1.3rem]'>
          <div className='font-outfit bg-[#E76F51] px-5 py-2 rounded-[0.5rem_0.5rem_0rem_0rem] text-center w-fit cursor-pointer'>Governance</div>
          <div className='font-outfit bg-[#E76F51] px-5 py-2 rounded-[0.5rem_0.5rem_0rem_0rem] text-center w-fit cursor-pointer'>Our Associated Trusts</div>
        </div>
        <AboutUsHeroSection />
        <FounderSection/>
        <Mission_VisionSection/>
        <OurImpactSection />
        {/* <MeetOurTeamSection />
        <ValuesSection />
        <TestimonialsSection /> */}
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;