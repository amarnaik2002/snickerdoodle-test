import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Btn } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

const MENU = [
  {
    name: 'Double Espresso',
    desc: 'Two ristretto shots. Velvety, bold, and bright.',
    price: '$3.80', badge: 'Classic',
    photo: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&h=700&q=80',
  },
  {
    name: 'Oat Milk Latte',
    desc: 'Silky micro-foam over our house single-origin.',
    price: '$5.50', badge: 'Popular',
    photo: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    name: 'Butter Croissant',
    desc: 'Laminated dough, baked fresh before 5am.',
    price: '$4.20', badge: 'Fresh',
    photo: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    name: 'Iced Cold Brew',
    desc: '18-hour steep, poured over Japanese clear ice.',
    price: '$6.00', badge: 'New',
    photo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&h=400&q=80',
  },
]

function FeaturedCard({ item }) {
  const { name, desc, price, badge, photo } = item
  return (
    <div className="menu-card" style={{
      borderRadius: 20, overflow: 'hidden',
      position: 'relative', height: '100%', minHeight: 340,
      cursor: 'pointer',
    }}>
      <img
        src={photo} alt={name} loading="eager"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(30,10,4,.88) 40%, rgba(30,10,4,.08) 100%)',
      }}/>
      <div style={{ position: 'absolute', top: 16, left: 16 }}>
        <span style={{
          background: '#f15a28', color: 'white',
          fontFamily: 'Caprasimo', fontWeight: 800, fontSize: 10,
          letterSpacing: '.08em', padding: '4px 12px', borderRadius: 999,
        }}>{badge}</span>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 26px' }}>
        <div style={{
          fontFamily: 'Caprasimo', fontWeight: 900, fontSize: 24,
          color: '#FFFDF9', marginBottom: 6,
        }}>{name}</div>
        <div style={{
          fontFamily: 'Lora', fontSize: 13, color: 'rgba(255,253,249,.72)',
          fontStyle: 'italic', lineHeight: 1.55, marginBottom: 18,
        }}>{desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontFamily: 'Caprasimo', fontWeight: 900, fontSize: 26,
            color: '#f15a28', fontVariantNumeric: 'tabular-nums',
          }}>{price}</div>
          <button className="add-btn" style={{
            width: 38, height: 38, borderRadius: '50%',
            background: '#f15a28', color: 'white',
            border: 'none', cursor: 'pointer', fontSize: 22,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(241,90,40,.55)',
            fontFamily: 'Caprasimo', lineHeight: 1,
          }}>+</button>
        </div>
      </div>
    </div>
  )
}

function SideCard({ item }) {
  const { name, desc, price, badge, photo } = item
  return (
    <div className="menu-card" style={{
      background: '#FFFDF9', borderRadius: 16,
      border: '1px solid #EDD9BE', overflow: 'hidden',
      display: 'flex', alignItems: 'stretch', flex: 1,
    }}>
      <div style={{ width: 96, flexShrink: 0, overflow: 'hidden' }}>
        <img src={photo} alt={name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ flex: 1, padding: '14px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontFamily: 'Caprasimo', fontWeight: 800, fontSize: 15, color: '#2C1810' }}>{name}</div>
            <span style={{
              background: '#FAE8DC', color: '#A83008',
              fontFamily: 'Caprasimo', fontWeight: 700, fontSize: 9,
              letterSpacing: '.06em', padding: '2px 9px', borderRadius: 999, flexShrink: 0, marginLeft: 8,
            }}>{badge}</span>
          </div>
          <div style={{ fontFamily: 'Lora', fontSize: 12, color: '#9E6B54', fontStyle: 'italic', lineHeight: 1.5 }}>{desc}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ fontFamily: 'Caprasimo', fontWeight: 900, fontSize: 18, color: '#f15a28', fontVariantNumeric: 'tabular-nums' }}>{price}</div>
          <button className="add-btn" style={{
            width: 30, height: 30, borderRadius: '50%',
            background: '#f15a28', color: 'white',
            border: 'none', cursor: 'pointer', fontSize: 17,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 3px 12px rgba(241,90,40,.35)',
            fontFamily: 'Caprasimo', lineHeight: 1,
          }}>+</button>
        </div>
      </div>
    </div>
  )
}

export default function MenuHighlights() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-intro', {
        x: -50, opacity: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.menu-intro-right', {
        x: 50, opacity: 0, duration: .9, ease: 'power3.out', delay: .08,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.menu-featured', {
        y: 50, opacity: 0, duration: .9, ease: 'power3.out', delay: .15,
        scrollTrigger: { trigger: '.menu-grid', start: 'top 85%' },
      })
      gsap.from('.menu-side-card', {
        x: 60, opacity: 0, stagger: .1, duration: .8, ease: 'power3.out', delay: .2,
        scrollTrigger: { trigger: '.menu-grid', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{ background: '#FFFDF9', padding: '100px 64px', borderTop: '1px solid #EDD9BE' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Split header: title left, desc + CTA right */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, marginBottom: 44 }}>
          <div className="menu-intro">
            <div style={{ fontFamily: 'Dancing Script', fontSize: 22, color: '#f15a28', fontWeight: 600, marginBottom: 6 }}>
              from our kitchen
            </div>
            <h2 style={{
              fontFamily: 'Caprasimo', fontWeight: 900,
              fontSize: 'clamp(30px,4vw,50px)', color: '#2C1810',
              lineHeight: 1.06, textWrap: 'balance',
            }}>Today&apos;s Picks</h2>
          </div>
          <div className="menu-intro-right" style={{ textAlign: 'right', flexShrink: 0, maxWidth: 340 }}>
            <p style={{ fontFamily: 'Lora', fontSize: 14, fontStyle: 'italic', color: '#9E6B54', lineHeight: 1.7, marginBottom: 18 }}>
              Made fresh. Ordered with love. Gone by noon.
            </p>
            <Btn
              hover={{ scale: 1.04 }} tap={{ scale: .97 }}
              style={{
                background: 'transparent', color: '#f15a28',
                border: '2px solid #f15a28',
                fontFamily: 'Caprasimo', fontWeight: 800,
                fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
                padding: '11px 28px', borderRadius: 999,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
              View Full Menu →
            </Btn>
          </div>
        </div>

        {/* Asymmetric grid: large featured left, 3 stacked right */}
        <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'stretch' }}>

          <div className="menu-featured" style={{ display: 'flex' }}>
            <FeaturedCard item={MENU[0]} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {MENU.slice(1).map(item => (
              <div key={item.name} className="menu-side-card" style={{ flex: 1, display: 'flex' }}>
                <SideCard item={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
