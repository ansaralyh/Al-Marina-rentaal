import { getAuthToken } from './auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Upload vehicle images (multiple files)
 * @param {File[]} files - Array of File objects
 * @returns {Promise<{urls: string[], files: Array}>}
 */
export const uploadVehicleImages = async (files) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('vehicleImages', file);
  });

  const response = await fetch(`${apiUrl}/upload/vehicles`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Don't set Content-Type - browser will set it with boundary for FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to upload images' }));
    throw new Error(error.message || 'Failed to upload images');
  }

  return await response.json();
};

/**
 * Upload blog image (single file)
 * @param {File} file - File object
 * @returns {Promise<{url: string, file: Object}>}
 */
export const uploadBlogImage = async (file) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const formData = new FormData();
  formData.append('blogImage', file);

  const response = await fetch(`${apiUrl}/upload/blogs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Don't set Content-Type - browser will set it with boundary for FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to upload image' }));
    throw new Error(error.message || 'Failed to upload image');
  }

  return await response.json();
};

/**
 * Delete uploaded file
 * @param {string} type - 'vehicle' or 'blog'
 * @param {string} filename - Filename to delete
 */
export const deleteUploadedFile = async (type, filename) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${apiUrl}/upload/${type}/${filename}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to delete file' }));
    throw new Error(error.message || 'Failed to delete file');
  }

  return await response.json();
};

