import React, { useState } from 'react';
import Button from '../ui/Button';

const HeroSection = () => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <section className="relative bg-[#001b2c] rounded-[40px] mx-4 mb-8 overflow-hidden w-[1069px] h-[707.2px]">
      {/* Background Image */}
      <div className="absolute inset-0 h-[884px]">
        <img 
          src="/images/img_c2f5de6806506b4a28874bec3bcdf212_1_1_1.png" 
          alt="Children receiving food" 
          className="w-full h-full object-cover rounded-[40px]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[40px]"></div>
      </div>

      {/* Donation Notification */}
      {showNotification && (
        <div className="absolute top-0 right-0 mt-9 mr-8 z-20">
          <div className="bg-gradient-to-r from-[#ededed] to-white rounded-[15px] p-3 shadow-[100px_100px_250px_rgba(224,224,224,0.9)] max-w-[435px]">
            <div className="flex items-center space-x-3">
              <img src="/images/img_om.png" alt="Om symbol" className="w-5 h-5" />
              <p className="text-sm text-[#2c2c2c] leading-4">
                <span className="font-black">Rohit</span> from Mumbai just donated <span className="font-black">₹1,000</span> to feed <span className="font-black">40 children.</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 px-8 py-20 w-full h-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-white mb-6 leading-[72px]">
            One Meal. <span className="text-[#f4a261]">One Book. One Child</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl text-white mb-12 leading-9 max-w-3xl mx-auto">
            Closer to a Brighter Tomorrow. Every donation brings nourishment, knowledge, and hope to underprivileged children.
          </p>
        </div>

        {/* Stats Card */}
        <div className="absolute left-8 bottom-[30px] bg-[rgba(237,242,247,0.8)] rounded-[40px] p-6 shadow-[0px_4px_12px_rgba(136,136,136,1)] max-w-[23.4375rem] h-[16.3125rem]">
          {/* Karma Insights Header */}
          <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 mb-6 shadow-[6px_6px_15px_rgba(185,185,185,0.9)]">
            <div className="flex items-center space-x-3">
              <img src="/images/img_shines.png" alt="Shine icon" className="w-5 h-5" />
              <span className="text-base font-semibold text-black">Karma Insights</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-[32px] font-bold text-[#2c2c2c] leading-10">800K</div>
              <div className="text-base font-semibold text-[#2c2c2c] leading-6">Meals Served</div>
            </div>
            <div>
              <div className="text-[32px] font-bold text-[#2c2c2c] leading-10">50K</div>
              <div className="text-base font-semibold text-[#2c2c2c] leading-6">Children's Educated</div>
            </div>
          </div>

          {/* Donors Info */}
          <div className="flex items-center space-x-4">
            <img src="/images/img_frame_12.png" alt="Donor avatars" className="w-[117px] h-10" />
            <div>
              <p className="text-sm font-bold text-[#505051] leading-4">300+ Donors around the world</p>
              <p className="text-base text-[#6d7175] leading-5 mt-1">Click here</p>
            </div>
          </div>

          {/* Vector decoration */}
          <img src="/images/img_vector_1.svg" alt="Decorative vector" className="absolute top-12 right-8 w-[135px] h-5" />
        </div>

        {/* Action Card */}
        <div className="absolute right-8 bottom-[30px] bg-[rgba(1,1,1,0.1)] rounded-[40px] p-8 shadow-[0px_4px_13px_rgba(136,136,136,1)] max-w-[515px]">
          <h2 className="text-4xl font-bold text-white mb-4 leading-11">
            Nourish a Life. Uplift a Soul.
          </h2>
          <p className="text-lg text-white mb-8 leading-7">
            Your support delivers food, education, and hope to those who need it most.
          </p>
          
          <div className="flex space-x-4">
            <Button className="bg-[#e76f51] text-white px-6 py-3 rounded-[25px] font-semibold flex items-center space-x-2 hover:bg-[#d65a3f] transition-colors">
              <img src="/images/img_heart_traced.svg" alt="Heart" className="w-6 h-7" />
              <span>Donate Now</span>
            </Button>
            
            <Button className="bg-white text-[#2c2c2c] px-6 py-3 rounded-[24px] font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
              <img src="/images/img_information_button.png" alt="Info" className="w-4 h-4" />
              <span>About Us</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;