import React from 'react'
import AikyaVidyaSection from './components/AikyaVidyaSection'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import CurriculumSection from './components/CurriculumSection'
import ContentSection from './components/ContentSection'
import MahadanamSection from './components/MahadanamSection'
import DonateSection from './components/DonateSection'

const OurInitiativePage = () => {
  return (
    <section>
      <Header/>
      <AikyaVidyaSection/>
      <CurriculumSection/>
      <MahadanamSection id={1}/>
      <ContentSection/>
      <MahadanamSection id={2}/>
      <DonateSection/>
      <Footer/>
    </section>
  )
}

export default OurInitiativePage