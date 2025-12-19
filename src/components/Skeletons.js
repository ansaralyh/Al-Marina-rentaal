'use client';

import React from 'react';

export function StatsSkeleton({ count = 4 }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${Math.min(count, 4)} gap-4`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 animate-pulse"
        >
          <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-6 w-16 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ columns = 5, rows = 5 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: columns }).map((_, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rIdx) => (
              <tr key={rIdx} className="animate-pulse">
                {Array.from({ length: columns }).map((_, cIdx) => (
                  <td key={cIdx} className="px-6 py-4">
                    <div className="h-4 w-full bg-gray-100 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


