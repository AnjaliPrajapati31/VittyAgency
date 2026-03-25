import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [textIndex, setTextIndex] = useState(0)
  const fullText = "VITTY"

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => {
        if (prev >= fullText.length) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 500)
          return prev
        }
        return prev + 1
      })
    }, 150) // Typing speed
    
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4, 14, 44, 1)',
        zIndex: 99999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '10px',
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
              display: 'inline-flex',
              whiteSpace: 'nowrap',
            }}
        >
          {fullText.split('').map((char, i) => (
             <motion.span
               key={i}
               style={{ position: 'relative', display: 'inline-block' }}
             >
               {/* Left Half (Vertical Split) */}
               <motion.span
                 initial={{ y: '-80%', opacity: 0 }}
                 animate={ i < textIndex ? { y: '0%', opacity: 1 } : { y: '-80%', opacity: 0 } }
                 transition={{ duration: 0.4, ease: 'easeOut' }}
                 style={{ 
                   position: 'absolute', 
                   left: 0, top: 0, 
                   clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' 
                 }}
               >
                 {char}
               </motion.span>
               
               {/* Right Half (Vertical Split) */}
               <motion.span
                 initial={{ y: '80%', opacity: 0 }}
                 animate={ i < textIndex ? { y: '0%', opacity: 1 } : { y: '80%', opacity: 0 } }
                 transition={{ duration: 0.4, ease: 'easeOut' }}
                 style={{ 
                   position: 'absolute', 
                   left: 0, top: 0, 
                   clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' 
                 }}
               >
                 {char}
               </motion.span>

               {/* Hidden placeholder for sizing */}
               <span style={{ opacity: 0 }}>{char}</span>
             </motion.span>
          ))}
        </motion.span>
        
        {/* Blinking cursor */}
        <AnimatePresence>
          {textIndex <= fullText.length && (
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