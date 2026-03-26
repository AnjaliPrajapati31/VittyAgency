import React, { useEffect, useRef } from 'react'

const GEARS = [
  { x: 0.85, y: 0.15, r: 120, teeth: 18, speed: 0.003,  color: 'rgba(20,64,128,0.55)' },
  { x: 0.12, y: 0.75, r: 90,  teeth: 12, speed: -0.004, color: 'rgba(26,74,255,0.38)' },
  { x: 0.70, y: 0.88, r: 70,  teeth: 10, speed: 0.005,  color: 'rgba(0,212,255,0.18)' },
  { x: 0.04, y: 0.18, r: 50,  teeth: 8,  speed: -0.006, color: 'rgba(20,64,128,0.45)' },
  { x: 0.50, y: 0.48, r: 155, teeth: 24, speed: 0.002,  color: 'rgba(10,30,80,0.38)' },
]

function drawGear(ctx, x, y, r, teeth, angle, color) {
  const toothH = r * 0.22
  const toothW = (2 * Math.PI / teeth) * 0.42
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5

  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2
    ctx.lineTo(Math.cos(a - toothW / 2) * r, Math.sin(a - toothW / 2) * r)
    ctx.lineTo(Math.cos(a - toothW / 2) * (r + toothH), Math.sin(a - toothW / 2) * (r + toothH))
    ctx.lineTo(Math.cos(a + toothW / 2) * (r + toothH), Math.sin(a + toothW / 2) * (r + toothH))
    ctx.lineTo(Math.cos(a + toothW / 2) * r, Math.sin(a + toothW / 2) * r)
  }
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath(); ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2); ctx.stroke()
  for (let i = 0; i < 6; i++) {
    const sa = (i / 6) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(Math.cos(sa) * r * 0.2, Math.sin(sa) * r * 0.2)
    ctx.lineTo(Math.cos(sa) * r * 0.55, Math.sin(sa) * r * 0.55)
    ctx.stroke()
  }
  ctx.restore()
}

export default function GearCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const angles = GEARS.map(() => 0)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let raf
    let lastTime = 0
    const frameDelay = 1000 / 30 // ~30 FPS

    const animate = (time) => {
      raf = requestAnimationFrame(animate)
      if (time - lastTime < frameDelay) return
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      GEARS.forEach((g, i) => {
        angles[i] += g.speed
        drawGear(ctx, g.x * canvas.width, g.y * canvas.height, g.r, g.teeth, angles[i], g.color)
      })
    }
    raf = requestAnimationFrame(animate)

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0,
      zIndex: 0, pointerEvents: 'none', opacity: 0.28,
    }} />
  )
}
