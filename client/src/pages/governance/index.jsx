import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import BoardofTrusteesSection from './components/BoardofTrusteesSection';
import LeadershipTeamSection from './components/LeadershipTeamSection';
import OfficersSection from './components/OfficersSection';
import ManagementTeamSection from './components/ManagementTeamSection';
const GovernancePage = () => {
  return (
    <motion.div initial={{ x: '100%', opacity: 100 }} animate={{ x: 0, opacity: 1 }} exit={false} transition={{ duration: 0.4 }} className="page">

      <div className="min-h-screen bg-[#f9f9f9] 2xl:px-[20rem]">
        <main className=''>
        <div className='rotate-[-90deg] flex flex-row fixed -right-[8rem] sm:-right-[10rem] bottom-[13rem] z-50 space-x-4 text-white h-[1vh] font-medium sm:text-[1.3rem]'>
          <Link to='../about-us'><div className='font-outfit bg-[#E76F51] px-5 py-2 rounded-[0.5rem_0.5rem_0rem_0rem] text-center w-fit cursor-pointer'>Governance</div></Link>
          <Link to='../our-associated-trusts'> <div className='font-outfit bg-[#E76F51] px-5 py-2 rounded-[0.5rem_0.5rem_0rem_0rem] text-center w-fit cursor-pointer'>Our Associated Trusts</div></Link>
        </div>
          
          <div className='mb-[2rem] sm:mb-[3rem] md:mb-[4rem] flex flex-col items-center '>
            <p className='text-[#E76F51] font-urbanist font-bold text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] mt-[3rem] sm:mt-[5.25rem] leading-0'>Our Trustees & <span className='text-[#F4A261]' > Leadership </span></p>
            <svg className='w-[10rem] sm:w-[12rem] md:w-[13rem] lg:w-[14.5rem]' width="267" height="37" viewBox="0 0 267 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M71.1276 21.6612C59.6626 24.9852 46.4256 28.2932 33.6916 29.1192C22.8076 29.8242 12.2947 28.7292 3.68966 24.0702C2.47666 23.4142 0.95766 23.8652 0.30166 25.0792C-0.35534 26.2922 0.0966552 27.8112 1.30966 28.4682C10.6967 33.5492 22.1426 34.8783 34.0146 34.1082C46.9776 33.2682 60.4536 29.9382 72.1486 26.5662C73.5056 29.3152 76.3157 31.8782 81.2656 33.7692C88.8686 36.6742 99.2496 36.6382 110.186 35.0012C126.047 32.6282 143.109 26.9692 154.079 22.9482C154.529 22.7842 155.199 22.5232 156.019 22.1792C156.269 22.7312 156.549 23.2752 156.859 23.8092C159.549 28.4632 164.309 32.2262 169.159 33.5702C199.919 42.0922 235.819 31.8812 265.049 23.5712C266.369 23.1942 267.139 21.8102 266.769 20.4832C266.389 19.1562 265.009 18.3852 263.679 18.7622C235.269 26.8402 200.389 37.0322 170.489 28.7512C166.809 27.7312 163.229 24.8392 161.189 21.3072C160.959 20.9132 160.759 20.5102 160.569 20.1012C164.599 18.1042 169.339 15.3202 171.889 12.3402C174.509 9.28524 175.159 6.02425 172.879 2.94425C170.919 0.311248 167.949 0.0872439 164.859 1.45224C161.529 2.91424 158.099 6.33219 156.989 7.93619C154.909 10.9322 154.249 14.1822 154.629 17.3512C153.649 17.7652 152.853 18.0732 152.362 18.2532C141.632 22.1852 124.955 27.7352 109.446 30.0562C99.4666 31.5502 89.9876 31.7492 83.0496 29.0992C80.0906 27.9682 78.1356 26.6482 77.0746 25.1162C79.1686 24.4902 81.1877 23.8742 83.1167 23.2862C86.9317 22.1232 94.8746 20.1982 100.55 16.7672C105.063 14.0392 108.123 10.3282 107.945 5.67624C107.854 3.28624 106.471 1.69121 104.27 0.797215C100.981 -0.537785 95.2926 0.108201 93.1746 0.558201C86.7506 1.9202 78.1767 7.55823 73.9347 13.9112C72.2417 16.4462 71.2346 19.0982 71.1276 21.6612ZM76.4046 20.0992C78.2196 19.5532 79.9737 19.0172 81.6587 18.5032C85.2197 17.4172 92.6636 15.6922 97.9626 12.4882C100.769 10.7922 103.06 8.76022 102.949 5.86722C102.94 5.64222 102.717 5.57824 102.52 5.48624C102.215 5.34524 101.866 5.24821 101.494 5.17221C98.9766 4.65821 95.5956 5.15519 94.2116 5.44919C88.8216 6.59219 81.6516 11.3572 78.0926 16.6882C77.3406 17.8142 76.7416 18.9612 76.4046 20.0992ZM159.569 15.0492C161.919 13.8402 164.379 12.3782 166.319 10.7872C167.349 9.9422 168.219 9.07324 168.769 8.17124C169.229 7.42524 169.409 6.66119 168.859 5.92319C168.639 5.62419 168.309 5.61823 167.969 5.67423C167.609 5.73423 167.239 5.8622 166.869 6.02719C164.429 7.10119 161.909 9.6102 161.099 10.7872C160.149 12.1522 159.679 13.5962 159.569 15.0492Z" fill="#303030"/>
            </svg>
          </div>

          <BoardofTrusteesSection/>
          <LeadershipTeamSection/>
          <OfficersSection/>
          <ManagementTeamSection/>
          <img  loading="lazy" className='pb-[2rem] lg:py-[4rem] w-[80%] sm:w-[65%] md:w-[70%] lg:w-[60%] mx-auto' src="/assets/Executive Assistants.png" alt="Executive Assistants" />
        </main>
      </div>
    </motion.div>
  )
}

export default GovernancePage