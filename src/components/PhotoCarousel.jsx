import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import c1 from '../assets/carousel-1.jpg'
import c2 from '../assets/carousel-2.jpg'
import c3 from '../assets/carousel-3.jpg'
import c4 from '../assets/carousel-4.jpg'
import c5 from '../assets/carousel-5.jpg'
import c6 from '../assets/carousel-6.jpg'
import c7 from '../assets/carousel-7.jpg'
import c8 from '../assets/carousel-8.jpg'
import c9 from '../assets/carousel-9.jpg'
import c10 from '../assets/carousel-10.jpg'

const PHOTOS = [
  { img: c1, rot: -6, alt: 'Barista steaming milk' },
  { img: c2, rot:  4, alt: 'Snickerdoodle cafe counter' },
  { img: c3, rot: -3, alt: 'Strawberry pancakes' },
  { img: c4, rot:  5, alt: 'Croissant on branded cup' },
  { img: c5, rot: -5, alt: 'Tamping espresso' },
  { img: c6, rot:  3, alt: 'Pizza pull' },
  { img: c7,  rot: -4, alt: 'Barista preparing coffees' },
  { img: c8,  rot:  6, alt: 'Staff with croissant' },
  { img: c9,  rot: -5, alt: 'Founder pouring coffee' },
  { img: c10, rot:  3, alt: 'Founder tasting coffee' },
]

// Duplicate for seamless infinite loop
const TRACK = [...PHOTOS, ...PHOTOS]

export default function PhotoCarousel() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 36, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FFFDF9',
        padding: '88px 0 100px',
        borderTop: '1px solid #EDD9BE',
        overflow: 'hidden',
      }}
    >
      {/* Tagline */}
      <div
        ref={headingRef}
        style={{
          textAlign: 'center',
          marginBottom: 64,
          padding: '0 24px',
        }}
      >
        <p style={{
          fontFamily: 'Lora',
          fontStyle: 'italic',
          fontSize: 'clamp(13px, 1.8vw, 17px)',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: '#9E6B54',
          marginBottom: 14,
        }}>
          moments brewed daily
        </p>
        <h2 style={{
          fontFamily: 'Caprasimo',
          fontWeight: 900,
          fontSize: 'clamp(28px, 4.5vw, 56px)',
          color: '#2C1810',
          lineHeight: 1.15,
          maxWidth: 680,
          margin: '0 auto',
          letterSpacing: '.01em',
        }}>
          Familiar faces, warm cups, and a corner that feels like yours.
        </h2>
      </div>

      {/* Scrolling track */}
      <div style={{ position: 'relative' }}>
        {/* fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to right, #FFFDF9 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to left, #FFFDF9 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* ticker wrapper */}
        <div style={{ overflow: 'hidden' }}>
          <div className="photo-ticker">
            {TRACK.map((photo, i) => (
              <div
                key={i}
                className="photo-card"
                style={{
                  '--rot': `${photo.rot}deg`,
                  flexShrink: 0,
                  width: 240,
                  height: 320,
                  marginRight: 28,
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(44,24,16,.14)',
                  transform: `rotate(${photo.rot}deg)`,
                  border: '4px solid #FFFDF9',
                  outline: '1px solid rgba(44,24,16,.08)',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <img
                  src={photo.img}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .photo-ticker {
          display: flex;
          align-items: center;
          padding: 40px 0;
          width: max-content;
          animation: ticker-scroll 36s linear infinite;
          will-change: transform;
        }
        .photo-ticker:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .photo-card {
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
        }
        .photo-ticker:hover .photo-card:hover {
          transform: rotate(0deg) scale(1.06) !important;
          box-shadow: 0 20px 52px rgba(44,24,16,.22);
          z-index: 10;
        }
      `}</style>
    </section>
  )
}
