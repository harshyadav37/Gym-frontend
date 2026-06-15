import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillsInfo } from "../../constants";

// ─── Animation Variants ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const heroText = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Decorative Blur Orb ───────────────────────────────────────────────────
const Orb = ({ className }) => (
  <div
    className={`absolute rounded-full pointer-events-none blur-3xl opacity-20 ${className}`}
  />
);

// ─── Image Card ────────────────────────────────────────────────────────────
const GalleryCard = ({ item, index }) => (
  <motion.div
    custom={index}
    variants={cardVariant}
    initial="hidden"
    animate="visible"
    className="group relative rounded-2xl overflow-hidden cursor-pointer
               shadow-[0_4px_32px_rgba(0,0,0,0.5)]
               border border-white/5
               hover:border-amber-400/30
               transition-all duration-500"
    style={{ background: "rgba(18,18,20,0.8)" }}
  >
    {/* Image */}
    <div className="relative h-64 overflow-hidden">
      <img
        src={item.logo}
        alt={item.name}
        className="w-full h-full object-cover
                   transition-transform duration-700 ease-out
                   group-hover:scale-110"
      />

      {/* Permanent bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-black/40 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Hover title */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4
                      translate-y-4 opacity-0
                      group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-400 ease-out"
      >
        <p className="text-white font-semibold text-base tracking-wide drop-shadow">
          {item.name}
        </p>
        <div className="mt-1 h-px w-8 bg-amber-400 rounded-full" />
      </div>
    </div>

    {/* Glass bottom strip */}
    <div
      // className="px-4 py-3 flex items-center justify-between
      //               bg-white/[0.03] backdrop-blur-sm border-t border-white/5"
    >
      {/* <span className="text-zinc-400 text-xs font-medium tracking-wider uppercase">
        {item.name}
      </span> */}
      {/* <svg
        className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100
                      -translate-x-2 group-hover:translate-x-0
                      transition-all duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg> */}
    </div>
  </motion.div>
);

// ─── Category Icon Map (simple SVG icons by keyword) ──────────────────────
const CategoryIcon = ({ title }) => {
  const t = title?.toLowerCase() ?? "";
  if (t.includes("strength") || t.includes("weight"))
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M6.5 6.5h11M6.5 17.5h11M3 12h18M6 9v6M18 9v6" />
      </svg>
    );
  if (t.includes("yoga") || t.includes("flex"))
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="5" r="1.5" /><path strokeLinecap="round" d="M6 8c2 0 4 1 6 3 2-2 4-3 6-3M9 14l-3 5M15 14l3 5M9 14c1 2 1.5 3.5 3 5 1.5-1.5 2-3 3-5" />
      </svg>
    );
  if (t.includes("cardio") || t.includes("run"))
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M13 5.5a2 2 0 100-4 2 2 0 000 4zM5 12l2-4 4 2 3-4 4 6M3 18h18" />
      </svg>
    );
  // default
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" d="M12 3l3.09 6.26L22 10.27l-5 4.87 1.18 6.88L12 18.77l-6.18 3.25L7 15.14 2 10.27l6.91-1.01z" />
    </svg>
  );
};

// ─── Section Header ────────────────────────────────────────────────────────
const SectionHeader = ({ title, index: sIdx }) => (
  <motion.div
    custom={0}
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    className="flex items-center gap-4 mb-10"
  >
    <div
      className="flex items-center justify-center w-10 h-10 rounded-xl
                    bg-gradient-to-br from-amber-400/20 to-amber-600/10
                    border border-amber-400/20 text-amber-400"
    >
      <CategoryIcon title={title} />
    </div>
    <div>
      <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-0.5">
        Collection {String(sIdx + 1).padStart(2, "0")}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
        {title} 
      </h2>
    </div>
    <div className="flex-1 h-px bg-gradient-to-r from-amber-400/20 to-transparent ml-4 hidden sm:block" />
  </motion.div>
);

// ─── Pagination Button ─────────────────────────────────────────────────────
const PageBtn = ({ children, active, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative w-10 h-10 rounded-full font-bold text-sm
      transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
      ${
        active
          ? "text-black shadow-[0_0_18px_rgba(251,191,36,0.55)] scale-110"
          : disabled
          ? "text-zinc-600 cursor-not-allowed bg-zinc-900"
          : "text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white hover:scale-105"
      }
    `}
    style={
      active
        ? { background: "linear-gradient(135deg,#f59e0b,#d97706)" }
        : undefined
    }
  >
    {children}
    {active && (
      <span className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
    )}
  </button>
);

// ─── Prev / Next Button ────────────────────────────────────────────────────
const NavBtn = ({ onClick, disabled, direction }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.06, x: direction === "next" ? 3 : -3 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
      transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
      ${
        disabled
          ? "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
          : "bg-zinc-800 text-white border border-zinc-700 hover:border-amber-400/40 hover:text-amber-300"
      }
    `}
  >
    {direction === "prev" && (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    )}
    {direction === "prev" ? "Previous" : "Next"}
    {direction === "next" && (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    )}
  </motion.button>
);

// ─── Main Gallery Component ────────────────────────────────────────────────
const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const categoriesPerPage = 2;
  const totalPages = Math.ceil(SkillsInfo.length / categoriesPerPage);

  const currentCategories = SkillsInfo.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ behavior: "smooth" });
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(160deg,#0a0a0c 0%,#111113 60%,#0d0c0e 100%)" }}
    >
      {/* ── Decorative orbs ─────────────────────────────────────────────── */}
      <Orb className="w-96 h-96 bg-amber-500 top-[-8rem] left-[-8rem]" />
      <Orb className="w-72 h-72 bg-orange-600 top-[30%] right-[-6rem]" />
      <Orb className="w-64 h-64 bg-amber-700 bottom-[20%] left-[10%]" />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,1) 1px,transparent 1px),linear-gradient(90deg,rgba(251,191,36,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.p
            custom={0}
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="text-amber-400 text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Elite Fitness Program
          </motion.p>

          <motion.h1
            custom={1}
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6"
          >
            <span
              style={{
                background: "linear-gradient(135deg,#ffffff 20%,#f59e0b 60%,#d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sculpt Your
            </span>
            <br />
            <span className="text-white">Legacy</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-8"
          >
            Curated training collections built for athletes who refuse to settle.
            Every movement. Every rep. Every result.
          </motion.p>

          <motion.div
            custom={3}
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
            <span className="text-zinc-500 text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0a0a0c]" />
      </div>

      {/* ── Category Sections ────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {currentCategories.map((category, sIdx) => (
            <section
              key={sIdx}
              className="max-w-6xl mx-auto px-6 py-12 relative"
            >
              {/* Glass panel background */}
              <div
                className="absolute inset-0 mx-3 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(255,255,255,0.025) 0%,rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              />

              <div className="relative">
                <SectionHeader title={category.title} index={sIdx} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {category.skills.map((item, idx) => (
                    <GalleryCard key={idx} item={item} index={idx} />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 my-4">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      {/* ── Pagination ───────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex justify-center items-center gap-3 pb-20 pt-6"
      >
        <NavBtn
          direction="prev"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        />

        {Array.from({ length: totalPages }, (_, i) => (
          <PageBtn
            key={i}
            active={currentPage === i + 1}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </PageBtn>
        ))}

        <NavBtn
          direction="next"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        />
      </motion.div>
    </div>
  );
};

export default Gallery;