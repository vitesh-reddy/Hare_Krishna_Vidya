import React from 'react'
import LearnMoreButton from './LearnMoreButton';

const CharitiesSection = () => {
  const lines = [
    "Hare Krishna Charities began its humble journey of providing free and subsidized meals as a means to address the hunger of the underprivileged, who are barely able to afford even a square meal daily.",
    "As the saying goes “A journey of a thousand miles begins with a single step”, a humble beginning has led Hare Krishna Charities to serving over 11 Crore meals since its inception. We continuously rise the bar for ourselves and We endeavor to realize our mission to feed more than 250000 meals a day by 2025, with the continued support from all our stakeholders and well-wishers.",
    "With 4 Hi-Tech Kitchens (Warangal, Narsingi-Hyderabad, Mahbubnagar and Srikakulam) across Telangana and Andhra Pradesh, we ensure that hot and nutritious meals reach the needy who await a square meal of the day and and give them a ray of hope of fulfilment. Our Technology enabled kitchens have the capacity to cook meals ranging from 20,000 to 50,000 per day. All our kitchens endeavor to utilize the latest technology to continuously improve the quality and nutrition levels of the meals and to implement environment friendly cooking by reducing the wastages."
  ];

  return (
    <section className='pl-[2rem] pr-[5rem] sm:pr-[2rem] md:pr-[3rem] lg:pr-[6rem]  flex flex-col'>
      <img  loading="lazy" className='w-[8rem] sm:w-[18rem] mb-[1rem]' src="/assets/charities.png" alt="Charities" />
      <div className='sm:mb-[3rem]'>
        {lines.map((line, idx) => {
          return ( <p className={'font-inter text-[#303030] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]  sm:block ' + (idx > 1 ? "hidden" : "block")} key={idx}>{line}</p> ) })
        }
      </div>
      <LearnMoreButton/>
      
      <svg className='hidden sm:block my-[2rem] sm:my-[3rem] md:my-[5rem] lg:my-[7rem] w-[100%]' width="1078" height="9" viewBox="0 0 1078 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="12.4863" y1="4.5" x2="1065.51" y2="4.5" stroke="black"/>
        <circle cx="4.5" cy="4.5" r="4.5" fill="#D9D9D9"/>
        <circle cx="1073.5" cy="4.5" r="4.5" fill="#D9D9D9"/>
      </svg>
    </section>
  )
}

export default CharitiesSection