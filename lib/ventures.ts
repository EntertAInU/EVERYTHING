// One source of truth for every venture under the sun.
// The orbiting planets, the venture index, and the structured data all read this file,
// so editing a line here updates all three at once.

export type VentureStatus = 'Live' | 'Beta' | 'In development' | 'Exploring'

export type Venture = {
  id: string
  name: string
  oneLiner: string
  status: VentureStatus
  href: string // external site or an on-page #section
  domain?: string // shown under the name when it is a real, separate site
  color: string // planet color
  size: number // planet radius in scene units
}

export const ventures: Venture[] = [
  {
    id: 'libertadai',
    name: 'LibertadAI',
    oneLiner: 'An all-in-one AI workspace for getting real work done.',
    status: 'Beta',
    href: 'https://libertadai.com',
    domain: 'libertadai.com',
    color: '#111111',
    size: 0.42,
  },
  {
    id: 'agentiverse',
    name: 'AI Agentiverse',
    oneLiner: 'Get your business recommended by every major AI model.',
    status: 'Live',
    href: 'https://aiagentiverse.com',
    domain: 'aiagentiverse.com',
    color: '#ffffff',
    size: 0.38,
  },
  {
    id: 'chuckl',
    name: 'Chuckl',
    oneLiner: 'The agentic home base for comedians, their content, and the brands that want them.',
    status: 'In development',
    href: 'https://chuckl.org',
    domain: 'chuckl.org',
    color: '#ff5a1f',
    size: 0.4,
  },
  {
    id: 'arti',
    name: 'ARTI Labs',
    oneLiner: 'DIY automation tools and agents for small teams.',
    status: 'In development',
    href: 'https://arti.diy',
    domain: 'arti.diy',
    color: '#00b3a4',
    size: 0.34,
  },
  {
    id: 'artilove',
    name: 'ARTI Love',
    oneLiner: 'Companion robotics and AI companionship, designed with care.',
    status: 'Exploring',
    href: 'https://artilove.online',
    domain: 'artilove.online',
    color: '#e8437a',
    size: 0.36,
  },
  {
    id: 'studios',
    name: 'EUtS Studios',
    oneLiner: 'A comedy series, the animated Bruce Banana, and an animated feature in the works.',
    status: 'In development',
    href: '#secret-pipeline',
    color: '#6b4cff',
    size: 0.46,
  },
  {
    id: 'sovereignty',
    name: 'Digital Sovereignty',
    oneLiner: 'Forensics and device hardening for people who own their hardware.',
    status: 'Live',
    href: '#digital-sovereignty',
    color: '#0e3b2e',
    size: 0.32,
  },
]

export const isExternal = (href: string) => href.startsWith('http')
