// import React, { useState, useEffect } from "react";
// import { handleError } from "../util";

// const Pricing = () => {
//   const [products, setProducts] = useState([]);
//   const [card2, setCard2] = useState([]);
//   const [card3, setCard3] = useState([])

//   const fetchProducts = async () => {
//     try {
//       const url = "http://localhost:8080/products/getproducts";
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: localStorage.getItem("token"),
//           "Content-Type": "application/json",
//         },
//       });

//       const result = await response.json();
//       console.log(result);
//       setProducts(result);
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchJymcard2 = async () => {
//     try {
//       const url = "http://localhost:8080/products/getjymcard2";
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: localStorage.getItem("token"),
//           "Content-Type": "application/json",
//         }
//       })
//       const result = await response.json();
//       console.log(result);
//       setCard2(result)
//     } catch (error) {
//       handleError(error)
//     }
//   };

//   useEffect(() => {
//     fetchJymcard2()
//   }, [])

//   const fetchJymcard3 = async () => {
//     try {
//       const url = "http://localhost:8080/products/getpremiumcard";
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: localStorage.getItem("token"),
//           "Content-Type": "application/json",
//         }
//       })
//       const result = await response.json();
//       console.log(result)
//       setCard3(result)
//     } catch (error) {
//       handleError(error)
//     }
//   }
//   useEffect(() => {
//     fetchJymcard3()
//   }, [])

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 p-6">
//       <div className="text-center mt-20 mb-12">
//         <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
//           Choose Your Perfect Plan
//         </h2>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Unlock your potential with our premium fitness membership plans
//         </p>
//       </div>

//       <div className="flex flex-wrap justify-center items-stretch gap-8">
//         {products.length > 0 && (
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full h-[700px] flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/90 group relative overflow-hidden border border-white/20">
//             {/* Animated gradient background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-transparent to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
//             {/* Decorative elements */}
//             <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
//             <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            
//             <div className="relative z-10 flex flex-col h-full">
//               <div className="relative mb-6">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 scale-150"></div>
//                 <img
//                   src={products[products.length - 1].picture}
//                   alt={products[products.length - 1].planNames}
//                   className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
//                 />
//               </div>

//               <h3 className="text-3xl font-black text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
//                 {products[products.length - 1].planNames}
//               </h3>

//               <div className="relative mb-6">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg"></div>
//                 <p className="relative text-5xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
//                   ₹{products[products.length - 1].amount}
//                 </p>
//               </div>

//               <div className="flex-1 space-y-4 text-gray-700 w-full mb-8">
//                 <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 group-hover:from-purple-50 group-hover:to-blue-50 transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
//                   <div className="flex items-center">
//                     <span className="text-2xl mr-3">🔐</span>
//                     <span className="font-bold text-gray-800">Locker:</span>
//                   </div>
//                   <span className="font-semibold text-purple-700">{products[products.length - 1].lockers}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 group-hover:from-purple-50 group-hover:to-blue-50 transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
//                   <div className="flex items-center">
//                     <span className="text-2xl mr-3">⏰</span>
//                     <span className="font-bold text-gray-800">Time:</span>
//                   </div>
//                   <span className="font-semibold text-purple-700">{products[products.length - 1].time}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 group-hover:from-purple-50 group-hover:to-blue-50 transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
//                   <div className="flex items-center">
//                     <span className="text-2xl mr-3">📅</span>
//                     <span className="font-bold text-gray-800">Duration:</span>
//                   </div>
//                   <span className="font-semibold text-purple-700">{products[products.length - 1].durations}</span>
//                 </div>
//               </div>

//               <button className="relative mt-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group-button">
//                 <span className="relative z-10">Choose Plan</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>
//             </div>
//           </div>
//         )}

//         {card2.length > 0 && (
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full h-[700px] flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/90 group relative overflow-hidden border border-white/20">
//             {/* Popular badge */}
//             <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-6 py-3 rounded-bl-3xl rounded-tr-3xl text-sm font-black shadow-xl z-20 animate-pulse">
//               ⭐ POPULAR
//             </div>

//             {/* Animated gradient background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 via-orange-100/30 to-red-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
//             {/* Decorative elements */}
//             <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
//             <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            
//             <div className="relative z-10 flex flex-col h-full">
//               <div className="relative mb-6">
//                 <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-150"></div>
//                 <img
//                   src={card2[card2.length - 1].pictures}
//                   alt={card2[card2.length - 1].plan}
//                   className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
//                 />
//               </div>

//               <h3 className="text-3xl font-black text-gray-800 mb-4 group-hover:text-orange-700 transition-colors duration-300">
//                 {card2[card2.length - 1].plan}
//               </h3>

//               <div className="relative mb-6">
//                 <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg"></div>
//                 <p className="relative text-5xl font-black bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
//                   ₹{card2[card2.length - 1].pricing}
//                 </p>
//               </div>

//               <div className="flex-1 space-y-2 text-gray-700 w-full mb-6 overflow-y-auto scrollbar-hide">
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">🔐</span>
//                     <span className="font-bold text-gray-800 text-sm">Locker:</span>
//                   </div>
//                   <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].locker}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">⏰</span>
//                     <span className="font-bold text-gray-800 text-sm">Time:</span>
//                   </div>
//                   <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].timing}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">📅</span>
//                     <span className="font-bold text-gray-800 text-sm">Duration:</span>
//                   </div>
//                   <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].duration}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">👥</span>
//                     <span className="font-bold text-gray-800 text-sm">Guests:</span>
//                   </div>
//                   <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].guestpasses}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300 border border-gray-100 group-hover:border-orange-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">❤️</span>
//                     <span className="font-bold text-gray-800 text-sm">Cardio:</span>
//                   </div>
//                   <span className="font-semibold text-orange-700 text-sm">{card2[card2.length - 1].cardiio}</span>
//                 </div>
//               </div>

//               <button className="relative mt-auto bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group-button">
//                 <span className="relative z-10">Choose Plan</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>
//             </div>
//           </div>
//         )}

//         {card3.length > 0 && (
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full h-[700px] flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/90 group relative overflow-hidden border border-white/20">
//             {/* Animated gradient background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-transparent to-teal-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
//             {/* Decorative elements */}
//             <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
//             <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            
//             <div className="relative z-10 flex flex-col h-full">
//               <div className="relative mb-4">
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 scale-150"></div>
//                 <img
//                   src={card3[card3.length - 1].picture}
//                   alt={card3[card3.length - 1].planName}
//                   className="relative w-28 h-28 object-cover rounded-full border-4 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
//                 />
//               </div>

//               <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
//                 {card3[card3.length - 1].planName}
//               </h3>

//               <div className="relative mb-4">
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg"></div>
//                 <p className="relative text-4xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
//                   ₹{card3[card3.length - 1].pricing}
//                 </p>
//               </div>

//               <div className="flex-1 space-y-2 text-gray-700 w-full mb-6 overflow-y-auto scrollbar-hide">
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">🔐</span>
//                     <span className="font-bold text-gray-800 text-sm">Locker:</span>
//                   </div>
//                   <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].locker}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">⏰</span>
//                     <span className="font-bold text-gray-800 text-sm">Time:</span>
//                   </div>
//                   <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].timing}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">📅</span>
//                     <span className="font-bold text-gray-800 text-sm">Duration:</span>
//                   </div>
//                   <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].duration}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">❤️</span>
//                     <span className="font-bold text-gray-800 text-sm">Cardio:</span>
//                   </div>
//                   <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].cardiio}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">🥗</span>
//                     <span className="font-bold text-gray-800 text-sm">Diet:</span>
//                   </div>
//                   <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].diet}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">💪</span>
//                     <span className="font-bold text-gray-800 text-sm">Trainer:</span>
//                   </div>
//                   <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].trainer}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
//                   <div className="flex items-center">
//                     <span className="text-lg mr-2">👥</span>
//                     <span className="font-bold text-gray-800 text-sm">Guests:</span>
//                   </div>
//                   <span className="font-semibold text-emerald-700 text-sm">{card3[card3.length - 1].guestpasses}</span>
//                 </div>
//               </div>

//               <button className="relative mt-auto bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group-button">
//                 <span className="relative z-10">Choose Plan</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add custom CSS for hiding scrollbars */}
//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Pricing;





import React, { useState, useEffect, useRef } from "react";
import { handleError } from "../util";
import Footer from "./Footer";

/* ─── Framer Motion (CDN-free inline spring animation via CSS + JS) ─── */
/* Since this is a drop-in React component, we use CSS keyframes + intersection
   observer for entrance animations, and inline style transitions for hover.
   If framer-motion is installed in the project, the motion.* wrappers below
   work automatically via the useMotion hook pattern. */

/* ══════════════════════════════════════════════════════════════════
   PRICING PAGE — ELITE DARK ARENA THEME
   Inspired by Equinox × Gymshark × Apple Fitness+
   Palette: Obsidian / Charcoal / Crimson / Gold / Off-White
══════════════════════════════════════════════════════════════════ */

const STATS = [
  { value: "10K+", label: "Elite Members" },
  { value: "50+",  label: "Expert Trainers" },
  { value: "24/7", label: "Facility Access" },
  { value: "4.9★", label: "Member Rating" },
];

const WHY = [
  {
    icon: "🏅",
    title: "Certified Trainers",
    desc: "World-class coaches with proven track records in elite athletic performance.",
  },
  {
    icon: "⚡",
    title: "Premium Equipment",
    desc: "State-of-the-art machines, free weights, and recovery tech — all maintained daily.",
  },
  {
    icon: "🥗",
    title: "Nutrition Guidance",
    desc: "Personalised meal plans crafted by sports nutritionists aligned to your goals.",
  },
  {
    icon: "🔒",
    title: "24/7 Support",
    desc: "Round-the-clock access to your dedicated wellness team, app, and concierge.",
  },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    result: "Lost 18 kg in 4 months",
    rating: 5,
    review:
      "The premium plan completely transformed my physique. The trainers are next-level and the facilities feel like a five-star resort.",
    avatar: "AM",
    gradient: "from-red-500 to-orange-500",
  },
  {
    name: "Priya Sharma",
    result: "Gained 8 kg muscle",
    rating: 5,
    review:
      "I've tried five gyms — nothing compares. The diet plan alone was worth every rupee. I feel elite every single session.",
    avatar: "PS",
    gradient: "from-gold to-yellow-500",
  },
  {
    name: "Rohan Verma",
    result: "Marathon-ready in 3 months",
    rating: 5,
    review:
      "The 24/7 access and cardio suite are insane. I trained at 2 AM for marathon prep and had the whole facility to myself.",
    avatar: "RV",
    gradient: "from-emerald-500 to-teal-500",
  },
];

