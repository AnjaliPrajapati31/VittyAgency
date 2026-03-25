import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'

const LETTERS = ['V', 'I', 'T', 'T', 'Y']

export default function Loader({ visible, onComplete }) {
  const progress = useMotionValue(0)
  const barWidth = useTransform(progress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    if (!visible) return
    
    // Reset progress when visible starts
    progress.set(0)

    const controls = animate(progress, 1, {
      duration: 2.5,
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(() => onComplete?.(), 500)
      }
    })

    return () => controls.stop()
  }, [visible, progress, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0,
            background: '#000',
            zIndex: 99999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Container for Text + Bar */}
          <div style={{ width: 'fit-content', textAlign: 'center' }}>
            
            {/* 1. THE LETTERS (Only one set!) */}
            <div style={{
              display: 'flex',
              gap: '0.15em',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '0.1em',
              color: '#fff',
              marginBottom: '1rem'
            }}>
              {LETTERS.map((letter, i) => {
                // Each letter fades in based on progress
                const start = i / LETTERS.length
                const end = (i + 0.5) / LETTERS.length
                const opacity = useTransform(progress, [start, end], [0, 1])
                
                return (
                  <motion.span key={i} style={{ opacity }}>
                    {letter}
                  </motion.span>
                )
              })}
              
              {/* The Dot */}
              <motion.span 
                style={{ 
                  color: 'var(--cyan, #00d4ff)',
                  opacity: useTransform(progress, [0.9, 1], [0, 1]) 
                }}
              >
                .
              </motion.span>
            </div>

            {/* 2. THE PROGRESS BAR */}
            <div style={{
              width: '100%',
              height: '2px',
              background: 'rgba(255,255,255,0.1)',
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <motion.div
                style={{
                  width: barWidth,
                  height: '100%',
                  background: '#fff',
                  boxShadow: '0 0 10px #fff'
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}