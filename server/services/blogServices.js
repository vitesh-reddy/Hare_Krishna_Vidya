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

// Toggle blog status (Draft <-> Published)
export const toggleBlogStatus = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');

  blog.status = blog.status === 'Published' ? 'Draft' : 'Published';
  return await blog.save(); // Return the updated blog
};