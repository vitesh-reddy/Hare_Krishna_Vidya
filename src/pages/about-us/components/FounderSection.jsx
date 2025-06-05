import React from 'react';

const FounderSection = () => {
  return (
    <section className='bg-[#F9F9F9] mt-[2.5rem] p-[1px]'>
      <div className='relative flex justify-end mr-[8.75rem]'>
        <p className='absolute top-[2.5rem] left-[6rem] font-inter text-[#EDF2F7] text-[1rem] bg-[#E76F51] px-6 py-4 leading-[1.4rem] w-[31rem] rounded-2xl'>
            Hare Krishna Movement (HKM) was founded by His Divine Grace 
            <span className='font-extrabold [font-style:oblique_6deg]'> A.C. Bhaktivedanta Prabhupada,</span> 
            also called <span className='font-extrabold [font-style:oblique_6deg]'> Srila Prabhupada </span>
            by devotees affectionately; a man of many facets, a versatile personality, and more. He has been called a scholar, a philosopher, a cultural ambassador, a prolific author, a social critic, and a holy man at various times. In truth, he was all these things and more.
        </p>
        <div className='absolute top-[15rem] left-[6.5rem] bg-black w-2 h-2 rounded-full'></div> <div className='absolute top-[15.125rem] left-[7.5rem] h-[1.5px] w-[20rem] bg-black'></div>

        <div className='absolute top-[17.5rem] left-[4.5rem] flex flex-col items-center text-center'>
            <p className='font-urbanist font-bold text-[#F47514] text-[1.35rem]'>AC Bhaktivedanta Swami Prabhupada</p>
            <p className='font-outfit font-medium text-black/70 text-[1.125rem] w-[60%] '>Founder-Acharya of the worldwide Hare Krishna Movement</p>
        </div>

        <p className='absolute bottom-0 right-[1rem] font-outfit text-[#EDF2F7] text-[1.125rem] text-end bg-[#E76F51] px-6 py-4 leading-[1.4rem] w-[23rem] rounded-2xl'>
        On his order HKM is carrying out massive food distribution programs with the support from respective governments and CSR funding from corporates.</p>
        <div className='absolute -bottom-[2rem] right-[2rem] bg-black w-2 h-2 rounded-full'></div> <div className='absolute -bottom-[1.85rem] right-[2.75rem] h-[1.5px] w-[20rem] bg-black'></div>
        
        <img className='w-[44.5rem]' src='/assets/founder_img2.jpg' alt="Founder Img" />

        <p className='absolute top-[26%] -right-[18%] rotate-[90deg] text-[2rem] font-urbanist font-bold text-[#FC4F4F] '>Stories that Ignite <span className='text-[#F47514]'> Change </span></p>
      </div>
    </section>
  );
};

export default FounderSection;