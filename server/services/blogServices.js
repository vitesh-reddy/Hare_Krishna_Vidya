import Blog from '../models/Blog.js';

// Create a new blog
export const createBlog = async (blogData) => {
  const newBlog = new Blog(blogData);
  return await newBlog.save();
};

// Update an existing blog by ID
export const updateBlog = async (id, updatedData) => {
  const blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
  if (!blog) throw new Error('Blog not found');
  return blog;
};

// Fetch all blogs
export const getAllBlogs = async () => {
  return await Blog.find().sort({ date: -1 }); // Newest first
};

// Fetch only published blogs
export const getPublishedBlogs = async () => {
  return await Blog.find({ status: 'Published' }).sort({ date: -1 });
};

// Toggle blog status (Draft <-> Published)
export const toggleBlogStatus = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');

  blog.status = blog.status === 'Published' ? 'Draft' : 'Published';
  return await blog.save(); // Return the updated blog
};