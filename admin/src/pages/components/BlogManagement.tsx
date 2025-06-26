
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
import { Button } from '../../TSX-src/components/ui/button';
import { Input } from '../../TSX-src/components/ui/input';
import { Label } from '../../TSX-src/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../TSX-src/components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Eye, Upload, ArrowLeft, Calendar, User, Tag, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useBlogsAdmin } from '../../contexts/BlogAdminContext';
import Loader from '../../components/common/Loader';
import imageCompression from 'browser-image-compression';
import BlogEditor from './BlogEditor';
import dayjs from 'dayjs';

const BlogManagement = () => {
  const { posts, totalBlogsCount, createBlog, updateBlog, deleteBlog, toggleBlogStatus, loading, fetchBlogs, subscribers, fetchSubscribers } = useBlogsAdmin();
  const editorRef = useRef(null);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalBlogsCount / postsPerPage) || 1;

  useEffect(() => {
    fetchBlogs(currentPage, postsPerPage);
  }, [currentPage]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    image: '',
    tags: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [tagInput, setTagInput] = useState('');

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
    if (!formData.image.trim()) {
      toast.error('An image is required.');
      return false;
    }
    return true;
  };

  const handleImageUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    try {
      toast.loading('Uploading image...');
      let compressedFile = file;

      if (file.size > 200 * 1024) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: 0.8,
        };
        compressedFile = await imageCompression(file, options);
      }

      const formDataToUpload = new FormData();
      formDataToUpload.append('file', compressedFile);
      formDataToUpload.append('upload_preset', uploadPreset);
      formDataToUpload.append('cloud_name', cloudName);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formDataToUpload,
      });
      
      const result = await response.json();
      if (result.secure_url) {
        setFormData(prev => ({ ...prev, image: result.secure_url }));
        toast.dismiss();
        toast.success('Image uploaded.');
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Image upload failed. Please try again.');
      console.error('❌ Image upload failed:', error);
      toast.error('Failed to upload image to Cloudinary.');
    }
  };

  const addTag = () => {
    if(formData.tags.length >= 3) {
      toast.error('You can only add up to 3 tags.');
      return;
    }
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const blogData = { ...formData };
      if (editingId) {
        console.log(updateBlog)
        await updateBlog(editingId, blogData, currentPage, postsPerPage);
        setEditingId(null);
      } else {
        await createBlog(blogData, currentPage, postsPerPage);
      }
      setIsCreating(false);
      setFormData({
        title: '',
        author: '',
        excerpt: '',
        content: '',
        image: '',
        tags: [],
      });
      setImageFile(null);
      setTagInput('');
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
      await deleteBlog(postToDelete, currentPage, postsPerPage);
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
      image: post.image || '',
      tags: post.tags || [],
    });
    setEditingId(post._id);
    setIsCreating(true);
    setImageFile(null);
    setTagInput('');
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setPreviewPost(null);
    setFormData({
      title: '',
      author: '',
      excerpt: '',
      content: '',
      image: '',
      tags: [],
    });
    setImageFile(null);
    setTagInput('');
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 6; // Total 6 page buttons excluding dots
    const siblingCount = 1;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-[0.5rem] py-[0.25rem] mx-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
              currentPage === i ? 'bg-[#f97316] text-white' : 'bg-[#f8f3ec] text-[#404958] hover:bg-[#fef3c7]'
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
          className={`px-[0.5rem] py-[0.25rem] mx-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
            currentPage === 1 ? 'bg-[#f97316] text-white' : 'bg-[#f8f3ec] text-[#404958] hover:bg-[#fef3c7]'
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
            className={`px-[0.5rem] py-[0.25rem] mx-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
              currentPage === 2 ? 'bg-[#f97316] text-white' : 'bg-[#f8f3ec] text-[#404958] hover:bg-[#fef3c7]'
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
        pages.push(<span key="start-ellipsis" className="px-[0.5rem] py-[0.25rem] mx-[0.25rem] text-[0.875rem] text-[#6b7280]">...</span>);
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i > 2 && i < totalPages - 1) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`px-[0.5rem] py-[0.25rem] mx-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
                currentPage === i ? 'bg-[#f97316] text-white' : 'bg-[#f8f3ec] text-[#404958] hover:bg-[#fef3c7]'
              }`}
              disabled={currentPage === i}
            >
              {i}
            </button>
          );
        }
      }

      if (rightSiblingIndex < totalPages - 2) {
        pages.push(<span key="end-ellipsis" className="px-[0.5rem] py-[0.25rem] mx-[0.25rem] text-[0.875rem] text-[#6b7280]">...</span>);
      }

      for (let i = Math.max(totalPages - 1, rightSiblingIndex + 1); i <= totalPages; i++) {
        if (i > 2) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`px-[0.5rem] py-[0.25rem] mx-[0.25rem] text-[0.875rem] rounded-[0.25rem] ${
                currentPage === i ? 'bg-[#f97316] text-white' : 'bg-[#f8f3ec] text-[#404958] hover:bg-[#fef3c7]'
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

  if (loading) {
    return <Loader />;
  }

  if (previewPost) {
    return (
      <div className="w-full pb-[5rem] bg-[#fdfcf9] text-[#1f1f1f] min-h-screen">
        <div
          className="relative font-playfair w-full h-[30rem] bg-cover bg-center flex items-center justify-center text-center text-white"
          style={{ backgroundImage: `url(${previewPost.image || '/assets/placeholder.png'})` }}
        >
          <button
            onClick={() => setPreviewPost(null)}
            className="z-50 absolute top-[1.5rem] md:top-[2rem] left-[1.5rem] md:left-[2rem] text-[0.75rem] md:text-[0.9rem] px-[0.6rem] md:px-[0.75rem] py-[0.4rem] md:py-[0.45rem] bg-white/10 rounded-full"
          >
            <p className="flex items-center justify-center gap-[0.25rem]">
              <ArrowLeft className="w-[0.85rem]" /> Back to Editor
            </p>
          </button>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 px-[1.5rem]">
            <h1 className="w-[70%] mx-auto text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold leading-tight">
              {previewPost.title}
            </h1>
            {previewPost.excerpt && (
              <p className="w-[80%] mx-auto text-[1rem] lg:text-[1.125rem] mt-[0.5rem]">
                {previewPost.excerpt}
              </p>
            )}
            <div className="text-[0.875rem] mt-[0.5rem] opacity-80">
              <p className="leading-[1rem] text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] flex items-center justify-center gap-[0.5rem]">
                <img  loading="lazy" src="/assets/Profile Icon.svg" alt="" draggable={false} />
                By {previewPost.author} &nbsp; • &nbsp;
                <img  loading="lazy" src="/assets/Calendar Icon.svg" alt="" draggable={false} />
                {new Date(previewPost.date).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <div
          className="w-[60vw] mt-[2rem] mx-auto"
          dangerouslySetInnerHTML={{ __html: previewPost.content }}
        />

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
                <span className="text-sm text-gray-500">Drafted upon Save</span>
                {/* <Button
                  onClick={() =>
                    handlePreview({
                      ...formData,
                      _id: editingId || Date.now(),
                      date: new Date().toISOString(),
                      status: 'Draft',
                    })
                  }
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button> */}
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

            <BlogEditor
              ref={editorRef}
              title={formData.title}
              content={formData.content}
              excerpt={formData.excerpt}
              onTitleChange={(title) => setFormData({ ...formData, title })}
              onContentChange={(content) => setFormData({ ...formData, content })}
              onExcerptChange={(excerpt) => setFormData({ ...formData, excerpt })}
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
                    <Label htmlFor="tags" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="bg-white border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-orange-400 hover:text-orange-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleViewSubscribers = async () => {
    setShowSubscribers(true);    
    try {
      await fetchSubscribers();      
    } catch (error) {      
      setShowSubscribers(false);
    }
  }
  const handleCloseViewSubscribers = () => setShowSubscribers(false)

  return (
    <div className="space-y-6">
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

      {showSubscribers && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-all"
          onClick={handleCloseViewSubscribers}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[30rem] max-h-[80vh] overflow-y-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseViewSubscribers}
              className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Blog Subscribers
                </h2>
              </div>
              <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
            </div>

            {/* Copy All Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  const emails = subscribers.map(s => s.email).join(', ');
                  navigator.clipboard.writeText(emails);
                  toast.success('All emails copied to clipboard!');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 text-orange-600 dark:text-orange-300 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy All Emails
              </button>
            </div>

            {/* Subscribers List */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
              {subscribers ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                  {subscribers.length > 0 ? (
                    subscribers.map(({ email, _id, subscribedAt }) => (
                      <li 
                        key={_id} 
                        className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative"
                        onClick={() => {
                          navigator.clipboard.writeText(email);
                          toast.success('Email copied to clipboard!');
                        }}
                      >
                        <div className="flex justify-between items-center cursor-pointer">
                          <div className="font-inter text-[0.75rem] text-gray-800 dark:text-gray-100 truncate pr-2">
                            {email}
                            <span className="absolute left-0 -top-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              Click to copy
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {dayjs(subscribedAt).fromNow()}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No subscribers found
                    </li>
                  )}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <Loader />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Total subscribers: {subscribers?.length || 0}</p>
            </div>
          </div>
        </div>
      )}
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">         
          <CardTitle>Blog Posts </CardTitle>   
          <div className='flex items-center justify-center gap-[0.5rem]'>
            <Button
              onClick={handleViewSubscribers}
              className=" text-white shadow-md"
            >
              View Subscribers
            </Button>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-md"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Write New Story
            </Button>
          </div>         
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[35%]'>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium w-fit">
                    <p className='line-clamp-2 w-[98%] mx-auto'> {post.title}</p>
                  </TableCell>
                  <TableCell>
                    {post.author.slice(0, 30)}
                    {post.author.length > 30 && <span>...</span>}
                  </TableCell>
                  <TableCell>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
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
                      onClick={() => toggleBlogStatus(post._id, currentPage, postsPerPage)}
                    >
                      {post.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handlePreview(post)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
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
          <div className="flex items-center justify-between gap-[0.5rem] px-[2rem] pt-[1.5rem] pb-[2rem]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#404958] disabled:opacity-50"
            >
              ← Previous
            </button>
            <div>{renderPagination()}</div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="px-[0.75rem] py-[0.25rem] text-[0.875rem] text-[#404958] disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;

/// Original -----------------------------------------------------------------------------------------------------------------------------------------------------------------------