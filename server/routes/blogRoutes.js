import express from 'express';
import { getPublishedBlogs, getPublishedBlogsCount, getBlogById, getTotalBlogsCount, getRecentBlogs } from '../services/blogServices.js';

const router = express.Router();

router.get('/recent', async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    const { blogs } = await getRecentBlogs(parseInt(limit));
    return res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch recent blogs' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const { totalCount } = await getTotalBlogsCount();
    return res.status(200).json({ totalCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch blogs count' });
  }
});

router.get('/published', async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const { blogs, totalCount } = await getPublishedBlogs(parseInt(page), parseInt(limit));
    return res.status(200).json({ blogs, totalCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch published blogs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

export default router;
