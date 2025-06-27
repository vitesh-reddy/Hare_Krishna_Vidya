import React from 'react';

const DonationJourneySection = () => {
  return (
    <section className="relative flex flex-col items-center pb-12 px-16 sm:pb-16 lg:pb-0 w-full max-w-[120rem]">
      <img loading="lazy" className='mt-[4rem] hidden sm:block' src="/assets/Full Mobile.png" draggable={false} alt="Donation Journey" />
      <img loading="lazy" className='mt-[4rem] block sm:hidden h-[30rem]' src="/assets/Mobile.png" draggable={false} alt="Donation Journey" />
      <div className="hidden max-w-7xl mx-auto w-full">
        <div className="flex justify-center items-center w-full">
          {/* Left Side - Journey Steps */}
          <div className="relative left-1 overflow-hidden bg-[#f4a261] w-[50%] p-8 lg:p-12 rounded-[50px_0px_0px_50px]">
            <p className="text-3xl sm:text-4xl lg:text-[2.25rem] w-[70%] font-urbanist font-bold text-white mb-8 lg:mb-12 leading-[1rem]">
              Your Donation Journey
            </p>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-white bg-opacity-70 rounded-[15px] px-4 py-2 w-fit font-urbanist flex items-center space-x-4">
                <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg lg:text-xl font-extrabold font-urbanist text-neutral-dark">
                    1
                  </span>
                </div>
                <span className="text-lg lg:text-[1rem] font-bold text-[#2c2c2c]/80">
                  🧡 You Select a Cause
                </span>
              </div>

              {/* Step 2 */}
              <div className="bg-white bg-opacity-70 rounded-[15px]  px-4 py-2 w-fit font-urbanist flex items-center space-x-4">
                <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg lg:text-xl font-bold font-urbanist text-neutral-dark">
                    2
                  </span>
                </div>
                <span className="text-lg lg:text-[1rem] font-bold text-[#2c2c2c]/80">
                  💳 Make a Secure Donation
                </span>
              </div>

              {/* Step 3 */}
              <div className="bg-white bg-opacity-70 rounded-[15px]  px-4 py-2 w-fit font-urbanist flex items-center space-x-4">
                <div className="bg-white w-10 h-10 lg:w-[42px] lg:h-[42px] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg lg:text-xl font-bold font-urbanist text-neutral-dark">
                    3
                  </span>
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
                loading="lazy"
                src="/assets/img_iphone_15_1.png"
                alt="Mobile donation interface"
                className="h-[95%] rounded-[30px] lg:rounded-[50px] bg-[#EDF2F7] mix-blend-multiply"
              />
              <div className="absolute inset-0 w-full flex flex-col top-[5rem] items-center space-y-10 pr-5">
                <div className="w-[70%] relative inset-0">
                  <img
                    loading="lazy"
                    className="w-full rounded-3xl z-1"
                    src="assets/img_image_14.png"
                    alt="Annadhanam"
                  />
                  <div className="absolute rounded-3xl inset-0 flex flex-col justify-center items-center text-white z-10">
                    <p className="font-urbanist text-[#F9F9F9] text-lg font-semibold">
                      You've selected
                    </p>
                    <p className="font-urbanist text-[#F9F9F9] text-[2rem] leading-5 font-semibold">
                      Annadaan
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
                </div>
                <div id="keypad" className="w-[90%] h-[50%] flex flex-col items-center p-4 bg-white/0">
                  {/* Display Field */}
                  <div className="w-[16rem] flex items-center justify-between bg-[#F9F9F9] rounded-full px-6 py-4 mb-6 shadow-custom-complex">
                    <span className="text-black/50 font-semibold text-[1.25rem] font-urbanist ">
                      ₹ 5,000
                    </span>
                    <img  loading="lazy" src="assets/img_chevrondown.svg" alt="Dropdown" className="w-6" />
                  </div>

                  {/* Keypad Grid */}
                  <div className="grid grid-cols-3 gap-4 w-full">
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
                      Confirm{' '}
                      <img
                        loading="lazy"
                        src="assets/arrow-right-circle.svg"
                        alt="->"
                        className="group-hover:h-8 ml-1 mt-1 h-0 transition-all duration-[400ms]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Success Message */}
          <div className="h-[30rem] relative overflow-hidden bg-[#e76f51] right-7 flex flex-col gap-2 items-start justify-center rounded-[0px_50px_50px_0px] p-8 lg:p-12 shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold font-urbanist text-white/70 text-opacity-90 mb-6">
              Woohoo! 🎉
            </h2>
            <p className="text-lg lg:text-[1.125rem] text-white/70 font-inter font-medium mb-8 leading-6">
              Your kindness will serve fresh , sanctified meals to{' '}
              <span className="font-bold text-white/70 [font-style:oblique_6deg] font-inter">
                100 children today.
              </span>
            </p>
            <div className="bg-accent-yellow text-white px-6 py-3 rounded-[20px] font-semibold shadow-2xl hover:bg-accent-dark transition-colors flex items-center space-x-3 w-full sm:w-auto justify-center">
              <span>Click here to make payment</span>
              <img
                loading="lazy"
                src="/assets/img_credit.png"
                alt="Credit card"
                className="w-6 h-6 lg:w-7 lg:h-7"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationJourneySection;
