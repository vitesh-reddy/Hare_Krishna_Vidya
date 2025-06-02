// src/pages/about-us/components/AboutUsHeroSection.jsx
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const AboutUsHeroSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#edf2f7] to-[#f9feff]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 shadow-[6px_6px_15px_rgba(185,185,185,0.9)] inline-flex items-center space-x-3 mb-6">
              <img src="/images/img_shines.png" alt="Shine icon" className="w-5 h-5" />
              <span className="text-base font-semibold text-black">About Us</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-[#2c2c2c] mb-6 leading-tight">
              Nurturing Lives Through 
              <span className="text-[#f4a261]"> Compassion</span> and 
              <span className="text-[#e76f51]">Education</span>
            </h1>
            
            <p className="text-xl text-[#656565] mb-8 leading-relaxed max-w-2xl">
              For over a decade, Hare Krishna Vidya has been transforming lives through the sacred mission of providing nourishment, education, and spiritual guidance to those who need it most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-[#f4a261] text-white px-8 py-4 rounded-[20px] font-semibold text-lg shadow-soft hover:bg-[#e89a5c] transition-colors">
                Join Our Mission
              </Button>
              <Button className="bg-transparent border-2 border-[#0b3954] text-[#0b3954] px-8 py-4 rounded-[20px] font-semibold text-lg hover:bg-[#0b3954] hover:text-white transition-colors">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <Card className="bg-white rounded-[30px] p-0 shadow-[15px_15px_38px_rgba(209,213,215,0.9)] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Children learning and growing" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Empowering Future Leaders</h3>
                <p className="text-lg bg-opacity-70">Through education and spiritual values</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHeroSection;