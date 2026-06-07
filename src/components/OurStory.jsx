import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MA } from '../utils/motion'
import { Bean } from '../icons'
import useCountUp from '../hooks/useCountUp'

gsap.registerPlugin(ScrollTrigger)

function Stat({ end, suffix, label, go }) {
  const n = useCountUp(end, go)
  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      <div style={{
        fontFamily: 'Nunito', fontWeight: 900,
        fontSize: 'clamp(38px,5vw,56px)', color: '#D4400A', lineHeight: 1,
      }}>{n.toLocaleString()}{suffix}</div>
      <div style={{
        fontFamily: 'Lora', fontSize: 14, fontStyle: 'italic',
        color: '#9E6B54', marginTop: 6,
      }}>{label}</div>
    </div>
  )
}

export default function OurStory() {
  const ref = useRef(null)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.story-l', {
        x: -70, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })
      gsap.from('.story-r', {
        x: 70, opacity: 0, duration: 1, ease: 'power3.out', delay: .08,
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })
      gsap.from('.stat-item', {
        y: 50, opacity: 0, stagger: .14, duration: .8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-box', start: 'top 82%',
          onEnter: () => setGo(true),
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{ background: '#F5E8D5', padding: '110px 64px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: 80, alignItems: 'center', marginBottom: 72 }}>

          {/* Left */}
          <div className="story-l" style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Dancing Script', fontWeight: 700,
              fontSize: 'clamp(60px,8vw,100px)', color: '#D4400A',
              lineHeight: .85, display: 'inline-block', transform: 'rotate(-5deg)',
            }}>est.</div>
            <div style={{
              fontFamily: 'Nunito', fontWeight: 900,
              fontSize: 'clamp(50px,7vw,86px)', color: '#2C1810',
              lineHeight: 1, letterSpacing: '-.02em',
            }}>2019</div>
            <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', gap: 10 }}>
              <Bean w={36} h={36} stroke="#D4400A"/>
              <Bean w={24} h={24} stroke="rgba(212,64,10,.4)"/>
              <Bean w={18} h={18} stroke="rgba(212,64,10,.25)"/>
            </div>
          </div>

          {/* Right */}
          <div className="story-r">
            <div style={{ fontFamily: 'Dancing Script', fontSize: 22, color: '#D4400A', fontWeight: 600, marginBottom: 10 }}>
              our story
            </div>
            <h2 style={{
              fontFamily: 'Nunito', fontWeight: 900,
              fontSize: 'clamp(28px,4vw,46px)', color: '#2C1810',
              lineHeight: 1.08, marginBottom: 20,
            }}>
              Small batch.<br/>Big heart.
            </h2>

            {/* Divider with bean */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <div style={{ flex: 1, height: 1.5, background: 'rgba(212,64,10,.25)' }}/>
              <Bean w={18} h={18} stroke="#D4400A"/>
              <div style={{ flex: 1, height: 1.5, background: 'rgba(212,64,10,.25)' }}/>
            </div>

            <p style={{
              fontFamily: 'Lora', fontSize: 16, lineHeight: 1.82,
              color: '#6B3A2A', fontStyle: 'italic',
            }}>
              We started Snickerdoodle Coffeeworks from a single espresso machine in a 200 sq&nbsp;ft space.
              Today we source single-origin beans from three continents, roast in-house every Tuesday,
              and bake everything from scratch before sunrise. Coffee is just the beginning.
            </p>

            <MA href="#" hover={{ x: 6 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 28, fontFamily: 'Nunito', fontWeight: 800,
                fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase',
                color: '#D4400A', textDecoration: 'none',
              }}>
              Read Our Full Story
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </MA>
          </div>
        </div>

        {/* Stats box */}
        <div className="stats-box" style={{
          background: '#FFFDF9', borderRadius: 24,
          border: '1px solid #EDD9BE',
          padding: '52px 64px',
          boxShadow: '0 4px 28px rgba(30,10,4,.06)',
          display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr 1px 1fr',
          gap: '0 32px', alignItems: 'center',
        }}>
          {[
            { end: 12000, suffix: '+', label: 'cups served this year' },
            { end: 3,     suffix: '',  label: 'neighbourhood locations' },
            { end: 100,   suffix: '%', label: 'direct trade beans' },
            { end: 6,     suffix: '',  label: 'years of craft' },
          ].map((s, i) => [
            <div key={s.label} className="stat-item"><Stat {...s} go={go}/></div>,
            i < 3 && <div key={`d${i}`} style={{ width: 1, height: 80, background: '#EDD9BE', alignSelf: 'center' }}/>,
          ])}
        </div>
      </div>
    </section>
  )
}
