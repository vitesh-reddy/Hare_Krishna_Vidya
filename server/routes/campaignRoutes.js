import express from 'express';
import { CampaignType, Campaign } from '../models/Campaign.js';


const router = express.Router();

// Get Campaign Types
router.get('/types', async (req, res) => {
    try {
        const campaignTypes = await CampaignType.find({});
        return res.status(200).json(campaignTypes);
    } catch (error) {
        console.error("Error fetching campaign types:", error);
        return res.status(500).json({ error: 'Failed to fetch campaign types' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const {
            campaignType,     // should be ObjectId string
            campaignName,
            goalAmount,
            startDate,        // should be in milliseconds
            endDate,          // should be in milliseconds
            description,
            uploadedImage
        } = req.body;

        const newCampaign = new Campaign({
            campaignType,
            campaignName,
            goalAmount,
            startDate,
            endDate,
            description,
            uploadedImage // default null
        });

        const saved = await newCampaign.save();
        return res.status(201).json(saved);
    } catch (error) {
        console.error("Error creating campaign:", error);
        return res.status(500).json({ error: 'Failed to create campaign' });
    }
});

router.get('/published', async (req, res) => {
    try {
        const publishedCampaigns = await Campaign.find({}).populate('campaignType');
        return res.status(200).json(publishedCampaigns);
        
    } catch (error) {
        console.error("Error fetching published campaigns:", error);
        return res.status(500).json({ error: 'Failed to fetch published campaigns' });
    }
});

export default router;