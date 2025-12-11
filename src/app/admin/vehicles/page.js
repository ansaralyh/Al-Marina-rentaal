"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { 
  Car, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter
} from 'lucide-react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetchVehicles = async () => {
  const response = await fetch(`${apiUrl}/vehicles`);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  return response.json();
};

const deleteVehicle = async (id) => {
  const response = await fetch(`${apiUrl}/vehicles/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete vehicle');
  }
  return true;
};

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');

  const queryClient = useQueryClient();
  const {
    data: vehicles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err) => {
      alert(`Error deleting vehicle: ${err.message}`);
    },
  });

  const normalizedVehicles = (vehicles || []).map((vehicle) => ({
    ...vehicle,
    id: vehicle._id || vehicle.id,
    price: vehicle.pricePerDay ?? vehicle.price ?? 0,
    currency: vehicle.currency || "د.إ",
    type: vehicle.bodyType || vehicle.type || "Sedan",
    category: vehicle.category || "Luxury",
    availability: vehicle.availability || "Available",
    images: vehicle.images?.map((img) => img.url || img) || [],
  }));

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

  const filteredVehicles = normalizedVehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || vehicle.category === filterCategory;
    const matchesAvailability = filterAvailability === 'all' || vehicle.availability === filterAvailability;
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-gray-700 font-semibold">Failed to load vehicles</p>
          <p className="text-sm text-gray-500">{error?.message}</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Fleet</h1>
            <p className="text-gray-600 mt-2">Manage your car rental fleet</p>
          </div>
          <Link
            href="/admin/vehicles/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Vehicle
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                <option value="Exotic">Exotic</option>
                <option value="Supercar">Supercar</option>
                <option value="Luxury">Luxury</option>
                <option value="Economy">Economy</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Availability</option>
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Vehicles</p>
            <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-2xl font-bold text-green-600">
              {vehicles.filter(v => v.availability === 'Available').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Reserved</p>
            <p className="text-2xl font-bold text-yellow-600">
              {vehicles.filter(v => v.availability === 'Reserved').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Filtered Results</p>
            <p className="text-2xl font-bold text-blue-600">{filteredVehicles.length}</p>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
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
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No vehicles found</p>
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-24 relative">
                            <img
                              className="h-16 w-24 object-cover rounded-lg"
                              src={vehicle.images?.[0] || vehicle.image}
                              alt={vehicle.name}
                              onError={(e) => {
                                e.target.src = '/cars/1.jpg';
                              }}
                            />
                            {vehicle.images && vehicle.images.length > 1 && (
                              <div className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                                +{vehicle.images.length - 1}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {vehicle.name}
                            </div>
                            {vehicle.images && vehicle.images.length > 1 && (
                              <div className="text-xs text-gray-500">
                                {vehicle.images.length} images
                              </div>
                            )}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.type}
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
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

