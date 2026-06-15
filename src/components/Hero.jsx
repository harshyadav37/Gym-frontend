import React from 'react';
// import Navbar from './Navbar';
import Footer from './Footer';
import Gallery from './Gallery';
import Workoutsession from './Workoutsession';
import { Link, useNavigate } from "react-router-dom";
import gymImage from "../../public/jym1.jpg";
import homevideo from "../../public/home.mp4";
const Hero = () => {
  return (
    <div>
          <h1 style={{ color: "white",}} className=''>
       {/* <Navbar/> */}
      </h1>  
    <div className="relative h-screen w-full overflow-hidden">
        <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src={homevideo} type="video/mp4" />
  </video>

<div className="w-full min-h-screen   p-4 md:p-8">
  <div className="flex justify-start items-start">
    {/* Your component positioned on the left */}
    <div className="relative w-full max-w-lg h-96 md:h-[500px] bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg overflow-hidden transform translate-x-0 hover:translate-x-2 transition-transform duration-500">
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="text-center space-y-1 sm:space-y-2 transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wider uppercase drop-shadow-2xl animate-pulse">
            LET'S
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-red-500 tracking-wider uppercase drop-shadow-2xl transform hover:text-red-400 transition-colors duration-300">
            GO
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wider uppercase drop-shadow-2xl">
            MOVING
          </h1>
        </div>
             <h1 className="text-white text-2xl mt-4 font-bold drop-shadow-lg">
        Start Your Fitness Journey Today 💪
      </h1>
        
        {/* Bottom CTA */}
        <div className="mt-6 sm:mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm">

            <Link
              to="/signup"
              className="text-gray-300 hover:text-red-500 font-semibold transition-colors duration-300 uppercase tracking-wide"
            >
               Start Your Journey
            </Link>
           
          </button>
       
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-4 border-red-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 sm:w-10 sm:h-10 border-2 sm:border-4 border-white rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div className="absolute top-1/2 left-2 w-1 h-8 sm:h-12 bg-red-500 opacity-30 transform rotate-45"></div>
      <div className="absolute top-1/2 right-2 w-1 h-8 sm:h-12 bg-white opacity-30 transform -rotate-45"></div>
    </div>
    
    {/* Optional: Content area on the right */}
    
  </div>
</div>
    </div>
    <Gallery/>
    <Workoutsession/>
    {/* <Footer/> */}
    </div>
  );
};

export default Hero;
