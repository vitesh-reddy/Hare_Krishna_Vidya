import React from 'react';

const DonateButton = () => {
  return (
    <button onClick={() => window.location.href = '/donate'} className="font-semibold rounded-[25px] transition-colors duration-200 cursor-pointer inline-flex items-center justify-center bg-[#e76f51] text-white text-[0.7rem] sm:text-lg px-6 py-4 space-x-2 hover:bg-[#d65a3f] focus:ring-[#e76f51]">
      <img src="/assets/img_heart_traced.svg" alt="Heart" className="h-[1rem] sm:h-7" />
      <span>Donate Now</span>
    </button>
  );
};

export default DonateButton;
