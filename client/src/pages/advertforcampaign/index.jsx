import React, { useEffect, useState } from 'react';
import { Heart, Users, GraduationCap, Home, HelpingHand, User } from 'lucide-react';
import { useCampaigns } from '../../contexts/CampaignContext';
import Loader from '../../components/common/Loader';
import moment from 'moment';

const FundraisingCampaigns = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { loading, campaigns, fetchPublishedCampaigns } = useCampaigns();

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
  ];

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
      'Meal': 'bg-blue-50 text-blue-700',
      'Education': 'bg-purple-50 text-purple-700',
      'Temple': 'bg-yellow-50 text-yellow-700',
      'Support': 'bg-green-50 text-green-700',
      'Care': 'bg-pink-50 text-pink-700'
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };


  if (loading) {
    return (
      <Loader />
    );
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
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 ${activeCategory === category.name
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
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Category Badge */}
                <div className="relative">
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium z-10`}>
                    {campaign.campaignType.label}
                  </div>
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-white text-sm font-bold ${getProgressColor(campaign.percentage)} z-10`}>
                    percentage%
                  </div>
                </div>

                {/* Campaign Images Grid */}
                <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 p-4">
                  <div className="grid grid-cols-3 gap-2 h-full">
                    <div className="bg-white rounded-lg shadow-sm"></div>
                    <div className="bg-white rounded-lg shadow-sm"></div>
                    <div className="bg-white rounded-lg shadow-sm"></div>
                    <div className="bg-white rounded-lg shadow-sm"></div>
                    <div className="bg-white rounded-lg shadow-sm"></div>
                    <div className="bg-white rounded-lg shadow-sm"></div>
                  </div>
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
                      <span>Raised: {0}</span>
                      <span>Goal: {formatCurrency(campaign.goalAmount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full`}
                        style={{ width: `percentage%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{moment(campaign.endDate).diff(moment(new Date()), 'days')} days left</span>
                    <span>by {'organiser'}</span>
                  </div>

                  {/* Donate Button */}
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                    DONATE NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisingCampaigns;