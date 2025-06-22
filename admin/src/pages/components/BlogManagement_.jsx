import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
import { Button } from '../../TSX-src/components/ui/button';
import { Input } from '../../TSX-src/components/ui/input';
import { Label } from '../../TSX-src/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../TSX-src/components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Eye, Upload, ArrowLeft, Calendar, User, Tag, FileText, XCircle } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

// Load environment variables using Vite
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Mock data
const mockPosts = [
  { _id: '1', title: 'Sample Blog 1', author: 'John Doe', date: new Date(), category: 'Technology', status: 'Draft', image: 'https://via.placeholder.com/1600x900', tags: ['tech', 'innovation'], content: '<h1>Introduction <img src="https://via.placeholder.com/600x400" /></h1><p>This is a sample paragraph with an <img src="https://via.placeholder.com/300x200" /> image.</p>' },
  { _id: '2', title: 'Sample Blog 2', author: 'Jane Smith', date: new Date(), category: 'Lifestyle', status: 'Published', image: 'https://via.placeholder.com/1600x900', tags: ['lifestyle', 'travel'], content: '<h2>Heading 2 <img src="https://via.placeholder.com/500x300" /></h2><p>Another sample paragraph.</p>' },
];

const BlogManagement = () => {
  const [posts] = useState(mockPosts);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    category: '',
    image: '',
    tags: [],
    content: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const quillRef = useRef(null); // Ref to access Quill editor instance

  useEffect(() => {
    if (!cloudName || !uploadPreset) {
      toast.error('Cloudinary configuration is missing. Check .env file and ensure VITE_ prefix is used.');
    }
  }, []);

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

  const handleImageUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    try {
      let compressedFile = file;
      if (file.size > 800 * 1024) {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true, initialQuality: 0.8 };
        compressedFile = await imageCompression(file, options);
        toast.success('Image compressed and uploaded.');
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
        setImageFile(compressedFile);
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Failed to upload image to Cloudinary.');
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file && quillRef.current) {
        try {
          const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true, initialQuality: 0.8 });
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
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            if (range) {
              quill.insertEmbed(range.index, 'image', result.secure_url);
              quill.setSelection(range.index + 1); // Move cursor after image
            }
          } else {
            throw new Error('Image upload failed');
          }
        } catch (error) {
          console.error('Image upload failed:', error);
          toast.error('Failed to upload image to Cloudinary.');
        }
      }
    };
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      const blogData = { ...formData };
      console.log('Saved blog:', blogData);
      setIsCreating(false);
      setFormData({ title: '', author: '', excerpt: '', category: '', image: '', tags: [], content: '' });
      setImageFile(null);
      setTagInput('');
    } catch (error) {
      // Error handled in context
    }
  };

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      console.log('Deleted blog:', postToDelete);
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
      category: post.category || '',
      image: post.image || '',
      tags: post.tags || [],
      content: post.content || '',
    });
    setEditingId(post._id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setPreviewPost(null);
    setFormData({ title: '', author: '', excerpt: '', category: '', image: '', tags: [], content: '' });
    setImageFile(null);
    setTagInput('');
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()].filter(tag => tag.length > 0) }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  if (previewPost) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f3f4f6]">
        <header className="sticky top-0 z-[50] bg-gradient-to-r from-[#f97316] to-[#f59e0b] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <div className="max-w-[69.375rem] mx-auto p-[1.5rem] flex items-center justify-between">
            <h2 className="text-[1.875rem] font-bold text-[#ffffff] tracking-[-0.025rem]">
              Blog Preview: {previewPost.title.slice(0, 55)}{previewPost.title.length > 55 && <span>...</span>}
            </h2>
            <Button
              onClick={() => setPreviewPost(null)}
              variant="outline"
              className="flex items-center gap-[0.5rem] bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#f97316] border-[#fed7aa] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-[0.3s] rounded-[1.5rem] p-[0.5rem] [1rem]"
            >
              <ArrowLeft className="w-[1.25rem] h-[1.25rem]" />
              <span className="font-medium">Back to Editor</span>
            </Button>
          </div>
        </header>

        <main className="max-w-[62.5rem] mx-auto p-[1.5rem] pt-[3rem]">
          <Card className="shadow-[0_10px_15px_rgba(0,0,0,0.1)] border-0 rounded-[1.5rem] overflow-hidden bg-[#ffffff]/95 backdrop-blur-[0.5rem]">
            {previewPost.image && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={previewPost.image}
                  alt={previewPost.title}
                  className="w-full h-full object-cover transform hover:scale-[1.05] transition-transform duration-[0.5s] ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 to-transparent" />
              </div>
            )}

            <CardContent className="p-[2.5rem] md:p-[3.5rem] space-y-[2rem]">
              <div className="flex justify-start">
                <span className="inline-block bg-[#fee2b3] text-[#f97316] p-[0.5rem] [1.25rem] rounded-[1rem] text-[0.875rem] font-semibold tracking-[0.1rem] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#ffd580] transition-colors duration-[0.3s]">
                  {previewPost.category}
                </span>
              </div>

              <h1 className="text-[1.5rem] md:text-[2.25rem] font-extrabold text-[#1f2937] tracking-[-0.025rem]" style={{ fontFamily: "'Georgia', serif" }}>
                {previewPost.title}
              </h1>

              {previewPost.excerpt && (
                <p className="text-[1.125rem] md:text-[1.25rem] text-[#4b5563] leading-[1.625rem] font-light italic border-l-[0.25rem] border-[#f97316] pl-[1rem]" style={{ fontFamily: "'Georgia', serif" }}>
                  {previewPost.excerpt}
                </p>
              )}

              <div className="flex items-center text-[#6b7280] text-[1rem] md:text-[1.125rem] space-x-[1rem]">
                <div className="flex items-center">
                  <User className="w-[1.25rem] h-[1.25rem] mr-[0.5rem] text-[#f97316]" />
                  <span className="font-medium text-[#1f2937]">{previewPost.author}</span>
                </div>
                <span className="text-[#d1d5db]">•</span>
                <div className="flex items-center">
                  <Calendar className="w-[1.25rem] h-[1.25rem] mr-[0.5rem] text-[#f97316]" />
                  <span>
                    {new Date(previewPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <span className="text-[#d1d5db]">•</span>
                <div className="flex items-center flex-wrap">
                  {previewPost.tags.map((tag, index) => (
                    <span key={index} className="bg-[#e5e7eb] text-[#374151] text-[0.875rem] p-[0.25rem] [0.75rem] rounded-[0.5rem] mr-[0.5rem] mb-[0.25rem]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <article className="prose prose-[1.125rem] max-w-none text-[#1f2937] leading-[1.625rem] tracking-[0.025rem]">
                <div dangerouslySetInnerHTML={{ __html: previewPost.content }} />
              </article>
            </CardContent>
          </Card>
        </main>

        <div className="fixed bottom-[1.5rem] right-[1.5rem] z-[50] hidden md:block">
          <Button
            onClick={() => setPreviewPost(null)}
            variant="outline"
            className="bg-[#f97316] text-[#ffffff] hover:bg-[#ea580c] border-none rounded-[1rem] p-[1rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.2)] transition-all duration-[0.3s]"
          >
            <ArrowLeft className="w-[1.5rem] h-[1.5rem]" />
          </Button>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="min-h-screen bg-[#ffffff]">
        <div className="border-b border-[#e5e7eb] bg-[#ffffff]/95 backdrop-blur-[0.5rem] top-0 z-[40]">
          <div className="p-[1rem] py-[1.5rem]">
            <div className="flex items-center justify-between max-w-[69.375rem] mx-auto">
              <div className="flex items-center gap-[1rem]">
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  className="flex items-center gap-[0.5rem] hover:bg-[#f3f4f6]"
                >
                  <ArrowLeft className="w-[1rem] h-[1rem]" />
                  Back
                </Button>
                <div className="h-[1.5rem] w-[0.0625rem] bg-[#e5e7eb]" />
                <h1 className="text-[1.25rem] font-semibold text-[#1f2937]">
                  {editingId ? 'Edit Story' : 'Write a Story'}
                </h1>
              </div>
              <div className="flex items-center gap-[0.75rem]">
                <span className="text-[0.875rem] text-[#6b7280]">
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
                  className="flex items-center gap-[0.5rem]"
                >
                  <Eye className="w-[1rem] h-[1rem]" />
                  Preview
                </Button>
                <Button 
                  onClick={handleSave} 
                  className="bg-[#16a34a] hover:bg-[#15803d] text-[#ffffff]"
                  size="sm"
                >
                  <Save className="w-[1rem] h-[1rem] mr-[0.5rem]" />
                  Save Blog
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[78.125rem] mx-auto">
          <div className="p-[1.5rem] pt-[3rem]">
            {formData.image ? (
              <div className="relative mb-[3rem] group">
                <img
                  src={formData.image}
                  alt="Cover"
                  className="w-full h-[20rem] object-cover rounded-[0.75rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute inset-0 bg-[#000000] bg-opacity-0 group-hover:bg-opacity-[0.2] transition-all duration-[0.2s] rounded-[0.75rem] flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-[0.2s]"
                    onClick={() => {
                      setFormData({ ...formData, image: '' });
                      setImageFile(null);
                    }}
                  >
                    <X className="w-[1rem] h-[1rem] mr-[0.5rem]" />
                    Remove Cover
                  </Button>
                </div>
              </div>
            ) : (
              <label className="block mb-[3rem] border-[0.125rem] border-dashed border-[#d1d5db] rounded-[0.75rem] p-[3rem] cursor-pointer hover:border-[#f97316] hover:bg-[#fefcbf]/50 transition-all duration-[0.2s] group">
                <div className="text-center">
                  <div className="mx-auto w-[4rem] h-[4rem] bg-[#f3f4f6] rounded-[1rem] flex items-center justify-center mb-[1rem] group-hover:bg-[#fed7aa] transition-colors">
                    <Upload className="w-[2rem] h-[2rem] text-[#9ca3af] group-hover:text-[#f97316]" />
                  </div>
                  <p className="text-[1.25rem] text-[#374151] mb-[0.5rem] font-medium">Add a cover image</p>
                  <p className="text-[0.875rem] text-[#6b7280]">click to browse</p>
                  <p className="text-[0.75rem] text-[#9ca3af] mt-[0.5rem]">Recommended: 1600 x 900 pixels</p>
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

            <ReactQuill
              ref={quillRef}
              value={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                ],
                handlers: {
                  image: imageHandler,
                },
              }}
              formats={['header', 'bold', 'italic', 'blockquote', 'list', 'bullet', 'link', 'image']}
              className="mb-[4rem]"
            />

            <div className="mt-[4rem] pt-[2rem] border-t border-[#e5e7eb]">
              <div className="bg-[#f9fafb] rounded-[0.75rem] p-[2rem]">
                <div className="flex items-center gap-[0.75rem] mb-[1.5rem]">
                  <div className="w-[2.5rem] h-[2.5rem] bg-[#fee2b3] rounded-[0.75rem] flex items-center justify-center">
                    <FileText className="w-[1.25rem] h-[1.25rem] text-[#f97316]" />
                  </div>
                  <div>
                    <h3 className="text-[1.125rem] font-semibold text-[#1f2937]">Story Settings</h3>
                    <p className="text-[0.875rem] text-[#6b7280]">Configure your story's metadata and settings</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem]">
                  <div className="space-y-[0.5rem]">
                    <Label htmlFor="author" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
                      <User className="w-[1rem] h-[1rem]" />
                      Author
                    </Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Enter author name"
                      className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
                    />
                  </div>
                  <div className="space-y-[0.5rem]">
                    <Label htmlFor="category" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
                      <Tag className="w-[1rem] h-[1rem]" />
                      Category
                    </Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Enter story category"
                      className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
                    />
                  </div>
                  <div className="space-y-[0.5rem]">
                    <Label htmlFor="tags" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
                      <Tag className="w-[1rem] h-[1rem]" />
                      Tags
                    </Label>
                    <div className="flex flex-wrap gap-[0.5rem] mb-[0.5rem]">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="bg-[#e5e7eb] text-[#374151] text-[0.875rem] p-[0.25rem] [0.75rem] rounded-[0.5rem] flex items-center">
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTag(tag)}
                            className="ml-[0.25rem] p-[0.125rem] hover:bg-[#ef4444] hover:text-[#ffffff]"
                          >
                            <XCircle className="w-[0.75rem] h-[0.75rem]" />
                          </Button>
                        </span>
                      ))}
                    </div>
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagInputKeyDown}
                      placeholder="Type a tag and press Enter"
                      className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
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
    <div className="space-y-[1.5rem]">
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-[#000000] bg-opacity-[0.5] flex items-center justify-center z-[50]">
          <div className="bg-[#ffffff] dark:bg-[#1f2937] rounded-[0.5rem] p-[1.5rem] w-full max-w-[48rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <h3 className="text-[1.125rem] font-semibold text-[#1f2937] dark:text-[#ffffff] mb-[1rem]">
              Confirm Deletion
            </h3>
            <p className="text-[#6b7280] dark:text-[#d1d5db] mb-[1.5rem]">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-[0.5rem]">
              <Button
                variant="outline"
                onClick={cancelDelete}
                className="text-[#6b7280] dark:text-[#d1d5db] border-[#d1d5db] dark:border-[#4b5563] hover:bg-[#f3f4f6] dark:hover:bg-[#374151]"
              >
                No
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff]"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="border-0 shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
        <CardHeader className="bg-gradient-to-r from-[#fefcbf] to-[#fef3c7] border-b border-[#fed7aa]">
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-[1.5rem] text-[#1f2937] flex items-center gap-[0.75rem]">
                <div className="w-[2.5rem] h-[2.5rem] bg-[#fee2b3] rounded-[0.75rem] flex items-center justify-center">
                  <FileText className="w-[1.25rem] h-[1.25rem] text-[#f97316]" />
                </div>
                Blog Posts Management
              </CardTitle>
              <p className="text-[#6b7280] mt-[0.5rem]">Create, edit, and manage your blog content</p>
            </div>
            <Button onClick={() => setIsCreating(true)} className="bg-[#f97316] hover:bg-[#ea580c] text-[#ffffff] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
              <PlusCircle className="w-[1rem] h-[1rem] mr-[0.5rem]" />
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
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    {post.category.slice(0, 30)}
                    {post.category.length > 30 && <span>...</span>}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`text-[0.75rem] ${
                        post.status === 'Published' ? 'bg-[#d1fae5] text-[#10b981] hover:bg-[#a7f3d0]' : 'bg-[#fef3c7] text-[#f59e0b] hover:bg-[#fde68a]'
                      }`}
                    >
                      {post.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-[0.5rem]">
                      <Button size="sm" variant="outline" onClick={() => handlePreview(post)}>
                        <Eye className="w-[1rem] h-[1rem]" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                        <Edit3 className="w-[1rem] h-[1rem]" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(post._id)}>
                        <Trash2 className="w-[1rem] h-[1rem]" />
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


// import React, { useState, useEffect, useRef } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { Card, CardContent, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
// import { Button } from '../../TSX-src/components/ui/button';
// import { Input } from '../../TSX-src/components/ui/input';
// import { Label } from '../../TSX-src/components/ui/label';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../TSX-src/components/ui/table';
// import { PlusCircle, Edit3, Trash2, Save, X, Eye, Upload, ArrowLeft, Calendar, User, Tag, FileText, XCircle } from 'lucide-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import toast from 'react-hot-toast';
// import imageCompression from 'browser-image-compression';

// // Load environment variables using Vite
// const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// // Mock data
// const mockPosts = [
//   { _id: '1', title: 'Sample Blog 1', author: 'John Doe', date: new Date(), category: 'Technology', status: 'Draft', image: 'https://via.placeholder.com/1600x900', tags: ['tech', 'innovation'], content: '<h1>Introduction <img src="https://via.placeholder.com/600x400" /></h1><p>This is a sample paragraph with an <img src="https://via.placeholder.com/300x200" /> image.</p>' },
//   { _id: '2', title: 'Sample Blog 2', author: 'Jane Smith', date: new Date(), category: 'Lifestyle', status: 'Published', image: 'https://via.placeholder.com/1600x900', tags: ['lifestyle', 'travel'], content: '<h2>Heading 2 <img src="https://via.placeholder.com/500x300" /></h2><p>Another sample paragraph.</p>' },
// ];

// const BlogManagement = () => {
//   const [posts] = useState(mockPosts);
//   const [isCreating, setIsCreating] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [previewPost, setPreviewPost] = useState(null);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [postToDelete, setPostToDelete] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     excerpt: '',
//     category: '',
//     image: '',
//     tags: [],
//     content: '',
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [tagInput, setTagInput] = useState('');
//   const quillRef = useRef(null); // Ref to stabilize Quill instance

//   useEffect(() => {
//     if (!cloudName || !uploadPreset) {
//       toast.error('Cloudinary configuration is missing. Check .env file and ensure VITE_ prefix is used.');
//     }
//   }, []);

//   const validateForm = () => {
//     if (!formData.title.trim()) {
//       toast.error('Title is required.');
//       return false;
//     }
//     if (!formData.author.trim()) {
//       toast.error('Author is required.');
//       return false;
//     }
//     if (!formData.content.trim()) {
//       toast.error('Content is required.');
//       return false;
//     }
//     if (!formData.category.trim()) {
//       toast.error('Category is required.');
//       return false;
//     }
//     if (!formData.image.trim()) {
//       toast.error('An image is required.');
//       return false;
//     }
//     return true;
//   };

//   const handleImageUpload = async (file) => {
//     if (!file || !file.type.startsWith('image/')) {
//       toast.error('Please select a valid image file.');
//       return;
//     }

//     try {
//       console.log(`📷 Original file size: ${(file.size / 1024).toFixed(2)} KB`);
//       let compressedFile = file;

//       if (file.size > 800 * 1024) {
//         const options = {
//           maxSizeMB: 1,
//           maxWidthOrHeight: 1024,
//           useWebWorker: true,
//           initialQuality: 0.8,
//         };
//         compressedFile = await imageCompression(file, options);
//         console.log(`🗜️ Compressed file size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
//         toast.success('Image compressed and uploaded.');
//       } else {
//         console.log('⚠️ Skipped compression due to small file size.');
//       }

//       const formDataToUpload = new FormData();
//       formDataToUpload.append('file', compressedFile);
//       formDataToUpload.append('upload_preset', uploadPreset);
//       formDataToUpload.append('cloud_name', cloudName);

//       const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//         method: 'POST',
//         body: formDataToUpload,
//       });

//       const result = await response.json();
//       if (result.secure_url) {
//         setFormData(prev => ({ ...prev, image: result.secure_url }));
//         setImageFile(compressedFile);
//       } else {
//         throw new Error('Image upload failed');
//       }
//     } catch (error) {
//       console.error('❌ Image upload failed:', error);
//       toast.error('Failed to upload image to Cloudinary.');
//     }
//   };

//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files?.[0];
//       if (file) {
//         try {
//           const compressedFile = await imageCompression(file, {
//             maxSizeMB: 1,
//             maxWidthOrHeight: 1024,
//             useWebWorker: true,
//             initialQuality: 0.8,
//           });

//           const formDataToUpload = new FormData();
//           formDataToUpload.append('file', compressedFile);
//           formDataToUpload.append('upload_preset', uploadPreset);
//           formDataToUpload.append('cloud_name', cloudName);

//           const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//             method: 'POST',
//             body: formDataToUpload,
//           });

//           const result = await response.json();
//           if (result.secure_url) {
//             const quill = quillRef.current?.getEditor();
//             if (quill) {
//               const range = quill.getSelection();
//               if (range) {
//                 quill.insertEmbed(range.index, 'image', result.secure_url);
//               }
//             }
//           } else {
//             throw new Error('Image upload failed');
//           }
//         } catch (error) {
//           console.error('❌ Image upload failed:', error);
//           toast.error('Failed to upload image to Cloudinary.');
//         }
//       }
//     };
//   };

//   const handleSave = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const blogData = { ...formData };
//       console.log('Saved blog:', blogData);
//       setIsCreating(false);
//       setFormData({ title: '', author: '', excerpt: '', category: '', image: '', tags: [], content: '' });
//       setImageFile(null);
//       setTagInput('');
//     } catch (error) {
//       // Error is already handled in context
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setPostToDelete(id);
//     setShowDeleteDialog(true);
//   };

//   const confirmDelete = async () => {
//     if (postToDelete) {
//       console.log('Deleted blog:', postToDelete);
//       setShowDeleteDialog(false);
//       setPostToDelete(null);
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteDialog(false);
//     setPostToDelete(null);
//   };

//   const handleEdit = (post) => {
//     setFormData({
//       title: post.title,
//       author: post.author,
//       excerpt: post.excerpt || '',
//       category: post.category || '',
//       image: post.image || '',
//       tags: post.tags || [],
//       content: post.content || '',
//     });
//     setEditingId(post._id);
//     setIsCreating(true);
//     setImageFile(null);
//     setTagInput('');
//   };

//   const handleCancel = () => {
//     setIsCreating(false);
//     setEditingId(null);
//     setPreviewPost(null);
//     setFormData({ title: '', author: '', excerpt: '', category: '', image: '', tags: [], content: '' });
//     setImageFile(null);
//     setTagInput('');
//   };

//   const handlePreview = (post) => {
//     setPreviewPost(post);
//   };

//   const handleTagInputKeyDown = (e) => {
//     if (e.key === 'Enter' && tagInput.trim()) {
//       e.preventDefault();
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()].filter(tag => tag.length > 0),
//       }));
//       setTagInput('');
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove),
//     }));
//   };

