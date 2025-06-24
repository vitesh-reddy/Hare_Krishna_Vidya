import mongoose from 'mongoose';


const donorInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, { _id: false });

// 🔹 Embedded Donation Schema (no model created here)
const embeddedDonationSchema = new mongoose.Schema({
  donorInfo: donorInfoSchema,
  amount: {
    type: Number,
    required: true
  },
  paymentDetails: {
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
  },
  donatedAt: {
    type: Date,
    default: Date.now,
  }
}, { _id: true });


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
  raisedAmount: { type: Number, required: false },
  startDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
  description: { type: String, required: true },
  uploadedImage: { type: String, required: true },
  donations: [embeddedDonationSchema]
});

// Model Definitions
const CampaignType = mongoose.model('campaignType', campaignTypeSchema, 'campaignType');
const Campaign = mongoose.model('Campaign', campaignSchema, 'campaigns');

export { CampaignType, Campaign };
