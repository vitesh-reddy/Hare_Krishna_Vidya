import React from 'react';

const DonationCards = () => {
  return (
    <section className="hidden lg:block pt-0 px-10 md:px-16 py-[1.5rem] w-full bg-[#EDF2F7CC] rounded-[2rem]">
      <div className='flex gap-[2rem] py-[1rem] items-center justify-center '>
        <div className='h-[1px] w-[10rem] bg-[#656565]' ></div>
        <p className='text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-urbanist font-bold text-center text-[#2C2C2C] [font-style:oblique_6deg]'>Choose</p>
        <div className='h-[1px] w-[10rem] bg-[#656565]' ></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Annadaan Card */}
          <div onClick={() => window.location.href = '#AnnadanSection'} className="bg-gradient-to-br from-[#e1e6e8] to-[#f9feff] border border-border-primary rounded-[30px] p-6 lg:px-8 lg:py-[1.5rem] hover:[box-shadow:inset_11px_11px_28px_rgba(209,213,215,0.9)] transition-all duration-300">
            <div className="bg-[#F4A261] bg-opacity-40 w-14 h-14 lg:w-[3.25rem] lg:h-[3.25rem] rounded-full flex items-center justify-center mb-6 lg:mb-8">
              <img
                src="/assets/img_food_traced.svg"
                alt="Food icon"
                className="w-6 h-6 lg:w-7 lg:h-7"
              />
            </div>
            <h3 className="font-urbanist text-[1.125rem] lg:text-[1.35rem] font-semibold text-black mb-4">
              Annadaan
            </h3>
            <p className="font-inter text-base lg:text-[1rem] font-medium text-[#656565] leading-6 mb-6 w-[17.5rem]">
              Provide freshly cooked, sanctified meals to those in need. Your kindness fills plates
              and hearts.
            </p>
          </div>

          {/* Sponsor a Child Card */}
          <div onClick={() => window.location.href = '#SponsorChildSection'} className="bg-gradient-to-br from-[#e1e6e8] to-[#f9feff] border border-border-primary rounded-[30px] p-6 lg:p-8 hover:[box-shadow:inset_11px_11px_28px_rgba(209,213,215,0.9)] transition-all duration-300">
            <div className="bg-[#F4A261] bg-opacity-40 w-14 h-14 lg:w-[3.25rem] lg:h-[3.25rem] rounded-full flex items-center justify-center mb-6 lg:mb-8">
              <img
                src="/assets/img_food_traced.svg"
                alt="Child icon"
                className="w-6 h-6 lg:w-7 lg:h-7"
              />
            </div>
            <h3 className="font-urbanist text-[1.125rem] lg:text-[1.35rem] font-semibold text-black mb-4">
              Sponsor a Child
            </h3>
            <p className="font-inter text-base lg:text-[1rem] text-[#656565] leading-6 mb-6 w-[17rem]">
              Support a child's education, nutrition, and wellbeing. Change one life forever.
            </p>
          </div>

          {/* Vidya Daan Card */}
          <div onClick={() => window.location.href = '#VidhyadanaSection'} className="bg-gradient-to-br from-[#e1e6e8] to-[#f9feff] border border-border-primary rounded-[30px] p-6 lg:p-8 hover:[box-shadow:inset_11px_11px_28px_rgba(209,213,215,0.9)]   transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div className="bg-[#F4A261] bg-opacity-40 w-14 h-14 lg:w-[3.25rem] lg:h-[3.25rem] rounded-full flex items-center justify-center mb-6 lg:mb-8">
              <img
                src="/assets/img_food_traced.svg"
                alt="Education icon"
                className="w-6 h-6 lg:w-7 lg:h-7"
              />
            </div>
            <h3 className="font-urbanist text-[1.125rem] lg:text-[1.35rem] font-semibold text-black mb-4">
              Vidya Daan
            </h3>
            <p className="font-inter text-base lg:text-[1rem] text-[#656565] leading-6 mb-6 w-[17.5rem]">
              Help light the lamp of learning. Your support shares sacred teachings and education
              with young hearts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCards;