//   // Memoize the Quill component to prevent unnecessary re-renders
//   const QuillEditor = React.memo(() => (
//     <ReactQuill
//       ref={quillRef}
//       value={formData.content}
//       onChange={(content) => setFormData(prev => ({ ...prev, content }))}
//       modules={{
//         toolbar: {
//           container: [
//             [{ header: [1, 2, 3, false] }],
//             ['bold', 'italic', 'blockquote'],
//             [{ list: 'ordered' }, { list: 'bullet' }],
//             ['link', 'image'],
//           ],
//           handlers: {
//             image: imageHandler,
//           },
//         },
//       }}
//       formats={['header', 'bold', 'italic', 'blockquote', 'list', 'bullet', 'link', 'image']}
//       className="mb-[4rem]"
//     />
//   ), [formData.content]);

//   if (previewPost) {
//     return (
//       <div className="relative min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f3f4f6]">
//         <header className="sticky top-0 z-[50] bg-gradient-to-r from-[#f97316] to-[#f59e0b] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
//           <div className="max-w-[69.375rem] mx-auto p-[1.5rem] flex items-center justify-between">
//             <h2 className="text-[1.875rem] font-bold text-[#ffffff] tracking-[-0.025rem]">
//               Blog Preview: {previewPost.title.slice(0, 55)}{previewPost.title.length > 55 && <span>...</span>}
//             </h2>
//             <Button
//               onClick={() => setPreviewPost(null)}
//               variant="outline"
//               className="flex items-center gap-[0.5rem] bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#f97316] border-[#fed7aa] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-[0.3s] rounded-[1.5rem] p-[0.5rem] [1rem]"
//             >
//               <ArrowLeft className="w-[1.25rem] h-[1.25rem]" />
//               <span className="font-medium">Back to Editor</span>
//             </Button>
//           </div>
//         </header>

