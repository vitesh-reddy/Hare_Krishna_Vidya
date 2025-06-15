import WhiteGlowDiv from '@/components/common/WhiteGlowDiv';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const sponsorData = [
  { children: 1, amount: '₹ 12,000' },
  { children: 2, amount: '₹ 24,000' },
  { children: 4, amount: '₹ 48,000' },
  { children: 8, amount: '₹ 98,000' },
  { children: 9, amount: '₹ 1,08,000' },
  { note: 'Donate Any amount', amount: '———' },
];

const SponsorChildSection = () => {
  return (
    <section id='SponsorChildSection' className="w-full px-4 sm:px-6 md:px-12 lg:px-32 py-12 flex flex-col items-center gap-12">
      <div className="text-center mb-12">
        <WhiteGlowDiv text="Sponsor a Child" />
        <p className="text-3xl sm:text-4xl lg:text-5xl font-urbanist font-extrabold text-[#2c2c2c] text-center mb-5 [font-style:oblique_6deg]">
          Gift a Future</p>
        <p className="text-[0.75rem] md:text-[1rem] font-inter font-medium text-[#2c2c2c] md:w-[30rem] text-center max-w-2xl mx-auto">
          “Gift a child a future filled with wisdom and opportunity.“
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-[3rem] w-full">
        {sponsorData.map((data, idx) => {
          if (idx === 5) {
            return (
              <div key={idx} className="basis-full flex justify-center">
                <SponsorChildCard {...data} />
              </div>
            );
          }
          return <SponsorChildCard key={idx} {...data} />;
        })}
      </div>
    </section>
  );
};

const SponsorChildCard = ({ children, amount, note }) => {
  const navigate = useNavigate();
  const handleDonate = () => {
    const amountValue = amount === '———' ? '0' : amount;
    const editable = amount === '———' ? 'true' : 'false';
    navigate(`/amount-donation-flow?type=sponsorchild&amount=${encodeURIComponent(amountValue)}&editable=${editable}`);
  };

  return (
    <div className="relative w-full font-inter max-w-[260px] rounded-[20px] border border-[#009309] bg-gradient-to-b from-white via-white to-[#009309]/10 shadow-sm px-6 py-8 text-center">
      <p className="text-[#2C2C2C] font-semibold text-lg mb-1">
        {note ? (
          <span className="font-medium">{note}</span>
        ) : (
          <>
            Sponsor <span className="font-bold">{children} Child{children > 1 && 'ren'}</span>
          </>
        )}
      </p>
      {!note && (
        <p className="text-sm text-[#555] font-medium mb-2">Food and Education for 1 Years</p>
      )}
      <p className="text-3xl font-bold text-[#2C2C2C] mb-[0.75rem]">{amount}</p>
      <div className="absolute -bottom-[1.25rem] left-1/2 transform -translate-x-1/2">
        <button 
          onClick={handleDonate}
          className="bg-[#009309] hover:bg-[#008f4c] text-white text-[0.9rem] font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default SponsorChildSection;