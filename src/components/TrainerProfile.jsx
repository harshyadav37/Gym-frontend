// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { handleError } from "../util";
// import Contact from "./Contact";

// import {
//   Star,
//   Users,
//   Clock,
//   ArrowLeft,
//   Award,
//   MapPin,
//   Mail,
//   Phone,
// } from "lucide-react";

// const TrainerProfile = () => {
//   const { id } = useParams(); // Get id from URL
//   const navigate = useNavigate();
//   const [trainer, setTrainer] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview"); // default tab
//   const [isWritingReview, setIsWritingReview] = useState(false);
//   const [reviews, setReviews] = useState([]); // list of reviews
//   const [reviewName, setReviewName] = useState("");
//   const [reviewText, setReviewText] = useState("");
//   const [reviewRating, setReviewRating] = useState(5);

//   // Function to calculate average rating
//   const calculateAverageRating = (reviewsArray) => {
//     if (!reviewsArray || reviewsArray.length === 0) return 0;
//     const sum = reviewsArray.reduce((acc, review) => acc + (review.rating || 0), 0);
//     return (sum / reviewsArray.length).toFixed(1);
//   };

//   // Fetch trainer by ID
//   const fetchTrainerById = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/products/get-trainercard/${id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: localStorage.getItem("token"),
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch trainer details");

//       const data = await response.json();
//       setTrainer(data);

//       // Set reviews from different possible sources
//       let reviewsData = [];
//       if (data.reviews && Array.isArray(data.reviews)) {
//         reviewsData = data.reviews;
//       } else if (data.trainerReviewsList && Array.isArray(data.trainerReviewsList)) {
//         reviewsData = data.trainerReviewsList;
//       } else if (data.trainerReviewName && data.trainerReviewText) {
//         reviewsData = [{
//           name: data.trainerReviewName,
//           text: data.trainerReviewText,
//           rating: data.trainerRating || 5
//         }];
//       }
      
//       setReviews(reviewsData);
      
//       // Update trainer rating based on reviews if reviews exist
//       if (reviewsData.length > 0) {
//         const avgRating = calculateAverageRating(reviewsData);
//         setTrainer(prev => ({
//           ...prev,
//           trainerRating: avgRating,
//           trainerReviews: reviewsData.length
//         }));
//       }
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchTrainerById();
//     }
//   }, [id]);

//   const submitReview = async () => {
//     if (!reviewName || !reviewText) return alert("Please fill all fields");

//     try {
//       const response = await fetch(
//         `http://localhost:8080/products/trainers/${id}/reviews`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: localStorage.getItem("token"),
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: reviewName,
//             text: reviewText,
//             rating: reviewRating,
//           }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to submit review");

//       // Create new review object
//       const newReview = {
//         name: reviewName,
//         text: reviewText,
//         rating: reviewRating,
//         createdAt: new Date().toISOString()
//       };

//       // Update local reviews state
//       const updatedReviews = [...reviews, newReview];
//       setReviews(updatedReviews);

//       // Calculate new average rating
//       const newAvgRating = calculateAverageRating(updatedReviews);
      
//       // Update trainer state with new rating and review count
//       setTrainer(prev => ({
//         ...prev,
//         trainerRating: newAvgRating,
//         trainerReviews: updatedReviews.length,
//         reviews: updatedReviews
//       }));

//       // Reset form
//       setReviewName("");
//       setReviewText("");
//       setReviewRating(5);
//       setIsWritingReview(false);
      
//       alert("Review submitted successfully!");
      
//     } catch (error) {
//       handleError(error);
//       alert("Failed to submit review. Please try again.");
//     }
//   };

//   if (!trainer) {
//     return <p className="flex justify-center items-center min-h-screen text-lg">Loading trainer profile...</p>;
//   }

//   return (
//     <section className="w-full mt-15 flex flex-col bg-gray-50 min-h-screen">
//       {/* Back Button */}
//       <div className="w-full max-w-5xl mx-auto px-4 py-4">
//         <button
//           onClick={() => navigate("/trainers")}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft className="w-4 h-4" /> Back to Trainers
//         </button>
//       </div>

