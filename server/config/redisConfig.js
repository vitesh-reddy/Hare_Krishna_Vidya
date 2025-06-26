// redisConfig.js
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

// Initialize Redis with Upstash URL
const redis = new Redis(process.env.REDIS_URL);

// Monitor connection
redis.on("connect", () => {
  console.log("✅ Connected to Upstash Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

// Cache key generator functions
export const CACHE_KEYS = {
  RECENT_BLOGS: (limit = 3) => `blogs:recent:limit:${limit}`,
  BLOG_DETAIL: (id) => `blogs:${id}`,
  PUBLISHED_COUNT: 'blogs:publishedcount',
  PUBLISHED_PAGE: (page, limit) => `published:page:${page}:limit:${limit}`
};

// Cache TTLs (in seconds), pulled from .env or fallback defaults
export const CACHE_TTL = {
  RECENT_BLOGS: parseInt(process.env.REDIS_CACHE_TTL_RECENT_BLOGS) || 21600,  // 6 hours
  BLOG_DETAIL: parseInt(process.env.REDIS_CACHE_TTL_BLOG_DETAIL) || 43200,    // 12 hours
  PUBLISHED_COUNT: parseInt(process.env.REDIS_CACHE_TTL_PUBLISHED_COUNT) || 21600,    // 6 hours
  PUBLISHED_PAGE: parseInt(process.env.REDIS_CACHE_TTL_PUBLISHED_PAGE) || 21600 // 6 hours
};

export default redis;
