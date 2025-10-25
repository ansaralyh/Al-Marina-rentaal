'use client';

import { useState } from 'react';

export default function Home() {
  const [searchForm, setSearchForm] = useState({
    make: '',
    model: '',
    fuelType: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchForm);
  };

  const luxuryCars = [
    {
      id: 1,
      name: "Lamborghini Urus",
      price: "3500",
      currency: "د.إ",
      period: "per day",
      image: "/api/placeholder/400/300",
      category: "SUV"
    },
    {
      id: 2,
      name: "Ferrari Purosangue",
      price: "9500",
      currency: "د.إ",
      period: "per day",
      image: "/api/placeholder/400/300",
      category: "Supercar"
    },
    {
      id: 3,
      name: "Ferrari F8 Spider",
      price: "3700",
      currency: "د.إ",
      period: "per day",
      image: "/api/placeholder/400/300",
      category: "Convertible"
    },
    {
      id: 4,
      name: "Porsche 911 Turbo S",
      price: "3200",
      currency: "د.إ",
      period: "per day",
      image: "/api/placeholder/400/300",
      category: "Sports Car"
    },
    {
      id: 5,
      name: "Range Rover Vogue",
      price: "2400",
      currency: "د.إ",
      period: "per day",
      image: "/api/placeholder/400/300",
      category: "Luxury SUV"
    },
    {
      id: 6,
      name: "Audi Q3 Sportsback",
      price: "550",
      currency: "د.إ",
      period: "per day",
      image: "/api/placeholder/400/300",
      category: "Compact SUV"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Marina Rental
                </h1>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#fleet" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Fleet</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-sm text-gray-600">
                <span className="font-medium">Call:</span> +971 55 566 0466
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Drive Your Journey,<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Way
              </span>
          </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 font-light">
              Fast. Luxurious. Unforgettable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
                Explore Fleet
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Find Your Dream Car</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of luxury vehicles and find the perfect ride for your journey
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Car Make</label>
                <select 
                  value={searchForm.make}
                  onChange={(e) => setSearchForm({...searchForm, make: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white"
                >
                  <option value="">All Makes</option>
                  <option value="audi">Audi</option>
                  <option value="bmw">BMW</option>
                  <option value="ferrari">Ferrari</option>
                  <option value="lamborghini">Lamborghini</option>
                  <option value="porsche">Porsche</option>
                  <option value="mercedes">Mercedes</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Model</label>
                <select 
                  value={searchForm.model}
                  onChange={(e) => setSearchForm({...searchForm, model: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white"
                >
                  <option value="">All Models</option>
                  <option value="urus">Urus</option>
                  <option value="purosangue">Purosangue</option>
                  <option value="f8">F8 Spider</option>
                  <option value="911">911 Turbo S</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Fuel Type</label>
                <select 
                  value={searchForm.fuelType}
                  onChange={(e) => setSearchForm({...searchForm, fuelType: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white"
                >
                  <option value="">All Fuel Types</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Search Cars
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Car Fleet Section */}
      <section id="fleet" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Luxury Fleet</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the finest collection of luxury vehicles, each carefully selected for performance, comfort, and style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {luxuryCars.map((car) => (
              <div key={car.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-700">{car.category}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500">🚗</div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{car.name}</h3>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {car.price} {car.currency}
                      </span>
                      <span className="text-gray-600 ml-2">{car.period}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Inquire Now
                    </button>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Luxury Car Rental Excellence</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              The premier car rental service provider across the UAE, offering an unmatched collection of luxury vehicles with exceptional service and competitive pricing.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                150+
              </div>
              <div className="text-lg font-semibold text-blue-100">VEHICLES STOCK</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-lg font-semibold text-blue-100">RENTALS COMPLETED</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-lg font-semibold text-blue-100">HAPPY CLIENTS</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-lg font-semibold text-blue-100">5-STAR REVIEWS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our premium service and exclusive benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚗",
                title: "Premium Fleet",
                description: "Hand-picked luxury vehicles from the world's most prestigious brands"
              },
              {
                icon: "⭐",
                title: "Expert Service",
                description: "Professional team with years of experience in luxury car rentals"
              },
              {
                icon: "💳",
                title: "Flexible Payment",
                description: "No upfront costs, secure your booking with flexible payment options"
              },
              {
                icon: "🔄",
                title: "Free Amendments",
                description: "Change your booking details without any additional charges"
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting your dream car is simple with our streamlined process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Browse Fleet", desc: "Explore our collection of luxury vehicles" },
              { step: "02", title: "Choose Vehicle", desc: "Select your preferred car and dates" },
              { step: "03", title: "Book & Confirm", desc: "Complete your booking with our team" },
              { step: "04", title: "Enjoy Ride", desc: "Pick up your car and start your journey" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Book Your Next Adventure</h2>
            <p className="text-xl text-blue-100 mb-8">Up to 35% Discounts & Special Offers Available</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Call Us</h3>
              <p className="text-blue-100 text-lg">+971 56 5114114</p>
              <p className="text-blue-100 text-lg">+971 55 5660466</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Email Us</h3>
              <p className="text-blue-100 text-lg">info@marinarentalcar.com</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
              <p className="text-blue-100 text-lg">@marinarentalcar</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-blue-100 text-lg mb-4">
              Your premier luxury car rental provider in Dubai. Experience the finest collection of exotic sports cars, luxury sedans, and SUVs.
            </p>
            <p className="text-blue-200">
              Hours: Sat - Thu: 09:00 am to 06:00 pm
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Marina Rental Car
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Your premier luxury car rental service across the UAE. Experience the finest collection of exotic sports cars, luxury sedans, and SUVs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <span className="text-white">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <span className="text-white">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <span className="text-white">💬</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <span className="text-white">🐦</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#fleet" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Our Fleet</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Services</a></li>
              </ul>
            </div>

            {/* Car Brands */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Popular Brands</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Audi', 'BMW', 'Ferrari', 'Lamborghini', 'Porsche', 'Mercedes', 'Range Rover', 'Tesla'].map((brand) => (
                  <a key={brand} href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm">
                    {brand}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">📍</span>
                  <div>
                    <p className="text-gray-300 text-sm">
                      Empire Heights Area, Downtown<br />
                      Business Bay, Dubai, UAE
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📞</span>
                  <div>
                    <p className="text-gray-300 text-sm">+971 55 566 0466</p>
                    <p className="text-gray-300 text-sm">+971 56 511 4114</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📧</span>
                  <p className="text-gray-300 text-sm">info@marinarentalcar.com</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">🕒</span>
                  <p className="text-gray-300 text-sm">Sat - Thu: 09:00 am to 06:00 pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold text-white mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-6">Subscribe to our newsletter for exclusive offers and updates</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 mb-2">
                  &copy; 2025 All rights reserved by Marina Rental Car.
                </p>
                <p className="text-gray-500 text-sm">
                  Premium luxury car rental service across the UAE
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Cookie Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Sitemap</a>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">We Accept</p>
              <div className="flex justify-center items-center space-x-4 flex-wrap">
                <div className="bg-white rounded-lg px-4 py-2 text-gray-600 font-semibold text-sm">💳 Visa</div>
                <div className="bg-white rounded-lg px-4 py-2 text-gray-600 font-semibold text-sm">💳 Mastercard</div>
                <div className="bg-white rounded-lg px-4 py-2 text-gray-600 font-semibold text-sm">🏦 Bank Transfer</div>
                <div className="bg-white rounded-lg px-4 py-2 text-gray-600 font-semibold text-sm">💰 Cash</div>
                <div className="bg-white rounded-lg px-4 py-2 text-gray-600 font-semibold text-sm">📱 Apple Pay</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}