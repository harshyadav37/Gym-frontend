import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {

  const [SignUp , setSetSignup]=useState({
    name:"",
    email:"",
    password:""
  })


  const handleChange =(e)=>{
    const {name , value}=e.target;
    console.log(name ,value)
    const copySignup= {...SignUp};
    copySignup[name]=value
    setSetSignup(copySignup)

  }
  console.log("logininfo" , SignUp)

  const handleSubmit = async(e)=>{
     e.preventDefault()

     const {name ,email,password}=SignUp
     if(!name || !email || !password){
      return alert("name email passowrd is required")
     }
     try {
      const url =`http://localhost:8080/auth/signup`
      const response =await fetch (url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(SignUp)
      })
      const result=await response.json();
      console.log(result)
      
     } catch (error) {
       console.log("jkgdsjk")
     }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        <form  onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
             value={SignUp.name}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
             value={SignUp.email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={SignUp.password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