/* ── tiny hook: animate element in when it enters viewport ── */
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

/* ── Feature row for cards ── */
function Feature({ icon, label, value, accent }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-xl mb-2"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-gray-300">
        <span>{icon}</span>
        {label}
      </span>
      <span className={`text-sm font-bold ${accent}`}>{value}</span>
    </div>
  );
}

/* ── Animated CTA button ── */
function JoinBtn({ gradient, shadow }) {
  const [ripple, setRipple] = useState(null);
  const [hovered, setHovered] = useState(false);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
  }

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="relative w-full py-4 rounded-2xl font-black text-white text-base tracking-widest uppercase overflow-hidden mt-auto"
      style={{
        background: gradient,
        boxShadow: hovered ? shadow : "none",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        letterSpacing: "0.12em",
      }}
    >
      {ripple && (
        <span
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%,-50%) scale(0)",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            animation: "ripple 0.6s linear",
            pointerEvents: "none",
          }}
        />
      )}
      <span className="relative z-10">Join Membership</span>
    </button>
  );
}

/* ── Comparison Table ── */
function ComparisonTable({ products, card2, card3 }) {
  const ref = useFadeIn(100);
  const rows = [
    { icon: "🔐", feature: "Locker",    v1: products[products.length-1]?.lockers,      v2: card2[card2.length-1]?.locker,      v3: card3[card3.length-1]?.locker },
    { icon: "❤️", feature: "Cardio",    v1: "—",                                        v2: card2[card2.length-1]?.cardiio,     v3: card3[card3.length-1]?.cardiio },
    { icon: "💪", feature: "Trainer",   v1: "—",                                        v2: "—",                                v3: card3[card3.length-1]?.trainer },
    { icon: "🥗", feature: "Diet Plan", v1: "—",                                        v2: "—",                                v3: card3[card3.length-1]?.diet },
    { icon: "👥", feature: "Guests",    v1: "—",                                        v2: card2[card2.length-1]?.guestpasses, v3: card3[card3.length-1]?.guestpasses },
    { icon: "⏰", feature: "Time",      v1: products[products.length-1]?.time,          v2: card2[card2.length-1]?.timing,      v3: card3[card3.length-1]?.timing },
  ];

  const plans = [
    products[products.length-1]?.planNames || "Basic",
    card2[card2.length-1]?.plan || "Standard",
    card3[card3.length-1]?.planName || "Premium",
  ];

  return (
    <section ref={ref} className="max-w-4xl mx-auto mt-24 px-4">
      <h3 className="text-center text-3xl font-black text-white mb-2 tracking-tight">
        Plan <span style={{ color: "#C9A84C" }}>Comparison</span>
      </h3>
      <p className="text-center text-gray-500 mb-10 text-sm">See exactly what each tier unlocks for you</p>

      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Header */}
        <div className="grid grid-cols-4 text-center py-5 px-4"
          style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div />
          {plans.map((p, i) => (
            <div key={i} className={`text-sm font-black tracking-wider uppercase ${i === 1 ? "text-yellow-400" : "text-gray-300"}`}>{p}</div>
          ))}
        </div>

        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-4 text-center py-4 px-4 text-sm"
            style={{ borderBottom: i < rows.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                     background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}
          >
            <div className="text-left text-gray-400 font-semibold flex items-center gap-2">
              <span>{row.icon}</span>{row.feature}
            </div>
            {[row.v1, row.v2, row.v3].map((v, j) => (
              <div key={j} className={`font-semibold ${j === 1 ? "text-yellow-300" : "text-gray-300"}`}>
                {v && v !== "—"
                  ? <span style={{ color: j === 1 ? "#C9A84C" : "#4ade80" }}>✔ {v}</span>
                  : <span className="text-gray-600">—</span>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const Pricing = () => {
  const [products, setProducts] = useState([]);
  const [card2, setCard2]       = useState([]);
  const [card3, setCard3]       = useState([]);

  /* ── existing API calls — UNCHANGED ── */
  const fetchProducts = async () => {
    try {
      const url = "https://fitzone-backend-ivyq.onrender.com/products/getproducts";
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) { handleError(error); }
  };
  useEffect(() => { fetchProducts(); }, []);

  const fetchJymcard2 = async () => {
    try {
      const url = "https://fitzone-backend-ivyq.onrender.com/products/getjymcard2";
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);
      setCard2(result);
    } catch (error) { handleError(error); }
  };
  useEffect(() => { fetchJymcard2(); }, []);

  const fetchJymcard3 = async () => {
    try {
      const url = "https://fitzone-backend-ivyq.onrender.com/products/getpremiumcard";
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);
      setCard3(result);
    } catch (error) { handleError(error); }
  };
  useEffect(() => { fetchJymcard3(); }, []);

  /* ── section refs ── */
  const heroRef    = useFadeIn(0);
  const statsRef   = useFadeIn(150);
  const cardsRef   = useFadeIn(0);
  const whyRef     = useFadeIn(0);
  const testiRef   = useFadeIn(0);

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes ripple { to { transform: translate(-50%,-50%) scale(4); opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-22px) scale(1.04); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gold-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); } 50% { box-shadow: 0 0 32px 8px rgba(201,168,76,0.35); } }
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
        .scrollbar-hide::-webkit-scrollbar { display:none; }
        .card-hover { transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease; }
        .card-hover:hover { transform: translateY(-10px) scale(1.02); }
        .popular-glow { animation: gold-pulse 2.5s infinite; }
        .floating { animation: float 6s ease-in-out infinite; }
        .animated-gradient-text {
          background: linear-gradient(90deg,#fff,#E8192C,#C9A84C,#fff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 5s ease infinite;
        }
      `}</style>

      {/* ════════════════════════════════════
          AMBIENT BACKGROUND ORBS
      ════════════════════════════════════ */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: 600, height: 600, borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 70%)",
                      animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "-15%", width: 500, height: 500, borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
                      animation: "float 10s ease-in-out infinite 2s" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "20%", width: 400, height: 400, borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(232,25,44,0.07) 0%, transparent 70%)",
                      animation: "float 12s ease-in-out infinite 4s" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════════════════════════
            HERO
        ════════════════════════════════════ */}
        <section ref={heroRef} className="relative pt-28 pb-16 px-4 text-center overflow-hidden">
          {/* Red laser line */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: 1, height: 120, background: "linear-gradient(to bottom, transparent, #E8192C, transparent)" }} />

          <p className="text-xs font-black tracking-widest uppercase mb-6"
             style={{ color: "#E8192C", letterSpacing: "0.35em" }}>
            Elite Fitness Membership
          </p>

          <h1 className="animated-gradient-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 max-w-4xl mx-auto"
              style={{ letterSpacing: "-0.02em" }}>
            Choose The Membership<br />That Fits Your Goals
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            Unlock premium fitness experiences, expert guidance,<br className="hidden sm:block" />
            and world-class facilities built for serious athletes.
          </p>

          {/* Stats row */}
          <div ref={statsRef} className="flex flex-wrap justify-center gap-6 md:gap-12 mt-4">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-black"
                   style={{ color: i % 2 === 0 ? "#E8192C" : "#C9A84C" }}>
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Decorative divider */}
          <div className="mt-16 mx-auto" style={{ width: 80, height: 2,
               background: "linear-gradient(to right, transparent, #E8192C, transparent)" }} />
        </section>

        {/* ════════════════════════════════════
            PRICING CARDS
        ════════════════════════════════════ */}
        <section ref={cardsRef} className="py-8 px-4">
          <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-6xl mx-auto">

            {/* ── CARD 1: Basic ── */}
            {products.length > 0 && (() => {
              const p = products[products.length - 1];
              return (
                <div className="card-hover relative rounded-3xl p-px w-full max-w-sm flex-shrink-0"
                     style={{ background: "linear-gradient(135deg,rgba(232,25,44,0.4),rgba(255,255,255,0.05),rgba(232,25,44,0.2))" }}>
                  <div className="rounded-3xl flex flex-col h-full p-7"
                       style={{ background: "linear-gradient(145deg,#111111,#0d0d0d)", minHeight: 620 }}>

                    {/* Image */}
                    <div className="relative w-20 h-20 mx-auto mb-5">
                      <div style={{ position: "absolute", inset: -4, borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(232,25,44,0.5) 0%, transparent 70%)" }} />
                      <img src={p.picture} alt={p.planNames}
                           className="relative w-20 h-20 object-cover rounded-full border-2"
                           style={{ borderColor: "rgba(232,25,44,0.6)" }} />
                    </div>

                    <p className="text-xs text-center font-black tracking-widest uppercase mb-2"
                       style={{ color: "#E8192C", letterSpacing: "0.3em" }}>Starter</p>
                    <h3 className="text-2xl font-black text-white text-center mb-4 tracking-tight">{p.planNames}</h3>

                    <div className="text-center mb-6">
                      <span className="text-5xl font-black text-white">₹{p.amount}</span>
                      <span className="text-gray-500 text-sm ml-1">/mo</span>
                    </div>

                    <div className="flex-1 mb-6">
                      <Feature icon="🔐" label="Locker"   value={p.lockers} accent="text-red-400" />
                      <Feature icon="⏰" label="Timing"   value={p.time}    accent="text-red-400" />
                      <Feature icon="📅" label="Duration" value={p.durations} accent="text-red-400" />
                    </div>

                    <JoinBtn
                      gradient="linear-gradient(135deg,#E8192C,#b91c1c)"
                      shadow="0 0 30px rgba(232,25,44,0.5), 0 8px 24px rgba(0,0,0,0.6)"
                    />
                  </div>
                </div>
              );
            })()}

            {/* ── CARD 2: Standard (POPULAR) ── */}
            {card2.length > 0 && (() => {
              const c = card2[card2.length - 1];
              return (
                <div className="card-hover popular-glow relative rounded-3xl p-px w-full max-w-sm flex-shrink-0"
                     style={{ background: "linear-gradient(135deg,#C9A84C,rgba(255,255,255,0.1),#C9A84C)",
                              transform: "scale(1.03)" }}>

                  {/* Popular ribbon */}
                  <div className="absolute -top-4 left-1/2 z-20"
                       style={{ transform: "translateX(-50%)",
                                background: "linear-gradient(90deg,#C9A84C,#f59e0b)",
                                borderRadius: 999, padding: "6px 20px",
                                fontSize: 11, fontWeight: 900, color: "#000",
                                letterSpacing: "0.2em", textTransform: "uppercase",
                                boxShadow: "0 4px 20px rgba(201,168,76,0.6)" }}>
                    ⭐ Most Popular
                  </div>

                  <div className="rounded-3xl flex flex-col h-full p-7"
                       style={{ background: "linear-gradient(145deg,#131108,#0f0e09)", minHeight: 660 }}>

                    <div className="relative w-24 h-24 mx-auto mb-5 mt-2 floating">
                      <div style={{ position: "absolute", inset: -6, borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(201,168,76,0.6) 0%, transparent 70%)" }} />
                      <img src={c.pictures} alt={c.plan}
                           className="relative w-24 h-24 object-cover rounded-full border-2"
                           style={{ borderColor: "#C9A84C" }} />
                    </div>

                    <p className="text-xs text-center font-black tracking-widest uppercase mb-2"
                       style={{ color: "#C9A84C", letterSpacing: "0.3em" }}>Gold Tier</p>
                    <h3 className="text-3xl font-black text-white text-center mb-4 tracking-tight">{c.plan}</h3>

                    <div className="text-center mb-6">
                      <span className="text-5xl font-black" style={{ color: "#C9A84C" }}>₹{c.pricing}</span>
                      <span className="text-gray-500 text-sm ml-1">/mo</span>
                    </div>

                    <div className="flex-1 mb-6 overflow-y-auto scrollbar-hide">
                      <Feature icon="🔐" label="Locker"   value={c.locker}      accent="text-yellow-400" />
                      <Feature icon="⏰" label="Timing"   value={c.timing}      accent="text-yellow-400" />
                      <Feature icon="📅" label="Duration" value={c.duration}    accent="text-yellow-400" />
                      <Feature icon="👥" label="Guests"   value={c.guestpasses} accent="text-yellow-400" />
                      <Feature icon="❤️" label="Cardio"   value={c.cardiio}     accent="text-yellow-400" />
                    </div>

                    <JoinBtn
                      gradient="linear-gradient(135deg,#C9A84C,#92701e)"
                      shadow="0 0 40px rgba(201,168,76,0.6), 0 8px 32px rgba(0,0,0,0.7)"
                    />
                  </div>
                </div>
              );
            })()}

            {/* ── CARD 3: Premium ── */}
            {card3.length > 0 && (() => {
              const c = card3[card3.length - 1];
              return (
                <div className="card-hover relative rounded-3xl p-px w-full max-w-sm flex-shrink-0"
                     style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.5),rgba(255,255,255,0.05),rgba(6,182,212,0.3))" }}>

                  {/* Recommended badge */}
                  <div className="absolute -top-4 right-6 z-20"
                       style={{ background: "linear-gradient(90deg,#10b981,#06b6d4)",
                                borderRadius: 999, padding: "5px 16px",
                                fontSize: 10, fontWeight: 900, color: "#fff",
                                letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    ✦ Recommended
                  </div>

                  <div className="rounded-3xl flex flex-col h-full p-7"
                       style={{ background: "linear-gradient(145deg,#0a110f,#090d0d)", minHeight: 620 }}>

                    <div className="relative w-20 h-20 mx-auto mb-5">
                      <div style={{ position: "absolute", inset: -4, borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)" }} />
                      <img src={c.picture} alt={c.planName}
                           className="relative w-20 h-20 object-cover rounded-full border-2"
                           style={{ borderColor: "rgba(16,185,129,0.7)" }} />
                    </div>

                    <p className="text-xs text-center font-black tracking-widest uppercase mb-2"
                       style={{ color: "#10b981", letterSpacing: "0.3em" }}>Elite</p>
                    <h3 className="text-2xl font-black text-white text-center mb-4 tracking-tight">{c.planName}</h3>

                    <div className="text-center mb-6">
                      <span className="text-5xl font-black"
                            style={{ background: "linear-gradient(90deg,#10b981,#06b6d4)",
                                     WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        ₹{c.pricing}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">/mo</span>
                    </div>

                    <div className="flex-1 mb-6 overflow-y-auto scrollbar-hide">
                      <Feature icon="🔐" label="Locker"   value={c.locker}      accent="text-emerald-400" />
                      <Feature icon="⏰" label="Timing"   value={c.timing}      accent="text-emerald-400" />
                      <Feature icon="📅" label="Duration" value={c.duration}    accent="text-emerald-400" />
                      <Feature icon="❤️" label="Cardio"   value={c.cardiio}     accent="text-emerald-400" />
                      <Feature icon="🥗" label="Diet"     value={c.diet}        accent="text-emerald-400" />
                      <Feature icon="💪" label="Trainer"  value={c.trainer}     accent="text-emerald-400" />
                      <Feature icon="👥" label="Guests"   value={c.guestpasses} accent="text-emerald-400" />
                    </div>

                    <JoinBtn
                      gradient="linear-gradient(135deg,#10b981,#0891b2)"
                      shadow="0 0 30px rgba(16,185,129,0.45), 0 8px 24px rgba(0,0,0,0.6)"
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── Comparison Table ── */}
        {(products.length > 0 || card2.length > 0 || card3.length > 0) && (
          <ComparisonTable products={products} card2={card2} card3={card3} />
        )}

        {/* ════════════════════════════════════
            WHY CHOOSE US
        ════════════════════════════════════ */}
        <section ref={whyRef} className="max-w-5xl mx-auto px-4 mt-28">
          <div className="text-center mb-14">
            <p className="text-xs font-black tracking-widest uppercase mb-3"
               style={{ color: "#E8192C", letterSpacing: "0.35em" }}>The Difference</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Why <span style={{ color: "#C9A84C" }}>Elite Athletes</span> Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => {
              const ref = useFadeIn(i * 120);
              return (
                <div key={i} ref={ref} className="card-hover rounded-2xl p-6 text-center"
                     style={{ background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.07)",
                              backdropFilter: "blur(12px)" }}>
                  <div className="text-4xl mb-4">{w.icon}</div>
                  <h4 className="text-white font-black text-base mb-2 tracking-tight">{w.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════════
            TESTIMONIALS
        ════════════════════════════════════ */}
        <section ref={testiRef} className="max-w-5xl mx-auto px-4 mt-28 pb-28">
          <div className="text-center mb-14">
            <p className="text-xs font-black tracking-widest uppercase mb-3"
               style={{ color: "#E8192C", letterSpacing: "0.35em" }}>Real Transformations</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Members Who <span style={{ color: "#C9A84C" }}>Changed Their Lives</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => {
              const ref = useFadeIn(i * 140);
              return (
                <div key={i} ref={ref} className="card-hover rounded-2xl p-6"
                     style={{ background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.07)",
                              backdropFilter: "blur(12px)" }}>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-xs font-semibold" style={{ color: "#C9A84C" }}>{t.result}</p>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {Array(t.rating).fill(0).map((_, j) => (
                      <span key={j} style={{ color: "#C9A84C", fontSize: 13 }}>★</span>
                    ))}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed italic">"{t.review}"</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Footer line ── */}
      
      <Footer />
      </div>{/* /z-1 wrapper */}
    </div>
  );
};

export default Pricing;