
import React from 'react';
import { Button } from '../../../components/ui/button';

const HeroSection = () => {
  const scrollToKits = () => {
    const kitsSection = document.getElementById('kits-showcase');
    if (kitsSection) {
      kitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

return (
  <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF7ED] to-[#FEF3C7] overflow-hidden dark:from-[#7C2D12] dark:to-[#B45309]">
    <div className="absolute inset-0 bg-[#000000]/20"></div>
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
      }}
    ></div>
    
    <div className="relative z-10 text-center px-[1.5rem] max-w-[64rem] mx-auto">
      <h1 className="text-[3rem] md:text-[4.5rem] font-bold text-[#1F2937] mb-[1.5rem] leading-tight dark:text-[#F5F7FD]">
        Support Lives with
        <span className="text-[#F97316] block dark:text-[#FDBA74]">Essential Kits</span>
      </h1>
      
      <p className="text-[1.25rem] md:text-[1.5rem] text-[#374151] mb-[2rem] max-w-[32rem] mx-auto leading-relaxed dark:text-[#D1D5DB]">
        Empower underprivileged communities through meaningful contributions. 
        Every kit you donate creates lasting change in someone's life.
      </p>
      
      <Button 
        onClick={scrollToKits}
        className="bg-[#F97316] hover:bg-[#EA580C] text-[#FFFFFF] px-[2rem] py-[1rem] text-[1.125rem] font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Donate a Kit
      </Button>
      
      <div className="mt-[3rem] text-[0.875rem] text-[#4B5563] dark:text-[#9CA3AF]">
        <p>Join thousands of donors making a difference</p>
      </div>
    </div>
    
    <div className="absolute bottom-[2rem] left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-[1.5rem] h-[2.5rem] border-2 border-[#9CA3AF] rounded-full flex justify-center dark:border-[#6B7280]">
        <div className="w-[0.25rem] h-[0.75rem] bg-[#9CA3AF] rounded-full mt-[0.5rem] animate-pulse dark:bg-[#6B7280]"></div>
      </div>
    </div>
  </section>
)
};

export default HeroSection;
