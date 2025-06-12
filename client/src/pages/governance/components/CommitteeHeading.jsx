import React from 'react'

const CommitteeHeading = ({text1, text2}) => {
  return (
    <div className='flex flex-col items-center w-[fit] mb-[2rem]'>
      <p className='text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-urbanist font-bold text-center text-[#F47514]'>{text1} <span className='text-[#F4A261]'> {text2} </span></p>
      <svg className='w-[17rem]' width="347" height="9" viewBox="0 0 347 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4.5" cy="4.5" r="4.5" fill="#D9D9D9"/>
        <line x1="13" y1="4.5" x2="347" y2="4.5" stroke="black"/>
      </svg>
    </div>    
  )
}

export default CommitteeHeading