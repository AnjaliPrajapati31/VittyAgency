import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onComplete }) {
  const fullText = "VITTY"

  const [typed, setTyped] = React.useState(false)

  useEffect(() => {
    // letters finish animating at ~1.0s, line disappears by 1.4s
    const t1 = setTimeout(() => setTyped(true), 1100)
    // Give a little extra time for a smooth transition to start
    const t2 = setTimeout(() => onComplete(), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2); }
  }, [onComplete])

  const containerVar = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const charVar = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        height: '72px',
        opacity: 1,
        transition: {
          height: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
          opacity: { duration: 0 }
        }
      }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '100vh',
        background: 'rgba(4, 14, 44, 1)',
        zIndex: 99999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '20px 10px 20px 10px',
      }}>
        <motion.span
          variants={typed ? undefined : containerVar}
          initial="hidden"
          animate="show"
          exit={{ 
            fontSize: '1.8rem',
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
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
          {typed ? fullText : fullText.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={charVar}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>

        {/* Loader Line: sweeps from left to right */}
        <motion.div
            initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 }}
            animate={{ 
              clipPath: [
                'inset(0% 100% 0% 0%)', 
                'inset(0% 0% 0% 0%)', 
                'inset(0% 0% 0% 0%)', 
                'inset(0% 0% 0% 100%)'
              ], 
              opacity: [1, 1, 1, 0] 
            }}
            transition={{ 
              duration: 1.4, 
              ease: "easeInOut",
              // Define when each stage of the animation happens
              times: [0, 0.71, 0.86, 1] // [0s, 1.0s, 1.2s, 1.4s] relative to 1.4s duration
            }}
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '10px',
              right: '10px',
              height: '4px',
              background: 'var(--cyan, #00d4ff)',
              borderRadius: '2px',
            }}
        />
      </div>
    </motion.div>
  )
}
