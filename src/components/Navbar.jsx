import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavbarRoutes = ["/signup"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (hideNavbarRoutes.includes(location.pathname)) return null;

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-2xl border-b-4 border-red-600 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">🏋️</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
              FITZONE <span className="text-red-500 ml-2">Gym</span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium">
              Transform Your Body, Elevate Your Mind
            </p>
          </div>
        </div>

        {/* Navigation Menu (Desktop & large tablets) */}
        <nav className="hidden lg:flex items-center space-x-8">
          {[
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
            { name: "BMI Checker", path: "/bmi-checker" },
            { name: "Trainers", path: "/trainers" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-300 hover:text-red-500 font-semibold transition-colors duration-300 uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA & Logout (Large screens 1024px and above) */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => navigate("/join")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 uppercase tracking-wide"
          >
            Join Now
          </button>
          <LogoutButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-red-500 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 text-white px-6 py-4 space-y-4 shadow-lg">
          {[
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
            { name: "BMI Checker", path: "/bmi-checker" },
            { name: "Trainers", path: "/trainers" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-red-500 font-semibold uppercase"
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/join");
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg uppercase"
          >
            Join Now
          </button>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
