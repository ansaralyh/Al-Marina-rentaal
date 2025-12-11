"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from '@/components/AdminLayout';
import { 
  Car, 
  Eye, 
  Edit, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const fetchVehicles = async () => {
    const res = await fetch(`${apiUrl}/vehicles`);
    if (!res.ok) throw new Error("Failed to fetch vehicles");
    return res.json();
  };

  const fetchBlogs = async () => {
    const res = await fetch(`${apiUrl}/blogs`);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
  };

  const {
    data: vehicles = [],
    isLoading: vehiclesLoading,
    isError: vehiclesError,
    error: vehiclesErrObj,
  } = useQuery({ queryKey: ["dash-vehicles"], queryFn: fetchVehicles });

  const {
    data: blogs = [],
    isLoading: blogsLoading,
    isError: blogsError,
    error: blogsErrObj,
  } = useQuery({ queryKey: ["dash-blogs"], queryFn: fetchBlogs });

  const stats = useMemo(() => {
    const totalVehicles = vehicles.length;
    const availableVehicles = vehicles.filter((v) => (v.availability || "").toLowerCase() === "available").length;
    const reservedVehicles = vehicles.filter((v) => (v.availability || "").toLowerCase() === "reserved").length;
    const unavailableVehicles = vehicles.filter((v) => (v.availability || "").toLowerCase() === "unavailable").length;

    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter((b) => (b.status || "").toLowerCase() === "published").length;
    const draftBlogs = blogs.filter((b) => (b.status || "").toLowerCase() === "draft").length;
    const totalViews = blogs.reduce((sum, b) => sum + (Number(b.views) || 0), 0);

    return {
      totalVehicles,
      availableVehicles,
      reservedVehicles,
      unavailableVehicles,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalViews,
    };
  }, [vehicles, blogs]);

  const recentVehicles = useMemo(() => {
    return [...vehicles]
      .map((v) => {
        const primaryImage =
          v.images?.find?.((img) => img.isPrimary)?.url ||
          v.images?.[0]?.url ||
          v.images?.[0] ||
          v.image ||
          "/cars/1.jpg";
        return {
          ...v,
          id: v._id || v.id,
          price: v.pricePerDay ?? v.price ?? 0,
          currency: v.currency || "د.إ",
          availability: v.availability || "Available",
          category: v.category || "Luxury",
          image: primaryImage,
          createdAt: v.createdAt || v.updatedAt || new Date().toISOString(),
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [vehicles]);

  const recentBlogs = useMemo(() => {
    return [...blogs]
      .map((b) => ({
        ...b,
        id: b._id || b.id,
        status: b.status || "published",
        views: b.views ?? 0,
        author: b.author || "Admin",
        createdAt: b.createdAt || b.updatedAt || new Date().toISOString(),
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [blogs]);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'Unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Exotic':
        return 'bg-purple-100 text-purple-800';
      case 'Supercar':
        return 'bg-red-100 text-red-800';
      case 'Luxury':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (vehiclesLoading || blogsLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (vehiclesError || blogsError) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-3">
          <p className="text-lg font-semibold text-gray-800">Failed to load dashboard data</p>
          <p className="text-sm text-gray-600">
            {vehiclesErrObj?.message || blogsErrObj?.message || "Unknown error"}
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your vehicle fleet, blog content and analytics</p>
          </div>
          <Link
            href="/admin/vehicles/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Vehicle
          </Link>
        </div>

        {/* Stats Cards - Vehicles */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVehicles}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.availableVehicles}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Reserved</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.reservedVehicles}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unavailable</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.unavailableVehicles}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Blogs */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Blog Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBlogs}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.publishedBlogs}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Edit className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.draftBlogs}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Vehicles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Vehicles</h2>
            <Link
              href="/admin/vehicles"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Make / Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-16">
                          <img
                            className="h-12 w-16 object-cover rounded-lg"
                            src={vehicle.image}
                            alt={vehicle.name}
                            onError={(e) => {
                              e.target.src = '/cars/1.jpg';
                            }}
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {vehicle.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vehicle.make}</div>
                      <div className="text-sm text-gray-500">{vehicle.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(vehicle.category)}`}>
                        {vehicle.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {vehicle.price} {vehicle.currency}
                      </div>
                      <div className="text-xs text-gray-500">per day</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAvailabilityColor(vehicle.availability)}`}>
                        {vehicle.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(vehicle.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/fleet/cardetails`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/vehicles/${vehicle.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="text-red-600 hover:text-red-900" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h2>
            <Link
              href="/admin/blogs"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {blog.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blog.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blog.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="text-red-600 hover:text-red-900" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Fleet Management</h3>
                <p className="text-gray-600 text-sm">Manage your vehicle fleet</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/vehicles"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View all vehicles →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Content Management</h3>
                <p className="text-gray-600 text-sm">Create and manage blog posts</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/blogs"
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                View all blogs →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
                <p className="text-gray-600 text-sm">Track rental performance</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-400 text-sm">Coming soon</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                <p className="text-gray-600 text-sm">Configure your settings</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/settings"
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                Manage settings →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
