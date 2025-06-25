import React, { useState, useEffect } from 'react';
import { useBlogs } from '../../../contexts/BlogContext';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from './BlogCard';

const AllBlogs = () => {
  const { allBlogs, totalBlogsCount, fetchTotalBlogsCount, fetchAllBlogs, loadingAll } = useBlogs();
  const navigate = useNavigate();
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((totalBlogsCount - 3) / postsPerPage) || 1;

  useEffect(() => {
    fetchTotalBlogsCount();
    fetchAllBlogs(currentPage, postsPerPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setTimeout(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.hash = '#allBlogs'; // Scroll to the top of the section
      }, 100); // Delay to ensure smooth scroll after state update
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 6; // Total 6 page buttons excluding dots
    const siblingCount = 1; // One sibling on each side of current page

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-[0.75rem] py-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
              currentPage === i ? 'bg-[#F9F5FF] text-[#6941C6] font-medium' : 'text-[#667085]'
            }`}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show first two pages
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-[0.75rem] py-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
            currentPage === 1 ? 'bg-[#F9F5FF] text-[#6941C6] font-medium' : 'text-[#667085]'
          }`}
          disabled={currentPage === 1}
        >
          1
        </button>
      );
      if (totalPages > 1) {
        pages.push(
          <button
            key={2}
            onClick={() => handlePageChange(2)}
            className={`px-[0.75rem] py-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
              currentPage === 2 ? 'bg-[#F9F5FF] text-[#6941C6] font-medium' : 'text-[#667085]'
            }`}
            disabled={currentPage === 2}
          >
            2
        </button>
      );
    }

      // Calculate middle section
      const leftSiblingIndex = Math.max(3, currentPage - siblingCount);
      const rightSiblingIndex = Math.min(totalPages - 2, currentPage + siblingCount);

      // Add ellipsis after first two pages if needed
      if (leftSiblingIndex > 3) {
        pages.push(<span key="start-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
      }

      // Add middle pages
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i > 2 && i < totalPages - 1) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`px-[0.75rem] py-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
                currentPage === i ? 'bg-[#F9F5FF] text-[#6941C6] font-medium' : 'text-[#667085]'
              }`}
              disabled={currentPage === i}
            >
              {i}
            </button>
          );
        }
      }

      // Add ellipsis before last two pages if needed
      if (rightSiblingIndex < totalPages - 2) {
        pages.push(<span key="end-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
      }

      // Always show last two pages
      for (let i = Math.max(totalPages - 1, rightSiblingIndex + 1); i <= totalPages; i++) {
        if (i > 2) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`px-[0.75rem] py-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
                currentPage === i ? 'bg-[#F9F5FF] text-[#6941C6] font-medium' : 'text-[#667085]'
              }`}
              disabled={currentPage === i}
            >
              {i}
            </button>
          );
        }
      }
    }

    return pages;
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <section className="w-[85vw] py-[2rem] mx-auto">
      <h2 id='allBlogs' className="text-[1.5rem] font-semibold mb-[1.5rem] text-[#101828]">All blog posts</h2>

      {loadingAll ? (
        <div className="text-center">Loading...</div>
      ) : allBlogs.length === 0 ? (
        <div className="text-center">No blogs available</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.75rem] mb-[2rem]">
            {allBlogs.map((blog) => (
              <div key={blog._id} onClick={() => handleBlogClick(blog._id)} className="cursor-pointer">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-[0.5rem]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loadingAll}
              className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#667085] disabled:opacity-50"
            >
              ← Previous
            </button>
            <div>{renderPagination()}</div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loadingAll}
              className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#667085] disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AllBlogs;

// import React, { useState, useEffect } from 'react';
// import { useBlogs } from '../../../contexts/BlogContext';
// import { useNavigate } from 'react-router-dom';
// import { BlogCard } from './BlogCard';

// const AllBlogs = () => {
//   const { allBlogs, totalBlogsCount, fetchTotalBlogsCount, fetchAllBlogs, loadingAll } = useBlogs();
//   const navigate = useNavigate();
//   const postsPerPage = 6;
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil((totalBlogsCount - 3) / postsPerPage) || 1;

//   useEffect(() => {
//     fetchTotalBlogsCount();
//     fetchAllBlogs(currentPage, postsPerPage);
//   }, [currentPage]);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const renderPagination = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - 2);
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage < maxVisiblePages - 1) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     if (startPage > 1) {
//       pages.push(<span key="start-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-[0.75rem] py-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
//             currentPage === i ? 'bg-[#F9F5FF] text-[#6941C6] font-medium' : 'text-[#667085]'
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       pages.push(<span key="end-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
//     }

//     return pages;
//   };

//   const handleBlogClick = (blogId) => {
//     navigate(`/blogs/${blogId}`);
//   };

//   return (
//     <section className="w-[85vw] py-[2rem] mx-auto">
//       <h2 className="text-[1.5rem] font-semibold mb-[1.5rem] text-[#101828]">All blog posts</h2>

//       {loadingAll ? (
//         <div className="text-center">Loading...</div>
//       ) : allBlogs.length === 0 ? (
//         <div className="text-center">No blogs available</div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.75rem] mb-[2rem]">
//             {allBlogs.map((blog) => (
//               <div key={blog._id} onClick={() => handleBlogClick(blog._id)} className="cursor-pointer">
//                 <BlogCard blog={blog} />
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center justify-between gap-[0.5rem]">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1 || loadingAll}
//               className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#667085] disabled:opacity-50"
//             >
//               ← Previous
//             </button>
//             <div>{renderPagination()}</div>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages || loadingAll}
//               className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#667085] disabled:opacity-50"
//             >
//               Next →
//             </button>
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default AllBlogs;

// import React, { useState, useEffect, useMemo } from 'react';
// import { useBlogs } from '../../../contexts/BlogContext';

// // Tag color pool
// const tagColors = [
//   { bg: '#F9F5FF', text: '#6941C6' },
//   { bg: '#EEF4FF', text: '#3538CD' },
//   { bg: '#ECFDF3', text: '#027A48' },
//   { bg: '#F9F5FF', text: '#6941C6' },
//   { bg: '#FFFAF5', text: '#C4320A' },
//   { bg: '#EEF4FF', text: '#175CD3' },
// ];

// const getRandomColor = () => tagColors[Math.floor(Math.random() * tagColors.length)];

// // Blog Card Component (Memoized for optimization)
// export const BlogCard = React.memo(({ blog }) => (
//   <div className="flex flex-col mb-[1rem]">
//     {console.log(blog)}
//     <img
//       src={blog.image || '/assets/placeholder.png'}
//       alt={blog.title}
//       className="w-full h-[13rem] object-cover mb-[0.75rem]"
//     />
//     <p className="text-[0.875rem] self-start text-[#6941C6] font-medium mb-[0.35rem]">
//       {blog.author} • {new Date(blog.date).toLocaleDateString('en-US', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       })}
//     </p>
//     <div className='flex justify-between items-center mb-[0.75rem]'>
//       <p className="text-[1.25rem] text-start font-semibold text-[#101828] line-clamp-2">
//         {blog.title}
//       </p>
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     </div>
//     <p className="text-[0.875rem] text-[#667085] mb-[0.75rem] line-clamp-2">{blog.excerpt}</p>
//     <div className="flex items-start flex-wrap gap-[0.5rem]">
//       {blog?.tags?.map((tag, index) => {
//         const { bg, text } = getRandomColor();
//         return (
//           <span
//             key={index}
//             className="px-[0.5rem] py-[0.25rem] text-[0.75rem] rounded-[1rem] font-medium"
//             style={{ backgroundColor: bg, color: text }}
//           >
//             {tag}
//           </span>
//         );
//       })}
//     </div>
//   </div>
// ));

// // Main AllBlogs Component
// const AllBlogs = () => {
//   const { blogs, fetchPublishedBlogs, loading } = useBlogs();
//   const postsPerPage = 6;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch blogs with pagination
//   useEffect(() => {
//     if(blogs.length) return
//     const fetchBlogs = async () => {
//       try {
//         await fetchPublishedBlogs(currentPage, postsPerPage);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   // Update total pages based on fetched blogs
//   useEffect(() => {
//     // Assuming backend returns total count in response headers or data
//     setTotalPages(Math.ceil(blogs.totalCount / postsPerPage) || 1);
//   }, [blogs]);

//   // Memoized paginated blogs
//   const paginatedBlogs = useMemo(() => blogs.data || [], [blogs]);

//   // Handle page change
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Generate pagination buttons
//   const renderPagination = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - 2);
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage < maxVisiblePages - 1) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     if (startPage > 1) {
//       pages.push(<span key="start-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-[0.75rem] py-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
//             currentPage === i ? 'bg-[#F9F5FF] text-[#6941C6] font-medium' : 'text-[#667085]'
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       pages.push(<span key="end-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
//     }

//     return pages;
//   };

//   return (
//     <section className="w-[85vw] py-[2rem] mx-auto">
//       <h2 className="text-[1.5rem] font-semibold mb-[1.5rem] text-[#101828]">All blog posts</h2>

//       {loading ? (
//         <div className="text-center">Loading...</div>
//       ) : paginatedBlogs.length === 0 ? (
//         <div className="text-center">No blogs available</div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.75rem] mb-[2rem]">
//             {paginatedBlogs.map((blog) => (
//               <BlogCard key={blog._id} blog={blog} />
//             ))}
//           </div>

//           <div className="flex items-center justify-between gap-[0.5rem]">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1 || loading}
//               className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#667085] disabled:opacity-50"
//             >
//               ← Previous
//             </button>
//             <div>{renderPagination()}</div>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages || loading}
//               className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#667085] disabled:opacity-50"
//             >
//               Next →
//             </button>
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default AllBlogs;



