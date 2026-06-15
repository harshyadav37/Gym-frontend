import React, { useState, useEffect, useRef } from "react";
import {
  Star, Award, DollarSign, Search, SlidersHorizontal,
  ChevronDown, X, CheckCircle2, Users, Trophy, Zap,
  Clock, BarChart3, ShieldCheck, Flame, RotateCcw,
  ArrowRight, Eye,
} from "lucide-react";
import { handleError } from "../util";
import { useNavigate } from "react-router-dom";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const STATS = [
  { value: "500+", label: "Certified Trainers", Icon: ShieldCheck },
  { value: "10K+", label: "Active Members",     Icon: Users },
  { value: "50K+", label: "Sessions Done",      Icon: Flame },
  { value: "4.9★", label: "Avg Rating",         Icon: Star },
];

// ─── STAR ROW ─────────────────────────────────────────────────────────────────

function StarRow({ rating }) {
  const r = parseFloat(rating) || 0;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={12}
          className={n <= Math.round(r) ? "text-yellow-400 fill-yellow-400" : "text-white/15 fill-white/15"}
        />
      ))}
    </div>
  );
}

// ─── TRAINER CARD ─────────────────────────────────────────────────────────────

function TrainerCard({ trainer, onProfile, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const tags = Array.isArray(trainer.trainerTags)
    ? trainer.trainerTags
    : typeof trainer.trainerTags === "string"
    ? trainer.trainerTags.split(",").map((t) => t.trim())
    : [];

  const isAvailable = trainer.trainerStatus === "Available";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s`,
      }}
    >
      <div
        className="relative rounded-3xl overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-400"
        style={{
          background: "linear-gradient(145deg, rgba(18,18,28,0.95) 0%, rgba(12,8,16,0.98) 100%)",
          border: hovered
            ? "1px solid rgba(239,68,68,0.45)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered
            ? "0 0 40px rgba(239,68,68,0.18), 0 24px 60px rgba(0,0,0,0.7)"
            : "0 8px 32px rgba(0,0,0,0.5)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          <img
            src={trainer.trainerImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=280&fit=crop"}
            alt={trainer.trainerName}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=280&fit=crop";
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(12,8,16,1) 0%, rgba(12,8,16,0.3) 50%, transparent 100%)" }}
          />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                background: isAvailable ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                border: `1px solid ${isAvailable ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
                color: isAvailable ? "#4ade80" : "#f87171",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: isAvailable ? "#4ade80" : "#f87171",
                  boxShadow: isAvailable ? "0 0 6px #4ade80" : "0 0 6px #f87171",
                  animation: isAvailable ? "pulse 2s ease-in-out infinite" : "none",
                }}
              />
              {isAvailable ? "Available" : "Limited"}
            </span>
          </div>

          {/* Verified badge */}
          <div className="absolute top-3 right-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                boxShadow: "0 4px 12px rgba(239,68,68,0.4)",
              }}
            >
              <CheckCircle2 size={14} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Hover stats overlay — slides up */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 pb-4 transition-all duration-350"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <div
              className="grid grid-cols-3 gap-2 rounded-2xl p-3"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {[
                { label: "Clients", value: trainer.trainerClients || "80+" },
                { label: "Success", value: trainer.trainerSuccess || "97%" },
                { label: "Certs",   value: trainer.trainerCertifications || "0" },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-white font-black text-sm">{value}</p>
                  <p className="text-white/45 text-[10px] uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Name + rating */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-black text-white text-lg leading-tight truncate">{trainer.trainerName}</h3>
              <p className="text-white/45 text-xs mt-0.5 truncate">{trainer.trainerRole}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="flex items-center gap-1 justify-end">
                <Star size={13} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold text-sm">{trainer.trainerRating}</span>
              </div>
              <p className="text-white/35 text-[10px]">({trainer.trainerReviews || 0})</p>
            </div>
          </div>

          {/* Experience bar */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-white/40 text-xs uppercase tracking-widest">Experience</span>
              <span className="text-white/70 text-xs font-bold">{trainer.trainerExperience} yrs</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((trainer.trainerExperience / 20) * 100, 100)}%`,
                  background: "linear-gradient(90deg, #ef4444, #f97316)",
                  boxShadow: "0 0 8px rgba(239,68,68,0.5)",
                  transitionDelay: visible ? `${index * 0.07 + 0.3}s` : "0s",
                }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "rgba(252,165,165,0.9)",
                }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
              >
                +{tags.length - 3}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-white/40 text-xs leading-relaxed line-clamp-2 flex-1">{trainer.trainerDescription}</p>

          {/* Price + certs */}
          <div
            className="flex items-center justify-between rounded-2xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-1.5">
              <Award size={14} className="text-white/30" />
              <span className="text-white/50 text-xs">{trainer.trainerCertifications || 0} Certifications</span>
            </div>
            <div>
              <span className="text-white font-black text-base">${trainer.trainerPrice}</span>
              <span className="text-white/35 text-xs">/hr</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-1">
            <button
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                boxShadow: hovered ? "0 6px 24px rgba(239,68,68,0.4)" : "0 4px 16px rgba(239,68,68,0.25)",
              }}
            >
              <Zap size={11} strokeWidth={3} />
              Book
            </button>
            <button
              onClick={() => onProfile(trainer._id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <Eye size={11} strokeWidth={2.5} />
              Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FILTER SELECT ────────────────────────────────────────────────────────────

function FilterSelect({ label, Icon, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = !!value;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-sm transition-all duration-200 text-left"
        style={{
          background: active ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${active ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.08)"}`,
          color: active ? "#fca5a5" : "rgba(255,255,255,0.5)",
          boxShadow: active ? "0 0 16px rgba(239,68,68,0.1)" : "none",
        }}
      >
        <Icon size={15} strokeWidth={2} className="flex-shrink-0" />
        <span className="flex-1 truncate font-medium text-xs uppercase tracking-wider">
          {value || placeholder}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-30"
          style={{
            background: "rgba(14,14,22,0.98)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.8)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/30 cursor-pointer hover:text-white/60 transition-colors"
            onClick={() => { onChange(""); setOpen(false); }}
          >
            {placeholder}
          </div>
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => { onChange(String(opt.value)); setOpen(false); }}
              className="px-4 py-2.5 text-xs font-semibold cursor-pointer transition-all duration-150"
              style={{
                color: String(opt.value) === value ? "#f87171" : "rgba(255,255,255,0.65)",
                background: String(opt.value) === value ? "rgba(239,68,68,0.1)" : "transparent",
              }}
              onMouseEnter={(e) => { if (String(opt.value) !== value) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { if (String(opt.value) !== value) e.currentTarget.style.background = "transparent"; }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const Trainer = () => {
  const [trainerCard, setTrainerCard]                   = useState([]);
  const [searchTerm, setSearchTerm]                     = useState("");
  const [selectedExperience, setSelectedExperience]     = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedRating, setSelectedRating]             = useState("");
  const [loading, setLoading]                           = useState(true);
  const [filtersOpen, setFiltersOpen]                   = useState(false);
  const navigate = useNavigate();

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  };

  const fetchTrainers = async () => {
    try {
      const url = "http://localhost:8080/products/get-trainercard";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch trainers");
      const result = await response.json();
      const processedTrainers = result.map((trainer) => {
        let updatedRating = trainer.trainerRating;
        let reviewCount   = trainer.trainerReviews || 0;
        if (trainer.reviews?.length > 0) {
          updatedRating = calculateAverageRating(trainer.reviews);
          reviewCount   = trainer.reviews.length;
        } else if (trainer.trainerReviewsList?.length > 0) {
          updatedRating = calculateAverageRating(trainer.trainerReviewsList);
          reviewCount   = trainer.trainerReviewsList.length;
        }
        return { ...trainer, trainerRating: updatedRating, trainerReviews: reviewCount };
      });
      setTrainerCard(processedTrainers);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
    const interval = setInterval(fetchTrainers, 30000);
    return () => clearInterval(interval);
  }, []);

  const gotoProfile = (id) => navigate(`/profile/${id}`);

  const specializations = [...new Set(trainerCard.flatMap((t) => {
    if (Array.isArray(t.trainerTags)) return t.trainerTags;
    if (typeof t.trainerTags === "string") return t.trainerTags.split(",").map((s) => s.trim());
    return [];
  }))];

  const experiences = [...new Set(trainerCard.map((t) => t.trainerExperience || 0))].sort((a, b) => b - a);
  const ratings     = [...new Set(trainerCard.map((t) => Math.floor(parseFloat(t.trainerRating) || 0)))].sort((a, b) => b - a);

  const filteredTrainers = trainerCard.filter((trainer) => {
    const matchesSearch = trainer.trainerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trainer.trainerRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = !selectedSpecialization || (() => {
      if (Array.isArray(trainer.trainerTags)) return trainer.trainerTags.includes(selectedSpecialization);
      if (typeof trainer.trainerTags === "string") return trainer.trainerTags.split(",").map((s) => s.trim()).includes(selectedSpecialization);
      return false;
    })();
    const matchesExp  = !selectedExperience || String(trainer.trainerExperience) === selectedExperience;
    const matchesAvail = !selectedAvailability || trainer.trainerStatus === selectedAvailability;
    const matchesRating = !selectedRating || Math.floor(parseFloat(trainer.trainerRating) || 0) >= parseInt(selectedRating);
    return matchesSearch && matchesSpec && matchesExp && matchesAvail && matchesRating;
  });

  const clearFilters = () => {
    setSearchTerm(""); setSelectedSpecialization("");
    setSelectedExperience(""); setSelectedAvailability(""); setSelectedRating("");
  };

  const hasActiveFilters = searchTerm || selectedSpecialization || selectedExperience || selectedAvailability || selectedRating;

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #070710 0%, #0d0a14 50%, #080810 100%)" }}
    >
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #ef444488, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #a855f755, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: "linear-gradient(to right, #ef4444, transparent)" }} />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-red-500">Elite Coaching</span>
            </div>
            <h1
              className="font-black leading-none mb-6 text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              FIND YOUR
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradientShift 4s linear infinite",
                }}
              >
                PERFECT
              </span>
              TRAINER.
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-md mb-10">
              Connect with world-class fitness professionals who tailor every session to your goals, your pace, and your potential.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map(({ value, label, Icon }, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Icon size={18} className="text-red-500 mx-auto mb-2" strokeWidth={2} />
                  <p className="font-black text-white text-lg leading-none">{value}</p>
                  <p className="text-white/35 text-[10px] uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero visual */}
          <div className="relative w-full lg:w-[420px] flex-shrink-0 hidden md:block">
            <div
              className="relative rounded-3xl overflow-hidden h-[380px]"
              style={{
                background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(12,8,16,0.95))",
                border: "1px solid rgba(239,68,68,0.2)",
                boxShadow: "0 0 60px rgba(239,68,68,0.12)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=380&fit=crop"
                alt="Elite trainer"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 50%)" }} />

              {/* Floating badges */}
              <div
                className="absolute top-6 left-6 px-4 py-2.5 rounded-2xl"
                style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
              >
                <p className="text-xs font-black text-white">🏆 Top Rated</p>
                <p className="text-[10px] text-white/45">This month</p>
              </div>

              <div
                className="absolute top-6 right-6 px-4 py-2.5 rounded-2xl"
                style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)", backdropFilter: "blur(12px)" }}
              >
                <p className="text-xs font-black text-red-400">⚡ 500+ Active</p>
                <p className="text-[10px] text-white/45">Trainers online</p>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
                >
                  <p className="text-white font-black mb-1">Ready to start?</p>
                  <p className="text-white/45 text-xs mb-3">Book your first session in under 2 minutes.</p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-orange-500 border-2 border-black" />
                      ))}
                    </div>
                    <p className="text-white/50 text-xs">+500 trainers waiting</p>
                    <ArrowRight size={14} className="text-red-500 ml-auto" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH + FILTERS ── */}
      <section className="sticky top-16 z-20 px-4 sm:px-8 pb-6 max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-5 sm:p-6"
          style={{
            background: "rgba(10,10,18,0.9)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
          }}
        >
          {/* Search row */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                strokeWidth={2}
              />
              <input
                type="text"
                placeholder="Search by name, role, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white placeholder-white/25 outline-none transition-all duration-300 font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: searchTerm ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: searchTerm ? "0 0 20px rgba(239,68,68,0.1)" : "none",
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter toggle on mobile */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="sm:hidden flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                background: filtersOpen ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${filtersOpen ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: filtersOpen ? "#fca5a5" : "rgba(255,255,255,0.5)",
              }}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>

          {/* Filter dropdowns */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${filtersOpen || window.innerWidth >= 640 ? "block" : "hidden"} sm:grid`}
            style={{ display: filtersOpen ? "grid" : undefined }}
          >
            <FilterSelect
              label="Specialization"
              Icon={BarChart3}
              value={selectedSpecialization}
              onChange={setSelectedSpecialization}
              placeholder="All Specializations"
              options={specializations.map((s) => ({ value: s, label: s }))}
            />
            <FilterSelect
              label="Experience"
              Icon={Clock}
              value={selectedExperience}
              onChange={setSelectedExperience}
              placeholder="All Experience"
              options={experiences.map((e) => ({ value: String(e), label: `${e} years` }))}
            />
            <FilterSelect
              label="Availability"
              Icon={Users}
              value={selectedAvailability}
              onChange={setSelectedAvailability}
              placeholder="All Availability"
              options={[{ value: "Available", label: "Available" }, { value: "Unavailable", label: "Limited" }]}
            />
            <FilterSelect
              label="Rating"
              Icon={Star}
              value={selectedRating}
              onChange={setSelectedRating}
              placeholder="All Ratings"
              options={ratings.map((r) => ({ value: String(r), label: `${r}+ Stars` }))}
            />
          </div>

          {/* Results bar */}
          <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-black px-3 py-1 rounded-full"
                style={{ background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {filteredTrainers.length}
              </span>
              <span className="text-white/40 text-xs uppercase tracking-wider">trainers found</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                <RotateCcw size={12} strokeWidth={2.5} />
                Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── TRAINER GRID ── */}
      <section className="px-4 sm:px-8 pb-24 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl h-[480px] animate-pulse"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              />
            ))}
          </div>
        ) : filteredTrainers.length === 0 ? (
          <div
            className="rounded-3xl p-16 text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-white font-black text-2xl mb-2">No trainers found</p>
            <p className="text-white/40 text-sm mb-6">Try adjusting your filters or search term</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #ef4444, #b91c1c)", boxShadow: "0 6px 24px rgba(239,68,68,0.3)" }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.map((trainer, index) => (
              <TrainerCard
                key={trainer._id || index}
                trainer={trainer}
                onProfile={gotoProfile}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default Trainer;