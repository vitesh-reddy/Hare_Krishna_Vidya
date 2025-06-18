import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String }],
  location: { type: String, required: true },
  requirements: String,
  type: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  noOfApplications: { type: Number, default: 0 },
}, {
  timestamps: true,
});

jobSchema.index({ title: 'text', location: 'text', skills: 'text', type: 'text' });

const Job = mongoose.model('Job', jobSchema);
export default Job;