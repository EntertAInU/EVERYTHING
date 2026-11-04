'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { Html, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { ventures, isExternal, type Venture } from '@/lib/ventures'

// ---------- layout ----------
const FOV = 30
const SUN_RADIUS = 2.6
const TILT = 0.36 // how far the ecliptic leans toward the viewer, in radians
const cameraZFor = (aspect: number) => (aspect < 0.9 ? 44 : 32)

type Layout = { portrait: boolean; radii: number[]; planetScale: number }

// Does an orbit of radius R stay on screen once perspective is applied?
// The near side of a tilted orbit is closer to the camera, so it projects larger.
function orbitFits(R: number, camZ: number, halfW: number, halfH: number, portrait: boolean) {
  const sinT = Math.sin(TILT)
  const cosT = Math.cos(TILT)
  for (let k = 0; k < 96; k++) {
    const a = (k / 96) * Math.PI * 2
    const ox = Math.cos(a) * R
    const oz = Math.sin(a) * R
    let px = ox
    let py = -oz * sinT
    const pz = oz * cosT
    if (portrait) [px, py] = [-py, px]
    const depth = camZ - pz
    if (depth < 2) return false
    const k2 = camZ / depth
    if (Math.abs(px * k2) > halfW * 0.9) return false
    if (Math.abs(py * k2) + 1.6 > halfH * 0.86) return false // room for the label under the planet
  }
  return true
}

function computeLayout(aspect: number): Layout {
  const portrait = aspect < 0.9
  const camZ = cameraZFor(aspect)
  const halfH = camZ * Math.tan(THREE.MathUtils.degToRad(FOV / 2))
  const halfW = halfH * aspect
  const rMin = SUN_RADIUS * 1.55
  let lo = rMin
  let hi = 40
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    if (orbitFits(mid, camZ, halfW, halfH, portrait)) lo = mid
    else hi = mid
  }
  const rMax = Math.max(lo, rMin + 1)
  const n = ventures.length
  const radii = ventures.map((_, i) => (n === 1 ? rMin : rMin + ((rMax - rMin) * i) / (n - 1)))
  const planetScale = THREE.MathUtils.clamp((rMax - rMin) / 5.5, 0.7, 1.3)
  return { portrait, radii, planetScale }
}

function go(href: string) {
  if (isExternal(href)) {
    window.open(href, '_blank', 'noopener,noreferrer')
  } else {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }
}

// ---------- the sun (original material, kept as designed) ----------
function useGlowTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    g.addColorStop(0, 'rgba(255, 196, 0, 0.55)')
    g.addColorStop(0.45, 'rgba(255, 170, 0, 0.22)')
    g.addColorStop(1, 'rgba(255, 150, 0, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 256)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Sprite>(null)
  const glow = useGlowTexture()
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.2
    if (glowRef.current) {
      const s = SUN_RADIUS * 3.4 * (1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03)
      glowRef.current.scale.set(s, s, 1)
    }
  })
  return (
    <group>
      {glow && (
        <sprite ref={glowRef} renderOrder={-1}>
          <spriteMaterial map={glow} transparent depthWrite={false} />
        </sprite>
      )}
      <Sphere ref={meshRef} args={[SUN_RADIUS, 64, 64]}>
        <meshPhongMaterial color="#FFDF0E" emissive="#FFDF0E" emissiveIntensity={0.7} specular="#ffffff" shininess={3} />
      </Sphere>
    </group>
  )
}

// ---------- one orbit + its planet ----------
type PlanetProps = {
  venture: Venture
  index: number
  radius: number
  planetScale: number
  speed: number
  paused: React.MutableRefObject<boolean>
  focused: boolean
  showCard: boolean
  dimmed: boolean
  interactive: boolean
  onHover: (id: string | null, pointerType?: string) => void
  onPointerKind: (pointerType: string) => void
  onTap: (venture: Venture, fromTouch?: boolean) => void
}

