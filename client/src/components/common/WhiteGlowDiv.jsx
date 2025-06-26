import React from 'react';

const WhiteGlowDiv = ({ text }) => {
  return (
    <div className="bg-white rounded-[24px] px-4 py-3 shadow-custom-numKeys inline-flex items-center space-x-3 mb-8 w-fit">
      <img  loading="lazy" src="/assets/img_shines.png" alt="Shine icon" className="w-[1rem]" />
      <span className="text-[1rem] font-inter font-semibold text-black">{text}</span>
    </div>
  );
};

export default WhiteGlowDiv;
