import mongoose from 'mongoose';

const blogSubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const BlogSubscriber = mongoose.model('BlogSubscriber', blogSubscriberSchema);
export default BlogSubscriber;
