import React, { useEffect } from 'react';
import { useBlogs } from '../../../contexts/BlogContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/common/Loader';

// Tag color pool
const tagColors = [
  // Original Set (all kept)
  { bg: '#F0F9FF', text: '#026AA2' }, // Soft blue
  { bg: '#FDF2FA', text: '#C11574' }, // Blush pink
  { bg: '#ECFDF3', text: '#027A48' }, // Mint green
  { bg: '#F9F5FF', text: '#6941C6' }, // Lavender purple
  { bg: '#FFFAF5', text: '#C4320A' }, // Peach orange
  { bg: '#EEF4FF', text: '#175CD3' }, // Sky blue

  // Set 3 (kept only those not too similar)
  { bg: '#FEF2F2', text: '#DC2626' }, // Soft red
  { bg: '#FFFBEB', text: '#F59E0B' }, // Warm yellow-orange
  { bg: '#FFF7FB', text: '#DB2777' }, // Vivid pink
];



let lastColorIndex = -1;
const getRandomColor = () => {
  let index;
  do {
    index = Math.floor(Math.random() * tagColors.length);
  } while (index === lastColorIndex && tagColors.length > 1);

  lastColorIndex = index;
  return tagColors[index];
};

const RecentBlogs = React.memo(() => {
  const { recentBlogs, loadingRecent, fetchRecentBlogs } = useBlogs();
  const navigate = useNavigate();  

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  if (loadingRecent) return <Loader />;
  if (!recentBlogs.length) return <div className="text-center">No recent blogs available</div>;

  return (
    <section className="w-[85vw] py-[1.5rem] mt-[1rem]">
      <h2 className="text-[1.4rem] font-semibold mb-[1.35rem] text-[#101828]">Recent blog posts</h2>

      <div className="flex flex-col md:flex-row gap-[2rem] w-full">
        <div className="w-full md:w-[50%] cursor-pointer" onClick={() => handleBlogClick(recentBlogs[0]._id)}>
          <div className="flex flex-col gap-[0.75rem]">
            <img
              src={recentBlogs[0].image || '/assets/placeholder.png'}
              alt={recentBlogs[0].title}
              className="w-full h-[13rem] object-cover"
            />
            <p className="text-[0.875rem] text-[#6941C6] font-medium">
              {recentBlogs[0].author} • {new Date(recentBlogs[0].date).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </p>
            <div className="flex justify-between items-center pr-[1rem]">
              <p className="text-[1.25rem] font-semibold text-[#101828] line-clamp-2">{recentBlogs[0].title}</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[0.9rem] text-[#667085] line-clamp-3">{recentBlogs[0].excerpt}</p>
            <div className="flex flex-wrap gap-[0.5rem]">
              {recentBlogs[0].tags.map((tag, index) => {
                const { bg, text } = getRandomColor();
                return (
                  <span
                    key={index}
                    className="px-[0.5rem] py-[0.125rem] text-[0.75rem] rounded-[1rem] font-medium"
                    style={{ backgroundColor: bg, color: text }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[50%] flex flex-col gap-[1.5rem]">
          {recentBlogs.slice(1).map((blog) => (
            <div key={blog._id} className="flex flex-col md:flex-row gap-[1rem] md:h-[11rem] pr-[2rem] cursor-pointer" onClick={() => handleBlogClick(blog._id)}>
              <img
                src={blog.image || '/assets/blog placeholder.jpg'}
                alt={blog.title}
                onError={(e) => {e.target.src = '/assets/blog placeholder.jpg'}}
                className="w-full md:w-[52.5%] h-[13rem] md:h-full object-cover shrink-0"
              />
              <div className="flex flex-col justify-start pt-1 gap-[0.5rem]">
                <p className="text-[0.75rem] text-[#6941C6] font-medium">
                  {blog.author} • {new Date(blog.date).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-[1rem] font-semibold text-[#101828] line-clamp-2 leading-[1.25rem]">{blog.title}</p>
                <p className="text-[0.875rem] text-[#667085] line-clamp-2">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-[0.5rem]">
                  {blog.tags.map((tag, index) => {
                    const { bg, text } = getRandomColor();
                    return (
                      <span
                        key={index}
                        className="px-[0.5rem] py-[0.125rem] text-[0.7rem] rounded-[1rem] font-medium"
                        style={{ backgroundColor: bg, color: text }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default RecentBlogs;