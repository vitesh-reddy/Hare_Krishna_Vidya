import React from 'react';
import { Heart, Upload } from 'lucide-react';

const Sidebar = () => {
  const steps = [
    {
      number: 1,
      icon: Heart,
      title: "Start a Campaign",
      description: "Register and begin in 2 minutes.",
      isActive: true
    },
    {
      number: 2,
      icon: Upload,
      title: "Spread Awareness",
      description: "Share your story via WhatsApp, Instagram, and kirtan communities.",
      isActive: false
    },
    {
      number: 3,
      icon: Heart,
      title: "Raise Bhakti-Based Funds",
      description: "Donors contribute in the spirit of service – not obligation.",
      isActive: false
    },
    {
      number: 4,
      icon: () => (
        <div className="w-5 h-5 flex items-center justify-center">
          <div className="w-4 h-3 border-2 border-white"></div>
        </div>
      ),
      title: "See the Impact",
      description: "Updates are shared regularly with supporters in their dashboard.",
      isActive: false
    }
  ];

  return (
    <div className="w-[30%] bg-gradient-to-b from-orange-400 to-orange-500 text-white p-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Create Your Fundraising Campaign</h1>
        <p className="text-orange-100">
          Inspire devotees and well-wishers to support your spiritual cause.
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div key={step.number} className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step.isActive 
                  ? 'bg-white text-orange-500' 
                  : 'bg-orange-300 text-orange-600'
              }`}>
                {step.number}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <IconComponent className="w-5 h-5" />
                  <h3 className="font-semibold">{step.title}</h3>
                </div>
                <p className="text-orange-100 text-sm">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-orange-300 bg-opacity-30 p-4 rounded-lg">
        <p className="text-sm text-orange-100">
          "Support a Cause. Start a Change. ✨" Every seva begins with one step."
        </p>
      </div>
    </div>
  );
};

export default Sidebar;