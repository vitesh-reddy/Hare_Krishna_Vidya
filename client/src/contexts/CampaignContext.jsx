// CampaignContext.jsx

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignTypes, setCampaignTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const base_url = import.meta.env.VITE_BACKEND_URL;

  // Fetch campaign types
  const fetchCampaignTypes = async () => {
    setLoading(true);
    console.log("fetching campaign types");
    try {
      const res = await axios.get(`${base_url}/api/campaigns/types`);
      setCampaignTypes(res.data);
    } catch (err) {
      console.error('Error fetching campaign types:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all published campaigns
  const fetchPublishedCampaigns = async () => {
    setLoading(true);
    console.log("fetching campaigns");
    try {
      const res = await axios.get(`${base_url}/api/campaigns/published`);
      setCampaigns(res.data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoading(false);
    }
  };



  // Create a new campaign
  const createCampaign = async (campaignData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${base_url}/api/campaigns/create`, campaignData);
      // Add the new campaign to the local state
      setCampaigns(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error('Error creating campaign:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        campaignTypes,
        fetchPublishedCampaigns,
        fetchCampaignTypes,
        createCampaign,
        loading,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => useContext(CampaignContext);