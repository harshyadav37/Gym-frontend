import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Dumbbell,
  Home,
  LayoutGrid,
  Activity,
  Users,
  Image,
  CreditCard,
  Mail,
  LogIn,
  LogOut,
  User,
  X,
  Menu,
  Instagram,
  Youtube,
  Twitter,
  ChevronRight,
  Zap,
} from 'lucide-react'
import LogoutButton from './LogoutButton'

// ─── NAV LINKS CONFIG ─────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: 'Home',       path: '/',            Icon: Home },
  { name: 'Programs',   path: '/programs',    Icon: LayoutGrid },
  { name: 'BMI',        path: '/bmi-checker', Icon: Activity },
  { name: 'Trainers',   path: '/trainers',    Icon: Users },
  // { name: 'Gallery',    path: '/gallery',     Icon: Image },
  // { name: 'Membership', path: '/membership',  Icon: CreditCard },
  { name: 'Contact',    path: '/contact',     Icon: Mail },
]

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
      {/* Icon mark */}
      <div className="relative">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            boxShadow: '0 0 0 0 rgba(239,68,68,0.4)',
            animation: 'logoPulse 3s ease-in-out infinite',
          }}
        >
          <Dumbbell size={20} className="text-white" strokeWidth={2.5} />
        </div>
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: '0 0 24px rgba(239,68,68,0.5)', borderRadius: '0.75rem' }}
        />
      </div>

      {/* Wordmark */}
      <div className="leading-none">
        <div className="flex items-baseline gap-1">
          <span className="font-black text-xl text-white tracking-widest uppercase">FIT</span>
          <span
            className="font-black text-xl tracking-widest uppercase"
            style={{
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ZONE
          </span>
        </div>
        <p className="text-[10px] text-white/35 font-medium tracking-[0.2em] uppercase mt-0.5">
          Elite Training
        </p>
      </div>
    </Link>
  )
}

// ─── DESKTOP NAV LINK ─────────────────────────────────────────────────────────

function DesktopNavLink({ link, onHover }) {
  const ref = useRef(null)
  return (
    <NavLink
      ref={ref}
      to={link.path}
      end={link.path === '/'}
      onMouseEnter={() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          onHover({ left: rect.left, width: rect.width, visible: true })
        }
      }}
      className={({ isActive }) =>
        `relative text-xs font-bold uppercase tracking-[0.12em] py-1 transition-colors duration-200 whitespace-nowrap ${
          isActive ? 'text-white' : 'text-white/50 hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {link.name}
          {/* Active dot */}
          {isActive && (
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
              style={{ background: '#ef4444' }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

// ─── MAIN NAVBAR ──────────────────────────────────────────────────────────────

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })
  const navRef = useRef(null)

  // Hide on signup
  const hideNavbarRoutes = ['/signup']
  if (hideNavbarRoutes.includes(location.pathname)) return null

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavLeave = useCallback(() => {
    setIndicator(prev => ({ ...prev, visible: false }))
  }, [])

  return (
    <>
      {/* ── DESKTOP / TABLET HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(8,8,12,0.92)'
            : 'linear-gradient(to bottom, rgba(240, 240, 246, 0.8) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'blur(0px)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-10">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav
              ref={navRef}
              className="hidden lg:flex items-center gap-7 xl:gap-9 relative"
              onMouseLeave={handleNavLeave}
            >
              {NAV_LINKS.map(link => (
                <DesktopNavLink
                  key={link.path}
                  link={link}
                  onHover={({ left, width, visible }) => {
                    if (navRef.current) {
                      const navRect = navRef.current.getBoundingClientRect()
                      setIndicator({ left: left - navRect.left, width, visible })
                    }
                  }}
                />
              ))}

              {/* Sliding hover indicator */}
              <div
                className="absolute -bottom-1 h-px rounded-full pointer-events-none transition-all duration-300"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  background: 'linear-gradient(90deg, transparent, #ef4444, transparent)',
                  opacity: indicator.visible ? 1 : 0,
                  transform: indicator.visible ? 'scaleX(1)' : 'scaleX(0.3)',
                  boxShadow: '0 0 8px rgba(239,68,68,0.7)',
                  transitionProperty: 'left, width, opacity, transform',
                }}
              />
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Login */}
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all duration-200 hover:bg-white/5"
              >
                <LogIn size={14} strokeWidth={2.5} />
                Login
              </button>

              {/* Join Now */}
              <button
                onClick={() => navigate('/join')}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-white overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                  boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
                }}
              >
                {/* Shimmer */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                />
                <Zap size={13} strokeWidth={3} className="relative z-10" />
                <span className="relative z-10">Join Now</span>
              </button>

              {/* Logout */}
              <div className="border-l border-white/10 pl-3">
                <LogoutButton />
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/8 transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} />
            </button>

          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] transition-all duration-400 lg:hidden"
        style={{
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: mobileOpen ? 'blur(8px)' : 'blur(0px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-sm flex flex-col lg:hidden"
        style={{
          background: 'linear-gradient(160deg, rgba(14,14,22,0.99) 0%, rgba(10,6,12,0.99) 100%)',
          borderLeft: '1px solid rgba(239,68,68,0.15)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.8)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Logo />
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Close menu"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMobileOpen(false)}
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(24px)',
                transition: `opacity 0.4s ease ${0.05 + i * 0.05}s, transform 0.4s ease ${0.05 + i * 0.05}s`,
              }}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-red-600/15 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isActive ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                        border: isActive ? '1px solid rgba(239,68,68,0.35)' : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <link.Icon
                        size={14}
                        strokeWidth={2}
                        style={{ color: isActive ? '#ef4444' : 'inherit' }}
                      />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">{link.name}</span>
                  </div>
                  <ChevronRight
                    size={14}
                    strokeWidth={2.5}
                    className={`transition-all duration-200 ${isActive ? 'opacity-100 text-red-500' : 'opacity-0 group-hover:opacity-50'}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Drawer footer actions */}
        <div
          className="px-4 py-6 space-y-3"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s',
          }}
        >
          {/* Join Now */}
          <button
            onClick={() => { setMobileOpen(false); navigate('/join') }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all duration-200 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
              boxShadow: '0 6px 24px rgba(239,68,68,0.35)',
            }}
          >
            <Zap size={15} strokeWidth={3} />
            Join Now
          </button>

          {/* Login */}
          <button
            onClick={() => { setMobileOpen(false); navigate('/login') }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest text-white/60 hover:text-white transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <LogIn size={14} strokeWidth={2.5} />
            Login
          </button>

          {/* Logout */}
          <div className="pt-1">
            <LogoutButton />
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-4 pt-3">
            {[
              { Icon: Instagram, href: '#' },
              { Icon: Youtube, href: '#' },
              { Icon: Twitter, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-white/30 hover:text-white transition-all duration-200 hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Social link"
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-center text-white/20 text-[10px] uppercase tracking-[0.2em] pt-1">
            Transform · Elevate · Conquer
          </p>
        </div>
      </div>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
        }
      `}</style>
    </>
  )
}

export default Navbar