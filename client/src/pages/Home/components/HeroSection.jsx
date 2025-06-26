import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import ActionCard from './ActionCard';

const HeroSection = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification((p) => !p);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {}, [showNotification]);

  return (
    <section className="relative bg-[#001b2c] rounded-[40px] mx-auto  mb-8 overflow-hidden w-[95%] h-[28rem] md:h-[40rem] lg:h-[48rem] lg:px-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className='absolute inset-0 bg-black/10' ></div>
        <img
          src="/assets/Home Hero Image.png"
          alt="Children receiving food"
          className="w-full h-full object-cover rounded-[40px] opacity-70"
        />
      </div>
      {/* Donation Notification */}
      <div
        className={
          'absolute top-0 right-0 sm:right-8 z-20 transition-all duration-1000 ease-in-out ' +
          (showNotification ? 'translate-y-10' : 'opacity-0')
        }
      >
        <div className="bg-gradient-to-r from-[#ededed] to-white rounded-[15px] px-2 py-1 sm:p-3 shadow-[100px_100px_250px_rgba(224,224,224,0.9)] max-w-[435px]">
          <div className="flex items-center space-x-3 py-1">
            <img loading="lazy" src="/assets/img_om.png" alt="Om symbol" className="w-[1rem] h-[1rem]" />
            <p className="text-[0.75rem] sm:text-lg font-urbanist text-[#2c2c2c] leading-4">
              <span className="font-black">Rohit</span> from Mumbai just donated{' '}
              <span className="font-black">₹1,000</span> to feed{' '}
              <span className="font-black">40 children.</span>
            </p>
          </div>
        </div>
      </div>
      ){/* Main Content */}
      <div className="relative z-10 px-8 py-20 w-full h-full flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <p className="font-urbanist text-[1.5rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.35rem] font-bold text-white mb-3 leading-[1.5rem] md:leading-[3rem] lg:leading-[4.5rem]">
            One Meal. <span className="[font-style:oblique_6deg] text-[#f4a261]"> One Book. </span>One Child
          </p>

          {/* Subtitle */}
          <p className="font-inter text-[0.75rem] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.35rem] font-[350] text-white mb-[3rem] sm:mb-[8rem] md:mb-[10rem] lg:mb-[15rem] leading-0 max-w-[35rem] lg:max-w-2xl mx-auto">
            Closer to a Brighter Tomorrow. Every donation brings nourishment, knowledge, and hope to
            underprivileged children.
          </p>
        </div>

        {/* Stats Card */}
        <StatsCard position={'inside'} />

        {/* Action Card */}
        <ActionCard  position={'inside'} />
      </div>
    </section>
  );
};

export default HeroSection;
