'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Car, Trophy, Handshake, Star, Award, Shield, Users, Clock, Linkedin, Twitter, Car as CarIcon } from 'lucide-react';

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('story');

  const teamMembers = [
    {
      id: 1,
      name: "Ahmed Al-Rashid",
      position: "Founder & CEO",
      image: "/api/placeholder/300/300",
      description: "15+ years in luxury automotive industry. Passionate about delivering exceptional experiences.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Operations Director",
      image: "/api/placeholder/300/300",
      description: "Expert in fleet management and customer service excellence. 12+ years experience.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      position: "Fleet Manager",
      image: "/api/placeholder/300/300",
      description: "Specialist in luxury vehicle maintenance and quality assurance.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 4,
      name: "Emma Wilson",
      position: "Customer Relations",
      image: "/api/placeholder/300/300",
      description: "Dedicated to ensuring every client receives personalized luxury service.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const companyValues = [
    {
      icon: <Trophy className="w-16 h-16 text-yellow-500" />,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our service, from vehicle selection to customer care."
    },
    {
      icon: <Handshake className="w-16 h-16 text-blue-500" />,
      title: "Trust",
      description: "Building lasting relationships through transparency, reliability, and consistent quality service."
    },
    {
      icon: <Car className="w-16 h-16 text-red-500" />,
      title: "Passion",
      description: "Our love for luxury automobiles drives us to provide the most exceptional rental experiences."
    },
    {
      icon: <Star className="w-16 h-16 text-purple-500" />,
      title: "Innovation",
      description: "Continuously improving our services and embracing new technologies to enhance customer experience."
    }
  ];

  const achievements = [
    {
      number: "150+",
      label: "Luxury Vehicles",
      description: "Premium fleet of exotic and luxury cars"
    },
    {
      number: "1000+",
      label: "Happy Customers",
      description: "Satisfied clients across the UAE"
    },
    {
      number: "5+",
      label: "Years Experience",
      description: "Industry expertise and reliability"
    },
    {
      number: "24/7",
      label: "Support",
      description: "Round-the-clock customer assistance"
    }
  ];

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
              About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Marina Rental</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your premier luxury car rental service across the UAE. Experience the finest collection of exotic sports cars, luxury sedans, and SUVs.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, Marina Rental Car began with a simple vision: to provide the most exceptional luxury car rental experience in the UAE. What started as a small fleet of premium vehicles has grown into the region's most trusted luxury car rental service.
                </p>
                <p>
                  Our journey began when our founder, Ahmed Al-Rashid, recognized the need for a premium car rental service that could match the luxury lifestyle of Dubai's residents and visitors. With over 15 years of experience in the automotive industry, he set out to create something truly special.
                </p>
                <p>
                  Today, we're proud to offer one of the most extensive collections of luxury vehicles in the UAE, from exotic supercars to elegant sedans, all maintained to the highest standards and delivered with unmatched service excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CarIcon className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    To provide unparalleled luxury car rental experiences that exceed expectations and create lasting memories for our valued clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center">
                <div className="mb-6 flex items-center justify-center mx-auto mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate professionals who make Marina Rental Car the premier choice for luxury car rentals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                <p className="text-gray-600 text-sm mb-6">{member.description}</p>
                <div className="flex justify-center space-x-4">
                  <a href={member.social.linkedin} className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.social.twitter} className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Achievements</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and customer satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                  {achievement.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{achievement.label}</h3>
                <p className="text-blue-100 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Marina Rental?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart in the luxury car rental industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="mb-6 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Fleet</h3>
              <p className="text-gray-600 leading-relaxed">
                Our carefully curated collection features only the finest luxury vehicles, each maintained to the highest standards and regularly updated with the latest models.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="mb-6 flex items-center justify-center">
                <Shield className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Insurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive insurance coverage for all rentals, giving you peace of mind and complete protection during your luxury driving experience.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="mb-6 flex items-center justify-center">
                <Clock className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Round-the-clock customer support ensures assistance whenever you need it, with dedicated professionals ready to help with any requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who have chosen Marina Rental Car for their luxury driving needs.
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
