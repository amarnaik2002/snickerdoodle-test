import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Btn } from '../utils/motion'
import { useMagnetic } from '../utils/useMagnetic'
import newLogo from '../assets/new-logo.png'

const LINKS = [
  { label: 'HOME',       href: '#/',          highlighted: false },
  { label: 'ABOUT',      href: '#/about',     highlighted: false },
  { label: 'MENU',       href: '#/menu',      highlighted: false },
  { label: 'CONTACT',    href: '#/contact',   highlighted: false },
  { label: 'EVENTS',     href: '#/events',    highlighted: false },
]

export default function Navbar() {
  const ctaRef = useMagnetic(0.28)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href) => {
    const path = href.replace('#', '')
    if (path === '/') return location.pathname === '/'
    return location.pathname === path
  }

  return (
    <>
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
        <Link to="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
          <img
            src={newLogo}
            alt="Snickerdoodle Coffeeworks"
            fetchPriority="high"
            style={{ height: 40, width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Nav links — hidden on mobile */}
        <div className="nav-links" style={{
          flex: 1, display: 'flex', justifyContent: 'center',
          alignItems: 'center', gap: 30,
        }}>
          {LINKS.map(({ label, href, highlighted }) => (
            <a
              key={label}
              href={href}
              className="nav-link-wrap"
              style={{
                fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 12.5,
                letterSpacing: '.08em', textDecoration: 'none',
                color: isActive(href) ? '#f15a28' : '#603811',
                whiteSpace: 'nowrap',
                padding: highlighted ? '4px 15px' : '4px 6px',
                borderRadius: 999,
                border: highlighted ? '2px solid #f15a28' : '2px solid transparent',
                transition: 'color .18s',
                display: 'inline-flex', alignItems: 'center',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f15a28' }}
              onMouseLeave={e => { e.currentTarget.style.color = isActive(href) ? '#f15a28' : '#603811' }}
            >
              {label}
              {/* Doodle hover ring */}
              <svg className="doodle-ring" viewBox="0 0 200 52" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path className="r1" pathLength="1000"
                  d="M 7 24 C 9 9, 26 3, 100 3 C 175 3, 193 10, 193 27 C 191 44, 172 50, 100 49 C 28 50, 7 43, 7 24 Z"
                  stroke="#f15a28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="r2" pathLength="1000"
                  d="M 13 27 C 15 14, 30 8, 100 8 C 170 8, 186 14, 186 27 C 184 40, 168 45, 100 44 C 32 44, 11 40, 13 27 Z"
                  stroke="#f15a28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            </a>
          ))}
        </div>

        {/* CTA — hidden on mobile */}
        <div ref={ctaRef} className="nav-cta" style={{ flexShrink: 0 }}>
          <Btn
            className="nav-cta-shimmer btn-bounce"
            hover={{ scale: 1.04 }}
            tap={{ scale: 0.95 }}
            onClick={() => window.open('https://www.zomato.com/mumbai/snickerdoodle-coffeeworks-ambernath-thane/order', '_blank', 'noopener,noreferrer')}
            style={{
              background: '#f15a28', color: '#FFFDF9',
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 13,
              letterSpacing: '.09em', textTransform: 'uppercase',
              padding: '10px 26px', borderRadius: 7,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(241,90,40,.40)',
              whiteSpace: 'nowrap', display: 'block',
            }}
          >
            ORDER NOW
          </Btn>
        </div>

        {/* Hamburger — visible only on mobile */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span style={{ width: 22, height: 2, background: '#603811', display: 'block', borderRadius: 2, transition: 'transform .2s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}/>
          <span style={{ width: 22, height: 2, background: '#603811', display: 'block', borderRadius: 2, transition: 'opacity .2s', opacity: menuOpen ? 0 : 1 }}/>
          <span style={{ width: 22, height: 2, background: '#603811', display: 'block', borderRadius: 2, transition: 'transform .2s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}/>
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          {LINKS.map(({ label, href, highlighted, drop }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 14,
                letterSpacing: '.08em', textDecoration: 'none',
                color: isActive(href) ? '#f15a28' : '#603811',
                padding: '13px 4px',
                borderBottom: '1px solid rgba(96,56,17,.08)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f15a28' }}
              onMouseLeave={e => { e.currentTarget.style.color = isActive(href) ? '#f15a28' : '#603811' }}
            >
              {label}
              {drop && (
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M1 1l3.5 4L8 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </a>
          ))}
          <Btn
            hover={{ scale: 1.02 }} tap={{ scale: .97 }}
            onClick={() => window.open('https://www.zomato.com/mumbai/snickerdoodle-coffeeworks-ambernath-thane/order', '_blank', 'noopener,noreferrer')}
            style={{
              marginTop: 12,
              background: '#f15a28', color: '#FFFDF9',
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 13,
              letterSpacing: '.09em', textTransform: 'uppercase',
              padding: '13px 26px', borderRadius: 7,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(241,90,40,.40)',
              width: '100%',
            }}
          >
            ORDER NOW
          </Btn>
        </div>
      )}
    </>
  )
}
