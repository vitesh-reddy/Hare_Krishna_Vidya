import React from 'react';

const CreateCampaignButton = () => {
  return (
    <button
      onClick={() => window.location.href = '/CreateCampaign'}
      className="font-semibold rounded-[25px] transition-colors duration-200 cursor-pointer inline-flex items-center justify-center bg-[#e76f51] text-white text-[0.7rem] sm:text-lg px-6 py-4 hover:bg-[#d65a3f] focus:ring-[#e76f51]"
    >
      Create Campaign 

    </button>
  );
};

export default CreateCampaignButton;
