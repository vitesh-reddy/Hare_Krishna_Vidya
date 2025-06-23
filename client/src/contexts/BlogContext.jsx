import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [totalBlogsCount, setTotalBlogsCount] = useState(-1);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const fetchRecentBlogs = async () => {
    if(recentBlogs.length > 0) return; // Avoid fetching if already fetched
    setLoadingRecent(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs/recent`, {
        params: { limit: 3 }
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
      if (totalBlogsCount !== -1) return; // Avoid fetching if already fetched
      setTotalBlogsCount(0); // Reset count to 0 while fetching
      const res = await axios.get(`${BASE_URL}/api/blogs/count`);
      setTotalBlogsCount(res.data.totalCount);
    } catch (err) {
      console.error('Error fetching blogs count:', err);
    }
  };

  const fetchAllBlogs = async (page = 1, limit = 6) => {
    setLoadingAll(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs/published`, {
        params: { page, limit }
      });
      setAllBlogs(res.data.blogs);
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
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogContext);


// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

// const BlogContext = createContext();

// export const BlogProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState({ data: [], totalCount: 0 });
//   const [loading, setLoading] = useState(false);

//   const BASE_URL = import.meta.env.VITE_BACKEND_URL;

//   const fetchPublishedBlogs = async (page = 1, limit = 6) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/blogs/published`, {
//         params: { page, limit }
//       });
//       setBlogs({
//         data: res.data.blogs,
//         totalCount: res.data.totalCount
//       });
//     } catch (err) {
//       console.error('Error fetching blogs:', err);
//     } finally {
//       setTimeout(() => {
//         setLoading(false);
//       }, 1000); // Reduced timeout for better UX
//     }
//   };

//   const getBlogById = (id) => blogs.data.find((blog) => blog._id === id) || null;

//   return (
//     <BlogContext.Provider
//       value={{
//         blogs,
//         getBlogById,
//         fetchPublishedBlogs,
//         loading,
//       }}
//     >
//       {children}
//     </BlogContext.Provider>
//   );
// };

// export const useBlogs = () => useContext(BlogContext);