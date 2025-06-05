// src/pages/about-us/components/AboutUsHeroSection.jsx
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const AboutUsHeroSection = () => {
  return (
    <section>
      <div className='relative w-[100vw]'>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 shadow-custom-oval"></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center space-y-1 z-20 bg-transparent'>
          <p className='font-urbanist text-[#EDF2F7] font-bold sm:text-[1.5rem]  md:text-[2.5rem] lg:text-[3.25rem] leading-10'>Empowering Rural Dreams with </p>
          <p className='font-urbanist text-[#E76F51] font-bold sm:text-[1.5rem]  md:text-[2.5rem] lg:text-[3.25rem]'> Education & Nourishment</p>
          <p className='font-inter text-[#EDF2F7] font-medium'> <span className='[font-style:oblique_10deg] font-extrabold'>Since 2018</span>, Aikya Vidya has been a beacon of hope for underprivileged children </p> 
          <p className='font-inter text-[#EDF2F7] font-medium'> providing < span className='[font-style:oblique_10deg] font-extrabold'>free post-school education, nutritious meals,</span> and life-enriching </p>
          <p className='font-inter text-[#EDF2F7] font-medium'> values to help them grow with purpose.</p>
        </div>

        <video src="./assets/Scene-1.mp4" autoPlay className='w-[100vw]'/>
      </div>

    </section>
      
  );
};

export default AboutUsHeroSection;