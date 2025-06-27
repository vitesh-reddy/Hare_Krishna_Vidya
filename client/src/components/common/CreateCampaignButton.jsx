import React from 'react';

const CreateCampaignButton = () => {
  return (
    <button
      onClick={() => window.location.href = '/CreateCampaign'}
      className="md:font-semibold rounded-[1.125rem] lg:mx-0 transition-colors duration-200 cursor-pointer inline-flex items-center justify-center shadow-custom-campaign bg-[#de5f3f] text-white text-[0.7rem] sm:text-[0.75rem] px-[1.5rem] py-4 hover:bg-[#bc5038] focus:ring-[#e76f51]"
    >
      <p>Create Campaign</p>
    </button>
  );
};

export default CreateCampaignButton;
