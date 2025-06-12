import React from 'react';

const AikyaVidyaSection = () => {
  return (
    <section>
      <div className='my-[2rem] sm:my-[4.5rem] px-[1.5rem] md:px-[3.125rem] flex flex-col items-center sm:items-center sm:flex-col lg:flex-row gap-8'>
        <p className='text-[1.5rem] sm:text-[2rem] md:text-[2rem] lg:text-[2.75rem] text-[#2C2C2C] font-urbanist font-bold text-center lg:text-right w-full lg:hidden'>
          Always and Forever
        </p>
      
        <div className="relative w-full sm:w-[85%] md:w-[70%] lg:w-[57%] mx-auto">
          <img className='w-full' src="/assets/Aikya Vidya.png" alt="Aikya Vidya" />
          <svg className='absolute -right-[2.5rem] top-1/2 -translate-y-1/2 hidden lg:block' width="90" height="90" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50.5" cy="50.5" r="50.5" fill="#F47514" />
            <g clipPath="url(#clip0_9_2219)">
              <path d="M43.0835 38.25L62.9168 51L43.0835 63.75V38.25Z" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_9_2219">
                <rect width="24" height="30" fill="white" transform="translate(41 36)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      
        <div className='w-full h-full lg:w-[43%] flex flex-col items-center justify-center lg:items-end text-center lg:text-right'>
          <p className='hidden lg:block text-[2.675rem] text-[#2C2C2C] font-urbanist font-bold mb-2'>
            Always and Forever
          </p>
          <p className='font-inter text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-[#656565]/70 font-medium w-[92%] md:w-[90%] lg:w-[87%]'>
            AIKYA VIDYA empowers underprivileged rural children with free education, food, and values. We aim to anchor their lives, helping them find purpose and view education as a vital foundation for navigating life responsibly.
          </p>
        </div>
      </div>
      
      <div className='w-full flex flex-col items-center space-y-5'>
          <p className='text-[1.5rem] sm:text-[2rem] md:text-[2rem] lg:text-[2.675rem] text-[#F4A261] font-urbanist font-bold text-center leading-[1.75rem] sm:leading-[3.75rem]'>
            An Initiative of  <span className='block sm:inline text-[#0B3954] leading'> Hare Krishna Movement</span> </p>
          <p className='font-inter text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-center text-[#656565] font-medium w-[88%] md:w-[90%] lg:w-[51%]'>
            At Harekrishnavidya, we believe that change begins with understanding the needs of the community. By addressing the root causes of challenges like hunger, education gaps, and healthcare disparities, we are creating sustainable and lasting impact.
          </p>
      </div>
    </section>
  );
};

export default AikyaVidyaSection;
