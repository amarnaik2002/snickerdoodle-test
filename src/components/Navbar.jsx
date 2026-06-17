import React, { useState, useEffect } from 'react'
import { Btn } from '../utils/motion'
import newLogo from '../assets/new-logo.png'

const LINKS = [
  { label: 'HOME',       highlighted: false },
  { label: 'ABOUT',      highlighted: false, drop: true },
  { label: 'MENU',       highlighted: false, drop: true },
  { label: 'LOCATIONS',  highlighted: true },
  { label: 'GIFT CARDS', highlighted: false },
  { label: 'LOYALTY',    highlighted: false },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: '#f8f1e9',
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.12)' : '0 1px 0 rgba(0,0,0,.08)',
      transition: 'box-shadow .35s ease',
      display: 'flex', alignItems: 'center',
      padding: '0 48px', height: 68, gap: 32,
      animation: 'navSlideIn 0.7s ease-out forwards',
    }}>

      {/* Logo */}
      <a href="#" style={{ flexShrink: 0, textDecoration: 'none' }}>
        <img
          src={newLogo}
          alt="Snickerdoodle Coffeeworks"
          fetchPriority="high"
          style={{ height: 40, width: 'auto', display: 'block' }}
        />
      </a>

      {/* Nav links */}
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center',
        alignItems: 'center', gap: 30,
      }}>
        {LINKS.map(({ label, highlighted, drop }) => (
          <a
            key={label}
            href="#"
            style={{
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 12.5,
              letterSpacing: '.08em', textDecoration: 'none',
              color: '#603811', whiteSpace: 'nowrap',
              padding: highlighted ? '4px 15px' : '4px 0',
              borderRadius: 999,
              border: highlighted ? '2px solid #f15a28' : '2px solid transparent',
              transition: 'color .18s',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f15a28' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#603811' }}
          >
            {label}
            {drop && (
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M1 1l3.5 4L8 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </a>
        ))}
      </div>

      {/* CTA */}
      <Btn
        hover={{ scale: 1.05 }}
        tap={{ scale: 0.96 }}
        style={{
          background: '#f15a28', color: '#FFFDF9',
          fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 13,
          letterSpacing: '.09em', textTransform: 'uppercase',
          padding: '10px 26px', borderRadius: 7,
          border: 'none', cursor: 'pointer', flexShrink: 0,
          boxShadow: '0 4px 16px rgba(241,90,40,.40)',
          whiteSpace: 'nowrap',
        }}
      >
        ORDER NOW
      </Btn>
    </nav>
  )
}
