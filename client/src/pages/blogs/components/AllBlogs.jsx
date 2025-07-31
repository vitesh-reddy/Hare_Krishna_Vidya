import React, { useState, useEffect } from 'react';
import { useBlogs } from '../../../contexts/BlogContext';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from './BlogCard';
import Loader from '../../../components/common/Loader';

const AllBlogs = () => {
  const { allBlogs, totalBlogsCount, fetchTotalBlogsCount, fetchAllBlogs, loadingAll, currentPage, setCurrentPage } = useBlogs();
  const navigate = useNavigate();
  const postsPerPage = 6;
  const totalPages = Math.ceil((totalBlogsCount - 3) / postsPerPage) || 1;

  useEffect(() => {
    fetchTotalBlogsCount();
  }, []);

  useEffect(() => {
    fetchAllBlogs(currentPage, postsPerPage);
  }, [currentPage]);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setTimeout(() => {
        window.location.hash = '#allBlogs';
      }, 100);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 6;
    const siblingCount = 1;

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

      const leftSiblingIndex = Math.max(3, currentPage - siblingCount);
      const rightSiblingIndex = Math.min(totalPages - 2, currentPage + siblingCount);

      if (leftSiblingIndex > 3) {
        pages.push(<span key="start-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
      }

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

      if (rightSiblingIndex < totalPages - 2) {
        pages.push(<span key="end-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
      }

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
    <section className="w-[85vw] max-w-[100rem] py-[2rem] mx-auto">
      <h2 id='allBlogs' className="text-[1.5rem] font-semibold mb-[1.5rem] text-[#101828]">All blog posts</h2>

      {loadingAll ? (
        <Loader/>
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

          <div className="flex items-center justify-center sm:justify-between gap-[0.25rem] sm:gap-[0.5rem]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loadingAll}
              className="sm:px-[0.75rem] sm:py-[0.25rem] text-[0.75rem] sm:text-[0.875rem] text-[#667085] disabled:opacity-50"
            >
              ← <p className='hidden sm:inline'>Previous</p>
            </button>
            <div>{renderPagination()}</div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loadingAll}
              className="sm:px-[0.75rem] sm:py-[0.25rem] text-[0.75rem] sm:text-[0.875rem] text-[#667085] disabled:opacity-50"
            >
              <p className='hidden sm:inline'> Next </p> →
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AllBlogs;