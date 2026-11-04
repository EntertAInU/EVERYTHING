'use client'

import { motion } from 'framer-motion'
import { ventures, isExternal, type VentureStatus } from '@/lib/ventures'

const statusStyle: Record<VentureStatus, string> = {
  Live: 'bg-green-500/15 text-green-300 border-green-500/40',
  Beta: 'bg-[#f3e700]/15 text-[#f3e700] border-[#f3e700]/40',
  'In development': 'bg-white/10 text-gray-200 border-white/25',
  Exploring: 'bg-white/5 text-gray-400 border-white/15',
}

// The readable version of the solar system: real links that people, screen readers,
// search engines and AI agents can all follow, whatever the 3D scene is doing.
export default function VentureIndex() {
  return (
    <section id="ventures" aria-labelledby="ventures-heading" className="relative px-4 py-16 md:py-24 pointer-events-auto">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-10 md:mb-14 text-center text-black"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-3">In orbit</p>
          <h2 id="ventures-heading" className="text-3xl md:text-6xl font-bold">Everything Under the Sun</h2>
        </motion.div>

        <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
          {ventures.map((v, i) => (
            <motion.li
              key={v.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <a
                href={v.href}
                target={isExternal(v.href) ? '_blank' : undefined}
                rel={isExternal(v.href) ? 'noopener noreferrer' : undefined}
                className="group flex h-full flex-col rounded-2xl bg-black p-6 text-white shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-[#f3e700]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3e700]"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 rounded-full ring-1 ring-white/30" style={{ backgroundColor: v.color }} aria-hidden="true" />
                    <span className="text-lg md:text-xl font-bold">{v.name}</span>
                  </span>
                  <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyle[v.status]}`}>{v.status}</span>
                </div>
                <p className="mb-6 flex-1 text-sm md:text-base leading-relaxed text-gray-300">{v.oneLiner}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{v.domain ?? 'On this page'}</span>
                  <span className="font-bold text-[#f3e700] transition-transform group-hover:translate-x-1">Explore →</span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
