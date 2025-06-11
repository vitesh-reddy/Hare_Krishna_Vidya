import React from 'react'
import DonateButton from '@/components/common/DonateButton' 

const ActionCard = ({position}) => {
  return (
    <>
      {position == 'inside' &&
        <div className="hidden md:block absolute right-8 bottom-14 backdrop-blur-[5px] rounded-[40px] p-10 max-w-[25rem] lg:max-w-[30rem]">
          <h2 className="text-[1.5rem] lg:text-[2rem] font-bold font-urbanist text-white mb-4 leading-11">
            {' '}
            Nourish a Life. Uplift a Soul.{' '}
          </h2>
          <p className="text-[0.9rem] lg:text-[1rem] text-wrap text-white font-inter leading-7">
            {' '}
            Your support delivers food, education, and{' '}
          </p>
          <p className="text-[0.9rem] lg:text-[1rem] text-wrap text-white mb-8 font-inter leading-7">
            {' '}
            hope to those who need it most.
          </p>

          <div className="flex space-x-4 font-inter">
            <DonateButton/>

          <div onClick={() => window.location.href = '/about-us'} className="font-semibold rounded-[24px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer inline-flex items-center justify-center bg-white text-[#2c2c2c] text-lg px-6 py-4 space-x-2 hover:bg-gray-100">
            <img src="/assets/img_information_button.png" alt="Info" class="w-5" />
            <span className="text-black">About Us</span>
          </div>
          </div>
        </div>}
      {position == 'outside' &&
        <div className="flex flex-col items-center  md:hidden bg-[#edf2f7cc] mb-[2rem] rounded-[40px] p-10 w-[90%]">
          <h2 className="text-[1.5rem] sm:text-[2.5rem] font-bold font-urbanist text-[#2c2c2c] mb-1 sm:mb-4 leading-11">
            {' '}
            Nourish a Life. Uplift a Soul.{' '}
          </h2>
          <p className="text-[1rem] sm:text-[1.25rem] text-wrap text-[#2c2c2c] font-inter leading-7">
            {' '}
            Your support delivers food, education, and{' '}
          </p>
          <p className="text-[1rem] sm:text-[1.25rem] text-wrap text-[#2c2c2c] mb-4 sm:mb-8 font-inter leading-7">
            {' '}
            hope to those who need it most.
          </p>

          <div className="flex space-x-4 font-inter">
            <DonateButton/>

          <div onClick={() => window.location.href = '/about-us'} className="font-semibold rounded-[24px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer inline-flex items-center justify-center bg-white text-[#2c2c2c] text-lg px-6 py-4 space-x-2 hover:bg-gray-100">
            <img src="/assets/img_information_button.png" alt="Info" class="w-5" />
            <span className="text-black">About Us</span>
          </div>
          </div>
        </div>}
    </>
  )
}

export default ActionCard