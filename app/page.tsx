"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ArrowLeft, Brain, Film, Leaf, BarChart3, ShoppingBag } from 'lucide-react'
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

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerText, setHeaderText] = useState('EVERYTHING')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const words = ['EVERYTHING', 'STRATEGY', 'ENTERTAINMENT', 'CREATING']
    let index = 0
    const intervalId = setInterval(() => {
      index = (index + 1) % words.length
      setHeaderText(words[index])
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

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

  const footerLinks = [
    { name: 'Press', href: '/press' },
    { name: 'Investors', href: '/investors' },
    { name: 'Email', href: 'mailto:info@everythingunderthesun.com' },
    { name: 'Shop Our Stores', href: '/shop-our-stores' }
  ]

  return (
    <div className="bg-[#f3e700] text-black min-h-screen font-sans">
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
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                >
                  <Link 
                    href="/" 
                    className="hover:text-[#f3e700] transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    href="/about" 
                    className="hover:text-[#f3e700] transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    href="/services" 
                    className="hover:text-[#f3e700] transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    href="/shop-our-stores" 
                    className="hover:text-[#f3e700] transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shop Our Stores
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    href="/contact" 
                    className="hover:text-[#f3e700] transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
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
          </section>

          <section id="about" className="min-h-screen flex flex-col justify-center px-4 py-16 md:py-20 text-white">
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
                  Everything Under the Sun (EUtS) is a visionary company building brands, creative strategies, and developing technology solutions. We help others excel while harnessing the power of AI and ML to drive even more impressive solutions.
                </p>
                <p>
                  We love brands and people who are great at what they do while committed to our mission: helping humanity and our planet heal so we can all thrive.
                </p>
                <p>
                  Our strategic partnerships and incubator bring together industry experts, research, and experience to push the boundaries of what's possible. With cutting-edge technologies and a relentless commitment to excellence, we've positioned ourselves alongside industry leaders in AI research, development, and go-to-market solutions.
                </p>
              </motion.div>
            </div>
          </section>

          <section id="services" className="min-h-screen flex items-center justify-center px-4 py-16 md:py-20">
            <div className="text-center">
              <motion.h3 
                className="text-3xl md:text-6xl font-bold mb-8"
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
                    <h4 className="text-xl md:text-2xl font-bold mb-2">{service.name}</h4>
                    <p className="text-sm md:text-base">{service.description}</p>
                    <Link 
                      href="/services" 
                      className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-full font-bold hover:bg-opacity-80 transition-colors"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </main>

      <div id="shop-our-stores" className="bg-[#f3e700] relative z-10">
        <div className="container mx-auto px-4 py-12">
          <Link href="/shop-our-stores">
            <motion.button
              className="w-full md:w-auto px-8 py-4 bg-black text-white rounded-full text-lg font-bold flex items-center justify-center hover:bg-opacity-80 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="mr-2" />
              Browse Our Shops
            </motion.button>
          </Link>
        </div>
      </div>

      <footer className="bg-black text-white py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h4 className="text-xl md:text-2xl font-bold mb-4">Everything Under the Sun</h4>
              <p className="text-sm md:text-base">© 2024 Everything Under the Sun. All rights reserved.</p>
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
                    <Link href={item.href} className="hover:text-[#f3e700] transition-colors text-sm md:text-base">
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}