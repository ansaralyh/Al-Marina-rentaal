"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import {
  FileText,
  Trophy,
  Lightbulb,
  PartyPopper,
  Newspaper,
  Car,
  Zap,
  Briefcase,
  Battery,
  Wrench,
  Camera,
  Search,
} from "lucide-react";

export default function Blog() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const fetchBlogs = async () => {
    const res = await fetch(`${apiUrl}/blogs`);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
  };

  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["public-blogs"], queryFn: fetchBlogs });

  const blogCategories = [
    {
      id: "all",
      name: "All Posts",
      icon: <FileText className="w-5 h-5 text-blue-500" />,
    },
    {
      id: "luxury",
      name: "Luxury Cars",
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    },
    {
      id: "tips",
      name: "Driving Tips",
      icon: <Lightbulb className="w-5 h-5 text-orange-500" />,
    },
    {
      id: "events",
      name: "Events",
      icon: <PartyPopper className="w-5 h-5 text-purple-500" />,
    },
    {
      id: "news",
      name: "Industry News",
      icon: <Newspaper className="w-5 h-5 text-green-500" />,
    },
  ];

  const normalizedBlogs = useMemo(() => {
    return (blogs || []).map((b, idx) => ({
      ...b,
      id: b._id || b.id || idx,
      title: b.title || "Untitled",
      excerpt: b.excerpt || "",
      content: b.content || "",
      category: (b.category || "luxury").toLowerCase(),
      author: b.author || "Admin",
      date: b.createdAt || b.updatedAt || new Date().toISOString(),
      readTime: b.readTime || "5 min read",
      featured: Boolean(b.isFeatured),
      image: b.featuredImage || null,
      tags: b.tags || [],
      slug: b.slug || b._id || b.id,
      views: b.views ?? 0,
    }));
  }, [blogs]);

  const filteredPosts = useMemo(() => {
    return normalizedBlogs.filter((post) => {
      const categoryMatch =
        selectedCategory === "all" || post.category === selectedCategory;
      const lowerSearch = searchTerm.toLowerCase();
      const searchMatch =
        post.title.toLowerCase().includes(lowerSearch) ||
        post.excerpt.toLowerCase().includes(lowerSearch) ||
        (post.tags || []).some((tag) =>
          tag.toLowerCase().includes(lowerSearch)
        );
      return categoryMatch && searchMatch;
    });
  }, [normalizedBlogs, selectedCategory, searchTerm]);

  const featuredPosts = filteredPosts.filter((post) => post.featured).slice(0, 4);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const blogStats = useMemo(() => {
    const categoriesSet = new Set(
      normalizedBlogs.map((b) => b.category || "uncategorized")
    );
    const totalViews = normalizedBlogs.reduce(
      (sum, b) => sum + (Number(b.views) || 0),
      0
    );
    return {
      totalPosts: normalizedBlogs.length,
      categoriesCount: categoriesSet.size,
      totalViews,
    };
  }, [normalizedBlogs]);

  const renderImage = (post) => {
    if (post.image) {
      return (
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = "/cars/5.jpg";
          }}
        />
      );
    }
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-100">
        <FileText className="w-10 h-10 text-gray-400" />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-3">
        <p className="text-lg font-semibold text-gray-800">Failed to load blogs</p>
        <p className="text-sm text-gray-600">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 text-white relative overflow-hidden" style={{
        backgroundImage: "url(/cars/5.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest insights, tips, and news from the
              world of luxury car rentals and automotive excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>
                  <span className="flex items-center">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
            {selectedCategory === "all" && featuredPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Featured Posts
              </h2>
              <p className="text-xl text-gray-600">
                Our most popular and trending articles
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    {renderImage(post)}
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold">Featured</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {
                          blogCategories.find((cat) => cat.id === post.category)
                            ?.name
                        }
                      </span>
                      <span className="text-gray-500 text-sm">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {post.author}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push(`/blogs/${post.slug}`)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                        Read More
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {selectedCategory === "all"
                ? "Latest Posts"
                : blogCategories.find((cat) => cat.id === selectedCategory)
                    ?.name}
            </h2>
            <p className="text-xl text-gray-600">
              {regularPosts.length} posts found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {renderImage(post)}
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {
                        blogCategories.find((cat) => cat.id === post.category)
                          ?.name
                      }
                    </span>
                    <span className="text-gray-500 text-sm">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {post.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/blogs/${post.slug}`)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for the latest blog posts, industry
            insights, and exclusive offers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Blog Stats */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Blog Statistics</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our content reaches thousands of readers worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                {blogStats.totalPosts}+
              </div>
              <div className="text-lg font-semibold text-blue-100">
                Blog Posts
              </div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                {blogStats.categoriesCount}
              </div>
              <div className="text-lg font-semibold text-blue-100">
                Categories
              </div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                {blogStats.totalViews.toLocaleString()}
              </div>
              <div className="text-lg font-semibold text-blue-100">
                Total Views
              </div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                4.9
              </div>
              <div className="text-lg font-semibold text-blue-100">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            After reading our blog, why not experience the luxury yourself? Book
            your dream car today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fleet" className="inline-block">
              <span className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                View Our Fleet
              </span>
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              <a
                href="https://wa.me/971502093966"
                target="_blank"
                rel="noopener noreferrer">
                Contact Us
              </a>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
