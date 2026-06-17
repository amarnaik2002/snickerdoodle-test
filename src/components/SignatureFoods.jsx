import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FOODS = [
  {
    name: 'Brekky Wrap',
    desc: "Free-Range Egg. Crispy Bacon. House Relish. Chef's Kiss.",
    tags: ['#YUM', '#MORNING_RITUAL'],
    color: '#C4401A',
    img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=480&h=360&q=80',
  },
  {
    name: 'Granola Bowl',
    desc: 'House Crunch. Cold Yoghurt. Seasonal Fruit. Pure Goodness.',
    tags: ['#FEEL_GOOD', '#BOWL_LIFE'],
    color: '#326228',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=480&h=360&q=80',
  },
  {
    name: 'Smashed Avo',
    desc: 'Heirloom Tomato. Whipped Ricotta. Micro Herbs. On Sourdough.',
    tags: ['#SMASHED', '#BRUNCH_GOALS'],
    color: '#B87B10',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=480&h=360&q=80',
  },
  {
    name: 'CafÃ© Drinks',
    desc: 'That Sweet-Strong Sip Surprise. Hot. Cold. Blended. Your Way.',
    tags: ['#SHAKEN_NOT_STIRRED', '#WAKEY_WAKEY'],
    color: '#3B2010',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=480&h=360&q=80',
  },
]

const STAMP = [
  'radial-gradient(circle at 0 50%, transparent 9px, black 9px) 0 0 / 18px 18px repeat-y',
  'radial-gradient(circle at 100% 50%, transparent 9px, black 9px) 100% 0 / 18px 18px repeat-y',
  'radial-gradient(circle at 50% 0, transparent 9px, black 9px) 0 0 / 18px 18px repeat-x',
  'radial-gradient(circle at 50% 100%, transparent 9px, black 9px) 0 100% / 18px 18px repeat-x',
  'linear-gradient(black, black) 9px 9px / calc(100% - 18px) calc(100% - 18px) no-repeat',
].join(', ')

function StampCard({ food }) {
  const { name, desc, tags, color, img } = food
  return (
    <div style={{
      background: color,
      WebkitMask: STAMP,
      mask: STAMP,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <div style={{ height: 210, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={img}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
      </div>
      <div style={{ padding: '22px 22px 32px', flex: 1 }}>
        <h3 style={{
          fontFamily: 'Caprasimo', fontWeight: 900, fontSize: 22,
          color: '#FFFDF9', marginBottom: 8, lineHeight: 1.2,
        }}>{name}</h3>
        <p style={{
          fontFamily: 'Lora', fontSize: 12, fontStyle: 'italic',
          color: 'rgba(255,253,249,.75)', lineHeight: 1.65, marginBottom: 18,
        }}>{desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {tags.map(t => (
            <span key={t} style={{
              fontFamily: 'Caprasimo', fontWeight: 700, fontSize: 10,
              letterSpacing: '.08em', color: 'rgba(255,253,249,.48)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SignatureFoods() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sig-heading', {
        y: 40, opacity: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.sig-card', {
        y: 60, opacity: 0, stagger: .13, duration: .85, ease: 'power3.out',
        scrollTrigger: { trigger: '.sig-grid', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{ background: '#FAF0E6', padding: '100px 64px', borderTop: '1px solid #EDD9BE' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Heading */}
        <div className="sig-heading" style={{ textAlign: 'center', marginBottom: 72, position: 'relative' }}>

          {/* steam cup â€“ left deco */}
          <div style={{ position: 'absolute', left: '18%', top: 4, opacity: .8 }}>
            <svg width="48" height="50" viewBox="0 0 48 50" fill="none">
              <path d="M10 22 Q10 38 24 38 Q38 38 38 22 Z" stroke="#2C1810" strokeWidth="1.6" fill="none"/>
              <path d="M38 26 Q46 26 46 32 Q46 38 38 38" stroke="#2C1810" strokeWidth="1.6" fill="none"/>
              <line x1="10" y1="22" x2="38" y2="22" stroke="#2C1810" strokeWidth="1.6"/>
              <rect x="5" y="39" width="38" height="4" rx="2" stroke="#2C1810" strokeWidth="1.5" fill="none"/>
              <path d="M17 15 Q17 11 19 9 Q21 7 19 4" stroke="#2C1810" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
              <path d="M24 17 Q24 13 26 11 Q28 9 26 6" stroke="#2C1810" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* baguette â€“ right deco */}
          <div style={{ position: 'absolute', right: '18%', top: 8, opacity: .8 }}>
            <svg width="58" height="34" viewBox="0 0 58 34" fill="none">
              <ellipse cx="29" cy="17" rx="27" ry="14" stroke="#2C1810" strokeWidth="1.6" fill="none"/>
              <path d="M6 17 C6 9 13 4 29 4 C45 4 52 9 52 17" stroke="#2C1810" strokeWidth="1.4" fill="none"/>
              <path d="M17 11 Q19 8 22 11" stroke="#2C1810" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
              <path d="M27 8 Q29 5 32 8" stroke="#2C1810" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
              <path d="M37 11 Q39 8 42 11" stroke="#2C1810" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 style={{
            fontFamily: 'Caprasimo', fontWeight: 900,
            fontSize: 'clamp(52px, 8vw, 96px)',
            color: '#f15a28',
            letterSpacing: '.03em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}>
            SIGNATURE
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 6 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 16 C9 16, 2 11, 2 5.5 C2 2, 5.5 1, 9 3.5 C12.5 1, 16 2, 16 5.5 C16 11, 9 16, 9 16Z" stroke="#9E6B54" strokeWidth="1.3" fill="none"/>
              <line x1="9" y1="16" x2="9" y2="3.5" stroke="#9E6B54" strokeWidth="1.3"/>
            </svg>
            <span style={{
              fontFamily: 'Dancing Script', fontWeight: 600,
              fontSize: 'clamp(30px, 4.5vw, 54px)',
              color: '#2C1810',
              lineHeight: 1,
            }}>foods</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M9 16 C9 16, 2 11, 2 5.5 C2 2, 5.5 1, 9 3.5 C12.5 1, 16 2, 16 5.5 C16 11, 9 16, 9 16Z" stroke="#9E6B54" strokeWidth="1.3" fill="none"/>
              <line x1="9" y1="16" x2="9" y2="3.5" stroke="#9E6B54" strokeWidth="1.3"/>
            </svg>
          </div>
        </div>

        {/* Cards */}
        <div className="sig-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 28,
          alignItems: 'stretch',
        }}>
          {FOODS.map(food => (
            <div key={food.name} className="sig-card" style={{ display: 'flex' }}>
              <StampCard food={food} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
