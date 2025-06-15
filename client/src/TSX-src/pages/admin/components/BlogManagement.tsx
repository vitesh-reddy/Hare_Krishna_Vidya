import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Eye, Upload, ArrowLeft, Calendar, User, Tag, FileText } from 'lucide-react';
import MediumStyleEditor from './MediumStyleEditor';
import toast from 'react-hot-toast';
import { useBlogsAdmin } from '../../../../contexts/BlogAdminContext';
import Loader from '../../../../components/common/Loader';

const BlogManagement = () => {
  const {
    posts,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
    loading,
  } = useBlogsAdmin();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required.');
      return false;
    }
    if (!formData.author.trim()) {
      toast.error('Author is required.');
      return false;
    }
    if (!formData.content.trim()) {
      toast.error('Content is required.');
      return false;
    }
    if (!formData.category.trim()) {
      toast.error('Category is required.');
      return false;
    }
    if (!formData.image.trim()) {
      toast.error('An image is required.');
      return false;
    }
    return true;
  };

  const handleImageUpload = (file) => {
    if (!file) {
      toast.error('Please select a valid image file.');
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, image: imageUrl });
    setImageFile(file);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const blogData = { ...formData };
      if (editingId) {
        await updateBlog(editingId, blogData, imageFile);
        setEditingId(null);
      } else {
        await createBlog(blogData, imageFile);
      }
      setIsCreating(false);
      setFormData({ title: '', author: '', excerpt: '', content: '', category: '', image: '' });
      setImageFile(null);
    } catch (error) {
      // Error is already handled in context
    }
  };

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await deleteBlog(postToDelete);
      setShowDeleteDialog(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setPostToDelete(null);
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      author: post.author,
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || '',
      image: post.image || '',
    });
    setEditingId(post._id);
    setIsCreating(true);
    setImageFile(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setPreviewPost(null);
    setFormData({ title: '', author: '', excerpt: '', content: '', category: '', image: '' });
    setImageFile(null);
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (previewPost) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Gradient Header with Floating Back Button */}
        <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-400 to-amber-300 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Blog Preview: {previewPost.title.slice(0, 55)}{previewPost.title.length > 55 && <span>...</span>}
            </h2>
            <Button
              onClick={() => setPreviewPost(null)}
              variant="outline"
              className="flex items-center gap-2 bg-white/90 hover:bg-white text-orange-600 border-orange-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-4 py-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Editor</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm">
            {/* Hero Image */}
            {previewPost.image && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={previewPost.image}
                  alt={previewPost.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            )}

            {/* Blog Content */}
            <CardContent className="p-10 md:p-14 space-y-8">
              {/* Category Tag */}
              <div className="flex justify-start">
                <span className="inline-block bg-orange-100 text-orange-700 px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-sm hover:bg-orange-200 transition-colors duration-300">
                  {previewPost.category}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-[1.5rem] md:text-[2.25rem] font-extrabold text-gray-900 tracking-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {previewPost.title}
              </h1>

              {/* Excerpt */}
              {previewPost.excerpt && (
                <p
                  className="text-lg md:text-xl text-gray-600 leading-relaxed font-light italic border-l-4 border-orange-400 pl-4"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {previewPost.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex items-center text-gray-500 text-base md:text-lg space-x-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-600" />
                  <span className="font-medium text-gray-800">{previewPost.author}</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                  <span>
                    {new Date(previewPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Blog Content with Markdown Rendering */}
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
                  {previewPost.content}
                </ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        </main>

        {/* Floating Back Button on Scroll */}
        <div className="fixed bottom-6 right-6 z-50 hidden md:block">
          <Button
            onClick={() => setPreviewPost(null)}
            variant="outline"
            className="bg-orange-500 text-white hover:bg-orange-600 border-none rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200 bg-white/95 backdrop-blur-sm top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  className="flex items-center gap-2 hover:bg-gray-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-xl font-semibold text-gray-800">
                  {editingId ? 'Edit Story' : 'Write a Story'}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  Draft auto-saved
                </span>
                <Button 
                  onClick={() => handlePreview({ 
                    ...formData, 
                    _id: editingId || Date.now(),
                    date: new Date().toISOString(),
                    status: 'Draft'
                  })} 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button 
                  onClick={handleSave} 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Blog
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="px-6 py-12">
            {formData.image ? (
              <div className="relative mb-12 group">
                <img
                  src={formData.image}
                  alt="Cover"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={() => {
                      setFormData({ ...formData, image: '' });
                      setImageFile(null);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove Cover
                  </Button>
                </div>
              </div>
            ) : (
              <label className="block mb-12 border-2 border-dashed border-gray-300 rounded-xl p-12 cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all duration-200 group">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-orange-500" />
                  </div>
                  <p className="text-xl text-gray-700 mb-2 font-medium">Add a cover image</p>
                  <p className="text-sm text-gray-500">Drag and drop an image, or click to browse</p>
                  <p className="text-xs text-gray-400 mt-2">Recommended: 1600 x 900 pixels</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                />
              </label>
            )}

            <MediumStyleEditor
              title={formData.title}
              content={formData.content}
              excerpt={formData.excerpt}
              onTitleChange={(title) => setFormData({ ...formData, title })}
              onContentChange={(content) => setFormData({ ...formData, content })}
              onExcerptChange={(excerpt) => setFormData({ ...formData, excerpt })}
              onImageUpload={handleImageUpload}
            />

            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Story Settings</h3>
                    <p className="text-sm text-gray-600">Configure your story's metadata and settings</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Author
                    </Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Enter author name"
                      className="bg-white border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Category
                    </Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Enter story category"
                      className="bg-white border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={cancelDelete}
                className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                No
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                Blog Posts Management
              </CardTitle>
              <p className="text-gray-600 mt-2">Create, edit, and manage your blog content</p>
            </div>
            <Button onClick={() => setIsCreating(true)} className="bg-orange-600 hover:bg-orange-700 text-white shadow-md">
              <PlusCircle className="w-4 h-4 mr-2" />
              Write New Story
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">
                    {post.title.slice(0, 55)}
                    {post.title.length > 55 && <span>...</span>}
                  </TableCell>
                  <TableCell>
                    {post.author.slice(0, 30)}
                    {post.author.length > 30 && <span>...</span>}
                  </TableCell>
                  <TableCell>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell>
                    {post.category.slice(0, 30)}
                    {post.category.length > 30 && <span>...</span>}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`text-xs ${
                        post.status === 'Published' 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      }`}
                      onClick={() => toggleBlogStatus(post._id)}
                    >
                      {post.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(post)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(post._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;