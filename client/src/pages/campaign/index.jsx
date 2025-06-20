import React, { useEffect, useState } from 'react';
import { ChevronDown, Calendar, Upload, ArrowLeft, Heart, Share2, BarChart3, Eye } from 'lucide-react';
import CampaignSidebar from './components/CampaignSidebar';
import CampaignSteps from './components/CampaignSteps';
import CampaignType from './components/CampaignType';
import CampaignDetails from './components/CampaignDetails';
import FinalStep from './components/FinalStep';
import { useCampaigns } from '../../contexts/CampaignContext';
import Loader from '../../components/common/Loader';

const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    campaignType: '',
    campaignName: '',
    goalAmount: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    uploadedImage: null
  });

  const { loading, fetchCampaignTypes, campaignTypes, createCampaign } = useCampaigns();

  useEffect(() => {
    fetchCampaignTypes();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onCampaignSubmit = async () => {
    await createCampaign(
      {
        campaignType: formData.campaignType._id,
        campaignName: formData.campaignName,
        goalAmount: formData.goalAmount,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description
      }
    );
  }

  if (loading) {
    return (
      <Loader />
    );
  }
  console.log(formData)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/3">
        <CampaignSidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <CampaignSteps currentStep={currentStep} /></div>
        {currentStep === 1 && <CampaignType formData={formData} handleNext={handleNext} handleInputChange={handleInputChange} campaignTypes={campaignTypes} />}
        {currentStep === 2 && <CampaignDetails formData={formData} handleBack={handleBack} handleNext={handleNext} handleInputChange={handleInputChange} />}
        {currentStep === 3 && <FinalStep formData={formData} handleBack={handleBack} onCampaignSubmit={onCampaignSubmit} />}
      </div>
    </div>
  );
};

export default CreateCampaign;