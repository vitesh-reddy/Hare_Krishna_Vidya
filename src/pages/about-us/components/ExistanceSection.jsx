import WhiteGlowDiv from '@/components/common/WhiteGlowDiv'
import React from 'react'

const ExistanceSection = () => {
  return (
    <section className='relative w-full flex flex-col items-center'>
        <WhiteGlowDiv text="From Need to Nurture" />
        <div className='text-center mb-[2.75rem]'>
            <p className='font-urbanist font-extrabold text-[#2c2c2c] text-[2.25rem]'>Why We <span className='text-[#E76F51] [font-style:oblique_6deg] '>Exists?</span></p>
            <p className='font-inter font-medium text-[#2C2C2C] w-[29rem]'>Because every child deserves a chance to learn, grow, and thrive — no matter where they come from.</p>
        </div>
        <img src="/assets/Vector 2.png" alt="Vector" className='w-[53%] mx-auto mb-64 scale-0 lg:scale-100' />

        <div className='absolute top-[11.5rem] left-[4rem] flex flex-col space-x-6'>
            <p className='font-urbanist font-bold text-[#2C2C2C] text-[2.25rem] flex items-center'> <img src="/assets/Orange Dot.svg" alt="Dot" className='inline' />The Need</p>
            <p className='font-inter font-medium text-[#656565] w-[39.198424rem] mb-10'>The purpose of education is to develop all round and well-balanced students. This is achieved by integrated curriculum of aikya vidya, which puts value education and life skills into the curriculum along with school subjects. </p>
            <p className='font-inter font-bold text-[#656565]'>“AIKYA VIDYA” is designed for students of classes 1st to 10th, especially in rural areas. </p>
        </div>
        <div className='absolute top-[28.125rem] right-[4rem] flex flex-col items-end space-x-6'>
            <p className='font-urbanist font-bold text-[#2C2C2C] text-[2.25rem] flex items-end'>The Cause<img src="/assets/Orange Dot.svg" alt="Dot" className='inline' /></p>
            <p className='font-inter font-medium text-[#656565] w-[33rem] text-end pr-6'>AIKYA VIDYA affiliated to Hare Krishna Movement Hyderabad which is a non-profit organization on a mission to empower every single child from rural areas, through free education. </p>
        </div>
        <div className='absolute bottom-[4.65rem] left-[4rem] flex flex-col space-x-6'>
            <p className='font-urbanist font-bold text-[#2C2C2C] text-[2.25rem] flex items-center'> <img src="/assets/Orange Dot.svg" alt="Dot" className='inline' />The Tuition Format</p>
            <p className='font-inter font-medium text-[#656565] w-[46rem]'>AIKYA VIDYA organizes evening tuitions under the care of trained teachers, systematically. Teacher focuses on teaching life skills, values to children, and organizes study programs to complete homework, read subjects and doubts will be clarified through teacher and peer learning.
</p>
        </div>

    </section>
  )
}

export default ExistanceSection