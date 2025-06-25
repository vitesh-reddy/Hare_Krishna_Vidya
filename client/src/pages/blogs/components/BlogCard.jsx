import React from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

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

export const BlogCard = React.memo(({ blog }) => {
  return (
  <div className="flex flex-col mb-[1rem]">
    <img
      src={blog.image || '/assets/placeholder.png'}
      alt={blog.title}
      className="w-full h-[13rem] object-cover mb-[0.75rem]"
    />
    <p className="text-[0.875rem] self-start text-[#6941C6] font-medium mb-[0.35rem]">
      {blog.author} • {new Date(blog.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })}
    </p>
    <div className='flex justify-between items-start mb-[0.75rem]'>
      <p className="text-[1.25rem] text-start font-semibold text-[#101828] line-clamp-2">
        {blog.title}
      </p>
      <svg className='mt-[0.25rem]' width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <p className="text-[0.875rem] text-start text-[#667085] mb-[0.75rem] line-clamp-2">{blog.excerpt}</p>
    <div className="flex items-start flex-wrap gap-[0.5rem]">
      {blog?.tags?.map((tag, index) => {
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
)});