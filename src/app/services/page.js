'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Services() {
  const [activeService, setActiveService] = useState('luxury');

  const serviceCategories = [
    {
      id: 'luxury',
      title: 'Luxury Car Rental',
      icon: '🏆',
      description: 'Premium luxury vehicles for special occasions and business needs'
    },
    {
      id: 'exotic',
      title: 'Exotic Car Rental',
      icon: '🚗',
      description: 'Supercars and exotic vehicles for unforgettable experiences'
    },
    {
      id: 'corporate',
      title: 'Corporate Services',
      icon: '💼',
      description: 'Business car rental solutions for corporate clients'
    },
    {
      id: 'events',
      title: 'Event Services',
      icon: '🎉',
      description: 'Special event car rentals for weddings, parties, and celebrations'
    }
  ];

  const luxuryServices = [
    {
      name: "Premium Sedans",
      description: "Luxury sedans from Mercedes, BMW, Audi for business and formal occasions",
      features: ["Chauffeur Service", "Airport Transfer", "Business Meetings", "Formal Events"],
      price: "From 800 د.إ/day",
      image: "🚙"
    },
    {
      name: "Luxury SUVs",
      description: "High-end SUVs like Range Rover, Porsche Cayenne for comfort and style",
      features: ["Family Trips", "Airport Pickup", "City Tours", "Business Travel"],
      price: "From 1200 د.إ/day",
      image: "🚙"
    },
    {
      name: "Executive Cars",
      description: "Top-tier executive vehicles for VIP transportation",
      features: ["VIP Service", "24/7 Support", "Premium Comfort", "Professional Driver"],
      price: "From 1500 د.إ/day",
      image: "🚙"
    }
  ];

  const exoticServices = [
    {
      name: "Ferrari Collection",
      description: "Experience the thrill of driving a Ferrari - the ultimate supercar",
      features: ["F8 Spider", "Purosangue", "488 GTB", "SF90 Stradale"],
      price: "From 3500 د.إ/day",
      image: "🏎️"
    },
    {
      name: "Lamborghini Fleet",
      description: "Drive the legendary Lamborghini supercars with unmatched performance",
      features: ["Urus", "Huracán", "Aventador", "Custom Modifications"],
      price: "From 4000 د.إ/day",
      image: "🏎️"
    },
    {
      name: "Porsche Sports Cars",
      description: "German engineering excellence with Porsche 911 and other models",
      features: ["911 Turbo S", "Cayman GT4", "Panamera", "Macan GTS"],
      price: "From 2500 د.إ/day",
      image: "🏎️"
    }
  ];

  const corporateServices = [
    {
      name: "Fleet Management",
      description: "Complete fleet management solutions for corporate clients",
      features: ["Fleet Maintenance", "Driver Services", "Insurance Coverage", "24/7 Support"],
      price: "Custom Pricing",
      image: "🏢"
    },
    {
      name: "Executive Transportation",
      description: "Professional transportation for executives and VIP clients",
      features: ["Airport Transfers", "Business Meetings", "City Tours", "Event Transportation"],
      price: "From 1000 د.إ/day",
      image: "🏢"
    },
    {
      name: "Long-term Rentals",
      description: "Extended rental periods with special corporate rates",
      features: ["Monthly Contracts", "Fleet Discounts", "Maintenance Included", "Flexible Terms"],
      price: "From 2000 د.إ/month",
      image: "🏢"
    }
  ];

  const eventServices = [
    {
      name: "Wedding Cars",
      description: "Luxury vehicles for your special day - from classic to modern",
      features: ["Bridal Cars", "Groom's Cars", "Guest Transportation", "Photo Shoots"],
      price: "From 1200 د.إ/day",
      image: "💒"
    },
    {
      name: "Party Transportation",
      description: "Group transportation for parties, celebrations, and events",
      features: ["Party Buses", "Luxury Vans", "Group Bookings", "Event Coordination"],
      price: "From 800 د.إ/day",
      image: "🎉"
    },
    {
      name: "Special Occasions",
      description: "Unique vehicles for birthdays, anniversaries, and celebrations",
      features: ["Themed Cars", "Photo Opportunities", "Custom Decorations", "Memorable Experiences"],
      price: "From 1000 د.إ/day",
      image: "🎂"
    }
  ];

  const serviceFeatures = [
    {
      icon: "🛡️",
      title: "Full Insurance Coverage",
      description: "Comprehensive insurance for all rentals with zero deductible options"
    },
    {
      icon: "🚗",
      title: "Latest Model Fleet",
      description: "Regularly updated fleet with the newest luxury and exotic vehicles"
    },
    {
      icon: "👨‍💼",
      title: "Professional Drivers",
      description: "Experienced and licensed chauffeurs for premium service"
    },
    {
      icon: "📱",
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs"
    },
    {
      icon: "✈️",
      title: "Airport Services",
      description: "Seamless airport pickup and drop-off services"
    },
    {
      icon: "🔧",
      title: "Maintenance Included",
      description: "All vehicles maintained to the highest standards"
    }
  ];

  const pricingPlans = [
    {
      name: "Basic Package",
      price: "800 د.إ",
      period: "per day",
      features: [
        "Luxury Sedan",
        "Basic Insurance",
        "8 Hours Usage",
        "50 KM Included",
        "Standard Support"
      ],
      popular: false
    },
    {
      name: "Premium Package",
      price: "1500 د.إ",
      period: "per day",
      features: [
        "Luxury SUV",
        "Full Insurance",
        "12 Hours Usage",
        "100 KM Included",
        "Chauffeur Service",
        "24/7 Support"
      ],
      popular: true
    },
    {
      name: "Exotic Package",
      price: "3500 د.إ",
      period: "per day",
      features: [
        "Supercar Rental",
        "Premium Insurance",
        "Unlimited Usage",
        "Unlimited KM",
        "Professional Driver",
        "VIP Support"
      ],
      popular: false
    }
  ];

  const getCurrentServices = () => {
    switch (activeService) {
      case 'luxury':
        return luxuryServices;
      case 'exotic':
        return exoticServices;
      case 'corporate':
        return corporateServices;
      case 'events':
        return eventServices;
      default:
        return luxuryServices;
    }
  };

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
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive luxury car rental services tailored to your needs. From daily rentals to special events, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Service Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our wide range of luxury car rental services designed for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveService(category.id)}
                className={`p-6 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 ${
                  activeService === category.id
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {serviceCategories.find(cat => cat.id === activeService)?.title} Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {serviceCategories.find(cat => cat.id === activeService)?.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentServices().map((service, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-6xl mb-6 text-center">{service.image}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="text-blue-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{service.price}</div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional service with attention to every detail
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-500">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Pricing Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect package for your luxury car rental needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                  <div className="text-gray-600">{plan.period}</div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="text-blue-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today to discuss your specific requirements and get a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Quote
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
