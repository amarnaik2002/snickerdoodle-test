import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTilt } from '../utils/useTilt'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'
import img6 from '../assets/6.png'
import img7 from '../assets/7.png'
import img8 from '../assets/8.png'
import icedCoffee from '../assets/cute-coffee.png'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/* ── MENU DATA ── */
const CATEGORIES = [
  {
    id: 'bakery',
    label: 'BAKERY',
    icon: img6,
    img: img5,
    desc: 'Freshly baked every morning using premium ingredients. Each piece is crafted with love and served at its warm, golden best.',
    items: [
      { name: 'Snickerdoodle Cookie', price: '₹120' },
      { name: 'Classic Croissant',    price: '₹140' },
      { name: 'Cinnamon Roll',        price: '₹160' },
      { name: 'Pretzel Twist',        price: '₹150' },
      { name: 'Churro Donut',         price: '₹130' },
      { name: 'Brioche Bun',          price: '₹120' },
    ],
  },
  {
    id: 'coffee',
    label: 'COFFEE',
    icon: icedCoffee,
    img: icedCoffee,
    desc: 'Single-origin beans, expertly brewed. Our coffee selection spans everything from a clean espresso to a creamy, indulgent iced latte.',
    items: [
      { name: 'Espresso',          price: '₹120' },
      { name: 'Cappuccino',        price: '₹150' },
      { name: 'Flat White',        price: '₹160' },
      { name: 'Cold Brew',         price: '₹180' },
      { name: 'Iced Caramel Latte', price: '₹200' },
      { name: 'Matcha Latte',      price: '₹180' },
    ],
  },
  {
    id: 'specials',
    label: 'SPECIALS',
    icon: img8,
    img: img8,
    desc: 'Curated combos and seasonal favourites — the best of Snickerdoodle, brought together in one delicious, shareable set.',
    items: [
      { name: 'Coffee & Cookie Combo',      price: '₹250' },
      { name: 'Brunch Box (2 items + drink)', price: '₹320' },
      { name: 'Bake & Brew Set',             price: '₹280' },
      { name: 'Seasonal Sharing Platter',    price: '₹380' },
    ],
  },
  {
    id: 'beverages',
    label: 'BEVERAGES',
    icon: img2,
    img: img3,
    desc: 'Not in a coffee mood? Our refreshing non-coffee beverages are made fresh daily with fruits, teas, and natural flavours.',
    items: [
      { name: 'Fresh Lemonade',  price: '₹100' },
      { name: 'Iced Tea',        price: '₹110' },
      { name: 'Cold Chocolate',  price: '₹140' },
      { name: 'Fruit Smoothie',  price: '₹160' },
      { name: 'Sparkling Water', price: '₹80'  },
    ],
  },
]

const TICKER_ITEMS = ['drink coffee', 'eat fresh', 'be happy']

