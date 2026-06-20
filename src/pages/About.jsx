import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'
import img6 from '../assets/6.png'
import img7 from '../assets/7.png'
import img8 from '../assets/8.png'
import icedCoffee from '../assets/cute-coffee.png'

const TICKER_ITEMS = ['drink coffee', 'eat fresh', 'be happy']

function TickerRow({ reverse }) {
  const repeated = Array(5).fill(TICKER_ITEMS).flat()
  return (
    <div style={{ overflow: 'hidden', padding: '14px 0' }}>
      <div
        className={reverse ? 'ab-ticker-rev' : 'ab-ticker-fwd'}
        style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {[...repeated, ...repeated].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
            <span style={{
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 800,
              fontSize: 'clamp(12px,1.4vw,15px)', letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: i % 2 === 0 ? '#FFFDF9' : '#2C1810',
              padding: '0 28px',
            }}>{item}</span>
            <img
              src={i % 3 === 0 ? img3 : img2}
              alt=""
              style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const heroRef   = useRef(null)
  const panel1Ref = useRef(null)
  const panel2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ab-h-line', {
        y: 70, opacity: 0, duration: 1, stagger: .13, ease: 'power4.out', delay: .25,
      })
      gsap.from('.ab-h-para', {
        y: 30, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out', delay: .75,
      })
      gsap.from('.ab-circle', {
        scale: .75, opacity: 0, duration: 1.3, ease: 'back.out(1.6)', delay: .4,
      })

      gsap.from('.ab-p1-img', {
        x: -70, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: panel1Ref.current, start: 'top 78%' },
      })
      gsap.from('.ab-p1-txt', {
        x: 70, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: panel1Ref.current, start: 'top 78%' },
      })

      gsap.from('.ab-p2-txt', {
        x: -70, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: panel2Ref.current, start: 'top 78%' },
      })
      gsap.from('.ab-p2-img', {
        x: 70, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: panel2Ref.current, start: 'top 78%' },
      })

      gsap.from('.ab-commit-text', {
        y: 56, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-commit', start: 'top 76%' },
      })
      gsap.from('.ab-float-item', {
        scale: 0.1, opacity: 0, stagger: 0.07, duration: 0.8, ease: 'back.out(1.8)',
        scrollTrigger: { trigger: '.ab-commit', start: 'top 74%' },
      })

      gsap.from('.ab-mission-box', {
        y: 64, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-mission-box', start: 'top 82%' },
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef}>

      {/* ── 1. HERO ── */}
      <section style={{
        background: '#FFFDF9',
        padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)',
        minHeight: '85vh',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="ab-hero-grid" style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px,5vw,96px)', alignItems: 'center',
        }}>
          {/* Left — headline + text */}
          <div style={{ minWidth: 0 }}>
            <div className="ab-h-line" style={{ overflow: 'hidden' }}>
              <div className="ab-hero-title" style={{
                fontFamily: 'Caprasimo, sans-serif', fontWeight: 900,
                fontSize: 'clamp(26px,7.5vw,88px)', color: '#2C1810',
                lineHeight: .88, textTransform: 'uppercase',
              }}>SNICKERDOODLE</div>
            </div>
            <div className="ab-h-line" style={{ overflow: 'hidden' }}>
              <div className="ab-hero-title" style={{
                fontFamily: 'Dancing Script, cursive', fontWeight: 700,
                fontSize: 'clamp(26px,7.5vw,88px)', color: '#f15a28',
                lineHeight: 1.1, fontStyle: 'italic',
              }}>the</div>
            </div>
            <div className="ab-h-line" style={{ overflow: 'hidden', marginBottom: 32 }}>
              <div className="ab-hero-title" style={{
                fontFamily: 'Caprasimo, sans-serif', fontWeight: 900,
                fontSize: 'clamp(26px,7.5vw,88px)', color: '#2C1810',
                lineHeight: .88, textTransform: 'uppercase',
              }}>WORLD!</div>
            </div>

            <p className="ab-h-para" style={{
              fontFamily: 'Lora, serif', fontStyle: 'italic',
              fontSize: 'clamp(14px,1.5vw,17px)', color: '#6B3A2A',
              lineHeight: 1.85, marginBottom: 18, maxWidth: 460,
            }}>
              Proudly roasted in Canada, Snickerdoodle Coffeeworks began with a passion for sharing specialty coffee and honest, scratch-made bakes with every neighbourhood we call home.
            </p>
            <p className="ab-h-para" style={{
              fontFamily: 'Lora, serif', fontSize: 'clamp(13px,1.4vw,15px)',
              color: '#9E6B54', lineHeight: 1.85, maxWidth: 460,
            }}>
              Our menu celebrates the craft of slow coffee and the warmth of freshly-baked goodness — with our own Canadian twist. Snickerdoodle brings your neighbourhood the fusion of bold flavours and genuine local love, lovingly baked before sunrise.
            </p>
          </div>

          {/* Right — circle image */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="ab-circle" style={{
              width: 'clamp(240px,26vw,420px)',
              height: 'clamp(240px,26vw,420px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FAE8DC 0%, #F5C9A8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 28px 72px rgba(241,90,40,.22), 0 0 0 12px rgba(241,90,40,.08)',
              overflow: 'hidden', flexShrink: 0,
            }}>
              <img src={img2} alt="Snickerdoodle bun character" style={{
                width: '88%', height: '88%', objectFit: 'contain',
              }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PANEL: Fresh Bakes ── */}
      <section ref={panel1Ref} className="ab-split ab-panel1" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
      }}>
        {/* Left — image */}
        <div className="ab-p1-img" style={{
          background: '#F5E8D5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(48px,6vw,80px)',
          minHeight: 'clamp(380px,50vw,600px)',
        }}>
          <img src={img4} alt="Pretzel" style={{
            width: '78%', maxWidth: 380, objectFit: 'contain',
            filter: 'drop-shadow(0 20px 48px rgba(30,10,4,.20))',
          }}/>
        </div>

        {/* Right — text on orange */}
        <div className="ab-p1-txt" style={{
          background: '#f15a28',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,72px)',
        }}>
          <div>
            <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(38px,4.5vw,64px)', color: '#FFFDF9', lineHeight: .88 }}>Fresh</div>
            <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(38px,4.5vw,64px)', color: '#FFFDF9', lineHeight: .88 }}>Bakes</div>
            <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(38px,4.5vw,64px)', color: '#FFFDF9', lineHeight: .88 }}>Crafted</div>
            <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(34px,4vw,56px)', color: '#2C1810', lineHeight: 1.15 }}>with</div>
            <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(38px,4.5vw,64px)', color: '#FFFDF9', lineHeight: .88, marginBottom: 30 }}>love.</div>
            <p style={{
              fontFamily: 'Lora, serif', fontSize: 'clamp(14px,1.4vw,16px)',
              color: 'rgba(255,253,249,.88)', lineHeight: 1.88, maxWidth: 380,
            }}>
              At Snickerdoodle Coffeeworks, we bake everything from scratch before sunrise. Each cookie, croissant, and pastry is an experience of crisp golden edges, honest flavours, and the warmth of real craft — capturing the love of baking in every bite.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. PANEL: Bold Coffee ── */}
      <section ref={panel2Ref} className="ab-split ab-panel2" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
      }}>
        {/* Left — text on dark */}
        <div className="ab-p2-txt" style={{
          background: '#2C1810',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,72px)',
          minHeight: 'clamp(380px,50vw,600px)',
        }}>
          <div>
            <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(38px,4.5vw,64px)', color: '#FFFDF9', lineHeight: .88 }}>Bold. Rich.</div>
            <div style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700, fontSize: 'clamp(34px,4vw,56px)', color: '#f15a28', lineHeight: 1.15 }}>Unmistakably</div>
            <div style={{ fontFamily: 'Caprasimo, sans-serif', fontWeight: 900, fontSize: 'clamp(38px,4.5vw,64px)', color: '#FFFDF9', lineHeight: .88, marginBottom: 30 }}>Delicious</div>
            <p style={{
              fontFamily: 'Lora, serif', fontSize: 'clamp(14px,1.4vw,16px)',
              color: 'rgba(255,253,249,.72)', lineHeight: 1.88, maxWidth: 380,
            }}>
              At Snickerdoodle Coffeeworks, we're proud to serve specialty coffee roasted in-house every Tuesday — sourced from single-origin farms across three continents. Bold espresso or a silky latte, each cup is brewed to bring a moment of pure, earned indulgence to your day.
            </p>
          </div>
        </div>

        {/* Right — coffee image */}
        <div className="ab-p2-img" style={{
          background: '#FAE8DC',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(48px,6vw,80px)',
        }}>
          <img src={icedCoffee} alt="Iced coffee" style={{
            width: '52%', maxWidth: 280, objectFit: 'contain',
            filter: 'drop-shadow(0 24px 56px rgba(30,10,4,.22))',
          }}/>
        </div>
      </section>

      {/* ── 4. MARQUEE TICKER ── */}
      <div style={{
        background: '#f15a28', overflow: 'hidden',
        borderTop: '1.5px solid rgba(255,253,249,.14)',
        borderBottom: '1.5px solid rgba(255,253,249,.14)',
      }}>
        <TickerRow reverse={false} />
        <div style={{ height: 1, background: 'rgba(255,253,249,.12)', margin: '0 0' }} />
        <TickerRow reverse={true} />
      </div>

      {/* ── 5. COMMITMENT ── */}
      <section className="ab-commit" style={{
        background: '#FBF5EC',
        position: 'relative', overflow: 'hidden',
        minHeight: 'clamp(580px,72vw,800px)',
        display: 'grid', placeItems: 'center',
      }}>
        {/* Floating food illustrations — 8 items every 45° along ellipse
            centre (50%,50%), rx=38%, ry=38% */}
        {[
          { src: img5, size: 'clamp(72px,8vw,120px)',   left: '50%', top: '12%', rot: '-15deg', delay: '0s',   anim: 'anim-float'  },
          { src: img2, size: 'clamp(60px,6.5vw,96px)',  left: '77%', top: '23%', rot: '12deg',  delay: '0.45s',anim: 'anim-floatB' },
          { src: img7, size: 'clamp(66px,7.5vw,110px)', left: '88%', top: '50%', rot: '-8deg',  delay: '0.9s', anim: 'anim-floatC' },
          { src: img6, size: 'clamp(60px,6.5vw,98px)',  left: '77%', top: '77%', rot: '22deg',  delay: '0.3s', anim: 'anim-float'  },
          { src: img4, size: 'clamp(66px,7.5vw,108px)', left: '50%', top: '88%', rot: '-22deg', delay: '0.75s',anim: 'anim-floatB' },
          { src: img1, size: 'clamp(56px,6vw,92px)',    left: '23%', top: '77%', rot: '18deg',  delay: '0.15s',anim: 'anim-floatC' },
          { src: img8, size: 'clamp(68px,7.5vw,112px)', left: '12%', top: '50%', rot: '26deg',  delay: '0.6s', anim: 'anim-float'  },
          { src: img3, size: 'clamp(60px,6.5vw,96px)',  left: '23%', top: '23%', rot: '-18deg', delay: '1.05s',anim: 'anim-floatB' },
        ].map((item, i) => (
          /* Outer: oval position via translate(-50%,-50%) centering */
          <div key={i} className="ab-float-wrap" style={{
            position: 'absolute', left: item.left, top: item.top,
            transform: 'translate(-50%,-50%)',
            zIndex: 1, pointerEvents: 'none',
          }}>
            {/* Inner: GSAP scale/opacity target — no existing transform so no conflict */}
            <div className="ab-float-item">
              <img
                src={item.src} alt=""
                className={item.anim}
                style={{
                  width: item.size, height: item.size,
                  objectFit: 'contain', display: 'block',
                  '--r': item.rot,
                  animationDelay: item.delay,
                  filter: 'drop-shadow(0 6px 18px rgba(30,10,4,.13))',
                }}
              />
            </div>
          </div>
        ))}

        {/* Central content — grid placeItems:center puts this at exact (50%,50%) */}
        <div className="ab-commit-text" style={{
          textAlign: 'center',
          width: 'clamp(280px, 40vw, 540px)',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{
            fontFamily: 'Dancing Script, cursive', fontWeight: 700,
            fontSize: 'clamp(34px,4vw,56px)', color: '#f15a28', lineHeight: 1.1,
            fontStyle: 'italic',
          }}>our</div>
          <div style={{
            fontFamily: 'Caprasimo, sans-serif', fontWeight: 900,
            fontSize: 'clamp(38px,5vw,72px)', color: '#2C1810',
            lineHeight: .88, marginBottom: 20, textTransform: 'uppercase',
            wordBreak: 'keep-all',
          }}>COMMITMENT</div>
          <div style={{
            fontFamily: 'Lora, serif', fontStyle: 'italic',
            fontSize: 'clamp(13px,1.5vw,17px)', color: '#6B3A2A',
            marginBottom: 16, lineHeight: 1.55,
          }}>Quality Ingredients, Unforgettable Taste.</div>
          <p style={{
            fontFamily: 'Lora, serif', fontSize: 'clamp(12.5px,1.2vw,14.5px)',
            color: '#9E6B54', lineHeight: 1.9,
          }}>
            We are dedicated to quality, freshness, and customer satisfaction. Our ingredients are carefully sourced and each bake is freshly made to ensure every bite meets our high standards. At Snickerdoodle Coffeeworks, we believe in creating memorable coffee and bake experiences that reflect our passion for flavour and community.
          </p>
        </div>
      </section>

      {/* ── 6. MISSION ── */}
      <section style={{
        background: '#FFFDF9',
        padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,64px)',
      }}>
        {/* Outer decorative border matching the reference page */}
        <div style={{
          maxWidth: 900, margin: '0 auto',
          border: '2px solid #EDD9BE',
          borderRadius: 0,
          padding: '6px',
        }}>
          <div className="ab-mission-box" style={{
            border: '1.5px solid rgba(241,90,40,.28)',
            padding: 'clamp(48px,7vw,96px) clamp(32px,6vw,88px)',
            textAlign: 'center',
            position: 'relative',
          }}>
            {/* Corner squares */}
            {[
              { top: -6, left: -6 }, { top: -6, right: -6 },
              { bottom: -6, left: -6 }, { bottom: -6, right: -6 },
            ].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute', width: 10, height: 10,
                background: '#f15a28', ...pos,
              }}/>
            ))}

            <div style={{
              fontFamily: 'Dancing Script, cursive', fontWeight: 700,
              fontSize: 'clamp(40px,5.5vw,68px)', color: '#f15a28', lineHeight: 1,
            }}>our</div>
            <div style={{
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 900,
              fontSize: 'clamp(56px,7.5vw,104px)', color: '#2C1810',
              lineHeight: .85, marginBottom: 36,
            }}>Mission</div>

            <div style={{
              fontFamily: 'Lora, serif', fontStyle: 'italic',
              fontSize: 'clamp(16px,2vw,22px)', color: '#9E6B54',
              marginBottom: 22, lineHeight: 1.5,
            }}>
              Uniting People, with Coffee &amp; Bakes
            </div>

            <p style={{
              fontFamily: 'Lora, serif', fontSize: 'clamp(14px,1.5vw,16px)',
              color: '#6B3A2A', lineHeight: 1.92,
              maxWidth: 560, margin: '0 auto',
            }}>
              To bring people together with a warm, welcoming, and delightfully crafted coffee and bakes experience — quick enough for your morning rush, meaningful enough for your afternoon pause. Suitable for everyone, everywhere, and for every part of the day.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
