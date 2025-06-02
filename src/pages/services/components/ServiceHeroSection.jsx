// src/pages/services/components/ServiceHeroSection.jsx
import React from 'react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const ServiceHeroSection = () => {
  return (
    <section className="py-16 px-4 lg:py-24 bg-gradient-charity">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-light rounded-[24px] p-4 shadow-custom-light inline-flex items-center space-x-3 mb-6">
              <img src="/images/img_shines.png" alt="Services" className="w-5 h-5" />
              <span className="text-base font-semibold text-neutral-dark">Our Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight">
              Empowering Lives Through
              <span className="text-accent-yellow"> Compassionate Action</span>
            </h1>
            
            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              Discover the various ways you can contribute to meaningful change. From feeding the hungry to educating children, every service creates lasting impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="large"
                className="px-8 py-4 text-lg rounded-[25px] shadow-custom-blue"
              >
                Explore Services
              </Button>
              <Button 
                variant="outline" 
                size="large"
                className="px-8 py-4 text-lg rounded-[25px]"
              >
                View Impact
              </Button>
            </div>
          </div>

          {/* Right Content - Service Preview Cards */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card variant="gradient" className="p-6 hover:shadow-custom-medium transition-all duration-300">
                <div className="bg-accent-yellow bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <img src="/images/img_food_traced.svg" alt="Food" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Annadaan</h3>
                <p className="text-text-muted">Feeding the hungry with sanctified meals</p>
              </Card>
              
              <Card variant="gradient" className="p-6 hover:shadow-custom-medium transition-all duration-300 mt-8">
                <div className="bg-accent-yellow bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <img src="/images/img_heart_traced.svg" alt="Child" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Child Sponsorship</h3>
                <p className="text-text-muted">Supporting children's education and welfare</p>
              </Card>
              
              <Card variant="gradient" className="p-6 hover:shadow-custom-medium transition-all duration-300 sm:col-span-2">
                <div className="bg-accent-yellow bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <img src="/images/img_settings.svg" alt="Education" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Vidya Daan</h3>
                <p className="text-text-muted">Sharing knowledge and spiritual teachings</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;