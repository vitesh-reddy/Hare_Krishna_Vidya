import React from 'react'

const RefundPolicyPage = () => {

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='bg-[#F9F9F9]  px-[1.5rem] sm:pl-[4.5rem] sm:px-0 pt-[3rem]'>
        <p className='text-[#005389] font-urbanist font-bold text-[2rem] lg:text-[3.25rem] mb-[1rem] sm:mb-[3rem]'>Refund Policy</p>
        <div className='sm:pr-[10rem] md:pr-[25rem] lg:pr-[32rem] text-[#2C2C2C] font-inter flex flex-col space-y-[1rem] sm:space-y-[2rem] pb-[2rem]'>
          <p className='font-medium text-[1rem]'>At Harekrishnavidya, we believe that change begins with understanding the needs of the community. By addressing the root causes of challenges like hunger, education gaps, and healthcare disparities, we are creating sustainable and lasting impact.</p>
        </div>
        <ul className='sm:pr-[10rem] md:pr-[25rem] lg:pr-[32rem] text-[#2C2C2C] font-inter flex flex-col pl-[0.5rem] pb-[2rem]'>
          <li className='font-medium text-[1rem]'>• In such cases if the receipt already has been issued, then the donor needs to return the original receipt at our official address. </li>
          <li className='font-medium text-[1rem]'>• In the case of tax exemption cetificate already issued, refund will not be possible.</li>
        </ul>
        <div className="sm:mr-[5rem] md:mr-[20rem] lg:mr-[25rem] bg-white rounded-[24px] px-4 py-3 shadow-custom-numKeys inline-flex items-center space-x-3 mb-[4rem] w-fit">
          <p className="text-[0.75rem] sm:text-[1rem] font-inter font-semibold text-black"> 
            <svg className='inline mb-1' width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 6.97715 18.0228 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 8.5V12.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 16.5H12.51" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className='text-[#F00]'> Note:</span> Please note that international donations will require more working days for refund.</p>
        </div>
      </main>
      <div className='self-end' >
      </div>
    </div>
  )
}

const SideHeading = ({text}) => {
  return (
    <p className='font-bold text-[1.25rem]'>{text}</p>
  )
}

const BodyPara = ({body}) => {
  return (
    <div>
      {
      body.map((para, idx) => {
        return ( <p className='font-medium text-[1rem]' key={idx}>{para}</p> ) })
      }
    </div>
  )
}

export default RefundPolicyPage;