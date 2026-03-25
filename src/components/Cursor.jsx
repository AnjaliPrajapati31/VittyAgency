import React, { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)

    let raf
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)
    const els = document.querySelectorAll('a, button, input, textarea, select, [data-hover]')
    els.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed',
        width: hovered ? 20 : 10,
        height: hovered ? 20 : 10,
        background: 'var(--cyan)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'screen',
        transition: 'width 0.2s, height 0.2s',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed',
        width: hovered ? 56 : 38,
        height: hovered ? 56 : 38,
        border: `1px solid rgba(0,212,255,${hovered ? 0.8 : 0.4})`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.3s, height 0.3s, border-color 0.3s',
      }} />
    </>
  )
}
