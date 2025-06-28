import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import CampaignSidebar from './components/CampaignSidebar';
import CampaignSteps from './components/CampaignSteps';
import CampaignType from './components/CampaignType';
import CampaignDetails from './components/CampaignDetails';
import FinalStep from './components/FinalStep';
import { useCampaigns } from '../../contexts/CampaignContext';
import Loader from '../../components/common/Loader';
import axios from 'axios';

import { toast } from 'react-hot-toast';

import imageCompression from 'browser-image-compression';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    campaignType: '',
    campaignName: '',
    goalAmount: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    uploadedImage: null // this should be a File
  });

  const { loading, fetchCampaignTypes, campaignTypes } = useCampaigns();

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
  const handleImageUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }
    toast.loading('Uploading image...');
    try {
      console.log(`📷 Original file size: ${(file.size / 1024).toFixed(2)} KB`);

      let finalFile = file;

      // Compress only if file is larger than 200KB
      if (file.size > 200 * 1024) { 
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          initialQuality: 0.8,
        };
        finalFile = await imageCompression(file, options);
        console.log(`🗜️ Compressed file size: ${(finalFile.size / 1024).toFixed(2)} KB`);
      } else {
        console.log('⚠️ Skipped compression due to small file size.');
      }

      const imageUrl = URL.createObjectURL(finalFile);
      toast.dismiss();
      toast.success('Image uploaded successfully.');
      setFormData(prev => ({ ...prev, uploadedImage: imageUrl }));
      setImageFile(finalFile);
    } catch (error) {
      toast.dismiss();
      toast.error('Image upload failed. Please try again.');
      console.error('❌ Image compression failed:', error);
      toast.error('Failed to process image.');
    }
  };

  // ✅ Updated to use FormData for image upload
  const onCampaignSubmit = async () => {
    const form = new FormData();
    form.append("campaignType", formData.campaignType._id);
    form.append("campaignName", formData.campaignName);
    form.append("goalAmount", formData.goalAmount);
    form.append("startDate", new Date(formData.startDate).getTime());
    form.append("endDate", new Date(formData.endDate).getTime());
    form.append("description", formData.description);


    try {
      setIsSaving(true);
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${BASE_URL}/campaigns/upload-image`, formData);
        imageUrl = uploadResponse.data.url;
      }

      form.append("uploadedImage", imageUrl);
      await axios.post(`${BASE_URL}/campaigns/create`, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success('Campaign created successfully.');
    } catch (error) {
      toast.error('Campaign creation failed.');
      console.error("Error uploading campaign:", error);
      throw error;
    }finally{
      setIsSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden sm:block w-1/3">
        <CampaignSidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <CampaignSteps currentStep={currentStep} />
        </div>
        {currentStep === 1 && (
          <CampaignType
            formData={formData}
            handleNext={handleNext}
            handleInputChange={handleInputChange}
            campaignTypes={campaignTypes}
          />
        )}
        {currentStep === 2 && (
          <CampaignDetails
            formData={formData}
            handleBack={handleBack}
            handleNext={handleNext}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            imageFile={imageFile}
          />
        )}
        {currentStep === 3 && (
          <FinalStep
            formData={formData}
            handleBack={handleBack}
            onCampaignSubmit={onCampaignSubmit}
            isSaving={isSaving}

          />
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;