/* ── TICKER ── */
function TickerRow({ reverse }) {
  const items = Array(10).fill(TICKER_ITEMS).flat()
  return (
    <div style={{ overflow: 'hidden', padding: '13px 0' }}>
      <div className={reverse ? 'ab-ticker-rev' : 'ab-ticker-fwd'} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(12px,1.3vw,15px)', letterSpacing: '.14em', textTransform: 'uppercase', color: i % 2 === 0 ? '#FFFDF9' : '#2C1810', padding: '0 26px' }}>{item}</span>
            <img src={i % 3 === 0 ? img2 : img3} alt="" style={{ width: 26, height: 26, objectFit: 'contain', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── MAIN ── */
export default function Menu() {
  const ref = useRef(null)
  const tiltRef = useTilt(8)
  const [activeTab, setActiveTab] = useState(0)
  const cat = CATEGORIES[activeTab]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mn-h',        { y: 60, opacity: 0, stagger: .12, duration: 1,   ease: 'power4.out', delay: .25 })
      gsap.from('.mn-btn',      { y: 24, opacity: 0, stagger: .1,  duration: .7,  ease: 'power3.out', delay: .9  })
      gsap.from('.mn-hero-img', { scale: .92, opacity: 0,           duration: 1.2, ease: 'power3.out', delay: .4  })
      gsap.from('.mn-tabs',  { y: 40, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.mn-tabs',   start: 'top 88%' } })
      gsap.from('.mn-pledge',{ y: 60, opacity: 0, duration: 1,   ease: 'power3.out', scrollTrigger: { trigger: '.mn-pledge', start: 'top 80%' } })
      gsap.from('.mn-loc',   { y: 50, opacity: 0, duration: .9,  ease: 'power3.out', scrollTrigger: { trigger: '.mn-loc',    start: 'top 82%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.fromTo('.mn-content', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .4, ease: 'power3.out' })
    gsap.fromTo('.mn-item', { opacity: 0, x: -16 }, { opacity: 1, x: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out', delay: 0.18 })
  }, [activeTab])

  return (
    <div ref={ref}>

      {/* ── 1. HERO ── */}
      <section style={{
        background: '#f15a28', minHeight: '62vh', position: 'relative', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center',
        padding: '0 clamp(24px,6vw,100px)',
      }}>
        <div className="grain-overlay" />

        {/* Text */}
        <div style={{ position: 'relative', zIndex: 3, padding: 'clamp(88px,9vw,120px) 0' }}>
          <div className="mn-h" style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(70px,11vw,148px)', color: '#FFFDF9', lineHeight: .86, textTransform: 'uppercase' }}>MENU</div>
          <div className="mn-h" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(24px,3vw,44px)', color: '#FAE8DC', lineHeight: 1.25, marginBottom: 32 }}>something for everyone</div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="mn-btn btn-bounce" onClick={() => window.open('https://www.zomato.com/mumbai/snickerdoodle-coffeeworks-ambernath-thane/order', '_blank', 'noopener,noreferrer')} style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', background: '#2C1810', color: '#FFFDF9', padding: '13px 30px', borderRadius: 7, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,.24)', transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1E0A04'}
              onMouseLeave={e => e.currentTarget.style.background = '#2C1810'}
            >ORDER NOW</button>
            <button className="mn-btn" onClick={() => window.open('/menu.pdf', '_blank', 'noopener,noreferrer')} style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', background: 'transparent', color: '#FFFDF9', padding: '13px 30px', borderRadius: 7, border: '2px solid rgba(255,253,249,.65)', transition: 'border-color .2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#FFFDF9'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,253,249,.65)'}
            >VIEW FULL MENU</button>
          </div>
        </div>

        {/* Hero food image */}
        <div className="mn-hero-img" style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingTop: 'clamp(60px,6vw,80px)' }}>
          <img src={img4} alt="" style={{ width: '85%', maxWidth: 440, objectFit: 'contain', filter: 'drop-shadow(0 24px 56px rgba(0,0,0,.28))', display: 'block' }} />
        </div>

        {/* Decorative squiggle */}
        <svg style={{ position: 'absolute', left: '5%', bottom: '12%', opacity: .45, pointerEvents: 'none' }} width="70" viewBox="0 0 80 70" fill="none">
          <path d="M8 62 Q38 8 72 32" stroke="#FFFDF9" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </svg>
      </section>

      {/* ── 2. CATEGORY TABS ── */}
      <div id="mn-tabs" className="mn-tabs" style={{ background: '#FFFDF9', borderBottom: '1.5px solid #EDD9BE', overflowX: 'auto' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'center', minWidth: 'max-content', padding: '0 clamp(16px,3vw,40px)' }}>
          {CATEGORIES.map((c, i) => (
            <button key={c.id} onClick={() => setActiveTab(i)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              padding: 'clamp(18px,2.5vw,26px) clamp(24px,3.5vw,48px) clamp(16px,2vw,22px)',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: activeTab === i ? '3px solid #f15a28' : '3px solid transparent',
              transition: 'border-color .2s',
              flexShrink: 0,
            }}>
              <div style={{
                width: 'clamp(48px,6vw,64px)', height: 'clamp(48px,6vw,64px)',
                borderRadius: '50%', background: '#F5E8D5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                border: activeTab === i ? '2.5px solid #f15a28' : '2.5px solid #EDD9BE',
                transition: 'border-color .2s',
              }}>
                <img src={c.icon} alt={c.label} style={{ width: '76%', height: '76%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(10px,1.1vw,12.5px)', letterSpacing: '.1em', textTransform: 'uppercase', color: activeTab === i ? '#f15a28' : '#6B3A2A', transition: 'color .2s', whiteSpace: 'nowrap' }}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. ACTIVE MENU SECTION ── */}
      <section style={{ background: '#FFFDF9', padding: 'clamp(56px,6vw,88px) clamp(24px,5vw,80px)' }}>
        <div className="mn-content" style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(36px,5vw,80px)', alignItems: 'start' }}>

          {/* Left — image + description */}
          <div>
            <div ref={tiltRef} className="tilt-wrap img-hover-wrap" style={{ borderRadius: 20, overflow: 'hidden', background: '#F5E8D5', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px,4vw,48px)', marginBottom: 22, border: '1.5px solid #EDD9BE' }}>
              <img src={cat.img} alt={cat.label} style={{ width: '80%', maxWidth: 300, objectFit: 'contain', filter: 'drop-shadow(0 12px 32px rgba(30,10,4,.18))', transition: 'transform 0.4s ease' }} />
            </div>
            <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 'clamp(13.5px,1.4vw,15.5px)', color: '#6B3A2A', lineHeight: 1.88 }}>{cat.desc}</p>
          </div>

          {/* Right — category title + items + CTA */}
          <div>
            <h2 style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(32px,4.5vw,60px)', color: '#f15a28', textTransform: 'uppercase', lineHeight: .88, marginBottom: 30 }}>{cat.label}</h2>

            {/* Items list */}
            <div>
              {cat.items.map((item, i) => (
                <div key={i} className="mn-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '13px 0', borderBottom: '1px dashed #EDD9BE', gap: 20 }}>
                  <span style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(14px,1.5vw,17px)', color: '#2C1810', lineHeight: 1.35 }}>{item.name}</span>
                  <span style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(14px,1.4vw,17px)', color: '#f15a28', whiteSpace: 'nowrap' }}>{item.price}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 30 }}>
              <a href="https://www.zomato.com/mumbai/snickerdoodle-coffeeworks-ambernath-thane/order" target="_blank" rel="noopener noreferrer" className="btn-bounce" style={{ display: 'inline-block', fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', background: '#f15a28', color: '#FFFDF9', padding: '13px 34px', borderRadius: 7, textDecoration: 'none', boxShadow: '0 4px 16px rgba(241,90,40,.40)' }}>ORDER NOW</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FRESHNESS PLEDGE ── */}
      <div className="mn-pledge" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left — dark bg + food illustration */}
        <div style={{ background: '#2C1810', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(48px,6vw,80px)', minHeight: 'clamp(320px,40vw,500px)' }}>
          <img src={img7} alt="" style={{ width: '80%', maxWidth: 340, objectFit: 'contain', filter: 'drop-shadow(0 16px 40px rgba(0,0,0,.4)) brightness(1.05)' }} />
        </div>
        {/* Right — orange text panel */}
        <div style={{ background: '#f15a28', padding: 'clamp(48px,6vw,80px) clamp(36px,5vw,72px)', display: 'flex', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,4vw,58px)', color: '#FFFDF9', lineHeight: .88, textTransform: 'uppercase' }}>INGREDIENTS</div>
            <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(28px,4vw,54px)', color: '#2C1810', lineHeight: 1.1, marginBottom: 20 }}>Freshness</div>
            <p style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(13.5px,1.4vw,16px)', color: 'rgba(255,253,249,.88)', lineHeight: 1.88 }}>
              We source the freshest local produce, premium single-origin coffee beans, and high-quality ingredients — meticulously checking them and updating our selection to reflect what is available at its very best. Our bakes are made fresh every morning, and our coffee menu is updated seasonally. Ingredients and menu options are available at our Ambernath location.
            </p>
          </div>
        </div>
      </div>

      {/* ── 5. TICKER ── */}
      <div style={{ background: '#f15a28', overflow: 'hidden', borderTop: '1.5px solid rgba(255,253,249,.14)', borderBottom: '1.5px solid rgba(255,253,249,.14)' }}>
        <TickerRow reverse={false} />
        <div style={{ height: 1, background: 'rgba(255,253,249,.12)' }} />
        <TickerRow reverse={true} />
      </div>

      {/* ── 6. FIND OUR LOCATION CTA ── */}
      <section className="mn-loc" style={{ background: '#FFFDF9', padding: 'clamp(80px,9vw,120px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        {/* Stamp badge */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="#f15a28" stroke="#EDD9BE" strokeWidth="1.5" strokeDasharray="4 3"/>
            <text x="50%" y="42%" dominantBaseline="middle" textAnchor="middle" fill="#FFFDF9" fontSize="9" fontFamily="Caprasimo, sans-serif" letterSpacing="1.5">VISIT</text>
            <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#FFFDF9" fontSize="9" fontFamily="Caprasimo, sans-serif" letterSpacing="2">US</text>
          </svg>
        </div>
        <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(44px,7vw,100px)', color: '#2C1810', lineHeight: .86, textTransform: 'uppercase' }}>FIND</div>
        <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(38px,6vw,88px)', color: '#f15a28', lineHeight: 1.05 }}>our</div>
        <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(44px,7vw,100px)', color: '#2C1810', lineHeight: .86, textTransform: 'uppercase', marginBottom: 36 }}>LOCATION</div>
        <a href="#/contact" className="btn-bounce" style={{ display: 'inline-block', fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', background: '#f15a28', color: '#FFFDF9', padding: '14px 42px', borderRadius: 7, textDecoration: 'none', boxShadow: '0 4px 16px rgba(241,90,40,.40)' }}>FIND US</a>
      </section>
    </div>
  )
}
