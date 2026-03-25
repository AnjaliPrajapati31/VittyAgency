import React from 'react'

const ITEMS = [
  'AI Automation', 'Lead Generation', 'Client Onboarding',
  'CRM Integration', 'WhatsApp Automation', 'Email Sequences',
  'Performance Dashboards', 'Smart Workflows', 'AI Assistants', 'Cost Reduction',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div style={{
      borderTop: '1px solid rgba(26,74,255,0.2)',
      borderBottom: '1px solid rgba(26,74,255,0.2)',
      background: 'rgba(10,14,26,0.85)',
      padding: '14px 0', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', gap: '4rem',
        animation: 'marqueeScroll 24s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)', fontSize: '0.68rem',
            letterSpacing: '4px', textTransform: 'uppercase',
            color: 'var(--white-muted)', display: 'inline-flex',
            alignItems: 'center', gap: '1rem', flexShrink: 0,
          }}>
            <span style={{ color: 'var(--cyan)', fontSize: '0.45rem' }}>◆</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