//         <main className="max-w-[62.5rem] mx-auto p-[1.5rem] pt-[3rem]">
//           <Card className="shadow-[0_10px_15px_rgba(0,0,0,0.1)] border-0 rounded-[1.5rem] overflow-hidden bg-[#ffffff]/95 backdrop-blur-[0.5rem]">
//             {previewPost.image && (
//               <div className="relative aspect-[16/9] overflow-hidden">
//                 <img
//                   src={previewPost.image}
//                   alt={previewPost.title}
//                   className="w-full h-full object-cover transform hover:scale-[1.05] transition-transform duration-[0.5s] ease-in-out"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 to-transparent" />
//               </div>
//             )}

//             <CardContent className="p-[2.5rem] md:p-[3.5rem] space-y-[2rem]">
//               <div className="flex justify-start">
//                 <span className="inline-block bg-[#fee2b3] text-[#f97316] p-[0.5rem] [1.25rem] rounded-[1rem] text-[0.875rem] font-semibold tracking-[0.1rem] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#ffd580] transition-colors duration-[0.3s]">
//                   {previewPost.category}
//                 </span>
//               </div>

//               <h1
//                 className="text-[1.5rem] md:text-[2.25rem] font-extrabold text-[#1f2937] tracking-[-0.025rem]"
//                 style={{ fontFamily: "'Georgia', serif" }}
//               >
//                 {previewPost.title}
//               </h1>