//       {/* Header Section */}
//       <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 sm:py-8 px-4 sm:px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
//             {/* Profile Image */}
//             <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white/30 overflow-hidden flex-shrink-0">
//               <img
//                 src={trainer.trainerImage || "https://via.placeholder.com/150"}
//                 alt={trainer.trainerName}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Profile Content */}
//             <div className="flex-1 text-center sm:text-left sm:pt-4">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
//                 {trainer.trainerName}
//               </h1>
//               <p className="text-lg sm:text-xl text-white/90 mb-4">
//                 {trainer.trainerRole}
//               </p>

//               {/* Stats Row */}
//               <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-6 text-base sm:text-lg">
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                   <span className="font-semibold">{trainer.trainerRating}</span>
//                   <span className="text-white/80">
//                     ({reviews.length} reviews)
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-white/80" />
//                   <span>{trainer.trainerExperience} years experience</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Users className="w-5 h-5 text-white/80" />
//                   <span>{trainer.trainerClientTrained || 0}+ clients trained</span>
//                 </div>
//               </div>

//               {/* Tags */}
//               <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap justify-center sm:justify-start">
//                 {trainer.trainerTags &&
//                   (Array.isArray(trainer.trainerTags) ? trainer.trainerTags : trainer.trainerTags.split(",")).map((tag, index) => (
//                     <span
//                       key={index}
//                       className="px-3 sm:px-4 py-2 bg-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-white/20"
//                     >
//                       {typeof tag === 'string' ? tag.trim() : tag}
//                     </span>
//                   ))}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//                 <button className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 transition-colors w-full sm:w-auto">
//                   Book Session Now
//                 </button>
//                 <button className="border-2 border-white/40 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors w-full sm:w-auto">
//                   Message Trainer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
//             {["overview", "services", "reviews", "contact"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-4 px-2 border-b-2 font-medium capitalize transition-colors whitespace-nowrap text-sm sm:text-base ${
//                   activeTab === tab
//                     ? "border-blue-600 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="w-full flex justify-center items-center mx-auto px-4 mt-4">
//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="flex flex-col lg:flex-row w-full max-w-6xl mb-5 gap-6">
//             {/* Left Column */}
//             <div className="flex-1 space-y-6">
//               {/* About */}
//               <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
//                   About {trainer.trainerName}
//                 </h2>
//                 <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                   {trainer.trainerAbout || trainer.trainerDescription || "No details provided."}
//                 </p>
//               </div>

//               {/* Certifications */}
//               <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <Award className="w-5 h-5 text-blue-600" />
//                   Certifications & Qualifications
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   <div className="bg-blue-50 text-blue-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
//                     <Award className="w-4 h-4" />
//                     {trainer.trainerQualification || trainer.trainerCertifications || "Certified Trainer"}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Quick Info Sidebar */}
//             <div className="w-full lg:w-1/3">
//               <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 lg:sticky lg:top-24">
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
//                   Quick Info
//                 </h3>

//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-sm sm:text-base">Location</span>
//                     <span className="font-semibold text-gray-900 text-sm sm:text-base">
//                       {trainer.trainerLocation || "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-sm sm:text-base">Hourly Rate</span>
//                     <span className="font-bold text-base sm:text-lg text-gray-900">
//                       ${trainer.trainerPrice || "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-sm sm:text-base">Availability</span>
//                     <span className="font-semibold text-green-600 text-sm sm:text-base">
//                       {trainer.trainerStatus || "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-sm sm:text-base">Clients Trained</span>
//                     <span className="font-semibold text-gray-900 text-sm sm:text-base">
//                       {trainer.trainerClientTrained || 0}+
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-sm sm:text-base">Rating</span>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span className="font-semibold text-gray-900 text-sm sm:text-base">
//                         {trainer.trainerRating}
//                       </span>
//                       <span className="text-gray-500 text-xs">
//                         ({reviews.length})
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t pt-6">
//                   <h4 className="font-bold text-gray-900 mb-4 text-base sm:text-lg">
//                     Ready to Start?
//                   </h4>
//                   <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
//                     Take the first step towards your fitness goals.
//                   </p>
//                   <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base">
//                     Schedule Consultation
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Services Tab */}
//         {activeTab === "services" && (
//           <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-6xl">
//             <h2 className="text-lg font-bold mb-6">Training Services</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {trainer.trainerService && trainer.trainerService.length > 0 ? (
//                 trainer.trainerService.map((service) => (
//                   <div
//                     key={service._id}
//                     className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow flex flex-col items-start shadow-sm"
//                   >
//                     <h3 className="font-semibold text-base sm:text-lg">{service.name}</h3>
//                     <p className="text-blue-600 font-bold text-lg sm:text-xl">
//                       ${service.price}
//                     </p>
//                     <p className="text-gray-500 text-xs sm:text-sm">{service.duration}</p>
//                     <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 text-sm sm:text-base">
//                       Book This Service
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm sm:text-base">No services available.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Reviews Tab */}
//         {activeTab === "reviews" && (
//           <section className="w-full flex justify-center flex-col items-center">
//             <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-6xl space-y-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-bold">Client Reviews</h2>
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                   <span className="font-semibold">{trainer.trainerRating}</span>
//                   <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
//                 </div>
//               </div>

