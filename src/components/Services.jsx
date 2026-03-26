import React from 'react'
import { motion } from 'framer-motion'
import useReveal from './useReveal.js'

const SERVICES = [
  {
    num: '01', tag: 'AUTOMATION',
    name: 'AI Business Automation',
    desc: 'We audit every process in your coaching operation — from lead discovery to programme completion — and replace manual, fragmented steps with seamless automated flows. One unified system replaces 5–10 disconnected tools.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <rect x="4" y="4" width="48" height="48" rx="2" stroke="rgba(26,74,255,0.4)" strokeWidth="1"/>
        <path d="M14 38L22 24L30 30L42 14" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="38" r="3" fill="#00d4ff" fillOpacity="0.4"/>
        <circle cx="42" cy="14" r="3" fill="#00d4ff"/>
        <path d="M14 44H42" stroke="rgba(26,74,255,0.4)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    num: '02', tag: 'LEADS',
    name: 'Lead Generation Systems',
    desc: 'Lead generation systems that fill your pipeline 24/7 — no ad spend required. Follow-up automation that converts 3x more leads with zero extra sales effort, operating around the clock.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="22" stroke="rgba(26,74,255,0.4)" strokeWidth="1"/>
        <circle cx="28" cy="28" r="10" stroke="#00d4ff" strokeWidth="1.5"/>
        <circle cx="28" cy="28" r="3" fill="#00d4ff"/>
        <line x1="28" y1="6" x2="28" y2="18" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
        <line x1="28" y1="38" x2="28" y2="50" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
        <line x1="6" y1="28" x2="18" y2="28" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
        <line x1="38" y1="28" x2="50" y2="28" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    num: '03', tag: 'OPERATIONS',
    name: 'CRM & Workflow Integration',
    desc: 'WhatsApp, email, and CRM all connected — one action triggers everything downstream. Smart workflows that route tasks, flag priorities, and eliminate decision fatigue so your team only does high-value work.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <circle cx="16" cy="28" r="8" stroke="rgba(26,74,255,0.4)" strokeWidth="1"/>
        <circle cx="40" cy="16" r="8" stroke="rgba(26,74,255,0.4)" strokeWidth="1"/>
        <circle cx="40" cy="40" r="8" stroke="rgba(26,74,255,0.4)" strokeWidth="1"/>
        <line x1="24" y1="25" x2="32" y2="19" stroke="#00d4ff" strokeWidth="1.5"/>
        <line x1="24" y1="31" x2="32" y2="37" stroke="#00d4ff" strokeWidth="1.5"/>
        <circle cx="16" cy="28" r="3" fill="#00d4ff" fillOpacity="0.6"/>
        <circle cx="40" cy="16" r="3" fill="#00d4ff" fillOpacity="0.6"/>
        <circle cx="40" cy="40" r="3" fill="#00d4ff" fillOpacity="0.6"/>
      </svg>
    ),
  },
  {
    num: '04', tag: 'RETENTION',
    name: 'Client Retention & ROI Systems',
    desc: 'Upsell and re-engagement sequences that unlock revenue from your existing audience. Referral automation that turns happy clients into a consistent revenue channel, with retention systems that reduce churn and increase lifetime value.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <path d="M28 8L50 20V36L28 48L6 36V20L28 8Z" stroke="rgba(26,74,255,0.4)" strokeWidth="1"/>
        <path d="M28 8L28 48" stroke="rgba(0,212,255,0.2)" strokeWidth="1"/>
        <path d="M6 20L50 20" stroke="rgba(0,212,255,0.2)" strokeWidth="1"/>
        <path d="M6 36L50 36" stroke="rgba(0,212,255,0.2)" strokeWidth="1"/>
        <circle cx="28" cy="28" r="6" stroke="#00d4ff" strokeWidth="1.5"/>
        <circle cx="28" cy="28" r="2" fill="#00d4ff"/>
      </svg>
    ),
  },
]

export default function Services() {
  const [ref, visible] = useReveal()

  return (
    <section id="services" style={{ padding: '120px 5vw' }}>
      <SectionLabel>WHAT WE BUILD</SectionLabel>
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 900, letterSpacing: '2px',
          textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1rem',
        }}
      >
        OUR <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(240,244,255,0.3)' }}>AUTOMATION</span><br />SERVICES
      </motion.h2>
      <p style={{ color: 'var(--white-muted)', maxWidth: 560, lineHeight: 1.8, marginBottom: '3.5rem', fontSize: '0.98rem' }}>
        Every system we build is engineered around one question: what is the measurable return on this investment?
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5px',
        border: '1.5px solid rgba(26,74,255,0.2)',
      }}>
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.num} {...s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ num, tag, name, desc, icon, delay }) {
  const [ref, visible] = useReveal()
  const [hov, setHov] = React.useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--navy-light)' : 'var(--navy)',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1.5px solid rgba(26,74,255,0.15)',
        transition: 'background 0.3s',
        cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, var(--blue-glow), var(--cyan))',
        transform: `scaleX(${hov ? 1 : 0})`,
        transformOrigin: 'left',
        transition: 'transform 0.4s',
      }} />

      <div style={{ width: 52, height: 52, marginBottom: '1.5rem' }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', letterSpacing: '3px', color: 'var(--blue-bright)', marginBottom: '0.6rem' }}>
        {num} / {tag}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '0.9rem' }}>
        {name}
      </div>
      <div style={{ fontSize: '0.93rem', lineHeight: 1.75, color: 'var(--white-muted)' }}>{desc}</div>
    </motion.div>
  )
}

export function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '4px',
      textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '1rem',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ width: 32, height: 1, background: 'var(--cyan)', display: 'inline-block' }} />
      {children}
    </div>
  )
}
