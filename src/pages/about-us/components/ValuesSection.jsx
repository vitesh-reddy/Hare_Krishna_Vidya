// src/pages/about-us/components/ValuesSection.jsx
import React from 'react';
import Card from '../../../components/ui/Card';

const ValueCard = ({ title, description, icon, color }) => {
  return (
    <Card 
      variant="gradient" 
      className="rounded-[30px] p-8 border border-[#cfcfcf] text-center hover:shadow-[20px_20px_40px_rgba(209,213,215,0.9)] transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className={`${color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
        <img src={icon} alt={title} className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold text-[#2c2c2c] mb-4">{title}</h3>
      <p className="text-lg text-[#656565] leading-relaxed">{description}</p>
    </Card>
  );
};

const ValuesSection = () => {
  const values = [
    {
      title: "Compassion",
      description: "We serve with an open heart, treating every individual with dignity, respect, and unconditional love, regardless of their background or circumstances.",
      icon: "/assets/img_heart_traced.svg",
      color: "bg-[rgba(244,162,97,0.5)]"
    },
    {
      title: "Service",
      description: "Selfless service is at the core of our mission. We dedicate ourselves to serving others without expectation, finding fulfillment in giving back to society.",
      icon: "/assets/img_food_traced.svg",
      color: "bg-[rgba(231,111,81,0.5)]"
    },
    {
      title: "Education",
      description: "We believe education is the foundation of transformation. Through learning, we empower individuals to break cycles of poverty and build brighter futures.",
      icon: "/assets/img_books_traced.svg",
      color: "bg-[rgba(11,57,84,0.5)]"
    },
    {
      title: "Integrity",
      description: "Transparency and honesty guide all our actions. We maintain the highest ethical standards in our operations and use resources responsibly.",
      icon: "/assets/img_education_traced.svg",
      color: "bg-[rgba(244,162,97,0.5)]"
    },
    {
      title: "Community",
      description: "We foster strong communities where everyone supports each other. Together, we create lasting positive change that extends beyond individual lives.",
      icon: "/assets/img_heart_traced.svg",
      color: "bg-[rgba(231,111,81,0.5)]"
    },
    {
      title: "Sustainability",
      description: "Our programs are designed for long-term impact. We build sustainable solutions that communities can maintain and grow independently.",
      icon: "/assets/img_logo_design_3_traced.svg",
      color: "bg-[rgba(11,57,84,0.5)]"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#edf2f7] to-[#f9feff]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 shadow-[6px_6px_15px_rgba(185,185,185,0.9)] inline-flex items-center space-x-3 mb-6">
            <img src="/assets/img_shines.png" alt="Shine icon" className="w-5 h-5" />
            <span className="text-base font-semibold text-black">Our Values</span>
          </div>
          
          <h2 className="text-5xl font-bold text-[#2c2c2c] mb-6">
            Principles That <span className="text-[#f4a261]">Guide</span> Our <span className="text-[#e76f51]">Mission</span>
          </h2>
          <p className="text-xl text-[#656565] max-w-3xl mx-auto leading-relaxed">
            Our values are not just words on a page—they are the living principles that shape every decision, action, and interaction in our daily work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
              icon={value.icon}
              color={value.color}
            />
          ))}
        </div>

        {/* Values in Action */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Card className="bg-white rounded-[30px] p-0 shadow-[15px_15px_38px_rgba(209,213,215,0.9)] overflow-hidden">
            <img 
              src="https://assets.pexels.com/photos/8923058/pexels-photo-8923058.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Values in action" 
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6">
              <h4 className="text-2xl font-bold text-[#2c2c2c] mb-3">Living Our Values Daily</h4>
              <p className="text-lg text-[#656565]">Every interaction, every meal served, and every lesson taught reflects our commitment to these core principles.</p>
            </div>
          </Card>

          <div>
            <h3 className="text-4xl font-bold text-[#2c2c2c] mb-6">
              Values in <span className="text-[#e76f51]">Action</span>
            </h3>
            <p className="text-lg text-[#656565] mb-8 leading-relaxed">
              Our values aren't abstract concepts—they're lived experiences that transform communities and create lasting change. Every day, our team embodies these principles in their work.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#f4a261] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <img src="/assets/img_heart_traced.svg" alt="Heart" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#2c2c2c] mb-2">Compassionate Care</h4>
                  <p className="text-base text-[#656565]">Every child is treated with the same love and care we would give our own family members.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-[#e76f51] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <img src="/assets/img_education_traced.svg" alt="Education" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#2c2c2c] mb-2">Educational Excellence</h4>
                  <p className="text-base text-[#656565]">We maintain high standards in education while adapting to each child's unique learning needs.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-[#0b3954] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <img src="/assets/img_logo_design_3_traced.svg" alt="Community" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#2c2c2c] mb-2">Community Building</h4>
                  <p className="text-base text-[#656565]">We work together with local communities to create sustainable, long-lasting solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;