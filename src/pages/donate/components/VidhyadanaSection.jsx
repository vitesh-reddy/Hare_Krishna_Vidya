import React from 'react';
import WhiteGlowDiv from '@/components/common/WhiteGlowDiv';

const vidhyaData = [
  { children: 1, period: '1 Academic Year', amount: '₹ 5000' },
  { children: 3, period: '1 Academic Year', amount: '₹ 15,000' },
  { children: 5, period: '1 Academic Year', amount: '₹ 25,000' },
  { children: 1, period: '1 Month', amount: '₹ 500' },
  { children: 5, period: '1 Month', amount: '₹ 2,500' },
  { children: 10, period: '1 Month', amount: '₹ 5,000' },
  { children: 25, period: '1 Month', amount: '₹ 12,000' },
  { children: 50, period: '1 Month', amount: '₹ 25,000' },
  { children: 75, period: '1 Month', amount: '₹ 37,500' },
  { children: 100, period: '1 Month', amount: '₹ 50,000' },
  { children: 150, period: '1 Month', amount: '₹ 75,000' },
  { children: 200, period: '1 Month', amount: '₹ 1,00,000' },
  { note: 'Sponsor Education of 1 Entire Village for 1 Whole Year', amount: '₹ 1,50,000' },
  { note: 'Sponsor Education of 1 Entire Village for 1 Month', amount: '₹ 12,000' },
];

const VidhyadanaSection = () => {
  return (
    <section id='VidhyadanaSection' className="w-full px-4 sm:px-6 md:px-12 lg:px-32 py-12 flex flex-col items-center gap-12">
      <div className="text-center mb-6">
        <WhiteGlowDiv text="Vidhya Dana Seva" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urbanist font-extrabold text-[#2c2c2c] text-center mb-5">
          Gift the Light of <span className="text-[#0075C9] [font-style:oblique_6deg]">Learning</span>
        </h2>
        <p className="text-[0.75rem] md:text-[1rem] font-inter font-medium text-[#2c2c2c] md:w-[30rem] text-center max-w-2xl mx-auto">
          “Through your support, children gain not just education, but purpose and inner strength.”
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-[3rem] w-full">
        {vidhyaData.map((data, idx) => {
          if (idx >= 12) {
            return (
              <div key={idx} className="flex justify-center">
                <VidhyadanCard {...data} />
              </div>
            );
          }
          return <VidhyadanCard key={idx} {...data} />;
        })}
      </div>
    </section>
  );
};

export default VidhyadanaSection;

const VidhyadanCard = ({ children, period, amount, note }) => {
  return (
    <div className="relative w-full font-inter max-w-[260px] rounded-[20px] border border-[#0075C9] bg-gradient-to-b from-white via-white to-[#0075C9]/10 shadow-sm px-6 py-8 text-center">
      <p className="text-[#2C2C2C] font-semibold text-lg mb-1">
        {note ? (
          <span className="font-medium">{note}</span>
        ) : (
          <>
            Sponsor <span className="font-bold">{children} Child{children > 1 && 'ren'}</span>
            <br />
            <span className="text-sm font-normal">Education for {period}</span>
          </>
        )}
      </p>
      <p className="text-3xl font-bold text-[#2C2C2C] mb-[0.75rem]">{amount}</p>

      <div className="absolute -bottom-[1.25rem] left-1/2 transform -translate-x-1/2">
        <button className="bg-[#0075C9] hover:bg-[#005dcf] text-white text-[0.9rem] font-semibold px-6 py-3 rounded-full shadow-md transition duration-300">
          Donate Now
        </button>
      </div>
    </div>
  );
};
