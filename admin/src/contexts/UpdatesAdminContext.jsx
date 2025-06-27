import React, { createContext, useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axiosInstance from '../api/axiosInstance';

dayjs.extend(relativeTime);

const UpdatesAdminContext = createContext();

export const UpdatesAdminProvider = ({ children }) => {
  // Recent Activity States
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityPage, setActivityPage] = useState(1);
  const [isActivityLoading, setIsActivityLoading] = useState(false);
  const [hasMoreActivity, setHasMoreActivity] = useState(true);
  const [totalActivities, setTotalActivities] = useState(undefined);

  // Recent Donations States
  const [recentDonations, setRecentDonations] = useState([]);
  const [donationPage, setDonationPage] = useState(1);
  const [isDonationLoading, setIsDonationLoading] = useState(false);
  const [hasMoreDonations, setHasMoreDonations] = useState(true);
  const [totalDonations, setTotalDonations] = useState(undefined);

  const fetchActivities = useCallback(async (pageNum) => {
    setIsActivityLoading(true);
    try {
      const res = await axiosInstance.get('/updates/recent-activity', {
        params: { page: pageNum, limit: 7, activitiesCount : totalActivities },
      });
      const transformed = res.data.activities.map((activity) => ({
        ...activity,
        time: dayjs(activity.date).fromNow(),
      }));
      setRecentActivity((prev) => (pageNum === 1 ? transformed : [...prev, ...transformed]));
      setTotalActivities(res.data.totalActivities);
      setHasMoreActivity(res.data.hasMore);
    } catch (err) {
      console.error('Failed to fetch recent admin updates:', err);
    } finally {
      setIsActivityLoading(false);
    }
  }, [totalActivities]);

  const fetchDonations = useCallback(async (pageNum) => {
    setIsDonationLoading(true);
    try {
      const res = await axiosInstance.get('/updates/recent-donations', {
        params: { page: pageNum, limit: 5, donationsCount: totalDonations },
      });
      const transformed = res.data.donations.map((donation) => ({
        ...donation,
        time: dayjs(donation.donatedAt).fromNow(),
        action: donation.donationType === 'amount'
          ? `Donated for ${donation.donatedFor}`
          : `Donated for ${(donation.items.length === 1 ? donation.items[0].itemName : 'Items')}`,
      }));
      setRecentDonations((prev) => (pageNum === 1 ? transformed : [...prev, ...transformed]));
      setTotalDonations(res.data.totalDonations);
      setHasMoreDonations(res.data.hasMore);

    } catch (err) {
      console.error('Failed to fetch recent donations:', err);
    } finally {
      setIsDonationLoading(false);
    }
  }, [totalDonations]);

  useEffect(() => {
    fetchActivities(1);
    fetchDonations(1);
  }, []);

  const loadMoreActivities = useCallback(() => {
    if (!isActivityLoading && hasMoreActivity) {
      const nextPage = activityPage + 1;
      setActivityPage(nextPage);
      fetchActivities(nextPage);
    }
  }, [isActivityLoading, hasMoreActivity, activityPage, fetchActivities]);

  const loadMoreDonations = useCallback(() => {
    if (!isDonationLoading && hasMoreDonations) {
      const nextPage = donationPage + 1;
      setDonationPage(nextPage);
      fetchDonations(nextPage);
    }
  }, [isDonationLoading, hasMoreDonations, donationPage, fetchDonations]);

  return (
    <UpdatesAdminContext.Provider value={{
      recentActivity,
      loadMore: loadMoreActivities,
      isLoading: isActivityLoading,
      hasMore: hasMoreActivity,
      recentDonations,
      loadMoreDonations,
      isDonationLoading,
      hasMoreDonations,
    }}>
      {children}
    </UpdatesAdminContext.Provider>
  );
};

export const useAdminUpdates = () => useContext(UpdatesAdminContext);