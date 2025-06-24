import { ArrowLeft, Eye, Upload, X } from "lucide-react";
import { useState, useRef } from "react";

const CampaignDetails = ({ handleBack, handleNext, formData, handleInputChange, handleImageUpload,imageFile}) => {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.description?.trim()) {
      newErrors.description = "Campaign description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Description should be at least 50 characters long";
    }
    
    if (!formData.uploadedImage) {
      newErrors.uploadedImage = "Campaign image is required";
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleNext();
    }
  };

  const handleFieldChange = (field, value) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    handleInputChange(field, value);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|jpg|png|gif)$/)) {
      alert(`${file.name} is not a valid format. Please upload JPG, PNG, or GIF.`);
      return;
    }  

    await handleImageUpload(file); // Use parent function
  };

  const removeImage = () => {
    handleInputChange("uploadedImage", null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect({ target: { files: [file] } });
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-2">Campaign Details</h2>
      <p className="text-gray-600 mb-8">Add compelling details to inspire potential supporters.</p>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Campaign Description <span className="text-red-500">*</span>
            </label>
            <button className="flex items-center text-orange-500 text-sm hover:text-orange-600">
              <Eye className="w-4 h-4 mr-1" />
              Show Preview
            </button>
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm mb-2">{errors.description}</p>
          )}
          <textarea
            rows={6}
            placeholder="Describe your campaign, its purpose, and the impact it will make..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            value={formData.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
          <p className={`text-xs mt-1 ${formData.description?.length < 50 ? 'text-orange-500' : 'text-gray-500'}`}>
            {formData.description?.length || 0} characters (minimum 50 required)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Image <span className="text-red-500">*</span>
          </label>
          {errors.uploadedImage && (
            <p className="text-red-500 text-sm mb-2">{errors.uploadedImage}</p>
          )}

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              errors.uploadedImage ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-orange-400'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-1">Click to upload an image or drag and drop</p>
            <p className="text-xs text-gray-500">JPG, PNG or GIF (max 5MB)</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />

          {formData.uploadedImage && (
            <div className="mt-4 relative group w-48">
              <img
                src={formData.uploadedImage}
                alt="Uploaded"
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
                <p className="truncate">{imageFile.name}</p>
                <p>{(imageFile.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
