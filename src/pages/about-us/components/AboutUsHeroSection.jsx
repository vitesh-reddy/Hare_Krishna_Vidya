// src/pages/about-us/components/AboutUsHeroSection.jsx
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const AboutUsHeroSection = () => {
  return (
    <section>
      <div className='relative w-[100vw]'>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 shadow-custom-oval-mobile md:shadow-custom-oval"></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center space-y-1 z-20 bg-transparent'>
          <p className='font-urbanist text-[#EDF2F7] font-bold text-[1.25rem] sm:text-[1.5rem]  md:text-[2.5rem] lg:text-[3.25rem] leading-[1rem] md:leading-10'>Empowering Rural Dreams with </p>
          <p className='font-urbanist text-[#E76F51] font-bold text-[1.25rem] sm:text-[1.5rem]  md:text-[2.5rem] lg:text-[3.25rem]'> Education & Nourishment</p>
          <div className='hidden md:block'>
            <p className='font-inter text-[0.75rem] text-center text-[#EDF2F7] font-medium'> <span className='[font-style:oblique_10deg] font-extrabold'>Since 2018</span>, Aikya Vidya has been a beacon of hope for underprivileged children </p> 
            <p className='font-inter text-[#EDF2F7] font-medium'> providing < span className='[font-style:oblique_10deg] font-extrabold'>free post-school education, nutritious meals,</span> and life-enriching </p>
            <p className='font-inter text-[#EDF2F7] font-medium'> values to help them grow with purpose.</p>
          </div>
          <div className='flex flex-col items-center md:hidden px-[2rem]'>
            <span className='font-inter text-[0.75rem] text-center text-[#EDF2F7] font-medium'> <span className='[font-style:oblique_10deg] font-extrabold'>Since 2018</span>, Aikya Vidya has been a beacon of hope for underprivileged children providing < span className='[font-style:oblique_10deg] font-extrabold'>free post-school education, nutritious meals,</span> and life-enriching values to help them grow with purpose.</span>
          </div>
        </div>

        <video src="./assets/Scene-1.mp4" playsInline autoPlay muted className='w-[100vw]'></video>
      </div>

    </section>
      
  );
};

export default AboutUsHeroSection;