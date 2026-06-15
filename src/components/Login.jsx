// import React, { useState } from "react";
// import { handleError, handleSuccess } from "../util";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {Link , useNavigate} from 'react-router-dom'

// const Login = () => {
//   const [LoginInfo, setLoginInfo] = useState({
    
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();


//   const handlechangeLogin = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo({ ...LoginInfo, [name]: value });
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     const {  email, password } = LoginInfo;

//     // ✅ Validation
//     if ( !email || !password) {
//       return handleError("Name, Email, Password are required");
//     }

//     try {
//       const url = "http://localhost:8080/auth/login";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(LoginInfo),
//       });

//       const data = await response.json();
//       const {success , message , jwtToken ,name ,error}=data

//       if (response.ok) {
//         handleSuccess(data.message || "Registration successful!");
//         localStorage.setItem('token',jwtToken)
//         localStorage.setItem('loggegInuser', name)
//         setTimeout(()=>{
//           navigate('/bmi-checker')
//         },1000)
//         setLoginInfo({  email: "", password: "" }); // ✅ reset form
//       } else {
//         handleError(data.message || "Registration failed");
//       }
//     } catch (err) {
//       handleError(err.message || "Server Error");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-xl font-bold mb-4">Signup</h2>

//       <div className="space-y-4 w-full max-w-md">
//         <form onSubmit={handlesubmit}>
      

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={LoginInfo.email}
//               onChange={handlechangeLogin}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={LoginInfo.password}
//               onChange={handlechangeLogin}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* ✅ Toast container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlechangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...LoginInfo, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;

    if (!email || !password) {
      return handleError("Email and Password are required");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      // const url = "https://gym-project-backend-2-lbdu.onrender.com/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
      });

      const data = await response.json();
      const { jwtToken, name } = data;

      if (response.ok) {
        handleSuccess(data.message || "Login successful!");
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setLoginInfo({ email: "", password: "" });
      } else {
        handleError(data.message || "Login failed");
      }
    } catch (err) {
      handleError(err.message || "Server Error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2940&auto=format&fit=crop')",
      }}
    >
      {/* Login Card */}
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          {/* ✅ Working Gym Logo */}
          <div className="flex justify-center mb-4">
            <img
              className="h-16 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png"
              alt="Gym Logo"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Sign in to continue your fitness journey.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handlesubmit}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              type="email"
              name="email"
              value={LoginInfo.email}
              onChange={handlechangeLogin}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300"
              placeholder="Email Address"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={LoginInfo.password}
              onChange={handlechangeLogin}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-200 group-hover:text-indigo-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Login
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
