import React from "react";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import Workoutsession from "./Workoutsession";
import Footer from "./Footer";

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden overflow-x-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/home.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center py-24 md:py-28">
          <div className="mx-auto w-full max-w-screen-xl px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-center">

              {/* Left Content */}
              <div className="text-center lg:text-left">

                <span className="inline-flex items-center rounded-full border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400">
                  🔥 Premium Fitness Experience
                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-tight text-white">
                  LET'S
                  <span className="block text-red-500">GO</span>
                  <span className="block">MOVING</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed lg:mx-0">
                  Transform your body, improve your health, and unlock your
                  full potential with world-class trainers, premium equipment,
                  and personalized fitness programs.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto rounded-xl bg-red-600 px-8 py-4 text-center font-bold text-white shadow-xl transition hover:scale-105 hover:bg-red-700"
                  >
                    Start Your Journey
                  </Link>

                  <Link
                    to="/programs"
                    className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    Explore Programs
                  </Link>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto lg:mx-0">

                  <div className="rounded-xl bg-white/5 p-4 backdrop-blur-md">
                    <h3 className="text-2xl sm:text-3xl font-bold text-red-500">
                      5K+
                    </h3>
                    <p className="text-sm text-gray-300">
                      Members
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4 backdrop-blur-md">
                    <h3 className="text-2xl sm:text-3xl font-bold text-red-500">
                      50+
                    </h3>
                    <p className="text-sm text-gray-300">
                      Trainers
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4 backdrop-blur-md">
                    <h3 className="text-2xl sm:text-3xl font-bold text-red-500">
                      100+
                    </h3>
                    <p className="text-sm text-gray-300">
                      Programs
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Card */}
              <div className="flex justify-center">
                <div className="w-full max-w-md xl:max-w-lg rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">

                  <h2 className="mb-8 text-center text-2xl sm:text-3xl font-bold text-white">
                    Why Choose FitZone?
                  </h2>

                  <div className="space-y-6">

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-red-600 text-xl">
                        💪
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          Strength Training
                        </h3>
                        <p className="text-sm text-gray-300">
                          Build muscle and increase overall strength.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-red-600 text-xl">
                        🏃
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          Cardio Programs
                        </h3>
                        <p className="text-sm text-gray-300">
                          Improve endurance and burn calories efficiently.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-red-600 text-xl">
                        🥗
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          Nutrition Plans
                        </h3>
                        <p className="text-sm text-gray-300">
                          Personalized meal plans for faster results.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-red-600 text-xl">
                        🏆
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          Proven Results
                        </h3>
                        <p className="text-sm text-gray-300">
                          Thousands of successful transformations.
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="mt-8 border-t border-white/20 pt-6">
                    <p className="text-center text-sm text-gray-300">
                      Join the fastest-growing fitness community today.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Gallery />
      <Workoutsession />
      <Footer />
    </div>
  );
};

export default Hero;