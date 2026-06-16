
// import React, { useState } from "react";
// import { handleError, handleSuccess } from "../util";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [register, setRegister] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setRegister({ ...register, [name]: value });
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = register;

//     if (!name || !email || !password) {
//       return handleError("Name, Email, Password are required");
//     }

//     try {
//       // const url = "https://gym-project-backend-2-lbdu.onrender.com/auth/signup";
//       const url= "http://localhost:8080/auth/signup";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(register),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         handleSuccess(data.message || "Registration successful!");
//         setTimeout(() => {
//           navigate('/login');
//         }, 1000);
//         setRegister({ name: "", email: "", password: "" });
//       } else {
//         handleError(data.message || "Registration failed");
//       }
//     } catch (err) {
//       handleError(err.message || "Server Error");
//     }
//   };

//   return (
//     // Outer container with a compelling background
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574680096145-d05b4742e568?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
//       {/* Central Card Container */}
//       <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl backdrop-blur-sm">
//         <div>
//           {/* Gym Logo/Icon */}
//           <div className="flex justify-center mb-4">
//             {/* Replace with your gym logo image */}
//             <img className="h-16 w-auto" src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png" alt="Gym Logo" /> {/* Placeholder image */}
//           </div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
//             Join Our Fitness Journey!
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-300">
//             Sign up now and unleash your potential.
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handlesubmit}>
//           {/* Name */}
//           <div>
//             <label htmlFor="name" className="sr-only">Name</label> {/* sr-only for accessibility */}
//             <input
//               id="name"
//               type="text"
//               onChange={handlechange}
//               value={register.name}
//               name="name"
//               required
//               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
//               placeholder="Your Full Name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email-address" className="sr-only">Email address</label>
//             <input
//               id="email-address"
//               type="email"
//               name="email"
//               value={register.email}
//               onChange={handlechange}
//               required
//               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
//               placeholder="Email Address"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="sr-only">Password</label>
//             <input
//               id="password"
//               type="password"
//               name="password"
//               value={register.password}
//               onChange={handlechange}
//               required
//               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
//               placeholder="Password"
//             />
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
//             >
//               <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                 {/* Heroicon for muscle/power if desired */}
//                 <svg className="h-5 w-5 text-indigo-200 group-hover:text-indigo-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
//                 </svg>
//               </span>
//               Create Account
//             </button>
//           </div>
//         </form>

//         <div className="text-center text-sm text-gray-400">
//           Already have an account?{' '}
//           <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
//             Log In
//           </Link>
//         </div>
//       </div>

//       {/* Toast container */}
//       <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
//     </div>
//   );
// };

// export default Signup;



/**
 * Signup.jsx — FitZone premium registration screen
 * ---------------------------------------------------
 * Drop-in replacement for the existing Signup page. Shares the same design
 * system as Login.jsx (colors, type, glass card, FitZone mark, heartbeat
 * seam) so the two auth screens read as one product. The shared pieces
 * (FontStyles, FitZoneMark, HeartbeatDivider, StatBadge, FloatingInput,
 * SocialButton) are duplicated here for a self-contained file — worth
 * extracting into a shared /components/auth module if you want a single
 * source of truth later.
 *
 * All original logic is preserved unchanged: the fetch call, validation
 * condition/message, toast notifications, and the 1s timeout before
 * navigate('/login'). Everything else here is presentation only.
 *
 * New dependencies to install (react-router-dom and react-toastify are
 * already in your project):
 *   npm install framer-motion lucide-react
 */
import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  Dumbbell,
  Flame,
  Star,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  CheckCircle2,
  Circle,
  Award,
  Apple,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens — identical to Login.jsx                             */
