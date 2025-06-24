import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogs } from '../../../contexts/BlogContext';
import { BlogCard } from './BlogCard';
import { ArrowLeft } from 'lucide-react';
import Loader from '../../../components/common/Loader';

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBlogById, fetchAllBlogs, allBlogs } = useBlogs();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      const blogData = await fetchBlogById(id);
      setBlog(blogData);
      if (allBlogs.length < 3) {
        await fetchAllBlogs(1, 6);
      }
      setLoading(false);
    };
    loadBlog();
  }, [id]);

  const otherBlogs = allBlogs.filter((b) => b._id !== id).slice(0, 3);

  if (loading) return <Loader />;
  if (!blog) return <div className="text-center py-[2rem]">Blog not found</div>;

  const currentUrl = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Check this out!");

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${text}%20${currentUrl}`;
  const telegramUrl = `https://t.me/share/url?url=${currentUrl}&text=${text}`;

  return (
    <div className="w-full bg-[#fdfcf9] text-[#1f1f1f]">
      <div
        className="relative font-playfair w-full h-[35rem] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${blog.image || '/assets/placeholder.png'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <button
          onClick={() => navigate(-1)}
          className="absolute z-50 top-[1.5rem] md:top-[2rem] left-[1.5rem] md:left-[2rem] text-[0.75rem] md:text-[0.9rem] px-[0.6rem] md:px-[0.75rem] py-[0.4rem] md:py-[0.45rem] bg-white/10 rounded-full"
        >
          <p className="flex items-center justify-center gap-[0.25rem]">
            <ArrowLeft className="w-[0.85rem]" /> Back to Blogs
          </p>
        </button>
        <div className="relative w-full z-10 px-[1.5rem]">
          <h1 className="w-[70%] mx-auto text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold leading-tight line-clamp-4">
            {blog.title}
          </h1>
          <p className="w-[80%] mx-auto text-[1rem] lg:text-[1.125rem] mt-[0.5rem] line-clamp-4">
            {blog.excerpt}
          </p>
          <div className="text-[0.875rem] mt-[0.5rem] opacity-80">
            <p className="leading-[1rem] text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] flex items-center justify-center gap-[0.5rem]">
              <img src="/assets/Profile Icon.svg" alt="" draggable={false} />
              By {blog.author} &nbsp; • &nbsp;
              <img src="/assets/Calendar Icon.svg" alt="" draggable={false} />
              {new Date(blog.date).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      <div id='blogContent' className="w-[60vw] mt-[2rem] mx-auto" dangerouslySetInnerHTML={{ __html: blog.content }} />

      <div className="text-center font-playfair mt-[3rem] bg-gradient-to-r from-[#f4a2611a] to-[#5881571a] py-[4rem]">
        <p className="text-[2.25rem] font-semibold mb-[1rem]">Join the Movement</p>
        <p className="mb-[1rem] text-[1rem] mx-auto w-[80%]">
          Help us serve more children and spread the joy of bhakti through food service
        </p>
        <button
          onClick={() => window.location.href = "/donate-amount"}
          className="bg-[#F4A261] text-white px-[1.25rem] py-[0.5rem] rounded-full text-[1rem] font-medium shadow-md hover:opacity-90 transition-all duration-300"
        >
          <p className="flex items-center justify-center gap-[0.25rem]">
            <img src="/assets/Heart Icon.svg" alt="" draggable={false} /> Donate Now
          </p>
        </button>

        <p className="text-[0.9rem] font-medium mt-[1rem] mb-[1rem]">Share this Inspiration</p>
        <div className="flex justify-center items-center gap-[1rem] text-[1.5rem]">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
            <svg className="text-[#1877F2] hover:text-[#1070F9] fill-current" width="40" height="40" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <svg className="text-[#25D366] hover:text-[#20C790] fill-current" width="40" height="40" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
          </a>
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
            <svg className="text-[#24A1DE] hover:text-[#2095EE] fill-current" width="40" height="40" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
            </svg>
          </a>
        </div>
      </div>

      {otherBlogs.length > 0 && (
        <div className="text-center font-playfair my-[3rem] mb-[2rem]">
          <p className="text-[1.5rem] font-semibold mb-[2rem]">Continue Your Spiritual journey</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem] px-[5rem]">
            {otherBlogs.map((b) => (
              <div key={b._id} onClick={() => navigate(`/blogs/${b._id}`)} className="cursor-pointer">
                <BlogCard blog={b} key={b._id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogView;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useBlogs } from '../../../contexts/BlogContext';
// import { BlogCard } from './BlogCard';
// import Loader from '../../../components/common/Loader';

// const BlogView = () => {
//   const { id } = useParams();
//   const { fetchBlogById, allBlogs, fetchAllBlogs } = useBlogs();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadBlog = async () => {
//       setLoading(true);
//       const blogData = await fetchBlogById(id);
//       setBlog(blogData);
//       if (allBlogs.length < 3) {
//         await fetchAllBlogs(1, 6); // Fetch enough blogs for "More blogs"
//       }
//       setLoading(false);
//     };
//     loadBlog();
//   }, [id]);

//   const otherBlogs = allBlogs.filter((b) => b._id !== id).slice(0, 3);

//   const handleBlogClick = (blogId) => {
//     navigate(`/blogs/${blogId}`);
//   };

//   if (loading) return <Loader />;
//   if (!blog) return <div className="text-center">Blog not found</div>;

//   return (
//     <section className="w-[85vw] py-[2rem] mx-auto font-inter">
//       <div className="max-w-[50rem] mx-auto">
//         <img
//           src={blog.image || '/assets/placeholder.png'}
//           alt={blog.title}
//           className="w-full h-[20rem] object-cover mb-[1.5rem]"
//         />
//         <p className="text-[0.875rem] text-[#6941C6] font-medium mb-[0.5rem]">
//           {blog.author} • {new Date(blog.date).toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//           })}
//         </p>
//         <h1 className="text-[2rem] font-bold text-[#101828] mb-[1rem]">{blog.title}</h1>
//         <div
//           className="prose prose-sm text-[#667085]"
//           dangerouslySetInnerHTML={{ __html: blog.content }}
//         />
//       </div>

//       {otherBlogs.length > 0 && (
//         <div className="mt-[3rem]">
//           <h2 className="text-[1.5rem] font-semibold mb-[1.5rem] text-[#101828]">More blogs</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.75rem]">
//             {otherBlogs.map((otherBlog) => (
//               <div key={otherBlog._id} onClick={() => handleBlogClick(otherBlog._id)} className="cursor-pointer">
//                 <BlogCard blog={otherBlog} />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default BlogView;

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------


// import React from 'react';
// import { BlogCard } from './AllBlogs';
// import { ArrowLeft } from 'lucide-react';

// const blogData = {
//   title: 'Why Mid Day Meal is a Modern Bhakti Movement',
//   author: 'Radha Devi',
//   excerpt: 'Discovering the spiritual essence of feeding the hungry in Krishna consciousness',
//   date: 'March 15, 2024',
//   image: '/assets/Aikya Vidya.png',
//   tags: ['Bhakti', 'Food Service', 'Spirituality'],
//   content: '<p class="ql-align-center">India Wants to know</p><p><br></p><p><br></p><p class="ql-align-center"><img src="https://res.cloudinary.com/dvtpmthha/image/upload/v1750615783/Hare%20Krishna%20Vidya/Blog/jgwip0osjq67ttxczb81.jpg" style="cursor: nwse-resize;" width="261"></p><p><br></p><p>Today our topic is nothing</p>'
// };

// const BlogView = () => {
//   const currentUrl = encodeURIComponent(window.location.href);
//   const text = encodeURIComponent("Check this out!");

//   const other3Blogs = [blogData, blogData, blogData]; // Placeholder for other blogs (other than current blog)

//   const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
//   const whatsappUrl = `https://api.whatsapp.com/send?text=${text}%20${currentUrl}`;
//   const telegramUrl = `https://t.me/share/url?url=${currentUrl}&text=${text}`;

//   return (
//     <div className="w-full bg-[#fdfcf9] text-[#1f1f1f]">
//       <div className="relative font-playfair w-full h-[30rem] bg-cover bg-center flex items-center justify-center text-center text-white" style={{ backgroundImage: `url("https://res.cloudinary.com/dvtpmthha/image/upload/v1750615783/Hare%20Krishna%20Vidya/Blog/jgwip0osjq67ttxczb81.jpg")` }}>
//         <div className="absolute inset-0 bg-black bg-opacity-50" />
//         <button onClick={() => window.history.back()}
//          className='absolute top-[1.5rem] md:top-[2rem] left-[1.5rem] md:left-[2rem] text-[0.75rem] md:text-[0.9rem] px-[0.6rem] md:px-[0.75rem] py-[0.4rem] md:py-[0.45rem] bg-white/10 rounded-full' >
//           <p className='flex items-center justify-center gap-[0.25rem]'> <ArrowLeft className='w-[0.85rem]'/> Back to Blogs </p></button>
//         <div className="relative z-10 px-[1.5rem]">
//           <h1 className="w-[70%] mx-auto text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold leading-tight">{blogData.title}</h1>
//           <p className="w-[80%] mx-auto [1rem] lg:text-[1.125rem] mt-[0.5rem]">{blogData.excerpt}</p>
//           <div className="text-[0.875rem] mt-[0.5rem] opacity-80">
//             <p className='leading-[1rem] text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] flex items-center justify-center gap-[0.5rem]'> 
//               <img src="/assets/Profile Icon.svg" alt=""  draggable={false} />            
//               By {blogData.author} &nbsp; • &nbsp;
//               <img src="/assets/Calendar Icon.svg" alt="" draggable={false} /> {blogData.date} </p>
//           </div>
//         </div>
//       </div>

//       <div className='w-[60vw] mt-[2rem] mx-auto' dangerouslySetInnerHTML={{ __html: blogData.content }} />
//       <div className="text-center font-playfair mt-[3rem] bg-gradient-to-r from-[#f4a2611a] to-[#5881571a] py-[4rem]">
//         <p className="text-[2.25rem] font-semibold mb-[1rem]">Join the Movement</p>
//         <p className="mb-[1rem] text-[1rem] mx-auto w-[80%] ">Help us serve more children and spread the joy of bhakti through food service</p>
//         <button onClick={() => window.location.href="/donate-amount" } className="bg-[#F4A261] text-white px-[1.25rem] py-[0.5rem] rounded-full text-[1rem] font-medium shadow-md hover:opacity-90 transition-all duration-300">
//         <p  className='flex items-center justify-center gap-[0.25rem]' > <img src="/assets/Heart Icon.svg" alt="" draggable={false} /> Donate Now </p>
//         </button>

//         <p className='text-[0.9rem] font-medium mt-[1rem] mb-[1rem]'>Share this Inspiration</p>
//         <div className="flex justify-center items-center gap-[1rem] text-[1.5rem]">
//           <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
//             <svg className="text-[#1877F2] hover:text-[#1070F9] fill-current" width="40" height="40" viewBox="0 0 16 16">
//             <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
//             </svg>
//           </a>
//           <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
//             <svg className='text-[#25D366] hover:text-[#20C790] fill-current' width="40" height="40" viewBox="0 0 16 16">
//             <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
//             </svg>
//           </a>
//           <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
//             <svg className='text-[#24A1DE] hover:text-[#2095EE] fill-current' width="40" height="40" viewBox="0 0 16 16">
//             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
//             </svg>          
//           </a>
//         </div>        
//       </div>

//       <div className="text-center font-playfair my-[3rem] mb-[2rem]">
//         <p className="text-[1.5rem] font-semibold mb-[2rem]">Continue Your Spiritual journey</p>
//         <div className='flex flex-col md:flex-row justify-center items-center gap-[1rem] px-[5rem]'>
//           {
//             other3Blogs.map((blog, index) => (
//               <BlogCard
//                 blog={blog}
//                 key={index}
//               />
//             ))
//           }
//         </div>
//       </div>
//       <div>
      

//       </div>
//     </div>
//   );
// };

// export default BlogView;
