// import React, { useState } from "react";
// import { ClipLoader } from "react-spinners";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Contact = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendEmail = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/send/mail",
//         { name, email, message },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       setName("");
//       setEmail("");
//       setMessage("");
//       toast.success(data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-indigo-50 to-purple-100">
//       <div className="w-full max-w-2xl mt-15 mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-300 hover:scale-[1.01]">
//         <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2 leading-tight">
//           Get In Touch 💌
//         </h1>
//         <p className="text-center text-gray-500 mb-10 text-lg">
//           We'd love to hear from you.
//         </p>
//         <form onSubmit={sendEmail} className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               placeholder="Your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               autoComplete="off"
//               required
//               className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-gray-400"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Your email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="off"
//               required
//               className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-gray-400"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Message
//             </label>
//             <textarea
//               placeholder="Tell us what's on your mind..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               autoComplete="off"
//               required
//               rows="5"
//               className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-gray-400 resize-none"
//             />
//           </div>

//           <div className="pt-4">
//             <button 
//               type="submit" 
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
//             >
//               {loading && <ClipLoader size={20} color="white" />}
//               {loading ? "Sending..." : "Send Message"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Contact;


import React, { useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Mail, Phone, MapPin, Clock, Shield, Zap, Globe,
  Instagram, Youtube, Linkedin, Twitter, Facebook,
  ChevronDown, CheckCircle, Star, Users, Activity,
  ArrowRight, Flame, MessageCircle, Headphones,
  Send, AlertCircle,
} from "lucide-react";
import Footer from "./Footer";

