import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import img1 from '../assets/1.png'
import { sendEventsForm } from '../utils/email'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img5 from '../assets/5.png'
import img7 from '../assets/7.png'
import img8 from '../assets/8.png'
import icedCoffee from '../assets/cute-coffee.png'

const scrollToForm = () => {
  const el = document.getElementById('ev-form')
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/* ── DATA ── */
const WHY_CARDS = [
  { img: img3, title: 'A Growing Community of Coffee Lovers', desc: 'As specialty coffee culture blooms across India, Snickerdoodle Events bring together enthusiasts, foodies, and curious souls in one warm, welcoming space.' },
  { img: icedCoffee, title: 'Fresh. Fun. Memorable.', desc: 'Every event is crafted with our scratch-baked pastries, specialty coffee, and genuine hospitality — creating moments your guests will talk about long after.' },
  { img: img8, title: 'Effortless, End-to-End Experience', desc: 'From inquiry to the last cup, our events team handles every detail so you can focus on showing up and enjoying the moment.' },
  { img: img5, title: 'A World of Flavours to Celebrate', desc: 'Our curated event menus blend bold coffee, seasonal bakes, and shareable bites — giving every gathering its own delicious story.' },
]

const STEPS = [
  { num: '01', title: 'Event Inquiry', desc: 'Fill out our event request form with your preferred date, occasion type, and estimated guest count.' },
  { num: '02', title: 'Consultation Call', desc: 'Our events team reaches out to discuss your vision, preferences, and answer any questions you have.' },
  { num: '03', title: 'Menu & Theme Selection', desc: 'Choose from our curated event menus and set the vibe — cozy tasting, lively workshop, or elegant celebration.' },
  { num: '04', title: 'Deposit & Confirmation', desc: 'Secure your date with a small deposit and receive your official booking confirmation from us.' },
  { num: '05', title: 'Final Guest Count', desc: 'Confirm your headcount 48 hours before the event so we can prepare everything to perfection.' },
  { num: '06', title: 'Day-of Setup', desc: 'Arrive to a beautifully arranged space, perfectly set up and ready for your guests to enjoy.' },
  { num: '07', title: 'Enjoy & Share the Love', desc: 'Live the moment, sip great coffee, eat something wonderful, and let us know how it went!' },
]

const FAQ = [
  { q: 'What types of events can I host at Snickerdoodle Coffeeworks?', a: 'We host a wide range of events including birthday celebrations, corporate coffee breaks, bake-along workshops, coffee tasting sessions, team meetups, and intimate social gatherings.' },
  { q: 'How far in advance do I need to book?', a: 'We recommend booking at least 2 weeks in advance to secure your preferred date. For larger or custom events, 4–6 weeks is ideal to allow proper preparation.' },
  { q: 'Can I bring an outside cake or decorations?', a: 'Absolutely! You\'re welcome to bring a cake for celebrations. For decorations, please check with our team beforehand so we can coordinate a setup that works beautifully in our space.' },
  { q: 'Is there a minimum guest count for private events?', a: 'Our private event packages start from a minimum of 10 guests. For smaller gatherings, we also offer semi-private arrangements — just ask our team and we\'ll find the right fit.' },
  { q: 'Do you offer custom menus for events?', a: 'Yes! We offer curated event menus and can work with you to create a custom selection of coffees, specialty drinks, and baked goods tailored to your event theme and dietary needs.' },
  { q: 'What is included in the booking fee?', a: 'The booking fee covers venue reservation, basic setup, dedicated service staff, and our signature welcome treats. Full catering and beverage packages are available as add-ons.' },
  { q: 'Can I visit the venue before confirming my event?', a: 'Of course! We encourage you to schedule a venue walkthrough with our events team so you can experience the space in person and discuss your ideas before booking.' },
]

const TICKER_ITEMS = ['drink coffee', 'eat fresh', 'be happy']

/* ── LABEL + FIELD STYLES ── */
const LABEL = {
  display: 'block', fontFamily: 'Caprasimo, sans-serif',
  fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase',
  color: '#2C1810', marginBottom: 8,
}
const INPUT = {
  width: '100%', fontFamily: 'Lora, serif', fontSize: 15, color: '#2C1810',
  background: '#FFFDF9', border: '1.5px solid #EDD9BE', borderRadius: 8,
  padding: '13px 16px', outline: 'none', transition: 'border-color .2s, box-shadow .2s',
  boxSizing: 'border-box',
}
const focusOn  = e => { e.currentTarget.style.borderColor = '#f15a28'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(241,90,40,.18)' }
const focusOff = e => { e.currentTarget.style.borderColor = '#EDD9BE'; e.currentTarget.style.boxShadow = 'none' }

/* ── SUB-COMPONENTS ── */
function EField({ label, name, placeholder, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label style={LABEL}>{label}{required && <span style={{ color: '#f15a28' }}> *</span>}</label>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
        required={required} style={INPUT} onFocus={focusOn} onBlur={focusOff} />
    </div>
  )
}

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #EDD9BE' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 0', gap: 16, textAlign: 'left',
      }}>
        <span style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(13px,1.4vw,15.5px)', color: '#2C1810', lineHeight: 1.35 }}>{q}</span>
        <span style={{
          flexShrink: 0, width: 30, height: 30, borderRadius: '50%',
          border: '2px solid #f15a28', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? '#f15a28' : 'transparent', color: open ? '#FFFDF9' : '#f15a28',
          fontSize: 20, lineHeight: 1, transition: 'background .2s, color .2s',
        }}>{open ? '−' : '+'}</span>
      </button>
      <div style={{ maxHeight: open ? 240 : 0, overflow: 'hidden', transition: 'max-height .38s ease' }}>
        <p style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(13.5px,1.4vw,15.5px)', color: '#6B3A2A', lineHeight: 1.82, paddingBottom: 20 }}>{a}</p>
      </div>
    </div>
  )
}

