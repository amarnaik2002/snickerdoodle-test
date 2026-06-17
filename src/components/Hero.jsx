import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import icedCoffee from '../assets/icedcoffee.png'
import doodles from '../assets/doodles.png'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.h-line', {
        y: 90, opacity: 0, duration: 1,
        stagger: .14, ease: 'power4.out', delay: .5,
      })
      gsap.from('.h-sub', { y: 28, opacity: 0, duration: .75, ease: 'power3.out', delay: 1.1 })
      gsap.from('.h-cup', { x: 80, opacity: 0, duration: 1.1, ease: 'power3.out', delay: .7 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      position: 'relative', background: '#f15a28',
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden',
    }}>
      <div className="grain-overlay"/>

      {/* Floating iced coffee cup â€” GSAP handles the float so mix-blend-mode composites correctly */}
      {/* Doodle croissant */}
      <div className="anim-floatB" style={{
        position: 'absolute',
        left: '3%',
        bottom: '12%',
        zIndex: 4,
        pointerEvents: 'none',
      }}>
        <img
          src={doodles}
          alt="Illustrated croissant"
          style={{
            width: 'clamp(140px, 16vw, 240px)',
            height: 'auto',
            display: 'block',
            transform: 'rotate(-12deg)',
            filter: 'drop-shadow(0 12px 28px rgba(30,10,4,.22))',
          }}
        />
      </div>

      <div className="h-cup" style={{
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 4,
        pointerEvents: 'none',
      }}>
        <img
          src={icedCoffee}
          alt="Iced coffee"
          fetchPriority="high"
          style={{
            width: 'auto',
            height: 'clamp(460px, 80vh, 720px)',
            display: 'block',
            transform: 'rotate(8deg)',
            filter: 'drop-shadow(0 20px 40px rgba(30,10,4,.3))',
          }}
        />
      </div>

      {/* Centre headline */}
      <div style={{
        position: 'relative', zIndex: 5,
        textAlign: 'center', padding: '0 24px',
        maxWidth: 860,
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="h-line" style={{
            fontFamily: 'Caprasimo', fontWeight: 900,
            fontSize: 'clamp(68px,11vw,148px)',
            color: '#FFFDF9', lineHeight: .95,
            textTransform: 'uppercase', letterSpacing: '-.02em',
            display: 'block',
          }}>WAKE UP</div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div className="h-line" style={{
            fontFamily: 'Dancing Script', fontWeight: 700,
            fontSize: 'clamp(48px,8.5vw,110px)',
            color: '#603811', lineHeight: 1.05,
            fontStyle: 'italic', display: 'block',
          }}>to the good</div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div className="h-line" style={{
            fontFamily: 'Caprasimo', fontWeight: 900,
            fontSize: 'clamp(68px,11vw,148px)',
            color: '#FFFDF9', lineHeight: .95,
            textTransform: 'uppercase', letterSpacing: '-.02em',
            display: 'block',
          }}>STUFF.</div>
        </div>

        <p className="h-sub" style={{
          fontFamily: 'Lora', fontSize: 'clamp(15px,1.8vw,18px)',
          color: 'rgba(255,253,249,.78)', fontStyle: 'italic',
          margin: '28px auto 0', maxWidth: 480, lineHeight: 1.75,
        }}>
          Specialty coffee roasted with love.<br/>
          Baked goods that make Monday worth it.
        </p>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 5,
      }}>
        <span style={{ fontFamily: 'Caprasimo', fontSize: 10, letterSpacing: '.18em', color: 'rgba(255,253,249,.4)', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" stroke="rgba(255,253,249,.35)" strokeWidth="2" strokeLinecap="round">
          <rect x="1" y="1" width="16" height="22" rx="8"/>
          <line x1="9" y1="6" x2="9" y2="10" className="steam-1"/>
        </svg>
      </div>
    </section>
  )
}
