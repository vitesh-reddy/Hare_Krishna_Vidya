import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const BlogAdminContext = createContext();
export const useBlogsAdmin = () => useContext(BlogAdminContext);

export const BlogAdminProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [publishedBlogsCount, setPublishedBlogsCount] = useState(-1);
  const [subscribers, setSubscribers] = useState([]);

  // 🧠 Blog Cache Map: key -> `${page}-${limit}`, value -> { blogs, totalCount }
  const blogCache = useRef({});

  // Fetch count of published blogs (for analytics)
  const fetchPublishedBlogsCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/blogs/published-count');
      setPublishedBlogsCount(response.data.count);
    } catch (error) {
      toast.error('Failed to fetch Published Blogs.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger count fetch only once on mount
  useEffect(() => {
    if (totalBlogsCount === -1) fetchPublishedBlogsCount();  
  }, []);

  // Fetch paginated list of blogs with caching
  const fetchBlogs = useCallback(async (page = 1, limit = 10) => {
    const cacheKey = `${page}-${limit}`;
    
    // ✅ Serve from cache if exists
    if (blogCache.current[cacheKey]) {
      const cached = blogCache.current[cacheKey];
      setPosts(cached.blogs);
      setTotalBlogsCount(cached.totalCount);
      return;
    }

    // 🚀 Else fetch from server
    setLoading(true);
    try {
      const response = await axiosInstance.get('/blogs/all', {
        params: { page, limit }
      });

      const blogs = response.data.blogs;
      const totalCount = response.data.totalCount;

      // Save to cache
      blogCache.current[cacheKey] = { blogs, totalCount };

      setPosts(blogs);
      setTotalBlogsCount(totalCount);
    } catch (error) {
      toast.error('Failed to fetch blog posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear blog cache
  const invalidateCache = () => {
    blogCache.current = {};
  };

  // Create a new blog post (with optional image upload)
  const createBlog = async (data, page, limit) => {
    setLoading(true);
    try {
      await axiosInstance.post('/blogs/create', data);

      toast.success('Blog post created successfully.');
      invalidateCache();
      await fetchBlogs(page, limit);
    } catch (error) {
      toast.error('Failed to create blog post.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update existing blog (optionally with new image)
  const updateBlog = async (id, data, page, limit) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/blogs/update/${id}`, data);
      toast.success('Blog post updated successfully.');
      invalidateCache();
      await fetchBlogs(page, limit);
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Delete a blog post
  const deleteBlog = async (id, page, limit) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/blogs/delete/${id}`);
      toast.success('Blog post deleted successfully.');

      invalidateCache();
      await fetchBlogs(page, limit);
    } catch (error) {
      toast.error('Failed to delete blog post.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle publish/unpublish status of a blog
  const toggleBlogStatus = async (id, page, limit) => {
    setLoading(true);
    try {
      await axiosInstance.patch(`/blogs/toggle-status/${id}`);
      toast.success('Blog status updated.');

      invalidateCache();
      await fetchBlogs(page, limit);
    } catch (error) {
      toast.error('Failed to update blog status.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    if(subscribers.length) return;
    try {
      const res = await axiosInstance.get('/blogs/subscribers');
      setSubscribers(res.data);
    } catch (error) {
      toast.error('Faild to fetch Subscribers');            
    }
  }

  return (
    <BlogAdminContext.Provider
      value={{
        posts,
        totalBlogsCount,
        publishedBlogsCount,
        subscribers,        
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
        toggleBlogStatus,
        fetchSubscribers,
        loading,
      }}
    >
      {children}
    </BlogAdminContext.Provider>
  );
};
