import React, { useState } from 'react';
import { Heart, Users, GraduationCap, Home, HelpingHand, User } from 'lucide-react';

const FundraisingCampaigns = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    { name: 'All', icon: null },
    { name: 'Meal', icon: <Users className="w-4 h-4" /> },
    { name: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Temple', icon: <Home className="w-4 h-4" /> },
    { name: 'Support', icon: <HelpingHand className="w-4 h-4" /> },
    { name: 'Care', icon: <Heart className="w-4 h-4" /> }
  ];

  const campaigns = [
    {
      id: 1,
      category: 'Meal',
      title: 'Feed 500 Children - Mid Day Meal',
      description: 'Help us provide nutritious meals to underprivileged children in rural schools',
      raised: 87500,
      goal: 125000,
      percentage: 70,
      daysLeft: 45,
      organizer: 'Krishna Seva Team',
      images: ['meal1.jpg', 'meal2.jpg', 'meal3.jpg']
    },
    {
      id: 2,
      category: 'Education',
      title: 'Education Kit for Village Schools',
      description: 'Providing essential educational materials to children in remote villages',
      raised: 45000,
      goal: 250000,
      percentage: 18,
      daysLeft: 60,
      organizer: 'Saraswati Education Trust',
      images: ['edu1.jpg', 'edu2.jpg', 'edu3.jpg']
    },
    {
      id: 3,
      category: 'Temple',
      title: 'Temple Construction Support',
      description: 'Support the construction of a spiritual center for community gatherings',
      raised: 320000,
      goal: 500000,
      percentage: 64,
      daysLeft: 90,
      organizer: 'Vrindavan Development',
      images: ['temple1.jpg', 'temple2.jpg', 'temple3.jpg']
    },
    {
      id: 4,
      category: 'Meal',
      title: 'Feed Homeless Mothers',
      description: 'Providing nutritious meals and care to homeless mothers and their children',
      raised: 25000,
      goal: 100000,
      percentage: 25,
      daysLeft: 30,
      organizer: 'Mother Care Foundation',
      images: ['homeless1.jpg', 'homeless2.jpg', 'homeless3.jpg']
    },
    {
      id: 5,
      category: 'Support',
      title: 'Wedding Support for Needy Families',
      description: 'Help us organize dignified weddings for families in need',
      raised: 0,
      goal: 1000000,
      percentage: 0,
      daysLeft: 120,
      organizer: 'Seva Foundation',
      images: ['wedding1.jpg', 'wedding2.jpg', 'wedding3.jpg']
    },
    {
      id: 6,
      category: 'Care',
      title: 'Elder Care Support',
      description: 'Providing care and support to elderly mothers in need',
      raised: 75000,
      goal: 150000,
      percentage: 50,
      daysLeft: 75,
      organizer: 'Elder Care Trust',
      images: ['elder1.jpg', 'elder2.jpg', 'elder3.jpg']
    }
  ];

  const filteredCampaigns = activeCategory === 'All' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.category === activeCategory);

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
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Category Badge */}
                <div className="relative">
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(campaign.category)} z-10`}>
                    {campaign.category}
                  </div>
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-white text-sm font-bold ${getProgressColor(campaign.percentage)} z-10`}>
                    {campaign.percentage}%
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
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {campaign.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Raised: {formatCurrency(campaign.raised)}</span>
                      <span>Goal: {formatCurrency(campaign.goal)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(campaign.percentage)}`}
                        style={{ width: `${campaign.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{campaign.daysLeft} days left</span>
                    <span>by {campaign.organizer}</span>
                  </div>

                  {/* Donate Button */}
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                    DONATE NOW
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
              Load More Campaigns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisingCampaigns;