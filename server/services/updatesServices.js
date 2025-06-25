import RecentActivity from "../models/RecentActivity.js";

export const getRecentActivities = async () => {
  return await RecentActivity.find() .sort({ date: -1 }).limit(4) // Fetch the 4 most recent activities
}

export const addRecentActivity = async ({ action, type }) => {
  await RecentActivity.create({ action, type }); 
};