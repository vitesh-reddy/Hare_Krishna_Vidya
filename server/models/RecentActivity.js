import mongoose from 'mongoose';

const recentActivitySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['blog', 'job', 'kit', 'grocery'],
    required: true,
  },
});

const RecentActivity = mongoose.model('RecentActivity', recentActivitySchema);

export default RecentActivity;
