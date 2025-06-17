import React, { useState } from 'react';
import { ChevronDown, Calendar, Upload, ArrowLeft, Heart, Share2, BarChart3, Eye } from 'lucide-react';

const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    campaignType: '',
    campaignName: '',
    goalAmount: '',
    startDate: '',
    endDate: '',
    description: '',
    uploadedImage: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const StepIndicator = ({ step, title, isActive, isCompleted }) => (
    <div className="flex items-center mb-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
        isActive ? 'bg-orange-500 text-white' : 
        isCompleted ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'
      }`}>
        {step}
      </div>
      <span className={`text-sm ${
        isActive ? 'text-orange-500 font-medium' : 
        isCompleted ? 'text-orange-500' : 'text-gray-500'
      }`}>
        {title}
      </span>
    </div>
  );

  const Sidebar = () => (
    <div className="bg-gradient-to-b from-orange-400 to-orange-500 p-8 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Create Your Fundraising Campaign</h1>
      <p className="text-orange-100 mb-8">Inspire devotees and well-wishers to support your spiritual cause.</p>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Start a Campaign</h3>
            <p className="text-sm text-orange-100">Register and begin in 2 minutes.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Spread Awareness</h3>
            <p className="text-sm text-orange-100">Share your story via WhatsApp, Instagram, and kirtan communities.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Raise Bhakti-Based Funds</h3>
            <p className="text-sm text-orange-100">Donors contribute in the spirit of service – not obligation.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">See the Impact</h3>
            <p className="text-sm text-orange-100">Updates are shared regularly with supporters in their dashboard.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white bg-opacity-10 rounded-lg p-4">
        <p className="text-sm text-orange-100">"Support a Cause. Start a Change. 🌱 Every seva begins with one step."</p>
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <StepIndicator step={1} title="Campaign Type" isActive={true} />
        <StepIndicator step={2} title="Campaign Details" isActive={false} />
        <StepIndicator step={3} title="Review & Submit" isActive={false} />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Campaign Type & Overview</h2>
      <p className="text-gray-600 mb-8">Let's start with the basics of your fundraising campaign.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose Campaign Type</label>
          <div className="relative">
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={formData.campaignType}
              onChange={(e) => handleInputChange('campaignType', e.target.value)}
            >
              <option value="">Select campaign type</option>
              <option value="meals">Mid Day Meal</option>
              <option value="education">Education Support</option>
              <option value="medical">Medical Aid</option>
              <option value="temple">Temple Construction</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
          <input
            type="text"
            placeholder="E.g., Help nourish 1,000 children in Bhubaneswar"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={formData.campaignName}
            onChange={(e) => handleInputChange('campaignName', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">0/60 characters</p>
          <p className="text-xs text-gray-600 mt-1">A clear, compelling name helps attract more supporters.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Goal Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={formData.goalAmount}
            onChange={(e) => handleInputChange('goalAmount', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Duration</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">End Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleNext}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Continue to Campaign Details
        </button>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <StepIndicator step={1} title="Campaign Type" isCompleted={true} />
        <StepIndicator step={2} title="Campaign Details" isActive={true} />
        <StepIndicator step={3} title="Review & Submit" isActive={false} />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Campaign Details</h2>
      <p className="text-gray-600 mb-8">Add compelling details to inspire potential supporters.</p>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Campaign Description</label>
            <button className="flex items-center text-orange-500 text-sm hover:text-orange-600">
              <Eye className="w-4 h-4 mr-1" />
              Show Preview
            </button>
          </div>
          <textarea
            rows={6}
            placeholder="Describe your campaign, its purpose, and the impact it will make..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-orange-800 mb-2">Tips for a compelling description:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Explain the spiritual significance of your campaign</li>
                  <li>• Share stories of those who will benefit</li>
                  <li>• Describe how funds will be utilized with transparency</li>
                  <li>• Include testimonials from previous beneficiaries if available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-1">Click to upload image</p>
            <p className="text-xs text-gray-500">JPG, PNG or GIF (max 5MB)</p>
          </div>
          <p className="text-xs text-gray-600 mt-2">Add images that showcase your campaign's purpose and impact.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">Estimated Campaign Impact</label>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">40</div>
              <div className="text-xs text-pink-700">Meals Served</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">100</div>
              <div className="text-xs text-blue-700">School Days</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-xs text-green-700">Villages Reached</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">1</div>
              <div className="text-xs text-purple-700">Life Transformed</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <StepIndicator step={1} title="Campaign Type" isCompleted={true} />
        <StepIndicator step={2} title="Campaign Details" isCompleted={true} />
        <StepIndicator step={3} title="Review & Submit" isActive={true} />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Review Your Campaign</h2>
      <p className="text-gray-600 mb-8">Please review your campaign details before submitting for approval.</p>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
          <img 
            src="https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Campaign"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Mid Day Meal
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Help nourish 1,000 children in Bhubaneswar</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-sm text-gray-600">Goal Amount</div>
              <div className="font-semibold">₹250,000</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="font-semibold">June 15, 2023 - August 15, 2023</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Description</div>
            <p className="text-gray-800">
              This campaign aims to provide nutritious meals to underprivileged children in Bhubaneswar. The funds will be used to 
              purchase ingredients, cooking equipment, and to pay for transportation of meals to schools.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <div className="text-sm text-blue-800">
            <strong>Approval Process:</strong> All campaigns are reviewed by our admin Seva team for alignment with our spiritual values and guidelines. 
            You'll be notified once your campaign is approved.
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <label className="flex items-start">
          <input type="checkbox" className="mt-1 mr-3 text-orange-500 focus:ring-orange-500" />
          <span className="text-sm text-gray-700">
            By submitting this campaign, you confirm that all information provided is accurate and that the funds will be used for the stated 
            purpose in service of the spiritual mission.
          </span>
        </label>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Edit Details
        </button>
        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
          <Heart className="w-4 h-4 mr-2" />
          Jai! Submit Campaign for Review
        </button>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-600">"Support a Cause. Start a Change. 🌱 Every seva begins with one step."</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/3">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
      </div>
    </div>
  );
};

export default CreateCampaign;