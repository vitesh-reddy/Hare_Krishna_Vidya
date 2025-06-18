import { ChevronDown } from "lucide-react";

const CampaignType = ({formData,handleNext,handleInputChange}) => (
    <div className="max-w-2xl">
      
      
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
  export default CampaignType;
