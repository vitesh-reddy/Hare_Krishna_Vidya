import React, { useState, useMemo } from 'react';

// Mock data for blog posts
const blogData = [
  { id: 1, author: 'Alec Whitten', date: '17 Jan 2022', title: 'Bill Walsh leadership lessons', description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?', image: '/assets/img_1.png', tags: ['Leadership', 'Management'] },
  { id: 2, author: 'Demi Wilkinson', date: '16 Jan 2022', title: 'PM mental models', description: 'Mental models are simple expressions of complex processes or relationships.', image: '/assets/img_2.png', tags: ['Product', 'Research', 'Frameworks'] },
  { id: 3, author: 'Candice Wu', date: '15 Jan 2022', title: 'What is wireframing?', description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.', image: '/assets/img_3.png', tags: ['Design', 'Research'] },
  { id: 4, author: 'Natali Craig', date: '14 Jan 2022', title: 'How collaboration makes us better designers', description: 'Collaboration can make our teams stronger, and our individual designs better.', image: '/assets/img_4.png', tags: ['Design', 'Research'] },
  { id: 5, author: 'Drew Cano', date: '13 Jan 2022', title: 'Our top 10 Javascript frameworks to use', description: 'JavaScript frameworks make development easy with extensive features and functionalities.', image: '/assets/img_5.png', tags: ['Software Development', 'Tools', 'SaaS'] },
  { id: 6, author: 'Orlando Diggs', date: '12 Jan 2022', title: 'Podcast: Creating a better CX Community', description: 'Starting a community doesn’t need to be complicated, but how do you get started?', image: '/assets/img_6.png', tags: ['Podcasts', 'Customer Success'] },
  { id: 7, author: 'Jane Doe', date: '11 Jan 2022', title: 'Design systems 101', description: 'Learn the basics of design systems and their impact.', image: '/assets/img_7.png', tags: ['Design', 'Systems'] },
  { id: 8, author: 'Alec Whitten', date: '17 Jan 2022', title: 'Bill Walsh leadership lessons', description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?', image: '/assets/img_1.png', tags: ['Leadership', 'Management'] },
  { id: 9, author: 'Demi Wilkinson', date: '16 Jan 2022', title: 'PM mental models', description: 'Mental models are simple expressions of complex processes or relationships.', image: '/assets/img_2.png', tags: ['Product', 'Research', 'Frameworks'] },
  { id: 10, author: 'Candice Wu', date: '15 Jan 2022', title: 'What is wireframing?', description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.', image: '/assets/img_3.png', tags: ['Design', 'Research'] },
  { id: 11, author: 'Natali Craig', date: '14 Jan 2022', title: 'How collaboration makes us better designers', description: 'Collaboration can make our teams stronger, and our individual designs better.', image: '/assets/img_4.png', tags: ['Design', 'Research'] },
  { id: 12, author: 'Drew Cano', date: '13 Jan 2022', title: 'Our top 10 Javascript frameworks to use', description: 'JavaScript frameworks make development easy with extensive features and functionalities.', image: '/assets/img_5.png', tags: ['Software Development', 'Tools', 'SaaS'] },  
  { id: 13, author: 'John Smith', date: '10 Jan 2022', title: 'Agile methodologies', description: 'A deep dive into Agile practices for teams.', image: '/assets/img_8.png', tags: ['Agile', 'Management'] },
  { id: 14, author: 'Emily Brown', date: '9 Jan 2022', title: 'UX trends in 2022', description: 'What’s shaping the future of UX design this year.', image: '/assets/img_9.png', tags: ['UX', 'Trends'] },
  { id: 15, author: 'Michael Lee', date: '8 Jan 2022', title: 'Building scalable APIs', description: 'Best practices for creating scalable APIs.', image: '/assets/img_10.png', tags: ['APIs', 'Development'] },
  { id: 16, author: 'Alec Whitten', date: '17 Jan 2022', title: 'Bill Walsh leadership lessons', description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?', image: '/assets/img_1.png', tags: ['Leadership', 'Management'] },
  { id: 17, author: 'Demi Wilkinson', date: '16 Jan 2022', title: 'PM mental models', description: 'Mental models are simple expressions of complex processes or relationships.', image: '/assets/img_2.png', tags: ['Product', 'Research', 'Frameworks'] },
  { id: 18, author: 'Candice Wu', date: '15 Jan 2022', title: 'What is wireframing?', description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.', image: '/assets/img_3.png', tags: ['Design', 'Research'] },
  { id: 19, author: 'Natali Craig', date: '14 Jan 2022', title: 'How collaboration makes us better designers', description: 'Collaboration can make our teams stronger, and our individual designs better.', image: '/assets/img_4.png', tags: ['Design', 'Research'] },
  { id: 20, author: 'Drew Cano', date: '13 Jan 2022', title: 'Our top 10 Javascript frameworks to use', description: 'JavaScript frameworks make development easy with extensive features and functionalities.', image: '/assets/img_5.png', tags: ['Software Development', 'Tools', 'SaaS'] },  
  { id: 21, author: 'Alec Whitten', date: '17 Jan 2022', title: 'Bill Walsh leadership lessons', description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?', image: '/assets/img_1.png', tags: ['Leadership', 'Management'] },
  { id: 22, author: 'Demi Wilkinson', date: '16 Jan 2022', title: 'PM mental models', description: 'Mental models are simple expressions of complex processes or relationships.', image: '/assets/img_2.png', tags: ['Product', 'Research', 'Frameworks'] },
  { id: 23, author: 'Candice Wu', date: '15 Jan 2022', title: 'What is wireframing?', description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.', image: '/assets/img_3.png', tags: ['Design', 'Research'] },
  { id: 24, author: 'Natali Craig', date: '14 Jan 2022', title: 'How collaboration makes us better designers', description: 'Collaboration can make our teams stronger, and our individual designs better.', image: '/assets/img_4.png', tags: ['Design', 'Research'] },
  { id: 25, author: 'Drew Cano', date: '13 Jan 2022', title: 'Our top 10 Javascript frameworks to use', description: 'JavaScript frameworks make development easy with extensive features and functionalities.', image: '/assets/img_5.png', tags: ['Software Development', 'Tools', 'SaaS'] },
  { id: 26, author: 'Orlando Diggs', date: '12 Jan 2022', title: 'Podcast: Creating a better CX Community', description: 'Starting a community doesn’t need to be complicated, but how do you get started?', image: '/assets/img_6.png', tags: ['Podcasts', 'Customer Success'] },
  { id: 27, author: 'Jane Doe', date: '11 Jan 2022', title: 'Design systems 101', description: 'Learn the basics of design systems and their impact.', image: '/assets/img_7.png', tags: ['Design', 'Systems'] },
  { id: 28, author: 'Alec Whitten', date: '17 Jan 2022', title: 'Bill Walsh leadership lessons', description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?', image: '/assets/img_1.png', tags: ['Leadership', 'Management'] },
  { id: 29, author: 'Demi Wilkinson', date: '16 Jan 2022', title: 'PM mental models', description: 'Mental models are simple expressions of complex processes or relationships.', image: '/assets/img_2.png', tags: ['Product', 'Research', 'Frameworks'] },
  { id: 30, author: 'Candice Wu', date: '15 Jan 2022', title: 'What is wireframing?', description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.', image: '/assets/img_3.png', tags: ['Design', 'Research'] },
  { id: 31, author: 'Alec Whitten', date: '17 Jan 2022', title: 'Bill Walsh leadership lessons', description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?', image: '/assets/img_1.png', tags: ['Leadership', 'Management'] },
  { id: 32, author: 'Demi Wilkinson', date: '16 Jan 2022', title: 'PM mental models', description: 'Mental models are simple expressions of complex processes or relationships.', image: '/assets/img_2.png', tags: ['Product', 'Research', 'Frameworks'] },
  { id: 33, author: 'Candice Wu', date: '15 Jan 2022', title: 'What is wireframing?', description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.', image: '/assets/img_3.png', tags: ['Design', 'Research'] },
  { id: 34, author: 'Natali Craig', date: '14 Jan 2022', title: 'How collaboration makes us better designers', description: 'Collaboration can make our teams stronger, and our individual designs better.', image: '/assets/img_4.png', tags: ['Design', 'Research'] },
  { id: 35, author: 'Drew Cano', date: '13 Jan 2022', title: 'Our top 10 Javascript frameworks to use', description: 'JavaScript frameworks make development easy with extensive features and functionalities.', image: '/assets/img_5.png', tags: ['Software Development', 'Tools', 'SaaS'] },
  { id: 36, author: 'Orlando Diggs', date: '12 Jan 2022', title: 'Podcast: Creating a better CX Community', description: 'Starting a community doesn’t need to be complicated, but how do you get started?', image: '/assets/img_6.png', tags: ['Podcasts', 'Customer Success'] },
  { id: 37, author: 'Jane Doe', date: '11 Jan 2022', title: 'Design systems 101', description: 'Learn the basics of design systems and their impact.', image: '/assets/img_7.png', tags: ['Design', 'Systems'] },
  { id: 38, author: 'Alec Whitten', date: '17 Jan 2022', title: 'Bill Walsh leadership lessons', description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?', image: '/assets/img_1.png', tags: ['Leadership', 'Management'] },
  { id: 39, author: 'Demi Wilkinson', date: '16 Jan 2022', title: 'PM mental models', description: 'Mental models are simple expressions of complex processes or relationships.', image: '/assets/img_2.png', tags: ['Product', 'Research', 'Frameworks'] },
  { id: 40, author: 'Candice Wu', date: '15 Jan 2022', title: 'What is wireframing?', description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.', image: '/assets/img_3.png', tags: ['Design', 'Research'] },
];

// Tag color pool
const tagColors = [
  { bg: '#F0F9FF', text: '#026AA2' },
  { bg: '#FDF2FA', text: '#C11574' },
  { bg: '#ECFDF3', text: '#027A48' },
  { bg: '#F9F5FF', text: '#6941C6' },
  { bg: '#FFFAF5', text: '#C4320A' },
  { bg: '#EEF4FF', text: '#175CD3' },
];

const getRandomColor = () => tagColors[Math.floor(Math.random() * tagColors.length)];

// Blog Card Component (Memoized for optimization)
const BlogCard = React.memo(({ blog }) => (
  <div className="flex flex-col">
    <img
      src={blog.image}
      alt={blog.title}
      className="w-full h-[12rem] object-cover rounded-[0.5rem] mb-[0.75rem]"
    />
    <p className="text-[0.875rem] text-[#6941C6] font-medium mb-[0.25rem]">
      {blog.author} • {blog.date}
    </p>
    <h3 className="text-[1.25rem] font-semibold text-[#101828] mb-[0.25rem] flex items-center">
      {blog.title}
      <span className="ml-[0.5rem] text-[#667085]">→</span>
    </h3>
    <p className="text-[0.875rem] text-[#475467] mb-[0.75rem] line-clamp-2">{blog.description}</p>
    <div className="flex flex-wrap gap-[0.5rem]">
      {blog.tags.map((tag, index) => {
        const { bg, text } = getRandomColor();
        return (
          <span
            key={index}
            className="px-[0.5rem] py-[0.25rem] text-[0.75rem] rounded-[1rem] font-medium"
            style={{ backgroundColor: bg, color: text }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  </div>
));

// Main AllBlogs Component
const AllBlogs = () => {
  const postsPerPage = 6; // Match the image layout (3x2 grid)
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination data
  const totalPages = Math.ceil(blogData.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedBlogs = useMemo(() => blogData.slice(startIndex, startIndex + postsPerPage), [startIndex]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ bottom: 0, behavior: 'smooth' }); // Smooth scroll to top on page change
    }
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(<span key="start-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-[0.75rem] py-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
            currentPage === i ? 'bg-[#F9F5FF] text-[#6941C6] font-medium' : 'text-[#667085]'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(<span key="end-ellipsis" className="px-[0.5rem] text-[#667085]">...</span>);
    }

    return pages;
  };

  return (
    <section className="max-w-[75rem] py-[2rem] mx-auto">
      <h2 className="text-[1.5rem] font-semibold mb-[1.5rem] text-[#101828]">All blog posts</h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem] mb-[2rem]">
        {paginatedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-[0.5rem]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#667085] disabled:opacity-50"
        >
          ← Previous
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#667085] disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default AllBlogs;