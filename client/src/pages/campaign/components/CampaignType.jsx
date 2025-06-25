import { ChevronDown } from "lucide-react";
import moment from "moment";
import { useState } from "react";

const CampaignType = ({ formData, handleNext, handleInputChange, campaignTypes = [] }) => {
  const [errors, setErrors] = useState({});

  // Get today's date in YYYY-MM-DD format
  const today = moment().format('YYYY-MM-DD');

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.campaignType?._id) {
      newErrors.campaignType = "Please select a campaign type";
    }
    
    if (!formData.campaignName?.trim()) {
      newErrors.campaignName = "Campaign name is required";
    }
    
    if (!formData.goalAmount || formData.goalAmount <= 0) {
      newErrors.goalAmount = "Please enter a valid goal amount";
    }
    
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    } else {
      // Check if start date is in the past
      const startDate = moment(formData.startDate).format('YYYY-MM-DD');
      if (startDate < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
    }
    
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    } else {
      // Check if end date is in the past
      const endDate = moment(formData.endDate).format('YYYY-MM-DD');
      if (endDate < today) {
        newErrors.endDate = "End date cannot be in the past";
      }
    }
    
    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = "End date must be after start date";
    }
    
    return newErrors;
  };

  // Handle form submission with validation
  const handleSubmit = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      handleNext();
    }
  };

  // Clear error when user starts typing
  const handleFieldChange = (field, value) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    handleInputChange(field, value);
  };

  // Get character count for campaign name
  const characterCount = formData.campaignName ? formData.campaignName.length : 0;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-2">Campaign Type & Overview</h2>
      <p className="text-gray-600 mb-8">Let's start with the basics of your fundraising campaign.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Campaign Type <span className="text-red-500">*</span>
          </label>
          {errors.campaignType && (
            <p className="text-red-500 text-sm mb-2">{errors.campaignType}</p>
          )}
          <div className="relative">
            <select
              className={`w-full p-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                errors.campaignType ? 'border-red-300' : 'border-gray-300'
              }`}
              value={formData.campaignType?._id ?? ""}
              onChange={(e) => handleFieldChange('campaignType', campaignTypes.filter(ct => ct._id == e.target.value)[0])}
              required
            >
              <option value="">Select campaign type</option>
              {campaignTypes.map(ct => <option key={ct._id} value={ct._id}>{ct.label}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Name <span className="text-red-500">*</span>
          </label>
          {errors.campaignName && (
            <p className="text-red-500 text-sm mb-2">{errors.campaignName}</p>
          )}
          <input
            type="text"
            placeholder="E.g., Help nourish 1,000 children in Bhubaneswar"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.campaignName ? 'border-red-300' : 'border-gray-300'
            }`}
            value={formData.campaignName || ''}
            onChange={(e) => handleFieldChange('campaignName', e.target.value)}
            maxLength={60}
            required
          />
          <p className={`text-xs mt-1 ${characterCount > 60 ? 'text-red-500' : 'text-gray-500'}`}>
            {characterCount}/60 characters
          </p>
          <p className="text-xs text-gray-600 mt-1">A clear, compelling name helps attract more supporters.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal Amount (₹) <span className="text-red-500">*</span>
          </label>
          {errors.goalAmount && (
            <p className="text-red-500 text-sm mb-2">{errors.goalAmount}</p>
          )}
          <input
            type="number"
            placeholder="Enter amount"
            min="1"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.goalAmount ? 'border-red-300' : 'border-gray-300'
            }`}
            value={formData.goalAmount || ''}
            onChange={(e) => handleFieldChange('goalAmount', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Duration <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Start Date</label>
              {errors.startDate && (
                <p className="text-red-500 text-xs mb-1">{errors.startDate}</p>
              )}
              <div className="relative">
                <input
                  type="date"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.startDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={formData.startDate ? moment(new Date(formData.startDate)).format('YYYY-MM-DD') : ''}
                  onChange={(e) => handleFieldChange('startDate', new Date(e.target.value).getTime())}
                  min={today}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">End Date</label>
              {errors.endDate && (
                <p className="text-red-500 text-xs mb-1">{errors.endDate}</p>
              )}
              <div className="relative">
                <input
                  type="date"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.endDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={formData.endDate ? moment(new Date(formData.endDate)).format('YYYY-MM-DD') : ''}
                  onChange={(e) => handleFieldChange('endDate', new Date(e.target.value).getTime())}
                  min={formData.startDate ? moment(new Date(formData.startDate)).format('YYYY-MM-DD') : today}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Continue to Campaign Details
        </button>
      </div>
    </div>
  );
};

export default CampaignType;