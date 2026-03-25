import React, { useState } from 'react'
import Cursor from './components/Cursor.jsx'
import GearCanvas from './components/GearCanvas.jsx'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loaderVisible, setLoaderVisible] = useState(true)
  const [loaderDone, setLoaderDone] = useState(false)

  // Called by Loader once the full VITTY word has revealed
  const handleLoaderComplete = () => {
    // Short delay so user sees the completed word before transition starts
    setTimeout(() => {
      setLoaderDone(true)
      // Hide loader overlay after fly-out animation has time to complete
      setTimeout(() => setLoaderVisible(false), 900)
    }, 400)
  }

  return (
    <>
      <Loader visible={loaderVisible} onComplete={handleLoaderComplete} />
      <Cursor />

      {/* Fixed background grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(26,74,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,74,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <GearCanvas />

      {/* Page content */}
      {/* Pass loaderDone so Navbar knows when to receive the flying VITTY word */}
      <Navbar loaderDone={loaderDone} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
