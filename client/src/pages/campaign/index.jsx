import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar';
import CampaignDescription from './components/CampaignDescription';
import ImageUpload from './components/ImageUpload';
import ImpactMetrics from './components/ImpactMetrics';
import NavigationButtons from './components/NavigationButtons';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateCampaignPage = () => {
  const [description, setDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  // Custom impact metrics (optional)
  const customMetrics = [
    { value: 40, label: "Meals Served", color: "red" },
    { value: 100, label: "School Days", color: "yellow" },
    { value: 15, label: "Villages Reached", color: "green" },
    { value: 1, label: "Life Transformed", color: "blue" }
  ];

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Navigate to previous page or step
      console.log('Going back to step:', currentStep - 1);
    }else{
        navigate(-1);
    }
  };

  const handleNext = async () => {
    if (!description.trim()) {
      alert('Please add a campaign description before continuing.');
      return;
    }

    setLoading(true);
    
    // Simulate API call or processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        console.log('Moving to step:', currentStep + 1);
      } else {
        // Submit the campaign
        console.log('Submitting campaign with description:', description);
        // Handle campaign submission here
      }
    } catch (error) {
      console.error('Error processing campaign:', error);
      alert('There was an error processing your campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isNextDisabled = !description.trim();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Page Header */}
        <div className="max-w-4xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Campaign Details</h2>
          <p className="text-gray-600">Add compelling details to inspire potential supporters.</p>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl">
          {/* Campaign Description */}
          <CampaignDescription 
            description={description}
            setDescription={setDescription}
          />

          {/* Image Upload */}
          <ImageUpload />

          {/* Impact Metrics */}
          <ImpactMetrics metrics={customMetrics} />

          {/* Navigation */}
          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            nextDisabled={isNextDisabled}
            loading={loading}
            backLabel="Back"
            nextLabel={currentStep === 3 ? "Submit Campaign" : "Continue to Review"}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignPage;