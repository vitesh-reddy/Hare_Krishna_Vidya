import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const OurAssociatedTrustsPage = () => {
  return (
    <motion.div initial={{ x: '100%', opacity: 100 }} animate={{ x: 0, opacity: 1 }} exit={false} transition={{ duration: 0.4 }} className="page">
      <div className="min-h-screen bg-[#f9f9f9]">
        <Header />

        <main>
          <div className='rotate-[-90deg] flex flex-row fixed -right-[10.8rem] bottom-[13rem] z-50 space-x-4 text-white font-medium text-[1.3rem]'>
            <Link to='../governance'><div className='font-outfit bg-[#E76F51] px-5 py-2 rounded-[0.5rem_0.5rem_0rem_0rem] text-center w-fit cursor-pointer'>Governance</div></Link>
            <Link to='../about-us'> <div className='font-outfit bg-[#E76F51] px-5 py-2 rounded-[0.5rem_0.5rem_0rem_0rem] text-center w-fit cursor-pointer'>Our Associated Trusts</div></Link>
          </div>
        </main> 

        <Footer />
      </div>
    </motion.div>
  )
}

export default OurAssociatedTrustsPage