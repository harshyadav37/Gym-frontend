import React, { useState, useEffect } from "react";
import { handleError } from "../util";

const Pricing = () => {
  const [products, setProducts] = useState([]);
  const [card2, setCard2] = useState([]);
  const [card3, setCard3] = useState([])

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products/getproducts";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchJymcard2 = async () => {
    try {
      const url = "http://localhost:8080/products/getjymcard2";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        }
      })
      const result = await response.json();
      console.log(result);
      setCard2(result)
    } catch (error) {
      handleError(error)
    }
  };

  useEffect(() => {
    fetchJymcard2()
  }, [])

  const fetchJymcard3 = async () => {
    try {
      const url = "http://localhost:8080/products/getpremiumcard";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        }
      })
      const result = await response.json();
      console.log(result)
      setCard3(result)
    } catch (error) {
      handleError(error)
    }
  }
  useEffect(() => {
    fetchJymcard3()
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 p-6">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Choose Your Perfect Plan
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock your potential with our premium fitness membership plans
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-stretch gap-8">
        {products.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full h-[700px] flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/90 group relative overflow-hidden border border-white/20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-transparent to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 scale-150"></div>
                <img
                  src={products[products.length - 1].picture}
                  alt={products[products.length - 1].planNames}
                  className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                />
              </div>

              <h3 className="text-3xl font-black text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                {products[products.length - 1].planNames}
              </h3>

              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg"></div>
                <p className="relative text-5xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  ₹{products[products.length - 1].amount}
                </p>
              </div>

              <div className="flex-1 space-y-4 text-gray-700 w-full mb-8">
                <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 group-hover:from-purple-50 group-hover:to-blue-50 transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🔐</span>
                    <span className="font-bold text-gray-800">Locker:</span>
                  </div>
                  <span className="font-semibold text-purple-700">{products[products.length - 1].lockers}</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 group-hover:from-purple-50 group-hover:to-blue-50 transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⏰</span>
                    <span className="font-bold text-gray-800">Time:</span>
                  </div>
                  <span className="font-semibold text-purple-700">{products[products.length - 1].time}</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 group-hover:from-purple-50 group-hover:to-blue-50 transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📅</span>
                    <span className="font-bold text-gray-800">Duration:</span>
                  </div>
                  <span className="font-semibold text-purple-700">{products[products.length - 1].durations}</span>
                </div>
              </div>

              <button className="relative mt-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group-button">
                <span className="relative z-10">Choose Plan</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        )}

        {card2.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full h-[700px] flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/90 group relative overflow-hidden border border-white/20">
            {/* Popular badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-6 py-3 rounded-bl-3xl rounded-tr-3xl text-sm font-black shadow-xl z-20 animate-pulse">
              ⭐ POPULAR
            </div>

            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 via-orange-100/30 to-red-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-150"></div>
                <img
                  src={card2[card2.length - 1].pictures}
                  alt={card2[card2.length - 1].plan}
                  className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                />
              </div>

              <h3 className="text-3xl font-black text-gray-800 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                {card2[card2.length - 1].plan}
              </h3>

              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg"></div>
                <p className="relative text-5xl font-black bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  ₹{card2[card2.length - 1].pricing}
                </p>
              </div>

              <div className="flex-1 space-y-2 text-gray-700 w-full mb-6 overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">🔐</span>
                    <span className="font-bold text-gray-800 text-sm">Locker:</span>
                  </div>
                  <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].locker}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">⏰</span>
                    <span className="font-bold text-gray-800 text-sm">Time:</span>
                  </div>
                  <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].timing}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">📅</span>
                    <span className="font-bold text-gray-800 text-sm">Duration:</span>
                  </div>
                  <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].duration}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">👥</span>
                    <span className="font-bold text-gray-800 text-sm">Guests:</span>
                  </div>
                  <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].guestpasses}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">❤️</span>
                    <span className="font-bold text-gray-800 text-sm">Cardio:</span>
                  </div>
                  <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].cardiio}</span>
                </div>
              </div>

              <button className="relative mt-auto bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group-button">
                <span className="relative z-10">Choose Plan</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        )}

        {card3.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full h-[700px] flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/90 group relative overflow-hidden border border-white/20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-transparent to-teal-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 scale-150"></div>
                <img
                  src={card3[card3.length - 1].picture}
                  alt={card3[card3.length - 1].planName}
                  className="relative w-28 h-28 object-cover rounded-full border-4 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                />
              </div>

              <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                {card3[card3.length - 1].planName}
              </h3>

              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg"></div>
                <p className="relative text-4xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  ₹{card3[card3.length - 1].pricing}
                </p>
              </div>

              <div className="flex-1 space-y-2 text-gray-700 w-full mb-6 overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">🔐</span>
                    <span className="font-bold text-gray-800 text-sm">Locker:</span>
                  </div>
                  <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].locker}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">⏰</span>
                    <span className="font-bold text-gray-800 text-sm">Time:</span>
                  </div>
                  <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].timing}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">📅</span>
                    <span className="font-bold text-gray-800 text-sm">Duration:</span>
                  </div>
                  <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].duration}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">❤️</span>
                    <span className="font-bold text-gray-800 text-sm">Cardio:</span>
                  </div>
                  <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].cardiio}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">🥗</span>
                    <span className="font-bold text-gray-800 text-sm">Diet:</span>
                  </div>
                  <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].diet}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">💪</span>
                    <span className="font-bold text-gray-800 text-sm">Trainer:</span>
                  </div>
                  <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].trainer}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">👥</span>
                    <span className="font-bold text-gray-800 text-sm">Guests:</span>
                  </div>
                  <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].guestpasses}</span>
                </div>
              </div>

              <button className="relative mt-auto bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group-button">
                <span className="relative z-10">Choose Plan</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add custom CSS for hiding scrollbars */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Pricing;