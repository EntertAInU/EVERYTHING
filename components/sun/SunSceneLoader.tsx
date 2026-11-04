'use client'

import { Component, useEffect, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { X } from 'lucide-react'
import { isExternal, type Venture } from '@/lib/ventures'

// Plain CSS sun: shows before the 3D scene loads, and stays if the device has no WebGL.
export function StaticSun() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="rounded-full"
        style={{
          width: 'min(36vh, 60vw)',
          height: 'min(36vh, 60vw)',
          background: 'radial-gradient(circle at 40% 38%, #fff27a 0%, #FFDF0E 45%, #f5c800 100%)',
          boxShadow: '0 0 80px 20px rgba(255, 247, 176, 0.55)',
        }}
      />
    </div>
  )
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <StaticSun /> : this.props.children
  }
}

const SunScene = dynamic(() => import('./SunScene'), { ssr: false, loading: () => <StaticSun /> })

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function SunSceneLoader({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [webgl, setWebgl] = useState<boolean | null>(null)
  const [interactive, setInteractive] = useState(true)
  const [running, setRunning] = useState(true)
  const [sheet, setSheet] = useState<Venture | null>(null)
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.3, 0.3, 1])

  useEffect(() => setWebgl(hasWebGL()), [])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Planets are clickable only while the hero is on screen.
    setInteractive(v < 0.1)
    if (v >= 0.1) setSheet(null)
    // Stop drawing frames while the black sections fully cover the sun.
    setRunning(!(v > 0.27 && v < 0.63))
  })

  useEffect(() => {
    const onVis = () => setRunning(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <>
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ opacity, pointerEvents: interactive ? 'auto' : 'none' }}
    >
      {webgl === false || webgl === null ? (
        <StaticSun />
      ) : (
        <SceneBoundary>
          <SunScene interactive={interactive} running={running} onTouchSelect={setSheet} touchSelectedId={sheet?.id ?? null} />
        </SceneBoundary>
      )}
    </motion.div>

    {/* On touch screens the planet's card opens as a sheet above the hero content */}
    <AnimatePresence>
      {sheet && (
        <motion.div
          key={sheet.id}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-3xl bg-black p-5 text-white shadow-2xl ring-1 ring-white/10"
          role="dialog"
          aria-label={sheet.name}
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400">{sheet.domain ?? 'Under the Sun'}</div>
              <div className="flex items-center gap-2 text-xl font-bold">
                <span className="h-3 w-3 rounded-full ring-1 ring-white/30" style={{ backgroundColor: sheet.color }} />
                {sheet.name}
              </div>
            </div>
            <button onClick={() => setSheet(null)} aria-label="Close" className="rounded-full p-1 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <span className="mb-3 inline-block rounded-full border border-[#f3e700]/40 px-2.5 py-0.5 text-xs font-semibold text-[#f3e700]">{sheet.status}</span>
          <p className="mb-4 text-sm leading-relaxed text-gray-200">{sheet.oneLiner}</p>
          <a
            href={sheet.href}
            target={isExternal(sheet.href) ? '_blank' : undefined}
            rel={isExternal(sheet.href) ? 'noopener noreferrer' : undefined}
            onClick={() => setSheet(null)}
            className="block rounded-full bg-[#f3e700] py-3 text-center font-bold text-black"
          >
            Explore {sheet.name} →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
