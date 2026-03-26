"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ArrowLeft, Brain, Film, Leaf, BarChart3, ShoppingBag, Shield, TrendingUp, Zap, Mic, Bot, Star, Calendar, Mail, MessageSquare, Phone, Lock, Eye, Cpu, Server, Fingerprint, KeyRound } from 'lucide-react'

// ==========================================
// CELEBRATION OVERLAY (Logo Easter Egg)
// ==========================================
const CelebrationOverlay = ({ isVisible, onComplete }: { isVisible: boolean; onComplete: () => void }) => {
  const [showJustKidding, setShowJustKidding] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer1 = setTimeout(() => setShowJustKidding(true), 2000)
      const timer2 = setTimeout(() => {
        onComplete()
        setShowJustKidding(false)
      }, 4000)
      return () => { clearTimeout(timer1); clearTimeout(timer2) }
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-gradient-to-br from-yellow-400 to-orange-500 flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][i % 5],
              left: `${Math.random() * 100}%`,
              top: '-10px'
            }}
            animate={{ y: '110vh', rotate: 360, x: [0, Math.random() * 100 - 50] }}
            transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </div>
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} className="text-black font-bold text-4xl md:text-6xl text-center mb-4">
        {showJustKidding ? "JUST KIDDING!" : "CONGRATULATIONS! YOU ARE..."}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black font-semibold text-xl md:text-2xl text-center">
        {showJustKidding ? "Welcome to Everything Under the Sun!" : "THE LUCKIEST PERSON ALIVE!"}
      </motion.div>
    </motion.div>
  )
}

