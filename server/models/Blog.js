import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'Hare Krishna Vidya Team' },
  date: { type: Date, default: Date.now }, 
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  content: { type: String, required: true },
  excerpt: { type: String },
  image: { type: String },
  tags: { type: [String] },
});

blogSchema.index({ status: 1 });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