/*  Display: Anton · Body: Manrope · Data/labels: JetBrains Mono       */
/*  Obsidian #0B0B0D · Charcoal #17171A · Iron #2A2A2E                 */
/*  Ember #FF3B30 → Crimson #B0102B · Bone #F4F3F0 · Gold #C9A24B      */
/* ------------------------------------------------------------------ */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1574680096145-d05b4742e568?q=80&w=2940&auto=format&fit=crop";

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    .ff-display { font-family: 'Anton', 'Arial Narrow', sans-serif; }
    .ff-body { font-family: 'Manrope', 'Helvetica Neue', sans-serif; }
    .ff-mono { font-family: 'JetBrains Mono', 'Menlo', monospace; }

    @keyframes fz-glow-a {
      0%, 100% { opacity: 0.35; transform: scale(1) translate(0, 0); }
      50% { opacity: 0.6; transform: scale(1.12) translate(2%, -2%); }
    }
    @keyframes fz-glow-b {
      0%, 100% { opacity: 0.25; transform: scale(1.05); }
      50% { opacity: 0.45; transform: scale(0.95); }
    }
  `}</style>
);

/* Lightweight count-up used by the floating achievement cards */
function useCountUp(target, { duration = 1600, decimals = 0, start = false } = {}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    let begin = null;
    const tick = (ts) => {
      if (begin === null) begin = ts;
      const progress = Math.min((ts - begin) / duration, 1);
      setValue(progress * target);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value.toFixed(decimals);
}

const StatBadge = ({ icon, target, decimals = 0, suffix = "", label, className = "", delay = 0, ready, reduceMotion }) => {
  const count = useCountUp(target, { start: ready, decimals });
  return (
    <motion.div
      className={`absolute flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: reduceMotion ? 0 : [0, -7, 0] }}
      transition={{
        opacity: { duration: 0.7, delay: 0.9 + delay, ease: "easeOut" },
        y: reduceMotion
          ? { duration: 0 }
          : { duration: 3.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.3 + delay },
      }}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF3B30] to-[#B0102B] text-white">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="ff-display text-base tracking-wide text-white">
          {count}{suffix}
        </p>
        <p className="ff-mono text-[10px] uppercase tracking-wider text-gray-300">{label}</p>
      </div>
    </motion.div>
  );
};

/* The recurring brand signature: a literal heartbeat trace running down the
   seam between the brand story (left) and the access point (right). Reused
   from Login.jsx on purpose — the same signature element across both auth
   screens is what makes them read as one product. */
const HeartbeatDivider = () => (
  <svg
    viewBox="0 0 24 640"
    preserveAspectRatio="none"
    className="pointer-events-none h-full w-6"
  >
    <path
      d="M12,0 L12,60 L12,80 L8,90 L12,100 L17,55 L22,130 L14,145 L12,170 L12,260 L12,280 L8,290 L12,300 L17,255 L22,330 L14,345 L12,370 L12,460 L12,480 L8,490 L12,500 L17,455 L22,530 L14,545 L12,570 L12,640"
      stroke="#2A2A2E"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M12,0 L12,60 L12,80 L8,90 L12,100 L17,55 L22,130 L14,145 L12,170 L12,260 L12,280 L8,290 L12,300 L17,255 L22,330 L14,345 L12,370 L12,460 L12,480 L8,490 L12,500 L17,455 L22,530 L14,545 L12,570 L12,640"
      stroke="url(#fz-pulse)"
      strokeWidth="2.5"
      fill="none"
      style={{ filter: "drop-shadow(0 0 6px rgba(255,59,48,0.85))" }}
    />
    <defs>
      <linearGradient id="fz-pulse" x1="0" y1="-40%" x2="0" y2="60%">
        <stop offset="0%" stopColor="#FF3B30" stopOpacity="0" />
        <stop offset="50%" stopColor="#FF3B30" stopOpacity="1" />
        <stop offset="100%" stopColor="#FF3B30" stopOpacity="0" />
        <animate attributeName="y1" values="-60%;140%;-60%" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="0%;200%;0%" dur="3.2s" repeatCount="indefinite" />
      </linearGradient>
    </defs>
  </svg>
);

const FitZoneMark = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="shrink-0">
    <rect x="1" y="1" width="32" height="32" rx="10" className="fill-white/5" stroke="rgba(255,255,255,0.15)" />
    <path d="M19 3 L9 18 H15 L13 31 L26 14 H19 L19 3 Z" fill="url(#fz-mark)" />
    <defs>
      <linearGradient id="fz-mark" x1="9" y1="3" x2="26" y2="31">
        <stop stopColor="#FF3B30" />
        <stop offset="1" stopColor="#C9A24B" />
      </linearGradient>
    </defs>
  </svg>
);

