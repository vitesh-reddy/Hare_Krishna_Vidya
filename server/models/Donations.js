import mongoose from 'mongoose';

const donorInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String }
}, { _id: false });

const statusHistoryEntrySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'refunded'],
    required: true,
  },
  at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  reason: {
    type: String,
  },
  source: {
    type: String,
  },
}, { _id: false });

const donationSchema = new mongoose.Schema({
  donorInfo: donorInfoSchema,

  donationType: { type: String, enum: ['amount', 'items'], required: true },
  donatedFor: {
    type: String,
    enum: ['Annadaan', 'Sponsor a Child', 'Vidyadaan', null],
    default: null,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'items.itemType',
      },
      itemType: {
        type: String,
        required: true,
        enum: ['Kit', 'GroceryItem'],
      },
      itemName: String,
      quantity: Number,
      price: Number,
    }
  ],
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'INR',
  },

  paymentProvider: {
    type: String,
    enum: ['stripe'],
    default: 'stripe',
  },
  stripeCheckoutSessionId: {
    type: String,
    index: true,
  },
  stripePaymentIntentId: {
    type: String,
    index: true,
  },

  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'refunded'],
    required: true,
    default: 'pending',
    index: true,
  },
  statusHistory: {
    type: [statusHistoryEntrySchema],
    default: [],
  },

  refundHistory: [
    {
      refundId: { type: String, required: true },
      refundedAt: { type: Date, required: true, default: Date.now },
      refundedBy: { type: String, required: true },
    },
  ],

  idempotencyKey: {
    type: String,
    required: true,
    unique: true,
  },

  donatedAt: {
    type: Date,
    default: Date.now,
  },

}, {
  timestamps: true,
});

donationSchema.index({ donatedAt: -1, _id: -1 });

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
