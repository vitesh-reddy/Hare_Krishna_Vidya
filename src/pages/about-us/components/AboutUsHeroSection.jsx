// src/pages/about-us/components/AboutUsHeroSection.jsx
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const AboutUsHeroSection = () => {
  return (
    <section>
      <div className='relative'>
        <div className='absolute inset-0 w-full bg-white'> </div>
        <div>
          <p>Empowering Rural Dreams with Education & Nourishment</p>
          <p>Since 2018, Aikya Vidya has been a beacon of hope for underprivileged children providing free post-school education, nutritious meals, and life-enriching values to help them grow with purpose.</p>
        </div>

        <video src="./assets/Scene-1.mp4" autoPlay className='w-full'/>
      </div>

    </section>
      
  );
};

export default AboutUsHeroSection;