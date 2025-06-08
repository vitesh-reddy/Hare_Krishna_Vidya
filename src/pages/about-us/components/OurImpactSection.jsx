import WhiteGlowDiv from '@/components/common/whiteGlowDiv';
import React from 'react';

const OurImpactSection = () => {

  const impacts = [
    {
      emoji: 'assets/Impact1.png',
      metric: "10",
      text: "Years Of Foundation",
    },
    {
      emoji: 'assets/Impact2.png',
      metric: "5000+",
      text: "Monthly Donors",
    },
    {
      emoji: 'assets/Impact3.png',
      metric: "1,5k",
      text: "Incredible Volunteers",
    },
    {
      emoji: 'assets/Impact4.png',
      metric: "785",
      text: "Succesfull Campaigns",
    }
  ]

  return (
    <section className="w-full flex flex-col items-center mb-[4rem] md:mb-[6rem] px-[2rem]">
      <WhiteGlowDiv text={'Our Impact in Numbers'} />

      <div className="border border-[#F4A261] rounded-[2rem] px-[4rem] py-6 grid grid-cols-1 sm:grid-cols-2 bg-white shadow-lg min-h-[14.5rem] max-w-[40rem]">
        {impacts.map((impact, idx) => {
          return (
          <Card key={idx} {...impact}/>            
        );
        })}
      </div>
    </section>
  );
};

const Card = ({emoji, metric, text}) => {
  return (
  <div className="flex items-center mb-[1rem] sm:mb-0">
    <img src={emoji} alt="Emoji" className='w-[3rem] sm:w-[3.75rem] mr-2' />
    <p className="text-[2rem] sm:text-[2.75rem] font-urbanist font-bold  text-[#2C2C2C] mr-5">{metric}</p>
    <p className="text-[0.75rem] sm:text-[0.97rem] w-[30%] font-inter font-medium text-[#2C2C2C] mr-5">{text}</p>
  </div>
  )
};
export default OurImpactSection;
