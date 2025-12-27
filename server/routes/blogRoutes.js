import express from 'express';
import { getPublishedBlogs, getBlogById, getTotalBlogsCount, getRecentBlogs, addSubscriber
} from '../services/blogServices.js';
import redis, { CACHE_KEYS, CACHE_TTL } from '../config/redisConfig.js';

const router = express.Router();

router.get('/recent', async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  const key = CACHE_KEYS.RECENT_BLOGS(limit);

  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`HIT - ${key}`);
      return res.status(200).json({ blogs: JSON.parse(cached) });
    }

    console.log(`MISS - ${key}`);
    const { blogs } = await getRecentBlogs(limit);
    await redis.set(key, JSON.stringify(blogs), 'EX', CACHE_TTL.RECENT_BLOGS);
    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch recent blogs' });
  }
});

router.get('/count', async (_req, res) => {
  const key = CACHE_KEYS.PUBLISHED_COUNT;

  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`HIT - ${key}`);
      return res.status(200).json({ totalCount: parseInt(cached) });
    }

    console.log(`MISS - ${key}`);
    const { totalCount } = await getTotalBlogsCount();
    await redis.set(key, totalCount.toString(), 'EX', CACHE_TTL.PUBLISHED_COUNT);
    return res.status(200).json({ totalCount });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to fetch blogs count' });
  }
});

router.get('/published', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const key = CACHE_KEYS.PUBLISHED_PAGE(page, limit);

  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`HIT - ${key}`);
      return res.status(200).json(JSON.parse(cached));
    }

    console.log(`MISS - ${key}`);
    const data = await getPublishedBlogs(page, limit);
    await redis.set(key, JSON.stringify(data), 'EX', CACHE_TTL.PUBLISHED_PAGE);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch published blogs' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const key = CACHE_KEYS.BLOG_DETAIL(id);

  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`HIT - ${key}`);
      return res.status(200).json(JSON.parse(cached));
    }

    console.log(`MISS - ${key}`);
    const blog = await getBlogById(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    await redis.set(key, JSON.stringify(blog), 'EX', CACHE_TTL.BLOG_DETAIL);
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

router.post('/add-subscriber', async (req, res) => {
  try {
    const { body : email } = req;
    if (!email) 
      return res.status(400).json({ error: 'Email is required' });

    await addSubscriber(email);
    res.status(201).json({success: true, message: 'Subscribed'});
  } catch (error) {
    console.error(error);
    if(error.code === 11000)
      res.status(400).json({ message:'Already Subscribed' });
    else res.status(500).json({ message: 'Failed to Subscribe, Try Again' });
  }
});

export default router;