import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from './components/HeroSection';
import GallerySection from '@/components/common/GallerySection';
import StatsCard from './components/StatsCard';
import ActionCard from './components/ActionCard';
import MissionSection from './components/MissionSection';
import DonationJourneySection from './components/DonationJourneySection';
import TestimonialSection from './components/TestimonialSection';

const HomePage = () => {
  const [selectedAmount, setSelectedAmount] = useState('5000');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const handleDonationClick = () => {
    setShowPaymentSuccess(true);
    setTimeout(() => setShowPaymentSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <main className='flex flex-col items-center'>
        <HeroSection />
        <ActionCard position={"outside"} />
        <StatsCard position={"outside"} />
        <MissionSection />
        <DonationJourneySection/>
        <TestimonialSection />
        <GallerySection/>
      </main>
    </div>
  );
};

export default HomePage;