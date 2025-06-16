import React, { useState } from 'react';
import { Eye } from 'lucide-react';

const CampaignDescription = ({ description, setDescription }) => {
  const [showPreview, setShowPreview] = useState(false);

  const tips = [
    "Explain the spiritual significance of your campaign",
    "Share stories of those who will benefit",
    "Describe how funds will be utilized with transparency",
    "Include testimonials from previous beneficiaries if available"
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Campaign Description
        </label>
        <button 
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center space-x-1 text-orange-500 text-sm hover:text-orange-600 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Show Preview</span>
        </button>
      </div>
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your campaign, its purpose, and the impact it will make..."
        className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
      />
      
      {/* Tips Section */}
      <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-800 mb-2">
              Tips for a compelling description:
            </p>
            <ul className="text-sm text-orange-700 space-y-1">
              {tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && description && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
          <div className="text-sm text-gray-600 whitespace-pre-wrap">
            {description}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDescription;