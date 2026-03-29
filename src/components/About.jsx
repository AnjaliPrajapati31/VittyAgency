import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useReveal from './useReveal.js'
import { SectionLabel } from './Services.jsx'

const PILLARS = [
  { icon: '⚡', title: 'Ease of Business', desc: 'Remove complexity. Simplify every process. Your business should run itself and we make that real.' },
  { icon: '💰', title: 'Save Time & Cost', desc: 'Recover 40+ hours/week. Eliminate $8,000–$15,000/month in operational cost within the first 60 days.' },
  { icon: '📈', title: 'High ROI Automation', desc: 'Every system is measured against clear KPIs. Clients average 5x ROI within 90 days as a baseline, not a goal.' },
]

export default function About() {
  const canvasRef = useRef(null)
  const [leftRef, leftVisible] = useReveal()
  const [rightRef, rightVisible] = useReveal()

  useEffect(() => {
    if (!leftVisible) return;

    let THREE, renderer, scene, camera, torus, torusWire, ring1, ring2, points, raf
    let isInitialized = false;

    const init = async () => {
      if (isInitialized) return;
      isInitialized = true;

      THREE = await import('three')
      const canvas = canvasRef.current
      if (!canvas) return

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setClearColor(0x000000, 0)

      const w = canvas.clientWidth || 480
      const h = canvas.clientHeight || 460
      renderer.setSize(w, h)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
      camera.position.set(0, 0, 6)

      scene.add(new THREE.AmbientLight(0x1a4aff, 0.6))
      const dLight = new THREE.DirectionalLight(0x00d4ff, 1.8)
      dLight.position.set(3, 4, 3)
      scene.add(dLight)
      const pLight = new THREE.PointLight(0x4080ff, 2.5, 12)
      pLight.position.set(-2, 2, 2)
      scene.add(pLight)

      const geo = new THREE.TorusKnotGeometry(1.3, 0.35, 120, 16)
      torus = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
        color: 0x1a4aff, emissive: 0x0a1840,
        transparent: true, opacity: 0.85, shininess: 120,
      }))
      torusWire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
        color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.12,
      }))
      scene.add(torus); scene.add(torusWire)

      // Particles
      const pGeo = new THREE.BufferGeometry()
      const pos = new Float32Array(200 * 3)
      for (let i = 0; i < 200; i++) {
        const phi = Math.acos(2 * Math.random() - 1)
        const theta = Math.random() * Math.PI * 2
        const r = 2.3 + Math.random() * 0.8
        pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
        pos[i*3+2] = r * Math.cos(phi)
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.045, transparent: true, opacity: 0.65 }))
      scene.add(points)

      // Rings
      ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.012, 8, 100), new THREE.MeshBasicMaterial({ color: 0x1a4aff, transparent: true, opacity: 0.3 }))
      ring1.rotation.x = Math.PI / 3
      ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.009, 8, 100), new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.15 }))
      ring2.rotation.x = -Math.PI / 4; ring2.rotation.z = Math.PI / 6
      scene.add(ring1); scene.add(ring2)

      let t = 0
      const animate = () => {
        t += 0.008
        torus.rotation.x = t * 0.4; torus.rotation.y = t * 0.5
        torusWire.rotation.copy(torus.rotation)
        ring1.rotation.y = t * 0.3; ring2.rotation.y = -t * 0.2
        renderer.render(scene, camera)
        raf = requestAnimationFrame(animate)
      }
      animate()

      const onResize = () => {
        const w2 = canvas.clientWidth; const h2 = canvas.clientHeight
        if (w2 && h2) { renderer.setSize(w2, h2); camera.aspect = w2 / h2; camera.updateProjectionMatrix() }
      }
      window.addEventListener('resize', onResize)
    }

    init()
    return () => { cancelAnimationFrame(raf); }
  }, [leftVisible])

  return (
    <section id="about" style={{
      padding: '120px 5vw',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6rem',
      alignItems: 'center',
    }}>
      {/* 3D canvas */}
      <motion.div
        ref={leftRef}
        initial={{ opacity: 0, x: -40 }}
        animate={leftVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ position: 'relative', height: 460 }}
      >
        <canvas ref={canvasRef} style={{
          width: '100%', height: '100%', display: 'block',
          border: '1px solid rgba(26,74,255,0.2)',
        }} />
        {/* corner badge */}
        <div style={{
          position: 'absolute', bottom: -20, right: -20,
          width: 130, height: 130,
          background: 'var(--navy-light)',
          border: '1px solid rgba(0,212,255,0.3)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          clipPath: 'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--cyan)', lineHeight: 1 }}>5x</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '2px', color: 'var(--white-muted)', textAlign: 'center', marginTop: 4 }}>
            AVG ROI<br />IN 90 DAYS
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        ref={rightRef}
        initial={{ opacity: 0, x: 40 }}
        animate={rightVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel>WHO WE ARE</SectionLabel>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
          fontWeight: 900, letterSpacing: '2px',
          textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.3rem',
        }}>
          BUILT FOR<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(240,244,255,0.3)' }}>COACHES,</span><br />
          NOT CHAOS
        </h2>
        <p style={{ color: 'var(--white-muted)', lineHeight: 1.8, marginBottom: '1.8rem', fontSize: '0.96rem' }}>
          Vitty Agency was built on one conviction: most coaching businesses are drowning in operational complexity when they should be focused on their craft. We are not a software subscription. We are not a course. We are a full-service AI automation agency that builds intelligent systems specifically for business coaches and we measure our success by three things.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {PILLARS.map((p) => <PillarItem key={p.title} {...p} />)}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          #about { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #about > div:first-child { height: 360px !important; }
        }
      `}</style>
    </section>
  )
}

function PillarItem({ icon, title, desc }) {
  const [hov, setHov] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '1rem',
        padding: '1rem',
        background: hov ? 'rgba(26,74,255,0.06)' : 'rgba(10,14,26,0.6)',
        border: `1px solid ${hov ? 'rgba(0,212,255,0.35)' : 'rgba(26,74,255,0.15)'}`,
        transition: 'all 0.2s', cursor: 'default',
      }}
    >
      <div style={{
        width: 36, height: 36, flexShrink: 0,
        background: 'rgba(0,212,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem',
        clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
      }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--cyan)', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--white-muted)' }}>{desc}</div>
      </div>
    </div>
  )
}
