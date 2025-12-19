'use client';

import React from 'react';
import { X, Car, Gauge, Fuel, Settings, Users, DollarSign, Image as ImageIcon } from 'lucide-react';

export default function VehicleDetailsModal({ open, vehicle, onClose }) {
  if (!open || !vehicle) return null;

  const mainImage = vehicle.images?.[0] || vehicle.image || '/cars/1.jpg';
  const extraImages = (vehicle.images || []).slice(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 z-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Car className="w-6 h-6 mr-2 text-blue-600" />
              {vehicle.name || `${vehicle.make || ''} ${vehicle.model || ''}`.trim() || 'Vehicle Details'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Images */}
            <div className="lg:col-span-1 space-y-3">
              <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                <img
                  src={mainImage}
                  alt={vehicle.name || 'Vehicle image'}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = '/cars/1.jpg';
                  }}
                />
                {vehicle.images && vehicle.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    {vehicle.images.length} photos
                  </div>
                )}
              </div>

              {extraImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {extraImages.slice(0, 3).map((img, idx) => (
                    <div
                      key={idx}
                      className="h-16 rounded-md overflow-hidden border border-gray-200 bg-gray-100"
                    >
                      <img
                        src={img}
                        alt={`Extra image ${idx + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = '/cars/1.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Make / Model</p>
                  <p className="text-sm text-gray-900">
                    {vehicle.make || 'N/A'} {vehicle.model}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Year</p>
                  <p className="text-sm text-gray-900">{vehicle.year || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Category</p>
                  <p className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {vehicle.category || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Availability</p>
                  <p className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                    {vehicle.availability || 'Unknown'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Price per day</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {vehicle.price} {vehicle.currency || 'د.إ'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gauge className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Transmission</p>
                    <p className="text-sm text-gray-900">
                      {vehicle.transmission || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Fuel Type</p>
                    <p className="text-sm text-gray-900">
                      {vehicle.fuelType || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Seats</p>
                    <p className="text-sm text-gray-900">
                      {vehicle.seats || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {vehicle.description && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Description</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {vehicle.description}
                  </p>
                </div>
              )}

              {vehicle.features && vehicle.features.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Features</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vehicle.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