//               {previewPost.excerpt && (
//                 <p
//                   className="text-[1.125rem] md:text-[1.25rem] text-[#4b5563] leading-[1.625rem] font-light italic border-l-[0.25rem] border-[#f97316] pl-[1rem]"
//                   style={{ fontFamily: "'Georgia', serif" }}
//                 >
//                   {previewPost.excerpt}
//                 </p>
//               )}

//               <div className="flex items-center text-[#6b7280] text-[1rem] md:text-[1.125rem] space-x-[1rem]">
//                 <div className="flex items-center">
//                   <User className="w-[1.25rem] h-[1.25rem] mr-[0.5rem] text-[#f97316]" />
//                   <span className="font-medium text-[#1f2937]">{previewPost.author}</span>
//                 </div>
//                 <span className="text-[#d1d5db]">•</span>
//                 <div className="flex items-center">
//                   <Calendar className="w-[1.25rem] h-[1.25rem] mr-[0.5rem] text-[#f97316]" />
//                   <span>
//                     {new Date(previewPost.date).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric',
//                     })}
//                   </span>
//                 </div>
//                 <span className="text-[#d1d5db]">•</span>
//                 <div className="flex items-center flex-wrap">
//                   {previewPost.tags.map((tag, index) => (
//                     <span key={index} className="bg-[#e5e7eb] text-[#374151] text-[0.875rem] p-[0.25rem] [0.75rem] rounded-[0.5rem] mr-[0.5rem] mb-[0.25rem]">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <article className="prose prose-[1.125rem] max-w-none text-[#1f2937] leading-[1.625rem] tracking-[0.025rem]">
//                 <div dangerouslySetInnerHTML={{ __html: previewPost.content }} />
//               </article>
//             </CardContent>
//           </Card>
//         </main>

