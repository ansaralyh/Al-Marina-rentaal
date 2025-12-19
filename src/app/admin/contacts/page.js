"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from '@/components/AdminLayout';
import { authenticatedFetch } from '@/lib/auth';
import { exportToCSV, exportToExcel } from '@/lib/export';
import { StatsSkeleton, TableSkeleton } from '@/components/Skeletons';
import { 
  Mail, 
  Search,
  Filter,
  Phone,
  MessageSquare,
  Globe,
  Clock,
  User,
  Trash2,
  CheckCircle,
  Circle,
  Loader2,
  Download,
  FileSpreadsheet
} from 'lucide-react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetchContacts = async () => {
  const response = await authenticatedFetch(`${apiUrl}/contacts`);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
};

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [filterRead, setFilterRead] = useState('all'); // 'all', 'read', 'unread'
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: contacts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });

  // Mark as read/unread mutation
  const markReadMutation = useMutation({
    mutationFn: async ({ contactId, read }) => {
      const response = await authenticatedFetch(`${apiUrl}/contacts/${contactId}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read }),
      });
      if (!response.ok) {
        throw new Error('Failed to update contact status');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  // Delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: async (contactId) => {
      const response = await authenticatedFetch(`${apiUrl}/contacts/${contactId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setDeleteConfirm(null);
      if (selectedContact && deleteConfirm === selectedContact._id) {
        setSelectedContact(null);
      }
    },
  });

  // Auto-mark as read when viewing a contact
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    // Auto-mark as read if unread
    if (!contact.read) {
      markReadMutation.mutate({ 
        contactId: contact._id, 
        read: true 
      });
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSource = filterSource === 'all' || contact.source?.toLowerCase() === filterSource.toLowerCase();
    
    const matchesRead = 
      filterRead === 'all' || 
      (filterRead === 'read' && contact.read === true) ||
      (filterRead === 'unread' && (contact.read === false || !contact.read));
    
    return matchesSearch && matchesSource && matchesRead;
  });

  const stats = {
    total: contacts.length,
    unread: contacts.filter(c => !c.read || c.read === false).length,
    today: contacts.filter(c => {
      if (!c.createdAt) return false;
      const today = new Date();
      const contactDate = new Date(c.createdAt);
      return today.toDateString() === contactDate.toDateString();
    }).length,
    thisWeek: contacts.filter(c => {
      if (!c.createdAt) return false;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(c.createdAt) >= weekAgo;
    }).length,
    thisMonth: contacts.filter(c => {
      if (!c.createdAt) return false;
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return new Date(c.createdAt) >= monthAgo;
    }).length,
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-72 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Stats skeleton */}
          <StatsSkeleton count={5} />

          {/* Filters skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-100 rounded" />
              <div className="h-10 bg-gray-100 rounded" />
            </div>
          </div>

          {/* Table skeleton */}
          <TableSkeleton columns={8} rows={6} />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-center text-red-600 p-8">
          Error loading contacts: {error.message}
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
            <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-600 mt-2">
              Manage and view all contact form submissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const columns = [
                  { key: 'name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'subject', label: 'Subject' },
                  { key: 'service', label: 'Service' },
                  { key: 'message', label: 'Message' },
                  { key: 'source', label: 'Source' },
                  { key: 'read', label: 'Read Status' },
                  { key: 'createdAt', label: 'Date Submitted' },
                ];
                // Format data for export
                const exportData = filteredContacts.map(contact => ({
                  ...contact,
                  read: contact.read ? 'Read' : 'Unread',
                  createdAt: contact.createdAt ? new Date(contact.createdAt).toLocaleString() : '',
                }));
                exportToCSV(exportData, columns, 'contacts');
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
                  { key: 'name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'subject', label: 'Subject' },
                  { key: 'service', label: 'Service' },
                  { key: 'message', label: 'Message' },
                  { key: 'source', label: 'Source' },
                  { key: 'read', label: 'Read Status' },
                  { key: 'createdAt', label: 'Date Submitted' },
                ];
                // Format data for export
                const exportData = filteredContacts.map(contact => ({
                  ...contact,
                  read: contact.read ? 'Read' : 'Unread',
                  createdAt: contact.createdAt ? new Date(contact.createdAt).toLocaleString() : '',
                }));
                await exportToExcel(exportData, columns, 'contacts');
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <Circle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
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
                placeholder="Search by name, email, phone, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
              <select
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject / Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      {contacts.length === 0 ? 'No contacts found.' : 'No contacts match your search criteria.'}
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr 
                      key={contact._id} 
                      className={`hover:bg-gray-50 ${!contact.read ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.name || 'Anonymous'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm space-y-1">
                          {contact.email && (
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-3 h-3 mr-1" />
                              <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                                {contact.email}
                              </a>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-3 h-3 mr-1" />
                              <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          {!contact.email && !contact.phone && (
                            <span className="text-gray-400 text-xs">No contact info</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm space-y-1">
                          {contact.subject && (
                            <div className="font-medium text-gray-900">{contact.subject}</div>
                          )}
                          {contact.service && (
                            <div className="text-gray-600 text-xs">{contact.service}</div>
                          )}
                          {!contact.subject && !contact.service && (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md">
                          {contact.message ? (
                            <p className="line-clamp-2">
                              {contact.message}
                            </p>
                          ) : (
                            <span className="text-gray-400">No message</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 capitalize">
                            {contact.source || 'website'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.read ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Read
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Circle className="w-3 h-3 mr-1" />
                            Unread
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.createdAt ? (
                          <div>
                            <div>{new Date(contact.createdAt).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-400">
                              {new Date(contact.createdAt).toLocaleTimeString()}
                            </div>
                          </div>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewContact(contact)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                            title="View details"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => markReadMutation.mutate({ 
                              contactId: contact._id, 
                              read: !contact.read 
                            })}
                            disabled={markReadMutation.isPending}
                            className={`flex items-center disabled:opacity-50 ${
                              contact.read 
                                ? 'text-gray-600 hover:text-gray-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                            title={contact.read ? 'Mark as unread' : 'Mark as read'}
                          >
                            {markReadMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : contact.read ? (
                              <Circle className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(contact._id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                            title="Delete contact"
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

        {/* Message Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedContact(null)}></div>
              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                    <p className="text-lg text-gray-900">{selectedContact.name || 'Anonymous'}</p>
                  </div>
                  
                  {selectedContact.email && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                      <a href={`mailto:${selectedContact.email}`} className="text-lg text-blue-600 hover:underline">
                        {selectedContact.email}
                      </a>
                    </div>
                  )}
                  
                  {selectedContact.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                      <a href={`tel:${selectedContact.phone}`} className="text-lg text-blue-600 hover:underline">
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Source</h3>
                    <p className="text-lg text-gray-900 capitalize">{selectedContact.source || 'website'}</p>
                  </div>
                  
                  {selectedContact.subject && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Subject</h3>
                      <p className="text-lg text-gray-900">{selectedContact.subject}</p>
                    </div>
                  )}
                  
                  {selectedContact.service && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Service Interested In</h3>
                      <p className="text-lg text-gray-900">{selectedContact.service}</p>
                    </div>
                  )}
                  
                  {selectedContact.message && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Message</h3>
                      <p className="text-lg text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                    <p className="text-lg">
                      {selectedContact.read ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Read
                          {selectedContact.readAt && (
                            <span className="ml-2 text-xs">
                              ({new Date(selectedContact.readAt).toLocaleString()})
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          <Circle className="w-4 h-4 mr-1" />
                          Unread
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Date Submitted</h3>
                    <p className="text-lg text-gray-900">
                      {selectedContact.createdAt 
                        ? new Date(selectedContact.createdAt).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        markReadMutation.mutate({ 
                          contactId: selectedContact._id, 
                          read: !selectedContact.read 
                        });
                        if (selectedContact.read === false) {
                          setSelectedContact({ ...selectedContact, read: true });
                        }
                      }}
                      disabled={markReadMutation.isPending}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        selectedContact.read
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      } disabled:opacity-50`}
                    >
                      {markReadMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : selectedContact.read ? (
                        <>
                          <Circle className="w-4 h-4" />
                          Mark as Unread
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Mark as Read
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setDeleteConfirm(selectedContact._id);
                        setSelectedContact(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                  <div className="flex gap-3">
                    {selectedContact.email && (
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Reply via Email
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={() => setDeleteConfirm(null)}></div>
              <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Delete Contact</h2>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete this contact? This action cannot be undone.
                </p>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(deleteConfirm)}
                    disabled={deleteMutation.isPending}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

