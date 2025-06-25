import express from "express";
import { getRecentActivities } from "../services/updatesServices.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";

const router = express.Router();

router.use(verifyAdminToken);

router.get("/recent-activity", async (req, res) => { 
  try {
    const recentActivities = await getRecentActivities();
    res.status(200).json(recentActivities);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;