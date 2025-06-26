import React from 'react'
import CommitteeHeading from './CommitteeHeading'

const BoardofTrusteesSection = () => {
  return (
    <section>
    <CommitteeHeading text1={"Board of"} text2={"Trustees"} />

      <div className='space-y-[4rem] px-[4rem] sm:px-[10rem]'>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-[1rem] sm:gap-[2rem]'>
          <img  loading="lazy" className='w-[25rem]' src="/assets/HG Chanchalapathi Dasa.png" alt="HG Chanchalapathi Dasa" />
          <p className='font-inter text-center sm:text-start text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]'><span className='text-[#303030]'>Chanchalapathi Dasa </span>  has been working in the field of spiritual education since 1984 and social development since 2000. He pursued his<span className='text-[#303030]'> Bachelor’s Degree in PSG College of Technology, Coimbatore,</span> where he came in touch with <span className='text-[#303030]'> ISKCON</span> and <span className='text-[#303030]'>Srila Prabhupada’s mission.</span> Later, he joined the <span className='text-[#303030]'>Indian Institute of Science, Bengaluru,</span>  to pursue his <span className='text-[#303030]'>Masters in Electrical Communication Engineering.</span>  He has combined the spirit of compassion with his education in technology and applied it to social development. He is currently involved in strategy, planning and governance of <span className='text-[#303030]'> Akshaya Patra.</span> </p>
        </div>
        <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-[1rem] sm:gap-[2rem]'>
          <p className='font-inter text-center sm:text-end text-[#6F6F6F] font-medium text-[0.75rem] sm:text-[0.8rem] md:[0.9rem] lg:text-[1rem] sm:leading-[1.65rem]'> <span className='text-[#303030]'> Amitasana Dasa </span> is the President of <span className='text-[#303030]'> Hare Krishna Movement,</span> Mumbai and Governing Council Member of Hare Krishna Movement, India. He is also the President of Akshaya Patra operations in Maharashtra. Under his leadership, the Foundation has implemented several development initiatives in the region.
          Born in 1969 in Namrup, Assam, India, HG completed <span className='text-[#303030]'> B. Tech. in Computer Science from REC Kurukshetra. </span>He later worked in Kirloskar Computer Services, Bangalore and joined <span className='text-[#303030]'>ISKCON</span>  Bangalore in 1992. He has organized seminars, workshops and counselling programs to benefit students and professionals from all over the country. He has guided hundreds of people, especially youth, to lead a life of happiness and fulfilment. </p>
          <img  loading="lazy" className='w-[25rem]' src="/assets/HG Amitsana Dasa.png" alt="HG Amitasana Dasa" />
        </div>
        
      </div>
    </section>
  )
}

export default BoardofTrusteesSection