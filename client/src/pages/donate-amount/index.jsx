import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import GallerySection from '@/components/common/GallerySection';
import StatsCard from './components/StatsCard';
import AnnadanSection from './components/AnnadanSection';
import SponsorChildSection from './components/SponsorChildSection';
import VidhyadanaSection from './components/VidhyadanaSection';
import BankDetailsSection from './components/BankDetailsSection';
import { motion } from 'framer-motion';

const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState('5000');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [ha, setHa] = useState(false);
  const handleDonationClick = () => {
    setShowPaymentSuccess(true);
    setTimeout(() => setShowPaymentSuccess(false), 3000);
  };

  return (
    <motion.div initial={{ x: '100%', opacity: 100 }} animate={{ x: 0, opacity: 1 }} exit={false} transition={{ duration: 0.4 }} className="page">
    <div className="min-h-screen bg-[#F9F9F9]">

      <main className='flex flex-col gap-[4rem] items-center'>
        <HeroSection />
        <StatsCard position={"outside"} />
        <AnnadanSection/>
        <SponsorChildSection/>
        <VidhyadanaSection />
        <BankDetailsSection/>
        <GallerySection/>
      </main>

      {/* Payment Success Modal */}
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center font-inter">
              <div className="text-6xl my-[1rem]">🎉</div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Thank You!</h3>
              <p className="text-lg text-text-muted mb-6">
                Your donation will help feed 100 children today.
              </p>
              <button onClick={() => setShowPaymentSuccess(false)} className="font-semibold rounded-[0.5rem] transition-colors duration-200 cursor-pointer inline-flex items-center justify-center bg-[#e76f51] text-white text-[0.7rem] sm:text-[1rem] px-[2rem] py-[0.5rem] hover:bg-[#d65a3f] focus:ring-[#e76f51]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </motion.div>
  );
};

export default DonatePage;