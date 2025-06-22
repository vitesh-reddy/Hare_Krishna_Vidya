import React from 'react';
import HeroSection from './components/HeroSection';
import RecentBlogs from './components/RecentBlogs';
import AllBlogs from './components/AllBlogs';
import BlogView from './components/BlogView';

const BlogPage = () => {
  return (
    <main className="flex flex-col items-center font-inter bg-white px-[2rem] sm:px-[2rem] md:px-[5rem] lg:px-[8rem]">
      <BlogView/>
      <HeroSection />
      <RecentBlogs />
      <AllBlogs />
    </main>
  );
};

export default BlogPage;
