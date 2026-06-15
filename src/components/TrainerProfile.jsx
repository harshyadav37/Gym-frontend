import React, { useEffect, useState } from "react";
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
} from "lucide-react";

const TrainerProfile = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // default tab
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviews, setReviews] = useState([]); // list of reviews
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Function to calculate average rating
  const calculateAverageRating = (reviewsArray) => {
    if (!reviewsArray || reviewsArray.length === 0) return 0;
    const sum = reviewsArray.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviewsArray.length).toFixed(1);
  };

  // Fetch trainer by ID
  const fetchTrainerById = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/get-trainercard/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch trainer details");

      const data = await response.json();
      setTrainer(data);

      // Set reviews from different possible sources
      let reviewsData = [];
      if (data.reviews && Array.isArray(data.reviews)) {
        reviewsData = data.reviews;
      } else if (data.trainerReviewsList && Array.isArray(data.trainerReviewsList)) {
        reviewsData = data.trainerReviewsList;
      } else if (data.trainerReviewName && data.trainerReviewText) {
        reviewsData = [{
          name: data.trainerReviewName,
          text: data.trainerReviewText,
          rating: data.trainerRating || 5
        }];
      }
      
      setReviews(reviewsData);
      
      // Update trainer rating based on reviews if reviews exist
      if (reviewsData.length > 0) {
        const avgRating = calculateAverageRating(reviewsData);
        setTrainer(prev => ({
          ...prev,
          trainerRating: avgRating,
          trainerReviews: reviewsData.length
        }));
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTrainerById();
    }
  }, [id]);

  const submitReview = async () => {
    if (!reviewName || !reviewText) return alert("Please fill all fields");

    try {
      const response = await fetch(
        `http://localhost:8080/products/trainers/${id}/reviews`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: reviewName,
            text: reviewText,
            rating: reviewRating,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit review");

      // Create new review object
      const newReview = {
        name: reviewName,
        text: reviewText,
        rating: reviewRating,
        createdAt: new Date().toISOString()
      };

      // Update local reviews state
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);

      // Calculate new average rating
      const newAvgRating = calculateAverageRating(updatedReviews);
      
      // Update trainer state with new rating and review count
      setTrainer(prev => ({
        ...prev,
        trainerRating: newAvgRating,
        trainerReviews: updatedReviews.length,
        reviews: updatedReviews
      }));

      // Reset form
      setReviewName("");
      setReviewText("");
      setReviewRating(5);
      setIsWritingReview(false);
      
      alert("Review submitted successfully!");
      
    } catch (error) {
      handleError(error);
      alert("Failed to submit review. Please try again.");
    }
  };

  if (!trainer) {
    return <p className="flex justify-center items-center min-h-screen text-lg">Loading trainer profile...</p>;
  }

  return (
    <section className="w-full flex flex-col bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div className="w-full max-w-5xl mx-auto px-4 py-4">
        <button
          onClick={() => navigate("/trainers")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Trainers
        </button>
      </div>

      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Profile Image */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white/30 overflow-hidden flex-shrink-0">
              <img
                src={trainer.trainerImage || "https://via.placeholder.com/150"}
                alt={trainer.trainerName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Content */}
            <div className="flex-1 text-center sm:text-left sm:pt-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                {trainer.trainerName}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-4">
                {trainer.trainerRole}
              </p>

              {/* Stats Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-6 text-base sm:text-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{trainer.trainerRating}</span>
                  <span className="text-white/80">
                    ({reviews.length} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-white/80" />
                  <span>{trainer.trainerExperience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-white/80" />
                  <span>{trainer.trainerClientTrained || 0}+ clients trained</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap justify-center sm:justify-start">
                {trainer.trainerTags &&
                  (Array.isArray(trainer.trainerTags) ? trainer.trainerTags : trainer.trainerTags.split(",")).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-2 bg-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-white/20"
                    >
                      {typeof tag === 'string' ? tag.trim() : tag}
                    </span>
                  ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 transition-colors w-full sm:w-auto">
                  Book Session Now
                </button>
                <button className="border-2 border-white/40 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors w-full sm:w-auto">
                  Message Trainer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {["overview", "services", "reviews", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium capitalize transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full flex justify-center items-center mx-auto px-4 mt-4">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="flex flex-col lg:flex-row w-full max-w-6xl mb-5 gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-6">
              {/* About */}
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  About {trainer.trainerName}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {trainer.trainerAbout || trainer.trainerDescription || "No details provided."}
                </p>
              </div>

              {/* Certifications */}
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Certifications & Qualifications
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-blue-50 text-blue-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {trainer.trainerQualification || trainer.trainerCertifications || "Certified Trainer"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Info Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 lg:sticky lg:top-24">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
                  Quick Info
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Location</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {trainer.trainerLocation || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Hourly Rate</span>
                    <span className="font-bold text-base sm:text-lg text-gray-900">
                      ${trainer.trainerPrice || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Availability</span>
                    <span className="font-semibold text-green-600 text-sm sm:text-base">
                      {trainer.trainerStatus || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Clients Trained</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {trainer.trainerClientTrained || 0}+
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        {trainer.trainerRating}
                      </span>
                      <span className="text-gray-500 text-xs">
                        ({reviews.length})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-base sm:text-lg">
                    Ready to Start?
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                    Take the first step towards your fitness goals.
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base">
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-6xl">
            <h2 className="text-lg font-bold mb-6">Training Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainer.trainerService && trainer.trainerService.length > 0 ? (
                trainer.trainerService.map((service) => (
                  <div
                    key={service._id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow flex flex-col items-start shadow-sm"
                  >
                    <h3 className="font-semibold text-base sm:text-lg">{service.name}</h3>
                    <p className="text-blue-600 font-bold text-lg sm:text-xl">
                      ${service.price}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">{service.duration}</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 text-sm sm:text-base">
                      Book This Service
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm sm:text-base">No services available.</p>
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <section className="w-full flex justify-center flex-col items-center">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-6xl space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Client Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{trainer.trainerRating}</span>
                  <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
                </div>
              </div>

              {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-sm sm:text-base">{review.name}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < (review.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm">{review.rating}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm ml-14">{review.text}</p>
                      {review.createdAt && (
                        <p className="text-gray-400 text-xs ml-14 mt-1">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-gray-500 text-center py-8">
                  No reviews yet. Be the first to review this trainer!
                </p>
              )}

              {/* Toggle Write Review Form Button */}
              <div className="mt-6 border-t pt-4">
                <button
                  onClick={() => setIsWritingReview(!isWritingReview)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
                >
                  {isWritingReview ? "Cancel" : "Write a Review"}
                </button>
              </div>

              {/* Add Review Form (Collapsible) */}
              {isWritingReview && (
                <div className="mt-4 w-full bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-4 text-base sm:text-lg">Write a Review</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                    />
                    <textarea
                      placeholder="Share your experience with this trainer..."
                      className="w-full border rounded-lg p-3 text-sm sm:text-base min-h-24 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium">Rating:</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400"
                      >
                        {[5, 4, 3, 2, 1].map((n) => (
                          <option key={n} value={n}>
                            {n} Star{n > 1 ? "s" : ""} {n === 5 ? "- Excellent" : n === 4 ? "- Good" : n === 3 ? "- Average" : n === 2 ? "- Poor" : "- Terrible"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={submitReview}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-sm sm:text-base font-medium w-full sm:w-auto"
                      disabled={!reviewName || !reviewText}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2 text-sm sm:text-base">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="break-words">{trainer.trainerLocation}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm sm:text-base">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="break-all">{trainer.trainerEmail}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm sm:text-base">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>{trainer.trainerPhone}</span>
                  </li>
                </ul>
                <h3 className="mt-6 font-semibold text-sm sm:text-base">
                  Follow {trainer.trainerName}
                </h3>
              </div>

              <section className="w-full">
                <Contact />
              </section>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainerProfile;