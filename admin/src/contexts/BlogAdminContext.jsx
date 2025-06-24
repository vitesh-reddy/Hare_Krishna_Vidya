import React, { createContext, useContext, useState, useCallback, useEffect, useRef, cache } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogAdminContext = createContext();
export const useBlogsAdmin = () => useContext(BlogAdminContext);

export const BlogAdminProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [totalBlogsCount, setTotalBlogsCount] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [publishedBlogsCount, setPublishedBlogsCount] = useState(0);

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

  // 🧠 Blog Cache Map: key -> `${page}-${limit}`, value -> { blogs, totalCount }
  const blogCache = useRef({});

  const fetchPublishedBlogsCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/blogs/published-count`);
      setPublishedBlogsCount(response.data.count);
    } catch (error) {
      toast.error('Failed to fetch Published Blogs.');
    } finally {
      setLoading(false);
    }    
  }, [BASE_URL]);

  useEffect(() => {
    if (totalBlogsCount === -1) fetchPublishedBlogsCount();  
  }, []);

  const fetchBlogs = useCallback(async (page = 1, limit = 10) => {
    const cacheKey = `${page}-${limit}`;
    // ✅ Serve from cache if available
    if (blogCache.current[cacheKey]) {
      const cached = blogCache.current[cacheKey];
      setPosts(cached.blogs);
      setTotalBlogsCount(cached.totalCount);
      return;
    }
    
    // 🚀 Otherwise fetch from server
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/blogs/all`, {
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
  }, [BASE_URL]);

  const invalidateCache = () => {
    blogCache.current = {};
  };

  const createBlog = async (data, imageFile, page, limit) => {
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

  const updateBlog = async (id, data, imageFile, page, limit) => {
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
      await axios.put(`${BASE_URL}/blogs/update/${id}`, updatedBlog);

      toast.success('Blog post updated successfully.');
      invalidateCache();
      await fetchBlogs(page, limit);
    } catch (error) {
      toast.error('Failed to update blog post.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id, page, limit) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/blogs/delete/${id}`);
      toast.success('Blog post deleted successfully.');

      invalidateCache();
      await fetchBlogs(page, limit);
    } catch (error) {
      toast.error('Failed to delete blog post.');
    } finally {
      setLoading(false);
    }
  };

  const toggleBlogStatus = async (id, page, limit) => {
    setLoading(true);
    try {
      await axios.patch(`${BASE_URL}/blogs/toggle-status/${id}`);
      toast.success('Blog status updated.');

      invalidateCache();
      await fetchBlogs(page, limit);
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
        totalBlogsCount,
        publishedBlogsCount,
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




// import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const BlogAdminContext = createContext();

// export const useBlogsAdmin = () => useContext(BlogAdminContext);

// export const BlogAdminProvider = ({ children }) => {
//   const [posts, setPosts] = useState([]);
//   const [totalBlogsCount, setTotalBlogsCount] = useState(-1);
//   const [loading, setLoading] = useState(false);
//   const [publishedBlogsCount, setPublishedBlogsCount] = useState(0);

//   const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

//   const fetchPublishedBlogsCount = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${BASE_URL}/blogs/published-count`);
//       setPublishedBlogsCount(response.data.count);
//     } catch (error) {
//       toast.error('Failed to fetch Published Blogs.');
//     } finally {
//       setLoading(false);
//     }    
//   }, [BASE_URL])

//   useEffect(() => {
//     if(totalBlogsCount === -1) 
//       fetchPublishedBlogsCount();  
//   }, [])  

//   const fetchBlogs = useCallback(async (page = 1, limit = 10) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${BASE_URL}/blogs/all`, {
//         params: { page, limit }
//       });
//       setPosts(response.data.blogs);
//       setTotalBlogsCount(response.data.totalCount);
//     } catch (error) {
//       toast.error('Failed to fetch blog posts.');
//     } finally {
//       setLoading(false);
//     }
//   }, [BASE_URL]);

//   const createBlog = async (data, imageFile, page, limit) => {
//     setLoading(true);
//     try {
//       let imageUrl = data.image;
//       if (imageFile) {
//         const formData = new FormData();
//         formData.append('image', imageFile);
//         const uploadResponse = await axios.post(`${BASE_URL}/blogs/upload-image`, formData);
//         imageUrl = uploadResponse.data.url;
//       }

//       const newBlog = { ...data, image: imageUrl };
//       const response = await axios.post(`${BASE_URL}/blogs/create`, newBlog);
//       const createdBlog = response.data.item;
//       setPosts((prevPosts) => [...prevPosts, createdBlog]);
//       await fetchBlogs(page, limit); // Refresh current page
//       toast.success('Blog post created successfully.');
//     } catch (error) {
//       toast.error('Failed to create blog post.');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateBlog = async (id, data, imageFile, page, limit) => {
//     setLoading(true);
//     try {
//       let imageUrl = data.image;
//       if (imageFile) {
//         const formData = new FormData();
//         formData.append('image', imageFile);
//         const uploadResponse = await axios.post(`${BASE_URL}/blogs/upload-image`, formData);
//         imageUrl = uploadResponse.data.url;
//       }

//       const updatedBlog = { ...data, image: imageUrl };
//       const response = await axios.put(`${BASE_URL}/blogs/update/${id}`, updatedBlog);
//       const updatedBlogFromServer = response.data.item;
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === id ? updatedBlogFromServer : post
//         )
//       );
//       await fetchBlogs(page, limit); // Refresh current page
//       toast.success('Blog post updated successfully.');
//     } catch (error) {
//       toast.error('Failed to update blog post.');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteBlog = async (id, page, limit) => {
//     setLoading(true);
//     try {
//       await axios.delete(`${BASE_URL}/blogs/delete/${id}`);
//       await fetchBlogs(page, limit); // Refresh current page
//       toast.success('Blog post deleted successfully.');
//     } catch (error) {
//       toast.error('Failed to delete blog post.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleBlogStatus = async (id, page, limit) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(`${BASE_URL}/blogs/toggle-status/${id}`);
//       const updatedBlog = response.data.item;
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === id ? updatedBlog : post
//         )
//       );
//       await fetchBlogs(page, limit); // Refresh current page
//       toast.success('Blog status updated.');
//     } catch (error) {
//       toast.error('Failed to update blog status.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <BlogAdminContext.Provider
//       value={{
//         posts,
//         totalBlogsCount,
//         publishedBlogsCount,
//         fetchBlogs,
//         createBlog,
//         updateBlog,
//         deleteBlog,
//         toggleBlogStatus,
//         loading,
//       }}
//     >
//       {children}
//     </BlogAdminContext.Provider>
//   );
// };