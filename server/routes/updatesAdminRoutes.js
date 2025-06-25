import express from "express";
import { getRecentActivities, getRecentActivitiesCount, getRecentDonations, getRecentDonationsCount } from "../services/updatesServices.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";

const router = express.Router();

router.use(verifyAdminToken);

router.get('/recent-activity', async (req, res) => {
  try {
    const { page = 1, limit = 7 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Validate pagination parameters
    if (pageNum < 1 || limitNum < 1 || isNaN(pageNum) || isNaN(limitNum)) 
      return res.status(400).json({ message: 'Invalid page or limit parameter' });    

    const skip = (pageNum - 1) * limitNum;
    const recentActivities = await getRecentActivities(skip, limitNum);

    // Check if there are more activities to fetch
    const totalActivities = await getRecentActivitiesCount()
    const hasMore = skip + recentActivities.length < totalActivities;

    res.status(200).json({
      activities: recentActivities,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/recent-donations', async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (pageNum < 1 || limitNum < 1 || isNaN(pageNum) || isNaN(limitNum)) {
      return res.status(400).json({ message: 'Invalid page or limit parameter' });
    }

    const skip = (pageNum - 1) * limitNum;
    const recentDonations = await getRecentDonations(skip, limitNum);
    const totalDonations = await getRecentDonationsCount();
    const hasMore = skip + recentDonations.length < totalDonations;
    res.status(200).json({
      donations: recentDonations,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;