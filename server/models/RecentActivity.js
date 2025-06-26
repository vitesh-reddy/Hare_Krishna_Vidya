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

const THREE_MONTHS_IN_SECONDS = 3 * 30 * 24 * 60 * 60;


// Activities over 3 months will be erased from the DB
recentActivitySchema.index( { date: 1 }, { expireAfterSeconds: THREE_MONTHS_IN_SECONDS });

const RecentActivity = mongoose.model('RecentActivity', recentActivitySchema);

export default RecentActivity;