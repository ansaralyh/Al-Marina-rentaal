import Link from 'next/link';

export default function Footer() {
  return (
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
              <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Home</Link></li>
              <li><Link href="/aboutus" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">About Us</Link></li>
              <li><Link href="/#fleet" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Our Fleet</Link></li>
              <li><Link href="/#contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Contact Us</Link></li>
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
  );
}
