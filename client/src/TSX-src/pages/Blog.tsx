import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useBlogs } from '../../contexts/BlogContext';
import ViewBlog from './ViewBlog';
import Loader from '../../components/common/Loader';

const Blog = () => {
  const { blogs, fetchPublishedBlogs, loading, getBlogById } = useBlogs();
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    if (!blogs.length) {
      fetchPublishedBlogs();
    }
  }, [blogs, fetchPublishedBlogs]);

  const selectedBlog = selectedBlogId ? getBlogById(selectedBlogId) : null;

  if (loading) {
    return (
      <Loader/>
    );
  }

  // Individual Blog Post View
  if (selectedBlog) 
    return <ViewBlog selectedBlog={selectedBlog} setSelectedBlogId={setSelectedBlogId} />

  // Blog List View
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-orange-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stories, insights, and updates from our mission to serve humanity through nutrition and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((post) => (
            <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col min-h-[450px]">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="flex-0">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                    {post.category.slice(0, 30)}
                    {post.category.length > 30 && <span>...</span>}
                  </span>
                </div>
                <CardTitle className="text-xl hover:text-orange-600 transition-colors cursor-pointer line-clamp-2">
                  {post.title.slice(0, 55)}
                  {post.title.length > 55 && <span>...</span>}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt.slice(0, 100)}
                  {post.excerpt.length > 100 && <span>...</span>}
                </p>
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>
                        {post.author.slice(0, 30)}
                        {post.author.length > 30 && <span>...</span>}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group"
                    onClick={() => setSelectedBlogId(post._id)}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;