# Vitty Agency — Website

**Stack:** React 18 + Vite + JavaScript + Framer Motion + Three.js

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                  # Root layout, all sections assembled
├── index.css                # Global CSS variables & base styles
├── main.jsx                 # React DOM entry point
└── components/
    ├── Loader.jsx            # Animated boot screen (Framer Motion)
    ├── Cursor.jsx            # Custom magnetic cursor with ring follower
    ├── GearCanvas.jsx        # Canvas-drawn animated gear wheels (background)
    ├── Navbar.jsx            # Sticky nav — smooth scroll to all sections
    ├── Hero.jsx              # Hero section with animated counters (IntersectionObserver)
    ├── Marquee.jsx           # Auto-scrolling services ticker
    ├── Services.jsx          # 4 service cards with hover effects
    ├── Process.jsx           # 4-step protocol timeline
    ├── About.jsx             # Split layout: Three.js 3D + value pillars
    ├── Contact.jsx           # Form that opens mailto:hello@vittyagency.com
    ├── Footer.jsx            # 4-column footer with nav links
    └── useReveal.js          # Shared scroll-reveal IntersectionObserver hook
```

## Features

- **Framer Motion** — Page load animations, scroll reveals, staggered entries
- **Three.js** — Animated torus knot with particle system & orbiting rings (About section)
- **Gear Canvas** — 5 independently rotating tech gears in the background
- **Custom Cursor** — Dot + ring follower that reacts to interactive elements
- **Smooth Scroll Navigation** — All navbar links scroll to page sections
- **Animated Counters** — Stats animate when scrolled into view
- **Contact Form** — Validates and opens mailto:hello@vittyagency.com
- **Fully Responsive** — Mobile, tablet, laptop breakpoints

## Sections

1. **Hero** — Main headline, CTA buttons, animated stats
2. **Marquee** — Scrolling ticker
3. **Services** — AI Automation, Lead Generation, CRM Integration, Retention Systems
4. **Process** — 4-step Vitty Protocol
5. **About** — Who we are, 3 value pillars, Three.js visual
6. **Contact** — Free AI Audit booking form
7. **Footer** — Links, social, branding

## Contact Form

The form composes a mailto link to `hello@vittyagency.com` with all form fields pre-filled in the email body. To switch to a real API (e.g. EmailJS, Resend, or a backend endpoint), replace the `handleSubmit` logic in `Contact.jsx`.

## Colors

```css
--navy:       #0a0e1a
--navy-light: #142040
--blue-glow:  #1a4aff
--cyan:       #00d4ff
--white:      #f0f4ff
--black:      #050810
```
