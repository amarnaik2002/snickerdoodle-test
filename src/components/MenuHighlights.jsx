import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Btn } from '../utils/motion'
import { Cup, Latte, Croissant, ColdBrew } from '../icons'

gsap.registerPlugin(ScrollTrigger)

const MENU = [
  { name: 'Double Espresso', desc: 'Two ristretto shots. Velvety, bold, and bright.', price: '$3.80', badge: 'Classic',  Icon: Cup       },
  { name: 'Oat Milk Latte',  desc: 'Silky micro-foam over our house single-origin.',  price: '$5.50', badge: 'Popular',  Icon: Latte     },
  { name: 'Butter Croissant',desc: 'Laminated dough, baked fresh before 5am.',        price: '$4.20', badge: 'Fresh',    Icon: Croissant },
  { name: 'Iced Cold Brew',  desc: '18-hour steep, poured over Japanese clear ice.',  price: '$6.00', badge: 'New',      Icon: ColdBrew  },
]

function MenuCard({ item }) {
  const { name, desc, price, badge, Icon } = item
  return (
    <div className="menu-card" style={{
      background: '#FFFDF9', borderRadius: 24,
      border: '1px solid #EDD9BE', overflow: 'hidden',
    }}>
      {/* icon area */}
      <div style={{
        background: '#FAE8DC', padding: '36px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: '#D4400A', color: 'white',
          fontFamily: 'Nunito', fontWeight: 800, fontSize: 10,
          letterSpacing: '.08em', padding: '3px 11px', borderRadius: 999,
        }}>{badge}</span>
        <Icon w={76} h={76} stroke="#D4400A" sw={1.6}/>
      </div>

      {/* body */}
      <div style={{ padding: '20px 22px 24px' }}>
        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 17, color: '#2C1810', marginBottom: 6 }}>{name}</div>
        <div style={{ fontFamily: 'Lora', fontSize: 13, color: '#9E6B54', fontStyle: 'italic', lineHeight: 1.55, marginBottom: 18 }}>{desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 21, color: '#D4400A' }}>{price}</div>
          <button className="add-btn" style={{
            width: 34, height: 34, borderRadius: '50%',
            background: '#D4400A', color: 'white',
            border: 'none', cursor: 'pointer',
            fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(212,64,10,.35)',
            fontFamily: 'Nunito', fontWeight: 700, lineHeight: 1,
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
      gsap.from('.menu-title-wrap', {
        y: 50, opacity: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.menu-card-wrap', {
        y: 70, opacity: 0, stagger: .12, duration: .85, ease: 'power3.out',
        scrollTrigger: { trigger: '.menu-grid', start: 'top 85%' },
      })
      gsap.from('.menu-footer-cta', {
        y: 30, opacity: 0, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: '.menu-grid', start: 'bottom 90%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{ background: '#F5E8D5', padding: '100px 64px', borderTop: '1px solid #EDD9BE' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div className="menu-title-wrap" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'Dancing Script', fontSize: 24, color: '#D4400A', fontWeight: 600, marginBottom: 6 }}>
            from our kitchen
          </div>
          <h2 style={{
            fontFamily: 'Nunito', fontWeight: 900,
            fontSize: 'clamp(30px,5vw,52px)', color: '#2C1810', lineHeight: 1.08,
          }}>Today&apos;s Picks</h2>
          <p style={{ fontFamily: 'Lora', fontSize: 15, fontStyle: 'italic', color: '#9E6B54', marginTop: 10 }}>
            Made fresh. Ordered with love. Gone by noon.
          </p>
        </div>

        <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
          {MENU.map(item => (
            <div key={item.name} className="menu-card-wrap">
              <MenuCard item={item}/>
            </div>
          ))}
        </div>

        <div className="menu-footer-cta" style={{ textAlign: 'center', marginTop: 48 }}>
          <Btn
            hover={{ scale: 1.04 }} tap={{ scale: .97 }}
            style={{
              background: 'transparent', color: '#D4400A',
              border: '2px solid #D4400A',
              fontFamily: 'Nunito', fontWeight: 800,
              fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase',
              padding: '13px 38px', borderRadius: 999,
              cursor: 'pointer',
            }}>
            View Full Menu →
          </Btn>
        </div>
      </div>
    </section>
  )
}
