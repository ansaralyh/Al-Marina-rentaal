'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { authenticatedFetch } from '@/lib/auth';
import { uploadVehicleImages } from '@/lib/upload';
import { z } from 'zod';
import { ArrowLeft, Save, X, Loader2 } from 'lucide-react';

// Zod validation schema for vehicle (same as new form)
const vehicleSchema = z.object({
  name: z.string().min(1, 'Vehicle name is required').max(200, 'Vehicle name must be less than 200 characters'),
  make: z.string().min(1, 'Make is required').max(100, 'Make must be less than 100 characters'),
  model: z.string().min(1, 'Model is required').max(100, 'Model must be less than 100 characters'),
  year: z.string().min(1, 'Year is required').refine((val) => {
    const yearNum = Number(val);
    return !isNaN(yearNum) && yearNum >= 1900 && yearNum <= new Date().getFullYear() + 1;
  }, 'Year must be a valid year between 1900 and ' + (new Date().getFullYear() + 1)),
  category: z.string().min(1, 'Category is required'),
  type: z.string().min(1, 'Type is required'),
  bodyType: z.string().min(1, 'Body type is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  price: z.string().min(1, 'Price is required').refine((val) => {
    const priceNum = Number(val);
    return !isNaN(priceNum) && priceNum > 0;
  }, 'Price must be a positive number'),
  currency: z.string().min(1, 'Currency is required'),
  period: z.string().min(1, 'Period is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  description: z.string().optional(),
  availability: z.string().min(1, 'Availability is required'),
  engine: z.string().optional(),
  power: z.string().optional(),
  acceleration: z.string().optional(),
  topSpeed: z.string().optional(),
  seats: z.string().optional().refine((val) => {
    if (!val || val === '') return true;
    const seatsNum = Number(val);
    return !isNaN(seatsNum) && seatsNum > 0 && seatsNum <= 50;
  }, 'Seats must be a number between 1 and 50'),
  transmission: z.string().min(1, 'Transmission is required'),
  features: z.array(z.string()).optional(),
});

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });
  const [errors, setErrors] = useState({});
  const [pendingFiles, setPendingFiles] = useState([]); // Files waiting to be uploaded or already uploaded URLs
  const [formData, setFormData] = useState({
    name: '',
    make: '',
    model: '',
    year: '',
    category: 'Luxury',
    type: 'Sedan',
    bodyType: 'sedan',
    fuelType: 'Petrol',
    price: '',
    currency: 'د.إ',
    period: 'per day',
    images: [],
    newImage: '',
    description: '',
    availability: 'Available',
    engine: '',
    power: '',
    acceleration: '',
    topSpeed: '',
    seats: '',
    transmission: 'Automatic',
    features: [],
    newFeature: '',
  });

  const categories = ['Luxury', 'Exotic', 'Supercar', 'Economy', 'Premium'];
  const types = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Supercar', 'Mini Car'];
  const bodyTypes = [
    { id: 'sedan', name: 'Sedan' },
    { id: 'suv', name: 'SUV' },
    { id: 'coupe', name: 'Coupe' },
    { id: 'convertible', name: 'Convertible' },
    { id: 'supercar', name: 'Super Car' },
    { id: 'mini', name: 'Mini Car' },
  ];
  const fuelTypes = ['Petrol', 'Electric', 'Hybrid'];
  const availabilityOptions = ['Available', 'Reserved', 'Unavailable'];

  // Fetch vehicle data on mount
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await authenticatedFetch(`${apiUrl}/vehicles/${vehicleId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Vehicle not found');
          }
          throw new Error('Failed to fetch vehicle');
        }

        const vehicle = await response.json();

        // Populate form with vehicle data
        const existingImages = vehicle.images?.map(img => img.url || img) || [];
        setFormData({
          name: vehicle.name || '',
          make: vehicle.make || '',
          model: vehicle.model || '',
          year: vehicle.year?.toString() || '',
          category: vehicle.category || 'Luxury',
          type: vehicle.type || 'Sedan',
          bodyType: vehicle.bodyType || 'sedan',
          fuelType: vehicle.fuelType || 'Petrol',
          price: vehicle.pricePerDay?.toString() || '',
          currency: vehicle.currency || 'د.إ',
          period: vehicle.period || 'per day',
          images: existingImages, // Keep for backward compatibility
          newImage: '',
          description: vehicle.description || '',
          availability: vehicle.availability || 'Available',
          engine: vehicle.engine || '',
          power: vehicle.power || vehicle.horsepower || '',
          acceleration: vehicle.acceleration || '',
          topSpeed: vehicle.topSpeed || '',
          seats: vehicle.seats?.toString() || '',
          transmission: vehicle.transmission || 'Automatic',
          features: vehicle.features || [],
          newFeature: '',
        });
        
        // Populate pendingFiles with existing images (as URLs, already uploaded)
        setPendingFiles(existingImages.map((url, idx) => ({
          file: null,
          preview: url,
          url: url,
          uploaded: true,
        })));
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        showToast('error', error.message || 'Failed to load vehicle');
        setTimeout(() => {
          router.push('/admin/vehicles');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchVehicle();
    }
  }, [vehicleId, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleAddFeature = () => {
    if (formData.newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, prev.newFeature.trim()],
        newFeature: '',
      }));
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddImage = () => {
    if (formData.newImage.trim()) {
      // Add URL as a pending file (already "uploaded" since it's a URL)
      setPendingFiles(prev => [...prev, {
        file: null,
        preview: formData.newImage.trim(),
        url: formData.newImage.trim(),
        uploaded: true,
      }]);
      setFormData(prev => ({
        ...prev,
        newImage: '',
      }));
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Filter only image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      showToast('error', 'Please select image files only');
      return;
    }

    // Validate file sizes (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = imageFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      showToast('error', `Some files exceed 5MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    // Store files for preview (create object URLs)
    const previewUrls = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isUploading: false,
    }));

    setPendingFiles(prev => [...prev, ...previewUrls]);

    // Reset file input
    e.target.value = '';
  };

  // Upload pending files
  const uploadPendingFiles = async () => {
    const filesToUpload = pendingFiles.filter(pf => pf.file && !pf.uploaded && !pf.isUploading);
    if (filesToUpload.length === 0) return [];

    setUploadingImages(true);
    try {
      const files = filesToUpload.map(pf => pf.file);
      const result = await uploadVehicleImages(files);
      
      // Mark files as uploaded
      setPendingFiles(prev => prev.map(pf => {
        if (pf.file && !pf.uploaded) {
          const uploaded = result.files.find(f => f.originalName === pf.file.name);
          return uploaded ? { ...pf, uploaded: true, url: uploaded.url } : pf;
        }
        return pf;
      }));

      return result.urls;
    } catch (error) {
      console.error('Error uploading images:', error);
      showToast('error', error.message || 'Failed to upload images');
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (index) => {
    // Remove from pending files
    const fileToRemove = pendingFiles[index];
    if (fileToRemove?.preview && fileToRemove?.file) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImage = (index) => {
    const newFiles = [...pendingFiles];
    const [primaryFile] = newFiles.splice(index, 1);
    newFiles.unshift(primaryFile);
    setPendingFiles(newFiles);
  };

  const showToast = (type, message) => {
    setToast({ open: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate with Zod
      const validatedData = vehicleSchema.parse(formData);

      setSaving(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      const vehicleData = {
        ...validatedData,
        pricePerDay: Number(validatedData.price),
        year: Number(validatedData.year),
        seats: validatedData.seats ? Number(validatedData.seats) : undefined,
        images: validatedData.images.map((img, idx) => ({
          url: img,
          isPrimary: idx === 0,
        })),
      };

      const response = await authenticatedFetch(`${apiUrl}/vehicles/${vehicleId}`, {
        method: 'PUT',
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update vehicle');
      }

      showToast('success', 'Vehicle updated successfully');
      setTimeout(() => {
        router.push('/admin/vehicles');
      }, 600);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
        showToast('error', 'Please fix the validation errors');
      } else {
        console.error('Error updating vehicle:', error);
        const errorMessage = error.message === 'Failed to fetch' 
          ? 'Cannot connect to backend server. Please make sure the server is running.'
          : error.message;
        showToast('error', errorMessage);
      }
    } finally {
      setSaving(false);
    }
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
              href="/admin/vehicles"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Vehicle</h1>
              <p className="text-gray-600 mt-2">Update vehicle details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Lamborghini Urus Mansory"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Make *
                    </label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Lamborghini"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model *
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Urus"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year *
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      min="1900"
                      max="2100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Body Type *
                    </label>
                    <select
                      name="bodyType"
                      value={formData.bodyType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {bodyTypes.map(bt => (
                        <option key={bt.id} value={bt.id}>{bt.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuel Type *
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {fuelTypes.map(ft => (
                        <option key={ft} value={ft}>{ft}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability *
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {availabilityOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Day *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="3500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <input
                      type="text"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="د.إ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period
                    </label>
                    <input
                      type="text"
                      name="period"
                      value={formData.period}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="per day"
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Images</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Images from Folder *
                  </label>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-4h12m-4-4v12m0 0v-8a4 4 0 00-4-4h-4m-12 4a4 4 0 01-4-4V12a4 4 0 014-4h16a4 4 0 014 4v16"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF, WEBP up to 5MB (Select multiple images)
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Or Add Image URL (Optional)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={formData.newImage}
                          onChange={(e) => setFormData(prev => ({ ...prev, newImage: e.target.value }))}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddImage();
                            }
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://example.com/image.jpg or /cars/image.jpg"
                        />
                        <button
                          type="button"
                          onClick={handleAddImage}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>
                  {errors.images && (
                    <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                  )}
                </div>

                {/* Images Gallery */}
                {pendingFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {pendingFiles.map((fileData, index) => (
                      <div key={index} className="relative group">
                        <div className="relative">
                          <img
                            src={fileData.url || fileData.preview}
                            alt={`Vehicle image ${index + 1}`}
                            className="h-32 w-full object-cover rounded-lg border-2 border-gray-200"
                            onError={(e) => {
                              e.target.src = '/cars/1.jpg';
                            }}
                          />
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                              Primary
                            </div>
                          )}
                          {uploadingImages && !fileData.uploaded && fileData.file && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>
                          )}
                          {fileData.uploaded && fileData.file && (
                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              Uploaded
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(index)}
                            className="mt-2 w-full text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                          >
                            Set as Primary
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {pendingFiles.length === 0 && errors.images && (
                  <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a detailed description of the vehicle..."
                />
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Engine
                    </label>
                    <input
                      type="text"
                      name="engine"
                      value={formData.engine}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 4.0L V8 Twin Turbo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Power
                    </label>
                    <input
                      type="text"
                      name="power"
                      value={formData.power}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 641 HP"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Acceleration (0-100km/h)
                    </label>
                    <input
                      type="text"
                      name="acceleration"
                      value={formData.acceleration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 3.6s"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Top Speed
                    </label>
                    <input
                      type="text"
                      name="topSpeed"
                      value={formData.topSpeed}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 305 km/h"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seats
                    </label>
                    <input
                      type="text"
                      name="seats"
                      value={formData.seats}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transmission
                    </label>
                    <input
                      type="text"
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Automatic"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Features & Options</h2>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={formData.newFeature}
                    onChange={(e) => setFormData(prev => ({ ...prev, newFeature: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a feature (e.g., AWD, Leather Seats)"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Update Vehicle'}
                  </button>
                  <Link
                    href="/admin/vehicles"
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    * Required fields must be filled before saving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

