'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { authenticatedFetch } from '@/lib/auth';
import { uploadBlogImage } from '@/lib/upload';
import { z } from 'zod';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  X,
  Plus,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

// Zod validation schema for blog post (same as new form)
const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required').max(100, 'Author name must be less than 100 characters'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean(),
  status: z.string().min(1, 'Status is required'),
  image: z.string().min(1, 'Featured image is required'),
});

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState({ open: false, type: 'success', message: '' });
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'luxury',
    author: 'Ahmed Al-Rashid',
    tags: [],
    featured: false,
    status: 'draft',
    image: '🚗'
  });

  const [newTag, setNewTag] = useState('');
  const [imageFile, setImageFile] = useState(null); // File object for upload
  const [imagePreview, setImagePreview] = useState('🚗'); // Preview URL
  const [uploadingImage, setUploadingImage] = useState(false);

  const categories = [
    { value: 'luxury', label: 'Luxury Cars' },
    { value: 'tips', label: 'Driving Tips' },
    { value: 'events', label: 'Events' },
    { value: 'news', label: 'Industry News' }
  ];

  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await authenticatedFetch(`${apiUrl}/blogs/${blogId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post');
        }

        const blog = await response.json();

        // Populate form with blog data
        const existingImage = blog.featuredImage || blog.image || '🚗';
        setFormData({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
          category: blog.category || 'luxury',
          author: blog.author || 'Ahmed Al-Rashid',
          tags: blog.tags || [],
          featured: blog.isFeatured || blog.featured || false,
          status: blog.status || 'draft',
          image: existingImage
        });
        // Set preview for existing image
        if (existingImage && existingImage !== '🚗') {
          setImagePreview(existingImage);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        showToast('error', error.message || 'Failed to load blog post');
        setTimeout(() => {
          router.push('/admin/blogs');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const showToast = (type, message) => {
    setToast({ open: true, type, message });
    setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 2500);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('error', 'Please select an image file');
      return;
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showToast('error', 'Image file must be less than 5MB');
      return;
    }

    // Store file for upload and create preview
    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    setFormData((prev) => ({ ...prev, image: preview })); // Temporary preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate with Zod
      const validatedData = blogSchema.parse(formData);

      setIsSubmitting(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      const payload = {
        ...validatedData,
        tags: validatedData.tags || [],
        isFeatured: validatedData.featured,
        featuredImage: validatedData.image,
      };

      const res = await authenticatedFetch(`${apiUrl}/blogs/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to update blog');
      }

      showToast('success', 'Blog post updated successfully');
      setTimeout(() => router.push('/admin/blogs'), 600);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
        showToast('error', 'Please fix the validation errors');
      } else {
        const msg = err.message === 'Failed to fetch'
          ? 'Cannot connect to backend server. Please make sure the server is running.'
          : err.message;
        showToast('error', msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {toast.open && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/blogs"
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
              <p className="text-gray-600">Update your blog post</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePreview}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Update Post'}
            </button>
          </div>
        </div>

        {showPreview ? (
          /* Preview Mode */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {imagePreview && imagePreview !== '🚗' && (imagePreview.startsWith('http') || imagePreview.startsWith('data:') || imagePreview.startsWith('/')) ? (
                    <img src={imagePreview} alt="Featured" className="mx-auto max-h-64 object-contain" />
                  ) : (
                    imagePreview || '🚗'
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{formData.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{formData.excerpt}</p>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {formData.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    {categories.find(c => c.value === formData.category)?.label || formData.category}
                  </div>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {formData.content}
                </div>
              </div>
              {formData.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter blog post title..."
                  />
                </div>

                {/* Excerpt */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write a brief description of your blog post..."
                  />
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="Write your blog post content here..."
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Featured post
                      </label>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  
                  {/* Use a div instead of a nested form to avoid form-in-form */}
                  <div className="mb-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag(e);
                          }
                        }}
                        placeholder="Add a tag..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
                  <div className="space-y-3 text-center">
                    <div className="w-full h-40 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {imagePreview && imagePreview !== '🚗' && (imagePreview.startsWith('http') || imagePreview.startsWith('data:') || imagePreview.startsWith('/')) ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-full w-full object-contain"
                          onError={(e) => { e.target.src = '/cars/5.jpg'; }}
                        />
                      ) : imagePreview === '🚗' ? (
                        <div className="flex flex-col items-center text-gray-500">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <span className="text-sm">Upload an image</span>
                        </div>
                      ) : (
                        <div className="text-4xl">{imagePreview}</div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">Supported: JPG, PNG, GIF, WEBP. Max 5MB.</p>
                    {uploadingImage && (
                      <div className="flex items-center justify-center text-blue-600">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        <span className="text-sm">Uploading image...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}

