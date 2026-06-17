import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MA } from '../utils/motion'
import { MapPin, Clock } from '../icons'

gsap.registerPlugin(ScrollTrigger)

const LOCS = [
  {
    name:  'The West End',
    addr:  '42 Hazel Street, West End',
    hours: 'Mon-Fri 6am-5pm / Sat-Sun 7am-4pm',
    tags:  ['Dine In', 'Takeaway', 'Dog Friendly'],
    photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&h=300&q=80',
  },
  {
    name:  'Fortitude Valley',
    addr:  '118 Ann Street, Fortitude Valley',
    hours: 'Mon-Fri 6:30am-6pm / Sat 7am-5pm',
    tags:  ['Dine In', 'Takeaway', 'Late Hours'],
    photo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&h=300&q=80',
  },
  {
    name:  'New Farm',
    addr:  '7 Brunswick Street, New Farm',
    hours: 'Mon-Sun 7am-3pm',
    tags:  ['Dine In', 'Takeaway', 'Garden Seats'],
    photo: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&h=300&q=80',
  },
]

function SwirlyArrow() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" style={{ display: 'block' }}>
      <path
        d="M100 20 C80 20, 40 30, 30 60 C20 90, 50 110, 70 90 C90 70, 60 50, 40 70 C30 80, 35 100, 50 105"
        stroke="#f15a28" strokeWidth="2.5" strokeLinecap="round" fill="none"
      />
      <path d="M50 105 L44 96 M50 105 L60 100" stroke="#f15a28" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

