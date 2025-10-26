'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Car, Trophy, Zap, Truck, Gem, Car as CarIcon } from 'lucide-react';

export default function Fleet() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const vehicleCategories = [
    { id: 'all', name: 'All Vehicles', icon: <Car className="w-5 h-5 text-blue-500" /> },
    { id: 'luxury', name: 'Luxury Cars', icon: <Trophy className="w-5 h-5 text-yellow-500" /> },
    { id: 'sports', name: 'Sports Cars', icon: <Zap className="w-5 h-5 text-red-500" /> },
    { id: 'suv', name: 'Luxury SUVs', icon: <Truck className="w-5 h-5 text-green-500" /> },
    { id: 'exotic', name: 'Exotic Cars', icon: <Gem className="w-5 h-5 text-purple-500" /> }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'low', name: 'Under 1000 د.إ' },
    { id: 'medium', name: '1000-3000 د.إ' },
    { id: 'high', name: '3000+ د.إ' }
  ];

  const fleetVehicles = [
    {
      id: 1,
      name: "Lamborghini Urus",
      category: "exotic",
      type: "SUV",
      price: 3500,
      currency: "د.إ",
      period: "per day",
      image: <CarIcon className="w-16 h-16 text-orange-500" />,
      specifications: {
        engine: "4.0L V8 Twin Turbo",
        power: "641 HP",
        acceleration: "3.6s 0-100km/h",
        topSpeed: "305 km/h",
        seats: "5",
        transmission: "Automatic"
      },
      features: ["AWD", "Sport Mode", "Premium Audio", "Leather Seats", "Navigation", "Bluetooth"],
      description: "The ultimate luxury SUV that combines supercar performance with everyday practicality.",
      availability: "Available",
      rating: 5
    },
    {
      id: 2,
      name: "Ferrari Purosangue",
      category: "exotic",
      type: "SUV",
      price: 9500,
      currency: "د.إ",
      period: "per day",
      image: <Zap className="w-16 h-16 text-red-500" />,
      specifications: {
        engine: "6.5L V12",
        power: "715 HP",
        acceleration: "3.3s 0-100km/h",
        topSpeed: "310 km/h",
        seats: "4",
        transmission: "Automatic"
      },
      features: ["V12 Engine", "Carbon Fiber", "Premium Interior", "Sport Suspension", "Brembo Brakes", "Launch Control"],
      description: "Ferrari's first SUV - a masterpiece of Italian engineering and luxury.",
      availability: "Available",
      rating: 5
    },
    {
      id: 3,
      name: "Ferrari F8 Spider",
      category: "sports",
      type: "Convertible",
      price: 3700,
      currency: "د.إ",
      period: "per day",
      image: <Zap className="w-16 h-16 text-red-500" />,
      specifications: {
        engine: "3.9L V8 Twin Turbo",
        power: "710 HP",
        acceleration: "2.9s 0-100km/h",
        topSpeed: "340 km/h",
        seats: "2",
        transmission: "Automatic"
      },
      features: ["Retractable Roof", "Carbon Fiber", "Sport Exhaust", "Racing Seats", "Track Mode", "Launch Control"],
      description: "Experience the thrill of open-top driving with Ferrari's most advanced V8 engine.",
      availability: "Available",
      rating: 5
    },
    {
      id: 4,
      name: "Porsche 911 Turbo S",
      category: "sports",
      type: "Coupe",
      price: 3200,
      currency: "د.إ",
      period: "per day",
      image: <Zap className="w-16 h-16 text-red-500" />,
      specifications: {
        engine: "3.8L Flat-6 Twin Turbo",
        power: "640 HP",
        acceleration: "2.7s 0-100km/h",
        topSpeed: "330 km/h",
        seats: "4",
        transmission: "PDK Automatic"
      },
      features: ["AWD", "Sport Chrono", "Carbon Ceramic Brakes", "Sport Exhaust", "Track Mode", "Launch Control"],
      description: "The ultimate 911 - combining everyday usability with track-ready performance.",
      availability: "Available",
      rating: 5
    },
    {
      id: 5,
      name: "Range Rover Vogue",
      category: "luxury",
      type: "SUV",
      price: 2400,
      currency: "د.إ",
      period: "per day",
      image: <Truck className="w-16 h-16 text-blue-500" />,
      specifications: {
        engine: "5.0L V8 Supercharged",
        power: "525 HP",
        acceleration: "5.4s 0-100km/h",
        topSpeed: "225 km/h",
        seats: "5",
        transmission: "Automatic"
      },
      features: ["Terrain Response", "Air Suspension", "Premium Audio", "Leather Interior", "Navigation", "Climate Control"],
      description: "The pinnacle of luxury SUVs with unmatched comfort and capability.",
      availability: "Available",
      rating: 5
    },
    {
      id: 6,
      name: "Audi Q3 Sportsback",
      category: "luxury",
      type: "SUV",
      price: 550,
      currency: "د.إ",
      period: "per day",
      image: <Truck className="w-16 h-16 text-blue-500" />,
      specifications: {
        engine: "2.0L TFSI",
        power: "230 HP",
        acceleration: "6.8s 0-100km/h",
        topSpeed: "230 km/h",
        seats: "5",
        transmission: "Automatic"
      },
      features: ["Quattro AWD", "Sport Package", "Premium Audio", "Leather Seats", "Navigation", "Bluetooth"],
      description: "Sporty and elegant compact SUV perfect for city driving and weekend getaways.",
      availability: "Available",
      rating: 4
    },
    {
      id: 7,
      name: "Mercedes S-Class",
      category: "luxury",
      type: "Sedan",
      price: 1200,
      currency: "د.إ",
      period: "per day",
      image: <CarIcon className="w-16 h-16 text-orange-500" />,
      specifications: {
        engine: "3.0L V6 Turbo",
        power: "362 HP",
        acceleration: "5.4s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic"
      },
      features: ["Air Suspension", "Premium Audio", "Leather Interior", "Navigation", "Climate Control", "Massage Seats"],
      description: "The benchmark for luxury sedans with unmatched comfort and technology.",
      availability: "Available",
      rating: 5
    },
    {
      id: 8,
      name: "BMW X7",
      category: "luxury",
      type: "SUV",
      price: 1800,
      currency: "د.إ",
      period: "per day",
      image: <Truck className="w-16 h-16 text-blue-500" />,
      specifications: {
        engine: "4.4L V8 Twin Turbo",
        power: "523 HP",
        acceleration: "4.7s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "7",
        transmission: "Automatic"
      },
      features: ["xDrive AWD", "Air Suspension", "Premium Audio", "Leather Interior", "Navigation", "Third Row Seats"],
      description: "The ultimate luxury SUV with seven seats and uncompromising performance.",
      availability: "Available",
      rating: 5
    },
    {
      id: 9,
      name: "Tesla Model S",
      category: "luxury",
      type: "Sedan",
      price: 800,
      currency: "د.إ",
      period: "per day",
      image: <CarIcon className="w-16 h-16 text-orange-500" />,
      specifications: {
        engine: "Dual Motor Electric",
        power: "670 HP",
        acceleration: "3.1s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Single Speed"
      },
      features: ["Autopilot", "Supercharging", "Premium Audio", "Glass Roof", "Navigation", "Over-the-Air Updates"],
      description: "Experience the future of driving with Tesla's most advanced electric sedan.",
      availability: "Available",
      rating: 5
    },
    {
      id: 10,
      name: "Rolls Royce Ghost",
      category: "luxury",
      type: "Sedan",
      price: 4500,
      currency: "د.إ",
      period: "per day",
      image: <CarIcon className="w-16 h-16 text-orange-500" />,
      specifications: {
        engine: "6.75L V12",
        power: "563 HP",
        acceleration: "4.8s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic"
      },
      features: ["Handcrafted Interior", "Premium Audio", "Massage Seats", "Navigation", "Climate Control", "Chauffeur Package"],
      description: "The epitome of luxury with handcrafted details and unmatched refinement.",
      availability: "Available",
      rating: 5
    }
  ];

  const filteredVehicles = fleetVehicles.filter(vehicle => {
    const categoryMatch = selectedCategory === 'all' || vehicle.category === selectedCategory;
    const priceMatch = selectedPriceRange === 'all' || 
      (selectedPriceRange === 'low' && vehicle.price < 1000) ||
      (selectedPriceRange === 'medium' && vehicle.price >= 1000 && vehicle.price <= 3000) ||
      (selectedPriceRange === 'high' && vehicle.price > 3000);
    
    return categoryMatch && priceMatch;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

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
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Fleet</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover our premium collection of luxury vehicles. From exotic supercars to elegant sedans, find the perfect ride for your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Category Filters */}
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-3">
                {vehicleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="flex items-center">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range and Sort Filters */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {/* Price Range Filter */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium">Price Range:</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map((range) => (
                    <option key={range.id} value={range.id}>{range.name}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {selectedCategory === 'all' ? 'All Vehicles' : vehicleCategories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <p className="text-xl text-gray-600">
              {sortedVehicles.length} vehicles found
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Vehicle Image */}
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <div className="opacity-70">{vehicle.image}</div>
                </div>

                {/* Vehicle Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                    <span className="text-sm text-gray-500">{vehicle.type}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vehicle.description}</p>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {vehicle.price} {vehicle.currency}
                    </div>
                    <div className="text-sm text-gray-600">{vehicle.period}</div>
                  </div>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="text-gray-600">
                      <span className="font-medium">Power:</span> {vehicle.specifications.power}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Seats:</span> {vehicle.specifications.seats}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Stats */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Fleet Statistics</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our impressive fleet numbers speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                {fleetVehicles.length}+
              </div>
              <div className="text-lg font-semibold text-blue-100">Total Vehicles</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                5
              </div>
              <div className="text-lg font-semibold text-blue-100">Vehicle Categories</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-lg font-semibold text-blue-100">Availability</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-lg font-semibold text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us for special requests, custom packages, or to discuss your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Contact Us
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Get Custom Quote
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
