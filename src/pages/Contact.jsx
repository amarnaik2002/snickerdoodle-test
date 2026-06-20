import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import img1 from '../assets/1.png'
import { sendContactForm } from '../utils/email'

const HOURS = [
  { day: 'Monday',    time: '7:00 AM – 8:00 PM' },
  { day: 'Tuesday',   time: '7:00 AM – 8:00 PM' },
  { day: 'Wednesday', time: '7:00 AM – 8:00 PM' },
  { day: 'Thursday',  time: '7:00 AM – 8:00 PM' },
  { day: 'Friday',    time: '7:00 AM – 9:00 PM' },
  { day: 'Saturday',  time: '8:00 AM – 9:00 PM' },
  { day: 'Sunday',    time: '9:00 AM – 6:00 PM' },
]

const INPUT_STYLE = {
  width: '100%', fontFamily: 'Lora, serif', fontSize: 15, color: '#2C1810',
  background: '#FFFDF9', border: '1.5px solid #EDD9BE', borderRadius: 8,
  padding: '13px 16px', outline: 'none', transition: 'border-color .2s, box-shadow .2s',
  boxSizing: 'border-box',
}

function Field({ label, name, placeholder, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label style={{
        display: 'block', fontFamily: 'Caprasimo, sans-serif',
        fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase',
        color: '#2C1810', marginBottom: 8,
      }}>
        {label}{required && <span style={{ color: '#f15a28' }}> *</span>}
      </label>
      <input
        type={type} name={name} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        style={INPUT_STYLE}
        onFocus={e => {
          e.currentTarget.style.borderColor = '#f15a28'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(241,90,40,.18)'
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = '#EDD9BE'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const [form, setForm] = useState({ name: '', subject: '', mobile: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-h-line', {
        y: 64, opacity: 0, stagger: .13, duration: 1, ease: 'power4.out', delay: .25,
      })
      gsap.from('.ct-loc', {
        x: -64, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-loc-grid', start: 'top 78%' },
      })
      gsap.from('.ct-map', {
        x: 64, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-loc-grid', start: 'top 78%' },
      })
      gsap.from('.ct-mascot', {
        scale: .7, opacity: 0, duration: 1.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.ct-contact-head', start: 'top 82%' },
      })
      gsap.from('.ct-contact-title', {
        y: 40, opacity: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-contact-head', start: 'top 82%' },
      })
      gsap.from('.ct-form-wrap', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-form-wrap', start: 'top 82%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendContactForm(form)
      setStatus('success')
      setForm({ name: '', subject: '', mobile: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div ref={ref}>

      {/* ── 1. VISIT US IN STORE ── */}
      <section style={{
        background: '#FFFDF9',
        padding: 'clamp(72px,8vw,120px) clamp(24px,5vw,80px) clamp(64px,7vw,100px)',
      }}>

        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>
          <div className="ct-h-line" style={{ overflow: 'hidden' }}>
            <div style={{
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 900,
              fontSize: 'clamp(42px,7.5vw,108px)', color: '#f15a28',
              textTransform: 'uppercase', lineHeight: .88,
            }}>VISIT US</div>
          </div>
          <div className="ct-h-line" style={{
            overflow: 'hidden', display: 'flex',
            justifyContent: 'center', alignItems: 'baseline',
            gap: 'clamp(12px,2vw,28px)', flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'Dancing Script, cursive', fontWeight: 700,
              fontSize: 'clamp(40px,7vw,100px)', color: '#f15a28',
              fontStyle: 'italic', lineHeight: 1.05,
            }}>in</span>
            <span style={{
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 900,
              fontSize: 'clamp(42px,7.5vw,108px)', color: '#f15a28',
              textTransform: 'uppercase', lineHeight: .88,
            }}>STORE</span>
          </div>
        </div>

        {/* Location + Map grid */}
        <div className="ct-loc-grid" style={{
          maxWidth: 1140, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.1fr',
          gap: 'clamp(32px,4vw,72px)', alignItems: 'start',
        }}>

          {/* Left — location details */}
          <div className="ct-loc">
            <h3 style={{
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 900,
              fontSize: 'clamp(22px,2.5vw,34px)', color: '#2C1810',
              letterSpacing: '.04em', marginBottom: 14,
            }}>AMBERNATH</h3>

            <p style={{ fontFamily: 'Lora, serif', fontSize: 15, color: '#6B3A2A', lineHeight: 1.65, marginBottom: 4 }}>
              Snickerdoodle Coffeeworks, Ambernath,<br />Maharashtra, India
            </p>
            <p style={{ fontFamily: 'Lora, serif', fontSize: 15, color: '#6B3A2A', marginBottom: 28 }}>
              +91 98765 43210
            </p>

            {/* Hours */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '7px 28px', marginBottom: 18 }}>
              {HOURS.map(({ day, time }) => (
                <React.Fragment key={day}>
                  <span style={{
                    fontFamily: 'Caprasimo, sans-serif', fontSize: 12.5,
                    color: '#2C1810', letterSpacing: '.04em', whiteSpace: 'nowrap',
                  }}>{day}:</span>
                  <span style={{ fontFamily: 'Lora, serif', fontSize: 13.5, color: '#6B3A2A' }}>{time}</span>
                </React.Fragment>
              ))}
            </div>

            <p style={{
              fontFamily: 'Lora, serif', fontStyle: 'italic',
              fontSize: 12.5, color: '#C4A090', marginBottom: 32, lineHeight: 1.7,
            }}>
              Hours may be subject to change due to public holidays.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://www.zomato.com/mumbai/snickerdoodle-coffeeworks-ambernath-thane/order" target="_blank" rel="noopener noreferrer" className="btn-bounce" style={{
                display: 'inline-block', fontFamily: 'Caprasimo, sans-serif',
                fontWeight: 800, fontSize: 12, letterSpacing: '.09em',
                textTransform: 'uppercase', textDecoration: 'none',
                background: '#f15a28', color: '#FFFDF9',
                padding: '11px 24px', borderRadius: 7, border: '2px solid #f15a28',
                boxShadow: '0 4px 16px rgba(241,90,40,.35)',
              }}>Order Online</a>

              <a
                href="https://maps.app.goo.gl/Hp5BfqQ7HJjrrArF8"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block', fontFamily: 'Caprasimo, sans-serif',
                  fontWeight: 800, fontSize: 12, letterSpacing: '.09em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  background: 'transparent', color: '#f15a28',
                  padding: '11px 24px', borderRadius: 7, border: '2px solid #f15a28',
                  transition: 'background .2s, color .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#f15a28'; e.currentTarget.style.color='#FFFDF9' }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#f15a28' }}
              >Get Directions</a>
            </div>
          </div>

          {/* Right — Google Map */}
          <div className="ct-map" style={{
            borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(30,10,4,.13)',
            border: '1.5px solid #EDD9BE',
          }}>
            <iframe
              title="Snickerdoodle Coffeeworks — Ambernath"
              src="https://maps.google.com/maps?q=19.2045045,73.1824314&t=m&z=16&output=embed&iwloc=near"
              width="100%"
              height="400"
              style={{ display: 'block', border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Divider wave */}
      <div style={{ background: '#F5E8D5', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
          <path d="M0 48 L0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 Z" fill="#FFFDF9"/>
        </svg>
      </div>

      {/* ── 2. CONTACT FORM ── */}
      <section style={{
        background: '#F5E8D5',
        padding: '0 clamp(24px,5vw,80px) clamp(72px,8vw,120px)',
      }}>

        {/* Heading with mascot */}
        <div className="ct-contact-head" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 'clamp(16px,2.5vw,40px)', marginBottom: 'clamp(20px,3vw,36px)',
          flexWrap: 'wrap',
        }}>
          <img
            className="ct-mascot"
            src={img1} alt="Snickerdoodle character"
            style={{
              width: 'clamp(80px,9vw,128px)', objectFit: 'contain',
              filter: 'drop-shadow(0 10px 24px rgba(30,10,4,.15))',
              flexShrink: 0,
            }}
          />
          <div className="ct-contact-title">
            <div style={{
              fontFamily: 'Dancing Script, cursive', fontWeight: 700,
              fontSize: 'clamp(48px,6vw,88px)', color: '#f15a28',
              lineHeight: 1, fontStyle: 'italic',
            }}>contact</div>
            <div style={{
              fontFamily: 'Caprasimo, sans-serif', fontWeight: 900,
              fontSize: 'clamp(48px,6vw,88px)', color: '#2C1810',
              lineHeight: .85,
            }}>us</div>
          </div>
          {/* Decorative squiggle */}
          <svg
            viewBox="0 0 100 80" fill="none"
            style={{ width: 'clamp(48px,5vw,88px)', flexShrink: 0, opacity: .7 }}
          >
            <path d="M8 50 Q18 12 32 50 Q46 88 60 50 Q74 12 92 50" stroke="#f15a28" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <circle cx="92" cy="50" r="5" fill="#f15a28"/>
          </svg>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Lora, serif', fontStyle: 'italic',
          fontSize: 'clamp(14px,1.5vw,17px)', color: '#6B3A2A',
          textAlign: 'center', maxWidth: 640, margin: '0 auto',
          lineHeight: 1.82, marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          Have questions, feedback, or interested in joining the Snickerdoodle Coffeeworks family? We'd love to hear from you! Fill out the form below and our team will get back to you as soon as possible.
        </p>

        {/* Form */}
        <div className="ct-form-wrap" style={{ maxWidth: 840, margin: '0 auto' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', background: '#FFFDF9', borderRadius: 20, border: '1.5px solid #EDD9BE', boxShadow: '0 8px 40px rgba(30,10,4,.07)' }}>
              <div style={{ fontSize: 56, marginBottom: 18 }}>☕</div>
              <div style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 'clamp(22px,3vw,30px)', color: '#f15a28', marginBottom: 12 }}>
                Message Received!
              </div>
              <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 16, color: '#6B3A2A', lineHeight: 1.8, maxWidth: 420, margin: '0 auto 28px' }}>
                Thanks for reaching out. We've sent a confirmation to your email and our team will get back to you within 24 hours.
              </p>
              <button onClick={() => setStatus('idle')} style={{ fontFamily: 'Caprasimo, sans-serif', fontSize: 12, letterSpacing: '.09em', textTransform: 'uppercase', background: 'transparent', color: '#f15a28', border: '2px solid #f15a28', borderRadius: 7, padding: '10px 24px', cursor: 'pointer' }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div className="ct-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <Field label="Full Name" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
                <Field label="Subject" name="subject" placeholder="What's this about?" value={form.subject} onChange={handleChange} required />
              </div>

              <div className="ct-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <Field label="Mobile Number" name="mobile" placeholder="Enter your mobile number" value={form.mobile} onChange={handleChange} type="tel" />
                <Field label="Email Address" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} type="email" required />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Caprasimo, sans-serif', fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2C1810', marginBottom: 8 }}>Message</label>
                <textarea
                  name="message"
                  placeholder="Add any notes or special instructions…"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  style={{ ...INPUT_STYLE, resize: 'vertical' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#f15a28'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(241,90,40,.18)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#EDD9BE'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>

              {status === 'error' && (
                <div style={{ background: '#FFF0EB', border: '1.5px solid #f15a28', borderRadius: 8, padding: '12px 18px', fontFamily: 'Lora, serif', fontSize: 14, color: '#A83008', textAlign: 'center' }}>
                  Something went wrong. Please try again or email us directly at <strong>amarrnaikk@gmail.com</strong>
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
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
