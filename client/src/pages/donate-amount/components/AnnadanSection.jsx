import WhiteGlowDiv from '@/components/common/WhiteGlowDiv';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const donateData = [
  { children: 100, amount: '₹ 2700' },
  { children: 200, amount: '₹ 5400' },
  { children: 300, amount: '₹ 8100' },
  { children: 500, amount: '₹ 13500' },
  { children: 1000, amount: '₹ 27000' },
  { children: 1500, amount: '₹ 40,500' },
  { children: 3000, amount: '₹ 81,000' },
  { children: 5000, amount: '₹ 1,35,000' },
  { children: 10000, amount: '₹ 2,70,000' },
  { note: 'Donate Any amount', amount: '———' },
  { note: 'Sponsor Anna-Daan of 1 entire village for 1 month', amount: '₹ 2,70,000' },
  { note: 'Sponsor Anna-Daan of 1 entire village for 1 month', amount: '₹ 2,70,000' },
];

const AnnadanSection = () => {
  return (
    <section id='AnnadanSection'>
      <div className="text-center mb-12">
        <WhiteGlowDiv text="Annadan Seva" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urbanist font-extrabold text-[#2c2c2c] text-center mb-5">
          Serve Love Through <span className="text-accent-yellow [font-style:oblique_6deg]">Food </span> 
        </h2>
        <p className="text-[0.75rem] md:text-[1rem] font-inter font-medium text-[#2c2c2c] md:w-[30rem] text-center max-w-2xl mx-auto">
          “Join our sacred mission to feed hungry souls. Every meal you fund is prasadam — blessed, nourishing, and life-changing.“
        </p>
      </div>
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-32 py-12 flex flex-col items-center gap-12">
        <div className="flex flex-wrap justify-center gap-[3rem] w-full">
          {donateData.map((data, idx) => {
            if (idx <= 8) {
              return <AnnadanCard key={idx} {...data} />;
            }
            if (idx === 9) {
              return (
                <div key={idx} className="basis-full flex justify-center mt-4">
                  <AnnadanCard {...data} />
                </div>
              );
            }
            return <AnnadanCard key={idx} {...data} />;
          })}
        </div>
      </div>
    </section>
  );
};

const AnnadanCard = ({ children, amount, note }) => {
  const navigate = useNavigate();
  const handleDonate = () => {
    const amountValue = amount === '———' ? '0' : amount;
    const editable = amount === '———' ? 'true' : 'false';
    navigate(`/amount-donation-flow?type=annadan&amount=${encodeURIComponent(amountValue)}&editable=${editable}`);
  };

  return (
    <div className="relative w-full font-inter max-w-[260px] rounded-[20px] border border-[#f4a261] bg-gradient-to-b from-white via-white to-[#F4A261]/20 shadow-sm px-6 py-8 text-center">
      <p className="text-[#656565] font-semibold text-lg mb-2">
        {note ? (
          <span className="font-medium">{note}</span>
        ) : (
          <>
            Serve <span className="font-bold"> {children} Children</span>
          </>
        )}
      </p>
      <p className="text-3xl font-bold text-[#2C2C2C] mb-[0.75rem]">{amount}</p>
      <div className="absolute -bottom-[1.25rem] left-1/2 transform -translate-x-1/2">
        <button 
          onClick={handleDonate}
          className="bg-[#E76F51] hover:bg-[#d45f44] text-white text-[0.9rem] font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default AnnadanSection;