import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [text, setText] = useState('')
  const fullText = "VITTY"

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1))
      index++
      if (index === fullText.length) {
        clearInterval(interval)
        setTimeout(() => onComplete(), 500)
      }
    }, 150) // Typing speed
    
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--navy)',
        zIndex: 99999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
          display: 'flex',
          alignItems: 'center',
      }}>
        <motion.span
          layoutId="vitty-logo"
          transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '3px',
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1,
            }}
        >
          {text}
        </motion.span>
        
        {/* Blinking cursor */}
        <AnimatePresence>
          {text.length <= fullText.length && (
            <motion.span
              exit={{ opacity: 0 }}
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
              style={{
                fontFamily: 'var(--font-display, sans-serif)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1,
                marginLeft: '5px',
              }}
            >
              |
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}