import React from 'react'
import LearnMoreButton from './LearnMoreButton';

const HKMSection = () => {
  const lines = [
  "The Hare Krishna Movement (HKM) was brought to the whole world in this modern age by His Divine Grace. A.C. Bhaktivedanta Swami Prabhupada (in short addressed as “Srila Prabhupada”). Srila Prabhupada is the Founder-Acarya of the worldwide Hare Krishna Movement and is the current link to Almighty Lord Sri Krishna. By his powerful devotion to his Spiritual master, Srila Bhakti Siddhantha Sarasvati Thakur, and Lord Sri Krishna, he attracted the attention of Sri Chaitanya Mahaprabhu to spread His mission all over the planet delivering innumerable souls to the perfectional stage of life. This site is a humble offering to Srila Prabhupada who is our eternal spiritual master and shelter & to Lord Sri Krishna, the original attraction of everyone. May this endeavor please our eternal master for the benefit of hungry seeking souls who are trying to find something permanent, steady, satisfying & blissful in this world of impermanence, misery & dualities. Om Tat Sat."
  ];
  return (
      <section className='pl-[2rem] pr-[5rem] sm:pr-[2rem] md:pr-[3rem] lg:pr-[6rem]  sm:mb-[4rem] flex flex-col'>
      <img  loading="lazy" className='w-[7rem] sm:w-[10rem] rounded-[0.5rem] sm:rounded-[1rem] mb-[1rem]' src="/assets/HKM.png" alt="Charities" />
      <div className='mb-[2rem]'>
        {lines.map((line, idx) => {
          return ( <p className='font-inter text-[#303030] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]' key={idx}>{line}</p> ) })
        }
      </div>
      <LearnMoreButton/>    
    </section>
  )
}

export default HKMSection