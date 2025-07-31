import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, User, Calendar } from 'lucide-react';

const ViewBlog = ({ selectedBlog, setSelectedBlogId }) => {
  if (selectedBlog) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <header className="top-0 z-50 bg-gradient-to-r from-orange-400 to-amber-300 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {selectedBlog.title.slice(0, 85)}{selectedBlog.title.length > 85 && <span>...</span>}
            </h2>
            <Button
              onClick={() => setSelectedBlogId(null)}
              variant="outline"
              className="flex items-center gap-2 bg-white/90 hover:bg-white text-orange-600 border-orange-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-4 py-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Blog List</span>
            </Button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm">

            {selectedBlog.image && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            )}

            <CardContent className="p-10 md:p-14 space-y-8">
              <div className="flex justify-start">
                <span className="inline-block bg-orange-100 text-orange-700 px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-sm hover:bg-orange-200 transition-colors duration-300">
                  {selectedBlog.category}
                </span>
              </div>

              <h1
                className="text-[1.5rem] md:text-[2.25rem] font-extrabold text-gray-900 tracking-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {selectedBlog.title}
              </h1>

              {selectedBlog.excerpt && (
                <p
                  className="text-lg md:text-xl text-gray-600 leading-relaxed font-light italic border-l-4 border-orange-400 pl-4"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {selectedBlog.excerpt}
                </p>
              )}

              <div className="flex items-center text-gray-500 text-base md:text-lg space-x-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-600" />
                  <span className="font-medium text-gray-800">{selectedBlog.author}</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                  <span>
                    {new Date(selectedBlog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <article className="prose prose-lg max-w-none text-gray-800 leading-loose tracking-wide">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Georgia', serif" }} {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Georgia', serif" }} {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Georgia', serif" }} {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-lg md:text-xl text-gray-800 leading-loose" style={{ fontFamily: "'Georgia', serif" }} {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 mb-4 text-lg text-gray-800" style={{ fontFamily: "'Georgia', serif" }} {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 mb-4 text-lg text-gray-800" style={{ fontFamily: "'Georgia', serif" }} {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-600 mb-4" style={{ fontFamily: "'Georgia', serif" }} {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-orange-600 hover:underline" {...props} />
                    ),
                  }}
                >
                  {selectedBlog.content}
                </ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        </main>

        <div className="fixed bottom-6 right-6 z-50 hidden md:block">
          <Button
            onClick={() => setSelectedBlogId(null)}
            variant="outline"
            className="bg-orange-500 text-white hover:bg-orange-600 border-none rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>
      </div>
    );
  }
  return null;
};

export default ViewBlog;