//               {reviews && reviews.length > 0 ? (
//                 <div className="space-y-4">
//                   {reviews.map((review, index) => (
//                     <div key={index} className="border-b pb-4 last:border-b-0">
//                       <div className="flex items-center gap-4 mb-2">
//                         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
//                           {review.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-semibold text-sm sm:text-base">{review.name}</p>
//                           <div className="flex items-center gap-1">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`w-4 h-4 ${
//                                   i < (review.rating || 0)
//                                     ? "fill-yellow-400 text-yellow-400"
//                                     : "text-gray-300"
//                                 }`}
//                               />
//                             ))}
//                             <span className="ml-1 text-sm">{review.rating}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-gray-600 text-xs sm:text-sm ml-14">{review.text}</p>
//                       {review.createdAt && (
//                         <p className="text-gray-400 text-xs ml-14 mt-1">
//                           {new Date(review.createdAt).toLocaleDateString()}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm sm:text-base text-gray-500 text-center py-8">
//                   No reviews yet. Be the first to review this trainer!
//                 </p>
//               )}

//               {/* Toggle Write Review Form Button */}
//               <div className="mt-6 border-t pt-4">
//                 <button
//                   onClick={() => setIsWritingReview(!isWritingReview)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
//                 >
//                   {isWritingReview ? "Cancel" : "Write a Review"}
//                 </button>
//               </div>

//               {/* Add Review Form (Collapsible) */}
//               {isWritingReview && (
//                 <div className="mt-4 w-full bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-bold mb-4 text-base sm:text-lg">Write a Review</h3>
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       placeholder="Your Name"
//                       className="w-full border rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       value={reviewName}
//                       onChange={(e) => setReviewName(e.target.value)}
//                     />
//                     <textarea
//                       placeholder="Share your experience with this trainer..."
//                       className="w-full border rounded-lg p-3 text-sm sm:text-base min-h-24 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       value={reviewText}
//                       onChange={(e) => setReviewText(e.target.value)}
//                     />
//                     <div className="flex items-center gap-4">
//                       <label className="text-sm font-medium">Rating:</label>
//                       <select
//                         value={reviewRating}
//                         onChange={(e) => setReviewRating(Number(e.target.value))}
//                         className="border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400"
//                       >
//                         {[5, 4, 3, 2, 1].map((n) => (
//                           <option key={n} value={n}>
//                             {n} Star{n > 1 ? "s" : ""} {n === 5 ? "- Excellent" : n === 4 ? "- Good" : n === 3 ? "- Average" : n === 2 ? "- Poor" : "- Terrible"}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <button
//                       onClick={submitReview}
//                       className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-sm sm:text-base font-medium w-full sm:w-auto"
//                       disabled={!reviewName || !reviewText}
//                     >
//                       Submit Review
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>
//         )}

//         {/* Contact Tab */}
//         {activeTab === "contact" && (
//           <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-6xl">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Contact Info */}
//               <div className="p-4 bg-white shadow-md rounded-lg">
//                 <h2 className="text-lg font-bold mb-4">Contact Information</h2>
//                 <ul className="space-y-3 text-gray-700">
//                   <li className="flex items-center gap-2 text-sm sm:text-base">
//                     <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                     <span className="break-words">{trainer.trainerLocation}</span>
//                   </li>
//                   <li className="flex items-center gap-2 text-sm sm:text-base">
//                     <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                     <span className="break-all">{trainer.trainerEmail}</span>
//                   </li>
//                   <li className="flex items-center gap-2 text-sm sm:text-base">
//                     <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                     <span>{trainer.trainerPhone}</span>
//                   </li>
//                 </ul>
//                 <h3 className="mt-6 font-semibold text-sm sm:text-base">
//                   Follow {trainer.trainerName}
//                 </h3>
//               </div>