// ── tiny intersection-based fade-in ──────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "", from = "bottom" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const yStart = from === "bottom" ? 28 : from === "top" ? -28 : 0;
    const xStart = from === "left" ? -28 : from === "right" ? 28 : 0;
    el.style.opacity = "0";
    el.style.transform = `translate(${xStart}px,${yStart}px)`;
    el.style.transition = `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translate(0,0)"; obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, from]);
  return <div ref={ref} className={className}>{children}</div>;
};

// ── animated counter ──────────────────────────────────────────────────────────
const Counter = ({ to, suffix = "", prefix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const end = parseFloat(to) || 0;
      const dur = 1600;
      const step = (end / dur) * 16;
      let cur = 0;
      const tick = () => {
        cur += step;
        if (cur >= end) { setVal(end); return; }
        setVal(Math.floor(cur));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
};

// ── FAQ accordion item ────────────────────────────────────────────────────────
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${open ? "border-red-500/40 bg-red-500/5" : "border-white/10 bg-white/3"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-semibold text-sm text-white/90">{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-red-400" : ""}`} />
      </button>
      <div className={`px-5 overflow-hidden transition-all duration-300 ${open ? "max-h-48 pb-4" : "max-h-0"}`}>
        <p className="text-white/50 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/send/mail",
        { name, email, message },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      setName(""); setEmail(""); setSubject(""); setMessage("");
      setSent(true);
      toast.success(data.message);
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: "How quickly will I get a response?", a: "Our team typically responds within 2–4 hours during business hours. For urgent matters, use our emergency contact line." },
    { q: "Do you offer free consultations?", a: "Yes! We offer a complimentary 30-minute fitness consultation with any of our certified trainers. Book through the contact form." },
    { q: "Can I reschedule or cancel a booking?", a: "Absolutely. You can reschedule or cancel up to 24 hours before your session at no charge through your dashboard or by contacting us." },
    { q: "Do you support online training sessions?", a: "Yes — all our trainers offer both in-person and remote sessions via video call. Select your preference when booking." },
  ];

  const socials = [
    { icon: <Instagram className="w-4 h-4" />, label: "Instagram", color: "hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400" },
    { icon: <Facebook className="w-4 h-4" />, label: "Facebook", color: "hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400" },
    { icon: <Twitter className="w-4 h-4" />, label: "X / Twitter", color: "hover:border-white/30 hover:bg-white/10 hover:text-white" },
    { icon: <Youtube className="w-4 h-4" />, label: "YouTube", color: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400" },
    { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn", color: "hover:border-blue-400/50 hover:bg-blue-400/10 hover:text-blue-300" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-sans">
      {/* ── ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-60 -left-40 w-[500px] h-[500px] bg-red-700/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10">
        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section className="pt-24 pb-16 px-4 text-center relative overflow-hidden">
          {/* live badge */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Support is Online — Average response &lt; 2 hrs
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                Amazing
              </span>{" "}
              Together
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              We're here to help you achieve your fitness goals. Reach out and our team will get back to you quickly.
            </p>
          </FadeIn>

          {/* floating icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { icon: <Flame className="w-5 h-5 text-red-400/40" />, cls: "top-16 left-[8%] animate-bounce" },
              { icon: <Activity className="w-5 h-5 text-rose-400/30" />, cls: "top-24 right-[10%] animate-bounce" },
              { icon: <Zap className="w-4 h-4 text-orange-400/30" />, cls: "bottom-12 left-[15%] animate-pulse" },
              { icon: <Star className="w-4 h-4 text-yellow-400/30" />, cls: "bottom-16 right-[18%] animate-pulse" },
            ].map((f, i) => (
              <div key={i} className={`absolute ${f.cls}`} style={{ animationDelay: `${i * 0.5}s` }}>{f.icon}</div>
            ))}
          </div>

          {/* trust stat strip */}
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-4">
              {[
                { label: "Members", val: 10000, suffix: "+" },
                { label: "Trainers", val: 500, suffix: "+" },
                { label: "Sessions", val: 50000, suffix: "+" },
                { label: "Rating", val: 4.9, suffix: "★", prefix: "" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black text-white">
                    <Counter to={s.val} suffix={s.suffix} prefix={s.prefix || ""} />
                  </div>
                  <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ── info cards row ── */}
        <section className="max-w-6xl mx-auto px-4 mb-14">
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Zap className="w-5 h-5 text-red-400" />, title: "Fast Response", desc: "Average reply under 24 hours", color: "from-red-500/10 to-rose-500/10 border-red-500/20" },
                { icon: <Headphones className="w-5 h-5 text-blue-400" />, title: "Expert Support", desc: "Professional fitness consultation", color: "from-blue-500/10 to-cyan-500/10 border-blue-500/20" },
                { icon: <Globe className="w-5 h-5 text-green-400" />, title: "Global Community", desc: "Thousands of active members", color: "from-green-500/10 to-emerald-500/10 border-green-500/20" },
              ].map((c, i) => (
                <div key={i} className={`bg-gradient-to-br ${c.color} border rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1 transition-all backdrop-blur-sm`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">{c.icon}</div>
                  <div>
                    <p className="font-bold text-sm text-white">{c.title}</p>
                    <p className="text-white/40 text-xs">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ══════════════════════════════════════════════
            MAIN 2-COL LAYOUT
        ══════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── LEFT: Contact Info ── */}
            <FadeIn from="left">
              <div className="space-y-5 h-full flex flex-col">
                {/* Info card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex-1 space-y-5">
                  <div>
                    <h2 className="text-2xl font-black mb-1">Get In Touch</h2>
                    <p className="text-white/40 text-sm">Our team is ready to help you.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: <MapPin className="w-4 h-4 text-red-400" />, label: "Address", val: "123 Fitness Avenue, Mumbai, India 400001" },
                      { icon: <Mail className="w-4 h-4 text-blue-400" />, label: "Email", val: "support@fitpro.com" },
                      { icon: <Phone className="w-4 h-4 text-green-400" />, label: "Phone", val: "+91 98765 43210" },
                      { icon: <Clock className="w-4 h-4 text-yellow-400" />, label: "Hours", val: "Mon–Sat · 6 AM – 10 PM" },
                      { icon: <AlertCircle className="w-4 h-4 text-orange-400" />, label: "Emergency", val: "+91 99999 00000 (24/7)" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-default">
                        <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center flex-shrink-0 transition-colors">{row.icon}</div>
                        <div>
                          <p className="text-white/30 text-xs">{row.label}</p>
                          <p className="text-white text-sm font-medium">{row.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Socials */}
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Follow Us</p>
                    <div className="flex flex-wrap gap-2">
                      {socials.map((s, i) => (
                        <button key={i} className={`flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/50 text-xs font-medium transition-all ${s.color}`}>
                          {s.icon} {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-48 relative backdrop-blur-sm flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black flex flex-col items-center justify-center gap-2 text-white/30">
                    <MapPin className="w-8 h-8 text-red-400/60" />
                    <p className="text-xs">123 Fitness Avenue, Mumbai</p>
                    <p className="text-[10px] text-white/20">Open in Maps →</p>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 backdrop-blur-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">FitPro HQ</p>
                      <p className="text-[10px] text-white/30">Mumbai, India</p>
                    </div>
                    <button className="text-red-400 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Directions <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── RIGHT: Contact Form ── */}
            <FadeIn from="right">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm h-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black mb-1">Send a Message</h2>
                    <p className="text-white/40 text-sm">We'll get back to you shortly.</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-semibold">Online</span>
                  </div>
                </div>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-black text-white">Message Sent!</h3>
                    <p className="text-white/40 text-sm">We'll be in touch with you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={sendEmail} className="space-y-4">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5">Name</label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="off"
                          required
                          disabled={loading}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/60 focus:bg-white/8 transition-all disabled:opacity-40"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5">Email</label>
                        <input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="off"
                          required
                          disabled={loading}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/60 focus:bg-white/8 transition-all disabled:opacity-40"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5">Subject</label>
                      <input
                        type="text"
                        placeholder="How can we help you?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        autoComplete="off"
                        disabled={loading}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/60 focus:bg-white/8 transition-all disabled:opacity-40"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5">Message</label>
                      <textarea
                        placeholder="Tell us what's on your mind…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoComplete="off"
                        required
                        rows={5}
                        disabled={loading}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/60 focus:bg-white/8 transition-all resize-none disabled:opacity-40"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                    >
                      {loading ? (
                        <>
                          <ClipLoader size={16} color="white" />
                          Sending Message…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-center text-white/20 text-xs">
                      By sending a message you agree to our Privacy Policy.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════ */}
        <section className="max-w-3xl mx-auto px-4 mb-16">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-red-400 text-xs uppercase tracking-widest font-semibold mb-2">FAQ</p>
              <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ══════════════════════════════════════════════
            FOOTER CTA
        ══════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-red-900/30 to-rose-900/20 border border-red-500/20 rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex justify-center mb-4">
                  <div className="flex -space-x-2">
                    {["🏋️", "🤸", "🧘", "🏃"].map((e, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center text-base">{e}</div>
                    ))}
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-3">
                  Ready to Start Your Fitness Journey?
                </h2>
                <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
                  Join thousands of members who've already transformed their lives. Your first consultation is free.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all text-sm">
                    <MessageCircle className="w-4 h-4" /> Start Free Consultation
                  </button>
                  <button className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 rounded-xl font-bold hover:bg-white/15 transition-all text-sm backdrop-blur-sm">
                    <Users className="w-4 h-4" /> Browse Trainers
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;