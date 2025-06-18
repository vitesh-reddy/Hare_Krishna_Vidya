import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  profileUrl: String,
  coverLetter: String,
  appliedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['shortlisted', 'pending', 'rejected'],
    default: 'pending'
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  }
}, {
  timestamps: true,
});

applicationSchema.index({ jobId: 1 });

const Application = mongoose.model('Application', applicationSchema);
export default Application;