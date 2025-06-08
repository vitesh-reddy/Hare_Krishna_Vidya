import DonateButton from '@/components/common/DonateButton'
import Button from '@/components/ui/Button'
import React from 'react'

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

            <Button className="bg-white text-[#2c2c2c] text-lg px-6 py-4 rounded-[24px] font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
              <img src="/assets/img_information_button.png" alt="Info" className="w-5" />
              <span className="text-black">About Us</span>
            </Button>
          </div>
        </div>}
      {position == 'outside' &&
        <div className="block md:hidden right-8 bottom-14 rounded-[40px] p-10 max-w-[30rem]">
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
            <DonateButton/>

            <Button className="bg-white text-[#2c2c2c] text-lg px-6 py-4 rounded-[24px] font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
              <img src="/assets/img_information_button.png" alt="Info" className="w-5" />
              <span className="text-black">About Us</span>
            </Button>
          </div>
        </div>}
    </>
  )
}

export default ActionCard