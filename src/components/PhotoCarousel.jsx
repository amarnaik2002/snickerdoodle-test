import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PHOTOS = [
  { img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=420&h=560&q=80', rot: -6, alt: 'Coffee cup overhead' },
  { img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=420&h=560&q=80', rot: 4,  alt: 'Latte art' },
  { img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=420&h=560&q=80', rot: -3, alt: 'Barista at work' },
  { img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=420&h=560&q=80', rot: 5,  alt: 'CafÃ© atmosphere' },
  { img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=420&h=560&q=80', rot: -5, alt: 'Coffee beans' },
  { img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=420&h=560&q=80', rot: 3,  alt: 'Espresso pour' },
  { img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=420&h=560&q=80', rot: -4, alt: 'Cold brew' },
  { img: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=420&h=560&q=80', rot: 6,  alt: 'Pastry and coffee' },
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
