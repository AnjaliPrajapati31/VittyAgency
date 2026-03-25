import React from 'react'
import { motion } from 'framer-motion'
import useReveal from './useReveal.js'
import { SectionLabel } from './Services.jsx'

const STEPS = [
  {
    num: '01',
    title: 'Free AI Audit',
    desc: 'We conduct a deep audit of every process in your coaching operation — identifying every operational leak, every manual task, and every missed automation opportunity. You walk away with a custom roadmap and projected ROI — even if you don\'t hire us.',
  },
  {
    num: '02',
    title: 'System Architecture',
    desc: 'We design your complete AI automation stack: CRM connections, lead pipelines, onboarding flows, communication triggers, and performance dashboards — all built around your specific coaching model and revenue goals.',
  },
  {
    num: '03',
    title: 'Precision Deployment',
    desc: 'Our team deploys your entire system with zero disruption to your existing operations. Within 30 days, your business is running on intelligent automation — client intake, follow-ups, scheduling, and reporting all handled automatically.',
  },
  {
    num: '04',
    title: 'Optimise & Scale',
    desc: 'Your systems get smarter over time. We continuously monitor performance, run optimisations, and scale what\'s working — compounding your cost savings and revenue gains month after month. Most clients break even within 30 days. Then they just profit.',
  },
]

export default function Process() {
  const [ref, visible] = useReveal()

  return (
    <section id="process" style={{
      padding: '120px 5vw',
      background: 'var(--navy)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Left accent line */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(to bottom, transparent, var(--blue-glow), transparent)',
      }} />

      <SectionLabel>HOW WE OPERATE</SectionLabel>
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 900, letterSpacing: '2px',
          textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '4rem',
        }}
      >
        THE VITTY<br />
        <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(240,244,255,0.3)' }}>PROTOCOL</span>
      </motion.h2>

      <div style={{ maxWidth: 800 }}>
        {STEPS.map((step, i) => (
          <ProcessStep key={step.num} {...step} delay={i * 0.12} isLast={i === STEPS.length - 1} />
        ))}
      </div>
    </section>
  )
}

function ProcessStep({ num, title, desc, delay, isLast }) {
  const [ref, visible] = useReveal()
  const [hov, setHov] = React.useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: '2rem',
        paddingTop: '2.5rem',
        paddingBottom: isLast ? '0' : '2.5rem',
        borderBottom: isLast ? 'none' : '1px solid rgba(26,74,255,0.15)',
        paddingLeft: hov ? '1rem' : 0,
        transition: 'padding-left 0.3s',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: `1px ${hov ? 'var(--cyan)' : 'rgba(26,74,255,0.5)'}`,
          lineHeight: 1, transition: 'all 0.3s',
        }}>{num}</div>
        {!isLast && <div style={{ width: 1, flex: 1, minHeight: 40, background: 'rgba(26,74,255,0.2)' }} />}
      </div>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          color: hov ? 'var(--cyan)' : 'var(--white)',
          marginBottom: '0.75rem', transition: 'color 0.25s',
        }}>{title}</div>
        <div style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--white-muted)' }}>{desc}</div>
      </div>
    </motion.div>
  )
}
