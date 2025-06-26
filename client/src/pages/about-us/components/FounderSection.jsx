import React from 'react';

const FounderSection = () => {
  return (
    <section className='bg-[#F9F9F9] my-[2.5rem] md:p-[1px] mb-[2rem] md:mb-44'>
      <div className='relative flex flex-col md:flex-row items-center md:justify-end md:mr-[6rem] lg:mr-[8.75rem]'>

        <div className='md:absolute top-[17.5rem] left-[3.5rem] flex flex-col items-center text-center'>
            <p className='font-urbanist font-bold text-[#F47514] text-[1.35rem]'>AC Bhaktivedanta Swami Prabhupada</p>
            <p className='font-outfit font-medium text-black/70 text-[1.125rem] w-[80%] md:w-[60%] '>Founder-Acharya of the worldwide Hare Krishna Movement</p>
        </div>
        <img  loading="lazy" className='md:w-[54vw] px-[2rem] md:px-0' src='/assets/founder_img2.jpg' alt="Founder Img" />

        <div className='md:absolute px-[2rem] md:px-0 top-[2.5rem] left-[4rem]'>
          <p className='font-inter text-[#EDF2F7] text-[0.75rem] md:text-[0.8rem] lg:text-[1rem] bg-[#E76F51] px-6 py-4 leading-[1rem] md:leading-[1.4rem] md:w-[39vw] rounded-2xl'>
              Hare Krishna Movement (HKM) was founded by His Divine Grace 
              <span className='font-extrabold [font-style:oblique_6deg]'> A.C. Bhaktivedanta Prabhupada,</span> 
              also called <span className='font-extrabold [font-style:oblique_6deg]'> Srila Prabhupada </span>
              by devotees affectionately; a man of many facets, a versatile personality, and more. He has been called a scholar, a philosopher, a cultural ambassador, a prolific author, a social critic, and a holy man at various times. In truth, he was all these things and more.
          </p>
          <div className='hidden mt-[1rem] md:flex items-center gap-2'>
            <div className='bg-black w-2 h-2 rounded-full'></div> <div className='h-[1.5px] w-[20rem] bg-black'></div>
          </div>
        </div>
        <p className='md:absolute bottom-0 right-[1rem] font-outfit mx-[2rem] md:mx-0 text-[#EDF2F7] mt-[1rem] text-[0.75rem] md:text-[0.8rem] lg:text-[1rem] bg-[#E76F51] px-6 py-4 leading-[1rem] md:leading-[1.4rem] md:w-[39vw] rounded-2xl'>
        On his order HKM is carrying out massive food distribution programs with the support from respective governments and CSR funding from corporates.</p>
        <div className='hidden md:block absolute -bottom-[1.25rem] right-[2rem] bg-black w-2 h-2 rounded-full'></div> <div className='hidden md:block absolute -bottom-[1.125rem] right-[2.75rem] h-[1px] w-[20rem] bg-black'></div>
                

        <p className='hidden md:block absolute top-[26%] -right-[18%] rotate-[90deg] md:text-[1.5rem] lg:text-[2rem] font-urbanist font-bold text-[#FC4F4F] '>Stories that Ignite <span className='text-[#F47514]'> Change </span></p>
      </div>
    </section>
  );
};

export default FounderSection;