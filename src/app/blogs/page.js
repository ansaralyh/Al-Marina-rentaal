'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogCategories = [
    { id: 'all', name: 'All Posts', icon: '📝' },
    { id: 'luxury', name: 'Luxury Cars', icon: '🏆' },
    { id: 'tips', name: 'Driving Tips', icon: '💡' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'news', name: 'Industry News', icon: '📰' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Luxury Car Rental in Dubai",
      excerpt: "Discover everything you need to know about renting luxury cars in Dubai, from the best vehicles to insider tips for an unforgettable experience.",
      content: "Dubai is synonymous with luxury, and what better way to experience the city's opulence than behind the wheel of a premium vehicle? From the iconic Burj Khalifa to the pristine beaches of Jumeirah, Dubai offers countless opportunities to showcase your style with the perfect luxury car rental...",
      category: "luxury",
      author: "Ahmed Al-Rashid",
      date: "2025-01-15",
      readTime: "5 min read",
      image: "🚗",
      featured: true,
      tags: ["Luxury Cars", "Dubai", "Rental Guide"]
    },
    {
      id: 2,
      title: "Top 10 Exotic Cars to Rent for Special Occasions",
      excerpt: "Explore our curated list of the most sought-after exotic cars available for rent, perfect for making any special occasion truly memorable.",
      content: "When it comes to special occasions, nothing makes a statement quite like an exotic car. Whether it's a wedding, anniversary, or milestone celebration, the right exotic car can transform your event into an unforgettable experience...",
      category: "luxury",
      author: "Sarah Johnson",
      date: "2025-01-12",
      readTime: "7 min read",
      image: "🏎️",
      featured: false,
      tags: ["Exotic Cars", "Special Events", "Luxury"]
    },
    {
      id: 3,
      title: "Driving Tips for First-Time Luxury Car Renters",
      excerpt: "Essential tips and advice for those new to luxury car rentals, ensuring a safe and enjoyable driving experience.",
      content: "Renting a luxury car for the first time can be both exciting and intimidating. These high-performance vehicles require a different approach to driving, and understanding the basics can make your experience much more enjoyable...",
      category: "tips",
      author: "Mohammed Hassan",
      date: "2025-01-10",
      readTime: "4 min read",
      image: "💡",
      featured: false,
      tags: ["Driving Tips", "Safety", "Beginners"]
    },
    {
      id: 4,
      title: "Corporate Events: Choosing the Right Luxury Fleet",
      excerpt: "How to select the perfect luxury vehicles for corporate events, business meetings, and VIP transportation needs.",
      content: "Corporate events require a different approach to luxury car rental. From executive transportation to client entertainment, the right fleet can enhance your business image and provide comfort for your most important guests...",
      category: "events",
      author: "Emma Wilson",
      date: "2025-01-08",
      readTime: "6 min read",
      image: "💼",
      featured: false,
      tags: ["Corporate", "Business", "Events"]
    },
    {
      id: 5,
      title: "The Future of Electric Luxury Cars in the UAE",
      excerpt: "Exploring the growing trend of electric luxury vehicles and their impact on the car rental industry in the UAE.",
      content: "The automotive industry is undergoing a significant transformation, and luxury car manufacturers are leading the charge toward electrification. In the UAE, this shift is particularly evident as the country embraces sustainable transportation...",
      category: "news",
      author: "Ahmed Al-Rashid",
      date: "2025-01-05",
      readTime: "8 min read",
      image: "⚡",
      featured: true,
      tags: ["Electric Cars", "Sustainability", "Future"]
    },
    {
      id: 6,
      title: "Wedding Car Rental: Making Your Special Day Perfect",
      excerpt: "Complete guide to choosing the perfect wedding car rental, from classic elegance to modern luxury options.",
      content: "Your wedding day is one of the most important days of your life, and every detail matters. The car you choose for your special day should reflect your style and create lasting memories. From classic Rolls-Royce to modern supercars...",
      category: "events",
      author: "Sarah Johnson",
      date: "2025-01-03",
      readTime: "5 min read",
      image: "💒",
      featured: false,
      tags: ["Wedding", "Special Events", "Luxury"]
    },
    {
      id: 7,
      title: "Maintenance and Care: Keeping Luxury Cars in Perfect Condition",
      excerpt: "Insider tips on how we maintain our luxury fleet to ensure every vehicle meets the highest standards of performance and comfort.",
      content: "Maintaining a luxury car fleet requires meticulous attention to detail and a deep understanding of high-performance vehicles. At Marina Rental Car, we follow strict maintenance protocols to ensure every vehicle in our fleet...",
      category: "tips",
      author: "Mohammed Hassan",
      date: "2025-01-01",
      readTime: "6 min read",
      image: "🔧",
      featured: false,
      tags: ["Maintenance", "Care", "Quality"]
    },
    {
      id: 8,
      title: "Dubai's Most Instagram-Worthy Car Rental Locations",
      excerpt: "Discover the best locations in Dubai for stunning car photography and social media content with your luxury rental.",
      content: "Dubai offers countless breathtaking backdrops for luxury car photography. From the iconic Burj Khalifa to the pristine desert dunes, the city provides the perfect setting for capturing your luxury car rental experience...",
      category: "tips",
      author: "Emma Wilson",
      date: "2024-12-28",
      readTime: "4 min read",
      image: "📸",
      featured: false,
      tags: ["Photography", "Dubai", "Social Media"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest insights, tips, and news from the world of luxury car rentals and automotive excellence.
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
                  🔍
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
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Posts</h2>
              <p className="text-xl text-gray-600">Our most popular and trending articles</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <div className="text-8xl opacity-60">{post.image}</div>
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold">Featured</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {blogCategories.find(cat => cat.id === post.category)?.name}
                      </span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>
                    <p className="text-gray-600 mb-6">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{post.author.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{post.author}</p>
                          <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
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
              {selectedCategory === 'all' ? 'Latest Posts' : blogCategories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <p className="text-xl text-gray-600">
              {regularPosts.length} posts found
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-6xl opacity-70">{post.image}</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{post.author.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{post.author}</p>
                        <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for the latest blog posts, industry insights, and exclusive offers.
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
                {blogPosts.length}+
              </div>
              <div className="text-lg font-semibold text-blue-100">Blog Posts</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                5
              </div>
              <div className="text-lg font-semibold text-blue-100">Categories</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <div className="text-lg font-semibold text-blue-100">Monthly Readers</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                4.9
              </div>
              <div className="text-lg font-semibold text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl text-blue-100 mb-8">
            After reading our blog, why not experience the luxury yourself? Book your dream car today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              View Our Fleet
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
