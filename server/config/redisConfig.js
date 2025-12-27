import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("❌ REDIS_URL not defined in environment variables.");
}

let redis;

if (!global._redis) {
  global._redis = new Redis(REDIS_URL, {
    retryStrategy: (times) => {
      const delay = Math.min(times * 100, 2000);
      return delay;
    },

    tls: REDIS_URL.startsWith("rediss://") ? {} : undefined,
  });

  global._redis.on("connect", () => {
    console.log("Redis connected (Upstash)");
  });

  global._redis.on("error", (err) => {
    console.error("Redis error:", err);
  });
}

redis = global._redis;

export const CACHE_KEYS = {
  RECENT_BLOGS: (limit = 3) => `blogs:recent:limit:${limit}`,
  BLOG_DETAIL: (id) => `blogs:${id}`,
  PUBLISHED_COUNT: "blogs:publishedcount",
  PUBLISHED_PAGE: (page, limit) => `published:page:${page}:limit:${limit}`,
};

export const CACHE_TTL = {
  RECENT_BLOGS: parseInt(process.env.REDIS_CACHE_TTL_RECENT_BLOGS) || 21600,
  BLOG_DETAIL: parseInt(process.env.REDIS_CACHE_TTL_BLOG_DETAIL) || 43200,
  PUBLISHED_COUNT: parseInt(process.env.REDIS_CACHE_TTL_PUBLISHED_COUNT) || 21600,
  PUBLISHED_PAGE: parseInt(process.env.REDIS_CACHE_TTL_PUBLISHED_PAGE) || 21600,
};

export default redis;
