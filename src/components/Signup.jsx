
import React, { useState } from "react";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = register;

    if (!name || !email || !password) {
      return handleError("Name, Email, Password are required");
    }

    try {
      // const url = "https://gym-project-backend-2-lbdu.onrender.com/auth/signup";
      const url= "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess(data.message || "Registration successful!");
        setTimeout(() => {
          navigate('/login');
        }, 1000);
        setRegister({ name: "", email: "", password: "" });
      } else {
        handleError(data.message || "Registration failed");
      }
    } catch (err) {
      handleError(err.message || "Server Error");
    }
  };

  return (
    // Outer container with a compelling background
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574680096145-d05b4742e568?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      {/* Central Card Container */}
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl backdrop-blur-sm">
        <div>
          {/* Gym Logo/Icon */}
          <div className="flex justify-center mb-4">
            {/* Replace with your gym logo image */}
            <img className="h-16 w-auto" src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png" alt="Gym Logo" /> {/* Placeholder image */}
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Join Our Fitness Journey!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Sign up now and unleash your potential.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handlesubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="sr-only">Name</label> {/* sr-only for accessibility */}
            <input
              id="name"
              type="text"
              onChange={handlechange}
              value={register.name}
              name="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
              placeholder="Your Full Name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              type="email"
              name="email"
              value={register.email}
              onChange={handlechange}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
              placeholder="Email Address"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={register.password}
              onChange={handlechange}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon for muscle/power if desired */}
                <svg className="h-5 w-5 text-indigo-200 group-hover:text-indigo-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                </svg>
              </span>
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
            Log In
          </Link>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
};

export default Signup;