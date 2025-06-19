import mongoose from 'mongoose';

// CampaignType Schema
const campaignTypeSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String }
});

// Campaign Schema
const campaignSchema = new mongoose.Schema({
  campaignType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'campaignType',
    required: true
  },
  campaignName: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  uploadedImage: { type: String, default: null }
});

// Model Definitions
const CampaignType = mongoose.model('campaignType', campaignTypeSchema, 'campaignType');
const Campaign = mongoose.model('Campaign', campaignSchema, 'campaigns');

export { CampaignType, Campaign };
