import { BarChart3, Heart, Share2 } from "lucide-react";

const CampaignSidebar = () => (
    <div className="bg-gradient-to-b from-orange-400 to-orange-500 p-8 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Create Your Fundraising Campaign</h1>
      <p className="text-orange-100 mb-8">Inspire devotees and well-wishers to support your spiritual cause.</p>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Start a Campaign</h3>
            <p className="text-sm text-orange-100">Register and begin in 2 minutes.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Spread Awareness</h3>
            <p className="text-sm text-orange-100">Share your story via WhatsApp, Instagram, and kirtan communities.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Raise Bhakti-Based Funds</h3>
            <p className="text-sm text-orange-100">Donors contribute in the spirit of service – not obligation.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">See the Impact</h3>
            <p className="text-sm text-orange-100">Updates are shared regularly with supporters in their dashboard.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white bg-opacity-10 rounded-lg p-4">
        <p className="text-sm text-orange-100">"Support a Cause. Start a Change. 🌱 Every seva begins with one step."</p>
      </div>
    </div>
  );
  export default CampaignSidebar;