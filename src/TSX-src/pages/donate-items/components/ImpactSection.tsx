
import React from 'react';

const ImpactSection = () => {
  const stats = [
    { number: '5,000+', label: 'Kits Donated' },
    { number: '50+', label: 'Villages Reached' },
    { number: '10+', label: 'Centers Supported' },
    { number: '15,000+', label: 'Lives Impacted' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Your Kindness in <span className="text-orange-600">Action</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-orange-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                <span className="text-3xl font-bold text-orange-600">{stat.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="md:flex items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1594824452518-1d67e5b1fe1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Beneficiary"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-4">
                "The education kit helped my daughter continue her studies during difficult times. 
                Now she dreams of becoming a teacher to help other children like her."
              </blockquote>
              <cite className="text-orange-600 font-semibold">- Priya, Mother of Kit Recipient</cite>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-gray-100 rounded-full h-4 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full w-3/4 transition-all duration-1000"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Monthly Goal Progress</span>
            <span>75% Complete</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