function Planet({ venture, index, radius, planetScale, speed, paused, focused, showCard, dimmed, interactive, onHover, onPointerKind, onTap }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const angle = useRef(index * 2.399963) // golden angle, so planets never line up
  const world = useMemo(() => new THREE.Vector3(), [])

  const ring = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius])
    }
    return pts
  }, [radius])

  useFrame((_, delta) => {
    if (!paused.current) angle.current += delta * speed
    const g = groupRef.current
    if (!g) return
    g.position.set(Math.cos(angle.current) * radius, 0, Math.sin(angle.current) * radius)
    g.rotation.y += delta * 0.5
    // fade the label a little while the planet passes behind the sun
    g.getWorldPosition(world)
    if (labelRef.current) labelRef.current.style.opacity = world.z < -0.3 && !focused ? '0.4' : '1'
  })

  const scale = (focused ? 1.35 : 1) * planetScale

  return (
    <group>
      <Line points={ring} color="#000000" lineWidth={focused ? 1.6 : 1} transparent opacity={focused ? 0.55 : dimmed ? 0.1 : 0.2} />
      <group ref={groupRef}>
        <Sphere args={[venture.size, 32, 32]} scale={scale}>
          <meshStandardMaterial color={venture.color} roughness={0.55} metalness={0.1} emissive={venture.color} emissiveIntensity={focused ? 0.25 : 0.05} />
        </Sphere>
        {/* a generous invisible hit area, easier to land a thumb on */}
        <Sphere
          args={[Math.max(venture.size * 2.2, 0.8) * planetScale, 12, 12]}
          onPointerOver={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation()
            onHover(venture.id, e.pointerType)
          }}
          onPointerOut={() => onHover(null)}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => onPointerKind(e.pointerType)}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation()
            onTap(venture)
          }}
        >
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </Sphere>
        <Html center zIndexRange={[30, 10]} style={{ pointerEvents: interactive ? 'auto' : 'none' }}>
          <div ref={labelRef} className="flex flex-col items-center transition-opacity duration-300" style={{ transform: `translateY(calc(50% + ${Math.round(venture.size * 34 + 16)}px))` }}>
            <button
              tabIndex={-1}
              // Touch taps are handled on pointerup: browsers may retarget the follow-up
              // click to the canvas underneath a small, moving label.
              onPointerUp={(e) => e.pointerType === 'touch' && onTap(venture, true)}
              onClick={(e) => (e.nativeEvent as PointerEvent).pointerType !== 'touch' && onTap(venture)}
              onPointerDown={(e) => onPointerKind(e.pointerType)}
              onPointerEnter={(e) => onHover(venture.id, e.pointerType)}
              onPointerLeave={(e) => e.pointerType !== 'touch' && onHover(null)}
              className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors ${
                focused ? 'bg-black text-[#f3e700]' : dimmed ? 'bg-black/30 text-black/60' : 'bg-black/80 text-white'
              }`}
            >
              {venture.name}
            </button>
            {showCard && (
              <div
                className="mt-2 w-56 rounded-2xl bg-black p-3 text-left text-white shadow-2xl"
                onPointerEnter={(e) => onHover(venture.id, e.pointerType)}
                onPointerLeave={(e) => e.pointerType !== 'touch' && onHover(null)}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">{venture.domain ?? 'Under the Sun'}</span>
                  <span className="rounded-full border border-[#f3e700]/40 px-2 py-0.5 text-[10px] font-semibold text-[#f3e700]">{venture.status}</span>
                </div>
                <p className="mb-3 text-xs leading-snug text-gray-200">{venture.oneLiner}</p>
                <a
                  tabIndex={-1}
                  href={venture.href}
                  target={isExternal(venture.href) ? '_blank' : undefined}
                  rel={isExternal(venture.href) ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (!isExternal(venture.href)) {
                      e.preventDefault()
                      go(venture.href)
                    }
                  }}
                  className="block rounded-full bg-[#f3e700] py-1.5 text-center text-xs font-bold text-black hover:bg-white"
                >
                  Explore →
                </a>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  )
}

// ---------- the whole solar system ----------
function System({ interactive, running, reducedMotion, missTick, onTouchSelect, touchSelectedId }: { interactive: boolean; running: boolean; reducedMotion: boolean; missTick: number; onTouchSelect: (v: Venture | null) => void; touchSelectedId: string | null }) {
  const { size, camera, setFrameloop } = useThree()
  const aspect = size.width / Math.max(size.height, 1)
  const layout = useMemo(() => computeLayout(aspect), [aspect])

  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const lastPointer = useRef<string>('mouse')
  const paused = useRef(false)

  const focusId = hovered ?? selected
  paused.current = focusId !== null

  useEffect(() => {
    camera.position.set(0, 0, cameraZFor(aspect))
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [aspect, camera])

  useEffect(() => {
    setFrameloop(running ? 'always' : 'never')
  }, [running, setFrameloop])

  // clear everything once the hero scrolls away
  useEffect(() => {
    if (!interactive) {
      setHovered(null)
      setSelected(null)
      onTouchSelect(null)
      document.body.style.cursor = ''
    }
  }, [interactive])

  // a tap that lands on no planet closes an open card
  const lastSelectAt = useRef(0)
  // the sheet outside the canvas was closed: resume the orbits
  useEffect(() => {
    if (touchSelectedId === null) setSelected(null)
  }, [touchSelectedId])
  useEffect(() => {
    // ignore the stray canvas click that follows a touch on a label
    if (missTick > 0 && Date.now() - lastSelectAt.current > 500) {
      setSelected(null)
      onTouchSelect(null)
    }
  }, [missTick]) // eslint-disable-line react-hooks/exhaustive-deps

  const onHover = (id: string | null, pointerType?: string) => {
    if (!interactive) return
    if (pointerType) lastPointer.current = pointerType
    if (pointerType === 'touch') return // touch has no hover; taps are handled in onTap
    setHovered(id)
    document.body.style.cursor = id ? 'pointer' : ''
  }

  const onPointerKind = (pointerType: string) => {
    lastPointer.current = pointerType
  }

  const onTap = (v: Venture, fromTouch = false) => {
    if (!interactive) return
    if (fromTouch) lastPointer.current = 'touch'
    // a label tap was just handled; drop the duplicate click the canvas receives
    if (!fromTouch && Date.now() - lastSelectAt.current < 500) return
    // Touch: first tap opens the card, second tap goes. Mouse: hover already showed it, so go.
    if (lastPointer.current === 'touch' && selected !== v.id) {
      setSelected(v.id)
      onTouchSelect(v)
      lastSelectAt.current = Date.now()
      return
    }
    go(v.href)
  }

  const speedScale = reducedMotion ? 0.15 : 1
  const rMin = layout.radii[0]

  return (
    <group rotation={[0, 0, layout.portrait ? Math.PI / 2 : 0]}>
      <group rotation={[TILT, 0, 0]}>
        <Sun />
        {ventures.map((v, i) => (
          <Planet
            key={v.id}
            venture={v}
            index={i}
            radius={layout.radii[i]}
            planetScale={layout.planetScale}
            speed={0.22 * Math.pow(rMin / layout.radii[i], 1.5) * speedScale}
            paused={paused}
            focused={focusId === v.id}
            showCard={hovered === v.id}
            dimmed={focusId !== null && focusId !== v.id}
            interactive={interactive}
            onHover={onHover}
            onPointerKind={onPointerKind}
            onTap={onTap}
          />
        ))}
      </group>
    </group>
  )
}

export default function SunScene({ interactive, running, onTouchSelect, touchSelectedId }: { interactive: boolean; running: boolean; onTouchSelect: (v: Venture | null) => void; touchSelectedId: string | null }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [missTick, setMissTick] = useState(0)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const on = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const initialZ = typeof window !== 'undefined' ? cameraZFor(window.innerWidth / Math.max(window.innerHeight, 1)) : 13

  return (
    <Canvas
      camera={{ position: [0, 0, initialZ], fov: FOV }}
      flat
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      onPointerMissed={() => setMissTick((t) => t + 1)}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {/* the sun lights its planets */}
      <pointLight position={[0, 0, 0]} intensity={2.2} decay={0} color="#fff3b0" />
      <System interactive={interactive} running={running} reducedMotion={reducedMotion} missTick={missTick} onTouchSelect={onTouchSelect} touchSelectedId={touchSelectedId} />
    </Canvas>
  )
}
