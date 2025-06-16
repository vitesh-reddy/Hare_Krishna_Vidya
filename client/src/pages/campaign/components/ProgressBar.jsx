import React from 'react';

const ProgressBar = ({ currentStep = 2 }) => {
  const steps = [
    { number: 1, title: "Campaign Type" },
    { number: 2, title: "Campaign Details" },
    { number: 3, title: "Review & Submit" }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4 mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step.number <= currentStep
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step.number}
              </div>
              <span className={`${
                step.number === currentStep
                  ? 'text-orange-500 font-medium'
                  : step.number < currentStep
                  ? 'text-gray-600'
                  : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${
                step.number < currentStep ? 'bg-orange-300' : 'bg-gray-200'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;