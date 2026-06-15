import React, { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Activity, Zap, Target, Award, TrendingUp, Heart,
  Dumbbell, Flame, Apple, Moon, Sun, ChevronRight,
  BarChart2, Shield, Star, Users, CheckCircle, Ruler, Weight
} from 'lucide-react'

// ── lightweight fade-in on scroll ────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = '', from = 'bottom' }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const y = from === 'bottom' ? 28 : from === 'top' ? -28 : 0
    const x = from === 'left' ? -28 : from === 'right' ? 28 : 0
    el.style.opacity = '0'
    el.style.transform = `translate(${x}px,${y}px)`
    el.style.transition = `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translate(0,0)'; obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, from])
  return <div ref={ref} className={className}>{children}</div>
}

// ── animated counter ──────────────────────────────────────────────────────────
const Counter = ({ to, suffix = '', duration = 1400 }) => {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const end = parseFloat(to) || 0
      const step = (end / duration) * 16
      let cur = 0
      const tick = () => { cur += step; if (cur >= end) { setVal(end); return }; setVal(Math.floor(cur)); requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── BMI gauge arc (SVG) ───────────────────────────────────────────────────────
const BMIGauge = ({ bmi }) => {
  const val = Math.min(Math.max(parseFloat(bmi) || 0, 10), 40)
  // map 10–40 → 0–180 degrees
  const angle = ((val - 10) / 30) * 180
  const r = 70, cx = 90, cy = 90
  const toRad = (deg) => (deg * Math.PI) / 180
  const arcX = (deg) => cx + r * Math.cos(toRad(180 + deg))
  const arcY = (deg) => cy + r * Math.sin(toRad(180 + deg))

  const needle = {
    x: cx + (r - 10) * Math.cos(toRad(180 + angle)),
    y: cy + (r - 10) * Math.sin(toRad(180 + angle)),
  }

  const segments = [
    { start: 0, end: 51, color: '#facc15' },   // underweight
    { start: 51, end: 108, color: '#22c55e' },  // normal
    { start: 108, end: 144, color: '#f97316' }, // overweight
    { start: 144, end: 180, color: '#ef4444' }, // obese
  ]

  const describeArc = (startDeg, endDeg) => {
    const x1 = arcX(startDeg), y1 = arcY(startDeg)
    const x2 = arcX(endDeg), y2 = arcY(endDeg)
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`
  }

  return (
    <svg viewBox="0 0 180 100" className="w-full max-w-[220px] mx-auto">
      {/* track */}
      <path d={`M ${arcX(0)} ${arcY(0)} A ${r} ${r} 0 0 1 ${arcX(180)} ${arcY(180)}`}
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" strokeLinecap="round" />
      {/* coloured segments */}
      {segments.map((s, i) => (
        <path key={i} d={describeArc(s.start, s.end)}
          fill="none" stroke={s.color} strokeWidth="10" strokeLinecap="round" opacity="0.85" />
      ))}
      {/* needle */}
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y}
        stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill="white" />
      {/* labels */}
      <text x="20" y="98" fill="#facc15" fontSize="7" fontWeight="bold">Low</text>
      <text x="78" y="26" fill="#22c55e" fontSize="7" fontWeight="bold">Normal</text>
      <text x="138" y="98" fill="#ef4444" fontSize="7" fontWeight="bold">High</text>
    </svg>
  )
}

