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
    enum: ['pending', 'succeeded', 'failed'],
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
    enum: ['pending', 'succeeded', 'failed'],
    required: true,
    default: 'pending',
    index: true,
  },
  statusHistory: {
    type: [statusHistoryEntrySchema],
    default: [],
  },

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

// Clean up legacy indexes from the previous Razorpay-based schema.
// In particular, drop the unique index on paymentDetails.orderId which would
// conflict now that we no longer store paymentDetails.
Donation.collection
  .dropIndex('paymentDetails.orderId_1')
  .catch((err) => {
    if (err && err.codeName !== 'IndexNotFound' && err.code !== 27) {
      // eslint-disable-next-line no-console
      console.error('Failed to drop legacy paymentDetails.orderId_1 index:', err.message || err);
    }
  });

export default Donation;