//         <div className="fixed bottom-[1.5rem] right-[1.5rem] z-[50] hidden md:block">
//           <Button
//             onClick={() => setPreviewPost(null)}
//             variant="outline"
//             className="bg-[#f97316] text-[#ffffff] hover:bg-[#ea580c] border-none rounded-[1rem] p-[1rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.2)] transition-all duration-[0.3s]"
//           >
//             <ArrowLeft className="w-[1.5rem] h-[1.5rem]" />
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (isCreating) {
//     return (
//       <div className="min-h-screen bg-[#ffffff]">
//         <div className="border-b border-[#e5e7eb] bg-[#ffffff]/95 backdrop-blur-[0.5rem] top-0 z-[40]">
//           <div className="p-[1rem] py-[1.5rem]">
//             <div className="flex items-center justify-between max-w-[69.375rem] mx-auto">
//               <div className="flex items-center gap-[1rem]">
//                 <Button
//                   variant="ghost"
//                   onClick={handleCancel}
//                   className="flex items-center gap-[0.5rem] hover:bg-[#f3f4f6]"
//                 >
//                   <ArrowLeft className="w-[1rem] h-[1rem]" />
//                   Back
//                 </Button>
//                 <div className="h-[1.5rem] w-[0.0625rem] bg-[#e5e7eb]" />
//                 <h1 className="text-[1.25rem] font-semibold text-[#1f2937]">
//                   {editingId ? 'Edit Story' : 'Write a Story'}
//                 </h1>
//               </div>
//               <div className="flex items-center gap-[0.75rem]">
//                 <span className="text-[0.875rem] text-[#6b7280]">
//                   Draft auto-saved
//                 </span>
//                 <Button 
//                   onClick={() => handlePreview({ 
//                     ...formData, 
//                     _id: editingId || Date.now(),
//                     date: new Date().toISOString(),
//                     status: 'Draft'
//                   })} 
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-[0.5rem]"
//                 >
//                   <Eye className="w-[1rem] h-[1rem]" />
//                   Preview
//                 </Button>
//                 <Button 
//                   onClick={handleSave} 
//                   className="bg-[#16a34a] hover:bg-[#15803d] text-[#ffffff]"
//                   size="sm"
//                 >
//                   <Save className="w-[1rem] h-[1rem] mr-[0.5rem]" />
//                   Save Blog
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-[78.125rem] mx-auto">
//           <div className="p-[1.5rem] pt-[3rem]">
//             {formData.image ? (
//               <div className="relative mb-[3rem] group">
//                 <img
//                   src={formData.image}
//                   alt="Cover"
//                   className="w-full h-[20rem] object-cover rounded-[0.75rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
//                 />
//                 <div className="absolute inset-0 bg-[#000000] bg-opacity-0 group-hover:bg-opacity-[0.2] transition-all duration-[0.2s] rounded-[0.75rem] flex items-center justify-center">
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-[0.2s]"
//                     onClick={() => {
//                       setFormData({ ...formData, image: '' });
//                       setImageFile(null);
//                     }}
//                   >
//                     <X className="w-[1rem] h-[1rem] mr-[0.5rem]" />
//                     Remove Cover
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <label className="block mb-[3rem] border-[0.125rem] border-dashed border-[#d1d5db] rounded-[0.75rem] p-[3rem] cursor-pointer hover:border-[#f97316] hover:bg-[#fefcbf]/50 transition-all duration-[0.2s] group">
//                 <div className="text-center">
//                   <div className="mx-auto w-[4rem] h-[4rem] bg-[#f3f4f6] rounded-[1rem] flex items-center justify-center mb-[1rem] group-hover:bg-[#fed7aa] transition-colors">
//                     <Upload className="w-[2rem] h-[2rem] text-[#9ca3af] group-hover:text-[#f97316]" />
//                   </div>
//                   <p className="text-[1.25rem] text-[#374151] mb-[0.5rem] font-medium">Add a cover image</p>
//                   <p className="text-[0.875rem] text-[#6b7280]">click to browse</p>
//                   <p className="text-[0.75rem] text-[#9ca3af] mt-[0.5rem]">Recommended: 1600 x 900 pixels</p>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) handleImageUpload(file);
//                   }}
//                   className="hidden"
//                 />
//               </label>
//             )}

//             <QuillEditor /> {/* Use memoized Quill component */}

//             <div className="mt-[4rem] pt-[2rem] border-t border-[#e5e7eb]">
//               <div className="bg-[#f9fafb] rounded-[0.75rem] p-[2rem]">
//                 <div className="flex items-center gap-[0.75rem] mb-[1.5rem]">
//                   <div className="w-[2.5rem] h-[2.5rem] bg-[#fee2b3] rounded-[0.75rem] flex items-center justify-center">
//                     <FileText className="w-[1.25rem] h-[1.25rem] text-[#f97316]" />
//                   </div>
//                   <div>
//                     <h3 className="text-[1.125rem] font-semibold text-[#1f2937]">Story Settings</h3>
//                     <p className="text-[0.875rem] text-[#6b7280]">Configure your story's metadata and settings</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem]">
//                   <div className="space-y-[0.5rem]">
//                     <Label htmlFor="author" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
//                       <User className="w-[1rem] h-[1rem]" />
//                       Author
//                     </Label>
//                     <Input
//                       id="author"
//                       value={formData.author}
//                       onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                       placeholder="Enter author name"
//                       className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
//                     />
//                   </div>
//                   <div className="space-y-[0.5rem]">
//                     <Label htmlFor="category" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
//                       <Tag className="w-[1rem] h-[1rem]" />
//                       Category
//                     </Label>
//                     <Input
//                       id="category"
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       placeholder="Enter story category"
//                       className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
//                     />
//                   </div>
//                   <div className="space-y-[0.5rem]">
//                     <Label htmlFor="tags" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
//                       <Tag className="w-[1rem] h-[1rem]" />
//                       Tags
//                     </Label>
//                     <div className="flex flex-wrap gap-[0.5rem] mb-[0.5rem]">
//                       {formData.tags.map((tag, index) => (
//                         <span key={index} className="bg-[#e5e7eb] text-[#374151] text-[0.875rem] p-[0.25rem] [0.75rem] rounded-[0.5rem] flex items-center">
//                           {tag}
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeTag(tag)}
//                             className="ml-[0.25rem] p-[0.125rem] hover:bg-[#ef4444] hover:text-[#ffffff]"
//                           >
//                             <XCircle className="w-[0.75rem] h-[0.75rem]" />
//                           </Button>
//                         </span>
//                       ))}
//                     </div>
//                     <Input
//                       id="tags"
//                       value={tagInput}
//                       onChange={(e) => setTagInput(e.target.value)}
//                       onKeyDown={handleTagInputKeyDown}
//                       placeholder="Type a tag and press Enter"
//                       className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ... (rest of the component, including preview and table sections, remains unchanged)

