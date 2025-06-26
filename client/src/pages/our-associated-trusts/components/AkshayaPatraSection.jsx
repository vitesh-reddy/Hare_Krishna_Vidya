import React from 'react'
import LearnMoreButton from './LearnMoreButton';

const AkshayaPatraSection = () => {
    const lines = [
    "Hunger shall not be the obstacle stopping children from receiving education and working towards a bright future!",
    "We at the Akshaya Patra Foundation, through our efforts to implement the Mid-Day Meal Programme (PM-POSHAN), strive to construct a healthy, nutritious and bright future for every child in this country.",
    "With a vision that no child in India should be deprived of education because of hunger, our non-profit organisation has relentlessly worked towards implementing the Mid-Day Meal Programme (PM-POSHAN) in about 19,039 schools (government and government-aided) across the country.",
    "With a reach spanning over 67 locations across 15 States and 2 Union Territories, we at the Akshaya Patra Foundation strive towards feeding the primary and upper-primary children with a minimum of 450 and 700 calories respectively on a daily basis.",
    "Having achieved the milestone of feeding about 18,00,907 children every day, our non-profit organisation has the distinction of being one of the biggest NGOs in India that implements the Mid-Day Meal Programme (PM-POSHAN) in schools.",
    "Our efforts have been significantly bolstered by numerous charity donations, government grants and donations from selfless philanthropists who aim to make this world a better place.",
    "We, at the Akshaya Patra Foundation have been carrying out numerous NGO works including feeding children from socio-economically challenged sections, feeding lactating mothers, providing food assistance during times of disasters and primarily, driving away malnutrition from the face of India for over 22 years now.",
    "With a goal to bring in 3 million children under our wings and provide them with nutritious meals under the mid-day meal programme by 2025, our nonprofit organisation is open to collaborations and charity donations to realise our goals."
  ];
  return (
    <section className='pl-[2rem] pr-[5rem] sm:pr-[2rem] md:pr-[3rem] lg:pr-[6rem] pt-[4rem] md:mt-[6rem] flex flex-col'>
      <img  loading="lazy" className='w-[8rem] sm:w-[17.5rem] mb-[1rem] md:mb-[3rem]' src="/assets/Akshaya Patra.png" alt="Akshaya Patra" />
      <div>
        {lines.map((line, idx) => {
          return ( <p className={'font-inter text-[#303030] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem] sm:block ' + (idx > 2 ? "hidden" : "block") } key={idx}>{line}</p> ) })
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

export default AkshayaPatraSection