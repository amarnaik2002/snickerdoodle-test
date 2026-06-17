import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Btn } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

export default function LoyaltyBanner() {
  const ref = useRef(null)
  const [focused, setFocused] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.loyalty-inner > *', {
        y: 40, opacity: 0, stagger: .1, duration: .85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const beanBg = `url("data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='32' cy='32' rx='11' ry='17' transform='rotate(-20 32 32)' fill='none' stroke='rgba(241,90,40,.1)' stroke-width='1.5'/%3E%3Cpath d='M25 17 C30 25 30 39 25 47' fill='none' stroke='rgba(241,90,40,.07)' stroke-width='1' stroke-linecap='round'/%3E%3C/svg%3E")`

  return (
    <section ref={ref} style={{
      background: '#2C1810',
      backgroundImage: beanBg,
      backgroundSize: '64px 64px',
      padding: '110px 64px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* warm glow */}
      <div style={{
        position: 'absolute', top: '-30%', left: '50%',
        transform: 'translateX(-50%)',
        width: '60%', height: '160%',
        background: 'radial-gradient(ellipse, rgba(241,90,40,.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }}/>

      <div className="loyalty-inner" style={{
        maxWidth: 660, margin: '0 auto',
        textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        <div style={{ fontFamily: 'Dancing Script', fontSize: 22, color: '#f15a28', fontWeight: 600, marginBottom: 10 }}>
          earn while you sip
        </div>

        <h2 style={{
          fontFamily: 'Caprasimo', fontWeight: 900,
          fontSize: 'clamp(28px,4.5vw,50px)', color: '#FFFDF9',
          lineHeight: 1.08, marginBottom: 16,
        }}>
          Join the{' '}
          <span style={{ color: '#f15a28' }}>Snickerdoodle</span>{' '}Club
        </h2>

        <p style={{
          fontFamily: 'Lora', fontSize: 15, fontStyle: 'italic',
          color: '#C4A090', lineHeight: 1.75, marginBottom: 42,
        }}>
          Every cup earns you beans. 100 beans = a free drink.
          Birthday rewards, early menu access, and barista-only exclusives â€” all yours.
        </p>

        <div style={{ display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto' }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="loyalty-input"
            style={{
              flex: 1,
              background: 'rgba(255,253,249,.07)',
              border: `2px solid ${focused ? '#f15a28' : 'rgba(255,253,249,.14)'}`,
              borderRadius: 999, padding: '14px 22px',
              fontFamily: 'Lora', fontSize: 14, color: '#FFFDF9',
            }}
          />
          <Btn
            hover={{ scale: 1.05 }} tap={{ scale: .97 }}
            style={{
              background: '#f15a28', color: 'white',
              fontFamily: 'Caprasimo', fontWeight: 800,
              fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase',
              padding: '14px 28px', borderRadius: 999,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 22px rgba(241,90,40,.45)',
              whiteSpace: 'nowrap',
            }}>
            Join Now
          </Btn>
        </div>

        <p style={{ fontFamily: 'Lora', fontSize: 12, fontStyle: 'italic', color: 'rgba(196,160,144,.45)', marginTop: 14 }}>
          No spam. Just good coffee updates. Unsubscribe any time.
        </p>
      </div>
    </section>
  )
}
