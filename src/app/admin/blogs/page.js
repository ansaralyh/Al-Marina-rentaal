"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "../../../components/AdminLayout";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  User,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const fetchBlogs = async () => {
  const response = await fetch(`${apiUrl}/blogs`);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};

const deleteBlog = async (id) => {
  const response = await fetch(`${apiUrl}/blogs/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }
  return true;
};

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const queryClient = useQueryClient();
  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      alert(`Error deleting blog: ${err.message}`);
    },
  });

  const normalizedBlogs = (blogs || []).map((blog) => ({
    ...blog,
    id: blog._id || blog.id,
    status: blog.status || "published",
    category: blog.category || "luxury",
    views: blog.views ?? 0,
    author: blog.author || "Admin",
    createdAt: blog.createdAt || blog.updatedAt || new Date().toISOString(),
  }));

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "luxury", label: "Luxury Cars" },
    { value: "tips", label: "Driving Tips" },
    { value: "events", label: "Events" },
    { value: "news", label: "Industry News" },
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "archived", label: "Archived" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "luxury":
        return "bg-blue-100 text-blue-800";
      case "tips":
        return "bg-orange-100 text-orange-800";
      case "events":
        return "bg-purple-100 text-purple-800";
      case "news":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBlogs = normalizedBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || blog.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || blog.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "date":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "views":
        return b.views - a.views;
      case "author":
        return a.author.localeCompare(b.author);
      default:
        return 0;
    }
  });

  const handleDelete = (blogId) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteMutation.mutate(blogId);
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
          <p className="text-gray-700 font-semibold">Failed to load blogs</p>
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
            <h1 className="text-3xl font-bold text-gray-900">
              Blog Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your blog posts and content
            </p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            New Blog Post
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="views">Sort by Views</option>
              <option value="author">Sort by Author</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.filter((blog) => blog.status === "published").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.filter((blog) => blog.status === "draft").length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {blogs
                    .reduce((sum, blog) => sum + blog.views, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Blog Posts ({filteredBlogs.length})
            </h2>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Title
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Category
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Status
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Author
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    Views
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Date
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-2 py-3 w-16">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {blog.featured && (
                            <span className="inline-flex items-center px-0.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              F
                            </span>
                          )}
                        </div>
                        <div className="ml-1 min-w-0 flex-1">
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {blog.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap w-20">
                      <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${getCategoryColor(blog.category)}`}>
                        {categories.find(cat => cat.value === blog.category)?.label}
                      </span>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap w-16">
                      <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-gray-900 w-20">
                      {blog.author}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-gray-900 w-12">
                      {blog.views.toLocaleString()}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-gray-500 w-16">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs font-medium w-16">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <TrendingUp className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No blog posts found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ||
                statusFilter !== "all" ||
                categoryFilter !== "all"
                  ? "Try adjusting your filters or search terms."
                  : "Get started by creating your first blog post."}
              </p>
              {!searchTerm &&
                statusFilter === "all" &&
                categoryFilter === "all" && (
                  <Link
                    href="/admin/blogs/new"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Post
                  </Link>
                )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
