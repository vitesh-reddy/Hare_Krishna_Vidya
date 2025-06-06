import React from 'react'
import AikyaVidyaSection from './components/AikyaVidyaSection'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import CurriculumSection from './components/CurriculumSection'
import ContentSection from './components/ContentSection'

const OurInitiativePage = () => {
  return (
    <section>
      <Header/>
      <AikyaVidyaSection/>
      <CurriculumSection/>
      <ContentSection/>
      <Footer/>
    </section>
  )
}

export default OurInitiativePage