const FloatingInput = ({ id, type, name, value, onChange, label, icon, error, rightSlot, autoComplete }) => (
  <div>
    <div className="relative">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        autoComplete={autoComplete}
        className={`peer w-full rounded-xl border bg-white/5 px-11 pt-5 pb-2.5 text-sm text-white placeholder-transparent backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/40 ${
          rightSlot ? "pr-11" : ""
        } ${error ? "border-red-500/70" : "border-white/15 focus:border-[#FF3B30]/60"}`}
      />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 peer-focus:text-[#FF3B30]">
        {icon}
      </span>
      <label
        htmlFor={id}
        className="absolute left-11 top-4 text-sm text-gray-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#FF3B30] peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
      {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
    </div>
    {error && <p className="mt-1.5 pl-1 text-xs text-red-400">{error}</p>}
  </div>
);

const SocialButton = ({ icon, label }) => (
  <button
    type="button"
    aria-label={`Continue with ${label}`}
    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-gray-200 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
  >
    {icon}
    <span className="ff-body hidden text-sm font-medium sm:inline">{label}</span>
  </button>
);

/* ------------------------------------------------------------------ */
/*  Signup-specific pieces                                            */
/* ------------------------------------------------------------------ */

const BENEFITS = [
  { icon: <Dumbbell className="h-3.5 w-3.5" />, label: "Personalized Workout Plans" },
  { icon: <Award className="h-3.5 w-3.5" />, label: "Certified Trainers" },
  { icon: <Apple className="h-3.5 w-3.5" />, label: "Nutrition Guidance" },
  { icon: <TrendingUp className="h-3.5 w-3.5" />, label: "Progress Tracking" },
  { icon: <HeartHandshake className="h-3.5 w-3.5" />, label: "Community Support" },
];

const BenefitChip = ({ icon, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md"
  >
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF3B30] to-[#B0102B] text-white">
      {icon}
    </span>
    <span className="ff-body text-xs text-gray-200">{label}</span>
  </motion.div>
);

const PASSWORD_RULES = [
  { key: "length", label: "Minimum 8 characters", test: (p) => p.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { key: "number", label: "One number", test: (p) => /[0-9]/.test(p) },
];

const STRENGTH_LABEL = ["", "Weak", "Good", "Strong"];
const STRENGTH_TEXT_CLASS = ["", "text-[#FF3B30]", "text-[#C9A24B]", "text-[#F4F3F0]"];
const STRENGTH_BAR_CLASS = [
  "bg-[#FF3B30]",
  "bg-gradient-to-r from-[#FF3B30] to-[#C9A24B]",
  "bg-gradient-to-r from-[#C9A24B] to-[#F4F3F0]",
];

/* The page's one signature flourish: the same traveling-glow "pulse" used by
   the heartbeat seam, repurposed here as a functional password-strength
   read-out instead of a purely decorative element. */
const PasswordStrength = ({ password }) => {
  const results = PASSWORD_RULES.map((rule) => ({ ...rule, met: rule.test(password) }));
  const score = results.filter((r) => r.met).length;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="flex items-center gap-2 pt-1">
        <div className="flex flex-1 gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < score ? STRENGTH_BAR_CLASS[score - 1] : "bg-white/10"
              }`}
            />
          ))}
        </div>
        {score > 0 && (
          <span className={`ff-mono w-12 shrink-0 text-right text-[10px] uppercase tracking-wider ${STRENGTH_TEXT_CLASS[score]}`}>
            {STRENGTH_LABEL[score]}
          </span>
        )}
      </div>
      <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
        {results.map((r) => (
          <li
            key={r.key}
            className={`flex items-center gap-1.5 text-[11px] transition-colors duration-300 ${
              r.met ? "text-[#C9A24B]" : "text-gray-500"
            }`}
          >
            {r.met ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
            {r.label}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Signup = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({ name: false, email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setReady(true);
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = register;

    if (!name || !email || !password) {
      setFieldErrors({ name: !name, email: !email, password: !password });
      return handleError("Name, Email, Password are required");
    }
    setFieldErrors({ name: false, email: false, password: false });
    setIsLoading(true);

    try {
     
      // const url = "http://localhost:8080/auth/signup";
       const url = "https://fitzone-backend-ivyq.onrender.com/auth/signup";
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
          navigate("/login");
        }, 1000);
        setRegister({ name: "", email: "", password: "" });
      } else {
        handleError(data.message || "Registration failed");
        setIsLoading(false);
      }
    } catch (err) {
      handleError(err.message || "Server Error");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0B0B0D] md:flex-row">
      <FontStyles />

      {/* subtle page-wide grain for a premium, tactile surface */}
      <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.05] mix-blend-overlay">
        <filter id="fz-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#fz-noise)" />
      </svg>

      {/* mobile-only background — hero panel is hidden below md, so the
          image is shown full-bleed behind the centered card instead */}
      <div className="absolute inset-0 z-0 md:hidden">
        <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black" />
      </div>

      {/* heartbeat seam — only relevant once the split layout exists at md+ */}
      <div className="pointer-events-none absolute inset-y-0 left-[40%] z-10 hidden -translate-x-1/2 md:block lg:left-[56%]">
        <HeartbeatDivider />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* LEFT — brand story + member benefits                        */}
      {/* ---------------------------------------------------------- */}
      <div className="relative z-[2] hidden w-full md:flex md:w-[40%] lg:w-[56%]">
        <img src={HERO_IMAGE} alt="Athlete training" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
        <div
          className="absolute -top-1/4 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[#FF3B30]/20 blur-3xl"
          style={{ animation: reduceMotion ? "none" : "fz-glow-a 9s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[#C9A24B]/10 blur-3xl"
          style={{ animation: reduceMotion ? "none" : "fz-glow-b 11s ease-in-out infinite" }}
        />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <FitZoneMark />
            <div>
              <p className="ff-display text-xl tracking-wide text-white">
                FIT<span className="bg-gradient-to-r from-[#FF3B30] to-[#C9A24B] bg-clip-text text-transparent">ZONE</span>
              </p>
              <p className="ff-mono text-[10px] uppercase tracking-[0.15em] text-gray-400">
                Transform Your Body. Elevate Your Life.
              </p>
            </div>
          </motion.div>

          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="ff-display text-4xl leading-[1.05] text-white lg:text-6xl"
            >
              START YOUR
              <br />
              TRANSFORMATION TODAY.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="ff-body mt-5 max-w-md text-base text-gray-300"
            >
              Join thousands of members who are building stronger bodies and healthier lifestyles.
            </motion.p>

            <div className="mt-7">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="ff-mono mb-3 text-[10px] uppercase tracking-[0.2em] text-gray-400"
              >
                What You Get
              </motion.p>
              <div className="flex max-w-md flex-wrap gap-2">
                {BENEFITS.map((b, i) => (
                  <BenefitChip key={b.label} icon={b.icon} label={b.label} delay={0.55 + i * 0.08} />
                ))}
              </div>
            </div>
          </div>

          <div className="h-12" />
        </div>

        <StatBadge
          ready={ready}
          reduceMotion={reduceMotion}
          icon={<Star className="h-4 w-4" />}
          target={4.9}
          decimals={1}
          label="Average Rating"
          className="right-10 top-10"
          delay={0}
        />
        <StatBadge
          ready={ready}
          reduceMotion={reduceMotion}
          icon={<Users className="h-4 w-4" />}
          target={10}
          suffix="K+"
          label="Active Members"
          className="bottom-32 left-10"
          delay={0.15}
        />
        <StatBadge
          ready={ready}
          reduceMotion={reduceMotion}
          icon={<Dumbbell className="h-4 w-4" />}
          target={500}
          suffix="+"
          label="Certified Trainers"
          className="right-12 top-1/2 -translate-y-1/2"
          delay={0.3}
        />
        <StatBadge
          ready={ready}
          reduceMotion={reduceMotion}
          icon={<Flame className="h-4 w-4" />}
          target={50}
          suffix="K+"
          label="Workout Sessions"
          className="bottom-10 left-1/4"
          delay={0.45}
        />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* RIGHT — signup card                                         */}
      {/* ---------------------------------------------------------- */}
      <div className="relative z-[2] flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-6 md:bg-gradient-to-br md:from-[#111113] md:to-[#0B0B0D] lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-9"
          style={{
            backgroundImage:
              "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)), linear-gradient(140deg, rgba(255,59,48,0.12), transparent 60%)",
          }}
        >
          <div className="mb-7 flex items-center gap-3 md:hidden">
            <FitZoneMark />
            <p className="ff-display text-lg tracking-wide text-white">
              FIT<span className="bg-gradient-to-r from-[#FF3B30] to-[#C9A24B] bg-clip-text text-transparent">ZONE</span>
            </p>
          </div>

          <h2 className="ff-display text-2xl text-white sm:text-3xl">CREATE YOUR ACCOUNT</h2>
          <p className="ff-body mt-2 text-sm text-gray-400">Begin your transformation in under a minute.</p>

          <form className="mt-7 space-y-5" onSubmit={handlesubmit} noValidate>
            <FloatingInput
              id="name"
              type="text"
              name="name"
              value={register.name}
              onChange={handlechange}
              label="Full name"
              icon={<User className="h-[18px] w-[18px]" />}
              error={fieldErrors.name ? "Name is required" : ""}
              autoComplete="name"
            />

            <FloatingInput
              id="email-address"
              type="email"
              name="email"
              value={register.email}
              onChange={handlechange}
              label="Email address"
              icon={<Mail className="h-[18px] w-[18px]" />}
              error={fieldErrors.email ? "Email is required" : ""}
              autoComplete="email"
            />

            <div>
              <FloatingInput
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={register.password}
                onChange={handlechange}
                label="Password"
                icon={<Lock className="h-[18px] w-[18px]" />}
                error={fieldErrors.password ? "Password is required" : ""}
                autoComplete="new-password"
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="text-gray-400 transition-colors hover:text-[#FF3B30] focus-visible:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                  </button>
                }
              />
              {register.password.length > 0 && (
                <div className="px-1">
                  <PasswordStrength password={register.password} />
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={isLoading ? {} : { scale: 1.015 }}
              whileTap={isLoading ? {} : { scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF3B30] to-[#B0102B] px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_10px_30px_rgba(255,59,48,0.35)] transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(255,59,48,0.55)] disabled:cursor-not-allowed disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Your Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="ff-mono text-[10px] uppercase tracking-wider text-gray-500">Or continue with</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="flex gap-3">
            <SocialButton
              label="Google"
              icon={
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                  <path d="M21.35 11.1h-9.17v2.94h5.36c-.23 1.48-1.7 4.34-5.36 4.34-3.23 0-5.86-2.68-5.86-5.98s2.63-5.98 5.86-5.98c1.84 0 3.07.78 3.78 1.46l2.58-2.49C16.95 3.96 14.92 3 12.18 3 7.08 3 3 7.06 3 12.4s4.08 9.4 9.18 9.4c5.3 0 8.82-3.73 8.82-8.98 0-.6-.07-1.06-.65-1.72z" />
                </svg>
              }
            />
            <SocialButton
              label="Apple"
              icon={
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                  <path d="M16.7 1.85c0 1.13-.43 2.13-1.28 3.04-1 .98-2.16 1.55-3.42 1.45-.05-1.1.42-2.18 1.27-3.07.95-1 2.4-1.6 3.4-1.55.02.04.03.09.03.13zM20.7 17.13c-.36.84-.78 1.6-1.27 2.32-1.04 1.5-2.34 3.4-4.5 3.42-1.36.02-1.86-.86-3.43-.86-1.6 0-2.13.84-3.43.88-2.07.07-3.49-1.97-4.55-3.47-1.85-2.7-2.92-7.18-1.22-10.32.84-1.55 2.36-2.55 4.04-2.58 1.32-.02 2.18.91 3.4.91 1.2 0 1.84-.91 3.45-.93 1.5-.02 3 .77 3.96 2.2-3.06 1.78-2.55 6.07.55 8.45z" />
                </svg>
              }
            />
            <SocialButton
              label="Facebook"
              icon={
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.84c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
                </svg>
              }
            />
          </div>

          <div className="mt-7 text-center">
            <p className="ff-body text-sm text-gray-400">Already have an account?</p>
            <Link to="/login" className="mt-3 block">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-[#FF3B30]/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Log In
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-5">
            <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C9A24B]" /> Secure Registration
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <BadgeCheck className="h-3.5 w-3.5 text-[#C9A24B]" /> Trusted by 10K+
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <Lock className="h-3.5 w-3.5 text-[#C9A24B]" /> SSL Protected
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <Headphones className="h-3.5 w-3.5 text-[#C9A24B]" /> 24/7 Support
            </span>
          </div>
        </motion.div>
      </div>

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

export default Signup;