import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from '../../components/common/HeroSection';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const HomePage = () => {
  const [selectedAmount, setSelectedAmount] = useState('5000');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handleDonationClick = () => {
    setShowPaymentSuccess(true);
    setTimeout(() => setShowPaymentSuccess(false), 3000);
  };

  const testimonials = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.',
      name: 'Lorem ipsum',
      location: 'Lorem ipsum',
      donation: 'Donated ₹1000 in Anadaan',
      image: '/assets/img_ellipse_3.png',
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.',
      name: 'Lorem ipsum',
      location: 'Lorem ipsum',
      donation: 'Donated ₹1000 in Anadaan',
      image: '/assets/img_ellipse_3.png',
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.',
      name: 'Lorem ipsum',
      location: 'Lorem ipsum',
      donation: 'Donated ₹1000 in Anadaan',
      image: '/assets/img_ellipse_3.png',
    },
  ];

  const galleryImages = [
    { src: '/assets/img_image_15.png', alt: 'Children receiving education' },
    { src: '/assets/img_image_16.png', alt: 'Community gathering' },
    { src: '/assets/img_image_17.png', alt: 'Educational activities' },
    { src: '/assets/img_image_18.png', alt: 'Food distribution' },
    { src: '/assets/img_image_19.png', alt: 'Happy children' },
  ];

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />

      <main>
        <HeroSection />

        {/* Mission Section */}
        <section className="pt-0 px-16 sm:pt-[2.75rem]  lg:pt-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-12">
              <h2 className="[font-style:oblique_6deg] font-urbanist text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark mb-10">
                Give Nourishment, <span className="text-accent-yellow">Give Knowledge,</span> Give
                Hope
              </h2>
              <p className="text-[1rem] text-[#656565] font-inter text-text-muted max-w-3xl">
                <span className="font-bold [font-style:oblique_6deg]">Decide the path </span> of
                your kindness — each one leads to hope and transformation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Annadaan Card */}
              <div className="bg-gradient-to-br from-[#e1e6e8] to-[#f9feff] border border-border-primary rounded-[30px] p-6 lg:px-8 lg:py-14 hover:[box-shadow:inset_11px_11px_28px_rgba(209,213,215,0.9)] transition-all duration-300">
                <div className="bg-[#F4A261] bg-opacity-40 w-14 h-14 lg:w-[3.25rem] lg:h-[3.25rem] rounded-full flex items-center justify-center mb-6 lg:mb-8">
                  <img
                    src="/assets/img_food_traced.svg"
                    alt="Food icon"
                    className="w-6 h-6 lg:w-7 lg:h-7"
                  />
                </div>
                <h3 className="font-urbanist text-xl lg:text-[1.35rem] font-semibold text-black mb-4">
                  Annadaan
                </h3>
                <p className="font-inter text-base lg:text-[1rem] font-medium text-[#656565] leading-6 mb-6 w-[17.5rem]">
                  Provide freshly cooked, sanctified meals to those in need. Your kindness fills
                  plates and hearts.
                </p>
              </div>

              {/* Sponsor a Child Card */}
              <div className="bg-gradient-to-br from-[#e1e6e8] to-[#f9feff] border border-border-primary rounded-[30px] p-6 lg:p-8 hover:[box-shadow:inset_11px_11px_28px_rgba(209,213,215,0.9)] transition-all duration-300">
                <div className="bg-[#F4A261] bg-opacity-40 w-14 h-14 lg:w-[3.25rem] lg:h-[3.25rem] rounded-full flex items-center justify-center mb-6 lg:mb-8">
                  <img
                    src="/assets/img_food_traced.svg"
                    alt="Child icon"
                    className="w-6 h-6 lg:w-7 lg:h-7"
                  />
                </div>
                <h3 className="font-urbanist text-xl lg:text-[1.35rem] font-semibold text-black mb-4">
                  Sponsor a Child
                </h3>
                <p className="font-inter text-base lg:text-[1rem] text-[#656565] leading-6 mb-6 w-[17rem]">
                  Support a child's education, nutrition, and wellbeing. Change one life forever.
                </p>
              </div>

              {/* Vidya Daan Card */}
              <div className="bg-gradient-to-br from-[#e1e6e8] to-[#f9feff] border border-border-primary rounded-[30px] p-6 lg:p-8 hover:[box-shadow:inset_11px_11px_28px_rgba(209,213,215,0.9)]   transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="bg-[#F4A261] bg-opacity-40 w-14 h-14 lg:w-[3.25rem] lg:h-[3.25rem] rounded-full flex items-center justify-center mb-6 lg:mb-8">
                  <img
                    src="/assets/img_food_traced.svg"
                    alt="Education icon"
                    className="w-6 h-6 lg:w-7 lg:h-7"
                  />
                </div>
                <h3 className="font-urbanist text-xl lg:text-[1.35rem] font-semibold text-black mb-4">
                  Vidya Daan
                </h3>
                <p className="font-inter text-base lg:text-[1rem] text-[#656565] leading-6 mb-6 w-[17.5rem]">
                  Help light the lamp of learning. Your support shares sacred teachings and
                  education with young hearts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Journey Section */}
        <section className="relative pb-12 px-16 sm:pb-16 lg:pb-0 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex justify-center items-center w-full">
              {/* Left Side - Journey Steps */}
              <div className="relative left-1 overflow-hidden bg-[#f4a261] w-[50%] p-8 lg:p-12 rounded-[50px_0px_0px_50px]" >
                <p className="text-3xl sm:text-4xl lg:text-[2.25rem] w-[70%] font-urbanist font-bold text-white mb-8 lg:mb-12 leading-[1rem]">
                  Your Donation Journey
                </p>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="bg-white bg-opacity-70 rounded-[15px] px-4 py-2 w-fit font-urbanist flex items-center space-x-4">
                    <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl font-extrabold font-urbanist text-neutral-dark">1</span>
                    </div>
                    <span className="text-lg lg:text-[1rem] font-bold text-[#2c2c2c]/80">
                      🧡 You Select a Cause
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white bg-opacity-70 rounded-[15px]  px-4 py-2 w-fit font-urbanist flex items-center space-x-4">
                    <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl font-bold font-urbanist text-neutral-dark">2</span>
                    </div>
                    <span className="text-lg lg:text-[1rem] font-bold text-[#2c2c2c]/80">
                      💳 Make a Secure Donation
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white bg-opacity-70 rounded-[15px]  px-4 py-2 w-fit font-urbanist flex items-center space-x-4">
                    <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl font-bold font-urbanist text-neutral-dark">3</span>
                    </div>
                    <span className="text-lg lg:text-[1rem] font-bold text-[#2c2c2c]/80">
                      🙏 Get Updates on Real Impact
                    </span>
                  </div>
                </div>
              </div>
              {/* Mobile Donation Interface */}
              <div className="relative mt-12 flex justify-center w-[45%] z-1">
                <div className="relative max-w-full w-full">
                  <img
                    src="/assets/img_iphone_15_1.png"
                    alt="Mobile donation interface"
                    className="h-[95%] rounded-[30px] lg:rounded-[50px] bg-[#EDF2F7] mix-blend-multiply"
                  />
                  <div className='absolute inset-0 w-full flex flex-col top-[5rem] items-center space-y-10 pr-5'>
                    <div className='w-[70%] relative inset-0'>
                      <img className='w-full rounded-3xl z-1'
                         src="images/img_image_14.png" alt="Annadhanam" />
                      <div className='absolute rounded-3xl inset-0 flex flex-col justify-center items-center text-white z-10'>
                        <p className='font-urbanist text-[#F9F9F9] text-lg font-semibold'>You've selected</p>
                        <p className='font-urbanist text-[#F9F9F9] text-[2rem] leading-5 font-semibold'>Annadaan</p>
                      </div>
                      <div className='absolute inset-0 bg-black/30 rounded-3xl'>

                      </div>

                    </div>
                    <div id='keypad' className="w-[90%] h-[50%] flex flex-col items-center p-4 bg-white/0">
                      {/* Display Field */}
                      <div className="w-[16rem] max-w-xs flex items-center justify-between bg-[#F9F9F9] rounded-full px-6 py-4 mb-6 shadow-custom-complex">
                        <span className="text-black/50 font-semibold text-[1.25rem] font-urbanist ">₹ 5,000</span>
                        <img src="images/img_chevrondown.svg" alt="Dropdown" className='w-6'/>
                      </div>

                      {/* Keypad Grid */}
                      <div className="grid grid-cols-3 gap-4 max-w-xs">
                        {/* Numeric Buttons */}
                        {[7, 8, 9, 7, 8, 9, 7, 8, 9, 0].map((num, index) => (
                          <div
                            key={index}
                            className="w-[4.5rem] h-[4rem] bg-white rounded-full flex items-center justify-center text-black/50 font-urbanist text-[1.25rem] font-semibold shadow-custom-numKeys"
                          >
                            {num}
                          </div>
                        ))}
                        {/* Confirm Button */}
                        <div className="group col-span-2 w-full h-[3.75rem] mt-1 bg-[#FEAA66] from-[40%] to-[#FFAA66] shadow-custom-numButton rounded-full flex items-center justify-center text-black/50 text-[1.3rem] font-urbanist font-semibold cursor-pointer">
                          Confirm <img src="images/arrow-right-circle.svg" alt="->" className='group-hover:h-8 ml-1 mt-1 h-0 transition-all duration-[400ms]'/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Success Message */}
              <div
                className="h-[30rem] relative overflow-hidden bg-[#e76f51] right-7 flex flex-col gap-2 items-start justify-center rounded-[0px_50px_50px_0px] p-8 lg:p-12 shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
                <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold font-urbanist text-white/70 text-opacity-90 mb-6">
                  Woohoo! 🎉
                </h2>
                <p className="text-lg lg:text-[1.125rem] text-white/70 font-inter font-medium mb-8 leading-6">
                  Your kindness will serve fresh  , sanctified meals to{' '}
                  <span className="font-bold text-white/70 [font-style:oblique_6deg] font-inter">100 children today.</span>
                </p>
                <div
                  className="bg-accent-yellow text-white px-6 py-3 rounded-[20px] font-semibold shadow-2xl hover:bg-accent-dark transition-colors flex items-center space-x-3 w-full sm:w-auto justify-center"
                >
                  <span>Click here to make payment</span>
                  <img
                    src="/assets/img_credit.png"
                    alt="Credit card"
                    className="w-6 h-6 lg:w-7 lg:h-7"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 px-16 sm:py-16 lg:py-20 mb-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="bg-white rounded-[24px] px-4 py-3 shadow-custom-numKeys inline-flex items-center space-x-3 mb-10">
                <img src="/assets/img_shines.png" alt="Shine icon" className="w-[1rem]" />
                <span className="text-[1rem] font-inter font-semibold text-black">Testimonials</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urbanist font-extrabold text-[#2c2c2c] text-center mb-5">
                Your <span className="text-accent-yellow [font-style:oblique_6deg]">Impact </span> in Their Words
              </h2>
              <p className="text-[1rem] font-inter font-medium text-[#2c2c2c] w-[30rem] text-center max-w-2xl mx-auto">
                Real voices. Real change. Hear from those whose lives have been transformed by your
                kindness.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="relative">
                  <div className="hover:border-4 border-accent-yellow rounded-[40px] p-0 overflow-hidden transition-all duration-300">
                    <div
                      className="overflow-hidden bg-[#e76f51] rounded-[40px] p-6 lg:px-10 lg:py-[4rem] shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
                      <p className="text-lg lg:text-[1.3rem] text-[#ecece2] font-[400] font-inter text-opacity-90 mb-14 lg:mb-20 leading-relaxed">
                        {testimonial.text}
                      </p>

                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 lg:w-[4.75rem]  rounded-full object-cover"
                        />
                        <div className='flex flex-col space-y-3 justify-evenly'>
                          <h4 className="text-xl lg:text-[1.75rem] font-urbanist font-bold text-[#ECECE2] ">
                            {testimonial.name}
                          </h4>
                          <p className="text-base lg:text-[1rem] font-inter text-[#ECECE2]/60 font-medium text-opacity-70">
                            {testimonial.location}
                          </p>
                          <p className="text-sm lg:text-[0.9rem] font-inter font-semibold text-[#ECECE2]">
                            {testimonial.donation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 px-[5rem] sm:py-16 lg:py-20 bg-gradient-gallery">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-28">
              <div className="bg-white rounded-[24px] px-4 py-3 shadow-custom-numKeys inline-flex items-center space-x-3 mb-8">
                <img src="/assets/img_shines.png" alt="Shine icon" className="w-[1rem]" />
                <span className="text-[1rem] font-inter font-semibold text-black">Gallery</span>
              </div>

              <p className="text-3xl sm:text-4xl lg:text-[2.20rem] text-[#2C2C2C] font-urbanist font-extrabold text-center mb-4">
                A glimpse into the lives you have
              </p>
              <p className="text-3xl sm:text-4xl lg:text-[2.20rem] text-[#2C2C2C]  font-urbanist font-extrabold  text-center mb-8">
                touched with your{' '}
                <span className="text-accent-yellow [font-style:oblique_6deg]">kindness.</span>
              </p>
            </div>

            <div className="flex justify-evenly items-start space-x-8">
              {/* Left Column */}
              <div className="space-y-12">
                <div className="overflow-hidden bg-white rounded-[20px] p-0 group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
                  <img
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    className="w-full  object-cover "
                  />
                </div>
                <div className="overflow-hidden bg-white rounded-[20px] p-0 group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
                  <img
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    className="w-full object-cover "
                  />
                </div>
              </div>

              {/* Center Column */}
              <div className="">
                <div className="overflow-hidden bg-white rounded-[20px] p-0 mb-auto group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
                  <img
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    className="w-full object-cover "
                  />
                </div>

                <div className="text-center py-auto flex flex-col justify-evenly space-y-4 lg:py-12">
                  <p className="text-2xl sm:text-3xl lg:text-[2rem] font-urbanist font-bold text-[#2C2C2C] leading-tight">
                    Real change doesn't 
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-[2rem] font-urbanist font-bold text-[#2C2C2C] leading-tight">
                    always speak 
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-[2rem] font-urbanist font-bold text-[#2C2C2C] leading-tight">
                    it shows. <span className="text-accent-yellow font-extrabold">Just like this.</span>
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-12">
                <div className="overflow-hidden bg-white rounded-[20px] p-0 group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-full object-cover "
                  />
                </div>
                <div className="overflow-hidden bg-white rounded-[20px] p-0 group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
                  <img
                    src={galleryImages[4].src}
                    alt={galleryImages[4].alt}
                    className="w-full object-cover "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Payment Success Modal */}
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Thank You!</h3>
              <p className="text-lg text-text-muted mb-6">
                Your donation will help feed 100 children today. You will receive updates on the
                impact of your kindness.
              </p>
              <Button
                onClick={() => setShowPaymentSuccess(false)}
                variant="primary"
                className="rounded-[20px]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
