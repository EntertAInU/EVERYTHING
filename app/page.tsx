"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ArrowLeft, Brain, Film, Leaf, BarChart3, ShoppingBag, Shield, TrendingUp, Zap, Mic, Bot, Star, Calendar, Mail, MessageSquare, Phone } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import Image from 'next/image'
import Link from 'next/link'

const Sun = () => {
  const meshRef = useRef()
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2
  })

  return (
    <Sphere ref={meshRef} args={[2.7, 32, 32]}>
      <meshPhongMaterial 
        color="#FFDF0E" 
        emissive="#FFDF0E" 
        emissiveIntensity={0.7}
        specular="#ffffff"
        shininess={3}
      />
    </Sphere>
  )
}

// Contact Modal Component
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    purpose: '',
    details: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // In production, replace this with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'homepage_contact_form'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setFormData({ name: '', email: '', company: '', purpose: '', details: '' })
          setSubmitStatus(null)
        }, 2000)
      } else {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Let's Connect</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
            >
              Thank you! We'll be in touch soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
              Sorry, there was an error. Please try again or contact us directly.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Contact *</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                value={formData.purpose}
                onChange={e => setFormData({...formData, purpose: e.target.value})}
                disabled={isSubmitting}
              >
                <option value="">Select a purpose</option>
                <option value="ai-consulting">AI/ML Consulting</option>
                <option value="revenue-growth">Revenue Growth Strategy</option>
                <option value="film-production">Film & Music Production</option>
                <option value="marketing">Marketing & Brand Strategy</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="investment">Investment Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 h-24 resize-none transition-colors"
                placeholder="Tell us about your project, goals, or how we can help..."
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-bold py-3 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [headerText, setHeaderText] = useState('EVERYTHING')
  const [hoveredBadge, setHoveredBadge] = useState(null)
  const { scrollYProgress } = useScroll()

  // Rotating words array
  const rotatingWords = ['EVERYTHING', 'STRATEGY', 'CREATING', 'OPTIMIZING', 'MONETIZING', 'TECHNOLOGY', 'ENTERTAINMENT']

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      index = (index + 1) % rotatingWords.length
      setHeaderText(rotatingWords[index])
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const services = [
    { 
      name: "AI R&D Studio Lab", 
      description: "Predictive AI/ML R&D Anticipating Trends, Brand Customization & Award Winning Consulting", 
      icon: Brain, 
      image: "/images/services-img-1.png"
    },
    { 
      name: "Film & Music Production", 
      description: "Film, Music & Digital Content Production Studio and Elite Talent Management", 
      icon: Film, 
      image: "/images/services-img-2.png"
    },
    { 
      name: "Sustainable Tech Initiative", 
      description: "Eco-conscious Disruptor Technology launching visionary solutions from Conception to Market", 
      icon: Leaf, 
      image: "/images/services-img-3.png"
    },
    { 
      name: "Marketing Strategy & Ad Creation", 
      description: "Creative Hub Proving Superior Personalized Data Sourcing and Research Achieves Any Goal For Any Brand", 
      icon: BarChart3, 
      image: "/images/services-img-4.png"
    }
  ]

  const secretProjects = [
    {
      name: "Comedy Industry Disrupter",
      description: "Agentic content and business solution designed to become the future for everything comedy. Uniquely positioned, Investor Ready.",
      icon: Mic,
      status: "Q1 2026 LAUNCH"
    },
    {
      name: "Robotic Companions + Entertainment", 
      description: "Specialized robotics for companion market with revolutionary branding and revenue growth strategy.",
      icon: Bot,
      status: "Strategic"
    },
    {
      name: "Gen X Cult Classic Inspired Comedy Series",
      description: "Hilarious comedy series with diverse cast, Curb-style dialogue. Under secrecy cloak.",
      icon: Film,
      status: "Funding + Development"
    },
    {
      name: "HILARIOUS Animated Series + Brilliant Feature Film",
      description: "Animated comedy cartoon series with 90s action references + feature film with heavy-hitting star voices and Pixar-like messaging.",
      icon: Star,
      status: "Pre-production"
    }
  ]

  const domainPortfolio = [
    { domain: 'libertadai.com', status: 'LAUNCHED' },
    { domain: 'arti.diy', status: 'BUILDING' },
    { domain: 'artintel.store', status: 'LAUNCHING' },
    { domain: 'automationagent.org', status: 'READY' },
    { domain: 'automationstation.org', status: 'LAUNCHING' },
    { domain: 'artilove.online', status: 'BUILDING' },
    { domain: 'artilove.live', status: 'STRATEGIC' },
    { domain: 'artisex.live', status: 'STRATEGIC' }
  ]

  const footerLinks = [
    { name: 'Press', href: '#' },
    { name: 'Investors', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Join The Ride', href: '#' }
  ]

  // Enhanced credibility badges with interactivity
  const credibilityBadges = [
    {
      id: 'security',
      icon: Shield,
      title: 'Nation-State Security Expert',
      subtitle: 'Advanced Threat Detection',
      description: 'Discovered and mitigated sophisticated nation-state level cyber threats using unconventional forensic techniques.',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      hoverColor: 'hover:border-red-500/50'
    },
    {
      id: 'revenue',
      icon: TrendingUp,
      title: '$50M → $500M Revenue Growth',
      subtitle: '10x Multiplier Expert',
      description: 'Pioneered training programs at CheapCaribbean.com during the Great Recession, achieving unprecedented 10x growth.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      hoverColor: 'hover:border-yellow-500/60',
      featured: true
    },
    {
      id: 'projects',
      icon: Zap,
      title: '4 Secret Projects Launching',
      subtitle: 'Industry Disruption Ready',
      description: 'Revolutionary ventures across comedy, AI companions, entertainment, and animation with massive 9 figure revenue growth forecasted',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      hoverColor: 'hover:border-purple-500/50'
    }
  ]

  return (
    <div className="bg-[#f3e700] text-black min-h-screen font-sans">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      <div className="fixed inset-0 z-10 pointer-events-none" style={{ opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.3, 0.3, 1]) }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Sun />
        </Canvas>
      </div>

      <header className="fixed top-0 left-0 w-full z-40 mix-blend-difference">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-white"
          >
            <span className="block">{headerText}</span>
            <span className="block text-base md:text-lg">Under.the.Sun.</span>
          </motion.h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute top-4 right-4 text-white p-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 w-full md:w-96 h-full bg-black z-50 text-white overflow-y-auto"
          >
            <nav className="px-8 py-20">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white mb-8 flex items-center"
                aria-label="Back to main content"
              >
                <ArrowLeft size={24} className="mr-2" />
                Back
              </button>
              <ul className="space-y-6 text-2xl md:text-3xl font-bold">
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                  <button onClick={() => scrollToSection('home')} className="hover:text-[#f3e700] transition-colors block py-2 text-left">
                    Home
                  </button>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <button onClick={() => scrollToSection('about')} className="hover:text-[#f3e700] transition-colors block py-2 text-left">
                    About
                  </button>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <button onClick={() => scrollToSection('track-record')} className="hover:text-[#f3e700] transition-colors block py-2 text-left">
                    Track Record
                  </button>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <button onClick={() => scrollToSection('secret-pipeline')} className="hover:text-[#f3e700] transition-colors block py-2 text-left">
                    Secret Pipeline
                  </button>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <button onClick={() => scrollToSection('domain-empire')} className="hover:text-[#f3e700] transition-colors block py-2 text-left">
                    Domain Empire
                  </button>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <button onClick={() => scrollToSection('services')} className="hover:text-[#f3e700] transition-colors block py-2 text-left">
                    Services
                  </button>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <button onClick={() => setIsContactOpen(true)} className="hover:text-[#f3e700] transition-colors block py-2 text-left">
                    Contact
                  </button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <motion.div
          className="relative z-20"
          style={{
            backgroundColor: useTransform(
              scrollYProgress,
              [0.2, 0.3, 0.6, 0.7],
              ['rgba(0,0,0,0)', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)', 'rgba(0,0,0,0)']
            ),
          }}
        >
          <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
            <div className="text-center">
              {/* Enhanced Interactive Credibility Badges */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {credibilityBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        badge.featured ? 'order-first scale-110' : ''
                      }`}
                      onHoverStart={() => setHoveredBadge(badge.id)}
                      onHoverEnd={() => setHoveredBadge(null)}
                      whileHover={{ scale: badge.featured ? 1.15 : 1.05 }}
                    >
                      <div className={`px-6 py-4 ${badge.bgColor} backdrop-blur-sm rounded-2xl border-2 ${badge.borderColor} ${badge.hoverColor} transition-all duration-300 ${
                        badge.featured ? 'ring-2 ring-yellow-400/30' : ''
                      }`}>
                        <div className="flex items-center space-x-3">
                          <badge.icon className={`w-6 h-6 ${badge.color}`} />
                          <div className="text-left">
                            <div className="text-sm font-bold text-black">{badge.title}</div>
                            <div className={`text-xs ${badge.color} font-medium`}>{badge.subtitle}</div>
                          </div>
                        </div>
                        
                        {/* Hover tooltip */}
                        <AnimatePresence>
                          {hoveredBadge === badge.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-black text-white p-3 rounded-lg text-xs max-w-64 z-10 shadow-xl"
                            >
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

              <motion.h2 
                className="text-2xl md:text-6xl font-bold text-center leading-tight opacity-0 hover:opacity-30 transition-opacity duration-300"
                style={{
                  y: useTransform(scrollYProgress, [0, 0.5], [0, -50]),
                }}
              >
                UNDER the SUN
                <br />
                <span className="text-lg md:text-4xl font-bold text-center leading-tight">
                  strategy for humanity
                </span>
              </motion.h2>
            </div>
          </section>

          {/* Enhanced Track Record Section with Better Contrast */}
          <section id="track-record" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 bg-black/90 text-white">
            <div className="container mx-auto max-w-6xl">
              <motion.h3
                className="text-3xl md:text-6xl font-bold mb-8 text-center text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Proven Track Record
              </motion.h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div 
                  className="bg-yellow-500/20 p-6 rounded-2xl border border-yellow-500/40"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-8 h-8 text-yellow-400 mr-3" />
                    <h4 className="text-xl font-bold text-white">Revenue Multiplication Expert</h4>
                  </div>
                  <p className="text-gray-200 mb-4">
                    Pioneered, created and implemented hiring and training programs at CheapCaribbean.com during the Greatest Recession since the Great Depression.
                  </p>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">$50M → $500M</div>
                  <div className="text-sm text-yellow-300">10x growth in 5 years (2008-2013)</div>
                </motion.div>

                <motion.div 
                  className="bg-red-500/20 p-6 rounded-2xl border border-red-500/40"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <Shield className="w-8 h-8 text-red-400 mr-3" />
                    <h4 className="text-xl font-bold text-white">Cybersecurity Pioneer</h4>
                  </div>
                  <p className="text-gray-200 mb-4">
                    Discovered and provided successful mitigation for nation-state level, persistent, extremely sophisticated malicious exploits across devices and platforms.
                  </p>
                  <div className="text-lg font-bold text-red-400 mb-1">Nation-State Level Threat Detection</div>
                  <div className="text-sm text-red-300">Forensic analysis & unconventional discovery techniques</div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Secret Pipeline Section */}
          <section id="secret-pipeline" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white bg-black/80">
            <div className="container mx-auto max-w-6xl">
              <motion.h3
                className="text-3xl md:text-6xl font-bold mb-4 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Secret Slate Project Pipeline
              </motion.h3>
              <motion.p 
                className="text-center text-gray-300 mb-12 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Four game-changing launches. Some will redefine entire industries.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                {secretProjects.map((project, index) => (
                  <motion.div 
                    key={project.name}
                    className="bg-gray-800/50 p-6 rounded-2xl border border-gray-600/30 hover:border-gray-500/50 transition-all"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <project.icon className="w-8 h-8 text-yellow-400 mr-3" />
                      <h4 className="text-lg font-bold">{project.name}</h4>
                      <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="inline-flex items-center px-6 py-3 bg-purple-500/20 rounded-full border border-purple-500/30">
                  <span className="text-purple-300 font-semibold">Projected Combined Revenue: $40M+ Year 1 $200M+ Year 3</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Domain Empire Section */}
          <section id="domain-empire" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white bg-black/70">
            <div className="container mx-auto max-w-6xl">
              <motion.h3
                className="text-3xl md:text-6xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Strategic Domain Portfolio
              </motion.h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {domainPortfolio.map((item, index) => (
                  <motion.div 
                    key={item.domain}
                    className="bg-gray-800/30 p-4 rounded-xl border border-gray-600/20 hover:border-gray-500/40 transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="text-white font-semibold mb-2 text-sm">{item.domain}</div>
                    <div className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 inline-block">
                      {item.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white bg-black/60">
            <div className="container mx-auto max-w-4xl">
              <motion.h3
                className="text-3xl md:text-6xl font-bold mb-6 md:mb-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About Us
              </motion.h3>
              <motion.div
                className="text-base md:text-xl mb-6 md:mb-8 space-y-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p>
                  Everything Under the Sun (EUtS), founded in early 2019, is a visionary company building brands, creative strategies, and developing technology solutions. Making problems go away, helping others excel while harnessing the power of AI and ML to drive even more impressive problem-solving innovations, and having resources available globally helps us handle any need. Have a problem you would like us to solve?
                </p>
                <p>
                  We love brands and inspiring people who are great at what they do and share common values: helping humanity and our planet stop the nonsense and improve, so we can all thrive. Strategizing and defining how data can be used for good and profit are a couple of ways we help better than anyone else.
                </p>
                <p>
                  Our strategic partnerships and incubator bring together industry experts, research, and experience to push the boundaries of what's possible. With cutting-edge technologies and a relentless commitment to excellence, we've positioned ourselves alongside industry leaders in AI research, development, and go-to-market solutions. Your global collection of masterminds to do things right when you need .
                </p>
              </motion.div>
            </div>
          </section>

          <section id="services" className="min-h-screen flex items-center justify-center px-4 py-16 md:py-20 bg-black/50">
            <div className="text-center">
              <motion.h3 
                className="text-3xl md:text-6xl font-bold mb-8 text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our Services
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {services.map((service, index) => (
                  <motion.div 
                    key={service.name} 
                    className="bg-gray-200 flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <service.icon className="w-12 h-12 md:w-16 md:h-16 mb-4 text-black" />
                    <h4 className="text-xl md:text-2xl font-bold mb-2 text-black">{service.name}</h4>
                    <p className="text-sm md:text-base text-black mb-4">{service.description}</p>
                    <button 
                      onClick={() => setIsContactOpen(true)}
                      className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-full font-bold hover:bg-opacity-80 transition-colors"
                    >
                      Get Started
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* NEW: Sales Funnel CTA Section with Dynamic Text */}
          <section id="contact-cta" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 bg-black/40 text-white">
            <div className="container mx-auto max-w-4xl text-center">
              <motion.h3
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Ready to 10x Your Business?
              </motion.h3>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                From strategy to execution, we deliver results that matter.
              </motion.p>

              <motion.div 
                className="grid md:grid-cols-3 gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-gray-800/50 p-6 rounded-xl">
                  <Brain className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold mb-2">AI-Powered Strategy</h4>
                  <p className="text-gray-300 text-sm">Custom solutions that anticipate trends and multiply revenue</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold mb-2">Proven Growth Methods</h4>
                  <p className="text-gray-300 text-sm">Battle-tested approaches that delivered 10x growth during recession</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl">
                  <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold mb-2">Everything Under the Sun</h4>
                  <p className="text-gray-300 text-sm">Comprehensive solutions from concept to market domination</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl"
                >
                  Book Your {headerText} Call
                </button>
                <p className="text-sm text-gray-400 mt-4">
                  Custom pricing • Optimized solutions • Results GUARANTEED
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  Imagine having {headerText} Under the Sun. With us, you've won.
                </p>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </main>

      <div id="shop-our-stores" className="bg-[#f3e700] relative z-10">
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => setIsContactOpen(true)}
            className="w-full md:w-auto px-8 py-4 bg-black text-white rounded-full text-lg font-bold flex items-center justify-center hover:bg-opacity-80 transition-all duration-300"
          >
            <ShoppingBag className="mr-2" />
            Shop Our Store
          </button>
        </div>
      </div>

      <footer className="bg-black text-white py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h4 className="text-xl md:text-2xl font-bold mb-4">Everything Under the Sun</h4>
              <p className="text-sm md:text-base">© 2025 Everything Under the Sun. All rights reserved.</p>
            </div>
            <nav>
              <ul className="space-y-2">
                {footerLinks.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button 
                      onClick={() => setIsContactOpen(true)}
                      className="hover:text-[#f3e700] transition-colors text-sm md:text-base"
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