// ==========================================
// RETRO FILM COUNTDOWN
// ==========================================
const FilmCountdown = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(3)
  const [showEverything, setShowEverything] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count > 1) {
        setCount(count - 1)
      } else if (count === 1) {
        setCount(0)
        setTimeout(() => {
          setShowEverything(true)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 300)
          }, 1000)
        }, 800)
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [count, onComplete])

  if (isComplete) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      style={{ background: 'radial-gradient(circle, #1a1a1a 0%, #000000 100%)' }}
    >
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
      }} />
      <AnimatePresence mode="wait">
        {count > 0 && (
          <motion.div key={count} initial={{ scale: 0, rotate: -180, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", exit: { duration: 0.2 } }}
            className="text-white font-bold text-8xl md:text-[12rem] leading-none"
            style={{ fontFamily: 'Impact, Arial Black, sans-serif', textShadow: '0 0 30px rgba(255,255,255,0.5)', filter: 'contrast(1.2)' }}
          >{count}</motion.div>
        )}
        {count === 0 && !showEverything && (
          <motion.div initial={{ scale: 0, rotate: 0 }} animate={{ scale: [0, 1, 1], rotate: [0, 360, 720] }}
            transition={{ duration: 0.8, times: [0, 0.3, 1], ease: "easeOut" }} className="w-24 h-24 md:w-32 md:h-32">
            <div className="w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"
              style={{ boxShadow: '0 0 20px rgba(255,255,255,0.5)', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }} />
          </motion.div>
        )}
        {showEverything && (
          <motion.div initial={{ scale: 0, opacity: 0, rotateY: -90 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="text-[#f3e700] font-bold text-6xl md:text-8xl leading-none tracking-wider"
            style={{ fontFamily: 'Impact, Arial Black, sans-serif', textShadow: '0 0 40px rgba(243, 231, 0, 0.8)', filter: 'contrast(1.2)' }}>
            EVERYTHING
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ==========================================
// LIBERTAD AI COMBO LOCK PORTAL
// ==========================================
const LibertadPortal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [combo, setCombo] = useState(['', '', '', '', '', ''])
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) return
    const sanitized = value.replace(/[^a-zA-Z0-9]/g, '')
    const newCombo = [...combo]
    newCombo[index] = sanitized.toUpperCase()
    setCombo(newCombo)
    setError(false)
    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !combo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleUnlock = () => {
    const code = combo.join('')
    if (code.length !== 6) {
      setError(true)
      return
    }
    setIsUnlocking(true)
    setTimeout(() => {
      // Redirect to LibertadAI with the access code
      window.open(`https://libertadai.com/portal?code=${encodeURIComponent(code)}`, '_blank', 'noopener,noreferrer')
      setIsUnlocking(false)
      setUnlocked(true)
      setTimeout(() => {
        onClose()
        setCombo(['', '', '', '', '', ''])
        setUnlocked(false)
      }, 2000)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.8, opacity: 0, rotateY: -30 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.8, opacity: 0 }} transition={{ type: 'spring', damping: 20 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 md:p-10 max-w-md w-full border border-yellow-500/30 shadow-2xl shadow-yellow-500/10"
          onClick={e => e.stopPropagation()}>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Lock className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Secure Portal</h3>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {unlocked ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-8">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}
                className="text-6xl mb-4">🔓</motion.div>
              <p className="text-green-400 font-bold text-lg">Access Granted</p>
              <p className="text-gray-400 text-sm mt-2">Redirecting to LibertadAI...</p>
            </motion.div>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-2 text-center">Enter your 6-character access code</p>
              <p className="text-gray-500 text-xs mb-6 text-center">Provided by EUtS for secure document access</p>

              <div className="flex justify-center gap-2 md:gap-3 mb-6">
                {combo.map((digit, i) => (
                  <motion.input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-11 h-14 md:w-12 md:h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-300 bg-gray-900/50 text-white focus:outline-none ${
                      error ? 'border-red-500 shake' : digit ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' : 'border-gray-600 focus:border-yellow-400'
                    }`}
                    animate={error ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    autoComplete="off"
                    inputMode="text"
                  />
                ))}
              </div>

              {error && <p className="text-red-400 text-xs text-center mb-4">Please enter all 6 characters</p>}

              <button onClick={handleUnlock} disabled={isUnlocking}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:from-gray-600 disabled:to-gray-700 text-black disabled:text-gray-400 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                {isUnlocking ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" /><span>Verifying...</span></>
                ) : (
                  <><KeyRound size={18} /><span>Unlock Portal</span></>
                )}
              </button>

              <div className="mt-6 pt-4 border-t border-gray-700/50 text-center">
                <p className="text-gray-500 text-xs">Powered by <a href="https://libertadai.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400/70 hover:text-yellow-400 transition-colors">LibertadAI</a></p>
                <p className="text-gray-600 text-xs mt-1">End-to-end encrypted · Zero-knowledge access</p>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ==========================================
// CONTACT MODAL — WIRED TO NETLIFY FORMS
// ==========================================
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', purpose: '', details: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)

  const sanitize = (input: string) => input.replace(/<[^>]*>/g, '').replace(/[<>'"]/g, '').trim().slice(0, 1000)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const sanitizedData = {
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      company: sanitize(formData.company),
      purpose: sanitize(formData.purpose),
      details: sanitize(formData.details),
    }

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...sanitizedData,
        }).toString(),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setFormData({ name: '', email: '', company: '', purpose: '', details: '' })
          setSubmitStatus(null)
        }, 2500)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Let&apos;s Connect</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
          </div>

          {submitStatus === 'success' && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Thank you! We&apos;ll be in touch soon.
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Sorry, something went wrong. Please email us directly at wave@everythingis.online
            </motion.div>
          )}

          {/* Hidden form for Netlify to detect */}
          <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="text" name="company" />
            <input type="text" name="purpose" />
            <textarea name="details" />
          </form>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="form-name" value="contact" />
            <div className="hidden"><input name="bot-field" tabIndex={-1} autoComplete="off" /></div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-gray-900"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={isSubmitting} maxLength={100} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-gray-900"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isSubmitting} maxLength={200} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-gray-900"
                value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} disabled={isSubmitting} maxLength={200} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Contact *</label>
              <select required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-gray-900"
                value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} disabled={isSubmitting}>
                <option value="">Select a purpose</option>
                <option value="ai-consulting">AI/ML Consulting</option>
                <option value="revenue-growth">Revenue Growth Strategy</option>
                <option value="digital-sovereignty">Digital Sovereignty & Security</option>
                <option value="film-production">Film & Music Production</option>
                <option value="marketing">Marketing & Brand Strategy</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="investment">Investment Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none transition-colors text-gray-900"
                placeholder="Tell us about your project, goals, or how we can help..."
                value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} disabled={isSubmitting} maxLength={2000} />
            </div>
            <button type="submit" disabled={isSubmitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-bold py-3 px-4 rounded-md transition-colors disabled:cursor-not-allowed">
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isPortalOpen, setIsPortalOpen] = useState(false)
  const [headerText, setHeaderText] = useState('EVERYTHING')
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)
  const [showCountdown, setShowCountdown] = useState(true)
  const [siteLoaded, setSiteLoaded] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const { scrollYProgress } = useScroll()

  const rotatingWords = ['EVERYTHING', 'STRATEGY', 'CREATING', 'OPTIMIZING', 'MONETIZING', 'TECHNOLOGY', 'ENTERTAINMENT', 'SOVEREIGNTY']

  useEffect(() => {
    if (!siteLoaded) return
    let index = 0
    const intervalId = setInterval(() => {
      index = (index + 1) % rotatingWords.length
      setHeaderText(rotatingWords[index])
    }, 5000)
    return () => clearInterval(intervalId)
  }, [siteLoaded])

  const handleCountdownComplete = () => {
    setShowCountdown(false)
    setTimeout(() => setSiteLoaded(true), 100)
  }

  const handleLogoClick = () => setShowCelebration(true)

  const handleCelebrationComplete = () => {
    setShowCelebration(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  // ---- DATA ----
  const services = [
    { name: "AI R&D Studio Lab", description: "Predictive AI/ML R&D Anticipating Trends, Brand Customization & Award Winning Consulting", icon: Brain },
    { name: "Film & Music Production", description: "Film, Music & Digital Content Production Studio and Elite Talent Management", icon: Film },
    { name: "Sustainable Tech Initiative", description: "Eco-conscious Disruptor Technology launching visionary solutions from Conception to Market", icon: Leaf },
    { name: "Marketing Strategy & Ad Creation", description: "Creative Hub Proving Superior Personalized Data Sourcing and Research Achieves Any Goal For Any Brand", icon: BarChart3 }
  ]

  const secretProjects = [
    { name: "Comedy Industry Disrupter", description: "Agentic content and business solution designed to become the future for everything comedy. Uniquely positioned, Investor Ready.", icon: Mic, status: "Q1 2026 LAUNCH" },
    { name: "Robotic Companions + Entertainment", description: "Specialized robotics for companion market with revolutionary branding and revenue growth strategy.", icon: Bot, status: "Strategic" },
    { name: "Gen X Cult Classic Inspired Comedy Series", description: "Hilarious comedy series with diverse cast, Curb-style dialogue. Under secrecy cloak.", icon: Film, status: "Funding + Development" },
    { name: "HILARIOUS Animated Series + Brilliant Feature Film", description: "Animated comedy cartoon series with 90s action references + feature film with heavy-hitting star voices and Pixar-like messaging.", icon: Star, status: "Pre-production" }
  ]

  const domainPortfolio = [
    { domain: 'libertadai.com', status: 'LAUNCHED' },
    { domain: 'everythingis.online', status: 'ACTIVE' },
    { domain: 'everythingisawesome.org', status: 'ACTIVE' },
    { domain: 'arti.diy', status: 'BUILDING' },
    { domain: 'artintel.store', status: 'LAUNCHING' },
    { domain: 'automationagent.org', status: 'READY' },
    { domain: 'automationstation.org', status: 'LAUNCHING' },
    { domain: 'artilove.online', status: 'BUILDING' },
    { domain: 'artilove.live', status: 'STRATEGIC' },
    { domain: 'artisex.live', status: 'STRATEGIC' }
  ]

  const credibilityBadges = [
    { id: 'security', icon: Shield, title: 'Nation-State Security Expert', subtitle: 'Advanced Threat Detection', description: 'Discovered and mitigated sophisticated nation-state level digital threats using traditional and unconventional forensic techniques.', color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20', hoverColor: 'hover:border-red-500/50' },
    { id: 'revenue', icon: TrendingUp, title: '$50M → $500M Revenue Growth', subtitle: 'Expert Growth Strategist', description: 'Pioneered training programs at CheapCaribbean.com during the Great Recession, achieving unprecedented growth.', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30', hoverColor: 'hover:border-yellow-500/60', featured: true },
    { id: 'projects', icon: Zap, title: '4 Secret Projects Launching', subtitle: 'Industry Disruption Ready', description: 'Revolutionary ventures across comedy, AI companions, entertainment, and animation with massive revenue growth forecasted', color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20', hoverColor: 'hover:border-purple-500/50' }
  ]

  const sovereigntyServices = [
    { icon: Eye, title: 'Vulnerability Research', description: 'Specialized in side-channel analysis and PCH logic flaws. Reference: LEN-216065.' },
    { icon: Cpu, title: 'Hardware Hardening', description: 'Auditing the gap between BIOS and OS to ensure user possession is absolute.' },
    { icon: Server, title: 'Privacy by Design', description: 'Consulting for local, offline AI systems and secure data silos.' },
    { icon: Fingerprint, title: 'Forensic Analysis', description: 'Unconventional discovery techniques for persistent and sophisticated digital threats.' }
  ]

  const sunBubbles = [
    { text: "Track Records", delay: 0 },
    { text: "Secret Projects", delay: 2000 },
    { text: "Hidden Gems", delay: 4000 }
  ]

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="bg-[#f3e700] text-black min-h-screen font-sans">
      <AnimatePresence>
        {showCountdown && <FilmCountdown onComplete={handleCountdownComplete} />}
      </AnimatePresence>

      <CelebrationOverlay isVisible={showCelebration} onComplete={handleCelebrationComplete} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: siteLoaded ? 1 : 0 }} transition={{ duration: 0.5 }} className={siteLoaded ? '' : 'pointer-events-none'}>
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <LibertadPortal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />

        {/* Animated Background Sun */}
        <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
          <motion.div className="w-96 h-96 bg-gradient-radial from-yellow-300 via-yellow-400 to-yellow-500 rounded-full opacity-60"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} />
        </div>

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-40 mix-blend-difference">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl font-bold text-white cursor-pointer" onClick={handleLogoClick}>
              <span className="block">{headerText}</span>
              <span className="block text-base md:text-lg">Under.the.Sun.</span>
            </motion.h1>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute top-4 right-4 text-white p-2 w-16 h-12 flex flex-col justify-center items-center"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
              <div className={`w-8 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
              <div className={`w-8 h-0.5 bg-white transition-all mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-8 h-0.5 bg-white transition-all mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
            </button>
          </div>
        </header>

        {/* NAVIGATION MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-full md:w-96 h-full bg-black z-50 text-white overflow-y-auto">
              <nav className="px-8 py-20">
                <button onClick={() => setIsMenuOpen(false)} className="text-white mb-8 flex items-center">
                  <ArrowLeft size={24} className="mr-2" />Back
                </button>
                <ul className="space-y-6 text-2xl md:text-3xl font-bold">
                  {[
                    { label: 'Home - Under the Sun', id: 'home' },
                    { label: 'About Us', id: 'about' },
                    { label: 'Digital Sovereignty', id: 'digital-sovereignty' },
                    { label: 'Our Services', id: 'services' },
                    { label: 'Strategic Domains', id: 'domain-empire' },
                    { label: 'Use Cases', id: 'track-record' },
                    { label: 'Secret Slate', id: 'secret-pipeline' },
                    { label: 'Secure Portal', id: 'portal-trigger' },
                    { label: 'Contact for... Everything', id: 'contact-cta' },
                  ].map((item, index) => (
                    <motion.li key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                      <button onClick={() => { 
                        if (item.id === 'portal-trigger') { setIsMenuOpen(false); setIsPortalOpen(true); }
                        else scrollToSection(item.id) 
                      }} className="hover:text-[#f3e700] transition-colors block py-2 text-left">
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN CONTENT */}
        <main>
          <motion.div style={{
            backgroundColor: useTransform(scrollYProgress, [0.15, 0.25, 0.65, 0.75], ['rgba(0,0,0,0)', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)', 'rgba(0,0,0,0)']),
          }}>

            {/* ===== HERO ===== */}
            <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
              <div className="text-center relative">
                <div className="absolute inset-0 pointer-events-none">
                  {sunBubbles.map((bubble, index) => (
                    <motion.div key={bubble.text}
                      className="absolute bg-white/10 backdrop-blur-sm border-2 border-yellow-400/50 rounded-full px-4 py-2 text-white font-bold text-sm cursor-pointer pointer-events-auto"
                      style={{ top: index === 0 ? '20%' : index === 1 ? '60%' : '80%', left: index === 0 ? '70%' : index === 1 ? '10%' : '75%' }}
                      initial={{ opacity: 0, scale: 0, y: 50 }}
                      animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0.8], y: [50, 50, 0, 0, -20] }}
                      transition={{ duration: 6, delay: bubble.delay / 1000, times: [0, 0.1, 0.3, 0.8, 1], repeat: Infinity, repeatDelay: 6 }}
                      onClick={() => {
                        if (bubble.text === "Track Records") scrollToSection('track-record')
                        if (bubble.text === "Secret Projects") scrollToSection('secret-pipeline')
                        if (bubble.text === "Hidden Gems") scrollToSection('about')
                      }}>
                      {bubble.text}
                    </motion.div>
                  ))}
                </div>

                <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
                    {credibilityBadges.map((badge) => (
                      <motion.div key={badge.id}
                        className={`relative cursor-pointer transition-all duration-300 ${badge.featured ? 'order-first scale-110' : ''}`}
                        onHoverStart={() => setHoveredBadge(badge.id)} onHoverEnd={() => setHoveredBadge(null)}
                        whileHover={{ scale: badge.featured ? 1.15 : 1.05 }}>
                        <div className={`px-4 md:px-6 py-3 md:py-4 ${badge.bgColor} backdrop-blur-sm rounded-2xl border-2 ${badge.borderColor} ${badge.hoverColor} transition-all duration-300 ${badge.featured ? 'ring-2 ring-yellow-400/30' : ''}`}>
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <badge.icon className={`w-5 h-5 md:w-6 md:h-6 ${badge.color}`} />
                            <div className="text-left">
                              <div className="text-xs md:text-sm font-bold text-black">{badge.title}</div>
                              <div className={`text-xs ${badge.color} font-medium`}>{badge.subtitle}</div>
                            </div>
                          </div>
                          <AnimatePresence>
                            {hoveredBadge === badge.id && (
                              <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-black text-white p-3 rounded-lg text-xs max-w-64 z-10 shadow-xl">
                                <div className="text-center">{badge.description}</div>
                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.h2 className="text-2xl md:text-6xl font-bold text-center leading-tight opacity-0 hover:opacity-30 transition-opacity duration-300"
                  style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, -50]) }}>
                  UNDER the SUN<br />
                  <span className="text-lg md:text-4xl font-bold text-center leading-tight">strategy for humanity</span>
                </motion.h2>
              </div>
            </section>

            {/* ===== ABOUT US ===== */}
            <section id="about" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white">
              <div className="container mx-auto max-w-4xl">
                <motion.h3 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  About Us
                </motion.h3>
                <motion.div className="text-base md:text-xl mb-6 md:mb-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <p className="mb-4">
                    Everything Under the Sun (EUtS), founded in early 2019, is a visionary company building brands, creative strategies, and developing technology solutions. We make problems go away, helping others excel while harnessing the power of AI and ML to drive even more impressive problem-solving innovations. Having resources available globally helps us respond immediately, effectively and discretely to handle any need. Have a problem you would like us to solve?
                  </p>
                  <div className={`overflow-hidden transition-all duration-500 ${aboutExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                    <p className="mb-4">
                      Now is the time to help the right businesses experience growth, brands become recognized and inspiring people get more eyes on what they are great doing. AI, Automations, Optimization of current automations, and building customizable and scalable solutions for the future are just a few reasons to hire our team. Strategizing, optimizing and demonstrating how your brand recognition can be using data for great things. In a world which people only know and expect the opposite, to create the environment needed to organically stimulate and fuel your brand&apos;s reputation and rapid growth, with loyal and happy customers and even happier employees...well, that is how we can genuinely help any business, better than anyone else.
                    </p>
                    <p className="mb-4">
                      Our strategic partnerships and incubator bring together industry experts, research, and experience to push the boundaries of what&apos;s possible. With cutting-edge technologies and a relentless commitment to excellence, we&apos;ve positioned ourselves alongside industry leaders in AI research, development, and go-to-market solutions. Making money is the easy part; helping humanity and our planet stop the nonsense and improve, so we can all thrive, takes teamwork. Every client and partner we have worked with will echo that we offer a global collection of masterminds to solve any problem, and do things right, when that is exactly what you need. Reach out.
                    </p>
                  </div>
                  <button onClick={() => setAboutExpanded(!aboutExpanded)}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
                    {aboutExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </motion.div>
              </div>
            </section>

            {/* ===== DIGITAL SOVEREIGNTY — NEW SECTION ===== */}
            <section id="digital-sovereignty" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white">
              <div className="container mx-auto max-w-6xl">
                <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <p className="text-yellow-400 text-sm font-bold tracking-widest uppercase mb-4">Architectural Sovereignty</p>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Reclaiming the Nine-Tenths:<br />
                    <span className="text-yellow-400">Digital Sovereignty</span> from the Silicon Up
                  </h3>
                  <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Privacy isn&apos;t a setting — it&apos;s a physical reality. If you own the device, you should own the data. We secure the layers they don&apos;t want you to see.
                  </p>
                </motion.div>

                {/* Forensics & Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {sovereigntyServices.map((item, index) => (
                    <motion.div key={item.title}
                      className="bg-gray-800/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-600/30 hover:border-yellow-500/40 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                      <div className="flex items-start space-x-4">
                        <div className="bg-yellow-500/10 p-3 rounded-xl group-hover:bg-yellow-500/20 transition-colors">
                          <item.icon className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h4>
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* The Record / Manifesto */}
                <motion.div className="bg-gradient-to-br from-yellow-500/10 to-transparent p-8 md:p-12 rounded-3xl border border-yellow-500/20"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-8 h-8 text-yellow-400" />
                    <h4 className="text-xl md:text-2xl font-bold text-yellow-400">The Record</h4>
                  </div>
                  <blockquote className="text-gray-200 text-base md:text-lg leading-relaxed italic border-l-4 border-yellow-500/50 pl-6">
                    &ldquo;The same laws of possession that govern our physical world must apply to our digital lives. Your location, your finances, and your habits are your property. EverythingARTI exists to bridge the gap between physical ownership and digital control.&rdquo;
                  </blockquote>
                </motion.div>
              </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="min-h-screen flex items-center justify-center px-4 py-16 md:py-20">
              <div className="text-center">
                <motion.h3 className="text-3xl md:text-6xl font-bold mb-8 text-white" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  Our Services
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                  {services.map((service, index) => (
                    <motion.div key={service.name}
                      className="bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-yellow-400/20"
                      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                      <service.icon className="w-12 h-12 md:w-16 md:h-16 mb-4 text-black" />
                      <h4 className="text-xl md:text-2xl font-bold mb-3 text-black">{service.name}</h4>
                      <p className="text-sm md:text-base text-gray-800 mb-4 leading-relaxed">{service.description}</p>
                      <button onClick={() => setIsContactOpen(true)}
                        className="mt-4 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105">
                        Learn More
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== DOMAIN PORTFOLIO ===== */}
            <section id="domain-empire" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white">
              <div className="container mx-auto max-w-6xl">
                <motion.h3 className="text-3xl md:text-6xl font-bold mb-12 text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  Strategic Domain Portfolio
                </motion.h3>
                <motion.p className="text-center text-gray-300 mb-12 text-lg max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  Our carefully curated collection of premium domains positions us at the forefront of emerging markets and technologies. Each acquisition represents a strategic investment in our future.
                </motion.p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                  {domainPortfolio.map((item, index) => (
                    <motion.div key={item.domain}
                      className="bg-gray-800/30 p-4 rounded-xl border border-gray-600/20 hover:border-gray-500/40 transition-all"
                      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                      <div className="text-white font-semibold mb-2 text-xs md:text-sm break-all">{item.domain}</div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block border ${
                        item.status === 'ACTIVE' || item.status === 'LAUNCHED' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {item.status}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== TRACK RECORD ===== */}
            <section id="track-record" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white">
              <div className="container mx-auto max-w-6xl">
                <motion.h3 className="text-3xl md:text-6xl font-bold mb-8 text-center text-white" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  Proven Track Record
                </motion.h3>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <motion.div className="bg-yellow-500/20 p-6 rounded-2xl border border-yellow-500/40"
                    initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <div className="flex items-center mb-4">
                      <TrendingUp className="w-8 h-8 text-yellow-400 mr-3" />
                      <h4 className="text-xl font-bold text-white">Revenue Multiplication Expertise</h4>
                    </div>
                    <p className="text-gray-200 mb-4">Pioneered, created and implemented hiring and training programs at CheapCaribbean.com during the Greatest Recession since the Great Depression.</p>
                    <div className="text-2xl font-bold text-yellow-400 mb-1">$50M → $500M</div>
                    <div className="text-sm text-yellow-300">ACTUAL 10X growth achieved in 5 years (2008-2013)</div>
                  </motion.div>
                  <motion.div className="bg-red-500/20 p-6 rounded-2xl border border-red-500/40"
                    initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                    <div className="flex items-center mb-4">
                      <Shield className="w-8 h-8 text-red-400 mr-3" />
                      <h4 className="text-xl font-bold text-white">Digital Forensics &amp; Device Security Honors</h4>
                    </div>
                    <p className="text-gray-200 mb-4">Discover and provide evidence paired with successful mitigation steps for nation-state level, persistent, extremely sophisticated malicious exploits and surveillance across all systems, devices and platforms.</p>
                    <div className="text-lg font-bold text-red-400 mb-1">Nation-State Level Threat Detection</div>
                    <div className="text-sm text-red-300">Forensic analysis &amp; unconventional discovery techniques</div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ===== SECRET PIPELINE ===== */}
            <section id="secret-pipeline" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white">
              <div className="container mx-auto max-w-6xl">
                <motion.h3 className="text-3xl md:text-6xl font-bold mb-4 text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  Secret Slate Project Pipeline
                </motion.h3>
                <motion.p className="text-center text-gray-300 mb-12 text-lg" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  Four game-changing launches. Some will redefine entire industries.
                </motion.p>
                <div className="grid md:grid-cols-2 gap-6">
                  {secretProjects.map((project, index) => (
                    <motion.div key={project.name}
                      className="bg-gray-800/50 p-6 rounded-2xl border border-gray-600/30 hover:border-gray-500/50 transition-all"
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                      <div className="flex items-center mb-4">
                        <project.icon className="w-8 h-8 text-yellow-400 mr-3" />
                        <h4 className="text-lg font-bold">{project.name}</h4>
                        <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full whitespace-nowrap">{project.status}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                  <div className="inline-flex items-center px-6 py-3 bg-purple-500/20 rounded-full border border-purple-500/30">
                    <span className="text-purple-300 font-semibold text-sm md:text-base">Projected Combined Revenue: $40M+ Year 1 · $200M+ Year 3</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ===== CTA ===== */}
            <section id="contact-cta" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white">
              <div className="container mx-auto max-w-4xl text-center">
                <motion.h3 className="text-3xl md:text-5xl font-bold mb-6" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  Ready for Everything?
                </motion.h3>
                <motion.p className="text-xl md:text-2xl mb-8 text-gray-200" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  From strategy to execution, we deliver results that matter.
                </motion.p>
                <motion.div className="grid md:grid-cols-3 gap-6 mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <div className="bg-gray-800/50 p-6 rounded-xl">
                    <Brain className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold mb-2">AI-Powered Strategy</h4>
                    <p className="text-gray-300 text-sm">Custom solutions that anticipate trends and multiply revenue</p>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-xl">
                    <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold mb-2">Proven Growth Methods</h4>
                    <p className="text-gray-300 text-sm">Battle-tested approaches that delivered growth during recession</p>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-xl">
                    <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold mb-2">Everything Under the Sun</h4>
                    <p className="text-gray-300 text-sm">Comprehensive solutions from concept to market domination</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                  <button onClick={() => setIsContactOpen(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl">
                    Book Your {headerText} Call Now!
                  </button>
                  <p className="text-sm text-gray-400 mt-4">The future doesn&apos;t wait. Whether you&apos;re looking to transform your business, launch the next breakthrough technology, or solve humanity&apos;s greatest challenges, contact us to make it happen.</p>
                </motion.div>
              </div>
            </section>
          </motion.div>
        </main>

        {/* ===== SHOP / PORTAL STRIP ===== */}
        <div id="shop-our-stores" className="bg-[#f3e700] relative z-10">
          <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full text-lg font-bold flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
              <ShoppingBag className="mr-2" />Shop Our Store
            </button>
            <button onClick={() => setIsPortalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-yellow-400 rounded-full text-lg font-bold flex items-center justify-center hover:bg-gray-800 transition-all duration-300 border border-yellow-500/30">
              <Lock className="mr-2 w-5 h-5" />Secure Client Portal
            </button>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="bg-black text-white py-12 md:py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-8 md:mb-0">
                <h4 className="text-xl md:text-2xl font-bold mb-2">Everything Under the Sun</h4>
                <p className="text-sm text-gray-400">Los Angeles, CA (HQ) · Vela Luka, Korčula, Croatia</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                  <a href="https://everythingarti.org" className="text-xs text-yellow-500/70 hover:text-yellow-400 transition-colors">everythingarti.org</a>
                  <a href="https://everythingis.online" className="text-xs text-yellow-500/70 hover:text-yellow-400 transition-colors">everythingis.online</a>
                  <a href="https://everythingisawesome.org" className="text-xs text-yellow-500/70 hover:text-yellow-400 transition-colors">everythingisawesome.org</a>
                  <a href="https://libertadai.com" className="text-xs text-yellow-500/70 hover:text-yellow-400 transition-colors">libertadai.com</a>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-3 text-sm">
                  <a href="tel:+12137697079" className="text-gray-400 hover:text-yellow-400 transition-colors">+1 213 769 7079</a>
                  <span className="text-gray-600">·</span>
                  <a href="mailto:wave@everythingis.online" className="text-gray-400 hover:text-yellow-400 transition-colors">wave@everythingis.online</a>
                </div>
                <p className="text-xs text-gray-600 mt-4">© 2019 – 2026 Everything Under the Sun, LLC · Veteran Owned &amp; Operated</p>
              </div>
              <nav>
                <ul className="space-y-2">
                  {['Press', 'Investors', 'Contact', 'Join The Ride'].map((item, index) => (
                    <motion.li key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                      <button onClick={() => setIsContactOpen(true)} className="hover:text-[#f3e700] transition-colors text-sm md:text-base">{item}</button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}