// ════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════
const BMICalculator = () => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('')
  const [bmi, setBmi] = useState('')
  const [revealed, setRevealed] = useState(false)

  // ── exact original logic ─────────────────────────────────────────
  const calculatebmi = (e) => {
    e.preventDefault()
    if (!height || !weight || !gender) {
      toast.error('Please enter valid height, weight, and gender')
      return
    }
    const heightInMeter = height / 100
    const bmiValue = (weight / (heightInMeter * heightInMeter)).toFixed(2)
    setBmi(bmiValue)
    setRevealed(false)
    setTimeout(() => setRevealed(true), 60)

    const bmiNumber = parseFloat(bmiValue)
    if (bmiNumber < 18.5) toast.warning('You are underweight')
    else if (bmiNumber >= 18.5 && bmiNumber < 24.9) toast.success('You are fit')
    else if (bmiNumber >= 25 && bmiNumber < 29.9) toast.warning('You are overweight')
    else toast.error('You are in the obesity range')
  }

  const getBMICategory = (bmiValue) => {
    const n = parseFloat(bmiValue)
    if (n < 18.5) return { category: 'Underweight', color: 'text-yellow-400', bg: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/30', dot: 'bg-yellow-400' }
    if (n < 24.9) return { category: 'Normal Weight', color: 'text-green-400', bg: 'from-green-500/20 to-green-600/10', border: 'border-green-500/30', dot: 'bg-green-400' }
    if (n < 29.9) return { category: 'Overweight', color: 'text-orange-400', bg: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30', dot: 'bg-orange-400' }
    return { category: 'Obesity', color: 'text-red-400', bg: 'from-red-500/20 to-red-600/10', border: 'border-red-500/30', dot: 'bg-red-400' }
  }

  const getInsights = (bmiValue) => {
    const n = parseFloat(bmiValue)
    const h = parseFloat(height) / 100
    const idealMin = (18.5 * h * h).toFixed(1)
    const idealMax = (24.9 * h * h).toFixed(1)

    if (n < 18.5) return {
      calories: '2200–2800 kcal/day',
      idealRange: `${idealMin}–${idealMax} kg`,
      fitness: 'Focus on strength training & calorie surplus',
      diet: 'High-protein meals, healthy fats, complex carbs',
      workout: '3–4x/week: compound lifts, resistance training',
      message: 'Your body needs more fuel. Start with a balanced diet and progressive strength training to reach a healthy weight.',
    }
    if (n < 24.9) return {
      calories: '1800–2200 kcal/day',
      idealRange: `${idealMin}–${idealMax} kg`,
      fitness: 'Maintain with balanced training & nutrition',
      diet: 'Balanced macros: protein, carbs, healthy fats',
      workout: '4–5x/week: mix of cardio & strength',
      message: 'Excellent! You\'re in the healthy range. Keep up your routine and maintain this lifestyle for long-term wellness.',
    }
    if (n < 29.9) return {
      calories: '1500–1800 kcal/day',
      idealRange: `${idealMin}–${idealMax} kg`,
      fitness: 'Cardio + strength training for fat loss',
      diet: 'Calorie deficit, high protein, low refined sugar',
      workout: '5x/week: HIIT, walking, weight training',
      message: 'You\'re close! A slight calorie deficit with consistent exercise will get you to your ideal range.',
    }
    return {
      calories: '1200–1500 kcal/day',
      idealRange: `${idealMin}–${idealMax} kg`,
      fitness: 'Low-impact cardio & medical consultation',
      diet: 'Whole foods, avoid processed & sugary foods',
      workout: '30 min daily walk, swimming, cycling',
      message: 'Every journey starts with a single step. Consult a healthcare provider and begin with low-impact movement.',
    }
  }

  const catData = bmi ? getBMICategory(bmi) : null
  const insights = bmi ? getInsights(bmi) : null

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/60 focus:bg-white/8 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-60 -left-40 w-[500px] h-[500px] bg-red-700/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section className="pt-20 pb-12 px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-semibold mb-8">
              <Activity className="w-3.5 h-3.5" />
              AI-Powered Fitness Analysis
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-5 max-w-4xl mx-auto">
              Know Your Body{' '}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                Better
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Calculate your BMI instantly and get personalized health insights to track your fitness journey.
            </p>
          </FadeIn>

          {/* hero stat strip */}
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-14 mb-4">
              {[
                { val: 500000, suffix: '+', label: 'Calculations Done' },
                { val: 98, suffix: '%', label: 'Accuracy Rate' },
                { val: 50, suffix: 'K+', label: 'Happy Users' },
                { val: 4.9, suffix: '★', label: 'App Rating' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black text-white"><Counter to={s.val} suffix={s.suffix} /></div>
                  <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ══════════════════════════════════════════════
            MAIN CALCULATOR
        ══════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-4 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── LEFT: Form ── */}
            <FadeIn from="left">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm h-full flex flex-col">
                <h2 className="text-2xl font-black mb-1">Enter Your Details</h2>
                <p className="text-white/40 text-sm mb-7">Fill in your measurements for an accurate result.</p>

                <div className="space-y-5 flex-1">
                  {/* Height */}
                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest mb-2">
                      <Ruler className="w-3.5 h-3.5 text-red-400" /> Height (cm)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 175"
                      className={inputCls}
                      min="1" max="300"
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest mb-2">
                      <Activity className="w-3.5 h-3.5 text-rose-400" /> Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 70"
                      className={inputCls}
                      min="1" max="500"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest mb-2">
                      <Users className="w-3.5 h-3.5 text-orange-400" /> Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={inputCls + ' cursor-pointer'}
                    >
                      <option value="" className="bg-[#111]">Select Gender</option>
                      <option value="Male" className="bg-[#111]">Male</option>
                      <option value="Female" className="bg-[#111]">Female</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="button"
                    onClick={calculatebmi}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-black text-sm tracking-widest uppercase hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all active:scale-95 mt-2"
                  >
                    Calculate BMI
                  </button>
                </div>

                {/* BMI Categories legend */}
                <div className="mt-8 pt-6 border-t border-white/8">
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-3">BMI Reference</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: 'Underweight', range: '< 18.5', color: 'bg-yellow-400' },
                      { label: 'Normal', range: '18.5–24.9', color: 'bg-green-400' },
                      { label: 'Overweight', range: '25–29.9', color: 'bg-orange-400' },
                      { label: 'Obesity', range: '≥ 30', color: 'bg-red-500' },
                    ].map((c, i) => (
                      <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-3 text-center">
                        <div className={`w-2 h-2 ${c.color} rounded-full mx-auto mb-1.5`} />
                        <p className="text-white text-xs font-semibold">{c.label}</p>
                        <p className="text-white/30 text-[10px]">{c.range}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── RIGHT: Result / Illustration ── */}
            <FadeIn from="right">
              {bmi && revealed ? (
                <div className={`bg-gradient-to-br ${catData.bg} border ${catData.border} rounded-2xl p-6 sm:p-8 backdrop-blur-sm h-full flex flex-col gap-6`}>
                  {/* Score */}
                  <div className="text-center">
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Your BMI Score</p>
                    <div className="text-7xl font-black text-white mb-1">{bmi}</div>
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${catData.border} bg-white/5 text-sm font-bold ${catData.color}`}>
                      <span className={`w-2 h-2 rounded-full ${catData.dot}`} />
                      {catData.category}
                    </div>
                  </div>

                  {/* Gauge */}
                  <BMIGauge bmi={bmi} />

                  {/* Message */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/70 leading-relaxed text-center">
                    {insights.message}
                  </div>

                  {/* Gender & quick info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                      <p className="text-white/30 text-xs mb-1">Gender</p>
                      <p className="font-bold text-sm">{gender}</p>
                    </div>
                    <div className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                      <p className="text-white/30 text-xs mb-1">Ideal Range</p>
                      <p className={`font-bold text-sm ${catData.color}`}>{insights.idealRange}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* placeholder when no result yet */
                <div className="bg-white/3 border border-white/8 rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center gap-6">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-600/30 to-rose-400/20 flex items-center justify-center mx-auto">
                      <Activity className="w-14 h-14 text-red-400/60" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">Stay Healthy</h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
                      Enter your details and calculate your BMI to get a full health breakdown and personalized recommendations.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { icon: <Heart className="w-4 h-4 text-red-400" />, label: 'Heart Health' },
                      { icon: <Flame className="w-4 h-4 text-orange-400" />, label: 'Fat Burn' },
                      { icon: <Shield className="w-4 h-4 text-blue-400" />, label: 'Immunity' },
                    ].map((b, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                        {b.icon} {b.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            HEALTH INSIGHTS (shown only after calculation)
        ══════════════════════════════════════════════ */}
        {bmi && insights && (
          <section className="max-w-6xl mx-auto px-4 mb-14">
            <FadeIn>
              <p className="text-red-400 text-xs uppercase tracking-widest font-semibold mb-2 text-center">Personalized For You</p>
              <h2 className="text-3xl font-black text-center mb-8">Health Insights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: <Flame className="w-5 h-5 text-orange-400" />, title: 'Daily Calories', val: insights.calories, color: 'from-orange-500/10 to-red-500/10 border-orange-500/20' },
                  { icon: <Target className="w-5 h-5 text-green-400" />, title: 'Ideal Weight', val: insights.idealRange, color: 'from-green-500/10 to-emerald-500/10 border-green-500/20' },
                  { icon: <Apple className="w-5 h-5 text-red-400" />, title: 'Diet Plan', val: insights.diet, color: 'from-red-500/10 to-rose-500/10 border-red-500/20' },
                  { icon: <Dumbbell className="w-5 h-5 text-blue-400" />, title: 'Workout', val: insights.workout, color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' },
                ].map((c, i) => (
                  <FadeIn key={i} delay={i * 0.07}>
                    <div className={`bg-gradient-to-br ${c.color} border rounded-2xl p-5 hover:-translate-y-1 transition-all backdrop-blur-sm h-full`}>
                      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-3">{c.icon}</div>
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{c.title}</p>
                      <p className="text-white font-semibold text-sm leading-snug">{c.val}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </section>
        )}

        {/* ══════════════════════════════════════════════
            FEATURE CARDS
        ══════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-4 mb-14">
          <FadeIn>
            <p className="text-red-400 text-xs uppercase tracking-widest font-semibold mb-2 text-center">Why FitPro</p>
            <h2 className="text-3xl font-black text-center mb-8">Everything You Need</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Heart className="w-6 h-6 text-red-400" />, title: 'Healthy Lifestyle', desc: 'Evidence-based health tracking tailored to your unique body metrics.', color: 'from-red-500/10 to-rose-500/10 border-red-500/20' },
              { icon: <BarChart2 className="w-6 h-6 text-blue-400" />, title: 'Track Progress', desc: 'Monitor changes over time and celebrate every fitness milestone.', color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' },
              { icon: <Award className="w-6 h-6 text-yellow-400" />, title: 'Expert Guidance', desc: 'Insights developed by certified nutritionists and personal trainers.', color: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20' },
              { icon: <Apple className="w-6 h-6 text-green-400" />, title: 'Nutrition Support', desc: 'Personalized diet recommendations aligned with your BMI category.', color: 'from-green-500/10 to-emerald-500/10 border-green-500/20' },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className={`bg-gradient-to-br ${c.color} border rounded-2xl p-6 hover:-translate-y-1 transition-all backdrop-blur-sm group cursor-default h-full`}>
                  <div className="w-11 h-11 rounded-xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center mb-4 transition-colors">{c.icon}</div>
                  <h3 className="font-black text-base mb-2">{c.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-white/30 group-hover:text-white/60 transition-colors text-xs font-semibold">
                    Learn more <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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
                <Zap className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl font-black mb-3">Start Your Transformation</h2>
                <p className="text-white/50 text-base mb-8 max-w-lg mx-auto leading-relaxed">
                  Your health journey begins with a single measurement. Calculate, track, and transform — starting today.
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all"
                >
                  <Activity className="w-4 h-4" /> Calculate My BMI
                </button>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default BMICalculator