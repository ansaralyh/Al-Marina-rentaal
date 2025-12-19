'use client';

import React from 'react';
import { Mail, Phone, Car, Clock, X } from 'lucide-react';

export default function BookingDetailsModal({ open, booking, onClose }) {
  if (!open || !booking) return null;

  const pickup = booking.pickupDate
    ? new Date(booking.pickupDate).toLocaleString()
    : 'Not specified';

  const rawDropoff = booking.dropoffDate || booking.returnDate;
  const dropoff = rawDropoff
    ? new Date(rawDropoff).toLocaleString()
    : 'Not specified';

  const createdAt = booking.createdAt
    ? new Date(booking.createdAt).toLocaleString()
    : 'N/A';

  const handlePrint = () => {
    // Basic print for now – prints the full page including this modal
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full p-6 z-50">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Booking Details
              </h2>
              <p className="text-sm text-gray-500">
                Created on {createdAt}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status */}
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 capitalize">
              Status: {booking.status || 'pending'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Customer
              </h3>
              <p className="text-sm text-gray-900">
                {booking.name || 'N/A'}
              </p>
              {booking.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <a
                    href={`mailto:${booking.email}`}
                    className="hover:text-blue-600"
                  >
                    {booking.email}
                  </a>
                </div>
              )}
              {booking.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <a
                    href={`tel:${booking.phone}`}
                    className="hover:text-blue-600"
                  >
                    {booking.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Booking info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Booking
              </h3>
              <div className="flex items-center text-sm text-gray-900">
                <Car className="w-4 h-4 mr-2 text-gray-500" />
                <span>{booking.vehicle || booking.car || 'Not specified'}</span>
              </div>
              <div className="flex items-start text-sm text-gray-900">
                <Clock className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <div>
                    <span className="font-medium">Pickup:</span> {pickup}
                  </div>
                  <div>
                    <span className="font-medium">Dropoff:</span> {dropoff}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          {booking.message && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                Customer message
              </h3>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 whitespace-pre-wrap max-h-48 overflow-auto">
                {booking.message}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xs text-gray-400">
              Booking ID: {booking._id}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Print
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


