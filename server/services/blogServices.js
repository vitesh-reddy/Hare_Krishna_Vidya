import Blog from '../models/Blog.js';
import BlogSubscriber from '../models/BlogSubscriber.js';
import { addRecentActivity } from './updatesServices.js';

// Create a new blog
export const createBlog = async (blogData) => {
  const newBlog = new Blog(blogData);
  const savedBlog = await newBlog.save();
  // Log blog creation activity
  await addRecentActivity({ action: `Blog Post created: ${savedBlog.title}`, type: 'blog' });
  return savedBlog;
};

// Update an existing blog by ID
export const updateBlog = async (id, updatedData) => {
  const blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
  if (!blog) throw new Error('Blog not found');
  // Log blog update activity
  await addRecentActivity({ action: `Blog Post updated: ${blog.title}`, type: 'blog' });
  return blog;
};

// Toggle blog status (Draft <-> Published)
export const toggleBlogStatus = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');

  blog.status = blog.status === 'Published' ? 'Draft' : 'Published';
  const updated = await blog.save(); // Return the updated blog
  // Log blog status toggle activity
  const statusAction = blog.status === 'Published' ? 'published' : 'drafted';
  await addRecentActivity({ action: `Blog Post ${statusAction}: ${blog.title}`, type: 'blog' });
  return updated;
};

// Fetch all blogs
export const getAllBlogs = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [blogs, totalCount] = await Promise.all([
    Blog.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Blog.countDocuments()
  ]);
  return { blogs, totalCount };
};

export const getPublishedBlogsCount = async () => {
  return await Blog.countDocuments({ status: 'Published' });
}

export const getRecentBlogs = async (limit = 3) => {
  const blogs = await Blog.find({ status: 'Published' })
  .select('title author date excerpt image tags')
  .sort({ date: -1, _id: -1 })
  .limit(limit)
  .lean();
  return { blogs };
};

// Fetch only published blogs
export const getPublishedBlogs = async (page = 1, limit = 6) => {
  const skip = 3 + (page - 1) * limit; // Always skip the latest 3 blogs
  const [blogs, totalCount] = await Promise.all([
    Blog.find({ status: 'Published' })
      .select('title author date excerpt image tags')
      .sort({ date: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Blog.countDocuments({ status: 'Published' })
  ]);
  return { blogs, totalCount };
};

export const getBlogById = async (id) => {
  return await Blog.findById(id)
    .select('title author date content excerpt image tags')
    .lean();
};

export const getTotalBlogsCount = async () => {
  const totalCount = await Blog.countDocuments({ status: 'Published' });
  return { totalCount };
};

export const addSubscriber = async (email) => {
  const subscriber = new BlogSubscriber(email);
  await subscriber.save();
};

export const getAllSubscribers = async () => {
  return await BlogSubscriber.find().sort({ subscribedAt: -1 });
};