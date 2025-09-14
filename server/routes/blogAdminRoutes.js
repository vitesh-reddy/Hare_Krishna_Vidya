import express from 'express';
import { createBlog, updateBlog, getAllBlogs, toggleBlogStatus, getPublishedBlogsCount, getAllSubscribers } from '../services/blogServices.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinaryConfig.js';
import Blog from '../models/Blog.js';
import { verifyAdminToken } from '../middlewares/verifyAdminToken.js';
import redis, { CACHE_KEYS, CACHE_TTL } from '../config/redisConfig.js';

const router = express.Router();
router.use(verifyAdminToken);

const invalidatePublishedPages = async () => {
  const keys = await redis.keys('published:page:*');
  if (keys.length) await redis.del(...keys);
};

const invalidateRecentBlogs = async () => {
  try {
    const keys = await redis.keys('blogs:recent:limit:*');
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`DEL - ${keys.length} recent blog cache keys cleared`);
    }
  } catch (err) {
    console.error('❌ Error invalidating recent blogs cache:', err);
  }
};


const removeBlogCache = async (blogId) => {
  await redis.del(CACHE_KEYS.BLOG_DETAIL(blogId));
  await redis.del(CACHE_KEYS.PUBLISHED_COUNT);
  await invalidateRecentBlogs();
  await invalidatePublishedPages();
};

router.get('/published-count', async (_req, res) => {
  const key = CACHE_KEYS.PUBLISHED_COUNT;

  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`HIT - ${key}`);
      return res.status(200).json({ count: parseInt(cached) });
    }

    console.log(`MISS - ${key}`);
    const count = await getPublishedBlogsCount();
    await redis.set(key, count.toString(), 'EX', CACHE_TTL.PUBLISHED_COUNT); 
    return res.status(200).json({ count });
  } catch (error) {
    console.log(error)
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

    await removeBlogCache(blogId);
    return res.status(200).json({ message: 'Blog updated successfully', item: updatedBlog });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update blog' });
  }
});

router.patch('/toggle-status/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const updatedBlog = await toggleBlogStatus(blogId);

    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    
    await removeBlogCache(blogId);
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
    await removeBlogCache(blog._id.toString());

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

router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await getAllSubscribers();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;