//               <section className="w-full">
//                 <Contact />
//               </section>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TrainerProfile;

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleError } from "../util";
import Contact from "./Contact";

import {
  Star,
  Users,
  Clock,
  ArrowLeft,
  Award,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
  Shield,
  ChevronRight,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  X,
  ThumbsUp,
  Trophy,
  Dumbbell,
  Flame,
  BarChart2,
  PlayCircle,
  Instagram,
  Twitter,
  Youtube,
  Loader,
  CheckCheck,
  AlertCircle,
} from "lucide-react";

// ── tiny motion helper (no framer-motion dependency needed) ──────────────────
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// ── animated counter ─────────────────────────────────────────────────────────
const Counter = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const end = parseFloat(to) || 0;
        const dur = 1400;
        const step = (end / dur) * 16;
        const tick = () => {
          start += step;
          if (start >= end) { setVal(end); return; }
          setVal(Math.floor(start));
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ── Star picker ──────────────────────────────────────────────────────────────
const StarPicker = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button key={n} type="button" onClick={() => onChange(n)}>
        <Star
          className={`w-7 h-7 transition-colors ${n <= value ? "fill-yellow-400 text-yellow-400" : "text-white/20 hover:text-yellow-400"}`}
        />
      </button>
    ))}
  </div>
);

