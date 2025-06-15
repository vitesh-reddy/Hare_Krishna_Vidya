// BlogContext.jsx

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const base_url = import.meta.env.VITE_BACKEND_URL;

  const fetchPublishedBlogs = async () => {
    setLoading(true);
    console.log("fetching blogs");
    try {
      const res = await axios.get(`${base_url}/api/blogs/published`);
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {      
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const getBlogById = (id) => blogs.find((blog) => blog._id === id) || null;

  return (
    <BlogContext.Provider
      value={{
        blogs,
        getBlogById,
        fetchPublishedBlogs, 
        loading,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogContext);
