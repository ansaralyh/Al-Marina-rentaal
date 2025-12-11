'use client';
/* eslint-disable react/no-danger */

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Clock, Calendar, User, FileText } from 'lucide-react';

export default function SingleBlog() {
  const params = useParams();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchBlog = async () => {
    const res = await fetch(`${apiUrl}/blogs/${params.id}`);
    if (!res.ok) throw new Error('Failed to fetch blog');
    return res.json();
  };

  const fetchBlogs = async () => {
    const res = await fetch(`${apiUrl}/blogs`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  };

  const {
    data: blogPost,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ['blog', params.id], queryFn: fetchBlog });

  const { data: allBlogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  const relatedPosts = useMemo(() => {
    if (!blogPost) return [];
    const currentId = blogPost.slug || blogPost._id || blogPost.id;
    return allBlogs
      .filter(
        (b) =>
          (b.slug || b._id || b.id) !== currentId &&
          (b.category || '').toLowerCase() === (blogPost.category || '').toLowerCase(),
      )
      .slice(0, 3)
      .map((b, idx) => ({
        ...b,
        id: b._id || b.id || idx,
        slug: b.slug || b._id || b.id,
        title: b.title || 'Untitled',
        excerpt: b.excerpt || '',
        author: b.author || 'Admin',
        readTime: b.readTime || '5 min read',
        featuredImage: b.featuredImage,
      }));
  }, [allBlogs, blogPost]);

  const renderImage = (post, size = 'w-20 h-20', rounded = 'rounded-full') => {
    if (post?.featuredImage) {
      return (
        <img
          src={post.featuredImage}
          alt={post.title}
          className={`${size} object-cover ${rounded} border border-white/30`}
          onError={(e) => {
            e.target.src = '/cars/5.jpg';
          }}
        />
      );
    }
    return (
      <div className={`${size} flex items-center justify-center ${rounded} bg-white/10 text-white`}>
        <FileText className="w-8 h-8" />
      </div>
    );
  };

  const handleBackToBlogs = () => router.push('/blogs');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !blogPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error?.message || "The blog post you're looking for doesn't exist."}
            </p>
            <button
              onClick={handleBackToBlogs}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blogs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const postDate = blogPost.createdAt || blogPost.updatedAt || blogPost.date;
  const heroImage = blogPost.featuredImage;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button
              onClick={handleBackToBlogs}
              className="mt-10 inline-flex items-center text-blue-200 hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </button>

            <div className="mb-6 flex items-center justify-center">
              {renderImage(blogPost, 'w-24 h-24', 'rounded-2xl')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {blogPost.excerpt}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200">
              <div className="flex items-center">
                <User className="w-6 h-6 mr-2" />
                <span className="font-medium">{blogPost.author || 'Admin'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                <span>{postDate ? new Date(postDate).toLocaleDateString() : '—'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                <span>{blogPost.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {heroImage && (
              <div className="h-96 w-full overflow-hidden">
                <img
                  src={heroImage}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/cars/5.jpg';
                  }}
                />
              </div>
            )}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {blogPost.content ? (
                  blogPost.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600">No content available.</p>
                )}
              </div>

              {/* Tags */}
              {Array.isArray(blogPost.tags) && blogPost.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-center">
                      {renderImage(post, 'w-16 h-16', 'rounded-xl')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <button
                      onClick={() => router.push(`/blogs/${post.slug}`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse our premium collection of luxury vehicles and find the perfect car for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/fleet')}
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              View Our Fleet
            </button>
            <button
              onClick={() => router.push('/contactus')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



