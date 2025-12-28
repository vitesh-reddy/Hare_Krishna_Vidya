import mongoose from 'mongoose';
import donorInfoSchema from './DonorInfoSchema.js';
import statusHistoryEntrySchema from './StatusHistoryEntrySchema.js';
import itemSchema from './ItemSchema.js';

const donationSchema = new mongoose.Schema({
  donorInfo: donorInfoSchema,
  donationType: { type: String, enum: ['amount', 'items'], required: true },
  donatedFor: {
    type: String, default: null,
    enum: ['Annadaan', 'Sponsor a Child', 'Vidyadaan', null]
  },

  items: [itemSchema],
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },

  paymentProvider: { type: String, enum: ['stripe'], default: 'stripe' },
  stripeCheckoutSessionId: { type: String, index: true },
  stripePaymentIntentId: { type: String, index: true },

  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'refunded'], 
    required: true, default: 'pending', index: true
  },

  statusHistory: { type: [statusHistoryEntrySchema], default: [] },
  refundHistory: [{
    refundId: { type: String, required: true },
    refundedAt: { type: Date, required: true, default: Date.now },
    refundedBy: { type: String, required: true }
  }],

  idempotencyKey: { type: String, required: true, unique: true },
  donatedAt: { type: Date, default: Date.now }

}, { timestamps: true });

donationSchema.index({ donatedAt: -1, _id: -1 });

const Donations = mongoose.model('Donation', donationSchema);

export default Donations;