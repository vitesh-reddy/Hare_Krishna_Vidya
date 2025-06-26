import React from 'react'
import CommitteeHeading from './CommitteeHeading'

const LeadershipTeamSection = () => {
  return (
    <div className='mt-[2rem] md:mt-[4rem]'>
      <CommitteeHeading text1={'Leadership'} text2={'Team'} />

      <div className='space-y-[2rem] sm:space-y-[6rem] px-[3rem] sm:px-[7rem]'>
        <div className='rounded-[2rem] p-[1rem] flex flex-col lg:flex-row items-center justify-center sm:bg-[#E2E2E2] gap-[1rem] sm:gap-[2rem]'>
          <img  loading="lazy" className='w-[29rem] sm:rounded-[2rem]' src="/assets/HG Satya Gaura Chandra Dasa.png" alt="HG Satya Gaura Chandra Dasa" />
          <p className='font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]'>HG Satya Gaura Chandra Dasa is a <span className='text-[#303030]'>Gold Medalist in B.Tech Mechanical</span> at Jawaharlal Nehru Technological University – Kakinada. He eventually did his<span className='text-[#303030]'> M.Tech from IIT-Chennai </span>and worked in a multinational IT firm in Bengaluru for a couple of years before deciding to dedicate his life to serving humanity. The first Akshaya Patra kitchen in unified Andhra Pradesh (now Telangana) was set up in Hyderabad in 2008 under his leadership. He also oversaw the setting up of the Foundation’s high-tech mega kitchen in Kandi, Telangana, in association with the Infosys Foundation in 2018. Currently, he is serving as the <span className='text-[#303030]'>President for Akshaya Patra Andhra Pradesh and Telangana.</span> HG is also serving as the President of AIKYA VIDYA.</p>
        </div>
        <div className='rounded-[2rem] sm:mx-[3rem] p-[1rem] flex flex-col lg:flex-row items-center justify-center sm:bg-[#E2E2E2] gap-[1rem] sm:gap-[2rem]'>
          <img  loading="lazy" className='w-[25rem] sm:rounded-[2rem]' src="/assets/HG Sahadeva Sakha Dasa.png" alt="HG Satya Gaura Chandra Dasa" />
          <p className='font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]'>HG Satya Gaura Chandra Dasa is a <span className='text-[#303030]'>Gold Medalist in B.Tech Mechanical</span> at Jawaharlal Nehru Technological University – Kakinada. He eventually did his<span className='text-[#303030]'> M.Tech from IIT-Chennai </span>and worked in a multinational IT firm in Bengaluru for a couple of years before deciding to dedicate his life to serving humanity. The first Akshaya Patra kitchen in unified Andhra Pradesh (now Telangana) was set up in Hyderabad in 2008 under his leadership. He also oversaw the setting up of the Foundation’s high-tech mega kitchen in Kandi, Telangana, in association with the Infosys Foundation in 2018. Currently, he is serving as the <span className='text-[#303030]'>President for Akshaya Patra Andhra Pradesh and Telangana.</span> HG is also serving as the President of AIKYA VIDYA.</p>
        </div>
      </div>
    </div>
  )
}

export default LeadershipTeamSection