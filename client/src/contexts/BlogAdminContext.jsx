import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogAdminContext = createContext();

export const useBlogsAdmin = () => useContext(BlogAdminContext);

export const BlogAdminProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

  // Fetch all blog posts
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/blogs/all`);
      setPosts(response.data);
    } catch (error) {
      toast.error('Failed to fetch blog posts.');
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  // Create a new blog post
  const createBlog = async (data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${BASE_URL}/blogs/upload-image`, formData);
        imageUrl = uploadResponse.data.url;
      }

      const newBlog = { ...data, image: imageUrl };
      const response = await axios.post(`${BASE_URL}/blogs/create`, newBlog);
      const createdBlog = response.data.item;
      setPosts((prevPosts) => [...prevPosts, createdBlog]);
      toast.success('Blog post created successfully.');
    } catch (error) {
      toast.error('Failed to create blog post.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a blog post
  const updateBlog = async (id, data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${BASE_URL}/blogs/upload-image`, formData);
        imageUrl = uploadResponse.data.url;
      }

      const updatedBlog = { ...data, image: imageUrl };
      const response = await axios.put(`${BASE_URL}/blogs/update/${id}`, updatedBlog);
      const updatedBlogFromServer = response.data.item;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? updatedBlogFromServer : post
        )
      );
      toast.success('Blog post updated successfully.');
    } catch (error) {
      toast.error('Failed to update blog post.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog post
  const deleteBlog = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/blogs/delete/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      toast.success('Blog post deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete blog post.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle blog status
  const toggleBlogStatus = async (id) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL}/blogs/toggle-status/${id}`);
      const updatedBlog = response.data.item;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? updatedBlog : post
        )
      );
      toast.success('Blog status updated.');
    } catch (error) {
      toast.error('Failed to update blog status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogAdminContext.Provider
      value={{
        posts,
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
        toggleBlogStatus,
        loading,
      }}
    >
      {children}
    </BlogAdminContext.Provider>
  );
};