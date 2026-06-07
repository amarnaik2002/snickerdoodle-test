import React from 'react'
import { Bean } from '../icons'
import { IGIcon, TTIcon, XIcon } from '../icons'

const FOOTER_LINKS = {
  'Menu':    ['Espresso Bar', 'Cold Brew', 'Seasonal', 'Pastry', 'Wholesome Bowls'],
  'Company': ['Our Story', 'Sustainability', 'Press', 'Careers', 'Franchise'],
  'Support': ['FAQ', 'Contact', 'Gift Cards', 'Accessibility', 'Allergens'],
  'Legal':   ['Privacy Policy', 'Terms of Use', 'Cookies'],
}

export default function Footer() {
  return (
    <footer style={{ background: '#1E0A04', padding: '80px 64px 44px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr repeat(4,1fr)', gap: 56, marginBottom: 64 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <img
                src="/logo-badge-sm.png"
                alt="Snickerdoodle Coffeeworks"
                loading="lazy"
                style={{ width: 96, height: 96, display: 'block' }}
              />
            </div>

            <p style={{ fontFamily: 'Dancing Script', fontSize: 20, color: '#C4A090', lineHeight: 1.6, marginBottom: 28 }}>
              &ldquo;roasted with love,<br/>served with soul.&rdquo;
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              {[IGIcon, TTIcon, XIcon].map((Icon, i) => (
                <a key={i} href="#"
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(255,253,249,.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C4A090', textDecoration: 'none',
                    transition: 'color .15s, background .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#D4400A'; e.currentTarget.style.background = 'rgba(212,64,10,.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#C4A090'; e.currentTarget.style.background = 'rgba(255,253,249,.08)' }}>
                  <Icon/>
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(FOOTER_LINKS).map(([col, links]) => (
            <div key={col}>
              <div style={{
                fontFamily: 'Nunito', fontWeight: 800, fontSize: 11,
                letterSpacing: '.14em', textTransform: 'uppercase',
                color: '#D4400A', marginBottom: 18,
              }}>{col}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="footer-link" style={{
                      fontFamily: 'Lora', fontSize: 13, fontStyle: 'italic',
                      color: '#9E6B54', textDecoration: 'none',
                    }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,253,249,.07)',
          paddingTop: 28,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ fontFamily: 'Lora', fontSize: 13, fontStyle: 'italic', color: 'rgba(196,160,144,.45)' }}>
            &copy; 2026 Snickerdoodle Coffeeworks &mdash; roasted with love
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[20, 14, 10].map((s, i) => (
              <Bean key={i} w={s} h={s} stroke={`rgba(212,64,10,${1 - i * 0.3})`}/>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
