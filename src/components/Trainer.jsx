import React, { useState, useEffect } from "react";
import { Star, Award, DollarSign, Search } from "lucide-react";
import { handleError } from "../util";
import { useNavigate } from "react-router-dom";

const Trainer = () => {
  const [trainerCard, setTrainerCard] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const navigate = useNavigate();

  // Function to calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  };

  const fetchTrainers = async () => {
    try {
      const url = "http://localhost:8080/products/get-trainercard";
      // const url = "https://gym-project-backend.vercel.app/products/get-trainercard";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trainers");
      }

      const result = await response.json();
      
      // Process each trainer to update rating based on reviews
      const processedTrainers = result.map(trainer => {
        let updatedRating = trainer.trainerRating;
        let reviewCount = trainer.trainerReviews || 0;

        // Check if trainer has reviews and calculate updated rating
        if (trainer.reviews && Array.isArray(trainer.reviews) && trainer.reviews.length > 0) {
          updatedRating = calculateAverageRating(trainer.reviews);
          reviewCount = trainer.reviews.length;
        } else if (trainer.trainerReviewsList && Array.isArray(trainer.trainerReviewsList) && trainer.trainerReviewsList.length > 0) {
          updatedRating = calculateAverageRating(trainer.trainerReviewsList);
          reviewCount = trainer.trainerReviewsList.length;
        }

        return {
          ...trainer,
          trainerRating: updatedRating,
          trainerReviews: reviewCount
        };
      });

      setTrainerCard(processedTrainers);
    } catch (error) {
      handleError(error);
    }
  };

  // Function to refresh trainer data (can be called after reviews are updated)
  const refreshTrainerData = () => {
    fetchTrainers();
  };

  useEffect(() => {
    fetchTrainers();

    // Set up periodic refresh to catch rating updates
    const interval = setInterval(refreshTrainerData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const gotoProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  // Extract unique filter options with updated data
  const specializations = [
    ...new Set(trainerCard.flatMap((t) => {
      if (Array.isArray(t.trainerTags)) {
        return t.trainerTags;
      } else if (typeof t.trainerTags === 'string') {
        return t.trainerTags.split(',').map(tag => tag.trim());
      }
      return [];
    })),
  ];
  
  const experiences = [
    ...new Set(trainerCard.map((t) => t.trainerExperience || 0)),
  ].sort((a, b) => b - a);
  
  const ratings = [
    ...new Set(trainerCard.map((t) => Math.floor(parseFloat(t.trainerRating) || 0))),
  ].sort((a, b) => b - a);

  // Filtering logic
  const filteredTrainers = trainerCard.filter((trainer) => {
    const matchesSearch =
      trainer.trainerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.trainerRole.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialization = !selectedSpecialization || (() => {
      if (Array.isArray(trainer.trainerTags)) {
        return trainer.trainerTags.includes(selectedSpecialization);
      } else if (typeof trainer.trainerTags === 'string') {
        return trainer.trainerTags.split(',').map(tag => tag.trim()).includes(selectedSpecialization);
      }
      return false;
    })();

    const matchesExperience =
      !selectedExperience ||
      String(trainer.trainerExperience) === selectedExperience;

    const matchesAvailability =
      !selectedAvailability ||
      trainer.trainerStatus === selectedAvailability;

    const matchesRating =
      !selectedRating ||
      Math.floor(parseFloat(trainer.trainerRating) || 0) >= parseInt(selectedRating);

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesExperience &&
      matchesAvailability &&
      matchesRating
    );
  });

  return (
    <div className="w-full flex flex-col items-center gap-6 p-6">
      {/* Hero Section */}
      <section className="w-full bg-white py-6">
        <div className="w-full flex justify-center items-center">
          <div className="flex w-[90%] flex-col gap-2 shadow-md bg-white p-4 rounded-md">
            <span className="font-sans font-bold text-[25px]">
              Unlock Your Perfect Training Partner
            </span>
            <span>
              Team up with certified trainers to reach your fitness goals
            </span>
          </div>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="flex w-[90%] flex-col gap-6 shadow-md bg-white p-4 rounded-md">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search trainers by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Specialization */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Specialization
            </label>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Specializations</option>
              {specializations.map((tag, i) => (
                <option key={i} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Experience
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Experience Levels</option>
              {experiences.map((exp, i) => (
                <option key={i} value={String(exp)}>
                  {exp} years
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Availability
            </label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Availability</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Limited</option>
            </select>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Rating</label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Ratings</option>
              {ratings.map((r, i) => (
                <option key={i} value={String(r)}>
                  {r}+ ★
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results + Reset */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{filteredTrainers.length} trainers found</span>
          <div className="flex gap-3">
           
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialization("");
                setSelectedExperience("");
                setSelectedAvailability("");
                setSelectedRating("");
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Trainer Cards */}
      {filteredTrainers.length === 0 ? (
        <div className="w-[90%] shadow-md bg-white p-8 rounded-md text-center">
          <p className="text-gray-500 text-lg">No trainers found matching your criteria.</p>
        </div>
      ) : (
        <div className="w-[90%] shadow-md bg-white p-6 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.map((trainer, index) => (
              <div
                key={trainer._id || index}
                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-100"
              >
                {/* Trainer Image + Status */}
                <div className="relative h-48 w-full">
                  <img
                    src={trainer.trainerImage || "https://via.placeholder.com/300x200?text=Trainer+Image"}
                    alt={trainer.trainerName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=Trainer+Image";
                    }}
                  />
                  <span
                    className={`absolute top-2 right-2 ${
                      trainer.trainerStatus === "Available"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg`}
                  >
                    {trainer.trainerStatus}
                  </span>
                </div>

                {/* Info Section */}
                <div className="p-4 flex flex-col gap-2 flex-grow">
                  <div className="flex justify-between items-start">
                    <h2 className="font-bold text-lg text-gray-800 line-clamp-1">
                      {trainer.trainerName}
                    </h2>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm flex-shrink-0 ml-2">
                      <Star className="w-4 h-4 fill-yellow-500" />
                      <span className="font-semibold">{trainer.trainerRating}</span>
                      <span className="text-gray-500 text-xs">
                        ({trainer.trainerReviews || 0})
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{trainer.trainerRole}</p>
                  <p className="text-gray-500 text-sm">
                    {trainer.trainerExperience} years experience
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(() => {
                      let tags = [];
                      if (Array.isArray(trainer.trainerTags)) {
                        tags = trainer.trainerTags.slice(0, 3);
                      } else if (typeof trainer.trainerTags === 'string') {
                        tags = trainer.trainerTags.split(',').map(tag => tag.trim()).slice(0, 3);
                      }
                      return tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ));
                    })()}
                    {(() => {
                      let totalTags = 0;
                      if (Array.isArray(trainer.trainerTags)) {
                        totalTags = trainer.trainerTags.length;
                      } else if (typeof trainer.trainerTags === 'string') {
                        totalTags = trainer.trainerTags.split(',').length;
                      }
                      return totalTags > 3 && (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          +{totalTags - 3}
                        </span>
                      );
                    })()}
                  </div>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {trainer.trainerDescription}
                  </p>

                  {/* Certifications & Price */}
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-gray-500" />
                      <span>{trainer.trainerCertifications || 0} Certs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold">${trainer.trainerPrice}/hr</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 p-4 pt-0">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm">
                    Book Session
                  </button>
                  <button
                    onClick={() => gotoProfile(trainer._id)}
                    className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition text-sm"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainer;

















// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Star, Award, Calendar, MapPin, Phone, Mail, Instagram, Facebook, Twitter, ChevronLeft, ChevronRight, Clock, DollarSign, Users } from 'lucide-react';

// // Sample trainer data
// const sampleTrainers = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     title: "Certified Personal Trainer",
//     experience: 8,
//     rating: 4.9,
//     reviews: 156,
//     photo: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=face",
//     specializations: ["Weight Loss", "Strength Training", "HIIT"],
//     bio: "Passionate about helping clients achieve their fitness goals through personalized training programs. Specializes in functional movement and sustainable lifestyle changes.",
//     certifications: ["NASM-CPT", "Nutrition Coach", "TRX Certified"],
//     location: "Downtown Gym",
//     availability: "Available",
//     hourlyRate: 75,
//     clients: 45,
//     testimonials: [
//       { name: "Mike Chen", rating: 5, text: "Sarah transformed my entire approach to fitness. Lost 30 pounds in 4 months!" },
//       { name: "Emily Davis", rating: 5, text: "Professional, knowledgeable, and motivating. Highly recommend!" }
//     ],
//     socialMedia: {
//       instagram: "@sarahfit",
//       facebook: "sarahjohnsonfitness",
//       twitter: "@sarahtrains"
//     },
//     services: [
//       { name: "1-on-1 Personal Training", price: 75, duration: "60 min" },
//       { name: "Small Group Training", price: 45, duration: "45 min" },
//       { name: "Nutrition Consultation", price: 50, duration: "30 min" }
//     ]
//   },
//   {
//     id: 2,
//     name: "Marcus Rodriguez",
//     title: "Strength & Conditioning Coach",
//     experience: 12,
//     rating: 4.8,
//     reviews: 203,
//     photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face",
//     specializations: ["Powerlifting", "Athletic Performance", "Injury Prevention"],
//     bio: "Former collegiate athlete turned coach. Helps athletes and fitness enthusiasts build strength safely and effectively with proven training methodologies.",
//     certifications: ["CSCS", "USAW Level 2", "FMS Certified"],
//     location: "Iron House Gym",
//     availability: "Limited",
//     hourlyRate: 95,
//     clients: 67,
//     testimonials: [
//       { name: "Jake Wilson", rating: 5, text: "Increased my deadlift by 100lbs in 6 months. Marcus knows his stuff!" },
//       { name: "Lisa Park", rating: 4, text: "Great technique coaching. Helped me lift safely and confidently." }
//     ],
//     services: [
//       { name: "Strength Training", price: 95, duration: "75 min" },
//       { name: "Athletic Performance", price: 85, duration: "60 min" },
//       { name: "Movement Assessment", price: 60, duration: "45 min" }
//     ]
//   },
//   {
//     id: 3,
//     name: "Emma Thompson",
//     title: "Yoga & Wellness Instructor",
//     experience: 6,
//     rating: 4.9,
//     reviews: 189,
//     photo: "https://images.unsplash.com/photo-1506629905880-b2ce82d8dd35?w=400&h=400&fit=crop&crop=face",
//     specializations: ["Yoga", "Meditation", "Flexibility"],
//     bio: "Dedicated to promoting holistic wellness through mindful movement and breath work. Creates inclusive spaces for practitioners of all levels.",
//     certifications: ["RYT-500", "Yin Certified", "Meditation Teacher"],
//     location: "Zen Studio",
//     availability: "Available",
//     hourlyRate: 65,
//     clients: 78,
//     testimonials: [
//       { name: "Amanda Lee", rating: 5, text: "Emma's classes are transformative. My flexibility and mental clarity have improved so much." },
//       { name: "David Kim", rating: 5, text: "Perfect for beginners. Emma creates such a welcoming environment." }
//     ],
//     services: [
//       { name: "Private Yoga Session", price: 65, duration: "60 min" },
//       { name: "Meditation Coaching", price: 55, duration: "45 min" },
//       { name: "Flexibility Assessment", price: 40, duration: "30 min" }
//     ]
//   },
//   {
//     id: 4,
//     name: "Alex Chen",
//     title: "CrossFit Coach",
//     experience: 5,
//     rating: 4.7,
//     reviews: 142,
//     photo: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=400&fit=crop&crop=face",
//     specializations: ["CrossFit", "Olympic Lifting", "Metabolic Training"],
//     bio: "High-energy coach who brings competitive spirit and technical expertise to every session. Specializes in Olympic lifting and functional fitness.",
//     certifications: ["CF-L2", "USAW Sports Performance", "CPR/AED"],
//     location: "CrossFit Downtown",
//     availability: "Available",
//     hourlyRate: 80,
//     clients: 52,
//     testimonials: [
//       { name: "Rachel Green", rating: 5, text: "Alex pushed me to achieve things I never thought possible. Amazing coach!" },
//       { name: "Tom Brady", rating: 4, text: "Great technique instruction and programming. Saw results quickly." }
//     ],
//     services: [
//       { name: "CrossFit Personal Training", price: 80, duration: "60 min" },
//       { name: "Olympic Lifting", price: 90, duration: "75 min" },
//       { name: "Competition Prep", price: 100, duration: "90 min" }
//     ]
//   },
//   {
//     id: 5,
//     name: "Isabella Martinez",
//     title: "Nutrition & Fitness Coach",
//     experience: 10,
//     rating: 4.8,
//     reviews: 267,
//     photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
//     specializations: ["Nutrition", "Weight Management", "Lifestyle Coaching"],
//     bio: "Combines fitness training with nutritional guidance to help clients achieve lasting transformation. Believes in sustainable, science-based approaches.",
//     certifications: ["RD", "NASM-CPT", "Precision Nutrition L1"],
//     location: "Wellness Center",
//     availability: "Available",
//     hourlyRate: 85,
//     clients: 89,
//     testimonials: [
//       { name: "Maria Santos", rating: 5, text: "Isabella helped me develop a healthy relationship with food and exercise. Life-changing!" },
//       { name: "John Smith", rating: 5, text: "Lost 45 pounds and kept it off for 2 years. Her approach really works." }
//     ],
//     services: [
//       { name: "Nutrition + Training", price: 85, duration: "75 min" },
//       { name: "Meal Planning Consultation", price: 70, duration: "60 min" },
//       { name: "Body Composition Analysis", price: 50, duration: "30 min" }
//     ]
//   },
//   {
//     id: 6,
//     name: "Ryan Foster",
//     title: "Rehabilitation Specialist",
//     experience: 9,
//     rating: 4.9,
//     reviews: 198,
//     photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
//     specializations: ["Injury Rehab", "Corrective Exercise", "Senior Fitness"],
//     bio: "Specializes in helping clients recover from injuries and return to peak performance. Expert in movement analysis and corrective exercise programming.",
//     certifications: ["NASM-CES", "PRI Certified", "SFMA Level 2"],
//     location: "Rehab Fitness Center",
//     availability: "Limited",
//     hourlyRate: 90,
//     clients: 43,
//     testimonials: [
//       { name: "Carol Johnson", rating: 5, text: "Ryan helped me get back to running after my knee surgery. Incredible knowledge!" },
//       { name: "Steve Miller", rating: 5, text: "Fixed my back pain issues that I'd had for years. Highly recommend!" }
//     ],
//     services: [
//       { name: "Injury Rehabilitation", price: 90, duration: "60 min" },
//       { name: "Movement Assessment", price: 75, duration: "45 min" },
//       { name: "Corrective Exercise", price: 80, duration: "60 min" }
//     ]
//   }
// ];

// const TrainerCard = ({ trainer, onClick }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div 
//       className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform ${
//         isHovered ? 'scale-105' : ''
//       } cursor-pointer overflow-hidden`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={() => onClick(trainer)}
//     >
//       <div className="relative">
//         <img 
//           src={trainer.photo} 
//           alt={trainer.name}
//           className="w-full h-48 object-cover"
//         />
//         <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
//           {trainer.availability === 'Available' ? (
//             <span className="text-green-600">Available</span>
//           ) : (
//             <span className="text-orange-600">Limited</span>
//           )}
//         </div>
//       </div>
      
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-xl font-bold text-gray-900">{trainer.name}</h3>
//           <div className="flex items-center text-yellow-500">
//             <Star className="w-4 h-4 fill-current" />
//             <span className="ml-1 text-sm font-medium text-gray-700">{trainer.rating}</span>
//             <span className="ml-1 text-sm text-gray-500">({trainer.reviews})</span>
//           </div>
//         </div>
        
//         <p className="text-gray-600 text-sm mb-2">{trainer.title}</p>
//         <p className="text-gray-500 text-sm mb-4">{trainer.experience} years experience</p>
        
//         <div className="flex flex-wrap gap-1 mb-4">
//           {trainer.specializations.map((spec, index) => (
//             <span 
//               key={index}
//               className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
//             >
//               {spec}
//             </span>
//           ))}
//         </div>
        
//         <p className="text-gray-600 text-sm mb-4 line-clamp-3">{trainer.bio}</p>
        
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center text-gray-500 text-sm">
//             <Award className="w-4 h-4 mr-1" />
//             {trainer.certifications.length} Certifications
//           </div>
//           <div className="flex items-center text-gray-500 text-sm">
//             <DollarSign className="w-4 h-4 mr-1" />
//             ${trainer.hourlyRate}/hr
//           </div>
//         </div>
        
//         <div className="flex space-x-3">
//           <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
//             Book Session
//           </button>
//           <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//             View Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TrainerProfile = ({ trainer, onBack }) => {
//   const [activeTab, setActiveTab] = useState('overview');

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <button 
//             onClick={onBack}
//             className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
//           >
//             <ChevronLeft className="w-5 h-5 mr-1" />
//             Back to Trainers
//           </button>
//         </div>
//       </div>

//       {/* Profile Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//         <div className="max-w-6xl mx-auto px-4 py-12">
//           <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
//             <img 
//               src={trainer.photo} 
//               alt={trainer.name}
//               className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
//             />
            
//             <div className="text-center md:text-left flex-1">
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">{trainer.name}</h1>
//               <p className="text-xl mb-2 opacity-90">{trainer.title}</p>
              
//               <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6 mb-4">
//                 <div className="flex items-center">
//                   <Star className="w-5 h-5 fill-current text-yellow-400 mr-1" />
//                   <span className="font-semibold">{trainer.rating}</span>
//                   <span className="ml-1 opacity-75">({trainer.reviews} reviews)</span>
//                 </div>
//                 <div className="flex items-center opacity-90">
//                   <Clock className="w-4 h-4 mr-1" />
//                   {trainer.experience} years experience
//                 </div>
//                 <div className="flex items-center opacity-90">
//                   <Users className="w-4 h-4 mr-1" />
//                   {trainer.clients}+ clients trained
//                 </div>
//               </div>
              
//               <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
//                 {trainer.specializations.map((spec, index) => (
//                   <span 
//                     key={index}
//                     className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium"
//                   >
//                     {spec}
//                   </span>
//                 ))}
//               </div>
              
//               <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
//                 <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//                   Book Session Now
//                 </button>
//                 <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
//                   Message Trainer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex space-x-8 overflow-x-auto">
//             {['overview', 'services', 'reviews', 'contact'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-4 px-2 border-b-2 font-medium capitalize transition-colors whitespace-nowrap ${
//                   activeTab === tab 
//                     ? 'border-blue-600 text-blue-600' 
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {activeTab === 'overview' && (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//                 <h2 className="text-2xl font-bold mb-4">About {trainer.name}</h2>
//                 <p className="text-gray-600 mb-6 leading-relaxed">
//                   {trainer.bio} With {trainer.experience} years of experience, {trainer.name.split(' ')[0]} has developed a comprehensive approach to fitness that combines proven methodologies with personalized attention to help clients achieve their goals safely and effectively.
//                 </p>
                
//                 <h3 className="text-xl font-semibold mb-4">Certifications & Qualifications</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {trainer.certifications.map((cert, index) => (
//                     <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
//                       <Award className="w-4 h-4 mr-2" />
//                       {cert}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h3 className="text-xl font-semibold mb-4">Client Testimonials</h3>
//                 <div className="space-y-4">
//                   {trainer.testimonials.map((testimonial, index) => (
//                     <div key={index} className="border-l-4 border-blue-600 pl-4">
//                       <div className="flex items-center mb-2">
//                         <div className="flex text-yellow-400 mr-2">
//                           {[...Array(testimonial.rating)].map((_, i) => (
//                             <Star key={i} className="w-4 h-4 fill-current" />
//                           ))}
//                         </div>
//                         <span className="font-medium text-gray-900">{testimonial.name}</span>
//                       </div>
//                       <p className="text-gray-600 italic">"{testimonial.text}"</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//                 <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Location</span>
//                     <span className="font-medium">{trainer.location}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Hourly Rate</span>
//                     <span className="font-medium">${trainer.hourlyRate}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Availability</span>
//                     <span className={`font-medium ${trainer.availability === 'Available' ? 'text-green-600' : 'text-orange-600'}`}>
//                       {trainer.availability}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Clients Trained</span>
//                     <span className="font-medium">{trainer.clients}+</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-blue-50 rounded-xl p-6">
//                 <h3 className="text-xl font-semibold mb-4 text-blue-900">Ready to Start?</h3>
//                 <p className="text-blue-700 mb-4">Book your first session with {trainer.name.split(' ')[0]} today and take the first step towards your fitness goals.</p>
//                 <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//                   Schedule Consultation
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'services' && (
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-2xl font-bold mb-6">Training Services</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {trainer.services.map((service, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//                   <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-2xl font-bold text-blue-600">${service.price}</span>
//                     <span className="text-gray-500">{service.duration}</span>
//                   </div>
//                   <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
//                     Book This Service
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'reviews' && (
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold">Client Reviews</h2>
//               <div className="flex items-center">
//                 <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
//                 <span className="text-2xl font-bold">{trainer.rating}</span>
//                 <span className="text-gray-500 ml-2">({trainer.reviews} reviews)</span>
//               </div>
//             </div>
            
//             <div className="space-y-6">
//               {trainer.testimonials.map((review, index) => (
//                 <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
//                   <div className="flex items-center mb-3">
//                     <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
//                       {review.name.split(' ').map(n => n[0]).join('')}
//                     </div>
//                     <div>
//                       <div className="font-semibold">{review.name}</div>
//                       <div className="flex text-yellow-400">
//                         {[...Array(review.rating)].map((_, i) => (
//                           <Star key={i} className="w-4 h-4 fill-current" />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 ml-13">"{review.text}"</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'contact' && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <MapPin className="w-5 h-5 text-blue-600 mr-3" />
//                   <span>{trainer.location}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Mail className="w-5 h-5 text-blue-600 mr-3" />
//                   <span>{trainer.name.toLowerCase().replace(' ', '.')}@email.com</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Phone className="w-5 h-5 text-blue-600 mr-3" />
//                   <span>(555) 123-4567</span>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-4">Follow {trainer.name.split(' ')[0]}</h3>
//                 <div className="flex space-x-4">
//                   {trainer.socialMedia?.instagram && (
//                     <a href="#" className="text-blue-600 hover:text-blue-700">
//                       <Instagram className="w-6 h-6" />
//                     </a>
//                   )}
//                   {trainer.socialMedia?.facebook && (
//                     <a href="#" className="text-blue-600 hover:text-blue-700">
//                       <Facebook className="w-6 h-6" />
//                     </a>
//                   )}
//                   {trainer.socialMedia?.twitter && (
//                     <a href="#" className="text-blue-600 hover:text-blue-700">
//                       <Twitter className="w-6 h-6" />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                   <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                   <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                   <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
//                 </div>
//                 <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const TrainerDirectory = () => {
//   const [trainers, setTrainers] = useState(sampleTrainers);
//   const [filteredTrainers, setFilteredTrainers] = useState(sampleTrainers);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSpecialization, setSelectedSpecialization] = useState('');
//   const [selectedExperience, setSelectedExperience] = useState('');
//   const [selectedAvailability, setSelectedAvailability] = useState('');
//   const [selectedRating, setSelectedRating] = useState('');
//   const [sortBy, setSortBy] = useState('rating');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTrainer, setSelectedTrainer] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const trainersPerPage = 6;

//   const specializations = [...new Set(trainers.flatMap(t => t.specializations))];
//   const experienceLevels = ['0-2 years', '3-5 years', '6-10 years', '10+ years'];

//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       let filtered = trainers.filter(trainer => {
//         const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                              trainer.title.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesSpecialization = !selectedSpecialization || 
//                                      trainer.specializations.includes(selectedSpecialization);
//         const matchesExperience = !selectedExperience || 
//                                  (selectedExperience === '0-2 years' && trainer.experience <= 2) ||
//                                  (selectedExperience === '3-5 years' && trainer.experience >= 3 && trainer.experience <= 5) ||
//                                  (selectedExperience === '6-10 years' && trainer.experience >= 6 && trainer.experience <= 10) ||
//                                  (selectedExperience === '10+ years' && trainer.experience > 10);
//         const matchesAvailability = !selectedAvailability || trainer.availability === selectedAvailability;
//         const matchesRating = !selectedRating || trainer.rating >= parseFloat(selectedRating);
        
//         return matchesSearch && matchesSpecialization && matchesExperience && 
//                matchesAvailability && matchesRating;
//       });

//       // Sort filtered results
//       filtered.sort((a, b) => {
//         switch (sortBy) {
//           case 'rating':
//             return b.rating - a.rating;
//           case 'experience':
//             return b.experience - a.experience;
//           case 'name':
//             return a.name.localeCompare(b.name);
//           default:
//             return 0;
//         }
//       });

//       setFilteredTrainers(filtered);
//       setCurrentPage(1);
//       setIsLoading(false);
//     }, 500);
//   }, [trainers, searchTerm, selectedSpecialization, selectedExperience, selectedAvailability, selectedRating, sortBy]);

//   const handleTrainerClick = (trainer) => {
//     setSelectedTrainer(trainer);
//   };

//   const handleBackToDirectory = () => {
//     setSelectedTrainer(null);
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedSpecialization('');
//     setSelectedExperience('');
//     setSelectedAvailability('');
//     setSelectedRating('');
//     setSortBy('rating');
//   };

//   // Pagination
//   const indexOfLastTrainer = currentPage * trainersPerPage;
//   const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
//   const currentTrainers = filteredTrainers.slice(indexOfFirstTrainer, indexOfLastTrainer);
//   const totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);

//   if (selectedTrainer) {
//     return <TrainerProfile trainer={selectedTrainer} onBack={handleBackToDirectory} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Trainer</h1>
//           <p className="text-gray-600">Connect with certified fitness professionals to achieve your goals</p>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search trainers by name or title..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             />
//           </div>

//           {/* Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
//               <select
//                 value={selectedSpecialization}
//                 onChange={(e) => setSelectedSpecialization(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               >
//                 <option value="">All Specializations</option>
//                 {specializations.map(spec => (
//                   <option key={spec} value={spec}>{spec}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
//               <select
//                 value={selectedExperience}
//                 onChange={(e) => setSelectedExperience(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               >
//                 <option value="">All Experience Levels</option>
//                 {experienceLevels.map(level => (
//                   <option key={level} value={level}>{level}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
//               <select
//                 value={selectedAvailability}
//                 onChange={(e) => setSelectedAvailability(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               >
//                 <option value="">All Availability</option>
//                 <option value="Available">Available</option>
//                 <option value="Limited">Limited</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
//               <select
//                 value={selectedRating}
//                 onChange={(e) => setSelectedRating(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               >
//                 <option value="">Any Rating</option>
//                 <option value="4.5">4.5+ Stars</option>
//                 <option value="4.0">4.0+ Stars</option>
//                 <option value="3.5">3.5+ Stars</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               >
//                 <option value="rating">Highest Rated</option>
//                 <option value="experience">Most Experience</option>
//                 <option value="name">Name (A-Z)</option>
//               </select>
//             </div>
//           </div>

//           {/* Filter Actions */}
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-600">
//               {filteredTrainers.length} trainer{filteredTrainers.length !== 1 ? 's' : ''} found
//             </p>
//             <button
//               onClick={clearFilters}
//               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         )}

//         {/* Trainers Grid */}
//         {!isLoading && (
//           <>
//             {currentTrainers.length === 0 ? (
//               <div className="bg-white rounded-xl shadow-sm p-12 text-center">
//                 <div className="text-gray-400 mb-4">
//                   <Filter className="w-16 h-16 mx-auto" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No trainers found</h3>
//                 <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
//                 <button
//                   onClick={clearFilters}
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {currentTrainers.map(trainer => (
//                   <TrainerCard
//                     key={trainer.id}
//                     trainer={trainer}
//                     onClick={handleTrainerClick}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
                
//                 {[...Array(totalPages)].map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`px-4 py-2 rounded-lg ${
//                       currentPage === index + 1
//                         ? 'bg-blue-600 text-white'
//                         : 'border border-gray-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
                
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrainerDirectory