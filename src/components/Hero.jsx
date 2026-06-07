import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Btn } from '../utils/motion'
import { Bean, Arrow, Star } from '../icons'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* stagger headline lines */
      gsap.from('.h-line', {
        y: 90, opacity: 0, duration: 1,
        stagger: .14, ease: 'power4.out', delay: .5,
      })
      gsap.from('.h-sub',   { y: 28, opacity: 0, duration: .75, ease: 'power3.out', delay: 1.1 })
      gsap.from('.h-cta',   { y: 20, opacity: 0, duration: .65, ease: 'power3.out', delay: 1.35 })
      gsap.from('.h-badge', { scale: .6, opacity: 0, duration: .8, ease: 'back.out(2)', delay: 1.5 })

      /* parallax on scroll */
      gsap.to('.deco-left',  { yPercent: -28, scrollTrigger: { trigger: ref.current, scrub: true } })
      gsap.to('.deco-right', { yPercent: -18, scrollTrigger: { trigger: ref.current, scrub: true } })
      gsap.to('.deco-beans', { yPercent: -22, scrollTrigger: { trigger: ref.current, scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      position: 'relative', background: '#D4400A',
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden',
      paddingTop: 72,
    }}>
      <div className="grain-overlay"/>

      {/* Left deco — big cup illustration */}
      <div className="deco-left anim-float" style={{
        position: 'absolute', left: '2%', top: '50%',
        transform: 'translateY(-50%)', zIndex: 3,
        '--r': '-6deg',
      }}>
        <svg width="230" height="230" viewBox="0 0 80 80" fill="none"
          stroke="rgba(255,253,249,.82)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
          <path d="M12 28h56l-8 38H20L12 28z"/>
          <path d="M68 36h10a8 8 0 0 1 0 16H68"/>
          <path d="M22 20c0-8 8-8 8 0"/>
          <path d="M36 18c0-8 8-8 8 0"/>
          <ellipse cx="40" cy="67" rx="22" ry="5" opacity=".4"/>
          {/* latte art */}
          <path d="M26 40c3-5 22-5 25 0" opacity=".6" strokeWidth="1"/>
          <ellipse cx="39" cy="46" rx="11" ry="6" opacity=".6" strokeWidth="1"/>
          <path d="M32 46c2-4 14-4 16 0" opacity=".5" strokeWidth="1"/>
        </svg>
        {/* steam */}
        <div style={{ position: 'absolute', top: '13%', left: '40%', display: 'flex', gap: 8 }}>
          {[0, 1].map(i => (
            <svg key={i} width="12" height="34" viewBox="0 0 12 34" fill="none"
              stroke="rgba(255,253,249,.45)" strokeWidth="2" strokeLinecap="round">
              <path
                d={i === 0
                  ? 'M6 32 C2 22 10 20 6 12 C2 4 8 2 8 2'
                  : 'M6 32 C10 22 2 20 6 12 C10 4 4 2 4 2'}
                className={i === 0 ? 'steam-1' : 'steam-2'}
              />
            </svg>
          ))}
        </div>
      </div>

      {/* Right deco */}
      <div className="deco-right" style={{
        position: 'absolute', right: '4%', top: '50%',
        transform: 'translateY(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 28,
      }}>
        <div className="anim-floatB" style={{ '--r': '8deg' }}>
          <Arrow/>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div className="anim-float" style={{ '--r': '14deg' }}>
            <Bean w={38} h={38} stroke="rgba(255,253,249,.55)"/>
          </div>
          <div className="anim-floatC" style={{ '--r': '-10deg' }}>
            <Bean w={24} h={24} stroke="rgba(255,253,249,.35)"/>
          </div>
        </div>
        <div className="anim-floatB" style={{ '--r': '0deg' }}>
          <Star/>
        </div>
        <div className="anim-float" style={{ '--r': '0deg' }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
            stroke="rgba(255,253,249,.5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <circle cx="22" cy="22" r="18"/>
            <path d="M14 22h16M22 14v16"/>
          </svg>
        </div>
      </div>

      {/* Scattered beans */}
      <div className="deco-beans" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        {[
          { top: '18%', left: '24%',  r: '-15deg', s: 26 },
          { top: '72%', left: '18%',  r: '22deg',  s: 20 },
          { top: '80%', right: '28%', r: '-8deg',  s: 24 },
          { top: '22%', right: '22%', r: '12deg',  s: 18 },
        ].map((b, i) => (
          <div key={i} className={i % 2 === 0 ? 'anim-float' : 'anim-floatB'}
            style={{ position: 'absolute', ...b, '--r': b.r, transform: `rotate(${b.r})` }}>
            <Bean w={b.s} h={b.s} stroke="rgba(255,253,249,.38)"/>
          </div>
        ))}
      </div>

      {/* Badge logo floating right */}
      <div className="h-badge anim-floatB" style={{
        position: 'absolute', right: '8%', top: '50%',
        transform: 'translateY(-50%) rotate(-8deg)',
        zIndex: 4, '--r': '-8deg',
      }}>
        <img
          src="/logo-badge.png"
          alt="Snickerdoodle Coffeeworks badge"
          loading="lazy"
          style={{
            width: 200, height: 200,
            filter: 'drop-shadow(0 12px 32px rgba(30,10,4,.45))',
            display: 'block',
          }}
        />
      </div>

      {/* Centre headline */}
      <div style={{
        position: 'relative', zIndex: 5,
        textAlign: 'center', padding: '0 24px',
        maxWidth: 900,
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="h-line" style={{
            fontFamily: 'Nunito', fontWeight: 900,
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
            color: '#F5C9A8', lineHeight: 1.05,
            fontStyle: 'italic', display: 'block',
          }}>to the good</div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div className="h-line" style={{
            fontFamily: 'Nunito', fontWeight: 900,
            fontSize: 'clamp(68px,11vw,148px)',
            color: '#FFFDF9', lineHeight: .95,
            textTransform: 'uppercase', letterSpacing: '-.02em',
            display: 'block',
          }}>STUFF.</div>
        </div>

        <p className="h-sub" style={{
          fontFamily: 'Lora', fontSize: 'clamp(15px,1.8vw,18px)',
          color: 'rgba(255,253,249,.78)', fontStyle: 'italic',
          margin: '28px auto 38px', maxWidth: 480, lineHeight: 1.75,
        }}>
          Specialty coffee roasted with love.<br/>
          Baked goods that make Monday worth it.
        </p>

        <div className="h-cta" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Btn
            hover={{ scale: 1.05 }} tap={{ scale: .97 }}
            style={{
              background: '#2C1810', color: '#FFFDF9',
              fontFamily: 'Nunito', fontWeight: 800,
              fontSize: 15, letterSpacing: '.1em', textTransform: 'uppercase',
              padding: '16px 44px', borderRadius: 999,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(30,10,4,.45)',
            }}>
            Explore Our Menu
          </Btn>
          <Btn
            hover={{ scale: 1.04 }} tap={{ scale: .97 }}
            style={{
              background: 'transparent', color: '#FFFDF9',
              fontFamily: 'Nunito', fontWeight: 700,
              fontSize: 15, letterSpacing: '.08em',
              padding: '14px 36px', borderRadius: 999,
              border: '2px solid rgba(255,253,249,.5)', cursor: 'pointer',
            }}>
            Our Story →
          </Btn>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 5,
      }}>
        <span style={{ fontFamily: 'Nunito', fontSize: 10, letterSpacing: '.18em', color: 'rgba(255,253,249,.4)', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" stroke="rgba(255,253,249,.35)" strokeWidth="2" strokeLinecap="round">
          <rect x="1" y="1" width="16" height="22" rx="8"/>
          <line x1="9" y1="6" x2="9" y2="10" className="steam-1"/>
        </svg>
      </div>
    </section>
  )
}
