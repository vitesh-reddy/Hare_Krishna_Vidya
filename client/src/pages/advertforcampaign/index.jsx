import React, { useEffect, useState } from 'react';
import { Heart, Users, GraduationCap, Home, HelpingHand, User } from 'lucide-react';
import { useCampaigns } from '../../contexts/CampaignContext';
import Loader from '../../components/common/Loader';
import moment from 'moment';
import { DonationModal } from './components/DonationModal';

const FundraisingCampaigns = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { loading, campaigns, fetchPublishedCampaigns } = useCampaigns();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    fetchPublishedCampaigns();
  }, []);

  const categories = [
    { name: 'All', icon: null },
    { name: 'Meal', icon: <Users className="w-4 h-4" /> },
    { name: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Temple', icon: <Home className="w-4 h-4" /> },
    { name: 'Support', icon: <HelpingHand className="w-4 h-4" /> },
    { name: 'Care', icon: <Heart className="w-4 h-4" /> }
    // Add more as needed
  ];

  // Map display categories to actual campaign types
  const categoryMapping = {
    'Meal': 'Mid Day Meal',
    'Care': 'Disaster Relief', 
    'Support': 'Community Development',
    'Education' : 'Education Support',
    'Temple' : 'Temple Construction',
    'Care' : 'Medical Aid'

    // Add more mappings as needed
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 60) return 'bg-green-500';
    if (percentage >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mid Day Meal': 'bg-blue-50 text-blue-700',
      'Disaster Relief': 'bg-red-50 text-red-700',
      'Community Development': 'bg-purple-50 text-purple-700',
      'Temple': 'bg-yellow-50 text-yellow-700',
      'Support': 'bg-green-50 text-green-700',
      'Care': 'bg-pink-50 text-pink-700'
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };

  
  
  // Filter campaigns based on active category
  const filteredCampaigns = activeCategory === 'All' 
    ? campaigns 
    : campaigns?.filter(campaign => {
        // Handle different possible structures for campaign type
        const campaignType = campaign.campaignType?.label || 
                           campaign.campaignType?.name ||
                           campaign.campaignType || 
                           campaign.category || 
                           campaign.type ||
                           campaign.campaignCategory;
        
        // Use mapping to convert display category to actual campaign type
        const targetType = categoryMapping[activeCategory] || activeCategory;
        
        
        
        // Exact match with the mapped campaign type values
        return campaignType === targetType;
      }) || [];

  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Active Fundraising Campaigns
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join us in making a difference. Every contribution helps us serve humanity and spread love through various seva activities.
          </p>
        </div>

        {/* Recently Created Campaigns Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">
            Recently created campaigns
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 ${
                  activeCategory === category.name
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                } border border-gray-200`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => {
                // Calculate percentage safely
                const raisedAmount = campaign.raisedAmount || 0;
                const goalAmount = campaign.goalAmount || 1;
                const percentage = Math.round((raisedAmount / goalAmount) * 100);
                
                return (
                  <div key={campaign._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Category Badge */}
                    <div className="relative">
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium z-10 ${getCategoryColor(campaign.campaignType?.label || campaign.campaignType || campaign.category)}`}>
                        {campaign.campaignType?.label || campaign.campaignType || campaign.category || 'General'}
                      </div>
                      <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-white text-sm font-bold ${getProgressColor(percentage)} z-10`}>
                        {percentage}%
                      </div>
                    </div>

                    {/* Campaign Image */}
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={campaign.uploadedImage || '/placeholder-image.jpg'}
                        alt={campaign.campaignName}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>

                    {/* Campaign Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {campaign.campaignName}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {campaign.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Raised: {formatCurrency(raisedAmount)}</span>
                          <span>Goal: {formatCurrency(goalAmount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(percentage)}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Campaign Details */}
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span>{moment(campaign.endDate).diff(moment(new Date()), 'days')} days left</span>
                        <span>by {campaign.organiser || 'organiser'}</span>
                      </div>

                      {/* Donate Button */}
                      <button 
                        onClick={() => { 
                          setSelectedCampaign(campaign); 
                          setOpenDialog(true); 
                        }} 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                      >
                        DONATE NOW
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No campaigns found for "{activeCategory}" category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Donation Modal */}
      {openDialog && (
        <DonationModal 
          onClose={() => { setOpenDialog(false) }} 
          isOpen={openDialog} 
          campaign={selectedCampaign} 
        />
      )}
    </div>
  );
};

export default FundraisingCampaigns;