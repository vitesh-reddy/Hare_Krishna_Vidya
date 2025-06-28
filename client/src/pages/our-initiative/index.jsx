import React from 'react'
import AikyaVidyaSection from './components/AikyaVidyaSection'
import CurriculumSection from './components/CurriculumSection'
import ContentSection from './components/ContentSection'
import MahadanamSection from './components/MahadanamSection'
import DonateSection from './components/DonateSection'

const OurInitiativePage = () => {
  return (
    <section className='2xl:px-[10vw]'>
      <AikyaVidyaSection/>
      <CurriculumSection/>
      <MahadanamSection id={1}/>
      <ContentSection/>
      <MahadanamSection id={2}/>
      <DonateSection/>
    </section>
  )
}

export default OurInitiativePage