//   return (
//     <div className="space-y-[1.5rem]">
//       {showDeleteDialog && (
//         <div className="fixed inset-0 bg-[#000000] bg-opacity-[0.5] flex items-center justify-center z-[50]">
//           <div className="bg-[#ffffff] dark:bg-[#1f2937] rounded-[0.5rem] p-[1.5rem] w-full max-w-[48rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
//             <h3 className="text-[1.125rem] font-semibold text-[#1f2937] dark:text-[#ffffff] mb-[1rem]">
//               Confirm Deletion
//             </h3>
//             <p className="text-[#6b7280] dark:text-[#d1d5db] mb-[1.5rem]">
//               Are you sure you want to delete this blog post? This action cannot be undone.
//             </p>
//             <div className="flex justify-end gap-[0.5rem]">
//               <Button
//                 variant="outline"
//                 onClick={cancelDelete}
//                 className="text-[#6b7280] dark:text-[#d1d5db] border-[#d1d5db] dark:border-[#4b5563] hover:bg-[#f3f4f6] dark:hover:bg-[#374151]"
//               >
//                 No
//               </Button>
//               <Button
//                 variant="destructive"
//                 onClick={confirmDelete}
//                 className="bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff]"
//               >
//                 Yes
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Card className="border-0 shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
//         <CardHeader className="bg-gradient-to-r from-[#fefcbf] to-[#fef3c7] border-b border-[#fed7aa]">
//           <div className="flex flex-row items-center justify-between">
//             <div>
//               <CardTitle className="text-[1.5rem] text-[#1f2937] flex items-center gap-[0.75rem]">
//                 <div className="w-[2.5rem] h-[2.5rem] bg-[#fee2b3] rounded-[0.75rem] flex items-center justify-center">
//                   <FileText className="w-[1.25rem] h-[1.25rem] text-[#f97316]" />
//                 </div>
//                 Blog Posts Management
//               </CardTitle>
//               <p className="text-[#6b7280] mt-[0.5rem]">Create, edit, and manage your blog content</p>
//             </div>
//             <Button onClick={() => setIsCreating(true)} className="bg-[#f97316] hover:bg-[#ea580c] text-[#ffffff] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
//               <PlusCircle className="w-[1rem] h-[1rem] mr-[0.5rem]" />
//               Write New Story
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Author</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {posts.map((post) => (
//                 <TableRow key={post._id}>
//                   <TableCell className="font-medium">
//                     {post.title.slice(0, 55)}
//                     {post.title.length > 55 && <span>...</span>}
//                   </TableCell>
//                   <TableCell>
//                     {post.author.slice(0, 30)}
//                     {post.author.length > 30 && <span>...</span>}
//                   </TableCell>
//                   <TableCell>
//                     {new Date(post.date).toLocaleDateString('en-US', { 
//                       year: 'numeric', 
//                       month: 'short', 
//                       day: 'numeric' 
//                     })}
//                   </TableCell>
//                   <TableCell>
//                     {post.category.slice(0, 30)}
//                     {post.category.length > 30 && <span>...</span>}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className={`text-[0.75rem] ${
//                         post.status === 'Published' 
//                           ? 'bg-[#d1fae5] text-[#10b981] hover:bg-[#a7f3d0]' 
//                           : 'bg-[#fef3c7] text-[#f59e0b] hover:bg-[#fde68a]'
//                       }`}
//                     >
//                       {post.status}
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex gap-[0.5rem]">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handlePreview(post)}
//                       >
//                         <Eye className="w-[1rem] h-[1rem]" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleEdit(post)}
//                       >
//                         <Edit3 className="w-[1rem] h-[1rem]" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleDeleteClick(post._id)}
//                       >
//                         <Trash2 className="w-[1rem] h-[1rem]" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BlogManagement;



// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { Card, CardContent, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
// import { Button } from '../../TSX-src/components/ui/button';
// import { Input } from '../../TSX-src/components/ui/input';
// import { Label } from '../../TSX-src/components/ui/label';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../TSX-src/components/ui/table';
// import { PlusCircle, Edit3, Trash2, Save, X, Eye, Upload, ArrowLeft, Calendar, User, Tag, FileText, XCircle } from 'lucide-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import toast from 'react-hot-toast';
// import imageCompression from 'browser-image-compression';

// // Load environment variables using Vite
// const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// // Mock data
// const mockPosts = [
//   { _id: '1', title: 'Sample Blog 1', author: 'John Doe', date: new Date(), category: 'Technology', status: 'Draft', image: 'https://via.placeholder.com/1600x900', tags: ['tech', 'innovation'], content: '<h1>Introduction <img src="https://via.placeholder.com/600x400" /></h1><p>This is a sample paragraph with an <img src="https://via.placeholder.com/300x200" /> image.</p>' },
//   { _id: '2', title: 'Sample Blog 2', author: 'Jane Smith', date: new Date(), category: 'Lifestyle', status: 'Published', image: 'https://via.placeholder.com/1600x900', tags: ['lifestyle', 'travel'], content: '<h2>Heading 2 <img src="https://via.placeholder.com/500x300" /></h2><p>Another sample paragraph.</p>' },
// ];

// const BlogManagement = () => {
//   const [posts] = useState(mockPosts);
//   const [isCreating, setIsCreating] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [previewPost, setPreviewPost] = useState(null);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [postToDelete, setPostToDelete] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     excerpt: '',
//     category: '',
//     image: '',
//     tags: [],
//     content: '',
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [tagInput, setTagInput] = useState('');

//   useEffect(() => {
//     if (!cloudName || !uploadPreset) {
//       toast.error('Cloudinary configuration is missing. Check .env file and ensure VITE_ prefix is used.');
//     }
//   }, []);

//   const validateForm = () => {
//     if (!formData.title.trim()) {
//       toast.error('Title is required.');
//       return false;
//     }
//     if (!formData.author.trim()) {
//       toast.error('Author is required.');
//       return false;
//     }
//     if (!formData.content.trim()) {
//       toast.error('Content is required.');
//       return false;
//     }
//     if (!formData.category.trim()) {
//       toast.error('Category is required.');
//       return false;
//     }
//     if (!formData.image.trim()) {
//       toast.error('An image is required.');
//       return false;
//     }
//     return true;
//   };

//   const handleImageUpload = async (file) => {
//     if (!file || !file.type.startsWith('image/')) {
//       toast.error('Please select a valid image file.');
//       return;
//     }

//     try {
//       console.log(`📷 Original file size: ${(file.size / 1024).toFixed(2)} KB`);
//       let compressedFile = file;

//       if (file.size > 800 * 1024) {
//         const options = {
//           maxSizeMB: 1,
//           maxWidthOrHeight: 1024,
//           useWebWorker: true,
//           initialQuality: 0.8,
//         };
//         compressedFile = await imageCompression(file, options);
//         console.log(`🗜️ Compressed file size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
//         toast.success('Image compressed and uploaded.');
//       } else {
//         console.log('⚠️ Skipped compression due to small file size.');
//       }

//       const formDataToUpload = new FormData();
//       formDataToUpload.append('file', compressedFile);
//       formDataToUpload.append('upload_preset', uploadPreset);
//       formDataToUpload.append('cloud_name', cloudName);

//       const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//         method: 'POST',
//         body: formDataToUpload,
//       });

//       const result = await response.json();
//       if (result.secure_url) {
//         setFormData(prev => ({ ...prev, image: result.secure_url }));
//         setImageFile(compressedFile);
//       } else {
//         throw new Error('Image upload failed');
//       }
//     } catch (error) {
//       console.error('❌ Image upload failed:', error);
//       toast.error('Failed to upload image to Cloudinary.');
//     }
//   };

//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files?.[0];
//       if (file) {
//         try {
//           const compressedFile = await imageCompression(file, {
//             maxSizeMB: 1,
//             maxWidthOrHeight: 1024,
//             useWebWorker: true,
//             initialQuality: 0.8,
//           });

//           const formDataToUpload = new FormData();
//           formDataToUpload.append('file', compressedFile);
//           formDataToUpload.append('upload_preset', uploadPreset);
//           formDataToUpload.append('cloud_name', cloudName);

//           const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//             method: 'POST',
//             body: formDataToUpload,
//           });

//           const result = await response.json();
//           if (result.secure_url) {
//             const quill = document.querySelector('.ql-editor');
//             if (quill) {
//               const range = quill.getSelection();
//               if (range) {
//                 quill.insertEmbed(range.index, 'image', result.secure_url);
//               }
//             }
//           } else {
//             throw new Error('Image upload failed');
//           }
//         } catch (error) {
//           console.error('❌ Image upload failed:', error);
//           toast.error('Failed to upload image to Cloudinary.');
//         }
//       }
//     };
//   };

//   const handleSave = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const blogData = { ...formData };
//       console.log('Saved blog:', blogData);
//       setIsCreating(false);
//       setFormData({ title: '', author: '', excerpt: '', category: '', image: '', tags: [], content: '' });
//       setImageFile(null);
//       setTagInput('');
//     } catch (error) {
//       // Error is already handled in context
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setPostToDelete(id);
//     setShowDeleteDialog(true);
//   };

//   const confirmDelete = async () => {
//     if (postToDelete) {
//       console.log('Deleted blog:', postToDelete);
//       setShowDeleteDialog(false);
//       setPostToDelete(null);
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteDialog(false);
//     setPostToDelete(null);
//   };

//   const handleEdit = (post) => {
//     setFormData({
//       title: post.title,
//       author: post.author,
//       excerpt: post.excerpt || '',
//       category: post.category || '',
//       image: post.image || '',
//       tags: post.tags || [],
//       content: post.content || '',
//     });
//     setEditingId(post._id);
//     setIsCreating(true);
//     setImageFile(null);
//     setTagInput('');
//   };

//   const handleCancel = () => {
//     setIsCreating(false);
//     setEditingId(null);
//     setPreviewPost(null);
//     setFormData({ title: '', author: '', excerpt: '', category: '', image: '', tags: [], content: '' });
//     setImageFile(null);
//     setTagInput('');
//   };

//   const handlePreview = (post) => {
//     setPreviewPost(post);
//   };

//   const handleTagInputKeyDown = (e) => {
//     if (e.key === 'Enter' && tagInput.trim()) {
//       e.preventDefault();
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()].filter(tag => tag.length > 0),
//       }));
//       setTagInput('');
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove),
//     }));
//   };

//   if (previewPost) {
//     return (
//       <div className="relative min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f3f4f6]">
//         <header className="sticky top-0 z-[50] bg-gradient-to-r from-[#f97316] to-[#f59e0b] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
//           <div className="max-w-[69.375rem] mx-auto p-[1.5rem] flex items-center justify-between">
//             <h2 className="text-[1.875rem] font-bold text-[#ffffff] tracking-[-0.025rem]">
//               Blog Preview: {previewPost.title.slice(0, 55)}{previewPost.title.length > 55 && <span>...</span>}
//             </h2>
//             <Button
//               onClick={() => setPreviewPost(null)}
//               variant="outline"
//               className="flex items-center gap-[0.5rem] bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#f97316] border-[#fed7aa] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-[0.3s] rounded-[1.5rem] p-[0.5rem] [1rem]"
//             >
//               <ArrowLeft className="w-[1.25rem] h-[1.25rem]" />
//               <span className="font-medium">Back to Editor</span>
//             </Button>
//           </div>
//         </header>

//         <main className="max-w-[62.5rem] mx-auto p-[1.5rem] pt-[3rem]">
//           <Card className="shadow-[0_10px_15px_rgba(0,0,0,0.1)] border-0 rounded-[1.5rem] overflow-hidden bg-[#ffffff]/95 backdrop-blur-[0.5rem]">
//             {previewPost.image && (
//               <div className="relative aspect-[16/9] overflow-hidden">
//                 <img
//                   src={previewPost.image}
//                   alt={previewPost.title}
//                   className="w-full h-full object-cover transform hover:scale-[1.05] transition-transform duration-[0.5s] ease-in-out"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 to-transparent" />
//               </div>
//             )}

//             <CardContent className="p-[2.5rem] md:p-[3.5rem] space-y-[2rem]">
//               <div className="flex justify-start">
//                 <span className="inline-block bg-[#fee2b3] text-[#f97316] p-[0.5rem] [1.25rem] rounded-[1rem] text-[0.875rem] font-semibold tracking-[0.1rem] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#ffd580] transition-colors duration-[0.3s]">
//                   {previewPost.category}
//                 </span>
//               </div>

//               <h1
//                 className="text-[1.5rem] md:text-[2.25rem] font-extrabold text-[#1f2937] tracking-[-0.025rem]"
//                 style={{ fontFamily: "'Georgia', serif" }}
//               >
//                 {previewPost.title}
//               </h1>

//               {previewPost.excerpt && (
//                 <p
//                   className="text-[1.125rem] md:text-[1.25rem] text-[#4b5563] leading-[1.625rem] font-light italic border-l-[0.25rem] border-[#f97316] pl-[1rem]"
//                   style={{ fontFamily: "'Georgia', serif" }}
//                 >
//                   {previewPost.excerpt}
//                 </p>
//               )}

//               <div className="flex items-center text-[#6b7280] text-[1rem] md:text-[1.125rem] space-x-[1rem]">
//                 <div className="flex items-center">
//                   <User className="w-[1.25rem] h-[1.25rem] mr-[0.5rem] text-[#f97316]" />
//                   <span className="font-medium text-[#1f2937]">{previewPost.author}</span>
//                 </div>
//                 <span className="text-[#d1d5db]">•</span>
//                 <div className="flex items-center">
//                   <Calendar className="w-[1.25rem] h-[1.25rem] mr-[0.5rem] text-[#f97316]" />
//                   <span>
//                     {new Date(previewPost.date).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric',
//                     })}
//                   </span>
//                 </div>
//                 <span className="text-[#d1d5db]">•</span>
//                 <div className="flex items-center flex-wrap">
//                   {previewPost.tags.map((tag, index) => (
//                     <span key={index} className="bg-[#e5e7eb] text-[#374151] text-[0.875rem] p-[0.25rem] [0.75rem] rounded-[0.5rem] mr-[0.5rem] mb-[0.25rem]">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <article className="prose prose-[1.125rem] max-w-none text-[#1f2937] leading-[1.625rem] tracking-[0.025rem]">
//                 <div dangerouslySetInnerHTML={{ __html: previewPost.content }} />
//               </article>
//             </CardContent>
//           </Card>
//         </main>

//         <div className="fixed bottom-[1.5rem] right-[1.5rem] z-[50] hidden md:block">
//           <Button
//             onClick={() => setPreviewPost(null)}
//             variant="outline"
//             className="bg-[#f97316] text-[#ffffff] hover:bg-[#ea580c] border-none rounded-[1rem] p-[1rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.2)] transition-all duration-[0.3s]"
//           >
//             <ArrowLeft className="w-[1.5rem] h-[1.5rem]" />
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (isCreating) {
//     return (
//       <div className="min-h-screen bg-[#ffffff]">
//         <div className="border-b border-[#e5e7eb] bg-[#ffffff]/95 backdrop-blur-[0.5rem] top-0 z-[40]">
//           <div className="p-[1rem] py-[1.5rem]">
//             <div className="flex items-center justify-between max-w-[69.375rem] mx-auto">
//               <div className="flex items-center gap-[1rem]">
//                 <Button
//                   variant="ghost"
//                   onClick={handleCancel}
//                   className="flex items-center gap-[0.5rem] hover:bg-[#f3f4f6]"
//                 >
//                   <ArrowLeft className="w-[1rem] h-[1rem]" />
//                   Back
//                 </Button>
//                 <div className="h-[1.5rem] w-[0.0625rem] bg-[#e5e7eb]" />
//                 <h1 className="text-[1.25rem] font-semibold text-[#1f2937]">
//                   {editingId ? 'Edit Story' : 'Write a Story'}
//                 </h1>
//               </div>
//               <div className="flex items-center gap-[0.75rem]">
//                 <span className="text-[0.875rem] text-[#6b7280]">
//                   Draft auto-saved
//                 </span>
//                 <Button 
//                   onClick={() => handlePreview({ 
//                     ...formData, 
//                     _id: editingId || Date.now(),
//                     date: new Date().toISOString(),
//                     status: 'Draft'
//                   })} 
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-[0.5rem]"
//                 >
//                   <Eye className="w-[1rem] h-[1rem]" />
//                   Preview
//                 </Button>
//                 <Button 
//                   onClick={handleSave} 
//                   className="bg-[#16a34a] hover:bg-[#15803d] text-[#ffffff]"
//                   size="sm"
//                 >
//                   <Save className="w-[1rem] h-[1rem] mr-[0.5rem]" />
//                   Save Blog
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-[78.125rem] mx-auto">
//           <div className="p-[1.5rem] pt-[3rem]">
//             {formData.image ? (
//               <div className="relative mb-[3rem] group">
//                 <img
//                   src={formData.image}
//                   alt="Cover"
//                   className="w-full h-[20rem] object-cover rounded-[0.75rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
//                 />
//                 <div className="absolute inset-0 bg-[#000000] bg-opacity-0 group-hover:bg-opacity-[0.2] transition-all duration-[0.2s] rounded-[0.75rem] flex items-center justify-center">
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-[0.2s]"
//                     onClick={() => {
//                       setFormData({ ...formData, image: '' });
//                       setImageFile(null);
//                     }}
//                   >
//                     <X className="w-[1rem] h-[1rem] mr-[0.5rem]" />
//                     Remove Cover
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <label className="block mb-[3rem] border-[0.125rem] border-dashed border-[#d1d5db] rounded-[0.75rem] p-[3rem] cursor-pointer hover:border-[#f97316] hover:bg-[#fefcbf]/50 transition-all duration-[0.2s] group">
//                 <div className="text-center">
//                   <div className="mx-auto w-[4rem] h-[4rem] bg-[#f3f4f6] rounded-[1rem] flex items-center justify-center mb-[1rem] group-hover:bg-[#fed7aa] transition-colors">
//                     <Upload className="w-[2rem] h-[2rem] text-[#9ca3af] group-hover:text-[#f97316]" />
//                   </div>
//                   <p className="text-[1.25rem] text-[#374151] mb-[0.5rem] font-medium">Add a cover image</p>
//                   <p className="text-[0.875rem] text-[#6b7280]">click to browse</p>
//                   <p className="text-[0.75rem] text-[#9ca3af] mt-[0.5rem]">Recommended: 1600 x 900 pixels</p>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) handleImageUpload(file);
//                   }}
//                   className="hidden"
//                 />
//               </label>
//             )}

//             <ReactQuill
//               value={formData.content}
//               onChange={(content) => setFormData(prev => ({ ...prev, content }))}
//               modules={{
//                 toolbar: {
//                   container: [
//                     [{ header: [1, 2, 3, false] }],
//                     ['bold', 'italic', 'blockquote'],
//                     [{ list: 'ordered' }, { list: 'bullet' }],
//                     ['link', 'image'],
//                   ],
//                   handlers: {
//                     image: imageHandler,
//                   },
//                 },
//               }}
//               formats={['header', 'bold', 'italic', 'blockquote', 'list', 'bullet', 'link', 'image']}
//               className="mb-[4rem]"
//             />

//             <div className="mt-[4rem] pt-[2rem] border-t border-[#e5e7eb]">
//               <div className="bg-[#f9fafb] rounded-[0.75rem] p-[2rem]">
//                 <div className="flex items-center gap-[0.75rem] mb-[1.5rem]">
//                   <div className="w-[2.5rem] h-[2.5rem] bg-[#fee2b3] rounded-[0.75rem] flex items-center justify-center">
//                     <FileText className="w-[1.25rem] h-[1.25rem] text-[#f97316]" />
//                   </div>
//                   <div>
//                     <h3 className="text-[1.125rem] font-semibold text-[#1f2937]">Story Settings</h3>
//                     <p className="text-[0.875rem] text-[#6b7280]">Configure your story's metadata and settings</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem]">
//                   <div className="space-y-[0.5rem]">
//                     <Label htmlFor="author" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
//                       <User className="w-[1rem] h-[1rem]" />
//                       Author
//                     </Label>
//                     <Input
//                       id="author"
//                       value={formData.author}
//                       onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                       placeholder="Enter author name"
//                       className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
//                     />
//                   </div>
//                   <div className="space-y-[0.5rem]">
//                     <Label htmlFor="category" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
//                       <Tag className="w-[1rem] h-[1rem]" />
//                       Category
//                     </Label>
//                     <Input
//                       id="category"
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       placeholder="Enter story category"
//                       className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
//                     />
//                   </div>
//                   <div className="space-y-[0.5rem]">
//                     <Label htmlFor="tags" className="text-[0.875rem] font-medium text-[#374151] flex items-center gap-[0.5rem]">
//                       <Tag className="w-[1rem] h-[1rem]" />
//                       Tags
//                     </Label>
//                     <div className="flex flex-wrap gap-[0.5rem] mb-[0.5rem]">
//                       {formData.tags.map((tag, index) => (
//                         <span key={index} className="bg-[#e5e7eb] text-[#374151] text-[0.875rem] p-[0.25rem] [0.75rem] rounded-[0.5rem] flex items-center">
//                           {tag}
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeTag(tag)}
//                             className="ml-[0.25rem] p-[0.125rem] hover:bg-[#ef4444] hover:text-[#ffffff]"
//                           >
//                             <XCircle className="w-[0.75rem] h-[0.75rem]" />
//                           </Button>
//                         </span>
//                       ))}
//                     </div>
//                     <Input
//                       id="tags"
//                       value={tagInput}
//                       onChange={(e) => setTagInput(e.target.value)}
//                       onKeyDown={handleTagInputKeyDown}
//                       placeholder="Type a tag and press Enter"
//                       className="bg-[#ffffff] border-[#d1d5db] focus:border-[#f97316] focus:ring-[#f97316]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-[1.5rem]">
//       {showDeleteDialog && (
//         <div className="fixed inset-0 bg-[#000000] bg-opacity-[0.5] flex items-center justify-center z-[50]">
//           <div className="bg-[#ffffff] dark:bg-[#1f2937] rounded-[0.5rem] p-[1.5rem] w-full max-w-[48rem] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
//             <h3 className="text-[1.125rem] font-semibold text-[#1f2937] dark:text-[#ffffff] mb-[1rem]">
//               Confirm Deletion
//             </h3>
//             <p className="text-[#6b7280] dark:text-[#d1d5db] mb-[1.5rem]">
//               Are you sure you want to delete this blog post? This action cannot be undone.
//             </p>
//             <div className="flex justify-end gap-[0.5rem]">
//               <Button
//                 variant="outline"
//                 onClick={cancelDelete}
//                 className="text-[#6b7280] dark:text-[#d1d5db] border-[#d1d5db] dark:border-[#4b5563] hover:bg-[#f3f4f6] dark:hover:bg-[#374151]"
//               >
//                 No
//               </Button>
//               <Button
//                 variant="destructive"
//                 onClick={confirmDelete}
//                 className="bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff]"
//               >
//                 Yes
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Card className="border-0 shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
//         <CardHeader className="bg-gradient-to-r from-[#fefcbf] to-[#fef3c7] border-b border-[#fed7aa]">
//           <div className="flex flex-row items-center justify-between">
//             <div>
//               <CardTitle className="text-[1.5rem] text-[#1f2937] flex items-center gap-[0.75rem]">
//                 <div className="w-[2.5rem] h-[2.5rem] bg-[#fee2b3] rounded-[0.75rem] flex items-center justify-center">
//                   <FileText className="w-[1.25rem] h-[1.25rem] text-[#f97316]" />
//                 </div>
//                 Blog Posts Management
//               </CardTitle>
//               <p className="text-[#6b7280] mt-[0.5rem]">Create, edit, and manage your blog content</p>
//             </div>
//             <Button onClick={() => setIsCreating(true)} className="bg-[#f97316] hover:bg-[#ea580c] text-[#ffffff] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
//               <PlusCircle className="w-[1rem] h-[1rem] mr-[0.5rem]" />
//               Write New Story
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Author</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {posts.map((post) => (
//                 <TableRow key={post._id}>
//                   <TableCell className="font-medium">
//                     {post.title.slice(0, 55)}
//                     {post.title.length > 55 && <span>...</span>}
//                   </TableCell>
//                   <TableCell>
//                     {post.author.slice(0, 30)}
//                     {post.author.length > 30 && <span>...</span>}
//                   </TableCell>
//                   <TableCell>
//                     {new Date(post.date).toLocaleDateString('en-US', { 
//                       year: 'numeric', 
//                       month: 'short', 
//                       day: 'numeric' 
//                     })}
//                   </TableCell>
//                   <TableCell>
//                     {post.category.slice(0, 30)}
//                     {post.category.length > 30 && <span>...</span>}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className={`text-[0.75rem] ${
//                         post.status === 'Published' 
//                           ? 'bg-[#d1fae5] text-[#10b981] hover:bg-[#a7f3d0]' 
//                           : 'bg-[#fef3c7] text-[#f59e0b] hover:bg-[#fde68a]'
//                       }`}
//                     >
//                       {post.status}
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex gap-[0.5rem]">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handlePreview(post)}
//                       >
//                         <Eye className="w-[1rem] h-[1rem]" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleEdit(post)}
//                       >
//                         <Edit3 className="w-[1rem] h-[1rem]" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleDeleteClick(post._id)}
//                       >
//                         <Trash2 className="w-[1rem] h-[1rem]" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BlogManagement;