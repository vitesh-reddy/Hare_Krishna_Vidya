import React from 'react';
import CommitteeHeading from './CommitteeHeading';

const ManagementTeamSection = () => {
  return (
    <section className='mt-[4rem]'>
      <CommitteeHeading text1={'Management'} text2={'Team'} />
      <div className='flex flex-col md:flex-row my-[4rem] gap-[4rem] px-[3rem] sm:px-[7rem]'>
        <div className='flex flex-col w-[100%] items-center justify-start gap-[1rem] sm:gap-[2rem]'>
          <img className='w-[15rem] lg:w-[20rem]' src="/assets/Rasa Mandal Dasa.png" alt="Rasa Mandal Dasa" />
          <p className="font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]">
            He is currently serving as the Senior Manager Outreach of AIKYA Vidya. He is a
            B.Pharmacy graduate from Vignan University Vizag. Before joining AIKYA Vidya, he worked
            in Healthcare industry{' '}
          </p>
        </div>
        <div className='flex flex-col w-[100%] items-center justify-center gap-[1rem] sm:gap-[2rem]'>
          <img className='w-[12rem] lg:w-[15.75rem]' src="/assets/Kumaraswamy.png" alt="Kumaraswamy" draggable="false"/>
          <p className="font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]">
            He is currently serving as Senior Manager Youth outreach programme of the AIKYA Vidya. He has done his MA in Sanskrit and diploma in Kathak dance. He participated 3 times in International Kick Boxing championship and won silver medal once. Before joining AIKYA Vidya he worked with various reputed NGOs in different capacities.  
          </p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row mb-[4rem] gap-[4rem] px-[3rem] sm:px-[7rem]'>
        <div className='flex flex-col w-[100%] items-center justify-center gap-[1rem] sm:gap-[2rem]'>
          <img className='w-[13rem] lg:w-[17rem]' src="/assets/Brahmanandam.png" alt="Brahmanandam" />
          <p className="font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]">
          He is currently serving as Senior Manager Village Outreach. Before joining AIKYA Vidya, Brahmanandam served in various reputed NGOs in different capacities.
          </p>
        </div>
        <div className='flex flex-col w-[100%] items-center justify-center gap-[1rem] sm:gap-[2rem]'>
          <img className='w-[12rem] lg:w-[14.5rem]' src="/assets/G. Karthik.png" alt="G. Karthik" draggable="false"/>
          <p className="font-inter text-center text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]">
            He is currently serving as the Manager Outreach in AIKYA Vidya. He is a Mechanical Engineer by education and previously worked in reputed pharmaceutical and software companies.  
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManagementTeamSection;
