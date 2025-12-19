"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from '@/components/AdminLayout';
import { authenticatedFetch } from '@/lib/auth';
import {
  Car,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Calendar,
  Plus,
  Settings,
  DollarSign,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

const KPI_DELTA_COLORS = {
  positive: 'text-green-600 bg-green-50',
  negative: 'text-red-600 bg-red-50',
  neutral: 'text-gray-600 bg-gray-50',
};

const CATEGORY_COLORS = [
  '#4F46E5', // Luxury
  '#10B981', // SUV
  '#F59E0B', // Sedan
  '#EF4444', // Sports
  '#6B7280', // Other
];

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetchVehicles = async () => {
  const res = await fetch(`${apiUrl}/vehicles`);
  if (!res.ok) throw new Error('Failed to fetch vehicles');
  return res.json();
};

const fetchBlogs = async () => {
  const res = await fetch(`${apiUrl}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

const fetchAnalytics = async () => {
  const res = await authenticatedFetch(`${apiUrl}/bookings/analytics`);
  if (!res.ok) throw new Error('Failed to fetch dashboard analytics');
  return res.json();
};

const formatPercent = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '–';
  return `${value.toFixed ? value.toFixed(1) : value}%`;
};

const getDeltaMeta = (value) => {
  if (value > 0) {
    return {
      label: `+${value.toFixed(1)}% vs last month`,
      className: KPI_DELTA_COLORS.positive,
      sign: '+',
    };
  }
  if (value < 0) {
    return {
      label: `${value.toFixed(1)}% vs last month`,
      className: KPI_DELTA_COLORS.negative,
      sign: '',
    };
  }
  return {
    label: 'No change vs last month',
    className: KPI_DELTA_COLORS.neutral,
    sign: '',
  };
};

export default function AdminDashboard() {
  const {
    data: vehicles = [],
    isLoading: vehiclesLoading,
    isError: vehiclesError,
    error: vehiclesErrObj,
  } = useQuery({ queryKey: ['dash-vehicles'], queryFn: fetchVehicles });

  const {
    data: blogs = [],
    isLoading: blogsLoading,
    isError: blogsError,
    error: blogsErrObj,
  } = useQuery({ queryKey: ['dash-blogs'], queryFn: fetchBlogs });

  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
    error: analyticsErrObj,
  } = useQuery({ queryKey: ['dash-analytics'], queryFn: fetchAnalytics });

  const stats = useMemo(() => {
    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter(
      (b) => (b.status || '').toLowerCase() === 'published',
    ).length;
    const draftBlogs = blogs.filter(
      (b) => (b.status || '').toLowerCase() === 'draft',
    ).length;
    const totalViews = blogs.reduce(
      (sum, b) => sum + (Number(b.views) || 0),
      0,
    );

    return {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalViews,
    };
  }, [blogs]);

  const recentVehicles = useMemo(() => {
    return [...vehicles]
      .map((v) => {
        const primaryImage =
          v.images?.find?.((img) => img.isPrimary)?.url ||
          v.images?.[0]?.url ||
          v.images?.[0] ||
          v.image ||
          '/cars/1.jpg';
        return {
          ...v,
          id: v._id || v.id,
          price: v.pricePerDay ?? v.price ?? 0,
          currency: v.currency || 'د.إ',
          availability: v.availability || 'Available',
          category: v.category || 'Luxury',
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
        status: b.status || 'published',
        views: b.views ?? 0,
        author: b.author || 'Admin',
        createdAt: b.createdAt || b.updatedAt || new Date().toISOString(),
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [blogs]);

  const bookingTrendData = analytics?.bookingTrends || [];
  const revenueTrendData = analytics?.revenueTrends || [];
  const bookingsByCategory = analytics?.bookingsByCategory || [];
  const topVehicles = analytics?.topVehicles || [];

  const kpis = analytics?.kpis || {
    totalVehicles: vehicles.length,
    activeBookings: 0,
    fleetUtilization: 0,
    bookingsThisMonth: 0,
    bookingsLastMonth: 0,
    bookingsMoMChange: 0,
  };

  const bookingsDeltaMeta = getDeltaMeta(kpis.bookingsMoMChange || 0);

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
    const key = (category || '').toLowerCase();
    if (key.includes('luxury')) return 'bg-blue-100 text-blue-800';
    if (key.includes('suv')) return 'bg-emerald-100 text-emerald-800';
    if (key.includes('sedan')) return 'bg-amber-100 text-amber-800';
    if (key.includes('sport') || key.includes('super')) {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-gray-800';
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

  if (vehiclesLoading || blogsLoading || analyticsLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading executive dashboard…</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (vehiclesError || blogsError || analyticsError) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-3">
          <p className="text-lg font-semibold text-gray-800">
            Failed to load dashboard data
          </p>
          <p className="text-sm text-gray-600">
            {vehiclesErrObj?.message ||
              blogsErrObj?.message ||
              analyticsErrObj?.message ||
              'Unknown error'}
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Real-time insight into fleet performance and booking trends
            </p>
          </div>
          <Link
            href="/admin/vehicles/new"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Vehicle
          </Link>
        </div>

        {/* KPI Row */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Total Vehicles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {kpis.totalVehicles || 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Active inventory available for rental across all categories.
              </p>
            </div>

            {/* Active Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {kpis.activeBookings || 0}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Current and upcoming reservations in the system.
              </p>
            </div>

            {/* Fleet Utilization */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Fleet Utilization (30 days)</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {formatPercent(kpis.fleetUtilization || 0)}
                  </p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Share of fleet days booked over the last 30 days.
              </p>
            </div>

            {/* Bookings This Month */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bookings This Month</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {kpis.bookingsThisMonth || 0}
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <div className={`mt-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bookingsDeltaMeta.className}`}>
                {bookingsDeltaMeta.label}
              </div>
            </div>
          </div>
        </section>

        {/* Trend charts */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Booking trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Booking Trend (Last 30 days)</h2>
                <p className="text-sm text-gray-500">
                  Daily bookings, including online and manual reservations.
                </p>
              </div>
            </div>
            {bookingTrendData.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                No bookings recorded in the last 30 days.
              </div>
            ) : (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingTrendData} margin={{ left: -15, right: 10, top: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: 12 }}
                      labelStyle={{ fontWeight: 600 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#4F46E5"
                      strokeWidth={2.2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Revenue trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Revenue Trend (Approx.)</h2>
                <p className="text-sm text-gray-500">
                  Estimated revenue per day based on booking durations and vehicle daily rates.
                </p>
              </div>
            </div>
            {revenueTrendData.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-500 text-center">
                Revenue data will appear once bookings are linked to vehicles with daily pricing.
              </div>
            ) : (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueTrendData} margin={{ left: -15, right: 10, top: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <Tooltip
                      formatter={(value) => [`${value} د.إ`, 'Revenue']}
                      contentStyle={{ fontSize: 12 }}
                      labelStyle={{ fontWeight: 600 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2.2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </section>

        {/* Category + Top vehicles */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Bookings by category */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Bookings by Vehicle Category
            </h2>
            {bookingsByCategory.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                No category data yet. Bookings will be grouped by vehicle segment once available.
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="count"
                        nameKey="category"
                        data={bookingsByCategory}
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={2}
                      >
                        {bookingsByCategory.map((entry, index) => (
                          <Cell
                            key={entry.category}
                            fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [value, 'Bookings']}
                        contentStyle={{ fontSize: 12 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="md:w-1/2 space-y-2">
                  {bookingsByCategory.map((item, index) => (
                    <div
                      key={item.category}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                        />
                        <span className="text-gray-700">{item.category}</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Top 5 most booked vehicles */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top 5 Most Booked Vehicles
            </h2>
            {topVehicles.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                Once bookings are created, your best-performing vehicles will appear here.
              </div>
            ) : (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topVehicles}
                    layout="vertical"
                    margin={{ left: 60, right: 10, top: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis
                      dataKey="vehicleName"
                      type="category"
                      width={120}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip
                      formatter={(value) => [value, 'Bookings']}
                      contentStyle={{ fontSize: 12 }}
                    />
                    <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 4, 4]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </section>

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
                        <div className="shrink-0 h-12 w-16">
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
