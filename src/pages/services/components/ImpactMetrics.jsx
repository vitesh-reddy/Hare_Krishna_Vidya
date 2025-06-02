// src/pages/services/components/ImpactMetrics.jsx
import React from 'react';
import Card from '../../../components/ui/Card';

const ImpactMetrics = () => {
  const metrics = [
    {
      number: '50,000+',
      label: 'Lives Touched',
      description: 'Through our various programs',
      icon: '❤️'
    },
    {
      number: '10,000+',
      label: 'Daily Meals',
      description: 'Served to those in need',
      icon: '🍽️'
    },
    {
      number: '2,000+',
      label: 'Students Educated',
      description: 'Receiving quality education',
      icon: '📚'
    },
    {
      number: '500+',
      label: 'Children Sponsored',
      description: 'Getting complete care',
      icon: '👶'
    }
  ];

  return (
    <section className="py-16 px-4 bg-primary-blue lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our <span className="text-accent-yellow">Impact</span> in Numbers
          </h2>
          <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto">
            Real change, measured in lives transformed and communities uplifted
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              variant="default" 
              className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{metric.icon}</div>
              <div className="text-4xl lg:text-5xl font-bold text-accent-yellow mb-2">
                {metric.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{metric.label}</h3>
              <p className="text-white text-opacity-80">{metric.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;