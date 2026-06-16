import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Workoutsession from "./components/Workoutsession";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import BMICalculator from "./components/BMICalculator";
import Footer from "./components/Footer";
import Checker from "./components/Checker";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; // ✅ new
import LogoutButton from "./components/LogoutButton";
import Trainer from "./components/Trainer";
import TrainerProfile from "./components/TrainerProfile";



// Layout wrapper with Navbar
const LayoutWithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Protected Pages (need login) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Hero />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
         <Route
          path="/logo"
          element={
            
                <Logo />
             
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Contact />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/programs"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Workoutsession />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Gallery />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/join"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Pricing />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bmi-checker"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <BMICalculator />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

        {/* ✅ Public Pages (only if NOT logged in) */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PublicRoute>
              <LogoutButton />
            </PublicRoute>
          }
        />

        {/* ✅ Trainer Routes */}
        <Route
          path="/trainers"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Trainer />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <TrainerProfile />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
     
     
      </Routes>
    </Router>
  );
};

export default App;
