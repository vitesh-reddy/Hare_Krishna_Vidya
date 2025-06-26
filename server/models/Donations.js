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

const donationSchema = new mongoose.Schema({
  donorInfo: donorInfoSchema,

  donationType: { type: String, enum: ["amount", "items"], required: true },
  donatedFor: { type: String, 
    enum: ['Annadaan', 'Sponsor a Child', 'Vidyadaan'], default: null },
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
  },

});

donationSchema.index({ donatedAt: -1, _id: -1 });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
