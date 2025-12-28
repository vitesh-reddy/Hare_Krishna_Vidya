import mongoose from 'mongoose';

const statusHistoryEntrySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'refunded'],
    required: true
  },
  at: { type: Date, required: true, default: Date.now },
  reason: { type: String },
  source: { type: String }
}, { _id: false });

export default statusHistoryEntrySchema;