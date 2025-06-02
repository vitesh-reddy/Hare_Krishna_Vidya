// src/pages/services/components/ServiceCard.jsx
import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const ServiceCard = ({ service }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      variant="default" 
      className="p-8 hover:shadow-custom-medium transition-all duration-300 border-2 hover:border-accent-yellow"
    >
      {/* Service Icon and Category */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-accent-yellow bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center">
          <img src={service.icon} alt={service.title} className="w-8 h-8" />
        </div>
        <span className="text-sm font-medium text-accent-yellow bg-accent-yellow bg-opacity-10 px-3 py-1 rounded-full">
          {service.category}
        </span>
      </div>

      {/* Service Title and Description */}
      <h3 className="text-2xl font-semibold text-neutral-dark mb-4">{service.title}</h3>
      <p className="text-text-muted mb-6 leading-relaxed">{service.description}</p>

      {/* Impact Metric */}
      <div className="bg-gradient-light rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-accent-yellow rounded-full"></div>
          <span className="text-lg font-semibold text-neutral-dark">{service.impact}</span>
        </div>
      </div>

      {/* Features (Expandable) */}
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="border-t border-border-light pt-6 mb-6">
          <h4 className="text-lg font-semibold text-neutral-dark mb-4">What We Provide:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
                <span className="text-text-muted">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="primary" 
          size="medium"
          className="flex-1 rounded-[20px]"
        >
          Donate Now
        </Button>
        <Button 
          variant="outline" 
          size="medium"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-[20px]"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;