import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

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
    <section className="relative bg-[#001b2c] rounded-[40px] mx-auto mb-8 overflow-hidden w-full max-w-[75.206rem] h-[28rem] md:h-[36rem] lg:h-[48rem] px-4">
      {/* Background Image */}
      <div className="absolute inset-0 h-full">
        <img
          src="/images/img_c2f5de6806506b4a28874bec3bcdf212_1_1_1.png"
          alt="Children receiving food"
          className="w-full h-full object-cover rounded-[40px]"
        />
        <div className="absolute inset-0 bg-black/10 rounded-[40px]"></div>
      </div>
      {/* Donation Notification */}
      <div
        className={
          'absolute top-0 right-8 z-20 transition-all duration-1000 ease-in-out ' +
          (showNotification ? 'translate-y-10' : 'opacity-0')
        }
      >
        <div className="bg-gradient-to-r from-[#ededed] to-white rounded-[15px] p-3 shadow-[100px_100px_250px_rgba(224,224,224,0.9)] max-w-[435px]">
          <div className="flex items-center space-x-3 py-1">
            <img src="/images/img_om.png" alt="Om symbol" className="w-[1rem] h-[1rem]" />
            <p className="text-lg font-urbanist text-[#2c2c2c] leading-4">
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
          <h1 className="font-urbanist text-[3.35rem] font-bold text-white mb-3 leading-[72px]">
            One Meal. <span className="[font-style:oblique_6deg] text-[#f4a261]"> One Book. </span>One Child
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-[1.35rem] font-[350] text-white mb-[15rem] leading-0 max-w-2xl mx-auto">
            Closer to a Brighter Tomorrow. Every donation brings nourishment, knowledge, and hope to
            underprivileged children.
          </p>
        </div>

        {/* Stats Card */}
        <div className="absolute left-10 bottom-14 bg-[rgba(237,242,247,0.8)] rounded-[40px] p-6 shadow-[0px_4px_12px_rgba(136,136,136,1)] max-w-[23.4375rem] h-[14rem] cursor-pointer">
          {/* Karma Insights Header */}
          <div className="flex flex-row items-center mb-6 gap-3 relative">
            <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 shadow-custom-numKeys">
              <div className="flex items-center space-x-3">
                <img src="/images/img_shines.png" alt="Shine icon" className="w-5 h-5" />
                <span className="text-lg font-semibold font-inter text-black">Karma Insights</span>
              </div>
            </div>
            <span className="text-lg text-[#6d7175] leading-5 mt-1">Click here</span>
            <img
              src="/images/img_vector_1.svg"
              alt="Decorative vector"
              className="absolute top-7 h-[7.5rem] right-8  z-[100]"
            />
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-0 pr-16 mb-6">
            <div className="w-fit">
              <p className="w-fit text-[1.5rem] font-urbanist font-bold text-[#2c2c2cbb] leading-10">
                800K
              </p>
              <p className="w-fit text-base font-semibold text-[#2c2c2cbb] leading-6">
                Meals Served
              </p>
            </div>
            <div>
              <div className="text-[1.5rem] font-urbanist font-bold text-[#2c2c2cbb] leading-10">
                50K
              </div>
              <div className="text-base font-semibold text-[#2c2c2cbb] leading-6">
                {' '}
                Children's Educated{' '}
              </div>
            </div>
          </div>

          {/* Donors Info */}
          <div className="flex items-center space-x-4">
            <img src="/images/img_frame_12.png" alt="Donor avatars" className="h-12" />
            <p className="text-sm font-bold text-[#505051] leading-4">
              300+ Donors around the world
            </p>
          </div>
        </div>

        {/* Action Card */}
        <div className="absolute right-8 bottom-14 backdrop-blur-[5px] rounded-[40px] p-10 max-w-[30rem]">
          <h2 className="text-[2rem] font-bold font-urbanist text-white mb-4 leading-11">
            {' '}
            Nourish a Life. Uplift a Soul.{' '}
          </h2>
          <p className="text-[1rem] text-wrap text-white font-inter leading-7">
            {' '}
            Your support delivers food, education, and{' '}
          </p>
          <p className="text-[1rem] text-wrap text-white mb-8 font-inter leading-7">
            {' '}
            hope to those who need it most.
          </p>

          <div className="flex space-x-4 font-inter">
            <Button className="bg-[#e76f51] text-white text-lg px-6 py-4 rounded-[25px] font-semibold flex items-center space-x-2 hover:bg-[#d65a3f] transition-colors">
              <img src="/images/img_heart_traced.svg" alt="Heart" className="h-7" />
              <span>Donate Now</span>
            </Button>

            <Button className="bg-white text-[#2c2c2c] text-lg px-6 py-4 rounded-[24px] font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
              <img src="/images/img_information_button.png" alt="Info" className="w-5" />
              <span className="text-black">About Us</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
