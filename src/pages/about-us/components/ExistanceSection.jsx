import WhiteGlowDiv from '@/components/common/WhiteGlowDiv'
import React from 'react'

const ExistanceSection = () => {
  return (
    <section className='relative w-full flex flex-col items-center px-[4rem]'>
        <WhiteGlowDiv text="From Need to Nurture" />
        <div className='text-center mb-[2.75rem]'>
            <p className='font-urbanist font-extrabold text-[#2c2c2c] text-[2.25rem]'>Why We <span className='text-[#E76F51] [font-style:oblique_6deg] '>Exists?</span></p>
            <p className='font-inter text-[0.9rem] font-medium text-[#2C2C2C] w-[18rem] md:w-[29rem]'>Because every child deserves a chance to learn, grow, and thrive — no matter where they come from.</p>
        </div>
        <img src="/assets/Vector 2.png" alt="Vector" className='w-[53%] mx-auto mb-64 scale-0 lg:scale-100 hidden' />
        <img src="assets/Why We Exist Desktop.png" draggable={false} alt="Why We Exist Desktop" className='hidden md:block'/>

        {/* <div className='relative md:hidden'>
          <div className='w-[1px] h-[80rem] bg-[#f4a26199]'></div>

          <div className='absolute'>
            <div className='flex flex-col items-center w-[40rem]'>
                <img src="/assets/Orange Dot.svg" alt="Dot" className='inline' />
                <p className='font-urbanist font-bold text-[#2C2C2C] text-[1.5rem] sm:text-[2rem] flex items-center'> The Need</p>
                <p className='font-inter font-medium text-[#656565] mb-10'>The purpose of education is to develop all round and well-balanced students. This is achieved by integrated curriculum of aikya vidya, which puts value education and life skills into the curriculum along with school subjects. </p>
                <p className='font-inter font-bold text-[#656565]'>“AIKYA VIDYA” is designed for students of classes 1st to 10th, especially in rural areas. </p>
            </div>
            <div className='flex flex-col items-center'>
                <img src="/assets/Orange Dot.svg" alt="Dot" className='inline' />
                <p className='font-urbanist font-bold text-[#2C2C2C] text-[1.5rem] sm:text-[2rem] flex items-end'>The Cause</p>
                <p className='font-inter font-medium text-[#656565] text-center pr-6'>AIKYA VIDYA affiliated to Hare Krishna Movement Hyderabad which is a non-profit organization on a mission to empower every single child from rural areas, through free education. </p>
            </div>
            <div className='flex flex-col items-center'>
                <img src="/assets/Orange Dot.svg" alt="Dot" className='inline' />
                <p className='font-urbanist font-bold text-[#2C2C2C] text-[1.5rem] sm:text-[2rem] flex items-center'> The Tuition Format</p>
                <p className='font-inter font-medium text-[#656565] text-center'>AIKYA VIDYA organizes evening tuitions under the care of trained teachers, systematically. Teacher focuses on teaching life skills, values to children, and organizes study programs to complete homework, read subjects and doubts will be clarified through teacher and peer learning.</p>
            </div>
          </div>
        </div> */}
				<div className='relative md:hidden flex flex-col items-center px-6 py-10'>
  			{/* Vertical Line */}
  			<div className='absolute top-[3rem] bottom-[6rem] w-px bg-[#f4a26199]'></div>

			  {/* Section 1 */}
			  <div className='flex flex-col items-center backdrop-blur-[1px] text-center max-w-md mb-20'>
			    <img src="/assets/Orange Dot.svg" alt="Dot" className='mb-2 w-[2rem]' />
			    <p className='font-urbanist font-bold text-[#2C2C2C] text-[1.75rem]'>The Need</p>
			    <p className='font-inter font-medium text-[#656565] mt-2'>
			      The purpose of education is to develop all round and well-balanced students.
			      This is achieved by integrated curriculum of Aikya Vidya, which puts value education and life skills into the curriculum along with school subjects.
			    </p>
			    <p className='font-inter font-bold text-[#656565] mt-2'>
			      “AIKYA VIDYA” is designed for students of classes 1st to 10th, especially in rural areas.
			    </p>
			  </div>
				
			  {/* Section 2 */}
			  <div className='flex flex-col items-center backdrop-blur-[1px] text-center max-w-md mb-20'>
			    <img src="/assets/Orange Dot.svg" alt="Dot" className='mb-2 w-[2rem]' />
			    <p className='font-urbanist font-bold text-[#2C2C2C] text-[1.75rem]'>The Cause</p>
			    <p className='font-inter font-medium text-[#656565] mt-2'>
			      AIKYA VIDYA affiliated to Hare Krishna Movement Hyderabad which is a non-profit organization on a mission to empower every single child from rural areas, through free education.
			    </p>
			  </div>
				
			  {/* Section 3 */}
			  <div className='flex flex-col items-center backdrop-blur-[10px] text-center max-w-md'>
			    <img src="/assets/Orange Dot.svg" alt="Dot" className='mb-2 w-[2rem]' />
			    <p className='font-urbanist font-bold text-[#2C2C2C] text-[1.75rem] leading-[2rem]'>The Tuition Format</p>
			    <p className='font-inter font-medium text-[#656565] mt-2'>
  			    AIKYA VIDYA organizes evening tuitions under the care of trained teachers, systematically.
  			    Teacher focuses on teaching life skills, values to children, and organizes study programs to complete homework, read subjects and doubts will be clarified through teacher and peer learning.
  			  </p>
  			</div>
</div>


    </section>
  )
}

export default ExistanceSection