function GlobalStamp() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="56" stroke="#3B2010" strokeWidth="2" strokeDasharray="4 3"/>
        <circle cx="60" cy="60" r="46" stroke="#3B2010" strokeWidth="1.2"/>
        <text x="60" y="30" textAnchor="middle" fontFamily="Caprasimo" fontWeight="800" fontSize="10" fill="#3B2010" letterSpacing="3">
          GLOBAL
        </text>
        <text x="60" y="66" textAnchor="middle" fontFamily="Dancing Script" fontSize="11" fill="#3B2010">
          start
        </text>
        <text x="60" y="79" textAnchor="middle" fontFamily="Dancing Script" fontSize="11" fill="#3B2010">
          from
        </text>
        <text x="60" y="92" textAnchor="middle" fontFamily="Dancing Script" fontSize="11" fill="#3B2010">
          here
        </text>
        <path d="M24 105 Q36 98 48 105 Q60 112 72 105 Q84 98 96 105" stroke="#3B2010" strokeWidth="1.2" fill="none"/>
        <text
          x="60" y="108"
          textAnchor="middle"
          fontFamily="Caprasimo" fontWeight="800" fontSize="8"
          fill="#3B2010" letterSpacing="3"
          style={{ dominantBaseline: 'central' }}
        >
        </text>
        <path
          d="M10 60 A50 50 0 0 1 110 60"
          stroke="none" fill="none" id="stamp-arc-bottom"
        />
        <text fontFamily="Caprasimo" fontWeight="800" fontSize="9" fill="#3B2010" letterSpacing="2.5">
          <textPath href="#stamp-arc-bottom" startOffset="50%" textAnchor="middle">FLAVOURS</textPath>
        </text>
        <path
          d="M110 60 A50 50 0 0 1 10 60"
          stroke="none" fill="none" id="stamp-arc-top"
        />
        <text fontFamily="Caprasimo" fontWeight="800" fontSize="9" fill="#3B2010" letterSpacing="2.5">
          <textPath href="#stamp-arc-top" startOffset="50%" textAnchor="middle">FLAVOURS</textPath>
        </text>
        <text x="60" y="46" textAnchor="middle" fontFamily="Caprasimo" fontWeight="800" fontSize="8" fill="#3B2010" letterSpacing="1">
          â˜…
        </text>
        <text x="38" y="107" textAnchor="middle" fontFamily="Caprasimo" fontWeight="800" fontSize="7" fill="#3B2010">â˜…</text>
        <text x="82" y="107" textAnchor="middle" fontFamily="Caprasimo" fontWeight="800" fontSize="7" fill="#3B2010">â˜…</text>
      </svg>
      <svg width="70" height="60" viewBox="0 0 70 60" fill="none">
        <path d="M0 10 Q17 5 35 10 Q52 15 70 10" stroke="#f15a28" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <path d="M0 25 Q17 20 35 25 Q52 30 70 25" stroke="#f15a28" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <path d="M0 40 Q17 35 35 40 Q52 45 70 40" stroke="#f15a28" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export default function Locations() {
  const ref = useRef(null)
  const bannerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.loc-banner-find', {
        y: 50, opacity: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: bannerRef.current, start: 'top 80%' },
      })
      gsap.from('.loc-banner-btn', {
        y: 20, opacity: 0, duration: .7, delay: .3, ease: 'power3.out',
        scrollTrigger: { trigger: bannerRef.current, start: 'top 80%' },
      })
      gsap.from('.loc-section-title', {
        y: 40, opacity: 0, duration: .85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.loc-card', {
        y: 50, opacity: 0, stagger: .13, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: '.locs-grid', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref}>

      {/* â”€â”€ Banner â”€â”€ */}
      <div
        ref={bannerRef}
        style={{
          background: '#FAF0E6',
          // borderTop: ' #f15a28',
          padding: '72px 64px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* left flourish */}
        <div style={{
          position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)',
        }}>
          <SwirlyArrow />
        </div>

        {/* center text */}
        <div className="loc-banner-find" style={{ textAlign: 'center', lineHeight: 1, userSelect: 'none' }}>
          <div style={{
            fontFamily: 'Caprasimo', fontWeight: 900,
            fontSize: 'clamp(64px, 9vw, 110px)',
            color: '#f15a28',
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
          }}>
            FIND
          </div>

          <div style={{
            fontFamily: 'Dancing Script', fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#2C1810',
            marginTop: '-8px',
            marginBottom: '-4px',
            lineHeight: 1.2,
          }}>
            our
          </div>

          <div style={{
            fontFamily: 'Caprasimo', fontWeight: 900,
            fontSize: 'clamp(64px, 9vw, 110px)',
            color: '#f15a28',
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
          }}>
            LOCATION
          </div>

          <div className="loc-banner-btn" style={{ marginTop: 28 }}>
            <a
              href="#locs-grid"
              className="btn-bounce"
              style={{
                display: 'inline-block',
                background: '#f15a28',
                color: '#fff',
                fontFamily: 'Caprasimo', fontWeight: 800,
                fontSize: 14,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '14px 44px',
                borderRadius: 6,
                boxShadow: '0 6px 24px rgba(241,90,40,.4)',
              }}
            >
              FIND US
            </a>
          </div>
        </div>

        {/* right stamp */}
        <div style={{
          position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)',
        }}>
          <GlobalStamp />
        </div>
      </div>

      {/* â”€â”€ Location Cards â”€â”€ */}
      <div id="locs-grid" style={{ background: '#FFFDF9', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div className="loc-section-title" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'Dancing Script', fontSize: 22, color: '#f15a28', fontWeight: 600, marginBottom: 8 }}>
              find us near you
            </div>
            <h2 style={{
              fontFamily: 'Caprasimo', fontWeight: 900,
              fontSize: 'clamp(28px,4vw,44px)', color: '#2C1810',
            }}>Our Locations</h2>
          </div>

          <div className="locs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {LOCS.map(loc => (
              <div key={loc.name} className="loc-card" style={{
                background: '#FFFDF9', borderRadius: 20,
                border: '1.5px solid #EDD9BE',
                overflow: 'hidden',
                boxShadow: '0 2px 14px rgba(30,10,4,.05)',
              }}>
                {/* Photo header */}
                <div style={{ height: 160, overflow: 'hidden' }}>
                  <img src={loc.photo} alt={loc.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transition: 'transform .5s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                  />
                </div>

                {/* Card content */}
                <div style={{ padding: '22px 24px 24px' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}><MapPin/></div>
                  <div>
                    <div style={{ fontFamily: 'Caprasimo', fontWeight: 800, fontSize: 18, color: '#2C1810' }}>{loc.name}</div>
                    <div style={{ fontFamily: 'Lora', fontSize: 13, color: '#9E6B54', fontStyle: 'italic', marginTop: 2 }}>{loc.addr}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
                  <Clock/>
                  <span style={{ fontFamily: 'Lora', fontSize: 12, color: '#9E6B54', fontStyle: 'italic' }}>{loc.hours}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                  {loc.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'Caprasimo', fontWeight: 700, fontSize: 11,
                      background: '#FAE8DC', color: '#A83008',
                      padding: '3px 11px', borderRadius: 999,
                    }}>{t}</span>
                  ))}
                </div>

                <MA href="#" hover={{ x: 5 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'Caprasimo', fontWeight: 700, fontSize: 12,
                    letterSpacing: '.08em', textTransform: 'uppercase',
                    color: '#f15a28', textDecoration: 'none',
                  }}>
                  Get Directions
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </MA>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
