import RecentActivity from "../models/RecentActivity";

export const createRecentActivity = async (activityData) => {
  try {
    const activity = new RecentActivity(activityData);
    await activity.save();
    return activity;
  } catch (error) {
    console.error("Error creating recent activity:", error);
    throw error;
  }
}