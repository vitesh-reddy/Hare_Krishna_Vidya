// src/pages/about-us/components/OurImpactSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import Card from '../../../components/ui/Card';

const CounterCard = ({ title, targetNumber, suffix = '', description, icon }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = targetNumber / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetNumber]);

  return (
    <Card 
      ref={counterRef}
      variant="gradient" 
      className="rounded-[30px] p-8 border border-[#cfcfcf] text-center hover:shadow-[20px_20px_40px_rgba(209,213,215,0.9)] transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="bg-[rgba(244,162,97,0.5)] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <img src={icon} alt={title} className="w-10 h-10" />
      </div>
      <div className="text-5xl font-bold text-[#f4a261] mb-4">
        {count.toLocaleString()}{suffix}
      </div>
      <h3 className="text-2xl font-bold text-[#2c2c2c] mb-4">{title}</h3>
      <p className="text-lg text-[#656565] leading-relaxed">{description}</p>
    </Card>
  );
};

const OurImpactSection = () => {
  const impactStats = [
    {
      title: "Children Fed Daily",
      targetNumber: 10000,
      suffix: "+",
      description: "Nutritious meals served every day to children in need across our network",
      icon: "/images/img_food_traced.svg"
    },
    {
      title: "Students Educated",
      targetNumber: 5000,
      suffix: "+",
      description: "Children receiving quality education and spiritual guidance in our schools",
      icon: "/images/img_books_traced.svg"
    },
    {
      title: "Lives Transformed",
      targetNumber: 25000,
      suffix: "+",
      description: "Families and communities positively impacted through our comprehensive programs",
      icon: "/images/img_heart_traced.svg"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#edf2f7] to-[#f9feff]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 shadow-[6px_6px_15px_rgba(185,185,185,0.9)] inline-flex items-center space-x-3 mb-6">
            <img src="/images/img_shines.png" alt="Shine icon" className="w-5 h-5" />
            <span className="text-base font-semibold text-black">Our Impact</span>
          </div>
          
          <h2 className="text-5xl font-bold text-[#2c2c2c] mb-6">
            Making a <span className="text-[#f4a261]">Difference</span> Every Day
          </h2>
          <p className="text-xl text-[#656565] max-w-3xl mx-auto leading-relaxed">
            Numbers tell a story, but behind each statistic is a life transformed, a future brightened, and hope restored
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <CounterCard
              key={index}
              title={stat.title}
              targetNumber={stat.targetNumber}
              suffix={stat.suffix}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Impact Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-bold text-[#2c2c2c] mb-6">
              Real Stories, <span className="text-[#e76f51]">Real Change</span>
            </h3>
            <p className="text-lg text-[#656565] mb-6 leading-relaxed">
              Every meal served, every lesson taught, and every child sponsored creates a ripple effect that extends far beyond what numbers can capture. Our impact is measured not just in quantity, but in the quality of lives we touch.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="bg-[#f4a261] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-lg text-[#656565]">95% of our students show improved academic performance</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-[#f4a261] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-lg text-[#656565]">80% reduction in malnutrition among program participants</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-[#f4a261] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-lg text-[#656565]">Over 1000 families lifted out of poverty through our programs</span>
              </li>
            </ul>
          </div>
          
          <Card className="bg-white rounded-[30px] p-0 shadow-[15px_15px_38px_rgba(209,213,215,0.9)] overflow-hidden">
            <img 
              src="https://images.pixabay.com/photo/2017/07/31/11/32/people-2557396_1280.jpg" 
              alt="Children celebrating their achievements" 
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6">
              <h4 className="text-2xl font-bold text-[#2c2c2c] mb-3">Celebrating Success Together</h4>
              <p className="text-lg text-[#656565]">Our children's achievements are a testament to the power of community support and dedicated care.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OurImpactSection;