"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from '@/components/AdminLayout';
import { authenticatedFetch } from '@/lib/auth';
import { exportToCSV, exportToExcel } from '@/lib/export';
import { StatsSkeleton, TableSkeleton } from '@/components/Skeletons';
import BookingDetailsModal from '@/components/BookingDetailsModal';
import { 
  Calendar, 
  Search,
  Filter,
  Mail,
  Phone,
  Car,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  FileSpreadsheet
} from 'lucide-react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetchBookings = async () => {
  const response = await authenticatedFetch(`${apiUrl}/bookings`);
  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return response.json();
};

const updateBookingStatus = async ({ id, status }) => {
  const response = await authenticatedFetch(`${apiUrl}/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update booking status");
  }

  return response.json();
};

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings,
  });

  const statusMutation = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => {
      // Refresh bookings after a successful update
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  const handleStatusChange = (bookingId, nextStatus) => {
    if (!bookingId || !nextStatus) return;
    statusMutation.mutate({ id: bookingId, status: nextStatus });
  };

  // Determine which actions are available for a given status.
  // Simple, clear flow:
  // - pending   → confirm / cancel
  // - confirmed → complete / cancel
  // - completed / cancelled → no further actions
  const getAvailableActions = (status) => {
    const normalized = (status || "pending").toLowerCase();
    if (normalized === "pending") {
      return [
        { key: "confirm", label: "Confirm", nextStatus: "confirmed", color: "emerald" },
        { key: "cancel", label: "Cancel", nextStatus: "cancelled", color: "red" },
      ];
    }
    if (normalized === "confirmed") {
      return [
        { key: "complete", label: "Complete", nextStatus: "completed", color: "blue" },
        { key: "cancel", label: "Cancel", nextStatus: "cancelled", color: "red" },
      ];
    }
    return [];
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.vehicle?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status?.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status?.toLowerCase() === 'pending').length,
    confirmed: bookings.filter(b => b.status?.toLowerCase() === 'confirmed').length,
    cancelled: bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length,
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Stats skeleton */}
          <StatsSkeleton count={4} />

          {/* Filters skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-100 rounded" />
              <div className="h-10 bg-gray-100 rounded" />
            </div>
          </div>

          {/* Table skeleton */}
          <TableSkeleton columns={7} rows={6} />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-center text-red-600 p-8">
          Error loading bookings: {error.message}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-600 mt-2">
              Manage and view all vehicle booking inquiries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const columns = [
                  { key: 'name', label: 'Customer Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'vehicle', label: 'Vehicle' },
                  { key: 'pickupDate', label: 'Pickup Date' },
                  { key: 'dropoffDate', label: 'Dropoff Date' },
                  { key: 'status', label: 'Status' },
                  { key: 'createdAt', label: 'Date Submitted' },
                ];
                // Format dates for export
                const exportData = filteredBookings.map(booking => ({
                  ...booking,
                  pickupDate: booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : '',
                  dropoffDate: booking.dropoffDate ? new Date(booking.dropoffDate).toLocaleDateString() : '',
                  createdAt: booking.createdAt ? new Date(booking.createdAt).toLocaleString() : '',
                }));
                exportToCSV(exportData, columns, 'bookings');
              }}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              title="Export to CSV"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </button>
            <button
              onClick={async () => {
                const columns = [
                  { key: 'name', label: 'Customer Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'vehicle', label: 'Vehicle' },
                  { key: 'pickupDate', label: 'Pickup Date' },
                  { key: 'dropoffDate', label: 'Dropoff Date' },
                  { key: 'status', label: 'Status' },
                  { key: 'createdAt', label: 'Date Submitted' },
                ];
                // Format dates for export
                const exportData = filteredBookings.map(booking => ({
                  ...booking,
                  pickupDate: booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : '',
                  dropoffDate: booking.dropoffDate ? new Date(booking.dropoffDate).toLocaleDateString() : '',
                  createdAt: booking.createdAt ? new Date(booking.createdAt).toLocaleString() : '',
                }));
                await exportToExcel(exportData, columns, 'bookings');
              }}
              className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
              title="Export to Excel"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Excel
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or vehicle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      {bookings.length === 0 ? 'No bookings found.' : 'No bookings match your search criteria.'}
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.name || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Car className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {booking.vehicle || booking.car || 'Not specified'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.pickupDate ? (
                            <>
                              <div className="font-medium">
                                {new Date(booking.pickupDate).toLocaleDateString()}
                              </div>
                              {booking.dropoffDate && (
                                <div className="text-gray-500 text-xs">
                                  to {new Date(booking.dropoffDate).toLocaleDateString()}
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-400">Not specified</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm space-y-1">
                          {booking.email && (
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-3 h-3 mr-1" />
                              <a href={`mailto:${booking.email}`} className="hover:text-blue-600">
                                {booking.email}
                              </a>
                            </div>
                          )}
                          {booking.phone && (
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-3 h-3 mr-1" />
                              <a href={`tel:${booking.phone}`} className="hover:text-blue-600">
                                {booking.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status || 'Pending'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(booking)}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 mr-1"
                        >
                          View
                        </button>
                        {getAvailableActions(booking.status).length === 0 ? (
                          <span className="text-xs text-gray-400 italic">No further actions</span>
                        ) : (
                          getAvailableActions(booking.status).map((action) => {
                            const isThisRowUpdating =
                              statusMutation.isPending &&
                              statusMutation.variables?.id === booking._id;

                            const colorClass =
                              action.color === "emerald"
                                ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                : action.color === "blue"
                                  ? "border-blue-200 text-blue-700 hover:bg-blue-50"
                                  : "border-red-200 text-red-700 hover:bg-red-50";

                            return (
                              <button
                                key={action.key}
                                type="button"
                                onClick={() => handleStatusChange(booking._id, action.nextStatus)}
                                disabled={isThisRowUpdating}
                                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colorClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                              >
                                {action.label}
                              </button>
                            );
                          })
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking details modal */}
        <BookingDetailsModal
          open={!!selectedBooking}
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      </div>
    </AdminLayout>
  );
}