function TickerRow({ reverse }) {
  const items = Array(10).fill(TICKER_ITEMS).flat()
  return (
    <div style={{ overflow: 'hidden', padding: '13px 0' }}>
      <div className={reverse ? 'ab-ticker-rev' : 'ab-ticker-fwd'} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(12px,1.3vw,15px)',
              letterSpacing: '.14em', textTransform: 'uppercase',
              color: i % 2 === 0 ? '#FFFDF9' : '#2C1810', padding: '0 26px',
            }}>{item}</span>
            <img src={i % 3 === 0 ? img2 : img3} alt="" style={{ width: 26, height: 26, objectFit: 'contain', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── MAIN COMPONENT ── */
export default function Events() {
  const ref = useRef(null)
  const [slide, setSlide] = useState(0)
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', eventType: '', date: '', guests: '', city: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const prev = () => setSlide(s => (s - 1 + WHY_CARDS.length) % WHY_CARDS.length)
  const next = () => setSlide(s => (s + 1) % WHY_CARDS.length)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ev-h', { y: 70, opacity: 0, stagger: .13, duration: 1, ease: 'power4.out', delay: .25 })
      gsap.from('.ev-sub', { y: 28, opacity: 0, duration: .8, ease: 'power3.out', delay: .8 })
      gsap.from('.ev-btn', { y: 24, opacity: 0, duration: .7, ease: 'power3.out', delay: 1.05 })
      gsap.from('.ev-char', { x: -60, opacity: 0, duration: 1.1, ease: 'power3.out', delay: .4 })
      gsap.from('.ev-why-h', { y: 50, opacity: 0, stagger: .1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.ev-why-h', start: 'top 82%' } })
      gsap.from('.ev-table', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.ev-table', start: 'top 82%' } })
      gsap.from('.ev-step', { y: 50, opacity: 0, stagger: .09, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.ev-steps-grid', start: 'top 80%' } })
      gsap.from('.ev-faq', { y: 40, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.ev-faq', start: 'top 82%' } })
      gsap.from('.ev-form-wrap', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.ev-form-wrap', start: 'top 82%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendEventsForm(form)
      setStatus('success')
      setForm({ firstName: '', lastName: '', phone: '', email: '', eventType: '', date: '', guests: '', city: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div ref={ref}>

      {/* ── 1. HERO ── */}
      <section style={{
        background: '#f15a28', minHeight: '74vh', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(80px,9vw,130px) clamp(24px,5vw,80px)',
        textAlign: 'center',
      }}>
        <div className="grain-overlay" />

        {/* Left character */}
        <div className="ev-char" style={{ position: 'absolute', left: '4%', top: '50%', transform: 'translateY(-50%)', zIndex: 2, pointerEvents: 'none' }}>
          <img src={img1} alt="" className="anim-floatB" style={{ width: 'clamp(90px,11vw,180px)', objectFit: 'contain', filter: 'drop-shadow(0 10px 28px rgba(0,0,0,.2))' }} />
        </div>

        {/* Right squiggle arrow */}
        <svg style={{ position: 'absolute', right: '5%', top: '18%', opacity: .75, pointerEvents: 'none' }} width="clamp(60px,7vw,110px)" viewBox="0 0 120 100" fill="none">
          <path d="M10 80 Q55 5 105 35" stroke="#FFFDF9" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M90 22 L105 35 L93 47" stroke="#FFFDF9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Pill badge */}
        <div style={{ position: 'absolute', right: '5%', bottom: '22%', border: '2.5px solid #FFFDF9', borderRadius: 999, padding: '10px 22px', zIndex: 2 }}>
          <span style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFFDF9', lineHeight: 1.6, display: 'block' }}>
            JOIN<br />WITH US
          </span>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 3, maxWidth: 900 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'clamp(8px,1.5vw,20px)', flexWrap: 'wrap' }}>
            <div className="ev-h" style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(52px,8.5vw,124px)', color: '#FFFDF9', lineHeight: .88, textTransform: 'uppercase' }}>JOIN</div>
            <div className="ev-h" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(44px,7vw,104px)', color: '#FAE8DC', lineHeight: 1.1, fontStyle: 'italic' }}>the</div>
          </div>
          <div className="ev-h" style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,5vw,72px)', color: '#FFFDF9', lineHeight: .9, textTransform: 'uppercase', marginBottom: 28 }}>
            SNICKERDOODLE EVENTS!
          </div>
          <p className="ev-sub" style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,18px)', color: 'rgba(255,253,249,.88)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.82 }}>
            Ready to be part of something delicious? Join our community events, host a private gathering, or attend a coffee tasting workshop at Snickerdoodle Coffeeworks!
          </p>
          <button onClick={scrollToForm} className="ev-btn btn-bounce" style={{
            fontFamily: 'Caprasimo, sans-serif', fontWeight: 800,
            fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase',
            background: '#2C1810', color: '#FFFDF9',
            padding: '16px 42px', borderRadius: 7, border: 'none',
            boxShadow: '0 6px 24px rgba(0,0,0,.28)', transition: 'background .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#1E0A04'}
            onMouseLeave={e => e.currentTarget.style.background = '#2C1810'}
          >RSVP Now</button>
        </div>
      </section>

      {/* ── 2. WHY + CARDS ── */}
      <section style={{ background: '#FFFDF9', padding: 'clamp(64px,7vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div className="ev-why-h" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(32px,4.5vw,60px)', color: '#2C1810', lineHeight: 1 }}>why</div>
        <div className="ev-why-h" style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(32px,5vw,68px)', color: '#f15a28', textTransform: 'uppercase', lineHeight: .9 }}>SNICKERDOODLE</div>
        <div className="ev-why-h" style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(32px,5vw,68px)', color: '#f15a28', textTransform: 'uppercase', lineHeight: .9, marginBottom: 48 }}>EVENTS</div>

        {/* Carousel */}
        <div style={{ maxWidth: 920, margin: '0 auto', position: 'relative' }}>
          <div style={{ overflow: 'hidden', borderRadius: 20, border: '1.5px solid #EDD9BE' }}>
            <div style={{ display: 'flex', transition: 'transform .45s ease', transform: `translateX(-${slide * 100}%)`, willChange: 'transform' }}>
              {WHY_CARDS.map((card, i) => (
                <div key={i} className="ev-card-inner" style={{ minWidth: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div style={{ background: '#F5E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px,4vw,64px)', minHeight: 'clamp(280px,35vw,420px)' }}>
                    <img src={card.img} alt={card.title} style={{ width: '80%', maxWidth: 240, objectFit: 'contain', filter: 'drop-shadow(0 12px 28px rgba(30,10,4,.16))' }} />
                  </div>
                  <div style={{ background: '#FFFDF9', padding: 'clamp(32px,4vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
                    <h3 style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(17px,2vw,24px)', color: '#2C1810', marginBottom: 16, lineHeight: 1.18 }}>{card.title}</h3>
                    <p style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(14px,1.4vw,15.5px)', color: '#6B3A2A', lineHeight: 1.85 }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next */}
          {[{ fn: prev, side: 'left', icon: 'M15 18l-6-6 6-6' }, { fn: next, side: 'right', icon: 'M9 18l6-6-6-6' }].map(({ fn, side, icon }) => (
            <button key={side} onClick={fn} style={{
              position: 'absolute', [side]: -22, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%', background: '#f15a28',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(241,90,40,.35)', zIndex: 2,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFDF9" strokeWidth="2.5" strokeLinecap="round"><path d={icon}/></svg>
            </button>
          ))}

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            {WHY_CARDS.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', cursor: 'pointer', background: i === slide ? '#f15a28' : '#EDD9BE', transition: 'background .2s', padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY HOSTING WITH US (split panels) ── */}
      <div>
        {/* Sub-heading */}
        <div style={{ background: '#F5E8D5', padding: 'clamp(48px,5vw,72px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,48px)', color: '#2C1810', lineHeight: 1 }}>why</div>
          <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(26px,4vw,56px)', color: '#f15a28', textTransform: 'uppercase', lineHeight: .9 }}>HOSTING WITH</div>
          <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(26px,4vw,56px)', color: '#f15a28', textTransform: 'uppercase', lineHeight: .9 }}>SNICKERDOODLE</div>
        </div>

        {/* Panel A — cream text | cream image */}
        <div className="ev-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: '#FFFDF9', padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,72px)', display: 'flex', alignItems: 'center', minHeight: 'clamp(360px,44vw,520px)' }}>
            <div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#f15a28', lineHeight: .9 }}>Perfect</div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#f15a28', lineHeight: .9 }}>Atmosphere</div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#2C1810', lineHeight: .9, marginBottom: 22 }}>For Every Occasion</div>
              <p style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(14px,1.4vw,16px)', color: '#6B3A2A', lineHeight: 1.85, maxWidth: 400 }}>As a cosy specialty coffee brand, Snickerdoodle Coffeeworks creates a warm, inviting ambiance that makes every event feel personal, meaningful, and beautifully caffeinated.</p>
            </div>
          </div>
          <div style={{ background: '#F5E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px,5vw,72px)' }}>
            <img src={img8} alt="" style={{ width: '76%', maxWidth: 320, objectFit: 'contain', filter: 'drop-shadow(0 16px 40px rgba(30,10,4,.18))' }} />
          </div>
        </div>

        {/* Panel B — dark text | mist image */}
        <div className="ev-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: '#2C1810', padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,72px)', display: 'flex', alignItems: 'center', minHeight: 'clamp(360px,44vw,520px)' }}>
            <div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#FFFDF9', lineHeight: .9 }}>All-Day,</div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#FFFDF9', lineHeight: .9 }}>Any Occasion</div>
              <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(26px,3vw,44px)', color: '#f15a28', lineHeight: 1.2, marginBottom: 22 }}>Lifestyle</div>
              <p style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(14px,1.4vw,16px)', color: 'rgba(255,253,249,.72)', lineHeight: 1.85, maxWidth: 400 }}>From morning brunch meetups to evening tasting sessions, our flexible event formats suit every schedule and occasion — great coffee and bakes available all day, every day.</p>
            </div>
          </div>
          <div style={{ background: '#FAE8DC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px,5vw,72px)' }}>
            <img src={img7} alt="" style={{ width: '70%', maxWidth: 280, objectFit: 'contain', filter: 'drop-shadow(0 16px 40px rgba(30,10,4,.18))' }} />
          </div>
        </div>

        {/* Panel C — orange text | cream image */}
        <div className="ev-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: '#f15a28', padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,72px)', display: 'flex', alignItems: 'center', minHeight: 'clamp(360px,44vw,520px)' }}>
            <div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#FFFDF9', lineHeight: .9 }}>Simple</div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#FFFDF9', lineHeight: .9 }}>Booking.</div>
              <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(26px,3vw,44px)', color: '#2C1810', lineHeight: 1.2 }}>Great</div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#FFFDF9', lineHeight: .9, marginBottom: 22 }}>Experience.</div>
              <p style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(14px,1.4vw,16px)', color: 'rgba(255,253,249,.88)', lineHeight: 1.85, maxWidth: 400 }}>Our focus on fresh ingredients and thoughtful hosting gives your guests a premium experience without any planning stress — we handle the details so you don't have to.</p>
            </div>
          </div>
          <div style={{ background: '#F5E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px,5vw,72px)' }}>
            <img src={img5} alt="" style={{ width: '76%', maxWidth: 320, objectFit: 'contain', filter: 'drop-shadow(0 16px 40px rgba(30,10,4,.18))' }} />
          </div>
        </div>
      </div>

      {/* ── 4. MARQUEE TICKER ── */}
      <div style={{ background: '#f15a28', overflow: 'hidden', borderTop: '1.5px solid rgba(255,253,249,.14)', borderBottom: '1.5px solid rgba(255,253,249,.14)' }}>
        <TickerRow reverse={false} />
        <div style={{ height: 1, background: 'rgba(255,253,249,.12)' }} />
        <TickerRow reverse={true} />
      </div>

      {/* ── 5. EVENT PACKAGES (snapshot table) ── */}
      <section style={{ background: '#FFFDF9', padding: 'clamp(64px,7vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(34px,4.5vw,64px)', color: '#2C1810', lineHeight: .9, marginBottom: 6 }}>Event</div>
        <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(32px,4.5vw,60px)', color: '#f15a28', lineHeight: 1, marginBottom: 44 }}>snapshot</div>

        <div className="ev-table" style={{ maxWidth: 920, margin: '0 auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 560, borderRadius: 16, overflow: 'hidden', border: '1.5px solid #EDD9BE' }}>
            <thead>
              <tr>
                {['Min. Guests', 'Venue Capacity', 'Event Duration', 'Catering Add-ons', 'Booking Fee'].map(h => (
                  <th key={h} style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(10px,1.1vw,12.5px)', letterSpacing: '.1em', textTransform: 'uppercase', color: '#FFFDF9', background: '#2C1810', padding: '18px 16px', border: '1px solid rgba(255,253,249,.08)', textAlign: 'center' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {['10 guests', 'Up to 50', '2 – 4 hrs', 'Available', 'From ₹1,500'].map((val, i) => (
                  <td key={i} style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(15px,1.8vw,22px)', color: '#2C1810', background: i % 2 === 0 ? '#FFFDF9' : '#FAE8DC', padding: '28px 16px', textAlign: 'center', border: '1px solid #EDD9BE' }}>{val}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 6. YOU'RE SUPPORTED BANNER ── */}
      <section style={{ background: '#f15a28', padding: 'clamp(64px,7vw,100px) clamp(24px,5vw,80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grain-overlay" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(32px,4.5vw,68px)', color: '#FFFDF9', lineHeight: .9 }}>You're Supported</div>
          <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(28px,4vw,58px)', color: '#2C1810', lineHeight: 1.1 }}>throughout</div>
          <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(32px,4.5vw,68px)', color: '#FFFDF9', lineHeight: .9, marginBottom: 36 }}>the Experience</div>
          <button onClick={scrollToForm} className="btn-bounce" style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', background: '#2C1810', color: '#FFFDF9', padding: '16px 42px', borderRadius: 7, border: 'none', boxShadow: '0 6px 24px rgba(0,0,0,.28)', transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1E0A04'}
            onMouseLeave={e => e.currentTarget.style.background = '#2C1810'}
          >RSVP Now</button>
        </div>
      </section>

      {/* ── 7. STEPS ── */}
      <section style={{ background: '#FFFDF9', padding: 'clamp(64px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          {/* Steps heading centred on mobile, left on desktop */}
          <div className="ev-steps-wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 'clamp(40px,5vw,80px)', alignItems: 'start' }}>
            <div className="ev-steps-head">
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#2C1810', lineHeight: .88 }}>Steps</div>
              <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,48px)', color: '#f15a28', lineHeight: 1.1 }}>to</div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(30px,3.5vw,52px)', color: '#2C1810', lineHeight: .88, marginBottom: 24 }}>Join an Event</div>
              <button onClick={scrollToForm} className="btn-bounce" style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 800, fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', background: '#f15a28', color: '#FFFDF9', padding: '12px 26px', borderRadius: 7, border: 'none', boxShadow: '0 4px 16px rgba(241,90,40,.40)' }}>RSVP Now →</button>
            </div>

            <div className="ev-steps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {STEPS.map((step, i) => (
                <div key={step.num} className="ev-step" style={{
                  background: '#FAE8DC', borderRadius: 14, padding: 'clamp(22px,2.5vw,32px)',
                  border: '1.5px solid #EDD9BE',
                  gridColumn: i === 6 ? '1 / -1' : 'auto',
                }}>
                  <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(26px,2.8vw,40px)', color: 'rgba(241,90,40,.22)', lineHeight: 1, marginBottom: 10 }}>{step.num}</div>
                  <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(13px,1.4vw,16px)', color: '#2C1810', marginBottom: 8, letterSpacing: '.02em' }}>{step.title}</div>
                  <p style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(12.5px,1.3vw,14px)', color: '#6B3A2A', lineHeight: 1.78, margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section style={{ background: '#F5E8D5', padding: 'clamp(64px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div className="ev-faq" style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(26px,3.5vw,48px)', color: '#2C1810', lineHeight: .9 }}>Frequently Asked</div>
            <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,48px)', color: '#f15a28', lineHeight: 1.2 }}>Questions</div>
          </div>
          {FAQ.map((item, i) => <Accordion key={i} {...item} />)}
        </div>
      </section>

      {/* ── 9. REGISTRATION FORM ── */}
      <section id="ev-form" style={{ background: '#FFFDF9', padding: 'clamp(64px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(26px,3.5vw,48px)', color: '#2C1810', lineHeight: .9 }}>Host an Event</div>
          <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,48px)', color: '#f15a28', lineHeight: 1.2 }}>with</div>
          <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(26px,3.5vw,48px)', color: '#2C1810', lineHeight: .9 }}>Snickerdoodle</div>
        </div>

        <div className="ev-form-wrap" style={{ maxWidth: 840, margin: '0 auto' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', background: '#FFFDF9', borderRadius: 20, border: '1.5px solid #EDD9BE', boxShadow: '0 8px 40px rgba(30,10,4,.07)' }}>
              <div style={{ fontSize: 56, marginBottom: 18 }}>🎉</div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(22px,3vw,30px)', color: '#f15a28', marginBottom: 12 }}>
                You're On the List!
              </div>
              <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 16, color: '#6B3A2A', lineHeight: 1.8, maxWidth: 440, margin: '0 auto 28px' }}>
                Thanks for reaching out about hosting an event with us! We've sent a confirmation to your email — our events team will be in touch within 24 hours.
              </p>
              <button onClick={() => setStatus('idle')} style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 12, letterSpacing: '.09em', textTransform: 'uppercase', background: 'transparent', color: '#f15a28', border: '2px solid #f15a28', borderRadius: 7, padding: '10px 24px', cursor: 'pointer' }}>
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="ev-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <EField label="First Name" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
                <EField label="Last Name" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
              </div>
              <div className="ev-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <EField label="Phone Number" name="phone" placeholder="Your phone number" type="tel" value={form.phone} onChange={handleChange} />
                <EField label="Email Address" name="email" placeholder="Your email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="ev-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={LABEL}>Event Type <span style={{ color: '#f15a28' }}>*</span></label>
                  <select name="eventType" value={form.eventType} onChange={handleChange} required style={{ ...INPUT, cursor: 'pointer' }} onFocus={focusOn} onBlur={focusOff}>
                    <option value="">Select event type</option>
                    <option>Birthday Celebration</option>
                    <option>Corporate Coffee Break</option>
                    <option>Coffee Tasting Workshop</option>
                    <option>Bake-Along Session</option>
                    <option>Team Meetup</option>
                    <option>Private Gathering</option>
                    <option>Other</option>
                  </select>
                </div>
                <EField label="Preferred Date" name="date" placeholder="" type="date" value={form.date} onChange={handleChange} />
              </div>
              <div className="ev-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <EField label="Estimated Guest Count" name="guests" placeholder="e.g. 15" type="number" value={form.guests} onChange={handleChange} />
                <EField label="City / Location" name="city" placeholder="Your city" value={form.city} onChange={handleChange} />
              </div>
              <div>
                <label style={LABEL}>Your Message</label>
                <textarea name="message" placeholder="Tell us more about your event…" value={form.message} onChange={handleChange} rows={4}
                  style={{ ...INPUT, resize: 'vertical' }} onFocus={focusOn} onBlur={focusOff} />
              </div>

              {status === 'error' && (
                <div style={{ background: '#FFF0EB', border: '1.5px solid #f15a28', borderRadius: 8, padding: '12px 18px', fontFamily: 'Lora, serif', fontSize: 14, color: '#A83008', textAlign: 'center' }}>
                  Something went wrong. Please try again or email us at <strong>amarrnaikk@gmail.com</strong>
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <button type="submit" disabled={status === 'sending'} className="btn-bounce" style={{
                  background: status === 'sending' ? '#C4A090' : '#f15a28',
                  color: '#FFFDF9', fontFamily: 'Caprasimo, sans-serif', fontWeight: 800,
                  fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase',
                  padding: '14px 56px', borderRadius: 7, border: 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 16px rgba(241,90,40,.40)',
                  transition: 'background .2s',
                }}>
                  {status === 'sending' ? 'Sending…' : 'Submit Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
