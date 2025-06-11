
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: '1',
      title: 'Select a Kit',
      description: 'Choose from Education, Grocery, or Center kits based on the impact you want to create.',
      icon: '🎯'
    },
    {
      step: '2',
      title: 'Donate Online',
      description: 'Make a secure donation through our trusted payment gateway with complete transparency.',
      icon: '💳'
    },
    {
      step: '3',
      title: 'See the Impact',
      description: 'Receive updates and photos showing exactly how your donation is making a difference.',
      icon: '📸'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How It <span className="text-orange-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Making a difference is simple and transparent
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4 group-hover:bg-orange-700 transition-colors duration-300">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-orange-200 -z-10"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
