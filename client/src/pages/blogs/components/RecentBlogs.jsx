import React from 'react';

const blogData = [
  {
    id: 1,
    author: 'Olivia Rhye',
    date: '20 Jan 2022',
    title: 'UX review presentations',
    description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/assets/mission.png',
    tags: ['Design', 'Research', 'Presentation'],
  },
  {
    id: 2,
    author: 'Phoenix Baker',
    date: '19 Jan 2022',
    title: 'Migrating to Linear 101',
    description: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.',
    image: '/assets/img_image_18.png',
    tags: ['Design', 'Research'],
  },
  {
    id: 3,
    author: 'Lana Steiner',
    date: '18 Jan 2022',
    title: 'Building your API Stack',
    description: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    image: '/assets/img_image_19.png',
    tags: ['Design', 'Research'],
  }
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

const RecentBlogs = React.memo(() => {
  return (
    <section className="max-w-[75rem] py-[1.5rem] mx-auto">
      <h2 className="text-[1.5rem] font-semibold mb-[1.5rem] text-[#101828]">Recent blog posts</h2>

      <div className="flex flex-col md:flex-row gap-[1rem]">
        {/* Left blog - main feature */}
        <div className="w-full md:w-[50%]">
          <div className="flex flex-col">
            <img
              src={blogData[0].image}
              alt={blogData[0].title}
              className="w-full h-[12rem] object-cover mb-[0.75rem]"
            />
            <p className="text-[0.875rem] text-[#6941C6] font-medium mb-[0.25rem]">
              {blogData[0].author} • {blogData[0].date}
            </p>
            <div className='flex justify-between items-center pr-[1rem]'>
              <p className="text-[1.5rem] font-semibold text-[#101828] mb-[0.25rem]">{blogData[0].title}</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[1rem] text-[#475467] mb-[0.75rem]">{blogData[0].description}</p>
            <div className="flex flex-wrap gap-[0.5rem]">
              {blogData[0].tags.map((tag, index) => {
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
        </div>

        {/* Right side - 2 blogs stacked vertically */}
        <div className="w-full md:w-[50%] flex flex-col gap-[1rem]">
          {blogData.slice(1).map(({ id, author, date, title, description, image, tags }) => (
            <div key={id} className="flex flex-row gap-[0.75rem] h-[10rem] pr-[2rem]">
              <img
                src={image}
                alt={title}
                className="w-[40%] h-full object-cover shrink-0"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-[0.875rem] text-[#6941C6] font-medium mb-[0.25rem]">
                    {author} • {date}
                  </p>
                  <div className='flex justify-between items-center'>
                    <p className="text-[1.125rem] font-semibold text-[#101828] mb-[0.25rem]">{title}</p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>    
                  </div>              
                  <p className="text-[0.875rem] text-[#475467] line-clamp-2">{description}</p>
                </div>
                <div className="flex flex-wrap gap-[0.5rem] mt-[0.25rem]">
                  {tags.map((tag, index) => {
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default RecentBlogs;