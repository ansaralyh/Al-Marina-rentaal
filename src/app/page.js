"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [searchForm, setSearchForm] = useState({
    make: "",
    model: "",
    fuelType: "",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", searchForm);
  };

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: "Drive Your Journey,",
      subtitle: "Your Way",
      description: "Fast. Luxurious. Unforgettable",
      background: "from-slate-900 via-blue-900 to-slate-900",
      buttonText: "Explore Fleet",
      buttonSecondary: "Learn More",
    },
    {
      id: 2,
      title: "Luxury Redefined",
      subtitle: "Premium Experience",
      description: "Experience the ultimate in luxury car rentals",
      background: "from-purple-900 via-indigo-900 to-blue-900",
      buttonText: "View Collection",
      buttonSecondary: "Book Now",
    },
    {
      id: 3,
      title: "Exotic Dreams",
      subtitle: "Come True",
      description: "Drive the world's most prestigious vehicles",
      background: "from-emerald-900 via-teal-900 to-cyan-900",
      buttonText: "Discover Cars",
      buttonSecondary: "Get Quote",
    },
    {
      id: 4,
      title: "Premium Service",
      subtitle: "Unmatched Quality",
      description: "Professional service with luxury vehicles",
      background: "from-rose-900 via-pink-900 to-purple-900",
      buttonText: "Our Services",
      buttonSecondary: "Contact Us",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const luxuryCars = [
    {
      id: 1,
      name: "Lamborghini Urus",
      price: "3500",
      currency: "د.إ",
      period: "per day",
      image: "/cars/1.jpg",
      category: "SUV",
    },
    {
      id: 2,
      name: "Ferrari Purosangue",
      price: "9500",
      currency: "د.إ",
      period: "per day",
      image: "/cars/2.jpg",
      category: "Supercar",
    },
    {
      id: 3,
      name: "Ferrari F8 Spider",
      price: "3700",
      currency: "د.إ",
      period: "per day",
      image: "/cars/3.jpg",
      category: "Convertible",
    },
    {
      id: 4,
      name: "Porsche 911 Turbo S",
      price: "3200",
      currency: "د.إ",
      period: "per day",
      image: "/cars/4.jpg",
      category: "Sports Car",
    },
    {
      id: 5,
      name: "Range Rover Vogue",
      price: "2400",
      currency: "د.إ",
      period: "per day",
      image: "/cars/5.jpg",
      category: "Luxury SUV",
    },
    {
      id: 6,
      name: "Audi Q3 Sportsback",
      price: "550",
      currency: "د.إ",
      period: "per day",
      image: "/cars/6.jpg",
      category: "Compact SUV",
    },
    {
      id: 7,
      name: "BMW M8 Competition",
      price: "1800",
      currency: "د.إ",
      period: "per day",
      image: "/cars/7.jpg",
      category: "Luxury Coupe",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Slider Section */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        {/* Slider Container */}
        <div className="relative w-full h-screen">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}>
              {/* Background with gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.background}`}></div>
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Animated background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-4 md:top-20 md:left-10 w-32 h-32 md:w-72 md:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-4 md:bottom-20 md:right-10 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 md:w-48 md:h-48 bg-cyan-500/10 rounded-full blur-2xl animate-float"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <div className="animate-fadeInUp">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 md:mb-8 leading-tight">
                      {slide.title}
                      <br />
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {slide.subtitle}
                      </span>
          </h1>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 mb-8 md:mb-12 font-light px-4">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                      <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
                        {slide.buttonText}
                      </button>
                      <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                        {slide.buttonSecondary}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}>
          <svg
            className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}>
          <svg
            className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 md:space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            />
          ))}
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <div className="hidden md:block absolute bottom-8 right-8 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Play/Pause Button - Hidden on mobile */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="hidden sm:flex absolute top-4 md:top-8 right-4 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
          {isAutoPlaying ? (
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </section>

      {/* Search Section */}
      <section className="py-12 md:py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Find Your Dream Car
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Discover our premium collection of luxury vehicles and find the
              perfect ride for your journey
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12">
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Car Make
                </label>
                <select
                  value={searchForm.make}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, make: e.target.value })
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white">
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
                <label className="block text-sm font-semibold text-gray-700">
                  Model
                </label>
                <select
                  value={searchForm.model}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, model: e.target.value })
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white">
                  <option value="">All Models</option>
                  <option value="urus">Urus</option>
                  <option value="purosangue">Purosangue</option>
                  <option value="f8">F8 Spider</option>
                  <option value="911">911 Turbo S</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Fuel Type
                </label>
                <select
                  value={searchForm.fuelType}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, fuelType: e.target.value })
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white">
                  <option value="">All Fuel Types</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="flex items-end sm:col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our Luxury Fleet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the finest collection of luxury vehicles, each
              carefully selected for performance, comfort, and style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {luxuryCars.map((car) => (
              <div
                key={car.id}
                className="pb-2 group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-55 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-700">
                      {car.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {car.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {car.price} {car.currency}
                      </span>
                      <span className="text-sm text-gray-600 ml-2">
                        {car.period}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Inquire Now
                    </button>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">
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
            <h2 className="text-5xl font-bold mb-6">
              Luxury Car Rental Excellence
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              The premier car rental service provider across the UAE, offering
              an unmatched collection of luxury vehicles with exceptional
              service and competitive pricing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center group">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                150+
              </div>
              <div className="text-base sm:text-lg md:text-xl font-semibold text-blue-100">
                VEHICLES STOCK
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-base sm:text-lg md:text-xl font-semibold text-blue-100">
                RENTALS COMPLETED
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-base sm:text-lg md:text-xl font-semibold text-blue-100">
                HAPPY CLIENTS
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-base sm:text-lg md:text-xl font-semibold text-blue-100">
                5-STAR REVIEWS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our premium service and exclusive
              benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚗",
                title: "Premium Fleet",
                description:
                  "Hand-picked luxury vehicles from the world's most prestigious brands",
              },
              {
                icon: "⭐",
                title: "Expert Service",
                description:
                  "Professional team with years of experience in luxury car rentals",
              },
              {
                icon: "💳",
                title: "Flexible Payment",
                description:
                  "No upfront costs, secure your booking with flexible payment options",
              },
              {
                icon: "🔄",
                title: "Free Amendments",
                description:
                  "Change your booking details without any additional charges",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting your dream car is simple with our streamlined process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Browse Fleet",
                desc: "Explore our collection of luxury vehicles",
              },
              {
                step: "02",
                title: "Choose Vehicle",
                desc: "Select your preferred car and dates",
              },
              {
                step: "03",
                title: "Book & Confirm",
                desc: "Complete your booking with our team",
              },
              {
                step: "04",
                title: "Enjoy Ride",
                desc: "Pick up your car and start your journey",
              },
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Book Your Next Adventure
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Up to 35% Discounts & Special Offers Available
            </p>
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
              Your premier luxury car rental provider in Dubai. Experience the
              finest collection of exotic sports cars, luxury sedans, and SUVs.
            </p>
            <p className="text-blue-200">
              Hours: Sat - Thu: 09:00 am to 06:00 pm
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
