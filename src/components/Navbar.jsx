import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Btn } from '../utils/motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    gsap.from(ref.current, { y: -80, opacity: 0, duration: .9, ease: 'power3.out', delay: .15 })
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['HOME', 'ABOUT', 'MENU ▾', 'LOCATIONS', 'GIFT CARDS', 'LOYALTY']

  return (
    <nav ref={ref} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? '#FFFDF9' : 'transparent',
      boxShadow: scrolled ? '0 2px 24px rgba(30,10,4,.08)' : 'none',
      transition: 'background .4s, box-shadow .4s',
      display: 'flex', alignItems: 'center',
      padding: '0 40px', height: 72,
    }}>
      {/* Logo */}
      <div style={{ flexShrink: 0 }}>
        <img
          src="/logo-nav.png"
          alt="Snickerdoodle Coffeeworks"
          fetchPriority="high"
          style={{ height: 52, width: 'auto', display: 'block' }}
        />
      </div>

      {/* Links */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
        {links.map(l => {
          const isLoc = l === 'LOCATIONS'
          return (
            <a key={l} href="#" style={{
              fontFamily: 'Nunito', fontWeight: 700, fontSize: 12,
              letterSpacing: '.08em', textDecoration: 'none',
              color: '#2C1810',
              padding: isLoc ? '4px 14px' : '4px 2px',
              borderRadius: 999,
              border: isLoc ? '2px solid #D4400A' : 'none',
              transition: 'all .2s',
            }}>
              {l}
            </a>
          )
        })}
      </div>

      {/* CTA */}
      <Btn
        hover={{ scale: 1.06 }} tap={{ scale: .96 }}
        style={{
          background: '#D4400A', color: 'white',
          fontFamily: 'Nunito', fontWeight: 800, fontSize: 13,
          letterSpacing: '.09em', textTransform: 'uppercase',
          padding: '10px 26px', borderRadius: 999,
          border: 'none', cursor: 'pointer', flexShrink: 0,
          boxShadow: '0 4px 20px rgba(212,64,10,.4)',
        }}>
        ORDER NOW
      </Btn>
    </nav>
  )
}
