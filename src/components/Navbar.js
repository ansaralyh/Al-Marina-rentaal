'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3" onClick={closeMobileMenu}>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">M</span>
              </div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Marina Rental
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/aboutus" 
              className={`font-medium transition-colors ${
                isActive('/aboutus') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About Us
            </Link>
            <Link 
              href="/services" 
              className={`font-medium transition-colors ${
                isActive('/services') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/fleet" 
              className={`font-medium transition-colors ${
                isActive('/fleet') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Our Fleet
            </Link>
            <Link 
              href="/blogs" 
              className={`font-medium transition-colors ${
                isActive('/blogs') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Blog
            </Link>
            <Link 
              href="/contactus" 
              className={`font-medium transition-colors ${
                isActive('/contactus') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact Us
            </Link>
          </div>
          
          {/* Desktop Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="hidden xl:block text-sm text-gray-600">
              <span className="font-medium">Call:</span> +971 55 566 0466
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 xl:px-6 py-2 xl:py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm xl:text-base">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="hidden sm:block text-xs text-gray-600">
              <span className="font-medium">Call:</span> +971 55 566 0466
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link 
                href="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/aboutus" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/aboutus') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/services') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Services
              </Link>
              <Link 
                href="/fleet" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/fleet') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Our Fleet
              </Link>
              <Link 
                href="/blogs" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/blogs') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
              <Link 
                href="/contactus" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/contactus') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
