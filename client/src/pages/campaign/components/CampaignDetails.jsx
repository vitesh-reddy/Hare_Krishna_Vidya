import { ArrowLeft, Eye, Upload } from "lucide-react";

 const CampaignDetails = ({handleBack,handleNext,formData,handleInputChange}) => (
    <div className="max-w-2xl">
      
      
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
  export default CampaignDetails;