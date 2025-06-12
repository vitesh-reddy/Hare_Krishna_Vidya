import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Eye, Upload, ArrowLeft, Calendar, User, Tag, Camera, FileText } from 'lucide-react';
import MediumStyleEditor from './MediumStyleEditor';

const BlogManagement = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'The Impact of Your Donations',
      author: 'Hare Krishna Vidya Team',
      date: '2024-05-20',
      status: 'Published',
      content: 'Discover how your contributions are making a real difference in communities across India. Through our comprehensive donation programs, we have been able to reach thousands of families.',
      excerpt: 'Discover how your contributions are making a real difference in communities across India.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Impact Stories'
    },
    {
      id: 2,
      title: 'Sustainable Food Distribution',
      author: 'Dr. Radha Sharma',
      date: '2024-05-15',
      status: 'Draft',
      content: 'Learn about our sustainable methods for ensuring food reaches those who need it most. Our distribution network spans across multiple states.',
      excerpt: 'Learn about our sustainable methods for ensuring food reaches those who need it most.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Methodology'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    category: '',
    image: ''
  });

  const handleImageUpload = (file: File) => {
    // In a real app, you'd upload to a server
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, image: imageUrl });
  };

  const handleSave = () => {
    if (editingId) {
      setPosts(posts.map(post => 
        post.id === editingId 
          ? { ...post, ...formData, date: new Date().toISOString().split('T')[0] }
          : post
      ));
      setEditingId(null);
    } else {
      const newPost = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: 'Draft'
      };
      setPosts([...posts, newPost]);
      setIsCreating(false);
    }
    setFormData({ title: '', author: '', excerpt: '', content: '', category: '', image: '' });
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      author: post.author,
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || '',
      image: post.image || ''
    });
    setEditingId(post.id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setPreviewPost(null);
    setFormData({ title: '', author: '', excerpt: '', content: '', category: '', image: '' });
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
  };

  const togglePublishStatus = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'Published' ? 'Draft' : 'Published' }
        : post
    ));
  };

  if (previewPost) {
    return (
      <div className="space-y-6 bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">Blog Preview</h2>
            <Button onClick={() => setPreviewPost(null)} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </Button>
          </div>
        </div>
        
        {/* Enhanced Blog Preview */}
        <div className="max-w-4xl mx-auto px-6">
          <Card className="shadow-lg border-0">
            {previewPost.image && (
              <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                <img
                  src={previewPost.image}
                  alt={previewPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardContent className="p-12">
              <div className="mb-6">
                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                  {previewPost.category}
                </span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                {previewPost.title}
              </h1>
              {previewPost.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light" style={{ fontFamily: 'Georgia, serif' }}>
                  {previewPost.excerpt}
                </p>
              )}
              <div className="flex items-center text-gray-600 mb-8 text-lg">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{previewPost.author}</span>
                <span className="mx-3">•</span>
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(previewPost.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="prose prose-lg max-w-none">
                <div className="text-xl text-gray-800 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Georgia, serif' }}>
                  {previewPost.content}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Enhanced Medium-style editor view
  if (isCreating) {
    return (
      <div className="min-h-screen bg-white">
        {/* Enhanced Header */}
        <div className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40">
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
                    id: Date.now(), 
                    date: new Date().toISOString().split('T')[0],
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
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Enhanced Cover Image Section */}
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
                    onClick={() => setFormData({ ...formData, image: '' })}
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
                    <Camera className="w-8 h-8 text-gray-400 group-hover:text-orange-500" />
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

            {/* Medium Style Editor */}
            <MediumStyleEditor
              title={formData.title}
              content={formData.content}
              excerpt={formData.excerpt}
              onTitleChange={(title) => setFormData({ ...formData, title })}
              onContentChange={(content) => setFormData({ ...formData, content })}
              onExcerptChange={(excerpt) => setFormData({ ...formData, excerpt })}
              onImageUpload={handleImageUpload}
            />

            {/* Enhanced Metadata Section */}
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
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`text-xs ${
                        post.status === 'Published' 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      }`}
                      onClick={() => togglePublishStatus(post.id)}
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
                        onClick={() => handleDelete(post.id)}
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
