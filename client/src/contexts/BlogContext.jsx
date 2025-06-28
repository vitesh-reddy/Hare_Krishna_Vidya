import React, { createContext, useContext, useState, useRef } from 'react';
import axios from 'axios';

const BlogContext = createContext();
export const useBlogs = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [totalBlogsCount, setTotalBlogsCount] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  // 🧠 Cache for paginated blogs
  const blogPageCache = useRef({});

  const fetchRecentBlogs = async () => {
    if (recentBlogs.length > 0) return;
    setLoadingRecent(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs/recent`, {
        params: { limit: 3 },
      });
      setRecentBlogs(res.data.blogs);
    } catch (err) {
      console.error('Error fetching recent blogs:', err);
    } finally {
      setLoadingRecent(false);
    }
  };

  const fetchTotalBlogsCount = async () => {
    try {
      if (totalBlogsCount !== -1) return;
      const res = await axios.get(`${BASE_URL}/api/blogs/count`);
      setTotalBlogsCount(res.data.totalCount);
    } catch (err) {
      console.error('Error fetching blogs count:', err);
    }
  };

  const fetchAllBlogs = async (page = 1, limit = 6) => {
    const cacheKey = `${page}-${limit}`;

    if (blogPageCache.current[cacheKey]) {
      setAllBlogs(blogPageCache.current[cacheKey]);
      return;
    }

    setLoadingAll(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs/published`, {
        params: { page, limit },
      });

      const blogs = res.data.blogs;

      // Cache the blogs for this page-limit combo
      blogPageCache.current[cacheKey] = blogs;

      setAllBlogs(blogs);
    } catch (err) {
      console.error('Error fetching all blogs:', err);
    } finally {
      setLoadingAll(false);
    }
  };

  const fetchBlogById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs/${id}`);
      return res.data;
    } catch (err) {
      console.error('Error fetching blog by ID:', err);
      return null;
    }
  };

  // Optional: function to clear the cache manually
  const clearBlogCache = () => {
    blogPageCache.current = {};
  };

  return (
    <BlogContext.Provider
      value={{
        recentBlogs,
        allBlogs,
        totalBlogsCount,
        fetchRecentBlogs,
        fetchTotalBlogsCount,
        fetchAllBlogs,
        fetchBlogById,
        loadingRecent,
        loadingAll,
        clearBlogCache, // exposed in case needed
        currentPage,
        setCurrentPage
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};