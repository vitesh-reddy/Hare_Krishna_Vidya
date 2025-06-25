import express from 'express';
import { createBlog, updateBlog, getAllBlogs, toggleBlogStatus, getPublishedBlogsCount } from '../services/blogServices.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinaryConfig.js';
import Blog from '../models/Blog.js';
import { verifyAdminToken } from '../middleware/verifyAdminToken.js';

const router = express.Router();

router.use(verifyAdminToken);

router.get('/published-count', async (_req, res) => {
  try {
    const count = await getPublishedBlogsCount();
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch published blogs count' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { blogs, totalCount } = await getAllBlogs(parseInt(page), parseInt(limit));
    return res.status(200).json({ blogs, totalCount });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

router.post('/upload-image', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const fileBuffer = req.files.image.data;
    const cloudinaryUrl = await uploadToCloudinary(fileBuffer, 'Blog');
    return res.status(200).json({ url: cloudinaryUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const newBlog = await createBlog(req.body);
    return res.status(201).json({ message: 'Blog created successfully', item: newBlog });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create blog' });
  }
});

router.put('/update/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const updatedBlog = await updateBlog(blogId, req.body);
    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    return res.status(200).json({ message: 'Blog updated successfully', item: updatedBlog });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update blog' });
  }
});

router.patch('/toggle-status/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const updatedBlog = await toggleBlogStatus(blogId);
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    return res.status(200).json({ message: `Blog status updated to ${updatedBlog.status}`, item: updatedBlog });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to toggle blog status' });
  }
});

router.delete('/delete/:blogId', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const imageUrl = blog.image;
    await Blog.findByIdAndDelete(req.params.blogId);

    try {
      if (imageUrl) await deleteFromCloudinary(imageUrl);
    } catch (cloudErr) {
      console.error('Cloudinary deletion failed:', cloudErr.message);
    }

    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete blog', error: error.message });
  }
});

export default router;
