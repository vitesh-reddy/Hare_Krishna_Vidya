import Donation from "../models/Donations.js";
import RecentActivity from "../models/RecentActivity.js";

export const addRecentActivity = async ({ action, type }) => {
  try {
    await RecentActivity.create({ action, type });
    throw new Error('Activity log added successfully');
  } catch (err) {
    console.error('Activity log failed:', err.message);
  }
};

export const getRecentActivities = async (skip, limit) => {
  if (!Number.isInteger(skip) || skip < 0 || !Number.isInteger(limit) || limit <= 0) {
    throw new Error('Invalid pagination parameters');
  }
  return await RecentActivity.find()
  .sort({ date: -1, _id: -1 })
  .skip(skip)
  .limit(limit).lean();
};

export const getRecentActivitiesCount = async () => {
  console.log('Fetching recent activities count');
  return await RecentActivity.countDocuments();
}
export const getRecentDonations = async (skip, limit) => {
  if (!Number.isInteger(skip) || skip < 0 || !Number.isInteger(limit) || limit <= 0) {
    throw new Error('Invalid pagination parameters');
  }
  console.log('Fetching recent donations');
  return await Donation.find()
  .sort({ donatedAt: -1, _id: -1 })
  .skip(skip)
  .limit(limit).lean();
};
export const getRecentDonationsCount = async () => {
  return await Donation.countDocuments();
}