// ── Booking Modal ─────────────────────────────────────────────────────────────
const BookingModal = ({ trainer, selectedService, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=form, 2=loading, 3=success, 4=error
  const [form, setForm] = useState({
    service: selectedService?._id || "",
    date: "",
    time: "",
    notes: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const services = trainer?.trainerService || [];
  const timeSlots = [
    "06:00 AM","07:00 AM","08:00 AM","09:00 AM","10:00 AM",
    "11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM",
    "04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    if (!form.service) return "Please select a service.";
    if (!form.date) return "Please pick a date.";
    if (!form.time) return "Please pick a time slot.";
    return null;
  };

  const submit = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    const err = validate();
    if (err) { setErrorMsg(err); return; }
    setErrorMsg("");
    setStep(2);
    try {
      const res = await fetch(`https://fitzone-backend-ivyq.onrender.com/products/bookings`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainerId: trainer._id || trainer.id,
          serviceId: form.service,
          date: form.date,
          time: form.time,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      setStep(3);
    } catch (e) {
      handleError(e);
      setStep(4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative  w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* glow */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 relative">
          {/* Step 1 – form */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-black text-white mb-1">Book a Session</h2>
              <p className="text-white/50 text-sm mb-6">with {trainer.trainerName}</p>

              {errorMsg && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2 mb-4 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMsg}
                </div>
              )}

              <div className="space-y-4">
                {/* Service */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-1.5">Service</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/60 transition-colors"
                  >
                    <option value="" className="bg-[#111]">Select a service…</option>
                    {services.map((s) => (
                      <option key={s._id} value={s._id} className="bg-[#111]">
                        {s.name} — ${s.price} ({s.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-1.5">Date</label>
                  <input
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/60 transition-colors"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-1.5">Time Slot</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, time: t })}
                        className={`py-2 rounded-lg text-xs font-medium transition-all ${
                          form.time === t
                            ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                            : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-1.5">Notes (optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Any specific goals or requirements…"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/60 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={submit}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl text-white font-bold text-base hover:shadow-lg hover:shadow-red-600/40 transition-all active:scale-95"
                >
                  Confirm Booking
                </button>
              </div>
            </>
          )}

          {/* Step 2 – loading */}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader className="w-10 h-10 text-red-500 animate-spin" />
              <p className="text-white font-semibold">Processing your booking…</p>
            </div>
          )}

          {/* Step 3 – success */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                <CheckCheck className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-black text-white">Session Booked!</h3>
              <p className="text-white/50 text-sm">
                Your session with {trainer.trainerName} is confirmed. Check your email for details.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-red-600/40 transition-all"
              >
                Done
              </button>
            </div>
          )}

          {/* Step 4 – error */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-black text-white">Booking Failed</h3>
              <p className="text-white/50 text-sm">Something went wrong. Please try again.</p>
              <button
                onClick={() => setStep(1)}
                className="mt-4 px-8 py-3 bg-white/10 rounded-xl text-white font-bold hover:bg-white/20 transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════
const TrainerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [likedReviews, setLikedReviews] = useState({});

  const tabs = ["overview", "services", "reviews", "achievements", "contact"];

  const calculateAverageRating = (arr) => {
    if (!arr || arr.length === 0) return 0;
    return (arr.reduce((a, r) => a + (r.rating || 0), 0) / arr.length).toFixed(1);
  };

  const fetchTrainerById = async () => {
    try {
      const res = await fetch(`https://fitzone-backend-ivyq.onrender.com/products/get-trainercard/${id}`, {
        headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch trainer");
      const data = await res.json();
      setTrainer(data);
      let rev = [];
      if (data.reviews && Array.isArray(data.reviews)) rev = data.reviews;
      else if (data.trainerReviewsList && Array.isArray(data.trainerReviewsList)) rev = data.trainerReviewsList;
      else if (data.trainerReviewName) rev = [{ name: data.trainerReviewName, text: data.trainerReviewText, rating: data.trainerRating || 5 }];
      setReviews(rev);
      if (rev.length > 0) {
        setTrainer((p) => ({ ...p, trainerRating: calculateAverageRating(rev), trainerReviews: rev.length }));
      }
    } catch (e) { handleError(e); }
  };

  useEffect(() => { if (id) fetchTrainerById(); }, [id]);

  const submitReview = async () => {
    if (!reviewName || !reviewText) return alert("Please fill all fields");
    try {
      const res = await fetch(`https://fitzone-backend-ivyq.onrender.com/products/trainers/${id}/reviews`, {
        method: "POST",
        headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
        body: JSON.stringify({ name: reviewName, text: reviewText, rating: reviewRating }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      const updated = [...reviews, { name: reviewName, text: reviewText, rating: reviewRating, createdAt: new Date().toISOString() }];
      setReviews(updated);
      setTrainer((p) => ({ ...p, trainerRating: calculateAverageRating(updated), trainerReviews: updated.length, reviews: updated }));
      setReviewName(""); setReviewText(""); setReviewRating(5); setIsWritingReview(false);
    } catch (e) { handleError(e); }
  };

  const openBooking = (service = null) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setBookingService(service);
    setBookingModal(true);
  };

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
    pct: reviews.length ? Math.round((reviews.filter((r) => Math.round(r.rating) === star).length / reviews.length) * 100) : 0,
  }));

  const tags = trainer?.trainerTags
    ? (Array.isArray(trainer.trainerTags) ? trainer.trainerTags : trainer.trainerTags.split(",")).map((t) => (typeof t === "string" ? t.trim() : t))
    : [];

  if (!trainer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white gap-4">
        <div className="w-12 h-12 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white/50">Loading trainer profile…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-700/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10">
        {/* ── Back Button ── */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <button
            onClick={() => navigate("/trainers")}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Trainers
          </button>
        </div>

        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section className="relative mt-4 overflow-hidden">
          {/* Cover Banner */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden">
            <img
              src={trainer.trainerCover || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80"}
              alt="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0a0a0a]" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-transparent" />
          </div>

          {/* Profile card overlaid on banner */}
          <div className="max-w-7xl mx-auto px-4 -mt-24 sm:-mt-28 pb-10">
            <FadeIn>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-end">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-br from-red-500 via-rose-400 to-orange-400 shadow-2xl shadow-red-500/40">
                    <img
                      src={trainer.trainerImage || "https://via.placeholder.com/160"}
                      alt={trainer.trainerName}
                      className="w-full h-full rounded-full object-cover border-4 border-[#0a0a0a]"
                    />
                  </div>
                  {/* online dot */}
                  <span className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-green-400 border-2 border-[#0a0a0a] shadow-lg shadow-green-400/50" />
                  {/* verified badge */}
                  <span className="absolute -top-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-none">
                      {trainer.trainerName}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold self-center sm:self-auto">
                      <CheckCircle className="w-3 h-3" /> Verified Pro
                    </span>
                  </div>
                  <p className="text-red-400 font-semibold text-lg mb-3">{trainer.trainerRole}</p>

                  {/* Quick meta */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-white/60 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-bold">{trainer.trainerRating}</span>
                      <span>({reviews.length} reviews)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-red-400" />
                      {trainer.trainerExperience} yrs exp
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-red-400" />
                      {trainer.trainerClientTrained || 0}+ clients
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-red-400" />
                      {trainer.trainerLocation}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                    {tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-medium backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                    <button
                      onClick={() => openBooking()}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all active:scale-95"
                    >
                      <Calendar className="w-4 h-4" /> Book Session
                    </button>
                    <button
                      onClick={() => setActiveTab("contact")}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-bold text-sm sm:text-base hover:bg-white/15 hover:-translate-y-0.5 transition-all backdrop-blur-sm"
                    >
                      <MessageCircle className="w-4 h-4" /> Message
                    </button>
                    {trainer.trainerPhone && (
                      <a
                        href={`tel:${trainer.trainerPhone}`}
                        className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price bubble */}
                <div className="hidden lg:flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-8 py-6 backdrop-blur-sm self-center">
                  <span className="text-white/40 text-xs uppercase tracking-widest mb-1">from</span>
                  <span className="text-4xl font-black text-white">${trainer.trainerPrice}</span>
                  <span className="text-white/40 text-xs">/ session</span>
                  <span className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${trainer.trainerStatus === "Available" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {trainer.trainerStatus || "Available"}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Stat Cards ── */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { icon: <Clock className="w-5 h-5 text-red-400" />, label: "Experience", value: trainer.trainerExperience, suffix: " yrs" },
                { icon: <Users className="w-5 h-5 text-rose-400" />, label: "Clients", value: trainer.trainerClientTrained || 0, suffix: "+" },
                { icon: <Award className="w-5 h-5 text-orange-400" />, label: "Certifications", value: 1, suffix: "" },
                { icon: <Star className="w-5 h-5 text-yellow-400" />, label: "Rating", value: parseFloat(trainer.trainerRating) * 20 || 0, suffix: "%" },
                { icon: <Zap className="w-5 h-5 text-purple-400" />, label: "Sessions", value: (trainer.trainerClientTrained || 0) * 12, suffix: "+" },
                { icon: <TrendingUp className="w-5 h-5 text-green-400" />, label: "Success Rate", value: 97, suffix: "%" },
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all">
                  <div className="mb-2">{s.icon}</div>
                  <div className="text-2xl font-black text-white">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ══════════════════════════════════════════════
            TABS
        ══════════════════════════════════════════════ */}
        <div className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-4 text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                    activeTab === tab ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-red-500 to-rose-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TAB CONTENT
        ══════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* main col */}
              <div className="lg:col-span-2 space-y-6">
                {/* About */}
                <FadeIn>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-black mb-4">About {trainer.trainerName}</h2>
                    <p className="text-white/60 leading-relaxed text-sm">
                      {trainer.trainerAbout || trainer.trainerDescription || "No bio provided."}
                    </p>
                  </div>
                </FadeIn>

                {/* Specializations */}
                <FadeIn delay={0.05}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-black mb-5">Specializations</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: <Flame className="w-5 h-5 text-red-400" />, label: "Weight Loss", pct: 95 },
                        { icon: <Dumbbell className="w-5 h-5 text-orange-400" />, label: "Muscle Building", pct: 90 },
                        { icon: <Shield className="w-5 h-5 text-yellow-400" />, label: "Strength Training", pct: 88 },
                        { icon: <Target className="w-5 h-5 text-green-400" />, label: "Functional Training", pct: 85 },
                        { icon: <Zap className="w-5 h-5 text-blue-400" />, label: "Sports Performance", pct: 80 },
                        { icon: <BarChart2 className="w-5 h-5 text-purple-400" />, label: "Body Composition", pct: 92 },
                      ].map((sp, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/3 rounded-xl p-3 border border-white/8">
                          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">{sp.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-semibold text-white">{sp.label}</span>
                              <span className="text-white/40">{sp.pct}%</span>
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full" style={{ width: `${sp.pct}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {/* Qualifications */}
                <FadeIn delay={0.1}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-black mb-5 flex items-center gap-2">
                      <Award className="w-5 h-5 text-red-400" /> Certifications & Qualifications
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
                        <Trophy className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm text-white">{trainer.trainerQualification || trainer.trainerCertifications || "Certified Personal Trainer"}</p>
                          <p className="text-xs text-white/40">Verified Credential</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <FadeIn delay={0.15}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm lg:sticky lg:top-24 space-y-5">
                    <h3 className="text-lg font-black">Quick Info</h3>

                    <div className="space-y-3">
                      {[
                        { label: "Location", val: trainer.trainerLocation || "N/A" },
                        { label: "Hourly Rate", val: `$${trainer.trainerPrice || "N/A"}` },
                        { label: "Availability", val: trainer.trainerStatus || "N/A", green: true },
                        { label: "Clients Trained", val: `${trainer.trainerClientTrained || 0}+` },
                        { label: "Rating", val: trainer.trainerRating, star: true },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                          <span className="text-white/50 text-sm">{row.label}</span>
                          {row.star ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold text-sm">{row.val}</span>
                              <span className="text-white/30 text-xs">({reviews.length})</span>
                            </div>
                          ) : (
                            <span className={`font-semibold text-sm ${row.green ? "text-green-400" : "text-white"}`}>{row.val}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-5 space-y-3">
                      <h4 className="font-bold text-sm">Ready to transform?</h4>
                      <p className="text-white/40 text-xs leading-relaxed">Take the first step towards your fitness goals today.</p>
                      <button
                        onClick={() => openBooking()}
                        className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all active:scale-95"
                      >
                        Schedule Consultation
                      </button>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          )}

          {/* ── SERVICES ── */}
          {activeTab === "services" && (
            <FadeIn>
              <h2 className="text-2xl font-black mb-6">Training Services</h2>
              {trainer.trainerService && trainer.trainerService.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {trainer.trainerService.map((svc, i) => (
                    <div
                      key={svc._id || i}
                      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="h-40 bg-gradient-to-br from-red-900/40 to-black flex items-center justify-center relative overflow-hidden">
                        <PlayCircle className="w-12 h-12 text-white/20 group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-black text-lg mb-1">{svc.name}</h3>
                        <p className="text-white/50 text-xs mb-4">{svc.description || "Premium training session"}</p>
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <span className="text-2xl font-black text-red-400">${svc.price}</span>
                            <span className="text-white/40 text-xs ml-1">/ session</span>
                          </div>
                          <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-white/60">{svc.duration}</span>
                        </div>
                        <button
                          onClick={() => openBooking(svc)}
                          className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/40 transition-all active:scale-95"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-white/30">
                  <Dumbbell className="w-12 h-12 mb-4" />
                  <p>No services listed yet.</p>
                </div>
              )}
            </FadeIn>
          )}

          {/* ── REVIEWS ── */}
          {activeTab === "reviews" && (
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm lg:sticky lg:top-24">
                    <h3 className="font-black text-lg mb-4">Rating Summary</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-black text-white">{trainer.trainerRating || 0}</span>
                      <div>
                        <div className="flex gap-0.5 mb-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-4 h-4 ${s <= Math.round(trainer.trainerRating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                          ))}
                        </div>
                        <p className="text-white/40 text-xs">{reviews.length} reviews</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {ratingBreakdown.map(({ star, count, pct }) => (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="text-white/40 w-3">{star}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-white/30 w-4 text-right">{count}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsWritingReview(!isWritingReview)}
                      className="w-full mt-6 py-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/40 transition-all"
                    >
                      {isWritingReview ? "Cancel" : "Write a Review"}
                    </button>
                  </div>
                </div>

                {/* Reviews list + form */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Write Review Form */}
                  {isWritingReview && (
                    <div className="bg-white/5 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                      <h3 className="font-black text-lg">Write Your Review</h3>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/60 transition-colors"
                      />
                      <textarea
                        rows={3}
                        placeholder="Share your experience…"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/60 transition-colors resize-none"
                      />
                      <div>
                        <p className="text-white/50 text-xs mb-2">Your Rating</p>
                        <StarPicker value={reviewRating} onChange={setReviewRating} />
                      </div>
                      <button
                        onClick={submitReview}
                        disabled={!reviewName || !reviewText}
                        className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}

                  {reviews.length === 0 && !isWritingReview && (
                    <div className="flex flex-col items-center justify-center py-20 text-white/30 bg-white/3 border border-white/8 rounded-2xl">
                      <Star className="w-10 h-10 mb-3" />
                      <p className="font-semibold">No reviews yet. Be the first!</p>
                    </div>
                  )}

                  {reviews.map((rev, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-white/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-rose-400 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                          {rev.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-bold text-sm">{rev.name}</span>
                            {rev.createdAt && (
                              <span className="text-white/30 text-xs">{new Date(rev.createdAt).toLocaleDateString()}</span>
                            )}
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3.5 h-3.5 ${s <= (rev.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                            ))}
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed">{rev.text}</p>
                          <button
                            onClick={() => setLikedReviews((p) => ({ ...p, [i]: !p[i] }))}
                            className={`mt-3 flex items-center gap-1.5 text-xs transition-colors ${likedReviews[i] ? "text-red-400" : "text-white/30 hover:text-white/50"}`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* ── ACHIEVEMENTS ── */}
          {activeTab === "achievements" && (
            <FadeIn>
              <h2 className="text-2xl font-black mb-6">Achievements & Awards</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { icon: <Trophy className="w-8 h-8 text-yellow-400" />, title: "Top Trainer 2024", desc: "Ranked among top 1% trainers on the platform", color: "from-yellow-500/10 to-orange-500/10", border: "border-yellow-500/20" },
                  { icon: <Star className="w-8 h-8 text-blue-400" />, title: "5-Star Excellence", desc: "Maintained a 5-star rating for over 100+ sessions", color: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20" },
                  { icon: <Users className="w-8 h-8 text-green-400" />, title: "Client Champion", desc: `Successfully transformed ${trainer.trainerClientTrained || 0}+ clients`, color: "from-green-500/10 to-emerald-500/10", border: "border-green-500/20" },
                  { icon: <Shield className="w-8 h-8 text-purple-400" />, title: "Certified Professional", desc: trainer.trainerQualification || "Internationally certified trainer", color: "from-purple-500/10 to-violet-500/10", border: "border-purple-500/20" },
                  { icon: <Zap className="w-8 h-8 text-red-400" />, title: "Performance Expert", desc: "Specializes in high-performance athlete training", color: "from-red-500/10 to-rose-500/10", border: "border-red-500/20" },
                  { icon: <Heart className="w-8 h-8 text-pink-400" />, title: "Wellness Advocate", desc: "Champion of holistic health and well-being", color: "from-pink-500/10 to-rose-500/10", border: "border-pink-500/20" },
                ].map((a, i) => (
                  <div key={i} className={`bg-gradient-to-br ${a.color} border ${a.border} rounded-2xl p-6 hover:-translate-y-1 transition-all backdrop-blur-sm`}>
                    <div className="mb-3">{a.icon}</div>
                    <h3 className="font-black text-base mb-1">{a.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* ── CONTACT ── */}
          {activeTab === "contact" && (
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-5">
                  <h2 className="text-xl font-black">Contact Information</h2>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-red-400" />
                      </div>
                      {trainer.trainerLocation}
                    </li>
                    <li className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-red-400" />
                      </div>
                      {trainer.trainerEmail}
                    </li>
                    <li className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-red-400" />
                      </div>
                      {trainer.trainerPhone}
                    </li>
                  </ul>

                  <div className="border-t border-white/10 pt-5">
                    <p className="text-sm font-semibold mb-3">Follow {trainer.trainerName}</p>
                    <div className="flex gap-3">
                      {[
                        { icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                        { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                        { icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
                      ].map((s) => (
                        <button key={s.label} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-medium">
                          {s.icon} {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openBooking()}
                    className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/40 transition-all"
                  >
                    Book a Session
                  </button>
                </div>

                {/* Contact Form */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <Contact />
                </div>
              </div>
            </FadeIn>
          )}
        </div>

        {/* ── Sticky bottom CTA (mobile) ── */}
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex gap-3">
          <button
            onClick={() => setActiveTab("contact")}
            className="flex-1 py-3 bg-white/10 border border-white/20 rounded-xl font-bold text-sm"
          >
            Message
          </button>
          <button
            onClick={() => openBooking()}
            className="flex-1 py-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/30 transition-all"
          >
            Book Session
          </button>
        </div>
        <div className="h-20 lg:h-0" />
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <BookingModal
          trainer={trainer}
          selectedService={bookingService}
          onClose={() => { setBookingModal(false); setBookingService(null); }}
        />
      )}
    </div>
  );
};

export default TrainerProfile;