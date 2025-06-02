// src/pages/donate/components/DonationImpact.jsx
import React from 'react';
import Card from '../../../components/ui/Card';

const DonationImpact = ({ cause, amount }) => {
  const getImpactMessage = () => {
    if (!cause || !amount) return 'Select an amount to see impact';
    
    const impacts = cause.impact;
    const exactMatch = impacts[amount];
    
    if (exactMatch) {
      return exactMatch;
    }
    
    // Find the closest lower amount for impact calculation
    const amounts = Object.keys(impacts).map(Number).sort((a, b) => b - a);
    const closestAmount = amounts.find(a => a <= amount) || amounts[amounts.length - 1];
    const multiplier = Math.floor(amount / closestAmount);
    
    if (multiplier > 1) {
      return `${multiplier}x ${impacts[closestAmount]}`;
    }
    
    return impacts[closestAmount];
  };

  const getAdditionalBenefits = () => {
    if (!amount) return [];
    
    const benefits = [];
    
    if (amount >= 1000) {
      benefits.push('Detailed impact report');
    }
    if (amount >= 5000) {
      benefits.push('Photos from the field');
    }
    if (amount >= 10000) {
      benefits.push('Personal thank you call');
    }
    
    return benefits;
  };

  return (
    <Card variant="primary" className="p-8">
      <h3 className="text-xl font-semibold text-white mb-6">Your Impact</h3>
      
      {/* Selected Cause Image */}
      {cause && (
        <div className="mb-6">
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <img 
              src={cause.image} 
              alt={cause.title}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="text-lg font-semibold text-white text-center">{cause.title}</h4>
          </div>
        </div>
      )}
      
      {/* Impact Message */}
      <div className="bg-white bg-opacity-10 rounded-xl p-6 mb-6">
        <div className="text-center">
          <div className="text-4xl mb-3">💝</div>
          <p className="text-white text-lg font-medium">
            {getImpactMessage()}
          </p>
        </div>
      </div>
      
      {/* Additional Benefits */}
      {getAdditionalBenefits().length > 0 && (
        <div className="bg-white bg-opacity-10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-3">You'll also receive:</h4>
          <ul className="space-y-2">
            {getAdditionalBenefits().map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2 text-white text-sm">
                <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full"></div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Amount Display */}
      <div className="text-center mt-6">
        <div className="text-3xl font-bold text-white mb-2">
          ₹{amount?.toLocaleString() || '0'}
        </div>
        <p className="text-white text-opacity-80">Your contribution</p>
      </div>
    </Card>
  );
};

export default DonationImpact;