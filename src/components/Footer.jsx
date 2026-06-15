import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-blue-900/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Gym Info Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg shadow-lg">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  FITZONE
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Transform your body, elevate your mind. Join thousands who've achieved their fitness goals with our state-of-the-art equipment and expert trainers.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, color: 'hover:text-blue-500', bg: 'hover:bg-blue-500/20' },
                  { Icon: Instagram, color: 'hover:text-pink-500', bg: 'hover:bg-pink-500/20' },
                  { Icon: Twitter, color: 'hover:text-sky-500', bg: 'hover:bg-sky-500/20' },
                  { Icon: Youtube, color: 'hover:text-red-500', bg: 'hover:bg-red-500/20' }
                ].map(({ Icon, color, bg }, index) => (
                  <button
                    key={index}
                    className={`p-3 rounded-full bg-gray-800 border border-gray-700 ${color} ${bg} transform hover:scale-110 transition-all duration-300 hover:shadow-lg group`}
                  >
                    <Icon className="h-5 w-5 group-hover:animate-pulse" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white border-b-2 border-red-500 pb-2 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  'Home', 'About Us', 'Classes', 'Trainers', 'Membership', 
                  'Nutrition', 'Success Stories', 'Contact'
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white border-b-2 border-blue-500 pb-2 inline-block">
                Contact Info
              </h4>
              <div className="space-y-4">
                {[
                  { Icon: MapPin, text: "123 Fitness Street, Muscle City, MC 12345", color: "text-green-400" },
                  { Icon: Phone, text: "+1 (555) 123-FLEX", color: "text-blue-400" },
                  { Icon: Mail, text: "info@fitzonegym.com", color: "text-purple-400" }
                ].map(({ Icon, text, color }, index) => (
                  <div key={index} className="flex items-start space-x-3 group cursor-pointer">
                    <div className={`p-2 rounded-lg bg-gray-800 ${color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white border-b-2 border-green-500 pb-2 inline-block">
                Working Hours
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-yellow-400" />
                  <span className="text-lg font-semibold text-yellow-400">We're Always Open!</span>
                </div>
                {[
                  { day: 'Monday - Friday', time: '5:00 AM - 11:00 PM' },
                  { day: 'Saturday', time: '6:00 AM - 10:00 PM' },
                  { day: 'Sunday', time: '7:00 AM - 9:00 PM' }
                ].map(({ day, time }, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors duration-300">
                    <span className="text-gray-300 font-medium">{day}</span>
                    <span className="text-green-400 font-semibold">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated with FitZone</h3>
              <p className="text-gray-300">Get the latest fitness tips, workout plans, and exclusive offers delivered to your inbox!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-300"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-red-500/25">
                Subscribe
              </button>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mt-12 text-center">
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-500 fill-current animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
              ))}
            </div>
            <blockquote className="text-xl italic text-gray-300 mb-4 max-w-3xl mx-auto">
              "FitZone transformed my life completely. The trainers, equipment, and community here are simply unmatched!"
            </blockquote>
            <cite className="text-red-400 font-semibold">- Sarah Johnson, Member since 2020</cite>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 FitZone Gym. All rights reserved. | Designed with 💪 for fitness enthusiasts
              </div>
              <div className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;