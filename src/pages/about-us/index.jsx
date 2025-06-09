// src/pages/about-us/index.jsx
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import AboutUsHeroSection from './components/AboutUsHeroSection';
import OurImpactSection from './components/OurImpactSection';
import FounderSection from './components/FounderSection';
import Mission_VisionSection from './components/Mission_VisionSection';
import GallerySection from '@/components/common/GallerySection';
import ExistanceSection from './components/ExistanceSection';
import { Link, Links } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Header />
      <main>
        <div className='rotate-[-90deg] flex flex-row fixed -right-[8rem] sm:-right-[10rem] bottom-[13rem] z-50 space-x-4 text-white h-[1vh] font-medium sm:text-[1.3rem]'>
          <Link to='../governance'><div className='font-outfit bg-[#E76F51] px-5 py-2 rounded-[0.5rem_0.5rem_0rem_0rem] text-center w-fit cursor-pointer'>Governance</div></Link>
          <Link to='../our-associated-trusts'> <div className='font-outfit bg-[#E76F51] px-5 py-2 rounded-[0.5rem_0.5rem_0rem_0rem] text-center w-fit cursor-pointer'>Our Associated Trusts</div></Link>
        </div>
        <AboutUsHeroSection />
        <FounderSection/>
        <Mission_VisionSection/>
        <OurImpactSection />
        <ExistanceSection/>        
        <GallerySection/>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
