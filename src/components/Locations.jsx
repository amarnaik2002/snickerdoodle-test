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
    hours: 'Mon–Fri 6am–5pm · Sat–Sun 7am–4pm',
    tags:  ['Dine In', 'Takeaway', 'Dog Friendly'],
  },
  {
    name:  'Fortitude Valley',
    addr:  '118 Ann Street, Fortitude Valley',
    hours: 'Mon–Fri 6:30am–6pm · Sat 7am–5pm',
    tags:  ['Dine In', 'Takeaway', 'Late Hours'],
  },
  {
    name:  'New Farm',
    addr:  '7 Brunswick Street, New Farm',
    hours: 'Mon–Sun 7am–3pm',
    tags:  ['Dine In', 'Takeaway', 'Garden Seats'],
  },
]

export default function Locations() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <section ref={ref} style={{ background: '#FFFDF9', padding: '100px 64px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div className="loc-section-title" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'Dancing Script', fontSize: 22, color: '#D4400A', fontWeight: 600, marginBottom: 8 }}>
            find us near you
          </div>
          <h2 style={{
            fontFamily: 'Nunito', fontWeight: 900,
            fontSize: 'clamp(28px,4vw,44px)', color: '#2C1810',
          }}>Our Locations</h2>
        </div>

        <div className="locs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {LOCS.map(loc => (
            <div key={loc.name} className="loc-card" style={{
              background: '#FFFDF9', borderRadius: 20,
              border: '1.5px solid #EDD9BE',
              padding: 32,
              boxShadow: '0 2px 14px rgba(30,10,4,.05)',
            }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}><MapPin/></div>
                <div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 18, color: '#2C1810' }}>{loc.name}</div>
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
                    fontFamily: 'Nunito', fontWeight: 700, fontSize: 11,
                    background: '#FAE8DC', color: '#A83008',
                    padding: '3px 11px', borderRadius: 999,
                  }}>{t}</span>
                ))}
              </div>

              <MA href="#" hover={{ x: 5 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Nunito', fontWeight: 700, fontSize: 12,
                  letterSpacing: '.08em', textTransform: 'uppercase',
                  color: '#D4400A', textDecoration: 'none',
                }}>
                Get Directions
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </MA>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
